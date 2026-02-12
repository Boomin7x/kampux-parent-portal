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
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
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
                    py: 3,
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
                    mb: 2,
                    pb: 1,
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
}: any) => {
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
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: '0.75rem' }}
                    >
                        {subtitle}
                        {date && (
                            <>
                                {' • '}
                                {new Date(date).toLocaleDateString('fr-FR')}
                            </>
                        )}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
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
                        {cancellationDate &&
                            ` (${new Date(cancellationDate).toLocaleDateString('fr-FR')})`}
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
        <Box sx={{ width: '100%', py: 2 }}>
            {/* Header Section */}
            <Box sx={{ mb: 3 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 1,
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 600,
                            color: 'text.primary',
                            fontSize: '1.25rem',
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
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 2,
                    mb: 3,
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
                    gap: 2,
                    mb: 3,
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
                            p: 2,
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
                                const tabIndex =
                                    sheetTypes.findIndex(
                                        s => s.id === sheet.id
                                    ) + 1;
                                setCurrentTab(tabIndex);
                            }
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 1.5,
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
                                        mb: 0.5,
                                    }}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.primary',
                                            fontSize: '0.875rem',
                                            lineHeight: 1.2,
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
                                        fontSize: '0.75rem',
                                        lineHeight: 1.3,
                                        display: 'block',
                                    }}
                                >
                                    {sheet.description}
                                </Typography>

                                {sheet.count === 0 && (
                                    <Box sx={{ mt: 'auto', pt: 1 }}>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: 'success.main',
                                                fontSize: '0.6875rem',
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
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs
                    value={currentTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        minHeight: 36,
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 500,
                            fontSize: '0.8125rem',
                            minHeight: 36,
                            minWidth: 0,
                            px: 2,
                            py: 1,
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
                {/* Detailed Records Section */}
                {hasAnyRecords && (
                    <Box>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 600,
                                color: 'text.primary',
                                mb: 2,
                                fontSize: '0.875rem',
                            }}
                        >
                            All Records Summary
                        </Typography>

                        {/* Complaints Section */}
                        {data?.registrationComplaints &&
                            data.registrationComplaints.length > 0 && (
                                <Box sx={{ mb: 3 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            mb: 1.5,
                                        }}
                                    >
                                        <ComplaintIcon
                                            sx={{
                                                fontSize: 16,
                                                color: '#7c3aed',
                                            }}
                                        />
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontWeight: 600,
                                                color: 'text.primary',
                                                fontSize: '0.75rem',
                                            }}
                                        >
                                            Complaints (
                                            {data.registrationComplaints.length}
                                            )
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 1,
                                        }}
                                    >
                                        {data.registrationComplaints
                                            .slice(0, 3)
                                            .map(complaint => (
                                                <ComplaintCard
                                                    key={complaint.id}
                                                    complaint={complaint}
                                                />
                                            ))}
                                    </Box>
                                    {data.registrationComplaints.length > 3 && (
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ mt: 1, display: 'block' }}
                                        >
                                            And{' '}
                                            {data.registrationComplaints
                                                .length - 3}{' '}
                                            more complaints. View the Complaints
                                            tab for details.
                                        </Typography>
                                    )}
                                </Box>
                            )}

                        {/* Other records summary can be added here */}
                        {(!data?.registrationComplaints ||
                            data.registrationComplaints.length === 0) &&
                            (!data?.registrationAbsenceSheets ||
                                data.registrationAbsenceSheets.length === 0) &&
                            (!data?.registrationDisciplinarySheets ||
                                data.registrationDisciplinarySheets.length ===
                                    0) &&
                            (!data?.registrationObservationSheets ||
                                data.registrationObservationSheets.length ===
                                    0) &&
                            (!data?.registrationSanctions ||
                                data.registrationSanctions.length === 0) && (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ textAlign: 'center', py: 4 }}
                                >
                                    No detailed records to display.
                                </Typography>
                            )}
                    </Box>
                )}

                {!hasAnyRecords && (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                        <CheckCircleIcon
                            sx={{ fontSize: 48, color: 'success.main', mb: 2 }}
                        />
                        <Typography
                            variant="h6"
                            sx={{ mb: 1, color: 'success.main' }}
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
                    renderRecord={(absence: any, idx: number) => (
                        <RecordCard
                            key={'absence.id' + idx}
                            title={absence.absenceType}
                            subtitle={`Period: ${absence.schoolYearPeriodName}`}
                            date={absence.absenceStartDate}
                            description={
                                absence.absencePurposeDescription ||
                                absence.absencePurpose
                            }
                            status={
                                absence.justifedAbsence
                                    ? 'Justified'
                                    : 'Unjustified'
                            }
                            statusColor={
                                absence.justifedAbsence ? '#10b981' : '#f59e0b'
                            }
                            isCancelled={absence.isCancelled}
                            cancellationReason={absence.cancellationPurpose}
                            cancellationDate={absence.cancellationDate}
                            borderColor="#ea580c"
                            bgColor="#fff7ed"
                        />
                    )}
                />
            </TabPanel>

            {/* Disciplinary Tab */}
            <TabPanel value={currentTab} index={2}>
                <RecordsList
                    title="Disciplinary Reports"
                    icon={<WarningIcon />}
                    records={data?.registrationDisciplinarySheets || []}
                    selectedStudent={selectedStudent}
                    renderRecord={(disciplinary: any, idx: number) => (
                        <RecordCard
                            key={'disciplinary.id' + idx}
                            title={
                                disciplinary.disciplinaryType ||
                                'Disciplinary Action'
                            }
                            subtitle={`Period: ${disciplinary.schoolYearPeriodName}`}
                            date={disciplinary.disciplinaryEventDate}
                            description={
                                disciplinary.disciplinaryEventDescription ||
                                disciplinary.disciplinaryEventSummary
                            }
                            isCancelled={disciplinary.isCancelled}
                            cancellationReason={
                                disciplinary.cancellationPurpose
                            }
                            cancellationDate={disciplinary.cancellationDate}
                            borderColor="#dc2626"
                            bgColor="#fef2f2"
                        />
                    )}
                />
            </TabPanel>

            {/* Observations Tab */}
            <TabPanel value={currentTab} index={3}>
                <RecordsList
                    title="Observation Notes"
                    icon={<InfoIcon />}
                    records={data?.registrationObservationSheets || []}
                    selectedStudent={selectedStudent}
                    renderRecord={(observation: any, idx: number) => (
                        <RecordCard
                            key={'observation.id' + idx}
                            title={
                                observation.observationPurpose || 'Observation'
                            }
                            subtitle={`Period: ${observation.schoolYearPeriodName}`}
                            date={observation.observationDate}
                            description={observation.observationDescription}
                            isCancelled={observation.isCancelled}
                            cancellationReason={observation.cancellationPurpose}
                            cancellationDate={observation.cancellationDate}
                            borderColor="#2563eb"
                            bgColor="#eff6ff"
                        />
                    )}
                />
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
                <RecordsList
                    title="Sanctions"
                    icon={<SanctionIcon />}
                    records={data?.registrationSanctions || []}
                    selectedStudent={selectedStudent}
                    renderRecord={(_sanction: any, idx: number) => (
                        <Box
                            key={'sanction.id' + idx}
                            sx={{
                                p: 2,
                                bgcolor: '#fef2f2',
                                borderRadius: 1,
                                mb: 1,
                            }}
                        >
                            <Typography variant="body2">
                                Sanction record structure not yet defined
                            </Typography>
                        </Box>
                    )}
                />
            </TabPanel>
        </Box>
    );
};
