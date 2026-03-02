/**
 * Jobs Store Service
 * 
 * Supabase-backed abstraction layer for job listings CRUD operations.
 */

import { supabase } from './supabase';
import { ensureJobFolder } from './storage-helpers';

// ── Helper: convert snake_case DB row → camelCase JS object ──
const toCamelCase = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    department: row.department,
    location: row.location,
    locationType: row.location_type,
    employmentType: row.employment_type,
    experienceLevel: row.experience_level,
    salary: row.salary,
    shortDescription: row.short_description,
    description: row.description,
    responsibilities: row.responsibilities || [],
    requirements: row.requirements || [],
    applicationLink: row.application_link,
    applicationEmail: row.application_email,
    status: row.status,
    featured: row.featured,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};

// ── Helper: convert camelCase JS object → snake_case for DB ──
const toSnakeCase = (data) => {
  const mapped = {};
  if (data.title !== undefined) mapped.title = data.title;
  if (data.department !== undefined) mapped.department = data.department;
  if (data.location !== undefined) mapped.location = data.location;
  if (data.locationType !== undefined) mapped.location_type = data.locationType;
  if (data.employmentType !== undefined) mapped.employment_type = data.employmentType;
  if (data.experienceLevel !== undefined) mapped.experience_level = data.experienceLevel;
  if (data.salary !== undefined) mapped.salary = data.salary;
  if (data.shortDescription !== undefined) mapped.short_description = data.shortDescription;
  if (data.description !== undefined) mapped.description = data.description;
  if (data.responsibilities !== undefined) mapped.responsibilities = data.responsibilities;
  if (data.requirements !== undefined) mapped.requirements = data.requirements;
  if (data.applicationLink !== undefined) mapped.application_link = data.applicationLink;
  if (data.applicationEmail !== undefined) mapped.application_email = data.applicationEmail;
  if (data.status !== undefined) mapped.status = data.status;
  if (data.featured !== undefined) mapped.featured = data.featured;
  return mapped;
};

/**
 * Generate a unique ID for new jobs
 */
const generateId = (title) => {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${slug}-${Date.now()}`;
};

/**
 * Fetch all jobs from the database (admin use)
 */
export const fetchJobs = async () => {
  const { data, error } = await supabase
    .from('job_listings')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
  return (data || []).map(toCamelCase);
};

/**
 * Fetch only published jobs (public careers page)
 */
export const fetchPublishedJobs = async () => {
  const { data, error } = await supabase
    .from('job_listings')
    .select('*')
    .eq('status', 'published')
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching published jobs:', error);
    return [];
  }
  return (data || []).map(toCamelCase);
};

/**
 * Fetch a single job by ID
 */
export const fetchJobById = async (id) => {
  const { data, error } = await supabase
    .from('job_listings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching job by id:', error);
    return null;
  }
  return toCamelCase(data);
};

/**
 * Create a new job listing
 */
export const createJob = async (jobData) => {
  const id = generateId(jobData.title);
  const mapped = toSnakeCase(jobData);
  mapped.id = id;
  mapped.status = jobData.status || 'draft';

  const { data, error } = await supabase
    .from('job_listings')
    .insert([mapped])
    .select()
    .single();

  if (error) {
    console.error('Error creating job:', error);
    throw new Error('Failed to create job listing');
  }

  // Auto-create storage folder for CV uploads
  await ensureJobFolder(data.department, data.title);

  return toCamelCase(data);
};

/**
 * Update an existing job listing
 */
export const updateJob = async (id, jobData) => {
  const mapped = toSnakeCase(jobData);

  const { data, error } = await supabase
    .from('job_listings')
    .update(mapped)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating job:', error);
    throw new Error('Failed to update job listing');
  }

  // If department or title changed, ensure the new folder exists
  if (data.department && data.title) {
    await ensureJobFolder(data.department, data.title);
  }

  return toCamelCase(data);
};

/**
 * Delete a job listing
 */
export const deleteJob = async (id) => {
  const { error } = await supabase
    .from('job_listings')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting job:', error);
    throw new Error('Failed to delete job listing');
  }
  return true;
};

/**
 * Toggle job publish status
 */
export const toggleJobStatus = async (id) => {
  const job = await fetchJobById(id);
  if (!job) throw new Error('Job not found');

  const newStatus = job.status === 'published' ? 'draft' : 'published';
  return updateJob(id, { status: newStatus });
};

/**
 * Validate if a job can be published
 * Returns { valid: boolean, errors: string[] }
 */
export const validateJobForPublish = (job) => {
  const errors = [];

  if (!job.title?.trim()) errors.push('Job title is required');
  if (!job.location?.trim()) errors.push('Location is required');
  if (!job.employmentType?.trim()) errors.push('Employment type is required');
  if (!job.description?.trim()) errors.push('Description is required');

  return {
    valid: errors.length === 0,
    errors
  };
};

// Department options
export const departmentOptions = [
  "Engineering",
  "Product & Design",
  "Sales & Marketing",
  "Operations",
  "Human Resources",
  "Finance"
];

// Location options
export const locationOptions = [
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Kerala",
  "Remote"
];

// Location type options
export const locationTypeOptions = [
  "Remote",
  "Hybrid",
  "On-site"
];

// Employment type options
export const employmentTypeOptions = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship"
];

// Experience level options
export const experienceLevelOptions = [
  "Entry Level",
  "Mid Level",
  "Senior",
  "Lead",
  "Director"
];
