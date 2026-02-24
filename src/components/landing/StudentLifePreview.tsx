import {
    EmojiEvents as LeadershipIcon,
    Palette as ArtsIcon,
    Science as ScienceIcon,
    Sports as SportsIcon,
} from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { studentLifeSectionContent } from '../../content/landing/studentLifeSection';
import { SectionPreview } from './SectionPreview';

// Student Life Preview props
interface StudentLifePreviewProps {
    className?: string;
}

// Icon mapping helper
const getIconComponent = (iconName: string) => {
    const iconProps = { sx: { fontSize: '1.125rem' } };
    switch (iconName) {
        case 'Sports':
            return <SportsIcon {...iconProps} />;
        case 'Palette':
            return <ArtsIcon {...iconProps} />;
        case 'Science':
            return <ScienceIcon {...iconProps} />;
        case 'EmojiEvents':
            return <LeadershipIcon {...iconProps} />;
        default:
            return <SportsIcon {...iconProps} />;
    }
};

/**
 * StudentLifePreview Component
 *
 * Compact preview of student activities with:
 * - 3-column grid of activities with icons (18-20px icons)
 * - Each activity: icon + title (subtitle2) + short description (caption)
 * - Compact spacing: gap: 1.5
 * - CTA: "Experience Campus Life" → /student-life
 */
export const StudentLifePreview: React.FC<StudentLifePreviewProps> = ({
    className = '',
}) => {
    const activities = studentLifeSectionContent.featuredActivities.slice(0, 3);

    return (
        <SectionPreview
            id="student-life-preview"
            title="Beyond the Classroom"
            subtitle="Rich programs that develop character and creativity"
            overline="STUDENT LIFE"
            ctaText="Experience Campus Life"
            ctaRoute="/student-life"
            backgroundColor="#f8fafc"
            className={className}
            containerMaxWidth="lg"
        >
            {/* Activities Grid */}
            <Grid container spacing={2}>
                {activities.map((activity) => (
                    <Grid
                        size={{ xs: 12, sm: 6, md: 4 }}
                        key={activity.id}
                    >
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: 1,
                                border: '1px solid',
                                borderColor: 'divider',
                                backgroundColor: 'background.paper',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1.5,
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    backgroundColor: 'primary.50',
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            {/* Icon and Title */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5,
                                }}
                            >
                                {/* Icon */}
                                <Box
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 1,
                                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        flexShrink: 0,
                                    }}
                                >
                                    {getIconComponent(activity.icon)}
                                </Box>

                                {/* Title */}
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: 'text.primary',
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {activity.title}
                                </Typography>
                            </Box>

                            {/* Description */}
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: '0.8125rem',
                                    color: 'text.secondary',
                                    lineHeight: 1.5,
                                    flex: 1,
                                }}
                            >
                                {activity.description.substring(0, 120)}...
                            </Typography>

                            {/* Participants */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    pt: 1,
                                    borderTop: '1px solid',
                                    borderColor: 'divider',
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.75rem',
                                        color: 'primary.main',
                                        fontWeight: 600,
                                    }}
                                >
                                    {activity.participants}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </SectionPreview>
    );
};
