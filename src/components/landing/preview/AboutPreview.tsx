import * as MuiIcons from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { aboutPreviewContent } from '../../../content/landing/aboutPreviewContent';
import { useIntersectionObserver } from '../../../hooks/ui/useIntersectionObserver';
import { SectionPreview } from '../SectionPreview';

/**
 * AboutPreview Component
 *
 * Enhanced preview of the About section with:
 * - School building image on left
 * - Mission statement + core values on right
 * - Alternating layout pattern
 * - Quick stats
 * - CTA to full About page
 */
export const AboutPreview: React.FC = () => {
    const { overline, title, subtitle, mission, coreValues, cta } =
        aboutPreviewContent;

    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <SectionPreview
            id="about"
            title={title}
            subtitle={subtitle}
            overline={overline}
            ctaText={cta.text}
            ctaRoute={cta.route}
            backgroundColor="#fefefe"
        >
            {/* Main Content with Image */}
            <Box ref={targetRef} sx={{ mb: 4 }}>
                <Grid container spacing={4} alignItems="center">
                    {/* Image - Left Side */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                position: 'relative',
                                borderRadius: 2,
                                overflow: 'hidden',
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateX(0)'
                                    : 'translateX(-30px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop&crop=center"
                                alt="Excellence Academy campus building showcasing modern educational facilities"
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
                                    Excellence Academy Campus
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Content - Right Side */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateX(0)'
                                    : 'translateX(30px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                transitionDelay: '0.2s',
                            }}
                        >
                            {/* Mission Statement */}
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'text.secondary',
                                    lineHeight: 1.6,
                                    mb: 3,
                                }}
                            >
                                {mission}
                            </Typography>

                            {/* Core Values - Compact Layout */}
                            <Grid container spacing={2}>
                                {coreValues.map((value, index) => {
                                    const IconComponent =
                                        MuiIcons[
                                            value.icon as keyof typeof MuiIcons
                                        ];

                                    return (
                                        <Grid size={{ xs: 12 }} key={value.id}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: 1.5,
                                                    p: 1.5,
                                                    borderRadius: 1,
                                                    backgroundColor:
                                                        'background.paper',
                                                    border: '1px solid',
                                                    borderColor: 'divider',
                                                    opacity: isIntersecting
                                                        ? 1
                                                        : 0,
                                                    transform: isIntersecting
                                                        ? 'translateY(0)'
                                                        : 'translateY(20px)',
                                                    transition:
                                                        'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    transitionDelay: `${0.3 + index * 0.1}s`,
                                                }}
                                            >
                                                {/* Icon */}
                                                {IconComponent && (
                                                    <Box
                                                        sx={{
                                                            width: 32,
                                                            height: 32,
                                                            borderRadius: 1,
                                                            backgroundColor:
                                                                value.color +
                                                                '15',
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            justifyContent:
                                                                'center',
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        <IconComponent
                                                            sx={{
                                                                fontSize: 16,
                                                                color: value.color,
                                                            }}
                                                        />
                                                    </Box>
                                                )}

                                                {/* Content */}
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            fontWeight: 600,
                                                            mb: 0.5,
                                                            color: 'text.primary',
                                                        }}
                                                    >
                                                        {value.title}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: 'text.secondary',
                                                            lineHeight: 1.4,
                                                            fontSize: '0.8rem',
                                                        }}
                                                    >
                                                        {value.description}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Quick Stats */}
            {/* <Box
                sx={{
                    mt: 4,
                    p: 2,
                    borderRadius: 1,
                    backgroundColor: 'primary.50',
                    border: '1px solid',
                    borderColor: 'primary.100',
                    opacity: isIntersecting ? 1 : 0,
                    transform: isIntersecting
                        ? 'translateY(0)'
                        : 'translateY(30px)',
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
                                        background:
                                            'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        mb: 0.5,
                                    }}
                                >
                                    {stat.number}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'text.secondary',
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
            </Box> */}
        </SectionPreview>
    );
};
