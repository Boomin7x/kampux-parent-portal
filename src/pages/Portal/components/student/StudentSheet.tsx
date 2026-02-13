import {
    EventBusy as AbsenceIcon,
    CheckCircle as CheckCircleIcon,
    Report as ComplaintIcon,
    Error as ErrorIcon,
    Info as InfoIcon,
    Gavel as SanctionIcon,
    Warning as WarningIcon,
} from '@mui/icons-material';
import {
    alpha,
    Box,
    Chip,
    Container,
    LinearProgress,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import React from 'react';
import type {
    Student,
    StudentSheetsData,
} from '../../../../types/student.types';
import { useGetSelectedStudentSheets } from '../../_hooks/useParentWithStore';

interface StudentSheetProps {
    selectedStudent: Student | null;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`student-tabpanel-${index}`}
            aria-labelledby={`student-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ py: 1.5 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `student-tab-${index}`,
        'aria-controls': `student-tabpanel-${index}`,
    };
}

interface SheetType {
    id: string;
    title: string;
    description: string;
    icon: React.ReactElement;
    color: string;
    bgColor: string;
    borderColor: string;
    count: number;
    severity: 'success' | 'info' | 'warning' | 'error';
}

// Helper Components
const RecordsList = ({
    title,
    icon,
    records,
    renderRecord,
    selectedStudent,
}: any) => {
    if (records.length === 0) {
        return (
            <Box
                sx={{
                    textAlign: 'center',
                    py: 1.5,
                    backgroundColor: 'primary.50',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'primary.100',
                }}
            >
                <CheckCircleIcon
                    sx={{ fontSize: 20, color: 'primary.main', mb: 1 }}
                />
                <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 0.5 }}
                >
                    No {title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: '0.75rem' }}
                >
                    {selectedStudent.fullName} has no {title.toLowerCase()} on
                    record.
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1,
                    pb: 0.5,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                {icon}
                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, fontSize: '1rem' }}
                >
                    {title} ({records.length})
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                {records.map(renderRecord)}
            </Box>
        </Box>
    );
};

const RecordCard = ({
    title,
    subtitle,
    date,
    description,
    status,
    statusColor,
    isCancelled,
    cancellationReason,
    cancellationDate,
    borderColor,
    bgColor,
    duration,
    category,
    issueDate,
}: any) => {
    const formatDate = (dateString: string) => {
        if (!dateString || dateString === '0001-01-01 00:00:00.000')
            return null;
        try {
            return new Date(dateString).toLocaleDateString('fr-FR');
        } catch {
            return null;
        }
    };

    const formattedDate = formatDate(date);
    const formattedIssueDate = formatDate(issueDate);
    const formattedCancellationDate = formatDate(cancellationDate);

    return (
        <Box
            sx={{
                p: 1.5,
                border: '1px solid',
                borderColor: 'divider',
                borderLeft: `3px solid ${borderColor}`,
                borderRadius: 1,
                backgroundColor: bgColor,
                '&:hover': {
                    borderColor: borderColor,
                    backgroundColor: alpha(borderColor, 0.05),
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 1,
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, mb: 0.5, fontSize: '0.875rem' }}
                    >
                        {title}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1,
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: '0.75rem' }}
                        >
                            {subtitle}
                        </Typography>
                        {category && (
                            <Chip
                                label={category}
                                size="small"
                                variant="outlined"
                                sx={{
                                    height: 14,
                                    fontSize: '0.625rem',
                                    '& .MuiChip-label': { px: 0.5 },
                                }}
                            />
                        )}
                    </Box>
                    <Box
                        sx={{
                            mt: 0.5,
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1,
                        }}
                    >
                        {formattedDate && (
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: '0.6875rem',
                                    color: 'text.secondary',
                                }}
                            >
                                Date: {formattedDate}
                            </Typography>
                        )}
                        {formattedIssueDate && (
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: '0.6875rem',
                                    color: 'text.secondary',
                                }}
                            >
                                • Issued: {formattedIssueDate}
                            </Typography>
                        )}
                        {duration && (
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: '0.6875rem',
                                    color: 'text.secondary',
                                }}
                            >
                                • Duration: {duration}
                            </Typography>
                        )}
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {status && (
                        <Chip
                            label={status}
                            size="small"
                            sx={{
                                height: 16,
                                fontSize: '0.625rem',
                                bgcolor: statusColor,
                                color: 'white',
                                fontWeight: 500,
                                '& .MuiChip-label': { px: 0.5 },
                            }}
                        />
                    )}
                    {isCancelled && (
                        <Chip
                            label="Cancelled"
                            size="small"
                            sx={{
                                height: 16,
                                fontSize: '0.625rem',
                                bgcolor: '#6b7280',
                                color: 'white',
                                fontWeight: 500,
                                '& .MuiChip-label': { px: 0.5 },
                            }}
                        />
                    )}
                </Box>
            </Box>

            {description && (
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        fontSize: '0.8125rem',
                        lineHeight: 1.3,
                        mb: 1,
                    }}
                >
                    {description}
                </Typography>
            )}

            {isCancelled && cancellationReason && (
                <Box
                    sx={{
                        mt: 1,
                        pt: 1,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{
                            fontWeight: 500,
                            color: 'text.secondary',
                            fontSize: '0.625rem',
                            display: 'block',
                            mb: 0.25,
                        }}
                    >
                        Cancellation:
                    </Typography>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: '0.75rem' }}
                    >
                        {cancellationReason}
                        {formattedCancellationDate &&
                            ` (${formattedCancellationDate})`}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

const ComplaintCard = ({ complaint }: any) => {
    return (
        <Box
            sx={{
                p: 1.5,
                border: '1px solid',
                borderColor: 'divider',
                borderLeft: '3px solid #7c3aed',
                borderRadius: 1,
                backgroundColor: 'primary.50',
                '&:hover': {
                    borderColor: 'primary.main',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 1,
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, mb: 0.5, fontSize: '0.875rem' }}
                    >
                        {complaint.summary || `Complaint #${complaint.id}`}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: '0.75rem' }}
                    >
                        {complaint.complaintCategoryCode}
                        {complaint.complaintDate && (
                            <>
                                {' '}
                                •{' '}
                                {new Date(
                                    complaint.complaintDate
                                ).toLocaleDateString('fr-FR')}
                            </>
                        )}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Chip
                        label={
                            complaint.haveBeenResolved ? 'Resolved' : 'Pending'
                        }
                        size="small"
                        sx={{
                            height: 16,
                            fontSize: '0.625rem',
                            bgcolor: complaint.haveBeenResolved
                                ? '#10b981'
                                : '#f59e0b',
                            color: 'white',
                            fontWeight: 500,
                            '& .MuiChip-label': { px: 0.5 },
                        }}
                    />
                    {complaint.isCancelled && (
                        <Chip
                            label="Cancelled"
                            size="small"
                            sx={{
                                height: 16,
                                fontSize: '0.625rem',
                                bgcolor: '#6b7280',
                                color: 'white',
                                fontWeight: 500,
                                '& .MuiChip-label': { px: 0.5 },
                            }}
                        />
                    )}
                </Box>
            </Box>

            {complaint.description && (
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        fontSize: '0.8125rem',
                        lineHeight: 1.3,
                        mb: 1,
                    }}
                >
                    {complaint.description}
                </Typography>
            )}

            {complaint.resolutionDescription && (
                <Box
                    sx={{
                        mt: 1,
                        pt: 1,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{
                            fontWeight: 500,
                            color: 'success.main',
                            fontSize: '0.625rem',
                            display: 'block',
                            mb: 0.25,
                        }}
                    >
                        Resolution:
                    </Typography>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: '0.75rem' }}
                    >
                        {complaint.resolutionDescription}
                        {complaint.resolutionDate &&
                            ` (${new Date(complaint.resolutionDate).toLocaleDateString('fr-FR')})`}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export const StudentSheet: React.FC<StudentSheetProps> = ({
    selectedStudent,
}) => {
    const { data, isLoading, error } = useGetSelectedStudentSheets() as {
        data: StudentSheetsData | undefined;
        isLoading: boolean;
        error: any;
    };

    const [currentTab, setCurrentTab] = React.useState(0);

    const handleTabChange = (
        _event: React.SyntheticEvent,
        newValue: number
    ) => {
        setCurrentTab(newValue);
    };

    if (!selectedStudent) {
        return (
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '40vh',
                        gap: 2,
                    }}
                >
                    <InfoIcon sx={{ fontSize: 48, color: 'text.disabled' }} />
                    <Typography variant="subtitle1" color="text.secondary">
                        Select a student to view their sheet records
                    </Typography>
                </Box>
            </Container>
        );
    }

    if (isLoading) {
        return (
            <Container maxWidth="lg">
                <Box sx={{ py: 4 }}>
                    <LinearProgress sx={{ mb: 3 }} />
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign="center"
                    >
                        Loading student sheet records...
                    </Typography>
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '40vh',
                        gap: 2,
                    }}
                >
                    <ErrorIcon sx={{ fontSize: 48, color: 'error.main' }} />
                    <Typography variant="subtitle1" color="error.main">
                        Failed to load student sheet data
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {error.message || 'An unexpected error occurred'}
                    </Typography>
                </Box>
            </Container>
        );
    }

    const sheetTypes: SheetType[] = [
        {
            id: 'sanctions',
            title: 'Sanctions',
            description: 'Disciplinary actions and penalties',
            icon: <SanctionIcon />,
            color: '#dc2626',
            bgColor: '#fef2f2',
            borderColor: '#fecaca',
            count: data?.registrationSanctions?.length || 0,
            severity: 'error',
        },
        {
            id: 'absences',
            title: 'Absence Records',
            description: 'Documented absences and tardiness',
            icon: <AbsenceIcon />,
            color: '#ea580c',
            bgColor: '#fff7ed',
            borderColor: '#fed7aa',
            count: data?.registrationAbsenceSheets?.length || 0,
            severity: 'warning',
        },
        {
            id: 'disciplinary',
            title: 'Disciplinary Reports',
            description: 'Behavioral incidents and actions',
            icon: <WarningIcon />,
            color: '#dc2626',
            bgColor: '#fef2f2',
            borderColor: '#fecaca',
            count: data?.registrationDisciplinarySheets?.length || 0,
            severity: 'error',
        },
        {
            id: 'observations',
            title: 'Observation Notes',
            description: 'Teacher and staff observations',
            icon: <InfoIcon />,
            color: '#2563eb',
            bgColor: '#eff6ff',
            borderColor: '#bfdbfe',
            count: data?.registrationObservationSheets?.length || 0,
            severity: 'info',
        },
        {
            id: 'complaints',
            title: 'Complaints',
            description: 'Filed complaints and resolutions',
            icon: <ComplaintIcon />,
            color: '#7c3aed',
            bgColor: '#f5f3ff',
            borderColor: '#c4b5fd',
            count: data?.registrationComplaints?.length || 0,
            severity: 'warning',
        },
    ];

    const totalRecords = sheetTypes.reduce(
        (total, sheet) => total + sheet.count,
        0
    );
    const hasAnyRecords = totalRecords > 0;
    // const activeSheets = sheetTypes.filter(sheet => sheet.count > 0);

    return (
        <Box sx={{ width: '100%', py: 1 }}>
            {/* Header Section */}
            <Box sx={{ mb: 1.5 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        mb: 0.5,
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 600,
                            color: 'text.primary',
                            fontSize: '1.125rem',
                        }}
                    >
                        Student Records
                    </Typography>
                    <Chip
                        label={
                            hasAnyRecords
                                ? `${totalRecords} Records`
                                : 'Clean Record'
                        }
                        size="small"
                        color={hasAnyRecords ? 'warning' : 'success'}
                        variant="outlined"
                        sx={{ fontSize: '0.75rem' }}
                    />
                </Box>
                <Typography
                    variant="subtitle2"
                    sx={{
                        color: 'text.secondary',
                        fontWeight: 400,
                    }}
                >
                    {selectedStudent.fullName} • Grade {selectedStudent.grade}
                </Typography>
            </Box>

            {/* Overview Stats - Always Visible */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: 1,
                    mb: 1.5,
                }}
            >
                <Box
                    sx={{
                        p: 2,
                        borderRadius: 1,
                        backgroundColor: hasAnyRecords ? '#fff7ed' : '#f0fdf4',
                        border: '1px solid',
                        borderColor: hasAnyRecords ? '#fed7aa' : '#bbf7d0',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                        }}
                    >
                        <CheckCircleIcon
                            sx={{
                                color: hasAnyRecords ? '#ea580c' : '#16a34a',
                                fontSize: 20,
                            }}
                        />
                        <Box>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: '0.75rem' }}
                            >
                                Record Status
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                }}
                            >
                                {hasAnyRecords
                                    ? 'Needs Attention'
                                    : 'Clean Record'}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        p: 2,
                        borderRadius: 1,
                        backgroundColor: 'primary.50',
                        border: '1px solid',
                        borderColor: 'primary.100',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                        }}
                    >
                        <InfoIcon
                            sx={{ color: 'primary.main', fontSize: 20 }}
                        />
                        <Box>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: '0.75rem' }}
                            >
                                Total Records
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                }}
                            >
                                {totalRecords}{' '}
                                {totalRecords === 1 ? 'Entry' : 'Entries'}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Sheet Type Cards Statistics */}
            <Box
                sx={{
                    display: 'grid',
                    gap: 1,
                    mb: 1.5,
                    gridTemplateColumns: {
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                        lg: 'repeat(5, 1fr)',
                    },
                }}
            >
                {sheetTypes.map(sheet => (
                    <Box
                        key={sheet.id}
                        sx={{
                            p: 1,
                            borderRadius: 1,
                            backgroundColor: sheet.bgColor,
                            border: '1px solid',
                            borderColor: sheet.borderColor,
                            transition: 'all 0.2s ease-in-out',
                            cursor: sheet.count > 0 ? 'pointer' : 'default',
                            opacity: sheet.count === 0 ? 0.7 : 1,
                            '&:hover':
                                sheet.count > 0
                                    ? {
                                          transform: 'translateY(-2px)',
                                          boxShadow:
                                              '0 4px 12px rgba(0,0,0,0.1)',
                                      }
                                    : {},
                            height: '100%', // Ensure equal height
                            display: 'flex', // Use flexbox for internal alignment
                            flexDirection: 'column',
                        }}
                        onClick={() => {
                            if (sheet.count > 0) {
                                // Map sheet IDs to correct tab indices
                                const tabMapping: Record<string, number> = {
                                    absences: 1,
                                    disciplinary: 2,
                                    observations: 3,
                                    complaints: 4,
                                    sanctions: 5,
                                };
                                const tabIndex = tabMapping[sheet.id];
                                if (tabIndex !== undefined) {
                                    setCurrentTab(tabIndex);
                                }
                            }
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 1,
                                flexGrow: 1, // Allow content to grow
                            }}
                        >
                            <Box
                                sx={{
                                    color: sheet.color,
                                    '& > svg': { fontSize: 18 },
                                }}
                            >
                                {sheet.icon}
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        mb: 0.25,
                                    }}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.primary',
                                            fontSize: '0.8125rem',
                                            lineHeight: 1.1,
                                        }}
                                    >
                                        {sheet.title}
                                    </Typography>
                                    <Chip
                                        label={sheet.count}
                                        size="small"
                                        sx={{
                                            height: 16,
                                            minWidth: 20,
                                            fontSize: '0.625rem',
                                            fontWeight: 600,
                                            backgroundColor:
                                                sheet.count > 0
                                                    ? sheet.color
                                                    : 'text.disabled',
                                            color: 'white',
                                            '& .MuiChip-label': {
                                                px: 0.5,
                                            },
                                        }}
                                    />
                                </Box>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: '0.6875rem',
                                        lineHeight: 1.2,
                                        display: 'block',
                                    }}
                                >
                                    {sheet.description}
                                </Typography>

                                {sheet.count === 0 && (
                                    <Box sx={{ mt: 'auto', pt: 0.5 }}>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: 'success.main',
                                                fontSize: '0.625rem',
                                                fontWeight: 500,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                            }}
                                        >
                                            <CheckCircleIcon
                                                sx={{ fontSize: 12 }}
                                            />
                                            No records
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* Tab Navigation */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 1 }}>
                <Tabs
                    value={currentTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        minHeight: 32,
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 500,
                            fontSize: '0.75rem',
                            minHeight: 32,
                            minWidth: 0,
                            px: 1.5,
                            py: 0.5,
                            '&.Mui-selected': {
                                color: 'primary.main',
                            },
                        },
                        '& .MuiTabs-indicator': {
                            height: 2,
                        },
                    }}
                >
                    <Tab label="Detailed Records" {...a11yProps(0)} />
                    <Tab
                        label={`Absences (${data?.registrationAbsenceSheets?.length || 0})`}
                        {...a11yProps(1)}
                    />
                    <Tab
                        label={`Disciplinary (${data?.registrationDisciplinarySheets?.length || 0})`}
                        {...a11yProps(2)}
                    />
                    <Tab
                        label={`Observations (${data?.registrationObservationSheets?.length || 0})`}
                        {...a11yProps(3)}
                    />
                    <Tab
                        label={`Complaints (${data?.registrationComplaints?.length || 0})`}
                        {...a11yProps(4)}
                    />
                    <Tab
                        label={`Sanctions (${data?.registrationSanctions?.length || 0})`}
                        {...a11yProps(5)}
                    />
                </Tabs>
            </Box>

            {/* Tab Panels */}
            <TabPanel value={currentTab} index={0}>
                {/* Overview Section */}
                {hasAnyRecords && (
                    <Box>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 600,
                                color: 'text.primary',
                                mb: 1.5,
                                fontSize: '0.875rem',
                            }}
                        >
                            Record Summary
                        </Typography>

                        {/* Statistics Grid */}
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: '1fr 1fr',
                                    sm: '1fr 1fr 1fr 1fr 1fr',
                                },
                                gap: 1,
                                mb: 2,
                                p: 1,
                                backgroundColor: '#f8fafc',
                                borderRadius: 1,
                                border: '1px solid #e2e8f0',
                            }}
                        >
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 600,
                                        color: '#dc2626',
                                    }}
                                >
                                    {data?.registrationSanctions?.length || 0}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.6875rem',
                                        color: '#64748b',
                                    }}
                                >
                                    Sanctions
                                </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 600,
                                        color: '#ea580c',
                                    }}
                                >
                                    {data?.registrationDisciplinarySheets
                                        ?.length || 0}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.6875rem',
                                        color: '#64748b',
                                    }}
                                >
                                    Disciplinary
                                </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 600,
                                        color: '#0891b2',
                                    }}
                                >
                                    {data?.registrationAbsenceSheets?.length ||
                                        0}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.6875rem',
                                        color: '#64748b',
                                    }}
                                >
                                    Absences
                                </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 600,
                                        color: '#059669',
                                    }}
                                >
                                    {data?.registrationObservationSheets
                                        ?.length || 0}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.6875rem',
                                        color: '#64748b',
                                    }}
                                >
                                    Observations
                                </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 600,
                                        color: '#7c3aed',
                                    }}
                                >
                                    {data?.registrationComplaints?.length || 0}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.6875rem',
                                        color: '#64748b',
                                    }}
                                >
                                    Complaints
                                </Typography>
                            </Box>
                        </Box>

                        {/* Recent Activity Compact List */}
                        <Typography
                            variant="caption"
                            sx={{
                                fontWeight: 600,
                                color: 'text.primary',
                                mb: 1,
                                display: 'block',
                                fontSize: '0.75rem',
                            }}
                        >
                            Latest Records
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 0.5,
                            }}
                        >
                            {/* Combine all records and show latest 5 */}
                            {[
                                ...(data?.registrationSanctions?.map(
                                    (item: any) => ({
                                        ...item,
                                        type: 'Sanction',
                                        color: '#dc2626',
                                        date: item.sanctionDate,
                                        title: item.sanctionName || 'Sanction',
                                        description: item.sanctionDescription,
                                    })
                                ) || []),
                                ...(data?.registrationDisciplinarySheets?.map(
                                    (item: any) => ({
                                        ...item,
                                        type: 'Disciplinary',
                                        color: '#ea580c',
                                        date: item.incidentDate,
                                        title: item.incidentType || 'Incident',
                                        description: item.incidentDescription,
                                    })
                                ) || []),
                                ...(data?.registrationAbsenceSheets?.map(
                                    (item: any) => ({
                                        ...item,
                                        type: 'Absence',
                                        color: '#0891b2',
                                        date: item.absenceDate,
                                        title: item.absenceType || 'Absence',
                                        description: item.absencePurpose,
                                    })
                                ) || []),
                                ...(data?.registrationObservationSheets?.map(
                                    (item: any) => ({
                                        ...item,
                                        type: 'Observation',
                                        color: '#059669',
                                        date: item.observationDate,
                                        title:
                                            item.observationType ||
                                            'Observation',
                                        description:
                                            item.observationDescription,
                                    })
                                ) || []),
                                ...(data?.registrationComplaints?.map(
                                    (item: any) => ({
                                        ...item,
                                        type: 'Complaint',
                                        color: '#7c3aed',
                                        date: item.complaintDate,
                                        title:
                                            item.complaintType || 'Complaint',
                                        description: item.complaintDescription,
                                    })
                                ) || []),
                            ]
                                .sort(
                                    (a, b) =>
                                        new Date(b.date).getTime() -
                                        new Date(a.date).getTime()
                                )
                                .slice(0, 6)
                                .map((record: any, idx: number) => (
                                    <Box
                                        key={`${record.type}-${record.id}-${idx}`}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            p: 0.75,
                                            backgroundColor: '#fafafa',
                                            borderRadius: 0.5,
                                            border: '1px solid #e5e7eb',
                                            borderLeft: `3px solid ${record.color}`,
                                            gap: 1,
                                        }}
                                    >
                                        <Box sx={{ flex: '0 0 80px' }}>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.6875rem',
                                                    fontWeight: 600,
                                                    color: record.color,
                                                }}
                                            >
                                                {record.type}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.625rem',
                                                    color: '#64748b',
                                                    display: 'block',
                                                }}
                                            >
                                                {new Date(
                                                    record.date
                                                ).toLocaleDateString('fr-FR')}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.75rem',
                                                    fontWeight: 500,
                                                    color: 'text.primary',
                                                    display: 'block',
                                                }}
                                            >
                                                {record.title}
                                            </Typography>
                                            {record.description && (
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontSize: '0.6875rem',
                                                        color: '#64748b',
                                                        display: 'block',
                                                        overflow: 'hidden',
                                                        textOverflow:
                                                            'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {record.description}
                                                </Typography>
                                            )}
                                        </Box>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.6875rem',
                                                color: '#9ca3af',
                                                fontFamily: 'monospace',
                                            }}
                                        >
                                            #{record.id}
                                        </Typography>
                                    </Box>
                                ))}
                        </Box>

                        {/* View Details Link */}
                        <Typography
                            variant="caption"
                            sx={{
                                mt: 1,
                                display: 'block',
                                textAlign: 'center',
                                color: '#6366f1',
                                fontSize: '0.6875rem',
                            }}
                        >
                            Click on individual tabs above for detailed views
                        </Typography>
                    </Box>
                )}

                {!hasAnyRecords && (
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                        <CheckCircleIcon
                            sx={{ fontSize: 32, color: 'success.main', mb: 1 }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 0.5,
                                color: 'success.main',
                                fontSize: '1rem',
                            }}
                        >
                            Excellent Record!
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {selectedStudent.fullName} has a clean behavioral
                            record with no incidents on file.
                        </Typography>
                    </Box>
                )}
            </TabPanel>

            {/* Absences Tab */}
            <TabPanel value={currentTab} index={1}>
                <RecordsList
                    title="Absence Records"
                    icon={<AbsenceIcon />}
                    records={data?.registrationAbsenceSheets || []}
                    selectedStudent={selectedStudent}
                    renderRecord={(absence: any, idx: number) => {
                        const getTitle = () => {
                            return absence.absenceType || 'Absence';
                        };

                        const getDescription = () => {
                            const parts = [];
                            if (absence.absencePurpose) {
                                parts.push(`Reason: ${absence.absencePurpose}`);
                            }
                            if (absence.absencePurposeDescription) {
                                parts.push(
                                    `Details: ${absence.absencePurposeDescription}`
                                );
                            }
                            return parts.join(' | ') || null;
                        };

                        const getDuration = () => {
                            if (
                                absence.absenceDurationValue &&
                                absence.absenceDurationUnit
                            ) {
                                return `${absence.absenceDurationValue} ${absence.absenceDurationUnit}`;
                            }
                            if (
                                absence.absenceEndDate &&
                                absence.absenceEndDate !==
                                    '0001-01-01 00:00:00.000'
                            ) {
                                const start = new Date(
                                    absence.absenceStartDate
                                );
                                const end = new Date(absence.absenceEndDate);
                                const days = Math.ceil(
                                    (end.getTime() - start.getTime()) /
                                        (1000 * 60 * 60 * 24)
                                );
                                return days > 0 ? `${days} day(s)` : null;
                            }
                            return null;
                        };

                        return (
                            <RecordCard
                                key={absence.id || idx}
                                title={getTitle()}
                                subtitle={`Period: ${absence.schoolYearPeriodName}`}
                                date={absence.absenceStartDate}
                                description={getDescription()}
                                status={
                                    absence.justifedAbsence
                                        ? 'Justified'
                                        : 'Unjustified'
                                }
                                statusColor={
                                    absence.justifedAbsence
                                        ? '#10b981'
                                        : '#f59e0b'
                                }
                                duration={getDuration()}
                                issueDate={absence.issueDate}
                                isCancelled={absence.isCancelled}
                                cancellationReason={absence.cancellationPurpose}
                                cancellationDate={absence.cancellationDate}
                                borderColor="#ea580c"
                                bgColor="#fff7ed"
                            />
                        );
                    }}
                />
            </TabPanel>

            {/* Disciplinary Tab */}
            <TabPanel value={currentTab} index={2}>
                {data?.registrationDisciplinarySheets &&
                data.registrationDisciplinarySheets.length > 0 ? (
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                mb: 1,
                            }}
                        >
                            <WarningIcon
                                sx={{ fontSize: 14, color: '#dc2626' }}
                            />
                            <Typography
                                variant="caption"
                                sx={{ fontWeight: 600, fontSize: '0.75rem' }}
                            >
                                Disciplinary Records (
                                {data.registrationDisciplinarySheets.length})
                            </Typography>
                        </Box>

                        {/* Compact List View */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 0.5,
                            }}
                        >
                            {data.registrationDisciplinarySheets.map(
                                (incident: any, idx: number) => {
                                    const getSeverityColor = (type: string) => {
                                        switch (type?.toLowerCase()) {
                                            case 'trouble':
                                                return '#dc2626';
                                            case 'jeu':
                                                return '#ea580c';
                                            default:
                                                return '#6b7280';
                                        }
                                    };

                                    const color = getSeverityColor(
                                        incident.disciplinaryType
                                    );

                                    return (
                                        <Box
                                            key={incident.id || idx}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                p: 0.75,
                                                backgroundColor: '#fafafa',
                                                borderRadius: 0.5,
                                                border: '1px solid #e5e7eb',
                                                borderLeft: `3px solid ${color}`,
                                                '&:hover': {
                                                    backgroundColor: '#f5f5f5',
                                                },
                                            }}
                                        >
                                            {/* Type & Period */}
                                            <Box sx={{ minWidth: 120, mr: 1 }}>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: '0.6875rem',
                                                        color,
                                                    }}
                                                >
                                                    {incident.disciplinaryType ||
                                                        'General'}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontSize: '0.625rem',
                                                        color: 'text.secondary',
                                                        display: 'block',
                                                    }}
                                                >
                                                    {
                                                        incident.schoolYearPeriodName
                                                    }
                                                </Typography>
                                            </Box>

                                            {/* Content */}
                                            <Box sx={{ flex: 1, mr: 1 }}>
                                                {incident.disciplinaryEventSummary && (
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            fontSize:
                                                                '0.6875rem',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {
                                                            incident.disciplinaryEventSummary
                                                        }
                                                    </Typography>
                                                )}
                                                {incident.disciplinaryEventDescription &&
                                                    incident.disciplinaryEventDescription !==
                                                        incident.disciplinaryEventSummary && (
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                fontSize:
                                                                    '0.625rem',
                                                                color: 'text.secondary',
                                                                display:
                                                                    'block',
                                                            }}
                                                        >
                                                            {
                                                                incident.disciplinaryEventDescription
                                                            }
                                                        </Typography>
                                                    )}
                                            </Box>

                                            {/* ID & Status */}
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.5,
                                                }}
                                            >
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontSize: '0.625rem',
                                                        color: 'text.secondary',
                                                    }}
                                                >
                                                    #{incident.id}
                                                </Typography>
                                                {incident.isCancelled && (
                                                    <Chip
                                                        label="Cancelled"
                                                        size="small"
                                                        sx={{
                                                            height: 14,
                                                            fontSize:
                                                                '0.625rem',
                                                            backgroundColor:
                                                                '#6b7280',
                                                            color: 'white',
                                                            '& .MuiChip-label':
                                                                { px: 0.5 },
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        </Box>
                                    );
                                }
                            )}
                        </Box>

                        {/* Compact Summary */}
                        <Box
                            sx={{
                                mt: 1,
                                p: 0.75,
                                backgroundColor: '#f8fafc',
                                borderRadius: 0.5,
                                border: '1px solid #e2e8f0',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.625rem',
                                        fontWeight: 600,
                                    }}
                                >
                                    Summary:
                                </Typography>
                                {(() => {
                                    const stats =
                                        data.registrationDisciplinarySheets.reduce(
                                            (acc: any, inc: any) => {
                                                acc.types[
                                                    inc.disciplinaryType ||
                                                        'Other'
                                                ] =
                                                    (acc.types[
                                                        inc.disciplinaryType ||
                                                            'Other'
                                                    ] || 0) + 1;
                                                if (inc.isCancelled)
                                                    acc.cancelled++;
                                                return acc;
                                            },
                                            { types: {}, cancelled: 0 }
                                        );

                                    const mostCommon = Object.entries(
                                        stats.types
                                    ).sort(
                                        ([, a], [, b]) =>
                                            (b as number) - (a as number)
                                    )[0];

                                    return (
                                        <>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.625rem',
                                                    color: '#dc2626',
                                                }}
                                            >
                                                Most: {mostCommon?.[0] || 'N/A'}{' '}
                                                {(mostCommon?.[1] as string) ||
                                                    0}
                                            </Typography>
                                            {stats.cancelled > 0 && (
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontSize: '0.625rem',
                                                        color: '#6b7280',
                                                    }}
                                                >
                                                    Cancelled: {stats.cancelled}
                                                </Typography>
                                            )}
                                        </>
                                    );
                                })()}
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            textAlign: 'center',
                            py: 1.5,
                            backgroundColor: 'success.50',
                            borderRadius: 0.5,
                            border: '1px solid',
                            borderColor: 'success.100',
                        }}
                    >
                        <CheckCircleIcon
                            sx={{
                                fontSize: 16,
                                color: 'success.main',
                                mb: 0.5,
                            }}
                        />
                        <Typography
                            variant="caption"
                            sx={{
                                fontWeight: 600,
                                display: 'block',
                                color: 'success.main',
                                fontSize: '0.75rem',
                            }}
                        >
                            No Disciplinary Issues
                        </Typography>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: '0.6875rem' }}
                        >
                            {selectedStudent.fullName} has excellent behavior.
                        </Typography>
                    </Box>
                )}
            </TabPanel>

            {/* Observations Tab */}
            <TabPanel value={currentTab} index={3}>
                {data?.registrationObservationSheets &&
                data.registrationObservationSheets.length > 0 ? (
                    <Box>
                        <Box sx={{ mb: 1.5 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    mb: 1,
                                }}
                            >
                                <InfoIcon
                                    sx={{ fontSize: 16, color: '#059669' }}
                                />
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: '0.8125rem',
                                    }}
                                >
                                    Observation Records (
                                    {data.registrationObservationSheets.length})
                                </Typography>
                            </Box>
                        </Box>

                        {/* Observations List */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 0.5,
                            }}
                        >
                            {data.registrationObservationSheets.map(
                                (observation: any, idx: number) => {
                                    const getPurposeColor = (
                                        purpose: string
                                    ) => {
                                        const colors: Record<string, string> = {
                                            behavioral: '#dc2626',
                                            academic: '#2563eb',
                                            social: '#059669',
                                            disciplinary: '#ea580c',
                                            general: '#6b7280',
                                        };
                                        return (
                                            colors[purpose?.toLowerCase()] ||
                                            '#6b7280'
                                        );
                                    };

                                    const color = getPurposeColor(
                                        observation.observationPurpose
                                    );

                                    return (
                                        <Box
                                            key={observation.id || idx}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                p: 0.75,
                                                backgroundColor: '#fafafa',
                                                borderRadius: 0.5,
                                                border: '1px solid #e5e7eb',
                                                borderLeft: `3px solid ${color}`,
                                                gap: 1,
                                            }}
                                        >
                                            {/* Type & Date */}
                                            <Box sx={{ minWidth: 100, mr: 1 }}>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: '0.6875rem',
                                                        color,
                                                    }}
                                                >
                                                    {observation.observationPurpose ||
                                                        'General'}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontSize: '0.625rem',
                                                        color: 'text.secondary',
                                                        display: 'block',
                                                    }}
                                                >
                                                    {new Date(
                                                        observation.observationDate
                                                    ).toLocaleDateString(
                                                        'fr-FR'
                                                    )}
                                                </Typography>
                                            </Box>

                                            {/* Content */}
                                            <Box sx={{ flex: 1, mr: 1 }}>
                                                {observation.observationDescription && (
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            fontSize:
                                                                '0.6875rem',
                                                            fontWeight: 500,
                                                            color: 'text.primary',
                                                            display: 'block',
                                                        }}
                                                    >
                                                        {
                                                            observation.observationDescription
                                                        }
                                                    </Typography>
                                                )}
                                                {observation.schoolYearPeriodName && (
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            fontSize:
                                                                '0.625rem',
                                                            color: 'text.secondary',
                                                            display: 'block',
                                                        }}
                                                    >
                                                        Period:{' '}
                                                        {
                                                            observation.schoolYearPeriodName
                                                        }
                                                    </Typography>
                                                )}
                                            </Box>

                                            {/* ID & Status */}
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.5,
                                                }}
                                            >
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontSize: '0.625rem',
                                                        color: 'text.secondary',
                                                    }}
                                                >
                                                    #{observation.id}
                                                </Typography>
                                                {observation.isCancelled && (
                                                    <Chip
                                                        label="Cancelled"
                                                        size="small"
                                                        sx={{
                                                            height: 14,
                                                            fontSize:
                                                                '0.625rem',
                                                            backgroundColor:
                                                                '#6b7280',
                                                            color: 'white',
                                                            '& .MuiChip-label':
                                                                { px: 0.5 },
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        </Box>
                                    );
                                }
                            )}
                        </Box>

                        {/* Compact Summary */}
                        <Box
                            sx={{
                                mt: 1,
                                p: 0.75,
                                backgroundColor: '#f8fafc',
                                borderRadius: 0.5,
                                border: '1px solid #e2e8f0',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.625rem',
                                        fontWeight: 600,
                                    }}
                                >
                                    Summary:
                                </Typography>
                                {(() => {
                                    const stats =
                                        data.registrationObservationSheets.reduce(
                                            (acc: any, obs: any) => {
                                                acc.purposes[
                                                    obs.observationPurpose ||
                                                        'General'
                                                ] =
                                                    (acc.purposes[
                                                        obs.observationPurpose ||
                                                            'General'
                                                    ] || 0) + 1;
                                                if (obs.isCancelled)
                                                    acc.cancelled++;
                                                return acc;
                                            },
                                            { purposes: {}, cancelled: 0 }
                                        );

                                    const mostCommon = Object.entries(
                                        stats.purposes
                                    ).sort(
                                        ([, a], [, b]) =>
                                            (b as number) - (a as number)
                                    )[0];

                                    return (
                                        <>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.625rem',
                                                    color: '#059669',
                                                }}
                                            >
                                                Most: {mostCommon?.[0] || 'N/A'}{' '}
                                                {(mostCommon?.[1] as string) ||
                                                    0}
                                            </Typography>
                                            {stats.cancelled > 0 && (
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontSize: '0.625rem',
                                                        color: '#6b7280',
                                                    }}
                                                >
                                                    Cancelled: {stats.cancelled}
                                                </Typography>
                                            )}
                                        </>
                                    );
                                })()}
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            textAlign: 'center',
                            py: 1.5,
                            backgroundColor: 'success.50',
                            borderRadius: 0.5,
                            border: '1px solid',
                            borderColor: 'success.100',
                        }}
                    >
                        <CheckCircleIcon
                            sx={{
                                fontSize: 16,
                                color: 'success.main',
                                mb: 0.5,
                            }}
                        />
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: 'success.main',
                            }}
                        >
                            No observations recorded
                        </Typography>
                    </Box>
                )}
            </TabPanel>

            {/* Complaints Tab */}
            <TabPanel value={currentTab} index={4}>
                <RecordsList
                    title="Student Complaints"
                    icon={<ComplaintIcon />}
                    records={data?.registrationComplaints || []}
                    selectedStudent={selectedStudent}
                    renderRecord={(complaint: any, idx: number) => (
                        <ComplaintCard
                            key={'complaint.id' + idx}
                            complaint={complaint}
                        />
                    )}
                />
            </TabPanel>

            {/* Sanctions Tab */}
            <TabPanel value={currentTab} index={5}>
                {data?.registrationSanctions &&
                data.registrationSanctions.length > 0 ? (
                    <Box>
                        <Box sx={{ mb: 1.5 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    mb: 1,
                                }}
                            >
                                <SanctionIcon
                                    sx={{ fontSize: 16, color: '#dc2626' }}
                                />
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: '0.8125rem',
                                    }}
                                >
                                    Sanctions Overview (
                                    {data.registrationSanctions.length})
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        md: '2fr 1fr',
                                    },
                                    gap: 1.5,
                                }}
                            >
                                {/* Timeline View */}
                                <Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 0.5,
                                            display: 'block',
                                            fontSize: '0.6875rem',
                                        }}
                                    >
                                        Sanction Timeline
                                    </Typography>
                                    <Box sx={{ position: 'relative', pl: 2 }}>
                                        {/* Timeline line */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                left: 6,
                                                top: 8,
                                                bottom: 0,
                                                width: 2,
                                                backgroundColor: '#dc2626',
                                                opacity: 0.3,
                                            }}
                                        />
                                        {data.registrationSanctions.map(
                                            (sanction: any, idx: number) => {
                                                const formatDate = (
                                                    dateStr: string
                                                ) => {
                                                    if (!dateStr)
                                                        return 'Date not specified';
                                                    try {
                                                        return new Date(
                                                            dateStr
                                                        ).toLocaleDateString(
                                                            'fr-FR',
                                                            {
                                                                day: '2-digit',
                                                                month: 'short',
                                                                year: 'numeric',
                                                            }
                                                        );
                                                    } catch {
                                                        return 'Invalid date';
                                                    }
                                                };

                                                return (
                                                    <Box
                                                        key={sanction.id || idx}
                                                        sx={{
                                                            position:
                                                                'relative',
                                                            pb: 1.5,
                                                        }}
                                                    >
                                                        {/* Timeline dot */}
                                                        <Box
                                                            sx={{
                                                                position:
                                                                    'absolute',
                                                                left: -8,
                                                                top: 4,
                                                                width: 8,
                                                                height: 8,
                                                                borderRadius:
                                                                    '50%',
                                                                backgroundColor:
                                                                    sanction.isCancelled
                                                                        ? '#6b7280'
                                                                        : '#dc2626',
                                                                border: '2px solid #ffffff',
                                                                boxShadow:
                                                                    '0 0 0 1px #dc2626',
                                                            }}
                                                        />
                                                        <Box
                                                            sx={{
                                                                p: 1,
                                                                backgroundColor:
                                                                    sanction.isCancelled
                                                                        ? '#f9fafb'
                                                                        : '#fef2f2',
                                                                borderRadius: 1,
                                                                border: '1px solid',
                                                                borderColor:
                                                                    sanction.isCancelled
                                                                        ? '#e5e7eb'
                                                                        : '#fecaca',
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    display:
                                                                        'flex',
                                                                    justifyContent:
                                                                        'space-between',
                                                                    alignItems:
                                                                        'flex-start',
                                                                    mb: 0.5,
                                                                }}
                                                            >
                                                                <Typography
                                                                    variant="subtitle2"
                                                                    sx={{
                                                                        fontWeight: 600,
                                                                        fontSize:
                                                                            '0.75rem',
                                                                    }}
                                                                >
                                                                    {sanction.description ||
                                                                        `Sanction #${sanction.id}`}
                                                                </Typography>
                                                                <Box
                                                                    sx={{
                                                                        display:
                                                                            'flex',
                                                                        gap: 0.5,
                                                                        alignItems:
                                                                            'center',
                                                                    }}
                                                                >
                                                                    {sanction.sanctionCategoryCode && (
                                                                        <Chip
                                                                            label={
                                                                                sanction.sanctionCategoryCode
                                                                            }
                                                                            size="small"
                                                                            sx={{
                                                                                height: 14,
                                                                                fontSize:
                                                                                    '0.625rem',
                                                                                backgroundColor:
                                                                                    '#dc2626',
                                                                                color: 'white',
                                                                                '& .MuiChip-label':
                                                                                    {
                                                                                        px: 0.5,
                                                                                    },
                                                                            }}
                                                                        />
                                                                    )}
                                                                    {sanction.isCancelled && (
                                                                        <Chip
                                                                            label="Cancelled"
                                                                            size="small"
                                                                            sx={{
                                                                                height: 14,
                                                                                fontSize:
                                                                                    '0.625rem',
                                                                                backgroundColor:
                                                                                    '#6b7280',
                                                                                color: 'white',
                                                                                '& .MuiChip-label':
                                                                                    {
                                                                                        px: 0.5,
                                                                                    },
                                                                            }}
                                                                        />
                                                                    )}
                                                                </Box>
                                                            </Box>
                                                            <Typography
                                                                variant="caption"
                                                                sx={{
                                                                    fontSize:
                                                                        '0.625rem',
                                                                    color: 'text.secondary',
                                                                    display:
                                                                        'block',
                                                                }}
                                                            >
                                                                {
                                                                    sanction.schoolYearPeriodName
                                                                }{' '}
                                                                •{' '}
                                                                {formatDate(
                                                                    sanction.sanctionDate
                                                                )}
                                                            </Typography>
                                                            {(sanction.sanctionDurationValue ||
                                                                sanction.sanctionDurationUnit) && (
                                                                <Typography
                                                                    variant="caption"
                                                                    sx={{
                                                                        fontSize:
                                                                            '0.625rem',
                                                                        color: '#dc2626',
                                                                        fontWeight: 500,
                                                                        display:
                                                                            'block',
                                                                        mt: 0.25,
                                                                    }}
                                                                >
                                                                    Duration:{' '}
                                                                    {
                                                                        sanction.sanctionDurationValue
                                                                    }{' '}
                                                                    {
                                                                        sanction.sanctionDurationUnit
                                                                    }
                                                                </Typography>
                                                            )}
                                                            {sanction.isCancelled &&
                                                                sanction.cancellationPurpose && (
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.625rem',
                                                                            color: 'text.secondary',
                                                                            display:
                                                                                'block',
                                                                            mt: 0.5,
                                                                            fontStyle:
                                                                                'italic',
                                                                        }}
                                                                    >
                                                                        Reason
                                                                        for
                                                                        cancellation:{' '}
                                                                        {
                                                                            sanction.cancellationPurpose
                                                                        }
                                                                    </Typography>
                                                                )}
                                                        </Box>
                                                    </Box>
                                                );
                                            }
                                        )}
                                    </Box>
                                </Box>

                                {/* Summary Stats */}
                                <Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 0.5,
                                            display: 'block',
                                            fontSize: '0.6875rem',
                                        }}
                                    >
                                        Summary Statistics
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 0.75,
                                        }}
                                    >
                                        {(() => {
                                            const stats =
                                                data.registrationSanctions.reduce(
                                                    (
                                                        acc: any,
                                                        sanction: any
                                                    ) => {
                                                        const category =
                                                            sanction.sanctionCategoryCode ||
                                                            'Other';
                                                        const period =
                                                            sanction.schoolYearPeriodName ||
                                                            'Unknown';
                                                        acc.categories[
                                                            category
                                                        ] =
                                                            (acc.categories[
                                                                category
                                                            ] || 0) + 1;
                                                        acc.periods[period] =
                                                            (acc.periods[
                                                                period
                                                            ] || 0) + 1;
                                                        if (
                                                            sanction.isCancelled
                                                        )
                                                            acc.cancelled += 1;
                                                        return acc;
                                                    },
                                                    {
                                                        categories: {},
                                                        periods: {},
                                                        cancelled: 0,
                                                    }
                                                );

                                            return (
                                                <>
                                                    <Box
                                                        sx={{
                                                            p: 0.75,
                                                            backgroundColor:
                                                                '#fef2f2',
                                                            borderRadius: 1,
                                                            border: '1px solid #fecaca',
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                fontWeight: 600,
                                                                fontSize:
                                                                    '0.625rem',
                                                                display:
                                                                    'block',
                                                                mb: 0.25,
                                                            }}
                                                        >
                                                            By Category
                                                        </Typography>
                                                        {Object.entries(
                                                            stats.categories
                                                        ).map(
                                                            ([
                                                                category,
                                                                count,
                                                            ]: [
                                                                string,
                                                                any,
                                                            ]) => (
                                                                <Box
                                                                    key={
                                                                        category
                                                                    }
                                                                    sx={{
                                                                        display:
                                                                            'flex',
                                                                        justifyContent:
                                                                            'space-between',
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.625rem',
                                                                        }}
                                                                    >
                                                                        {
                                                                            category
                                                                        }
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.625rem',
                                                                            fontWeight: 600,
                                                                        }}
                                                                    >
                                                                        {count}
                                                                    </Typography>
                                                                </Box>
                                                            )
                                                        )}
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            p: 0.75,
                                                            backgroundColor:
                                                                '#f0f9ff',
                                                            borderRadius: 1,
                                                            border: '1px solid #bae6fd',
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                fontWeight: 600,
                                                                fontSize:
                                                                    '0.625rem',
                                                                display:
                                                                    'block',
                                                                mb: 0.25,
                                                            }}
                                                        >
                                                            By Period
                                                        </Typography>
                                                        {Object.entries(
                                                            stats.periods
                                                        ).map(
                                                            ([period, count]: [
                                                                string,
                                                                any,
                                                            ]) => (
                                                                <Box
                                                                    key={period}
                                                                    sx={{
                                                                        display:
                                                                            'flex',
                                                                        justifyContent:
                                                                            'space-between',
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.625rem',
                                                                        }}
                                                                    >
                                                                        {period}
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.625rem',
                                                                            fontWeight: 600,
                                                                        }}
                                                                    >
                                                                        {count}
                                                                    </Typography>
                                                                </Box>
                                                            )
                                                        )}
                                                    </Box>
                                                    {stats.cancelled > 0 && (
                                                        <Box
                                                            sx={{
                                                                p: 0.75,
                                                                backgroundColor:
                                                                    '#f9fafb',
                                                                borderRadius: 1,
                                                                border: '1px solid #e5e7eb',
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="caption"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    fontSize:
                                                                        '0.625rem',
                                                                }}
                                                            >
                                                                Cancelled:{' '}
                                                                {
                                                                    stats.cancelled
                                                                }
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </>
                                            );
                                        })()}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            textAlign: 'center',
                            py: 2,
                            backgroundColor: 'success.50',
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'success.100',
                        }}
                    >
                        <CheckCircleIcon
                            sx={{
                                fontSize: 20,
                                color: 'success.main',
                                mb: 0.5,
                            }}
                        />
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 600,
                                mb: 0.25,
                                color: 'success.main',
                            }}
                        >
                            No Sanctions
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: '0.6875rem' }}
                        >
                            {selectedStudent.fullName} has a clean disciplinary
                            record with no sanctions.
                        </Typography>
                    </Box>
                )}
            </TabPanel>
        </Box>
    );
};
