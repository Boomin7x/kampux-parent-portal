import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { aboutSectionContent } from '../../content/landing/aboutSection';
import { SectionPreview } from './SectionPreview';

// About Preview props
interface AboutPreviewProps {
    className?: string;
}

/**
 * AboutPreview Component
 *
 * Compact preview of the About section with:
 * - Mission statement (2-3 sentences)
 * - 3 core values in 2-column grid
 * - Typography: subtitle2 for headers, body2 for text
 * - Compact padding: p: 2
 * - CTA button: "Discover Our Story" → /about
 */
export const AboutPreview: React.FC<AboutPreviewProps> = ({
    className = '',
}) => {
    return (
        <SectionPreview
            id="about-preview"
            title="About Excellence Academy"
            subtitle="Empowering students through innovative education"
            overline="WHO WE ARE"
            ctaText="Discover Our Story"
            ctaRoute="/about"
            backgroundColor="#fefefe"
            className={className}
            containerMaxWidth="lg"
        >
            {/* Mission Statement */}
            <Box
                sx={{
                    mb: 4,
                    textAlign: 'center',
                    maxWidth: '800px',
                    mx: 'auto',
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: '0.8125rem',
                        lineHeight: 1.7,
                        color: 'text.secondary',
                    }}
                >
                    {aboutSectionContent.story.content}
                </Typography>
            </Box>

            {/* Core Values Grid */}
            <Grid container spacing={2}>
                {aboutSectionContent.values.list.slice(0, 3).map((value, index) => (
                    <Grid
                        size={{ xs: 12, md: 6 }}
                        key={index}
                    >
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: 1,
                                border: '1px solid',
                                borderColor: 'divider',
                                backgroundColor: 'background.paper',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    backgroundColor: 'primary.50',
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            {/* Value Icon/Number */}
                            <Box
                                sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                    }}
                                >
                                    {index + 1}
                                </Typography>
                            </Box>

                            {/* Value Text */}
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    color: 'text.primary',
                                    lineHeight: 1.4,
                                }}
                            >
                                {value}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </SectionPreview>
    );
};
