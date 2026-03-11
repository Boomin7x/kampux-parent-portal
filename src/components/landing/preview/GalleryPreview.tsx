import { Box, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { galleryPreviewContent } from '../../../content/landing/galleryPreviewContent';
import { useIntersectionObserver } from '../../../hooks/ui/useIntersectionObserver';
import { SectionHeader } from '../SectionHeader';
import { CTAButton } from '../CTAButton';

/**
 * GalleryPreview Component
 *
 * Content-left, image-right layout featuring:
 * - Simple gallery teaser on left (6 cols)
 * - Featured gallery image on right (6 cols)
 * - Clean content without statistics
 * - CTA button: "View Full Gallery" → /gallery
 */
export const GalleryPreview: React.FC = () => {
    const { overline, title, subtitle, previewImages, cta } =
        galleryPreviewContent;

    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            id="gallery"
            component="section"
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
                    title={title}
                    subtitle={subtitle}
                    overline={overline}
                    align="center"
                />

                {/* Content + Image Layout */}
                <Grid container spacing={4} alignItems="center" sx={{ mb: 4 }}>
                    {/* Gallery Teaser - LEFT */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateX(0)'
                                    : 'translateX(-30px)',
                                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
                            }}
                        >
                            {/* Mini Gallery Grid */}
                            <Grid container spacing={2} sx={{ mb: 3 }}>
                                {previewImages.slice(1, 5).map((image, index) => (
                                    <Grid size={{ xs: 6 }} key={image.id}>
                                        <Box
                                            sx={{
                                                position: 'relative',
                                                borderRadius: 1,
                                                overflow: 'hidden',
                                                aspectRatio: '4/3',
                                                opacity: isIntersecting ? 1 : 0,
                                                transform: isIntersecting
                                                    ? 'translateY(0)'
                                                    : 'translateY(20px)',
                                                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                                transitionDelay: `${0.3 + index * 0.1}s`,
                                                '&:hover': {
                                                    transform: 'scale(1.02) translateY(-2px)',
                                                },
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={`https://images.unsplash.com/photo-${1580234567890 + index * 1000000}?auto=format&fit=crop&w=300&h=225&q=80`}
                                                alt={image.title}
                                                sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    borderRadius: 1,
                                                }}
                                                loading="lazy"
                                            />
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>

                            {/* Gallery Description */}
                            <Box
                                sx={{
                                    opacity: isIntersecting ? 1 : 0,
                                    transform: isIntersecting
                                        ? 'translateY(0)'
                                        : 'translateY(20px)',
                                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s',
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        mb: 2,
                                        color: 'text.primary',
                                        lineHeight: 1.3,
                                    }}
                                >
                                    Visual Stories of Excellence
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'text.secondary',
                                        lineHeight: 1.6,
                                        fontSize: '0.95rem',
                                        mb: 2,
                                    }}
                                >
                                    Discover memorable moments from our vibrant school community.
                                    From academic achievements to sporting victories and artistic excellence.
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        lineHeight: 1.5,
                                        fontSize: '0.8125rem',
                                    }}
                                >
                                    Explore our comprehensive gallery featuring events, celebrations,
                                    achievements, and daily life at Excellence Academy.
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Featured Gallery Image - RIGHT */}
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
                                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
                                '&:hover': {
                                    '& .gallery-overlay': {
                                        opacity: 0.9,
                                    },
                                },
                            }}
                        >
                            <Box
                                component="img"
                                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=800&q=80"
                                alt="Featured school event showcasing Excellence Academy's vibrant community spirit"
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
                                className="gallery-overlay"
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    background:
                                        'linear-gradient(transparent, rgba(0,0,0,0.6))',
                                    p: 2.5,
                                    opacity: 0.8,
                                    transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
                                    Capturing Excellence Academy's Vibrant Community
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
                        to={cta.route}
                        variant="primary"
                        size="medium"
                    >
                        {cta.text}
                    </CTAButton>
                </Box>
            </Container>
        </Box>
    );
};
