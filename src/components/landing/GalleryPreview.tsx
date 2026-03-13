import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { gallerySectionContent } from '../../content/landing/gallerySection';
import { SectionPreview } from './SectionPreview';

// Gallery Preview props
interface GalleryPreviewProps {
    className?: string;
}

/**
 * GalleryPreview Component
 *
 * Compact preview of photo gallery with:
 * - 3x3 compact grid of photos
 * - Equal aspect ratio (square)
 * - Subtle hover effects (scale: 1.02)
 * - Gap: 1.5
 * - CTA: "View Full Gallery" → /gallery
 */
export const GalleryPreview: React.FC<GalleryPreviewProps> = ({
    className = '',
}) => {
    const galleryItems = gallerySectionContent.galleryItems.slice(0, 9);

    return (
        <SectionPreview
            id="gallery-preview"
            title="Moments of Excellence"
            subtitle="Capturing the vibrant spirit of our community"
            overline="GALLERY"
            ctaText="View Full Gallery"
            ctaRoute="/gallery"
            backgroundColor="#f8fafc"
            className={className}
            containerMaxWidth="lg"
        >
            {/* Gallery Grid */}
            <Grid container spacing={1.5}>
                {galleryItems.map(item => (
                    <Grid size={{ xs: 6, sm: 4, md: 4 }} key={item.id}>
                        <Box
                            sx={{
                                position: 'relative',
                                borderRadius: 1,
                                overflow: 'hidden',
                                aspectRatio: '1/1',
                                backgroundImage: `url("${item.image}")`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                cursor: 'pointer',
                                transition:
                                    'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                    zIndex: 1,
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                    '& .overlay': {
                                        opacity: 1,
                                    },
                                },
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background:
                                        'linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 50%)',
                                    zIndex: 1,
                                },
                            }}
                        >
                            {/* Hover Overlay */}
                            <Box
                                className="overlay"
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    p: 1.5,
                                    zIndex: 2,
                                    color: 'white',
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease',
                                }}
                            >
                                <Box
                                    sx={{
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        lineHeight: 1.3,
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {item.title}
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </SectionPreview>
    );
};
