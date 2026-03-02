'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, LogOut, Briefcase, MapPin, Clock, Building2, Trash2,
  Edit, Eye, EyeOff, MoreVertical, Check, X, AlertCircle, ChevronDown,
  ArrowUpDown, Filter, Loader2, ExternalLink, Mail, FileText, Calendar, Users
} from 'lucide-react';
import ApplicationsManager from '@/components/admin/ApplicationsManager';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { supabase } from '@/lib/supabase';
import {
  fetchJobs,
  createJob,
  updateJob,
  deleteJob,
  validateJobForPublish,
  departmentOptions,
  locationOptions,
  locationTypeOptions,
  employmentTypeOptions,
  experienceLevelOptions
} from '@/lib/jobs-store';

// Empty job template
const emptyJob = {
  title: '',
  department: 'Engineering',
  location: 'Mumbai',
  locationType: 'Hybrid',
  employmentType: 'Full-time',
  experienceLevel: 'Mid Level',
  salary: '',
  shortDescription: '',
  description: '',
  responsibilities: [''],
  requirements: [''],
  applicationLink: '',
  applicationEmail: '',
  status: 'draft',
  featured: false
};

// Job Preview Component
function JobPreview({ job }) {
  if (!job) return null;

  return (
    <div className="space-y-6">
      {/* Preview Header */}
      <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl text-white">
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-white/20 text-white text-xs">{job.department || 'Department'}</Badge>
          {job.featured && (
            <Badge className="bg-orange-500 text-white text-xs">Featured</Badge>
          )}
          {job.status === 'draft' && (
            <Badge variant="outline" className="border-amber-400 text-amber-400 text-xs">Draft</Badge>
          )}
        </div>
        <h3 className="text-xl font-bold mb-3">{job.title || 'Job Title'}</h3>
        <div className="flex flex-wrap gap-4 text-sm text-white/70">
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {job.location || 'Location'} • {job.locationType || 'Type'}
          </span>
          <span className="flex items-center gap-1">
            <Briefcase size={14} />
            {job.employmentType || 'Employment Type'}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {job.experienceLevel || 'Experience'}
          </span>
        </div>
        {job.salary && (
          <div className="mt-3 text-orange-400 font-semibold">{job.salary}</div>
        )}
      </div>

      {/* Description */}
      {job.description && (
        <div>
          <h4 className="font-semibold text-slate-900 mb-2">About This Role</h4>
          <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{job.description}</p>
        </div>
      )}

      {/* Responsibilities */}
      {job.responsibilities?.filter(r => r.trim()).length > 0 && (
        <div>
          <h4 className="font-semibold text-slate-900 mb-2">Responsibilities</h4>
          <ul className="space-y-2">
            {job.responsibilities.filter(r => r.trim()).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                <Check size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Requirements */}
      {job.requirements?.filter(r => r.trim()).length > 0 && (
        <div>
          <h4 className="font-semibold text-slate-900 mb-2">Requirements</h4>
          <ul className="space-y-2">
            {job.requirements.filter(r => r.trim()).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                <Check size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Application */}
      <div className="p-4 bg-slate-50 rounded-lg">
        <h4 className="font-semibold text-slate-900 mb-3">How to Apply</h4>
        {job.applicationLink && (
          <a href={job.applicationLink} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-orange-600 text-sm hover:text-orange-700 mb-2">
            <ExternalLink size={14} />
            {job.applicationLink}
          </a>
        )}
        {job.applicationEmail && (
          <a href={`mailto:${job.applicationEmail}`}
            className="flex items-center gap-2 text-orange-600 text-sm hover:text-orange-700">
            <Mail size={14} />
            {job.applicationEmail}
          </a>
        )}
        {!job.applicationLink && !job.applicationEmail && (
          <p className="text-slate-400 text-sm italic">No application method specified</p>
        )}
      </div>
    </div>
  );
}

// List Item Editor (for responsibilities/requirements)
function ListEditor({ items, onChange, placeholder }) {
  const handleItemChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  const addItem = () => {
    onChange([...items, '']);
  };

  const removeItem = (index) => {
    if (items.length === 1) {
      onChange(['']);
    } else {
      onChange(items.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={item}
            onChange={(e) => handleItemChange(index, e.target.value)}
            placeholder={`${placeholder} ${index + 1}`}
            className="flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeItem(index)}
            className="text-slate-400 hover:text-red-500"
          >
            <X size={16} />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addItem}
        className="w-full border-dashed"
      >
        <Plus size={16} className="mr-1" />
        Add Item
      </Button>
    </div>
  );
}

export default function CareersAdminPage() {
  const router = useRouter();
  const { toast } = useToast();

  // Auth check
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Jobs data
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('updatedAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Tab state
  const [adminTab, setAdminTab] = useState('jobs');

  // Editor state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobForm, setJobForm] = useState(emptyJob);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Preview
  const [previewJob, setPreviewJob] = useState(null);

  // Check auth on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin');
      } else {
        setIsAuthorized(true);
        await loadJobs();
      }
      setIsLoading(false);
    };
    checkSession();
  }, [router]);

  const loadJobs = async () => {
    const data = await fetchJobs();
    setJobs(data);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
  };

  // Filtered and sorted jobs
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.department.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)
      );
    }

    // Department filter
    if (filterDepartment !== 'all') {
      result = result.filter(job => job.department === filterDepartment);
    }

    // Status filter
    if (filterStatus !== 'all') {
      result = result.filter(job => job.status === filterStatus);
    }

    // Sort
    result.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      const comparison = sortBy.includes('At')
        ? new Date(bVal).getTime() - new Date(aVal).getTime()
        : String(aVal).localeCompare(String(bVal));
      return sortOrder === 'desc' ? comparison : -comparison;
    });

    return result;
  }, [jobs, searchQuery, filterDepartment, filterStatus, sortBy, sortOrder]);

  const openEditor = (job = null) => {
    if (job) {
      setEditingJob(job);
      setJobForm({
        ...job,
        responsibilities: job.responsibilities?.length ? job.responsibilities : [''],
        requirements: job.requirements?.length ? job.requirements : ['']
      });
    } else {
      setEditingJob(null);
      setJobForm(emptyJob);
    }
    setActiveTab('details');
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
    setEditingJob(null);
    setJobForm(emptyJob);
  };

  const handleSave = async (publish = false) => {
    setIsSaving(true);

    try {
      const jobData = {
        ...jobForm,
        responsibilities: jobForm.responsibilities.filter(r => r.trim()),
        requirements: jobForm.requirements.filter(r => r.trim())
      };

      if (publish) {
        const validation = validateJobForPublish(jobData);
        if (!validation.valid) {
          toast({
            variant: "destructive",
            title: "Cannot publish",
            description: validation.errors.join('. ')
          });
          setIsSaving(false);
          return;
        }
        jobData.status = 'published';
      }

      if (editingJob) {
        await updateJob(editingJob.id, jobData);
        toast({
          title: publish ? "Job published" : "Job updated",
          description: `"${jobData.title}" has been ${publish ? 'published' : 'saved'}.`
        });
      } else {
        await createJob(jobData);
        toast({
          title: "Job created",
          description: `"${jobData.title}" has been created${publish ? ' and published' : ' as draft'}.`
        });
      }

      await loadJobs();
      closeEditor();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save job listing."
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (job) => {
    setDeleteConfirm(job);
  };

  const confirmDelete = async () => {
    if (deleteConfirm) {
      await deleteJob(deleteConfirm.id);
      toast({
        title: "Job deleted",
        description: `"${deleteConfirm.title}" has been removed.`
      });
      await loadJobs();
      setDeleteConfirm(null);
    }
  };

  const toggleStatus = async (job) => {
    if (job.status === 'draft') {
      const validation = validateJobForPublish(job);
      if (!validation.valid) {
        toast({
          variant: "destructive",
          title: "Cannot publish",
          description: validation.errors.join('. ')
        });
        return;
      }
    }

    const newStatus = job.status === 'published' ? 'draft' : 'published';
    await updateJob(job.id, { status: newStatus });
    toast({
      title: newStatus === 'published' ? "Job published" : "Job unpublished",
      description: `"${job.title}" is now ${newStatus === 'published' ? 'visible' : 'hidden'} on the careers page.`
    });
    await loadJobs();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Briefcase className="text-white" size={18} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">Careers Admin</h1>
                <p className="text-xs text-slate-500 hidden sm:block">Manage job listings & applications</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('/careers', '_blank')}
                className="hidden sm:flex"
              >
                <Eye size={16} className="mr-1" />
                View Live
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-slate-600 hover:text-red-600"
              >
                <LogOut size={16} className="mr-1" />
                <span className="hidden sm:inline">Sign out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            <button
              onClick={() => setAdminTab('jobs')}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${adminTab === 'jobs'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
            >
              <Briefcase size={16} />
              Job Listings
            </button>
            <button
              onClick={() => setAdminTab('applications')}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${adminTab === 'applications'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
            >
              <Users size={16} />
              Applications
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {adminTab === 'applications' ? (
          <ApplicationsManager />
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-white">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-slate-900">{jobs.length}</div>
                  <div className="text-sm text-slate-500">Total Jobs</div>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-orange-600">
                    {jobs.filter(j => j.status === 'published').length}
                  </div>
                  <div className="text-sm text-slate-500">Published</div>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-amber-600">
                    {jobs.filter(j => j.status === 'draft').length}
                  </div>
                  <div className="text-sm text-slate-500">Drafts</div>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {jobs.filter(j => j.featured).length}
                  </div>
                  <div className="text-sm text-slate-500">Featured</div>
                </CardContent>
              </Card>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white"
                />
              </div>

              <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="w-[160px] bg-white">
                    <Building2 size={16} className="mr-2 text-slate-400" />
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departmentOptions.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[130px] bg-white">
                    <Filter size={16} className="mr-2 text-slate-400" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-white">
                      <ArrowUpDown size={16} className="mr-2" />
                      Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => { setSortBy('updatedAt'); setSortOrder('desc'); }}>
                      Last Updated
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { setSortBy('createdAt'); setSortOrder('desc'); }}>
                      Created Date
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { setSortBy('title'); setSortOrder('asc'); }}>
                      Title A-Z
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  onClick={() => openEditor()}
                  className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600"
                >
                  <Plus size={18} className="mr-1" />
                  <span className="hidden sm:inline">New Job</span>
                </Button>
              </div>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredJobs.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Briefcase className="text-slate-400" size={28} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">No jobs found</h3>
                    <p className="text-slate-500 mb-4">
                      {searchQuery || filterDepartment !== 'all' || filterStatus !== 'all'
                        ? 'Try adjusting your filters'
                        : 'Create your first job listing to get started'}
                    </p>
                    {!searchQuery && filterDepartment === 'all' && filterStatus === 'all' && (
                      <Button onClick={() => openEditor()}>
                        <Plus size={18} className="mr-1" />
                        Create Job
                      </Button>
                    )}
                  </motion.div>
                ) : (
                  filteredJobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                    >
                      <Card className="bg-white hover:shadow-md transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <Badge
                                  variant={job.status === 'published' ? 'default' : 'secondary'}
                                  className={job.status === 'published'
                                    ? 'bg-orange-100 text-orange-700 hover:bg-orange-100'
                                    : 'bg-amber-100 text-amber-700 hover:bg-amber-100'
                                  }
                                >
                                  {job.status === 'published' ? 'Published' : 'Draft'}
                                </Badge>
                                <Badge variant="outline" className="text-slate-600">
                                  {job.department}
                                </Badge>
                                {job.featured && (
                                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                    Featured
                                  </Badge>
                                )}
                              </div>

                              <h3 className="text-lg font-semibold text-slate-900 mb-1 truncate">
                                {job.title}
                              </h3>

                              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 mb-2">
                                <span className="flex items-center gap-1">
                                  <MapPin size={14} />
                                  {job.location} • {job.locationType}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Briefcase size={14} />
                                  {job.employmentType}
                                </span>
                                {job.experienceLevel && (
                                  <span className="flex items-center gap-1">
                                    <Clock size={14} />
                                    {job.experienceLevel}
                                  </span>
                                )}
                              </div>

                              <p className="text-sm text-slate-600 line-clamp-1 hidden sm:block">
                                {job.shortDescription || job.description}
                              </p>

                              <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                                <span className="flex items-center gap-1">
                                  <Calendar size={12} />
                                  Updated {new Date(job.updatedAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setPreviewJob(job)}
                                className="hidden sm:flex"
                              >
                                <Eye size={18} className="text-slate-400" />
                              </Button>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical size={18} className="text-slate-400" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => openEditor(job)}>
                                    <Edit size={16} className="mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => setPreviewJob(job)}>
                                    <Eye size={16} className="mr-2" />
                                    Preview
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => toggleStatus(job)}>
                                    {job.status === 'published' ? (
                                      <>
                                        <EyeOff size={16} className="mr-2" />
                                        Unpublish
                                      </>
                                    ) : (
                                      <>
                                        <Eye size={16} className="mr-2" />
                                        Publish
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => handleDelete(job)}
                                    className="text-red-600 focus:text-red-600"
                                  >
                                    <Trash2 size={16} className="mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </main>

      {/* Job Editor Sheet */}
      <Sheet open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editingJob ? 'Edit Job' : 'Create New Job'}</SheetTitle>
            <SheetDescription>
              {editingJob ? 'Update the job listing details' : 'Fill in the details for the new position'}
            </SheetDescription>
          </SheetHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6 mt-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    placeholder="e.g., Senior Software Engineer"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Department *</Label>
                    <Select
                      value={jobForm.department}
                      onValueChange={(v) => setJobForm({ ...jobForm, department: v })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {departmentOptions.map(opt => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Employment Type *</Label>
                    <Select
                      value={jobForm.employmentType}
                      onValueChange={(v) => setJobForm({ ...jobForm, employmentType: v })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {employmentTypeOptions.map(opt => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Location *</Label>
                    <Select
                      value={jobForm.location}
                      onValueChange={(v) => setJobForm({ ...jobForm, location: v })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {locationOptions.map(opt => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Location Type</Label>
                    <Select
                      value={jobForm.locationType}
                      onValueChange={(v) => setJobForm({ ...jobForm, locationType: v })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {locationTypeOptions.map(opt => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Experience Level</Label>
                    <Select
                      value={jobForm.experienceLevel}
                      onValueChange={(v) => setJobForm({ ...jobForm, experienceLevel: v })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevelOptions.map(opt => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Salary Range</Label>
                    <Input
                      value={jobForm.salary}
                      onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                      placeholder="e.g., ₹15L - ₹25L"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Application Link</Label>
                    <Input
                      value={jobForm.applicationLink}
                      onChange={(e) => setJobForm({ ...jobForm, applicationLink: e.target.value })}
                      placeholder="https://..."
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Application Email</Label>
                    <Input
                      type="email"
                      value={jobForm.applicationEmail}
                      onChange={(e) => setJobForm({ ...jobForm, applicationEmail: e.target.value })}
                      placeholder="careers@company.com"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <Label>Featured Job</Label>
                    <p className="text-sm text-slate-500">Show this job prominently</p>
                  </div>
                  <Switch
                    checked={jobForm.featured}
                    onCheckedChange={(v) => setJobForm({ ...jobForm, featured: v })}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-6 mt-6">
              <div>
                <Label>Short Description</Label>
                <Textarea
                  value={jobForm.shortDescription}
                  onChange={(e) => setJobForm({ ...jobForm, shortDescription: e.target.value })}
                  placeholder="A brief summary for job cards (1-2 sentences)"
                  className="mt-1"
                  rows={2}
                />
              </div>

              <div>
                <Label>Full Description *</Label>
                <Textarea
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  placeholder="Detailed job description..."
                  className="mt-1"
                  rows={5}
                />
              </div>

              <div>
                <Label className="mb-2 block">Responsibilities</Label>
                <ListEditor
                  items={jobForm.responsibilities}
                  onChange={(items) => setJobForm({ ...jobForm, responsibilities: items })}
                  placeholder="Responsibility"
                />
              </div>

              <div>
                <Label className="mb-2 block">Requirements</Label>
                <ListEditor
                  items={jobForm.requirements}
                  onChange={(items) => setJobForm({ ...jobForm, requirements: items })}
                  placeholder="Requirement"
                />
              </div>
            </TabsContent>

            <TabsContent value="preview" className="mt-6">
              <JobPreview job={jobForm} />
            </TabsContent>
          </Tabs>

          {/* Actions */}
          <div className="flex gap-3 mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={closeEditor}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSave(false)}
              disabled={isSaving || !jobForm.title}
              className="flex-1"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
              Save Draft
            </Button>
            <Button
              onClick={() => handleSave(true)}
              disabled={isSaving}
              className="flex-1 bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
              Publish
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Preview Sheet */}
      <Sheet open={!!previewJob} onOpenChange={() => setPreviewJob(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Job Preview</SheetTitle>
            <SheetDescription>
              This is how the job will appear on the careers page
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <JobPreview job={previewJob} />
          </div>
          <div className="flex gap-3 mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => setPreviewJob(null)}
              className="flex-1"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                openEditor(previewJob);
                setPreviewJob(null);
              }}
              className="flex-1"
            >
              <Edit size={16} className="mr-1" />
              Edit Job
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle size={20} />
              Delete Job Listing
            </DialogTitle>
            <DialogDescription className="pt-2">
              Are you sure you want to delete <strong>"{deleteConfirm?.title}"</strong>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  );
}
