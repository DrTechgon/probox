/**
 * Storage Helpers
 * 
 * Utilities for organized CV storage in Supabase S3.
 * Folder structure: career/{Department}/{job-title-slug}/{timestamp}_{applicant}_{filename}
 * 
 * The department folders must match the EXISTING folder names in the
 * Supabase "career" bucket exactly.
 */

import { supabase } from './supabase';

const BUCKET = 'career';

/**
 * Map from the department value used in the app code (jobs-store.js)
 * to the exact folder name in the Supabase storage bucket.
 */
const DEPARTMENT_FOLDER_MAP = {
    'Engineering': 'Engineering',
    'Product & Design': 'Product and Design',
    'Sales & Marketing': 'Sales and Marketing',
    'Operations': 'Operation',
    'Human Resources': 'HR',
    'Finance': 'Finance',
};

/**
 * Slugify a string for use in storage paths (job-title sub-folders).
 * e.g. "Senior Software Engineer" → "senior-software-engineer"
 */
export const slugify = (text) => {
    return (text || 'general')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};

/**
 * Get the exact storage folder name for a department.
 * Falls back to the raw department string if not found in the map.
 */
export const getDepartmentFolder = (department) => {
    return DEPARTMENT_FOLDER_MAP[department] || department;
};

/**
 * Build the storage folder path for a given department + job title.
 * e.g. ("Engineering", "Software Engineer") → "Engineering/software-engineer"
 */
export const buildJobFolderPath = (department, jobTitle) => {
    const deptFolder = getDepartmentFolder(department);
    const titleSlug = slugify(jobTitle);
    return `${deptFolder}/${titleSlug}`;
};

/**
 * Ensure a folder exists in the storage bucket by uploading a .keep placeholder.
 * Supabase Storage is object-based — folders are created implicitly when a file exists inside them.
 * This is called when a new JD is created so the folder shows up in the dashboard.
 */
export const ensureJobFolder = async (department, jobTitle) => {
    const folderPath = buildJobFolderPath(department, jobTitle);
    const keepPath = `${folderPath}/.keep`;

    const { error } = await supabase.storage
        .from(BUCKET)
        .upload(keepPath, new Blob([''],), {
            contentType: 'text/plain',
            upsert: true,
        });

    if (error) {
        console.warn('Could not create job folder placeholder:', error.message);
    }

    return folderPath;
};

/**
 * Upload a CV file to the correct folder in Supabase Storage.
 *
 * @param {File}   file           - The CV file to upload
 * @param {string} department     - Job department (e.g. "Engineering")
 * @param {string} jobTitle       - Job title (e.g. "Software Engineer")
 * @param {string} applicantName  - Applicant's full name (optional, used in filename)
 * @returns {{ url: string, path: string }} - Public URL and storage path
 */
export const uploadCV = async (file, department, jobTitle, applicantName = '') => {
    const folderPath = buildJobFolderPath(department, jobTitle);
    const timestamp = Date.now();
    const nameSlug = applicantName ? `${slugify(applicantName)}_` : '';
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = `${folderPath}/${timestamp}_${nameSlug}${sanitizedFilename}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(filePath, file);

    if (uploadError) {
        throw uploadError;
    }

    // Return the storage path — we store this in the DB as cv_url.
    // Use getSignedCVUrl() to generate a viewable link on demand.
    return {
        url: filePath,
        path: filePath,
    };
};

/**
 * Generate a signed (temporary) URL for viewing/downloading a CV.
 * Works regardless of whether the bucket is public or private.
 *
 * @param {string} filePath - The storage path stored in cv_url (e.g. "Engineering/sde/123_resume.pdf")
 * @param {number} expiresIn - Seconds until the URL expires (default: 1 hour)
 * @returns {string|null} - Signed URL or null on error
 */
export const getSignedCVUrl = async (filePath, expiresIn = 3600) => {
    if (!filePath) return null;

    // If it's already a full URL (legacy data), extract the path
    if (filePath.startsWith('http')) {
        const match = filePath.match(/\/storage\/v1\/object\/public\/career\/(.+)$/);
        if (match) {
            filePath = match[1];
        } else {
            // Can't parse, return as-is
            return filePath;
        }
    }

    const { data, error } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(filePath, expiresIn);

    if (error) {
        console.error('Error creating signed URL:', error);
        return null;
    }

    return data.signedUrl;
};

