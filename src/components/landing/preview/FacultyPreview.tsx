import { Box, Typography, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { facultyPreviewContent } from '../../../content/landing/facultyPreviewContent';
import { PreviewCard, SectionContentGrid, SectionPreview } from '../SectionPreview';

/**
 * FacultyPreview Component
 *
 * Minimal preview of the Faculty section for landing page with:
 * - Featured faculty (top 3)
 * - Faculty stats
 * - CTA to full Faculty page
 */
export const FacultyPreview: React.FC = () => {
    const { overline, title, subtitle, featuredFaculty, stats, cta } =
        facultyPreviewContent;

    return (
        <SectionPreview
            id="faculty"
            title={title}
            subtitle={subtitle}
            overline={overline}
            ctaText={cta.text}
            ctaRoute={cta.route}
            backgroundColor="#fefefe"
        >
            {/* Featured Faculty */}
            <SectionContentGrid columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
                {featuredFaculty.map(faculty => (
                    <PreviewCard key={faculty.id} hoverable>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}
                        >
                            {/* Avatar */}
                            <Avatar
                                src={faculty.image}
                                alt={faculty.name}
                                sx={{
                                    width: 80,
                                    height: 80,
                                    mb: 1.5,
                                    border: '2px solid',
                                    borderColor: 'primary.main',
                                }}
                            />

                            {/* Name & Title */}
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 600,
                                    mb: 0.5,
                                    color: 'text.primary',
                                }}
                            >
                                {faculty.name}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'primary.main',
                                    fontWeight: 500,
                                    mb: 0.5,
                                }}
                            >
                                {faculty.title}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'text.secondary',
                                    mb: 1,
                                }}
                            >
                                {faculty.department}
                            </Typography>

                            {/* Bio */}
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'text.secondary',
                                    lineHeight: 1.5,
                                }}
                            >
                                {faculty.bio}
                            </Typography>
                        </Box>
                    </PreviewCard>
                ))}
            </SectionContentGrid>

            {/* Faculty Stats */}
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
