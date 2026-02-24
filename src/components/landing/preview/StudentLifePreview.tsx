import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import * as MuiIcons from '@mui/icons-material';
import { studentLifePreviewContent } from '../../../content/landing/studentLifePreviewContent';
import { PreviewCard, SectionContentGrid, SectionPreview } from '../SectionPreview';

/**
 * StudentLifePreview Component
 *
 * Minimal preview of the Student Life section for landing page with:
 * - Featured activities (top 4)
 * - Engagement stats
 * - CTA to full Student Life page
 */
export const StudentLifePreview: React.FC = () => {
    const { overline, title, subtitle, featuredActivities, stats, cta } =
        studentLifePreviewContent;

    return (
        <SectionPreview
            id="student-life"
            title={title}
            subtitle={subtitle}
            overline={overline}
            ctaText={cta.text}
            ctaRoute={cta.route}
            backgroundColor="#f8fafc"
        >
            {/* Featured Activities */}
            <SectionContentGrid columns={{ xs: 1, sm: 2, md: 4 }} spacing={2}>
                {featuredActivities.map(activity => {
                    const IconComponent =
                        MuiIcons[activity.icon as keyof typeof MuiIcons];

                    return (
                        <PreviewCard key={activity.id} hoverable>
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
                                            backgroundColor: activity.color + '15',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mb: 1.5,
                                        }}
                                    >
                                        <IconComponent
                                            sx={{
                                                fontSize: 20,
                                                color: activity.color,
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
                                    {activity.title}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: activity.color,
                                        fontWeight: 500,
                                        mb: 1,
                                    }}
                                >
                                    {activity.participants}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        lineHeight: 1.5,
                                        flex: 1,
                                    }}
                                >
                                    {activity.description}
                                </Typography>
                            </Box>
                        </PreviewCard>
                    );
                })}
            </SectionContentGrid>

            {/* Engagement Stats */}
            <Box
                sx={{
                    mt: 4,
                    p: 2,
                    borderRadius: 1,
                    background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
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
