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
    Box,
    Chip,
    Container,
    Grid,
    LinearProgress,
    Typography,
} from '@mui/material';
import React from 'react';
import type { Student } from '../../../../types/student.types';
import { useGetSelectedStudentSheets } from '../../_hooks/useParentWithStore';

interface StudentSheetProps {
    selectedStudent: Student | null;
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

export const StudentSheet: React.FC<StudentSheetProps> = ({
    selectedStudent,
}) => {
    const { data, isLoading, error } = useGetSelectedStudentSheets();

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
    const activeSheets = sheetTypes.filter(sheet => sheet.count > 0);

    return (
        <Box sx={{ py: 2 }}>
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

            {/* Overview Stats */}
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

            {/* Sheet Type Cards */}
            <Grid container spacing={2}>
                {sheetTypes.map(sheet => (
                    <Grid key={sheet.id} size={{ xs: 12, sm: 6, lg: 3 }}>
                        <Box
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
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 1.5,
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
                                        <Box sx={{ mt: 1 }}>
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
                    </Grid>
                ))}
            </Grid>

            {/* Detailed Records Section */}
            {hasAnyRecords && (
                <Box sx={{ mt: 3 }}>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 600,
                            color: 'text.primary',
                            mb: 2,
                            fontSize: '0.875rem',
                        }}
                    >
                        Detailed Records
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
                                        {data.registrationComplaints.length})
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1,
                                    }}
                                >
                                    {data.registrationComplaints.map(
                                        (complaint, _index) => (
                                            <Box
                                                key={complaint.id}
                                                sx={{
                                                    p: 1.5,
                                                    borderRadius: 1,
                                                    backgroundColor: '#f5f3ff',
                                                    border: '1px solid',
                                                    borderColor: '#c4b5fd',
                                                    borderLeft:
                                                        '3px solid #7c3aed',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'space-between',
                                                        alignItems:
                                                            'flex-start',
                                                        mb: 1,
                                                    }}
                                                >
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                fontWeight: 600,
                                                                fontSize:
                                                                    '0.8125rem',
                                                                color: 'text.primary',
                                                            }}
                                                        >
                                                            {complaint.summary ||
                                                                `Complaint #${complaint.id}`}
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                color: 'text.secondary',
                                                                fontSize:
                                                                    '0.75rem',
                                                                display:
                                                                    'block',
                                                                mb: 0.5,
                                                            }}
                                                        >
                                                            Category:{' '}
                                                            {
                                                                complaint.complaintCategoryCode
                                                            }
                                                            {complaint.complaintDate && (
                                                                <>
                                                                    {' '}
                                                                    • Date:{' '}
                                                                    {new Date(
                                                                        complaint.complaintDate
                                                                    ).toLocaleDateString(
                                                                        'fr-FR'
                                                                    )}
                                                                </>
                                                            )}
                                                        </Typography>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            gap: 0.5,
                                                        }}
                                                    >
                                                        <Chip
                                                            label={
                                                                complaint.haveBeenResolved
                                                                    ? 'Resolved'
                                                                    : 'Pending'
                                                            }
                                                            size="small"
                                                            sx={{
                                                                height: 18,
                                                                fontSize:
                                                                    '0.625rem',
                                                                backgroundColor:
                                                                    complaint.haveBeenResolved
                                                                        ? '#10b981'
                                                                        : '#f59e0b',
                                                                color: 'white',
                                                                fontWeight: 600,
                                                            }}
                                                        />
                                                        {complaint.isCancelled && (
                                                            <Chip
                                                                label="Cancelled"
                                                                size="small"
                                                                sx={{
                                                                    height: 18,
                                                                    fontSize:
                                                                        '0.625rem',
                                                                    backgroundColor:
                                                                        '#6b7280',
                                                                    color: 'white',
                                                                    fontWeight: 600,
                                                                }}
                                                            />
                                                        )}
                                                    </Box>
                                                </Box>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontSize: '0.8125rem',
                                                        color: 'text.secondary',
                                                        lineHeight: 1.4,
                                                    }}
                                                >
                                                    {complaint.description}
                                                </Typography>
                                                {complaint.resolutionDescription && (
                                                    <Box
                                                        sx={{
                                                            mt: 1,
                                                            pt: 1,
                                                            borderTop:
                                                                '1px solid',
                                                            borderColor:
                                                                '#e5e7eb',
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                fontWeight: 600,
                                                                color: 'success.dark',
                                                                fontSize:
                                                                    '0.6875rem',
                                                                display:
                                                                    'block',
                                                                mb: 0.25,
                                                            }}
                                                        >
                                                            Resolution:
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                fontSize:
                                                                    '0.75rem',
                                                                color: 'text.secondary',
                                                                lineHeight: 1.3,
                                                            }}
                                                        >
                                                            {
                                                                complaint.resolutionDescription
                                                            }
                                                            {complaint.resolutionDate && (
                                                                <>
                                                                    {' '}
                                                                    (Resolved
                                                                    on:{' '}
                                                                    {new Date(
                                                                        complaint.resolutionDate
                                                                    ).toLocaleDateString(
                                                                        'fr-FR'
                                                                    )}
                                                                    )
                                                                </>
                                                            )}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        )
                                    )}
                                </Box>
                            </Box>
                        )}

                    {/* Other sheet types can be added here in similar format */}
                    {/* Sanctions, Absences, Disciplinary, Observations */}
                </Box>
            )}

            {/* Summary Message */}
            <Box
                sx={{
                    mt: 3,
                    p: 2,
                    borderRadius: 1,
                    backgroundColor: hasAnyRecords
                        ? 'warning.50'
                        : 'success.50',
                    border: '1px solid',
                    borderColor: hasAnyRecords ? 'warning.200' : 'success.200',
                    textAlign: 'center',
                }}
            >
                {hasAnyRecords ? (
                    <Box>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 600,
                                color: 'warning.dark',
                                mb: 0.5,
                            }}
                        >
                            Review Required
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                fontSize: '0.8125rem',
                            }}
                        >
                            This student has {totalRecords} record
                            {totalRecords !== 1 ? 's' : ''} that may require
                            attention.
                            {activeSheets.length > 0 && (
                                <>
                                    {' '}
                                    Active categories:{' '}
                                    {activeSheets.map(s => s.title).join(', ')}.
                                </>
                            )}
                        </Typography>
                    </Box>
                ) : (
                    <Box>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 600,
                                color: 'success.dark',
                                mb: 0.5,
                            }}
                        >
                            Excellent Standing
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                fontSize: '0.8125rem',
                            }}
                        >
                            {selectedStudent.fullName} maintains a clean
                            behavioral record with no documented incidents.
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};
