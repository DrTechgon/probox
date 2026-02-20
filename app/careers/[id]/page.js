'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { fetchPublishedJobs, fetchJobById } from '@/lib/jobs-store';
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
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const applicationSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  linkedin: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  coverLetter: z.string().min(50, 'Please write at least 50 characters'),
});

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadJob = () => {
      const foundJob = fetchJobById(params.id);
      
      // Only show published jobs on public page
      if (foundJob && foundJob.status === 'published') {
        setJob(foundJob);
        
        // Get related jobs from same department
        const allPublished = fetchPublishedJobs();
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(applicationSchema),
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 pb-20 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
        </div>
        <Footer />
      </main>
    );
  }

  if (!job) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Position Not Found</h1>
            <p className="text-slate-600 mb-8">The job you're looking for doesn't exist or has been filled.</p>
            <Link href="/careers">
              <Button>
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

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsApplyOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 300);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/careers"
              className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to all positions
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge className="bg-white/10 text-white border-white/20">
                    {job.department}
                  </Badge>
                  {job.featured && (
                    <Badge className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                      Featured
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  {job.title}
                </h1>
                <div className="flex flex-wrap gap-6 text-white/70">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-teal-400" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={18} className="text-teal-400" />
                    {job.employmentType}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-teal-400" />
                    {job.experienceLevel}
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign size={18} className="text-teal-400" />
                    {job.salary}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/10">
                  <Share2 size={18} />
                </Button>
                <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/10">
                  <Bookmark size={18} />
                </Button>
                <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600">
                      Apply Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-12 text-center"
                      >
                        <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle className="text-white" size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Application Submitted!</h3>
                        <p className="text-slate-600 mb-6">
                          Thank you for applying for {job.title}. We'll review your application and get back to you soon.
                        </p>
                        <Button onClick={handleClose} variant="outline">
                          Close
                        </Button>
                      </motion.div>
                    ) : (
                      <>
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold">Apply for {job.title}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              placeholder="John Doe"
                              {...register('name')}
                              className={errors.name ? 'border-red-500' : ''}
                            />
                            {errors.name && (
                              <p className="text-red-500 text-xs">{errors.name.message}</p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="email">Email *</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                {...register('email')}
                                className={errors.email ? 'border-red-500' : ''}
                              />
                              {errors.email && (
                                <p className="text-red-500 text-xs">{errors.email.message}</p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone *</Label>
                              <Input
                                id="phone"
                                placeholder="+91 98765 43210"
                                {...register('phone')}
                                className={errors.phone ? 'border-red-500' : ''}
                              />
                              {errors.phone && (
                                <p className="text-red-500 text-xs">{errors.phone.message}</p>
                              )}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="linkedin">LinkedIn Profile</Label>
                            <Input
                              id="linkedin"
                              placeholder="https://linkedin.com/in/..."
                              {...register('linkedin')}
                              className={errors.linkedin ? 'border-red-500' : ''}
                            />
                            {errors.linkedin && (
                              <p className="text-red-500 text-xs">{errors.linkedin.message}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="coverLetter">Why are you interested in this role? *</Label>
                            <Textarea
                              id="coverLetter"
                              placeholder="Tell us about your relevant experience and why you'd be a great fit..."
                              rows={4}
                              {...register('coverLetter')}
                              className={errors.coverLetter ? 'border-red-500' : ''}
                            />
                            {errors.coverLetter && (
                              <p className="text-red-500 text-xs">{errors.coverLetter.message}</p>
                            )}
                          </div>

                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
                          >
                            {isSubmitting ? (
                              'Submitting...'
                            ) : (
                              <>
                                Submit Application
                                <Send className="ml-2" size={18} />
                              </>
                            )}
                          </Button>
                        </form>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Role</h2>
                <p className="text-slate-600 leading-relaxed">{job.description}</p>
              </motion.div>

              {/* Responsibilities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={12} className="text-teal-600" />
                      </div>
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={12} className="text-blue-600" />
                      </div>
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-4">What We Offer</h2>
                <ul className="space-y-3">
                  {job.benefits.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={12} className="text-white" />
                      </div>
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Apply Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border-slate-200 sticky top-24">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-slate-900 mb-4">Job Summary</h3>
                    <div className="space-y-4 text-sm">
                      <div className="flex items-center gap-3">
                        <Building2 size={18} className="text-slate-400" />
                        <div>
                          <p className="text-slate-500">Department</p>
                          <p className="font-medium text-slate-900">{job.department}</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <MapPin size={18} className="text-slate-400" />
                        <div>
                          <p className="text-slate-500">Location</p>
                          <p className="font-medium text-slate-900">{job.location}</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <Briefcase size={18} className="text-slate-400" />
                        <div>
                          <p className="text-slate-500">Employment Type</p>
                          <p className="font-medium text-slate-900">{job.employmentType}</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <Clock size={18} className="text-slate-400" />
                        <div>
                          <p className="text-slate-500">Experience</p>
                          <p className="font-medium text-slate-900">{job.experienceLevel}</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-slate-400" />
                        <div>
                          <p className="text-slate-500">Posted</p>
                          <p className="font-medium text-slate-900">
                            {new Date(job.createdAt || job.postedDate).toLocaleDateString('en-IN', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => setIsApplyOpen(true)}
                      className="w-full mt-6 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
                    >
                      Apply for this Position
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Related Jobs */}
              {relatedJobs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="font-bold text-slate-900 mb-4">Related Positions</h3>
                  <div className="space-y-3">
                    {relatedJobs.map((relatedJob) => (
                      <Link key={relatedJob.id} href={`/careers/${relatedJob.id}`}>
                        <Card className="border-slate-200 hover:border-teal-200 hover:shadow-md transition-all cursor-pointer">
                          <CardContent className="p-4">
                            <h4 className="font-medium text-slate-900 mb-1">{relatedJob.title}</h4>
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                              <span>{relatedJob.location}</span>
                              <span>•</span>
                              <span>{relatedJob.employmentType}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
