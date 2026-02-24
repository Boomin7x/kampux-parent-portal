import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import * as MuiIcons from '@mui/icons-material';
import { academicPreviewContent } from '../../../content/landing/academicPreviewContent';
import { PreviewCard, SectionContentGrid, SectionPreview } from '../SectionPreview';

/**
 * AcademicPreview Component
 *
 * Minimal preview of the Academic section for landing page with:
 * - Featured programs (top 4)
 * - Program stats
 * - Overall academic stats
 * - CTA to full Academic page
 */
export const AcademicPreview: React.FC = () => {
    const { overline, title, subtitle, programs, overallStats, cta } =
        academicPreviewContent;

    return (
        <SectionPreview
            id="academics"
            title={title}
            subtitle={subtitle}
            overline={overline}
            ctaText={cta.text}
            ctaRoute={cta.route}
            backgroundColor="#f8fafc"
        >
            {/* Featured Programs */}
            <SectionContentGrid columns={{ xs: 1, sm: 2, md: 4 }} spacing={2}>
                {programs.map(program => {
                    const IconComponent =
                        MuiIcons[program.icon as keyof typeof MuiIcons];

                    return (
                        <PreviewCard key={program.id} hoverable>
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
                                            backgroundColor: program.color + '15',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mb: 1.5,
                                        }}
                                    >
                                        <IconComponent
                                            sx={{
                                                fontSize: 20,
                                                color: program.color,
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
                                    {program.title}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: program.color,
                                        fontWeight: 500,
                                        mb: 1,
                                    }}
                                >
                                    {program.level}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        lineHeight: 1.5,
                                        mb: 1.5,
                                        flex: 1,
                                    }}
                                >
                                    {program.description}
                                </Typography>

                                {/* Stats */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 2,
                                        pt: 1.5,
                                        borderTop: '1px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    {program.stats.map((stat, index) => (
                                        <Box key={index} sx={{ flex: 1 }}>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: program.color,
                                                }}
                                            >
                                                {stat.value}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{ color: 'text.secondary' }}
                                            >
                                                {stat.label}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </PreviewCard>
                    );
                })}
            </SectionContentGrid>

            {/* Overall Stats */}
            <Box
                sx={{
                    mt: 4,
                    p: 2,
                    borderRadius: 1,
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                }}
            >
                <Grid container spacing={2}>
                    {overallStats.map((stat, index) => (
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
