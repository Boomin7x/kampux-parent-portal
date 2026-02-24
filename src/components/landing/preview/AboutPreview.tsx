import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import * as MuiIcons from '@mui/icons-material';
import { aboutPreviewContent } from '../../../content/landing/aboutPreviewContent';
import { PreviewCard, SectionContentGrid, SectionPreview } from '../SectionPreview';

/**
 * AboutPreview Component
 *
 * Minimal preview of the About section for landing page with:
 * - Mission statement
 * - Core values (top 3)
 * - Quick stats
 * - CTA to full About page
 */
export const AboutPreview: React.FC = () => {
    const { overline, title, subtitle, mission, coreValues, stats, cta } =
        aboutPreviewContent;

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
            {/* Mission Statement */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography
                    variant="body1"
                    sx={{
                        maxWidth: '800px',
                        mx: 'auto',
                        color: 'text.secondary',
                        lineHeight: 1.6,
                    }}
                >
                    {mission}
                </Typography>
            </Box>

            {/* Core Values */}
            <SectionContentGrid columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
                {coreValues.map(value => {
                    const IconComponent =
                        MuiIcons[value.icon as keyof typeof MuiIcons];

                    return (
                        <PreviewCard key={value.id}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                                {/* Icon */}
                                {IconComponent && (
                                    <Box
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 1,
                                            backgroundColor: value.color + '15',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}
                                    >
                                        <IconComponent
                                            sx={{
                                                fontSize: 20,
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
                                        sx={{ color: 'text.secondary', lineHeight: 1.5 }}
                                    >
                                        {value.description}
                                    </Typography>
                                </Box>
                            </Box>
                        </PreviewCard>
                    );
                })}
            </SectionContentGrid>

            {/* Quick Stats */}
            <Box
                sx={{
                    mt: 4,
                    p: 2,
                    borderRadius: 1,
                    backgroundColor: 'primary.50',
                    border: '1px solid',
                    borderColor: 'primary.100',
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
            </Box>
        </SectionPreview>
    );
};
