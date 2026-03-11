import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import * as MuiIcons from '@mui/icons-material';
import { studentLifePreviewContent } from '../../../content/landing/studentLifePreviewContent';
import { PreviewCard, SectionContentGrid, SectionPreview } from '../SectionPreview';
import { useIntersectionObserver } from '../../../hooks/ui/useIntersectionObserver';

/**
 * StudentLifePreview Component
 *
 * Enhanced preview of the Student Life section with:
 * - Activity highlights on left
 * - Student activities image on right
 * - Alternating layout pattern (right-side image)
 * - Engagement stats
 * - CTA to full Student Life page
 */
export const StudentLifePreview: React.FC = () => {
    const { overline, title, subtitle, featuredActivities, stats, cta } =
        studentLifePreviewContent;

    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <SectionPreview
            id="student-life"
            title={title}
            subtitle={subtitle}
            overline={overline}
            ctaText={cta.text}
            ctaRoute={cta.route}
            backgroundColor="#f8fafc"
        >
            {/* Main Content with Image */}
            <Box ref={targetRef} sx={{ mb: 4 }}>
                <Grid container spacing={4} alignItems="center">
                    {/* Content - Left Side */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateX(0)'
                                    : 'translateX(-30px)',
                                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                        >
                            {/* Featured Activities - Compact Grid */}
                            <Grid container spacing={2}>
                                {featuredActivities.map((activity, index) => {
                                    const IconComponent =
                                        MuiIcons[activity.icon as keyof typeof MuiIcons];

                                    return (
                                        <Grid size={{ xs: 12, sm: 6 }} key={activity.id}>
                                            <Box
                                                sx={{
                                                    p: 2,
                                                    borderRadius: 1,
                                                    border: '1px solid',
                                                    borderColor: 'divider',
                                                    backgroundColor: 'background.paper',
                                                    height: '100%',
                                                    opacity: isIntersecting ? 1 : 0,
                                                    transform: isIntersecting
                                                        ? 'translateY(0)'
                                                        : 'translateY(20px)',
                                                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    transitionDelay: `${0.1 + index * 0.1}s`,
                                                    '&:hover': {
                                                        borderColor: activity.color,
                                                        backgroundColor: activity.color + '08',
                                                        transform: 'translateY(-2px)',
                                                    },
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        gap: 1.5,
                                                        mb: 1,
                                                    }}
                                                >
                                                    {/* Icon */}
                                                    {IconComponent && (
                                                        <Box
                                                            sx={{
                                                                width: 32,
                                                                height: 32,
                                                                borderRadius: 1,
                                                                backgroundColor: activity.color + '15',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                flexShrink: 0,
                                                            }}
                                                        >
                                                            <IconComponent
                                                                sx={{
                                                                    fontSize: 16,
                                                                    color: activity.color,
                                                                }}
                                                            />
                                                        </Box>
                                                    )}

                                                    {/* Header */}
                                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{
                                                                fontWeight: 600,
                                                                mb: 0.25,
                                                                color: 'text.primary',
                                                                lineHeight: 1.2,
                                                            }}
                                                        >
                                                            {activity.title}
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                color: activity.color,
                                                                fontWeight: 500,
                                                            }}
                                                        >
                                                            {activity.participants}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                {/* Description */}
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'text.secondary',
                                                        lineHeight: 1.4,
                                                        fontSize: '0.8rem',
                                                    }}
                                                >
                                                    {activity.description}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                    </Grid>

                    {/* Image - Right Side */}
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
                                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                transitionDelay: '0.2s',
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop&crop=center"
                                alt="Students participating in vibrant extracurricular activities and team sports"
                                style={{
                                    width: '100%',
                                    height: '400px',
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                                loading="lazy"
                            />
                            {/* Image Overlay */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    background:
                                        'linear-gradient(transparent, rgba(0,0,0,0.4))',
                                    p: 2,
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'white',
                                        fontWeight: 500,
                                        textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                                    }}
                                >
                                    Vibrant Student Life Activities
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Engagement Stats */}
            <Box
                sx={{
                    mt: 4,
                    p: 2,
                    borderRadius: 1,
                    background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                    opacity: isIntersecting ? 1 : 0,
                    transform: isIntersecting ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDelay: '0.6s',
                }}
            >
                <Grid container spacing={2}>
                    {stats.map((stat, index) => (
                        <Grid size={{ xs: 6, sm: 3 }} key={index}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 700,
                                        color: 'white',
                                        mb: 0.5,
                                    }}
                                >
                                    {stat.number}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        fontWeight: 500,
                                        whiteSpace: 'pre-line',
                                    }}
                                >
                                    {stat.label}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </SectionPreview>
    );
};
