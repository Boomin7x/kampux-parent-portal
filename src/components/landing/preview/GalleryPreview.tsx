import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { galleryPreviewContent } from '../../../content/landing/galleryPreviewContent';
import { SectionContentGrid, SectionPreview } from '../SectionPreview';

/**
 * GalleryPreview Component
 *
 * Minimal preview of the Gallery section for landing page with:
 * - Preview images (top 6)
 * - Gallery stats
 * - CTA to full Gallery page
 */
export const GalleryPreview: React.FC = () => {
    const { overline, title, subtitle, previewImages, stats, cta } =
        galleryPreviewContent;

    return (
        <SectionPreview
            id="gallery"
            title={title}
            subtitle={subtitle}
            overline={overline}
            ctaText={cta.text}
            ctaRoute={cta.route}
            backgroundColor="#f8fafc"
        >
            {/* Preview Images Grid */}
            <SectionContentGrid columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
                {previewImages.map(image => (
                    <Box
                        key={image.id}
                        sx={{
                            position: 'relative',
                            borderRadius: 1,
                            overflow: 'hidden',
                            aspectRatio: '4/3',
                            cursor: 'pointer',
                            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                transform: 'scale(1.02)',
                                '& .gallery-overlay': {
                                    opacity: 1,
                                },
                            },
                        }}
                    >
                        {/* Image */}
                        <Box
                            component="img"
                            src={image.image}
                            alt={image.title}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />

                        {/* Overlay */}
                        <Box
                            className="gallery-overlay"
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                background:
                                    'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
                                opacity: 0,
                                transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                p: 2,
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 600,
                                    color: 'white',
                                    mb: 0.5,
                                }}
                            >
                                {image.title}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.9)',
                                }}
                            >
                                {image.date}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </SectionContentGrid>

            {/* Gallery Stats */}
            <Box
                sx={{
                    mt: 4,
                    p: 2,
                    borderRadius: 1,
                    background:
                        'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #10b981 100%)',
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
