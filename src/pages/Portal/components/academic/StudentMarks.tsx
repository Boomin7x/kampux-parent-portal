import {
    Assessment as AssessmentIcon,
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Card,
    CardContent,
    CircularProgress,
    Collapse,
    Grid,
    IconButton,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useGetStudentMarks } from '../../_hooks/useParent';
import type { StudentMark } from '../../_service/parentService';

interface StudentMarksProps {
    studentId: string | number;
    className?: string;
}

// Simple marks table with expandable competencies
const MarksTable: React.FC<{ marks: StudentMark[] }> = ({ marks }) => {
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
    // const theme = useTheme();

    const toggleRowExpansion = (markId: number) => {
        setExpandedRows(prev => {
            const newSet = new Set(prev);
            if (newSet.has(markId)) {
                newSet.delete(markId);
            } else {
                newSet.add(markId);
            }
            return newSet;
        });
    };

    const getScoreColor = (mark: number, maxMark: number) => {
        const percentage = (mark / maxMark) * 100;
        if (percentage >= 60) return 'success.main';
        if (percentage >= 40) return 'warning.main';
        return 'error.main';
    };

    return (
        <TableContainer
            sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
            }}
        >
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ backgroundColor: 'primary.50' }}>
                        <TableCell
                            sx={{ fontWeight: 600, fontSize: '0.75rem', py: 1 }}
                        >
                            Subject
                        </TableCell>
                        <TableCell
                            sx={{ fontWeight: 600, fontSize: '0.75rem', py: 1 }}
                            align="center"
                        >
                            Exam
                        </TableCell>
                        <TableCell
                            sx={{ fontWeight: 600, fontSize: '0.75rem', py: 1 }}
                            align="center"
                        >
                            Score
                        </TableCell>
                        <TableCell
                            sx={{ fontWeight: 600, fontSize: '0.75rem', py: 1 }}
                            align="center"
                        >
                            Rank
                        </TableCell>
                        <TableCell
                            sx={{ fontWeight: 600, fontSize: '0.75rem', py: 1 }}
                            align="center"
                        >
                            Period
                        </TableCell>
                        <TableCell
                            sx={{ fontWeight: 600, fontSize: '0.75rem', py: 1 }}
                            align="center"
                        >
                            Details
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {marks.map(mark => {
                        const isExpanded = expandedRows.has(mark.id);
                        const percentage =
                            (mark.currentMark / mark.examMaxMark) * 100;

                        return (
                            <React.Fragment key={mark.id}>
                                <TableRow
                                    hover
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'action.hover',
                                        },
                                    }}
                                >
                                    <TableCell sx={{ py: 1 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '0.8125rem',
                                                mb: 0.25,
                                            }}
                                        >
                                            {mark.subjectLongName}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: 'text.secondary',
                                                fontSize: '0.75rem',
                                            }}
                                        >
                                            {mark.subjectCode} • Coeff:{' '}
                                            {mark.coefficient}
                                        </Typography>
                                    </TableCell>

                                    <TableCell sx={{ py: 1 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{ fontSize: '0.8125rem' }}
                                        >
                                            {mark.schoolYearPeriodExamName}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="center" sx={{ py: 1 }}>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontWeight: 600,
                                                color: getScoreColor(
                                                    mark.currentMark,
                                                    mark.examMaxMark
                                                ),
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            {mark.currentMark}/
                                            {mark.examMaxMark}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: 'text.secondary',
                                                fontSize: '0.75rem',
                                                display: 'block',
                                            }}
                                        >
                                            {(percentage || 0).toFixed(0)}%
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="center" sx={{ py: 1 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '0.8125rem',
                                            }}
                                        >
                                            #{mark.rank}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="center" sx={{ py: 1 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{ fontSize: '0.8125rem' }}
                                        >
                                            {mark.schoolYearPeriodName}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="center" sx={{ py: 1 }}>
                                        <IconButton
                                            size="small"
                                            onClick={() =>
                                                toggleRowExpansion(mark.id)
                                            }
                                            disabled={
                                                mark.registrationMarkCompetences
                                                    .length === 0
                                            }
                                            sx={{ p: 0.5 }}
                                        >
                                            {mark.registrationMarkCompetences
                                                .length > 0 && (
                                                <Box
                                                    sx={{
                                                        position: 'relative',
                                                    }}
                                                >
                                                    {isExpanded ? (
                                                        <ExpandLessIcon fontSize="small" />
                                                    ) : (
                                                        <ExpandMoreIcon fontSize="small" />
                                                    )}
                                                    <Box
                                                        sx={{
                                                            position:
                                                                'absolute',
                                                            top: -4,
                                                            right: -4,
                                                            minWidth: 14,
                                                            height: 14,
                                                            borderRadius: 1,
                                                            backgroundColor:
                                                                'primary.main',
                                                            color: 'white',
                                                            fontSize:
                                                                '0.625rem',
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            justifyContent:
                                                                'center',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {
                                                            mark
                                                                .registrationMarkCompetences
                                                                .length
                                                        }
                                                    </Box>
                                                </Box>
                                            )}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>

                                {/* Competency Details Row */}
                                {mark.registrationMarkCompetences.length >
                                    0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            sx={{ py: 0, border: 0 }}
                                        >
                                            <Collapse
                                                in={isExpanded}
                                                timeout="auto"
                                                unmountOnExit
                                            >
                                                <Box
                                                    sx={{
                                                        p: 1.5,
                                                        backgroundColor:
                                                            'background.default',
                                                        border: '1px solid',
                                                        borderColor: 'divider',
                                                        borderRadius: 1,
                                                        m: 1,
                                                    }}
                                                >
                                                    {/* Assessment Details Header */}
                                                    <Box
                                                        sx={{
                                                            mb: 1.5,
                                                            pb: 1,
                                                            borderBottom:
                                                                '1px solid',
                                                            borderColor:
                                                                'divider',
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                fontWeight: 600,
                                                                fontSize:
                                                                    '0.75rem',
                                                                color: 'text.secondary',
                                                                mb: 1,
                                                                display:
                                                                    'block',
                                                            }}
                                                        >
                                                            Assessment Details
                                                        </Typography>
                                                        <Grid
                                                            container
                                                            spacing={1}
                                                        >
                                                            <Grid
                                                                size={{
                                                                    xs: 12,
                                                                    sm: 6,
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        mb: 0.5,
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.625rem',
                                                                            color: 'text.secondary',
                                                                        }}
                                                                    >
                                                                        Student
                                                                        ID
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.75rem',
                                                                            fontWeight: 500,
                                                                        }}
                                                                    >
                                                                        {
                                                                            mark.studentId
                                                                        }
                                                                    </Typography>
                                                                </Box>
                                                                <Box
                                                                    sx={{
                                                                        mb: 0.5,
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.625rem',
                                                                            color: 'text.secondary',
                                                                        }}
                                                                    >
                                                                        Registration
                                                                        ID
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.75rem',
                                                                            fontWeight: 500,
                                                                        }}
                                                                    >
                                                                        {
                                                                            mark.registrationId
                                                                        }
                                                                    </Typography>
                                                                </Box>
                                                                <Box
                                                                    sx={{
                                                                        mb: 0.5,
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.625rem',
                                                                            color: 'text.secondary',
                                                                        }}
                                                                    >
                                                                        Birth
                                                                        Date
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.75rem',
                                                                            fontWeight: 500,
                                                                        }}
                                                                    >
                                                                        {new Date(
                                                                            mark.birthDate
                                                                        ).toLocaleDateString()}
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                            <Grid
                                                                size={{
                                                                    xs: 12,
                                                                    sm: 6,
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        mb: 0.5,
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.625rem',
                                                                            color: 'text.secondary',
                                                                        }}
                                                                    >
                                                                        Subject
                                                                        ID
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.75rem',
                                                                            fontWeight: 500,
                                                                        }}
                                                                    >
                                                                        {
                                                                            mark.subjectId
                                                                        }
                                                                    </Typography>
                                                                </Box>
                                                                <Box
                                                                    sx={{
                                                                        mb: 0.5,
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.625rem',
                                                                            color: 'text.secondary',
                                                                        }}
                                                                    >
                                                                        Subject
                                                                        Short
                                                                        Name
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.75rem',
                                                                            fontWeight: 500,
                                                                        }}
                                                                    >
                                                                        {
                                                                            mark.subjectShortName
                                                                        }
                                                                    </Typography>
                                                                </Box>
                                                                <Box
                                                                    sx={{
                                                                        mb: 0.5,
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.625rem',
                                                                            color: 'text.secondary',
                                                                        }}
                                                                    >
                                                                        Exam ID
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.75rem',
                                                                            fontWeight: 500,
                                                                        }}
                                                                    >
                                                                        {
                                                                            mark.examId
                                                                        }
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>

                                                    {/* Academic Year & Class Info */}
                                                    <Box
                                                        sx={{
                                                            mb: 1.5,
                                                            pb: 1,
                                                            borderBottom:
                                                                '1px solid',
                                                            borderColor:
                                                                'divider',
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                fontWeight: 600,
                                                                fontSize:
                                                                    '0.75rem',
                                                                color: 'text.secondary',
                                                                mb: 1,
                                                                display:
                                                                    'block',
                                                            }}
                                                        >
                                                            Academic Information
                                                        </Typography>
                                                        <Grid
                                                            container
                                                            spacing={1}
                                                        >
                                                            <Grid
                                                                size={{
                                                                    xs: 12,
                                                                    sm: 4,
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        mb: 0.5,
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.625rem',
                                                                            color: 'text.secondary',
                                                                        }}
                                                                    >
                                                                        School
                                                                        Year
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.75rem',
                                                                            fontWeight: 500,
                                                                        }}
                                                                    >
                                                                        {
                                                                            mark.schoolYearName
                                                                        }
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                            <Grid
                                                                size={{
                                                                    xs: 12,
                                                                    sm: 4,
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        mb: 0.5,
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.625rem',
                                                                            color: 'text.secondary',
                                                                        }}
                                                                    >
                                                                        Class
                                                                        Name
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.75rem',
                                                                            fontWeight: 500,
                                                                        }}
                                                                    >
                                                                        {
                                                                            mark.schoolYearClassName
                                                                        }
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                            <Grid
                                                                size={{
                                                                    xs: 12,
                                                                    sm: 4,
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        mb: 0.5,
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.625rem',
                                                                            color: 'text.secondary',
                                                                        }}
                                                                    >
                                                                        Period
                                                                        Exam
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.75rem',
                                                                            fontWeight: 500,
                                                                        }}
                                                                    >
                                                                        {
                                                                            mark.schoolYearPeriodExamName
                                                                        }
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>

                                                    {/* Score Details */}
                                                    <Box
                                                        sx={{
                                                            mb: 1.5,
                                                            pb: 1,
                                                            borderBottom:
                                                                '1px solid',
                                                            borderColor:
                                                                'divider',
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                fontWeight: 600,
                                                                fontSize:
                                                                    '0.75rem',
                                                                color: 'text.secondary',
                                                                mb: 1,
                                                                display:
                                                                    'block',
                                                            }}
                                                        >
                                                            Score Information
                                                        </Typography>
                                                        <Grid
                                                            container
                                                            spacing={1}
                                                        >
                                                            <Grid
                                                                size={{
                                                                    xs: 6,
                                                                    sm: 3,
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        mb: 0.5,
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.625rem',
                                                                            color: 'text.secondary',
                                                                        }}
                                                                    >
                                                                        Current
                                                                        Mark
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.875rem',
                                                                            fontWeight: 600,
                                                                            color: getScoreColor(
                                                                                mark.currentMark,
                                                                                mark.examMaxMark
                                                                            ),
                                                                        }}
                                                                    >
                                                                        {
                                                                            mark.currentMark
                                                                        }
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                            <Grid
                                                                size={{
                                                                    xs: 6,
                                                                    sm: 3,
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        mb: 0.5,
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.625rem',
                                                                            color: 'text.secondary',
                                                                        }}
                                                                    >
                                                                        Total
                                                                        Mark
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.875rem',
                                                                            fontWeight: 600,
                                                                        }}
                                                                    >
                                                                        {
                                                                            mark.mark
                                                                        }
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                            <Grid
                                                                size={{
                                                                    xs: 6,
                                                                    sm: 3,
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        mb: 0.5,
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.625rem',
                                                                            color: 'text.secondary',
                                                                        }}
                                                                    >
                                                                        Max Mark
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.875rem',
                                                                            fontWeight: 500,
                                                                        }}
                                                                    >
                                                                        {
                                                                            mark.examMaxMark
                                                                        }
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                            <Grid
                                                                size={{
                                                                    xs: 6,
                                                                    sm: 3,
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        mb: 0.5,
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.625rem',
                                                                            color: 'text.secondary',
                                                                        }}
                                                                    >
                                                                        Mark
                                                                        Exists
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            fontSize:
                                                                                '0.75rem',
                                                                            fontWeight: 500,
                                                                            color: mark.markExist
                                                                                ? 'success.main'
                                                                                : 'error.main',
                                                                        }}
                                                                    >
                                                                        {mark.markExist
                                                                            ? 'Yes'
                                                                            : 'No'}
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>

                                                    {/* Competency Breakdown */}
                                                    {mark
                                                        .registrationMarkCompetences
                                                        .length > 0 && (
                                                        <Box>
                                                            <Typography
                                                                variant="caption"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    mb: 1,
                                                                    display:
                                                                        'block',
                                                                    fontSize:
                                                                        '0.75rem',
                                                                    color: 'text.secondary',
                                                                }}
                                                            >
                                                                Competency
                                                                Breakdown (
                                                                {
                                                                    mark
                                                                        .registrationMarkCompetences
                                                                        .length
                                                                }{' '}
                                                                competencies)
                                                            </Typography>
                                                            <Grid
                                                                container
                                                                spacing={1}
                                                            >
                                                                {mark.registrationMarkCompetences
                                                                    .sort(
                                                                        (
                                                                            a,
                                                                            b
                                                                        ) =>
                                                                            a.competenceOrder -
                                                                            b.competenceOrder
                                                                    )
                                                                    .map(
                                                                        competency => {
                                                                            const compPercentage =
                                                                                competency.mark &&
                                                                                competency.maxMark
                                                                                    ? (competency.mark /
                                                                                          competency.maxMark) *
                                                                                      100
                                                                                    : 0;
                                                                            return (
                                                                                <Grid
                                                                                    key={
                                                                                        competency.id
                                                                                    }
                                                                                    size={{
                                                                                        xs: 12,
                                                                                        md: 6,
                                                                                    }}
                                                                                >
                                                                                    <Box
                                                                                        sx={{
                                                                                            p: 1,
                                                                                            border: '1px solid',
                                                                                            borderColor:
                                                                                                'divider',
                                                                                            borderRadius: 0.5,
                                                                                            backgroundColor:
                                                                                                'background.paper',
                                                                                        }}
                                                                                    >
                                                                                        {/* Competency Header */}
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
                                                                                                variant="caption"
                                                                                                sx={{
                                                                                                    fontWeight: 600,
                                                                                                    fontSize:
                                                                                                        '0.75rem',
                                                                                                    lineHeight: 1.2,
                                                                                                    flex: 1,
                                                                                                    pr: 1,
                                                                                                }}
                                                                                            >
                                                                                                {
                                                                                                    competency.competenceName
                                                                                                }
                                                                                            </Typography>
                                                                                            <Typography
                                                                                                variant="caption"
                                                                                                sx={{
                                                                                                    fontWeight: 600,
                                                                                                    fontSize:
                                                                                                        '0.75rem',
                                                                                                    color:
                                                                                                        compPercentage >=
                                                                                                        60
                                                                                                            ? 'success.main'
                                                                                                            : compPercentage >=
                                                                                                                40
                                                                                                              ? 'warning.main'
                                                                                                              : 'error.main',
                                                                                                }}
                                                                                            >
                                                                                                {competency.mark ||
                                                                                                    0}

                                                                                                /
                                                                                                {competency.maxMark ||
                                                                                                    0}
                                                                                            </Typography>
                                                                                        </Box>

                                                                                        {/* Description */}
                                                                                        {competency.competenceDescription && (
                                                                                            <Typography
                                                                                                variant="caption"
                                                                                                sx={{
                                                                                                    fontSize:
                                                                                                        '0.625rem',
                                                                                                    color: 'text.secondary',
                                                                                                    lineHeight: 1.3,
                                                                                                    mb: 0.5,
                                                                                                    display:
                                                                                                        'block',
                                                                                                }}
                                                                                            >
                                                                                                {
                                                                                                    competency.competenceDescription
                                                                                                }
                                                                                            </Typography>
                                                                                        )}

                                                                                        {/* Progress Bar */}
                                                                                        <LinearProgress
                                                                                            variant="determinate"
                                                                                            value={
                                                                                                compPercentage
                                                                                            }
                                                                                            sx={{
                                                                                                height: 3,
                                                                                                borderRadius: 0.5,
                                                                                                backgroundColor:
                                                                                                    'action.hover',
                                                                                                mb: 0.5,
                                                                                                '& .MuiLinearProgress-bar':
                                                                                                    {
                                                                                                        backgroundColor:
                                                                                                            compPercentage >=
                                                                                                            60
                                                                                                                ? 'success.main'
                                                                                                                : compPercentage >=
                                                                                                                    40
                                                                                                                  ? 'warning.main'
                                                                                                                  : 'error.main',
                                                                                                    },
                                                                                            }}
                                                                                        />

                                                                                        {/* Competency Details Grid */}
                                                                                        <Grid
                                                                                            container
                                                                                            spacing={
                                                                                                0.5
                                                                                            }
                                                                                            sx={{
                                                                                                mt: 0.5,
                                                                                            }}
                                                                                        >
                                                                                            <Grid
                                                                                                size={
                                                                                                    6
                                                                                                }
                                                                                            >
                                                                                                <Typography
                                                                                                    variant="caption"
                                                                                                    sx={{
                                                                                                        fontSize:
                                                                                                            '0.625rem',
                                                                                                        color: 'text.secondary',
                                                                                                    }}
                                                                                                >
                                                                                                    Code:{' '}
                                                                                                    {competency.competenceCode ||
                                                                                                        'N/A'}
                                                                                                </Typography>
                                                                                            </Grid>
                                                                                            <Grid
                                                                                                size={
                                                                                                    6
                                                                                                }
                                                                                            >
                                                                                                <Typography
                                                                                                    variant="caption"
                                                                                                    sx={{
                                                                                                        fontSize:
                                                                                                            '0.625rem',
                                                                                                        color: 'text.secondary',
                                                                                                        textAlign:
                                                                                                            'right',
                                                                                                    }}
                                                                                                >
                                                                                                    {(
                                                                                                        compPercentage ||
                                                                                                        0
                                                                                                    ).toFixed(
                                                                                                        1
                                                                                                    )}

                                                                                                    %
                                                                                                </Typography>
                                                                                            </Grid>
                                                                                            <Grid
                                                                                                size={
                                                                                                    6
                                                                                                }
                                                                                            >
                                                                                                <Typography
                                                                                                    variant="caption"
                                                                                                    sx={{
                                                                                                        fontSize:
                                                                                                            '0.625rem',
                                                                                                        color: 'text.secondary',
                                                                                                    }}
                                                                                                >
                                                                                                    Type:{' '}
                                                                                                    {competency.competenceTypeName ||
                                                                                                        'N/A'}
                                                                                                </Typography>
                                                                                            </Grid>
                                                                                            <Grid
                                                                                                size={
                                                                                                    6
                                                                                                }
                                                                                            >
                                                                                                <Typography
                                                                                                    variant="caption"
                                                                                                    sx={{
                                                                                                        fontSize:
                                                                                                            '0.625rem',
                                                                                                        color: 'text.secondary',
                                                                                                        textAlign:
                                                                                                            'right',
                                                                                                    }}
                                                                                                >
                                                                                                    Level:{' '}
                                                                                                    {competency.level ||
                                                                                                        'N/A'}
                                                                                                </Typography>
                                                                                            </Grid>
                                                                                            <Grid
                                                                                                size={
                                                                                                    6
                                                                                                }
                                                                                            >
                                                                                                <Typography
                                                                                                    variant="caption"
                                                                                                    sx={{
                                                                                                        fontSize:
                                                                                                            '0.625rem',
                                                                                                        color: 'text.secondary',
                                                                                                    }}
                                                                                                >
                                                                                                    Coefficient:{' '}
                                                                                                    {competency.coefficient ||
                                                                                                        'N/A'}
                                                                                                </Typography>
                                                                                            </Grid>
                                                                                            <Grid
                                                                                                size={
                                                                                                    6
                                                                                                }
                                                                                            >
                                                                                                <Typography
                                                                                                    variant="caption"
                                                                                                    sx={{
                                                                                                        fontSize:
                                                                                                            '0.625rem',
                                                                                                        color: 'text.secondary',
                                                                                                        textAlign:
                                                                                                            'right',
                                                                                                    }}
                                                                                                >
                                                                                                    Order:{' '}
                                                                                                    {competency.competenceOrder ||
                                                                                                        'N/A'}
                                                                                                </Typography>
                                                                                            </Grid>
                                                                                            <Grid
                                                                                                size={
                                                                                                    6
                                                                                                }
                                                                                            >
                                                                                                <Typography
                                                                                                    variant="caption"
                                                                                                    sx={{
                                                                                                        fontSize:
                                                                                                            '0.625rem',
                                                                                                        color: 'text.secondary',
                                                                                                    }}
                                                                                                >
                                                                                                    Weighted:{' '}
                                                                                                    {(
                                                                                                        competency.weightedMark ||
                                                                                                        0
                                                                                                    ).toFixed(
                                                                                                        1
                                                                                                    )}
                                                                                                </Typography>
                                                                                            </Grid>
                                                                                            {competency.rank && (
                                                                                                <Grid
                                                                                                    size={
                                                                                                        6
                                                                                                    }
                                                                                                >
                                                                                                    <Typography
                                                                                                        variant="caption"
                                                                                                        sx={{
                                                                                                            fontSize:
                                                                                                                '0.625rem',
                                                                                                            color: 'text.secondary',
                                                                                                            textAlign:
                                                                                                                'right',
                                                                                                        }}
                                                                                                    >
                                                                                                        Rank:
                                                                                                        #
                                                                                                        {
                                                                                                            competency.rank
                                                                                                        }
                                                                                                    </Typography>
                                                                                                </Grid>
                                                                                            )}
                                                                                            <Grid
                                                                                                size={
                                                                                                    12
                                                                                                }
                                                                                            >
                                                                                                <Typography
                                                                                                    variant="caption"
                                                                                                    sx={{
                                                                                                        fontSize:
                                                                                                            '0.625rem',
                                                                                                        color: competency.markExist
                                                                                                            ? 'success.main'
                                                                                                            : 'warning.main',
                                                                                                        fontWeight: 500,
                                                                                                    }}
                                                                                                >
                                                                                                    Status:{' '}
                                                                                                    {competency.markExist
                                                                                                        ? 'Mark Available'
                                                                                                        : 'Mark Pending'}
                                                                                                </Typography>
                                                                                            </Grid>
                                                                                            {competency.isLeaf && (
                                                                                                <Grid
                                                                                                    size={
                                                                                                        12
                                                                                                    }
                                                                                                >
                                                                                                    <Typography
                                                                                                        variant="caption"
                                                                                                        sx={{
                                                                                                            fontSize:
                                                                                                                '0.625rem',
                                                                                                            color: 'info.main',
                                                                                                            fontStyle:
                                                                                                                'italic',
                                                                                                        }}
                                                                                                    >
                                                                                                        •
                                                                                                        Leaf
                                                                                                        competency
                                                                                                    </Typography>
                                                                                                </Grid>
                                                                                            )}
                                                                                            {competency.parentCompetenceName && (
                                                                                                <Grid
                                                                                                    size={
                                                                                                        12
                                                                                                    }
                                                                                                >
                                                                                                    <Typography
                                                                                                        variant="caption"
                                                                                                        sx={{
                                                                                                            fontSize:
                                                                                                                '0.625rem',
                                                                                                            color: 'text.secondary',
                                                                                                            fontStyle:
                                                                                                                'italic',
                                                                                                        }}
                                                                                                    >
                                                                                                        Parent:{' '}
                                                                                                        {
                                                                                                            competency.parentCompetenceName
                                                                                                        }
                                                                                                    </Typography>
                                                                                                </Grid>
                                                                                            )}
                                                                                        </Grid>
                                                                                    </Box>
                                                                                </Grid>
                                                                            );
                                                                        }
                                                                    )}
                                                            </Grid>
                                                        </Box>
                                                    )}
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export const StudentMarks: React.FC<StudentMarksProps> = ({
    studentId,
    className = '',
}) => {
    const { data: response, isLoading, error } = useGetStudentMarks(studentId);

    // Extract marks from response
    const marks = Array.isArray(response) ? response : [];

    if (isLoading) {
        return (
            <Box
                className={className}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 200,
                    gap: 1.5,
                }}
            >
                <CircularProgress size={32} thickness={4} />
                <Typography
                    variant="body2"
                    sx={{ fontSize: '0.8125rem', color: 'text.secondary' }}
                >
                    Loading marks...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box className={className}>
                <Alert severity="error" sx={{ borderRadius: 1 }}>
                    <Typography
                        variant="subtitle2"
                        sx={{ fontSize: '0.875rem', mb: 0.5 }}
                    >
                        Failed to load marks
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
                        {error instanceof Error
                            ? error.message
                            : 'An error occurred'}
                    </Typography>
                </Alert>
            </Box>
        );
    }

    if (marks.length === 0) {
        return (
            <Box className={className}>
                <Alert
                    severity="info"
                    sx={{ borderRadius: 1, textAlign: 'center', py: 2 }}
                >
                    <AssessmentIcon
                        sx={{ fontSize: 32, mb: 1, opacity: 0.5 }}
                    />
                    <Typography
                        variant="subtitle2"
                        sx={{ fontSize: '0.875rem', mb: 0.5 }}
                    >
                        No marks available
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ fontSize: '0.8125rem', color: 'text.secondary' }}
                    >
                        Academic results will appear here once published.
                    </Typography>
                </Alert>
            </Box>
        );
    }

    // Get student info from first mark
    const studentInfo = marks[0];
    const studentName = `${studentInfo.firstName} ${studentInfo.lastName}`;

    return (
        <Box className={className}>
            {/* Compact Header */}
            <Box sx={{ mb: 2 }}>
                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, fontSize: '1rem', mb: 0.5 }}
                >
                    Academic Results
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ fontSize: '0.8125rem', color: 'text.secondary' }}
                >
                    {studentName} • {studentInfo.schoolYearName} •{' '}
                    {marks.length} assessments
                </Typography>
            </Box>

            {/* Marks Table */}
            <Card variant="outlined" sx={{ borderRadius: 1 }}>
                <CardContent sx={{ p: 0 }}>
                    <MarksTable marks={marks} />
                </CardContent>
            </Card>
        </Box>
    );
};
