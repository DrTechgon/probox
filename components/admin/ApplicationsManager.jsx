'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Filter, Download, ExternalLink, Eye, Mail, Phone,
    Linkedin, FileText, Calendar, User, Briefcase, ChevronDown,
    Loader2, X, Clock, CheckCircle, XCircle, AlertCircle,
    ArrowUpDown, MessageSquare, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    SheetDescription,
} from '@/components/ui/sheet';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { getSignedCVUrl } from '@/lib/storage-helpers';

// Status config
const STATUS_OPTIONS = [
    { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-700', icon: Clock },
    { value: 'reviewed', label: 'Reviewed', color: 'bg-amber-100 text-amber-700', icon: Eye },
    { value: 'shortlisted', label: 'Shortlisted', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle },
    { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-700', icon: XCircle },
];

const getStatusConfig = (status) =>
    STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];

// Format date
const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatDateTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
};

// Application Detail Sheet
function ApplicationDetail({ application, isOpen, onClose, onStatusChange }) {
    if (!application) return null;
    const statusConfig = getStatusConfig(application.status);

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="text-xl">Application Details</SheetTitle>
                    <SheetDescription>
                        Submitted {formatDateTime(application.created_at)}
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                    {/* Applicant Info */}
                    <div className="p-5 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {application.name?.charAt(0)?.toUpperCase() || '?'}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">{application.name}</h3>
                                    <p className="text-sm text-slate-500">Applied for {application.job_title || 'General'}</p>
                                </div>
                            </div>
                            <Badge className={`${statusConfig.color} border-0`}>
                                {statusConfig.label}
                            </Badge>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <a href={`mailto:${application.email}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-orange-600 transition-colors">
                                <Mail size={15} className="text-orange-500" />
                                {application.email}
                            </a>
                            <a href={`tel:${application.phone}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-orange-600 transition-colors">
                                <Phone size={15} className="text-orange-500" />
                                {application.phone}
                            </a>
                            {application.linkedin && (
                                <a href={application.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-600 hover:text-orange-600 transition-colors">
                                    <Linkedin size={15} className="text-orange-500" />
                                    LinkedIn Profile
                                    <ExternalLink size={12} className="text-slate-400" />
                                </a>
                            )}
                            {application.portfolio && (
                                <a href={application.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-600 hover:text-orange-600 transition-colors">
                                    <Globe size={15} className="text-orange-500" />
                                    Portfolio
                                    <ExternalLink size={12} className="text-slate-400" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* CV */}
                    {application.cv_url && (
                        <div>
                            <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <FileText size={15} className="text-orange-500" />
                                Resume / CV
                            </h4>
                            <button
                                onClick={async () => {
                                    const url = await getSignedCVUrl(application.cv_url);
                                    if (url) window.open(url, '_blank');
                                }}
                                className="w-full flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors text-left"
                            >
                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <FileText className="text-orange-600" size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-900">View Resume</p>
                                    <p className="text-xs text-slate-500">Opens in a new tab</p>
                                </div>
                                <Download size={16} className="text-orange-500" />
                            </button>
                        </div>
                    )}

                    {/* Message */}
                    {application.message && (
                        <div>
                            <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <MessageSquare size={15} className="text-orange-500" />
                                Cover Message
                            </h4>
                            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                                    {application.message}
                                </p>
                            </div>
                        </div>
                    )}

                    <Separator />

                    {/* Status Update */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-3">Update Status</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {STATUS_OPTIONS.map(opt => {
                                const Icon = opt.icon;
                                return (
                                    <Button
                                        key={opt.value}
                                        variant={application.status === opt.value ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => onStatusChange(application.id, opt.value)}
                                        className={application.status === opt.value
                                            ? 'bg-gradient-to-r from-orange-500 to-blue-500 text-white border-0'
                                            : ''
                                        }
                                    >
                                        <Icon size={14} className="mr-1.5" />
                                        {opt.label}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default function ApplicationsManager() {
    const { toast } = useToast();
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterJob, setFilterJob] = useState('all');
    const [sortBy, setSortBy] = useState('created_at');
    const [sortOrder, setSortOrder] = useState('desc');
    const [selectedApp, setSelectedApp] = useState(null);

    // Load applications
    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('applications')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching applications:', error);
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to load applications.' });
        } else {
            setApplications(data || []);
        }
        setIsLoading(false);
    };

    // Unique job titles for filter
    const jobTitles = useMemo(() => {
        const titles = [...new Set(applications.map(a => a.job_title).filter(Boolean))];
        return titles.sort();
    }, [applications]);

    // Filtered & sorted
    const filtered = useMemo(() => {
        let result = [...applications];

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(a =>
                a.name?.toLowerCase().includes(q) ||
                a.email?.toLowerCase().includes(q) ||
                a.phone?.includes(q)
            );
        }

        if (filterStatus !== 'all') {
            result = result.filter(a => a.status === filterStatus);
        }

        if (filterJob !== 'all') {
            result = result.filter(a => a.job_title === filterJob);
        }

        result.sort((a, b) => {
            if (sortBy === 'created_at') {
                const diff = new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                return sortOrder === 'desc' ? diff : -diff;
            }
            const cmp = String(a[sortBy] || '').localeCompare(String(b[sortBy] || ''));
            return sortOrder === 'desc' ? -cmp : cmp;
        });

        return result;
    }, [applications, searchQuery, filterStatus, filterJob, sortBy, sortOrder]);

    // Update status
    const updateStatus = async (id, newStatus) => {
        const { error } = await supabase
            .from('applications')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to update status.' });
        } else {
            setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
            if (selectedApp?.id === id) {
                setSelectedApp(prev => ({ ...prev, status: newStatus }));
            }
            toast({ title: 'Status updated', description: `Application marked as ${newStatus}.` });
        }
    };

    // Stats
    const stats = useMemo(() => ({
        total: applications.length,
        new: applications.filter(a => a.status === 'new').length,
        shortlisted: applications.filter(a => a.status === 'shortlisted').length,
        rejected: applications.filter(a => a.status === 'rejected').length,
    }), [applications]);

    const resetFilters = () => {
        setSearchQuery('');
        setFilterStatus('all');
        setFilterJob('all');
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            </div>
        );
    }

    return (
        <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card className="bg-white">
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
                        <div className="text-sm text-slate-500">Total Applications</div>
                    </CardContent>
                </Card>
                <Card className="bg-white">
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
                        <div className="text-sm text-slate-500">New</div>
                    </CardContent>
                </Card>
                <Card className="bg-white">
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-emerald-600">{stats.shortlisted}</div>
                        <div className="text-sm text-slate-500">Shortlisted</div>
                    </CardContent>
                </Card>
                <Card className="bg-white">
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
                        <div className="text-sm text-slate-500">Rejected</div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <Input
                        placeholder="Search by name, email, or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white"
                    />
                </div>

                <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-[140px] bg-white">
                            <Filter size={16} className="mr-2 text-slate-400" />
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            {STATUS_OPTIONS.map(opt => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={filterJob} onValueChange={setFilterJob}>
                        <SelectTrigger className="w-[180px] bg-white">
                            <Briefcase size={16} className="mr-2 text-slate-400" />
                            <SelectValue placeholder="Job Title" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            {jobTitles.map(title => (
                                <SelectItem key={title} value={title}>{title}</SelectItem>
                            ))}
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
                            <DropdownMenuItem onClick={() => { setSortBy('created_at'); setSortOrder('desc'); }}>
                                Newest First
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setSortBy('created_at'); setSortOrder('asc'); }}>
                                Oldest First
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setSortBy('name'); setSortOrder('asc'); }}>
                                Name A-Z
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-slate-600">
                    Showing <span className="font-semibold text-slate-900">{filtered.length}</span> of {applications.length} applications
                </p>
                {(filterStatus !== 'all' || filterJob !== 'all' || searchQuery) && (
                    <button onClick={resetFilters} className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                        Clear filters
                    </button>
                )}
            </div>

            {/* Applications List */}
            <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                    {filtered.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <User className="text-slate-400" size={28} />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-1">No applications found</h3>
                            <p className="text-slate-500 mb-4">
                                {searchQuery || filterStatus !== 'all' || filterJob !== 'all'
                                    ? 'Try adjusting your filters'
                                    : 'No applications have been submitted yet'}
                            </p>
                        </motion.div>
                    ) : (
                        filtered.map((app, index) => {
                            const statusConfig = getStatusConfig(app.status);
                            const StatusIcon = statusConfig.icon;
                            return (
                                <motion.div
                                    key={app.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2, delay: index * 0.02 }}
                                >
                                    <Card
                                        className="bg-white hover:shadow-md transition-all cursor-pointer group"
                                        onClick={() => setSelectedApp(app)}
                                    >
                                        <CardContent className="p-4 sm:p-5">
                                            <div className="flex items-start gap-4">
                                                {/* Avatar */}
                                                <div className="w-11 h-11 bg-gradient-to-br from-orange-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                                    {app.name?.charAt(0)?.toUpperCase() || '?'}
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                                        <h3 className="text-base font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                                                            {app.name}
                                                        </h3>
                                                        <Badge className={`${statusConfig.color} border-0 text-xs`}>
                                                            <StatusIcon size={11} className="mr-1" />
                                                            {statusConfig.label}
                                                        </Badge>
                                                    </div>

                                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 mb-2">
                                                        <span className="flex items-center gap-1 truncate">
                                                            <Mail size={13} />
                                                            {app.email}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Phone size={13} />
                                                            {app.phone}
                                                        </span>
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                                                        <span className="flex items-center gap-1">
                                                            <Briefcase size={12} />
                                                            {app.job_title || 'General Application'}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Calendar size={12} />
                                                            {formatDate(app.created_at)}
                                                        </span>
                                                        {app.cv_url && (
                                                            <span className="flex items-center gap-1 text-orange-500">
                                                                <FileText size={12} />
                                                                CV attached
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Right side actions */}
                                                <div className="flex items-center gap-2 flex-shrink-0">
                                                    {app.cv_url && (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="hidden sm:flex"
                                                            onClick={async (e) => {
                                                                e.stopPropagation();
                                                                const url = await getSignedCVUrl(app.cv_url);
                                                                if (url) window.open(url, '_blank');
                                                            }}
                                                            title="View CV"
                                                        >
                                                            <Download size={16} className="text-slate-400 hover:text-orange-500" />
                                                        </Button>
                                                    )}

                                                    {/* Quick status change */}
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="hidden sm:flex text-xs text-slate-500"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                Status
                                                                <ChevronDown size={14} className="ml-1" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                                                            {STATUS_OPTIONS.map(opt => {
                                                                const Icon = opt.icon;
                                                                return (
                                                                    <DropdownMenuItem
                                                                        key={opt.value}
                                                                        onClick={() => updateStatus(app.id, opt.value)}
                                                                        className={app.status === opt.value ? 'bg-slate-100' : ''}
                                                                    >
                                                                        <Icon size={14} className="mr-2" />
                                                                        {opt.label}
                                                                        {app.status === opt.value && (
                                                                            <CheckCircle size={12} className="ml-auto text-orange-500" />
                                                                        )}
                                                                    </DropdownMenuItem>
                                                                );
                                                            })}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })
                    )}
                </AnimatePresence>
            </div>

            {/* Application Detail Sheet */}
            <ApplicationDetail
                application={selectedApp}
                isOpen={!!selectedApp}
                onClose={() => setSelectedApp(null)}
                onStatusChange={updateStatus}
            />
        </div>
    );
}
