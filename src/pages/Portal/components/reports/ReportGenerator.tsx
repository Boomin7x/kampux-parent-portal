/* eslint-disable react-hooks/purity */
import {
    School as AcademicIcon,
    CalendarToday as CalendarIcon,
    Delete as DeleteIcon,
    Description as DocIcon,
    Download as DownloadIcon,
    TableChart as ExcelIcon,
    PictureAsPdf as PdfIcon,
    Visibility as PreviewIcon,
    Assessment as ReportIcon,
    TrendingUp as TrendingIcon,
} from '@mui/icons-material';
import {
    alpha,
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    InputLabel,
    LinearProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import type { Student } from '../../../../types/student.types';

interface ReportGeneratorProps {
    selectedStudent: Student | null;
    className?: string;
}

interface ReportTemplate {
    id: string;
    name: string;
    description: string;
    type: 'academic' | 'attendance' | 'comprehensive' | 'progress';
    sections: string[];
    estimatedPages: number;
    icon: React.ReactNode;
}

interface ReportRequest {
    id: string;
    templateId: string;
    templateName: string;
    studentId: string;
    studentName: string;
    dateRange: {
        start: string;
        end: string;
    };
    sections: string[];
    format: 'pdf' | 'doc' | 'excel';
    status: 'pending' | 'generating' | 'completed' | 'failed';
    createdAt: string;
    completedAt?: string;
    downloadUrl?: string;
    fileSize?: string;
}

const reportTemplates: ReportTemplate[] = [
    {
        id: 'comprehensive',
        name: 'Comprehensive Student Report',
        description:
            'Complete overview including grades, attendance, behavior, and recommendations',
        type: 'comprehensive',
        sections: [
            'Academic Performance',
            'Attendance Summary',
            'Behavioral Insights',
            'Teacher Comments',
            'Recommendations',
        ],
        estimatedPages: 8,
        icon: <ReportIcon />,
    },
    {
        id: 'academic_progress',
        name: 'Academic Progress Report',
        description:
            'Detailed academic performance with grade trends and subject analysis',
        type: 'academic',
        sections: [
            'Grade Summary',
            'Subject Analysis',
            'Assignment History',
            'Performance Trends',
            'Academic Recommendations',
        ],
        estimatedPages: 5,
        icon: <AcademicIcon />,
    },
    {
        id: 'attendance_report',
        name: 'Attendance Analysis',
        description:
            'Comprehensive attendance tracking with patterns and insights',
        type: 'attendance',
        sections: [
            'Attendance Summary',
            'Daily Patterns',
            'Absence Analysis',
            'Tardiness Tracking',
            'Improvement Suggestions',
        ],
        estimatedPages: 3,
        icon: <CalendarIcon />,
    },
    {
        id: 'progress_tracker',
        name: 'Progress Tracker',
        description: 'Quarter-over-quarter progress with predictive analytics',
        type: 'progress',
        sections: [
            'GPA Trends',
            'Subject Progression',
            'Goal Tracking',
            'Predictive Analysis',
            'Action Items',
        ],
        estimatedPages: 4,
        icon: <TrendingIcon />,
    },
];

// Mock recent reports
const mockRecentReports: ReportRequest[] = [
    {
        id: 'rep1',
        templateId: 'comprehensive',
        templateName: 'Comprehensive Student Report',
        studentId: 'student1',
        studentName: 'Emma Johnson',
        dateRange: { start: '2024-01-01', end: '2024-01-18' },
        sections: [
            'Academic Performance',
            'Attendance Summary',
            'Behavioral Insights',
        ],
        format: 'pdf',
        status: 'completed',
        createdAt: '2024-01-18T10:30:00Z',
        completedAt: '2024-01-18T10:35:00Z',
        downloadUrl: '/reports/emma_comprehensive_jan2024.pdf',
        fileSize: '2.4 MB',
    },
    {
        id: 'rep2',
        templateId: 'academic_progress',
        templateName: 'Academic Progress Report',
        studentId: 'student1',
        studentName: 'Emma Johnson',
        dateRange: { start: '2024-01-01', end: '2024-01-15' },
        sections: ['Grade Summary', 'Subject Analysis', 'Performance Trends'],
        format: 'excel',
        status: 'completed',
        createdAt: '2024-01-15T14:20:00Z',
        completedAt: '2024-01-15T14:25:00Z',
        downloadUrl: '/reports/emma_academic_jan2024.xlsx',
        fileSize: '1.1 MB',
    },
    {
        id: 'rep3',
        templateId: 'attendance_report',
        templateName: 'Attendance Analysis',
        studentId: 'student1',
        studentName: 'Emma Johnson',
        dateRange: { start: '2024-01-01', end: '2024-01-18' },
        sections: ['Attendance Summary', 'Daily Patterns'],
        format: 'pdf',
        status: 'generating',
        createdAt: '2024-01-18T11:00:00Z',
    },
];

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({
    selectedStudent,
    className = '',
}) => {
    const theme = useTheme();
    const [selectedTemplate, setSelectedTemplate] = useState<string>('');
    const [dateRange, setDateRange] = useState({
        start: '2024-01-01',
        end: new Date().toISOString().split('T')[0],
    });
    const [selectedSections, setSelectedSections] = useState<string[]>([]);
    const [format, setFormat] = useState<'pdf' | 'doc' | 'excel'>('pdf');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [generateDialogOpen, setGenerateDialogOpen] = useState(false);
    const [recentReports, setRecentReports] =
        useState<ReportRequest[]>(mockRecentReports);

    const selectedTemplateData = reportTemplates.find(
        t => t.id === selectedTemplate
    );

    const handleTemplateChange = (templateId: string) => {
        setSelectedTemplate(templateId);
        const template = reportTemplates.find(t => t.id === templateId);
        if (template) {
            setSelectedSections(template.sections);
        }
    };

    const handleSectionToggle = (section: string) => {
        setSelectedSections(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    const getFormatIcon = (format: 'pdf' | 'doc' | 'excel') => {
        switch (format) {
            case 'pdf':
                return <PdfIcon sx={{ color: '#d32f2f' }} />;
            case 'doc':
                return <DocIcon sx={{ color: '#1976d2' }} />;
            case 'excel':
                return <ExcelIcon sx={{ color: '#388e3c' }} />;
        }
    };

    const getStatusColor = (status: ReportRequest['status']) => {
        switch (status) {
            case 'completed':
                return 'success';
            case 'generating':
                return 'info';
            case 'pending':
                return 'warning';
            case 'failed':
                return 'error';
            default:
                return 'default';
        }
    };

    const generateReport = () => {
        if (!selectedStudent || !selectedTemplate) return;

        const newReport: ReportRequest = {
            id: `rep_${Date.now()}`,
            templateId: selectedTemplate,
            templateName: selectedTemplateData?.name || '',
            studentId: selectedStudent.id,
            studentName: selectedStudent.fullName,
            dateRange,
            sections: selectedSections,
            format,
            status: 'generating',
            createdAt: new Date().toISOString(),
        };

        setRecentReports(prev => [newReport, ...prev]);
        setGenerateDialogOpen(false);

        // Simulate report generation
        setTimeout(() => {
            setRecentReports(prev =>
                prev.map(report =>
                    report.id === newReport.id
                        ? {
                              ...report,
                              status: 'completed',
                              completedAt: new Date().toISOString(),
                              downloadUrl: `/reports/${selectedStudent.fullName.toLowerCase().replace(' ', '_')}_${selectedTemplate}_${Date.now()}.${format}`,
                              fileSize: '1.8 MB',
                          }
                        : report
                )
            );
        }, 3000);
    };

    const downloadReport = (report: ReportRequest) => {
        // In a real application, this would trigger the actual download
        console.log('Downloading report:', report.downloadUrl);
    };

    const deleteReport = (reportId: string) => {
        setRecentReports(prev => prev.filter(r => r.id !== reportId));
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    if (!selectedStudent) {
        return (
            <Card className={className}>
                <CardContent>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <ReportIcon
                            sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }}
                        />
                        <Typography variant="h6" color="text.secondary">
                            Select a student to generate reports
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    return (
        <Box className={className}>
            {/* Header */}
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
                Report Generator
            </Typography>

            <Grid container spacing={3}>
                {/* Report Templates */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    <Card>
                        <CardContent>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 600, mb: 3 }}
                            >
                                Select Report Template
                            </Typography>
                            <Grid container spacing={2}>
                                {reportTemplates.map(template => (
                                    <Grid
                                        size={{ xs: 12, sm: 6 }}
                                        key={template.id}
                                    >
                                        <Paper
                                            sx={{
                                                p: 2,
                                                cursor: 'pointer',
                                                border:
                                                    selectedTemplate ===
                                                    template.id
                                                        ? `2px solid ${theme.palette.primary.main}`
                                                        : `1px solid ${theme.palette.divider}`,
                                                backgroundColor:
                                                    selectedTemplate ===
                                                    template.id
                                                        ? alpha(
                                                              theme.palette
                                                                  .primary.main,
                                                              0.05
                                                          )
                                                        : 'background.paper',
                                                '&:hover': {
                                                    borderColor:
                                                        theme.palette.primary
                                                            .main,
                                                },
                                                transition:
                                                    'all 0.2s ease-in-out',
                                            }}
                                            onClick={() =>
                                                handleTemplateChange(
                                                    template.id
                                                )
                                            }
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: 2,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        p: 1,
                                                        borderRadius: 1,
                                                        backgroundColor:
                                                            'primary.main',
                                                        color: 'white',
                                                    }}
                                                >
                                                    {template.icon}
                                                </Box>
                                                <Box
                                                    sx={{
                                                        flexGrow: 1,
                                                        minWidth: 0,
                                                    }}
                                                >
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{
                                                            fontWeight: 600,
                                                            mb: 1,
                                                        }}
                                                    >
                                                        {template.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{ mb: 2 }}
                                                    >
                                                        {template.description}
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            gap: 1,
                                                            flexWrap: 'wrap',
                                                        }}
                                                    >
                                                        <Chip
                                                            label={`${template.estimatedPages} pages`}
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                        <Chip
                                                            label={
                                                                template.type
                                                            }
                                                            size="small"
                                                            color="primary"
                                                            variant="outlined"
                                                        />
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>

                            {/* Configuration */}
                            {selectedTemplate && (
                                <Box sx={{ mt: 4 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 600, mb: 3 }}
                                    >
                                        Report Configuration
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="Start Date"
                                                type="date"
                                                value={dateRange.start}
                                                onChange={e =>
                                                    setDateRange(prev => ({
                                                        ...prev,
                                                        start: e.target.value,
                                                    }))
                                                }
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="End Date"
                                                type="date"
                                                value={dateRange.end}
                                                onChange={e =>
                                                    setDateRange(prev => ({
                                                        ...prev,
                                                        end: e.target.value,
                                                    }))
                                                }
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormControl fullWidth>
                                                <InputLabel>
                                                    Export Format
                                                </InputLabel>
                                                <Select
                                                    value={format}
                                                    onChange={e =>
                                                        setFormat(
                                                            e.target.value as
                                                                | 'pdf'
                                                                | 'doc'
                                                                | 'excel'
                                                        )
                                                    }
                                                    label="Export Format"
                                                >
                                                    <MenuItem value="pdf">
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems:
                                                                    'center',
                                                                gap: 1,
                                                            }}
                                                        >
                                                            <PdfIcon
                                                                sx={{
                                                                    color: '#d32f2f',
                                                                }}
                                                            />
                                                            PDF Document
                                                        </Box>
                                                    </MenuItem>
                                                    <MenuItem value="doc">
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems:
                                                                    'center',
                                                                gap: 1,
                                                            }}
                                                        >
                                                            <DocIcon
                                                                sx={{
                                                                    color: '#1976d2',
                                                                }}
                                                            />
                                                            Word Document
                                                        </Box>
                                                    </MenuItem>
                                                    <MenuItem value="excel">
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems:
                                                                    'center',
                                                                gap: 1,
                                                            }}
                                                        >
                                                            <ExcelIcon
                                                                sx={{
                                                                    color: '#388e3c',
                                                                }}
                                                            />
                                                            Excel Spreadsheet
                                                        </Box>
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{ fontWeight: 600, mb: 2 }}
                                            >
                                                Include Sections
                                            </Typography>
                                            <FormGroup>
                                                <Grid container>
                                                    {selectedTemplateData?.sections.map(
                                                        section => (
                                                            <Grid
                                                                size={{
                                                                    xs: 12,
                                                                    sm: 6,
                                                                }}
                                                                key={section}
                                                            >
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={selectedSections.includes(
                                                                                section
                                                                            )}
                                                                            onChange={() =>
                                                                                handleSectionToggle(
                                                                                    section
                                                                                )
                                                                            }
                                                                        />
                                                                    }
                                                                    label={
                                                                        section
                                                                    }
                                                                />
                                                            </Grid>
                                                        )
                                                    )}
                                                </Grid>
                                            </FormGroup>
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <Box
                                                sx={{ display: 'flex', gap: 2 }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    size="large"
                                                    onClick={() =>
                                                        setGenerateDialogOpen(
                                                            true
                                                        )
                                                    }
                                                    disabled={
                                                        selectedSections.length ===
                                                        0
                                                    }
                                                    startIcon={<ReportIcon />}
                                                    sx={{
                                                        textTransform: 'none',
                                                    }}
                                                >
                                                    Generate Report
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    size="large"
                                                    onClick={() =>
                                                        setPreviewOpen(true)
                                                    }
                                                    startIcon={<PreviewIcon />}
                                                    sx={{
                                                        textTransform: 'none',
                                                    }}
                                                >
                                                    Preview
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Recent Reports */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <Card>
                        <CardContent>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 600, mb: 3 }}
                            >
                                Recent Reports
                            </Typography>
                            <List sx={{ p: 0 }}>
                                {recentReports.map(report => (
                                    <ListItem
                                        key={report.id}
                                        sx={{
                                            border: `1px solid ${theme.palette.divider}`,
                                            borderRadius: 1,
                                            mb: 2,
                                            p: 2,
                                        }}
                                    >
                                        <ListItemIcon>
                                            {getFormatIcon(report.format)}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={report.templateName}
                                            secondary={
                                                <Box>
                                                    <Typography
                                                        variant="caption"
                                                        display="block"
                                                    >
                                                        {formatDate(
                                                            report.dateRange
                                                                .start
                                                        )}{' '}
                                                        -{' '}
                                                        {formatDate(
                                                            report.dateRange.end
                                                        )}
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            gap: 1,
                                                            mt: 1,
                                                        }}
                                                    >
                                                        <Chip
                                                            label={
                                                                report.status
                                                            }
                                                            size="small"
                                                            color={getStatusColor(
                                                                report.status
                                                            )}
                                                            sx={{
                                                                fontSize:
                                                                    '0.6875rem',
                                                                textTransform:
                                                                    'capitalize',
                                                            }}
                                                        />
                                                        {report.fileSize && (
                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                            >
                                                                {
                                                                    report.fileSize
                                                                }
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                    {report.status ===
                                                        'generating' && (
                                                        <LinearProgress
                                                            sx={{ mt: 1 }}
                                                        />
                                                    )}
                                                </Box>
                                            }
                                        />
                                        <ListItemSecondaryAction>
                                            <Box
                                                sx={{ display: 'flex', gap: 1 }}
                                            >
                                                {report.status ===
                                                    'completed' && (
                                                    <IconButton
                                                        size="small"
                                                        onClick={() =>
                                                            downloadReport(
                                                                report
                                                            )
                                                        }
                                                        sx={{
                                                            color: 'primary.main',
                                                        }}
                                                    >
                                                        <DownloadIcon fontSize="small" />
                                                    </IconButton>
                                                )}
                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        deleteReport(report.id)
                                                    }
                                                    sx={{ color: 'error.main' }}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                                {recentReports.length === 0 && (
                                    <Box sx={{ textAlign: 'center', py: 4 }}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            No reports generated yet
                                        </Typography>
                                    </Box>
                                )}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Generate Report Confirmation Dialog */}
            <Dialog
                open={generateDialogOpen}
                onClose={() => setGenerateDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Confirm Report Generation</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Generate <strong>{selectedTemplateData?.name}</strong>{' '}
                        for <strong>{selectedStudent.fullName}</strong>?
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            Date Range: {formatDate(dateRange.start)} -{' '}
                            {formatDate(dateRange.end)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Format: {format.toUpperCase()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Sections: {selectedSections.length} selected
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Estimated Size:{' '}
                            {selectedTemplateData?.estimatedPages} pages
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setGenerateDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={generateReport}>
                        Generate Report
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Preview Dialog */}
            <Dialog
                open={previewOpen}
                onClose={() => setPreviewOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Report Preview</DialogTitle>
                <DialogContent>
                    <Typography color="text.secondary">
                        Report preview functionality will show a sample of the
                        generated report layout and content.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setPreviewOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
