import { Box, Container, Typography, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { facultyPreviewContent } from '../../../content/landing/facultyPreviewContent';
import { useIntersectionObserver } from '../../../hooks/ui/useIntersectionObserver';
import { SectionHeader } from '../SectionHeader';
import { CTAButton } from '../CTAButton';

/**
 * FacultyPreview Component
 *
 * Image-left, content-right layout featuring:
 * - Faculty meeting/teaching image on left (6 cols)
 * - Featured educator cards on right (6 cols)
 * - Clean content without statistics
 * - CTA button: "Meet All Faculty" → /faculty
 */
export const FacultyPreview: React.FC = () => {
    const { overline, title, subtitle, featuredFaculty, cta } =
        facultyPreviewContent;

    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            id="faculty"
            component="section"
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
                    title={title}
                    subtitle={subtitle}
                    overline={overline}
                    align="center"
                />

                {/* Image + Content Layout */}
                <Grid container spacing={4} alignItems="center" sx={{ mb: 4 }}>
                    {/* Faculty Image - LEFT */}
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
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
                            }}
                        >
                            <Box
                                component="img"
                                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80"
                                alt="Professional educator engaging with students in a dynamic classroom environment"
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
                                    Dedicated Teaching Excellence
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Featured Faculty Cards - RIGHT */}
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
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2.5,
                                }}
                            >
                                {featuredFaculty.map((faculty, index) => (
                                    <Box
                                        key={faculty.id}
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
                                            transitionDelay: `${0.5 + index * 0.1}s`,
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                backgroundColor: 'primary.50',
                                                transform: 'translateY(-2px)',
                                            },
                                        }}
                                    >
                                        {/* Faculty Avatar */}
                                        <Avatar
                                            src={faculty.image}
                                            alt={faculty.name}
                                            sx={{
                                                width: 56,
                                                height: 56,
                                                border: '2px solid',
                                                borderColor: 'primary.main',
                                                flexShrink: 0,
                                            }}
                                        />

                                        {/* Faculty Content */}
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
                                                {faculty.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'primary.main',
                                                    fontWeight: 500,
                                                    mb: 0.25,
                                                    fontSize: '0.8125rem',
                                                }}
                                            >
                                                {faculty.title}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: 'text.secondary',
                                                    display: 'block',
                                                    mb: 1,
                                                    fontSize: '0.75rem',
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {faculty.department}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'text.secondary',
                                                    lineHeight: 1.5,
                                                    fontSize: '0.8125rem',
                                                }}
                                            >
                                                {faculty.bio}
                                            </Typography>
                                        </Box>
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
                    <CTAButton to={cta.route} variant="primary" size="medium">
                        {cta.text}
                    </CTAButton>
                </Box>
            </Container>
        </Box>
    );
};
