import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { facilitiesSectionContent } from '../../content/landing/facilitiesSection';
import { SectionPreview } from './SectionPreview';

// Facilities Preview props
interface FacilitiesPreviewProps {
    className?: string;
}

/**
 * FacilitiesPreview Component
 *
 * Compact preview of campus facilities with:
 * - 2x2 grid of facility images/cards
 * - Minimal labels overlay or below images
 * - Compact border radius: 1 (4px)
 * - CTA: "Tour Our Campus" → /facilities
 */
export const FacilitiesPreview: React.FC<FacilitiesPreviewProps> = ({
    className = '',
}) => {
    const facilities = facilitiesSectionContent.featuredFacilities.slice(0, 4);

    return (
        <SectionPreview
            id="facilities-preview"
            title="World-Class Campus"
            subtitle="Modern infrastructure for inspiring learning"
            overline="FACILITIES"
            ctaText="Tour Our Campus"
            ctaRoute="/facilities"
            backgroundColor="#fefefe"
            className={className}
            containerMaxWidth="lg"
        >
            {/* Facilities Grid */}
            <Grid container spacing={2}>
                {facilities.map((facility) => (
                    <Grid
                        size={{ xs: 12, sm: 6 }}
                        key={facility.id}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                borderRadius: 1,
                                overflow: 'hidden',
                                aspectRatio: '4/3',
                                backgroundImage: `url("${facility.image}")`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    transform: 'scale(1.02)',
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
                                        'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 50%)',
                                    zIndex: 1,
                                },
                            }}
                        >
                            {/* Label Overlay */}
                            <Box
                                className="overlay"
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    p: 2,
                                    zIndex: 2,
                                    color: 'white',
                                    opacity: 1,
                                    transition: 'opacity 0.3s ease',
                                }}
                            >
                                <Box
                                    sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        mb: 0.5,
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {facility.title}
                                </Box>
                                <Box
                                    sx={{
                                        fontSize: '0.75rem',
                                        color: 'rgba(255, 255, 255, 0.85)',
                                        lineHeight: 1.4,
                                    }}
                                >
                                    {facility.capacity}
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </SectionPreview>
    );
};
