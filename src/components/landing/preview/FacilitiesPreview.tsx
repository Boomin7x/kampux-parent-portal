import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import * as MuiIcons from '@mui/icons-material';
import { facilitiesPreviewContent } from '../../../content/landing/facilitiesPreviewContent';
import { PreviewCard, SectionContentGrid, SectionPreview } from '../SectionPreview';

/**
 * FacilitiesPreview Component
 *
 * Minimal preview of the Facilities section for landing page with:
 * - Key facilities (top 4)
 * - Infrastructure stats
 * - CTA to full Facilities page
 */
export const FacilitiesPreview: React.FC = () => {
    const { overline, title, subtitle, keyFacilities, stats, cta } =
        facilitiesPreviewContent;

    return (
        <SectionPreview
            id="facilities"
            title={title}
            subtitle={subtitle}
            overline={overline}
            ctaText={cta.text}
            ctaRoute={cta.route}
            backgroundColor="#fefefe"
        >
            {/* Key Facilities */}
            <SectionContentGrid columns={{ xs: 1, sm: 2, md: 4 }} spacing={2}>
                {keyFacilities.map(facility => {
                    const IconComponent =
                        MuiIcons[facility.icon as keyof typeof MuiIcons];

                    return (
                        <PreviewCard key={facility.id} hoverable>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                }}
                            >
                                {/* Icon */}
                                {IconComponent && (
                                    <Box
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 1,
                                            backgroundColor: facility.color + '15',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mb: 1.5,
                                        }}
                                    >
                                        <IconComponent
                                            sx={{
                                                fontSize: 20,
                                                color: facility.color,
                                            }}
                                        />
                                    </Box>
                                )}

                                {/* Content */}
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 600,
                                        mb: 0.5,
                                        color: 'text.primary',
                                    }}
                                >
                                    {facility.title}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: facility.color,
                                        fontWeight: 500,
                                        mb: 1,
                                    }}
                                >
                                    {facility.capacity}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        lineHeight: 1.5,
                                        flex: 1,
                                    }}
                                >
                                    {facility.description}
                                </Typography>
                            </Box>
                        </PreviewCard>
                    );
                })}
            </SectionContentGrid>

            {/* Infrastructure Stats */}
            <Box
                sx={{
                    mt: 4,
                    p: 2,
                    borderRadius: 1,
                    background: 'linear-gradient(135deg, #6366f1 0%, #10b981 100%)',
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
