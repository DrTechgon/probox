'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, CheckCircle, Upload, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { supabase } from '@/lib/supabase';
import { uploadCV } from '@/lib/storage-helpers';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  linkedin: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  portfolio: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  message: z.string().min(20, 'Please tell us a bit more about yourself'),
});

export default function GeneralApplication() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const [cvError, setCvError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const isValidFile = (file) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setCvError('Please upload a PDF or Word document');
      return false;
    }
    if (file.size > maxSize) {
      setCvError('File size must be less than 5MB');
      return false;
    }
    return true;
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && isValidFile(file)) {
      setCvFile(file);
      setCvError('');
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
      setCvError('');
    }
  };

  const removeFile = () => {
    setCvFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Upload CV if provided
      let cvUrl = '';
      if (cvFile) {
        try {
          const { url } = await uploadCV(cvFile, 'general', 'general-application', data.name);
          cvUrl = url;
        } catch (uploadError) {
          console.error('Upload error:', uploadError);
          setCvError('Failed to upload CV. Please try again.');
          setIsSubmitting(false);
          return;
        }
      }

      const { error } = await supabase
        .from('applications')
        .insert([{
          job_id: null,
          job_title: 'General Application',
          name: data.name,
          email: data.email,
          phone: data.phone,
          linkedin: data.linkedin || '',
          portfolio: data.portfolio || '',
          message: data.message,
          cv_url: cvUrl,
        }]);

      if (error) {
        console.error('Insert error:', error);
        throw error;
      }

      setIsSubmitted(true);
      reset();
      setCvFile(null);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setCvFile(null);
      setCvError('');
    }, 300);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Don't See the Right Role?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
              We're always looking for talented people. Send us your resume and tell us how you can contribute. We'll reach out when we have a role that matches your skills.
            </p>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-white/90 px-8 py-6 text-lg font-medium group"
                >
                  <FileText className="mr-2" size={20} />
                  Send Your Resume
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="text-white" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Application Received!</h3>
                    <p className="text-slate-600 mb-6">
                      Thank you for your interest in PROBOX. We'll review your profile and reach out if there's a match.
                    </p>
                    <Button onClick={handleClose} variant="outline">
                      Close
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">General Application</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
                      <div className="grid grid-cols-2 gap-4">
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

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="linkedin">LinkedIn URL</Label>
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
                          <Label htmlFor="portfolio">Portfolio URL</Label>
                          <Input
                            id="portfolio"
                            placeholder="https://..."
                            {...register('portfolio')}
                            className={errors.portfolio ? 'border-red-500' : ''}
                          />
                          {errors.portfolio && (
                            <p className="text-red-500 text-xs">{errors.portfolio.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Tell us about yourself *</Label>
                        <Textarea
                          id="message"
                          placeholder="Share your experience, skills, and what kind of role you're looking for..."
                          rows={4}
                          {...register('message')}
                          className={errors.message ? 'border-red-500' : ''}
                        />
                        {errors.message && (
                          <p className="text-red-500 text-xs">{errors.message.message}</p>
                        )}
                      </div>

                      {/* CV Upload */}
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <FileText size={14} className="text-orange-500" />
                          Upload CV <span className="text-slate-400 text-xs">(Optional)</span>
                        </Label>

                        {cvFile ? (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center">
                                <FileText className="text-orange-600" size={18} />
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
                              <X size={14} className="text-slate-500" />
                            </button>
                          </motion.div>
                        ) : (
                          <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`
                              border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all
                              ${isDragging
                                ? 'border-orange-500 bg-orange-50'
                                : cvError
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
                            <Upload className={`mx-auto mb-1 ${isDragging ? 'text-orange-500' : 'text-slate-400'}`} size={20} />
                            <p className="text-sm text-slate-600">
                              <span className="font-medium text-orange-600">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-slate-400 mt-1">PDF or Word (Max 5MB)</p>
                          </div>
                        )}
                        {cvError && (
                          <p className="text-red-500 text-xs">{cvError}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
