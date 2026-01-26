import React, { useState, useMemo } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Paper,
    LinearProgress,
    Chip,
    Avatar,
    useTheme,
    alpha,
} from '@mui/material';
import {
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon,
    Assessment as AnalyticsIcon,
    School as SubjectIcon,
    EmojiEvents as AchievementIcon,
    Warning as AlertIcon,
    Timeline as TimelineIcon,
    PieChart as PieChartIcon,
    BarChart as BarChartIcon,
    Download as DownloadIcon,
} from '@mui/icons-material';
import type { Student } from '../../../../types/student.types';

interface PerformanceAnalyticsProps {
    selectedStudent: Student | null;
    className?: string;
}

interface AnalyticsData {
    overallPerformance: {
        currentGPA: number;
        gpaHistory: { period: string; gpa: number; trend: 'up' | 'down' | 'stable' }[];
        classRank: number;
        totalStudents: number;
        percentile: number;
    };
    subjectAnalysis: {
        strongest: { subject: string; grade: number; trend: number };
        weakest: { subject: string; grade: number; trend: number };
        mostImproved: { subject: string; improvement: number };
        needsAttention: { subject: string; decline: number };
    };
    attendanceAnalytics: {
        rate: number;
        trend: number;
        pattern: {
            bestDay: string;
            worstDay: string;
            timePattern: string;
        };
        comparison: number; // vs school average
    };
    behaviorInsights: {
        participation: number;
        engagement: number;
        collaboration: number;
        responsibility: number;
    };
    achievements: {
        academicAwards: number;
        perfectAttendance: number;
        improvementRecognition: number;
        extracurricularAwards: number;
    };
    recommendations: {
        academic: string[];
        behavioral: string[];
        enrichment: string[];
    };
    predictiveInsights: {
        semesterProjection: number;
        riskFactors: string[];
        opportunities: string[];
        interventionSuggestions: string[];
    };
}

// Mock analytics data
const mockAnalyticsData: AnalyticsData = {
    overallPerformance: {
        currentGPA: 3.7,
        gpaHistory: [
            { period: 'Q1 2023', gpa: 3.2, trend: 'stable' },
            { period: 'Q2 2023', gpa: 3.4, trend: 'up' },
            { period: 'Q3 2023', gpa: 3.5, trend: 'up' },
            { period: 'Q4 2023', gpa: 3.6, trend: 'up' },
            { period: 'Q1 2024', gpa: 3.7, trend: 'up' },
        ],
        classRank: 45,
        totalStudents: 280,
        percentile: 84,
    },
    subjectAnalysis: {
        strongest: { subject: 'English Literature', grade: 94.8, trend: 2.1 },
        weakest: { subject: 'Advanced Mathematics', grade: 84.6, trend: -2.8 },
        mostImproved: { subject: 'Science', improvement: 8.5 },
        needsAttention: { subject: 'Social Studies', decline: -3.2 },
    },
    attendanceAnalytics: {
        rate: 95.2,
        trend: -1.5,
        pattern: {
            bestDay: 'Wednesday',
            worstDay: 'Monday',
            timePattern: 'Morning arrival consistent, occasional early dismissal',
        },
        comparison: 2.1, // 2.1% above school average
    },
    behaviorInsights: {
        participation: 88,
        engagement: 92,
        collaboration: 85,
        responsibility: 90,
    },
    achievements: {
        academicAwards: 3,
        perfectAttendance: 1,
        improvementRecognition: 2,
        extracurricularAwards: 1,
    },
    recommendations: {
        academic: [
            'Consider additional math tutoring sessions',
            'Explore advanced placement courses in English',
            'Maintain current study schedule for optimal results',
        ],
        behavioral: [
            'Encourage continued active participation',
            'Support collaborative project involvement',
            'Recognize punctuality improvements',
        ],
        enrichment: [
            'Literary club participation',
            'Science olympiad opportunities',
            'Peer tutoring leadership roles',
        ],
    },
    predictiveInsights: {
        semesterProjection: 3.8,
        riskFactors: [
            'Math performance trend requires attention',
            'Monday attendance pattern needs monitoring',
        ],
        opportunities: [
            'High potential for honor roll achievement',
            'Leadership opportunities in strong subjects',
            'Advanced course readiness in Literature',
        ],
        interventionSuggestions: [
            'Weekly math check-ins with teacher',
            'Study group participation',
            'Time management workshops',
        ],
    },
};

export const PerformanceAnalytics: React.FC<PerformanceAnalyticsProps> = ({
    selectedStudent,
    className = '',
}) => {
    const theme = useTheme();
    const [timeRange, setTimeRange] = useState('current_year');
    const [reportType, setReportType] = useState('comprehensive');

    const analyticsData = mockAnalyticsData;

    const getPerformanceColor = (value: number, type: 'gpa' | 'percentage') => {
        if (type === 'gpa') {
            if (value >= 3.5) return theme.palette.success.main;
            if (value >= 2.5) return theme.palette.warning.main;
            return theme.palette.error.main;
        } else {
            if (value >= 90) return theme.palette.success.main;
            if (value >= 80) return theme.palette.warning.main;
            return theme.palette.error.main;
        }
    };

    const getTrendIcon = (trend: 'up' | 'down' | 'stable', value?: number) => {
        if (trend === 'up' || (value && value > 0)) {
            return <TrendingUpIcon sx={{ color: theme.palette.success.main, fontSize: 16 }} />;
        } else if (trend === 'down' || (value && value < 0)) {
            return <TrendingDownIcon sx={{ color: theme.palette.error.main, fontSize: 16 }} />;
        }
        return null;
    };

    const generateReport = () => {
        // In a real application, this would generate and download a PDF report
        console.log('Generating report:', { timeRange, reportType });
    };

    if (!selectedStudent) {
        return (
            <Card className={className}>
                <CardContent>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <AnalyticsIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                            Select a student to view performance analytics
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    return (
        <Box className={className}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    Performance Analytics
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Time Range</InputLabel>
                        <Select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            label="Time Range"
                        >
                            <MenuItem value="current_quarter">Current Quarter</MenuItem>
                            <MenuItem value="current_semester">Current Semester</MenuItem>
                            <MenuItem value="current_year">Current Year</MenuItem>
                            <MenuItem value="all_time">All Time</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        onClick={generateReport}
                        sx={{ textTransform: 'none' }}
                    >
                        Generate Report
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {/* Overall Performance Summary */}
                <Grid size={{ xs: 12 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                                Overall Performance Summary
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h3" sx={{ color: getPerformanceColor(analyticsData.overallPerformance.currentGPA, 'gpa'), fontWeight: 600 }}>
                                            {analyticsData.overallPerformance.currentGPA.toFixed(2)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Current GPA
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                                            {getTrendIcon('up')}
                                            <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600, ml: 0.5 }}>
                                                +0.1 from last quarter
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 600 }}>
                                            #{analyticsData.overallPerformance.classRank}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Class Rank
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            of {analyticsData.overallPerformance.totalStudents} students
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h3" sx={{ color: 'success.main', fontWeight: 600 }}>
                                            {analyticsData.overallPerformance.percentile}%
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Percentile Rank
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Top 16% of class
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h3" sx={{ color: 'info.main', fontWeight: 600 }}>
                                            {analyticsData.achievements.academicAwards + analyticsData.achievements.extracurricularAwards}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Awards Earned
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            This school year
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Subject Analysis */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                                Subject Performance Analysis
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Paper sx={{ p: 2, backgroundColor: alpha(theme.palette.success.main, 0.05), border: `1px solid ${alpha(theme.palette.success.main, 0.2)}` }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <Avatar sx={{ width: 32, height: 32, backgroundColor: 'success.main' }}>
                                                <TrendingUpIcon fontSize="small" />
                                            </Avatar>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                Strongest Subject
                                            </Typography>
                                        </Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {analyticsData.subjectAnalysis.strongest.subject}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600 }}>
                                                {analyticsData.subjectAnalysis.strongest.grade.toFixed(1)}%
                                            </Typography>
                                            {getTrendIcon('up', analyticsData.subjectAnalysis.strongest.trend)}
                                            <Typography variant="caption" color="text.secondary">
                                                +{analyticsData.subjectAnalysis.strongest.trend.toFixed(1)}% trend
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Paper sx={{ p: 2, backgroundColor: alpha(theme.palette.warning.main, 0.05), border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}` }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <Avatar sx={{ width: 32, height: 32, backgroundColor: 'warning.main' }}>
                                                <AlertIcon fontSize="small" />
                                            </Avatar>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                Needs Attention
                                            </Typography>
                                        </Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {analyticsData.subjectAnalysis.weakest.subject}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="body2" sx={{ color: 'warning.main', fontWeight: 600 }}>
                                                {analyticsData.subjectAnalysis.weakest.grade.toFixed(1)}%
                                            </Typography>
                                            {getTrendIcon('down', analyticsData.subjectAnalysis.weakest.trend)}
                                            <Typography variant="caption" color="text.secondary">
                                                {analyticsData.subjectAnalysis.weakest.trend.toFixed(1)}% trend
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Paper sx={{ p: 2, backgroundColor: alpha(theme.palette.primary.main, 0.05), border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}` }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <Avatar sx={{ width: 32, height: 32, backgroundColor: 'primary.main' }}>
                                                <AchievementIcon fontSize="small" />
                                            </Avatar>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                Most Improved
                                            </Typography>
                                        </Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {analyticsData.subjectAnalysis.mostImproved.subject}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                                            +{analyticsData.subjectAnalysis.mostImproved.improvement.toFixed(1)}% improvement
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Paper sx={{ p: 2, backgroundColor: alpha(theme.palette.info.main, 0.05), border: `1px solid ${alpha(theme.palette.info.main, 0.2)}` }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <Avatar sx={{ width: 32, height: 32, backgroundColor: 'info.main' }}>
                                                <TimelineIcon fontSize="small" />
                                            </Avatar>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                Attendance Rate
                                            </Typography>
                                        </Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {analyticsData.attendanceAnalytics.rate.toFixed(1)}%
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'info.main', fontWeight: 600 }}>
                                            +{analyticsData.attendanceAnalytics.comparison.toFixed(1)}% vs school avg
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Behavioral Insights */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                                Behavioral Insights
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {Object.entries(analyticsData.behaviorInsights).map(([key, value]) => (
                                    <Box key={key}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                                {key}
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {value}%
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={value}
                                            sx={{
                                                height: 6,
                                                borderRadius: 3,
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: getPerformanceColor(value, 'percentage'),
                                                },
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Predictive Insights */}
                <Grid size={{ xs: 12 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                                Predictive Insights & Recommendations
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'success.main' }}>
                                            Semester Projection
                                        </Typography>
                                        <Typography variant="h4" sx={{ color: 'success.main', fontWeight: 600, mb: 1 }}>
                                            {analyticsData.predictiveInsights.semesterProjection.toFixed(1)} GPA
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Based on current performance trends
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                                            Opportunities
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            {analyticsData.predictiveInsights.opportunities.map((opportunity, index) => (
                                                <Chip
                                                    key={index}
                                                    label={opportunity}
                                                    size="small"
                                                    color="primary"
                                                    variant="outlined"
                                                    sx={{ fontSize: '0.75rem', alignSelf: 'flex-start' }}
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'warning.main' }}>
                                            Risk Factors
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            {analyticsData.predictiveInsights.riskFactors.map((risk, index) => (
                                                <Chip
                                                    key={index}
                                                    label={risk}
                                                    size="small"
                                                    color="warning"
                                                    variant="outlined"
                                                    sx={{ fontSize: '0.75rem', alignSelf: 'flex-start' }}
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Recommendations */}
                <Grid size={{ xs: 12 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                                Personalized Recommendations
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                                        Academic Support
                                    </Typography>
                                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                                        {analyticsData.recommendations.academic.map((rec, index) => (
                                            <Typography component="li" key={index} variant="body2" sx={{ mb: 1 }}>
                                                {rec}
                                            </Typography>
                                        ))}
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'success.main' }}>
                                        Behavioral Development
                                    </Typography>
                                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                                        {analyticsData.recommendations.behavioral.map((rec, index) => (
                                            <Typography component="li" key={index} variant="body2" sx={{ mb: 1 }}>
                                                {rec}
                                            </Typography>
                                        ))}
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'info.main' }}>
                                        Enrichment Opportunities
                                    </Typography>
                                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                                        {analyticsData.recommendations.enrichment.map((rec, index) => (
                                            <Typography component="li" key={index} variant="body2" sx={{ mb: 1 }}>
                                                {rec}
                                            </Typography>
                                        ))}
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};