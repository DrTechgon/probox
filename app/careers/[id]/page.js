'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { fetchPublishedJobs, fetchJobById } from '@/lib/jobs-store';
import { supabase } from '@/lib/supabase';
import { uploadCV } from '@/lib/storage-helpers';
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Calendar,
  Check,
  Share2,
  Bookmark,
  Building2,
  Send,
  CheckCircle,
  Loader2,
  Upload,
  FileText,
  X,
  User,
  Mail,
  Phone,
  Linkedin,
  Sparkles,
  Heart,
  Coffee,
  GraduationCap,
  Laptop,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

// Default benefits
const defaultBenefits = [
  { icon: Heart, title: "Health Insurance", description: "Comprehensive coverage for you and family" },
  { icon: Coffee, title: "Flexible Hours", description: "Work-life balance with flexible scheduling" },
  { icon: GraduationCap, title: "Learning Budget", description: "Annual budget for courses and certs" },
  { icon: Laptop, title: "Remote Friendly", description: "Work from anywhere with hybrid model" },
  { icon: DollarSign, title: "Performance Bonus", description: "Annual bonus based on performance" },
  { icon: Shield, title: "Job Security", description: "Stable position in a growing company" },
];

// CV Application Dialog Component
function CVApplicationDialog({ isOpen, onClose, jobTitle, job }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedIn: '',
  });
  const [cvFile, setCvFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && isValidFile(file)) {
      setCvFile(file);
      setErrors(prev => ({ ...prev, cv: '' }));
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && isValidFile(file)) {
      setCvFile(file);
      setErrors(prev => ({ ...prev, cv: '' }));
    }
  };

  const isValidFile = (file) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, cv: 'Please upload a PDF or Word document' }));
      return false;
    }
    if (file.size > maxSize) {
      setErrors(prev => ({ ...prev, cv: 'File size must be less than 5MB' }));
      return false;
    }
    return true;
  };

  const removeFile = () => {
    setCvFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?[\d\s-]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!cvFile) {
      newErrors.cv = 'Please upload your CV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Upload CV to Supabase Storage (organized by department/job-title)
      let cvUrl = '';
      if (cvFile) {
        try {
          const department = job?.department || 'general';
          const title = job?.title || 'general-application';
          const { url } = await uploadCV(cvFile, department, title, formData.name);
          cvUrl = url;
        } catch (uploadError) {
          console.error('Upload error:', uploadError);
          setErrors(prev => ({ ...prev, cv: 'Failed to upload CV. Please try again.' }));
          setIsSubmitting(false);
          return;
        }
      }

      // Insert application into database
      const { error: insertError } = await supabase
        .from('applications')
        .insert([{
          job_id: job?.id || null,
          job_title: jobTitle,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          linkedin: formData.linkedIn,
          cv_url: cvUrl,
        }]);

      if (insertError) {
        console.error('Insert error:', insertError);
        setErrors(prev => ({ ...prev, cv: 'Failed to submit application. Please try again.' }));
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err) {
      console.error('Submission error:', err);
      setErrors(prev => ({ ...prev, cv: 'An unexpected error occurred. Please try again.' }));
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', phone: '', linkedIn: '' });
    setCvFile(null);
    setErrors({});
    setIsSuccess(false);
    setIsSubmitting(false);
    onClose();
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-8 text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Application Submitted!</h3>
              <p className="text-slate-600 mb-6">
                Thank you for applying for <span className="font-semibold text-orange-600">{jobTitle}</span>.
                We'll review your application and get back to you soon.
              </p>
              <Button
                onClick={handleClose}
                className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600"
              >
                Close
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-500 to-blue-500 p-6 text-white">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles size={20} />
                    Apply for this Position
                  </DialogTitle>
                  <DialogDescription className="text-orange-100 mt-1">
                    {jobTitle}
                  </DialogDescription>
                </DialogHeader>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700 font-medium flex items-center gap-2">
                    <User size={14} className="text-orange-500" />
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`h-11 ${errors.name ? 'border-red-300 focus:border-red-500' : ''}`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 font-medium flex items-center gap-2">
                    <Mail size={14} className="text-orange-500" />
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className={`h-11 ${errors.email ? 'border-red-300 focus:border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-700 font-medium flex items-center gap-2">
                    <Phone size={14} className="text-orange-500" />
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className={`h-11 ${errors.phone ? 'border-red-300 focus:border-red-500' : ''}`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>

                {/* LinkedIn */}
                <div className="space-y-2">
                  <Label htmlFor="linkedIn" className="text-slate-700 font-medium flex items-center gap-2">
                    <Linkedin size={14} className="text-orange-500" />
                    LinkedIn Profile <span className="text-slate-400 text-xs">(Optional)</span>
                  </Label>
                  <Input
                    id="linkedIn"
                    name="linkedIn"
                    value={formData.linkedIn}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="h-11"
                  />
                </div>

                {/* CV Upload */}
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium flex items-center gap-2">
                    <FileText size={14} className="text-orange-500" />
                    Upload CV <span className="text-red-500">*</span>
                  </Label>

                  {cvFile ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <FileText className="text-orange-600" size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900 truncate max-w-[200px]">
                            {cvFile.name}
                          </p>
                          <p className="text-xs text-slate-500">{formatFileSize(cvFile.size)}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="p-1.5 hover:bg-orange-100 rounded-full transition-colors"
                      >
                        <X size={16} className="text-slate-500" />
                      </button>
                    </motion.div>
                  ) : (
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`
                        border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
                        ${isDragging
                          ? 'border-orange-500 bg-orange-50'
                          : errors.cv
                            ? 'border-red-300 bg-red-50'
                            : 'border-slate-200 hover:border-orange-300 hover:bg-slate-50'
                        }
                      `}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileSelect}
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                      />
                      <Upload className={`mx-auto mb-2 ${isDragging ? 'text-orange-500' : 'text-slate-400'}`} size={24} />
                      <p className="text-sm text-slate-600">
                        <span className="font-medium text-orange-600">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-slate-400 mt-1">PDF or Word (Max 5MB)</p>
                    </div>
                  )}
                  {errors.cv && (
                    <p className="text-red-500 text-sm">{errors.cv}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <Send className="ml-2" size={18} />
                    </>
                  )}
                </Button>

                <p className="text-xs text-slate-400 text-center">
                  By submitting, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      const foundJob = await fetchJobById(params.id);

      // Only show published jobs on public page
      if (foundJob && foundJob.status === 'published') {
        setJob(foundJob);

        // Get related jobs from same department
        const allPublished = await fetchPublishedJobs();
        const related = allPublished
          .filter(j => j.department === foundJob.department && j.id !== foundJob.id)
          .slice(0, 3);
        setRelatedJobs(related);
      } else {
        setJob(null);
      }
      setIsLoading(false);
    };

    loadJob();
  }, [params.id]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 pb-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin text-orange-500 mx-auto mb-4" />
            <p className="text-slate-500">Loading position details...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!job) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 pb-20 min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="text-slate-400" size={40} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Position Not Found</h1>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">The job you're looking for doesn't exist or has been filled.</p>
            <Link href="/careers">
              <Button className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600">
                <ArrowLeft size={18} className="mr-2" />
                Back to Careers
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const postedDate = new Date(job.createdAt || job.postedDate);
  const formattedDate = postedDate.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Use job benefits if available, otherwise use defaults
  const benefits = job.benefits || [
    "Competitive salary with equity options",
    "Health insurance for you and family",
    "Flexible work hours and hybrid model",
    "Learning & development budget",
    "Annual performance bonus"
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back Button */}
            <Link
              href="/careers#open-positions"
              className="inline-flex items-center text-orange-400 hover:text-orange-300 mb-8 transition-colors group"
            >
              <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to all positions
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div>
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {job.featured && (
                    <Badge className="bg-gradient-to-r from-orange-500 to-blue-500 text-white border-0">
                      <Sparkles size={12} className="mr-1" />
                      Featured
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-orange-400 border-orange-400/50 bg-orange-400/10">
                    {job.department}
                  </Badge>
                  <Badge variant="outline" className="text-slate-300 border-slate-500/50 bg-slate-500/10">
                    {job.employmentType}
                  </Badge>
                </div>

                {/* Job Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  {job.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 md:gap-6 text-slate-300">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-orange-400" />
                    <span>{job.location}</span>
                    {job.locationType && (
                      <span className="text-slate-500">• {job.locationType}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-orange-400" />
                    <span>{job.experienceLevel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign size={18} className="text-orange-400" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-orange-400" />
                    <span>Posted {formattedDate}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/10">
                  <Share2 size={18} />
                </Button>
                <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/10">
                  <Bookmark size={18} />
                </Button>
                <Button
                  size="lg"
                  onClick={() => setIsApplyOpen(true)}
                  className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600"
                >
                  <Send size={18} className="mr-2" />
                  Submit CV
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Job Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* About This Role */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="border-slate-200 shadow-sm">
                  <CardContent className="p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Building2 className="text-orange-500" size={24} />
                      About This Role
                    </h2>
                    <p className="text-slate-600 leading-relaxed text-lg">{job.description}</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-6 lg:p-8">
                      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Briefcase className="text-orange-500" size={24} />
                        Key Responsibilities
                      </h2>
                      <ul className="space-y-4">
                        {job.responsibilities.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                            className="flex items-start gap-3"
                          >
                            <div className="mt-1 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                              <Check size={12} className="text-orange-600" />
                            </div>
                            <span className="text-slate-600">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-6 lg:p-8">
                      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <GraduationCap className="text-orange-500" size={24} />
                        Requirements
                      </h2>
                      <ul className="space-y-4">
                        {job.requirements.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                            className="flex items-start gap-3"
                          >
                            <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                              <Check size={12} className="text-blue-600" />
                            </div>
                            <span className="text-slate-600">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Benefits & Perks */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="border-slate-200 shadow-sm bg-gradient-to-br from-slate-50 to-white">
                  <CardContent className="p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <Heart className="text-orange-500" size={24} />
                      Benefits & Perks
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {defaultBenefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                          className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-100"
                        >
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                            <benefit.icon className="text-white" size={20} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900">{benefit.title}</h3>
                            <p className="text-sm text-slate-500">{benefit.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Quick Apply Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:sticky lg:top-28"
              >
                <Card className="border-slate-200 shadow-lg overflow-hidden">
                  {/* Salary Header */}
                  <div className="bg-gradient-to-r from-orange-500 to-blue-500 p-6 text-white">
                    <p className="text-orange-100 text-sm mb-1">Compensation</p>
                    <p className="text-2xl font-bold">{job.salary}</p>
                  </div>

                  <CardContent className="p-6 space-y-5">
                    {/* Job Summary */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-600">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Building2 className="text-slate-500" size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase tracking-wider">Department</p>
                          <p className="font-medium text-slate-900">{job.department}</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center gap-3 text-slate-600">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                          <MapPin className="text-slate-500" size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase tracking-wider">Location</p>
                          <p className="font-medium text-slate-900">{job.location} {job.locationType && `(${job.locationType})`}</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center gap-3 text-slate-600">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Briefcase className="text-slate-500" size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase tracking-wider">Employment Type</p>
                          <p className="font-medium text-slate-900">{job.employmentType}</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center gap-3 text-slate-600">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Clock className="text-slate-500" size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase tracking-wider">Experience</p>
                          <p className="font-medium text-slate-900">{job.experienceLevel}</p>
                        </div>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <Button
                      onClick={() => setIsApplyOpen(true)}
                      className="w-full h-12 bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white font-medium"
                    >
                      <Send className="mr-2" size={18} />
                      Submit CV
                    </Button>

                    <p className="text-xs text-slate-400 text-center">
                      Apply now and join our amazing team!
                    </p>
                  </CardContent>
                </Card>

                {/* Related Jobs */}
                {relatedJobs.length > 0 && (
                  <Card className="border-slate-200 shadow-sm mt-4">
                    <CardContent className="p-4">
                      <h3 className="font-bold text-slate-900 mb-4">Related Positions</h3>
                      <div className="space-y-3">
                        {relatedJobs.map((relatedJob) => (
                          <Link key={relatedJob.id} href={`/careers/${relatedJob.id}`}>
                            <div className="p-3 rounded-lg border border-slate-100 hover:border-orange-200 hover:bg-orange-50/50 transition-all cursor-pointer">
                              <h4 className="font-medium text-slate-900 mb-1">{relatedJob.title}</h4>
                              <div className="flex items-center gap-3 text-xs text-slate-500">
                                <span>{relatedJob.location}</span>
                                <span>•</span>
                                <span>{relatedJob.employmentType}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Join our team of innovators and work on projects that matter. We're excited to hear from you!
            </p>
            <Button
              onClick={() => setIsApplyOpen(true)}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white px-8"
            >
              <Send className="mr-2" size={18} />
              Apply for this Position
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* CV Application Dialog */}
      <CVApplicationDialog
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        jobTitle={job.title}
        job={job}
      />
    </main>
  );
}
