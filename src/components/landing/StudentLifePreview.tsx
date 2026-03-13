import {
    EmojiEvents as LeadershipIcon,
    Palette as ArtsIcon,
    Science as ScienceIcon,
    Sports as SportsIcon,
} from '@mui/icons-material';
import { Box, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { studentLifeSectionContent } from '../../content/landing/studentLifeSection';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';
import { SectionHeader } from './SectionHeader';
import { CTAButton } from './CTAButton';

// Student Life Preview props
interface StudentLifePreviewProps {
    className?: string;
}

// Icon mapping helper
const getIconComponent = (iconName: string) => {
    const iconProps = { sx: { fontSize: '1.25rem' } };
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
 * Content-left, image-right layout featuring:
 * - Activity highlights on left (6 cols)
 * - Students in activities image on right (6 cols)
 * - Clean content without statistics
 * - CTA button: "Experience Campus Life" → /student-life
 */
export const StudentLifePreview: React.FC<StudentLifePreviewProps> = ({
    className = '',
}) => {
    const activities = studentLifeSectionContent.featuredActivities.slice(0, 4);

    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            id="student-life-preview"
            component="section"
            className={className}
            ref={targetRef}
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#f8fafc',
                position: 'relative',
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    opacity: isIntersecting ? 1 : 0,
                    transform: isIntersecting
                        ? 'translateY(0)'
                        : 'translateY(30px)',
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                {/* Section Header */}
                <SectionHeader
                    title="Beyond the Classroom"
                    subtitle="Rich programs that develop character and creativity"
                    overline="STUDENT LIFE"
                    align="center"
                />

                {/* Content + Image Layout */}
                <Grid container spacing={4} alignItems="center" sx={{ mb: 4 }}>
                    {/* Activity Highlights - LEFT */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateX(0)'
                                    : 'translateX(-30px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2.5,
                                }}
                            >
                                {activities.map((activity, index) => (
                                    <Box
                                        key={activity.id}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: 2,
                                            p: 2.5,
                                            borderRadius: 1,
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            backgroundColor: 'background.paper',
                                            opacity: isIntersecting ? 1 : 0,
                                            transform: isIntersecting
                                                ? 'translateY(0)'
                                                : 'translateY(20px)',
                                            transition:
                                                'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                            transitionDelay: `${0.3 + index * 0.1}s`,
                                            '&:hover': {
                                                borderColor: activity.color,
                                                backgroundColor:
                                                    activity.color + '08',
                                                transform: 'translateY(-2px)',
                                            },
                                        }}
                                    >
                                        {/* Activity Icon */}
                                        <Box
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 1,
                                                backgroundColor:
                                                    activity.color + '15',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                                color: activity.color,
                                            }}
                                        >
                                            {getIconComponent(activity.icon)}
                                        </Box>

                                        {/* Activity Content */}
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Typography
                                                variant="subtitle1"
                                                sx={{
                                                    fontWeight: 600,
                                                    mb: 0.5,
                                                    color: 'text.primary',
                                                    lineHeight: 1.3,
                                                }}
                                            >
                                                {activity.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'text.secondary',
                                                    lineHeight: 1.5,
                                                    fontSize: '0.8125rem',
                                                }}
                                            >
                                                {activity.description.substring(
                                                    0,
                                                    100
                                                )}
                                                ...
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Grid>

                    {/* Activities Image - RIGHT */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                position: 'relative',
                                borderRadius: 2,
                                overflow: 'hidden',
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateX(0)'
                                    : 'translateX(30px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
                            }}
                        >
                            <Box
                                component="img"
                                src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=800&q=80"
                                alt="Students engaging in vibrant extracurricular activities and sports"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    aspectRatio: '4/3',
                                    objectFit: 'cover',
                                    borderRadius: 1,
                                }}
                                loading="lazy"
                            />
                            {/* Image Overlay with Caption */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    background:
                                        'linear-gradient(transparent, rgba(0,0,0,0.6))',
                                    p: 2.5,
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'white',
                                        fontWeight: 500,
                                        textShadow: '0 1px 2px rgba(0,0,0,0.7)',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    Vibrant Student Activities
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                {/* CTA Button */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <CTAButton
                        to="/student-life"
                        variant="primary"
                        size="medium"
                    >
                        Experience Campus Life
                    </CTAButton>
                </Box>
            </Container>
        </Box>
    );
};
