'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Upload,
  FileText,
  X,
  CheckCircle2,
  Loader2,
  User,
  Mail,
  Phone,
  Linkedin,
  Sparkles
} from 'lucide-react';

export default function CVApplicationDialog({ isOpen, onClose, jobTitle }) {
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
    // Clear error when user types
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
    
    // Simulate API call - Replace with actual API integration later
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleClose = () => {
    // Reset form state when closing
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
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Application Submitted!</h3>
              <p className="text-slate-600 mb-6">
                Thank you for applying for <span className="font-semibold text-teal-600">{jobTitle}</span>. 
                We'll review your application and get back to you soon.
              </p>
              <Button 
                onClick={handleClose}
                className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
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
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-6 text-white">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles size={20} />
                    Apply for this Position
                  </DialogTitle>
                  <DialogDescription className="text-teal-100 mt-1">
                    {jobTitle}
                  </DialogDescription>
                </DialogHeader>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700 font-medium flex items-center gap-2">
                    <User size={14} className="text-teal-500" />
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
                    <Mail size={14} className="text-teal-500" />
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
                    <Phone size={14} className="text-teal-500" />
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
                    <Linkedin size={14} className="text-teal-500" />
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
                    <FileText size={14} className="text-teal-500" />
                    Upload CV <span className="text-red-500">*</span>
                  </Label>
                  
                  {cvFile ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-4 bg-teal-50 border border-teal-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                          <FileText className="text-teal-600" size={20} />
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
                        className="p-1.5 hover:bg-teal-100 rounded-full transition-colors"
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
                          ? 'border-teal-500 bg-teal-50' 
                          : errors.cv 
                            ? 'border-red-300 bg-red-50' 
                            : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50'
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
                      <Upload className={`mx-auto mb-2 ${isDragging ? 'text-teal-500' : 'text-slate-400'}`} size={24} />
                      <p className="text-sm text-slate-600">
                        <span className="font-medium text-teal-600">Click to upload</span> or drag and drop
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
                  className="w-full h-12 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
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
