import { Avatar, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { facultySectionContent } from '../../content/landing/facultySection';
import { SectionPreview } from './SectionPreview';

// Faculty Preview props
interface FacultyPreviewProps {
    className?: string;
}

/**
 * FacultyPreview Component
 *
 * Compact preview of featured educators with:
 * - 3-4 featured educators in card layout
 * - Minimal card design: 24px avatar, subtitle2 for name, caption for title
 * - 1-line bio per faculty (body2)
 * - Grid: 2 columns on sm, 4 columns on md+
 * - CTA: "Meet Our Team" → /faculty
 */
export const FacultyPreview: React.FC<FacultyPreviewProps> = ({
    className = '',
}) => {
    const featuredFaculty = facultySectionContent.featuredFaculty;

    return (
        <SectionPreview
            id="faculty-preview"
            title="Our Inspiring Educators"
            subtitle="World-class faculty dedicated to student success"
            overline="FACULTY"
            ctaText="Meet Our Team"
            ctaRoute="/faculty"
            backgroundColor="#fefefe"
            className={className}
            containerMaxWidth="lg"
        >
            {/* Faculty Grid */}
            <Grid container spacing={2}>
                {featuredFaculty.map(faculty => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={faculty.id}>
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: 1,
                                border: '1px solid',
                                borderColor: 'divider',
                                backgroundColor: 'background.paper',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                gap: 1.5,
                                transition:
                                    'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    backgroundColor: 'primary.50',
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            {/* Avatar */}
                            <Avatar
                                src={faculty.image}
                                alt={faculty.name}
                                sx={{
                                    width: 64,
                                    height: 64,
                                    border: '2px solid',
                                    borderColor: 'primary.main',
                                }}
                            />

                            {/* Name */}
                            <Box sx={{ width: '100%' }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: 'text.primary',
                                        lineHeight: 1.3,
                                        mb: 0.5,
                                    }}
                                >
                                    {faculty.name}
                                </Typography>

                                {/* Title */}
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.75rem',
                                        color: 'primary.main',
                                        fontWeight: 500,
                                        display: 'block',
                                        mb: 0.5,
                                    }}
                                >
                                    {faculty.title}
                                </Typography>

                                {/* Department */}
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.75rem',
                                        color: 'text.secondary',
                                        display: 'block',
                                    }}
                                >
                                    {faculty.department}
                                </Typography>
                            </Box>

                            {/* Bio - 1 line */}
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: '0.8125rem',
                                    color: 'text.secondary',
                                    lineHeight: 1.5,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {faculty.bio}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </SectionPreview>
    );
};
