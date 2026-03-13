import { Box, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { aboutSectionContent } from '../../content/landing/aboutSection';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';
import { CTAButton } from './CTAButton';
import { SectionHeader } from './SectionHeader';

// About Preview props
interface AboutPreviewProps {
    className?: string;
}

/**
 * AboutPreview Component
 *
 * Image-left, content-right layout featuring:
 * - School building/campus image on left (6 cols)
 * - Mission statement + core values on right (6 cols)
 * - Clean content without statistics
 * - CTA button: "Discover Our Story" → /about
 */
export const AboutPreview: React.FC<AboutPreviewProps> = ({
    className = '',
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            id="about-preview"
            component="section"
            className={className}
            ref={targetRef}
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#fefefe',
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
                    title="About Excellence Academy"
                    subtitle="Empowering students through innovative education"
                    overline="WHO WE ARE"
                    align="center"
                />

                {/* Image + Content Layout */}
                <Grid container spacing={4} alignItems="center" sx={{ mb: 4 }}>
                    {/* School Building Image - LEFT */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            component="img"
                            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80"
                            alt="Excellence Academy campus building exterior with beautiful architecture"
                            sx={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: 1,
                                objectFit: 'cover',
                                aspectRatio: '4/3',
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateX(0)'
                                    : 'translateX(-30px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
                            }}
                            loading="lazy"
                        />
                    </Grid>

                    {/* Content - RIGHT */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateX(0)'
                                    : 'translateX(30px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
                            }}
                        >
                            {/* Mission Statement */}
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: '0.95rem',
                                    lineHeight: 1.7,
                                    color: 'text.secondary',
                                    mb: 3,
                                }}
                            >
                                {aboutSectionContent.story.content}
                            </Typography>

                            {/* Core Values */}
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    mb: 2,
                                }}
                            >
                                Our Core Values
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1.5,
                                }}
                            >
                                {aboutSectionContent.values.list
                                    .slice(0, 3)
                                    .map((value, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1.5,
                                            }}
                                        >
                                            {/* Value Icon */}
                                            <Box
                                                sx={{
                                                    width: 24,
                                                    height: 24,
                                                    borderRadius: '50%',
                                                    background:
                                                        'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: 'white',
                                                        fontSize: '0.75rem',
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {index + 1}
                                                </Typography>
                                            </Box>

                                            {/* Value Text */}
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: '0.8125rem',
                                                    fontWeight: 500,
                                                    color: 'text.primary',
                                                    lineHeight: 1.4,
                                                }}
                                            >
                                                {value}
                                            </Typography>
                                        </Box>
                                    ))}
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
                    <CTAButton to="/about" variant="primary" size="medium">
                        Discover Our Story
                    </CTAButton>
                </Box>
            </Container>
        </Box>
    );
};
