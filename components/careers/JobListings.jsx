'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  ChevronRight,
  Filter,
  X,
  Building2,
  Users,
  Sparkles
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import {
  fetchPublishedJobs,
  departmentOptions,
  locationOptions,
  employmentTypeOptions,
  experienceLevelOptions
} from '@/lib/jobs-store';

// Transform store data for filter dropdowns
const departments = ['All Departments', ...departmentOptions];
const locations = ['All Locations', ...locationOptions];
const employmentTypes = ['All Types', ...employmentTypeOptions];
const experienceLevels = ['All Levels', ...experienceLevelOptions];

// Job Card Component
function JobCard({ job, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/careers/${job.id}`}>
        <Card className="group h-full bg-white border-slate-200 hover:border-teal-200 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {job.featured && (
                    <Badge className="bg-gradient-to-r from-teal-500 to-blue-500 text-white text-xs">
                      <Sparkles size={12} className="mr-1" />
                      Featured
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-slate-600 border-slate-200">
                    {job.department}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors mb-2">
                  {job.title}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-lg bg-slate-50 group-hover:bg-gradient-to-br group-hover:from-teal-500 group-hover:to-blue-500 flex items-center justify-center transition-all duration-300 flex-shrink-0">
                <ChevronRight className="text-slate-400 group-hover:text-white transition-colors" size={20} />
              </div>
            </div>

            <p className="text-slate-600 text-sm mb-4 line-clamp-2">
              {job.shortDescription}
            </p>

            <div className="flex flex-wrap gap-3 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-teal-500" />
                {job.location}
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase size={14} className="text-teal-500" />
                {job.employmentType}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-teal-500" />
                {job.experienceLevel}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-teal-600 font-semibold">{job.salary}</span>
              <span className="text-slate-400 text-xs">
                Posted {new Date(job.postedDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

// Loading Skeleton
function JobCardSkeleton() {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex gap-2 mb-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="h-6 w-3/4 mb-2" />
          </div>
          <Skeleton className="w-10 h-10 rounded-lg" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex gap-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}

// Empty State
function EmptyState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16"
    >
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Search className="text-slate-400" size={32} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">No positions found</h3>
      <p className="text-slate-600 mb-6 max-w-md mx-auto">
        We couldn't find any positions matching your criteria. Try adjusting your filters or check back later.
      </p>
      <Button onClick={onReset} variant="outline">
        Clear all filters
      </Button>
    </motion.div>
  );
}

// Filter Badge
function ActiveFilter({ label, onRemove }) {
  return (
    <Badge variant="secondary" className="bg-teal-50 text-teal-700 hover:bg-teal-100 gap-1">
      {label}
      <button onClick={onRemove} className="ml-1 hover:text-teal-900">
        <X size={12} />
      </button>
    </Badge>
  );
}

export default function JobListings() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [department, setDepartment] = useState('All Departments');
  const [location, setLocation] = useState('All Locations');
  const [employmentType, setEmploymentType] = useState('All Types');
  const [experienceLevel, setExperienceLevel] = useState('All Levels');
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Load published jobs from store
  useEffect(() => {
    const loadJobs = () => {
      const publishedJobs = fetchPublishedJobs();
      setJobs(publishedJobs);
      setIsLoading(false);
    };
    
    loadJobs();
    
    // Listen for storage changes (for real-time updates from admin)
    const handleStorageChange = (e) => {
      if (e.key === 'probox_job_listings') {
        loadJobs();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        searchQuery === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.shortDescription || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment =
        department === 'All Departments' || job.department === department;

      const matchesLocation =
        location === 'All Locations' || job.location === location;

      const matchesType =
        employmentType === 'All Types' || job.employmentType === employmentType;

      const matchesLevel =
        experienceLevel === 'All Levels' || job.experienceLevel === experienceLevel;

      return matchesSearch && matchesDepartment && matchesLocation && matchesType && matchesLevel;
    });
  }, [jobs, searchQuery, department, location, employmentType, experienceLevel]);

  // Sort: featured first, then by date
  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      // Use createdAt or updatedAt instead of postedDate
      const dateA = new Date(a.createdAt || a.postedDate).getTime();
      const dateB = new Date(b.createdAt || b.postedDate).getTime();
      return dateB - dateA;
    });
  }, [filteredJobs]);

  // Active filters
  const activeFilters = useMemo(() => {
    const filters = [];
    if (department !== 'All Departments') filters.push({ key: 'department', label: department });
    if (location !== 'All Locations') filters.push({ key: 'location', label: location });
    if (employmentType !== 'All Types') filters.push({ key: 'employmentType', label: employmentType });
    if (experienceLevel !== 'All Levels') filters.push({ key: 'experienceLevel', label: experienceLevel });
    return filters;
  }, [department, location, employmentType, experienceLevel]);

  const removeFilter = useCallback((key) => {
    switch (key) {
      case 'department':
        setDepartment('All Departments');
        break;
      case 'location':
        setLocation('All Locations');
        break;
      case 'employmentType':
        setEmploymentType('All Types');
        break;
      case 'experienceLevel':
        setExperienceLevel('All Levels');
        break;
    }
  }, []);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setDepartment('All Departments');
    setLocation('All Locations');
    setEmploymentType('All Types');
    setExperienceLevel('All Levels');
  }, []);

  // Filter content for mobile sheet
  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-slate-700 mb-2 block">Department</label>
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700 mb-2 block">Location</label>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700 mb-2 block">Employment Type</label>
        <Select value={employmentType} onValueChange={setEmploymentType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {employmentTypes.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700 mb-2 block">Experience Level</label>
        <Select value={experienceLevel} onValueChange={setExperienceLevel}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {experienceLevels.map((level) => (
              <SelectItem key={level} value={level}>{level}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={resetFilters} variant="outline" className="w-full">
        Reset Filters
      </Button>
    </div>
  );

  return (
    <section id="open-positions" className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Open Positions</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-4">
            Find Your Role
          </h2>
          <p className="text-slate-600 text-lg">
            {jobOpenings.length} open positions across {departments.length - 1} departments
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <Input
                type="text"
                placeholder="Search by title, keyword, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-slate-50 border-slate-200 focus:bg-white"
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:flex gap-3">
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="w-[180px] h-12 bg-slate-50">
                  <Building2 size={16} className="mr-2 text-slate-400" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-[160px] h-12 bg-slate-50">
                  <MapPin size={16} className="mr-2 text-slate-400" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={employmentType} onValueChange={setEmploymentType}>
                <SelectTrigger className="w-[140px] h-12 bg-slate-50">
                  <Briefcase size={16} className="mr-2 text-slate-400" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {employmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                <SelectTrigger className="w-[140px] h-12 bg-slate-50">
                  <Users size={16} className="mr-2 text-slate-400" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Mobile Filter Button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden h-12">
                  <Filter size={18} className="mr-2" />
                  Filters
                  {activeFilters.length > 0 && (
                    <Badge className="ml-2 bg-teal-500">{activeFilters.length}</Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Positions</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-slate-500">Active filters:</span>
              {activeFilters.map((filter) => (
                <ActiveFilter
                  key={filter.key}
                  label={filter.label}
                  onRemove={() => removeFilter(filter.key)}
                />
              ))}
              <button
                onClick={resetFilters}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-600">
            Showing <span className="font-semibold text-slate-900">{sortedJobs.length}</span> positions
          </p>
        </div>

        {/* Job Listings */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        ) : sortedJobs.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {sortedJobs.map((job, index) => (
                <JobCard key={job.id} job={job} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <EmptyState onReset={resetFilters} />
        )}
      </div>
    </section>
  );
}
