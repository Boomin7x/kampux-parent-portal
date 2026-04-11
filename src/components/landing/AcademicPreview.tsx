import {
    MenuBook as LiteratureIcon,
    School as ElementaryIcon,
    Science as ScienceIcon,
} from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { academicSectionContent } from '../../content/landing/academicSection';
import { SectionPreview } from './SectionPreview';

// Academic Preview props
interface AcademicPreviewProps {
    className?: string;
}

// Icon mapping helper
const getIconComponent = (iconName: string) => {
    const iconProps = { sx: { fontSize: '1.25rem' } };
    switch (iconName) {
        case 'School':
            return <ElementaryIcon {...iconProps} />;
        case 'MenuBook':
            return <LiteratureIcon {...iconProps} />;
        case 'Science':
            return <ScienceIcon {...iconProps} />;
        default:
            return <ElementaryIcon {...iconProps} />;
    }
};

/**
 * AcademicPreview Component
 *
 * Compact preview of academic programs with:
 * - 3-4 key programs as compact cards
 * - Stats row: Total Students, Programs Offered, Success Rate
 * - Grid layout: 3 columns on md+
 * - Typography: subtitle2 for headers, caption for stats
 * - CTA: "Explore Programs" → /academics
 */
export const AcademicPreview: React.FC<AcademicPreviewProps> = ({
    className = '',
}) => {
    const programs = academicSectionContent.programs.slice(0, 3);

    return (
        <SectionPreview
            id="academic-preview"
            title="Etablissement d' Excellence"
            subtitle="Des programmes complets pour chaque étape."
            overline="PROGRAMMES"
            ctaText="Découvrez les programmes"
            ctaRoute="/academics"
            backgroundColor="#f8fafc"
            className={className}
            containerMaxWidth="lg"
        >
            {/* Programs Grid */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                {programs.map(program => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={program.id}>
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
                            {/* Icon */}
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 1,
                                    background:
                                        'linear-gradient(135deg, #f59e0b, #16a34a)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                }}
                            >
                                {getIconComponent(program.icon)}
                            </Box>

                            {/* Level */}
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    color: 'primary.main',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                }}
                            >
                                {program.level}
                            </Typography>

                            {/* Title */}
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    lineHeight: 1.3,
                                }}
                            >
                                {program.title}
                            </Typography>

                            {/* Description */}
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: '0.8125rem',
                                    color: 'text.secondary',
                                    lineHeight: 1.5,
                                    flex: 1,
                                }}
                            >
                                {program.description.substring(0, 100)}...
                            </Typography>

                            {/* Features */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 0.75,
                                    mt: 'auto',
                                }}
                            >
                                {program.features
                                    .slice(0, 3)
                                    .map((feature, idx) => (
                                        <Typography
                                            key={idx}
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.75rem',
                                                px: 1,
                                                py: 0.5,
                                                borderRadius: 0.5,
                                                backgroundColor: 'primary.100',
                                                color: 'primary.main',
                                                fontWeight: 500,
                                            }}
                                        >
                                            {feature}
                                        </Typography>
                                    ))}
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {/* Stats Row */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: { xs: 3, md: 6 },
                    py: 3,
                    px: 2,
                    borderRadius: 1,
                    backgroundColor: 'primary.50',
                    border: '1px solid',
                    borderColor: 'primary.100',
                }}
            >
                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: 'primary.main',
                            lineHeight: 1,
                            mb: 0.5,
                        }}
                    >
                        +200
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            fontSize: '0.75rem',
                            color: 'text.secondary',
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                        }}
                    >
                        Elèves
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: 1,
                        height: 32,
                        backgroundColor: 'divider',
                    }}
                />

                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: 'primary.main',
                            lineHeight: 1,
                            mb: 0.5,
                        }}
                    >
                        15+
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            fontSize: '0.75rem',
                            color: 'text.secondary',
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                        }}
                    >
                        Programmes
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: 1,
                        height: 32,
                        backgroundColor: 'divider',
                    }}
                />

                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: 'primary.main',
                            lineHeight: 1,
                            mb: 0.5,
                        }}
                    >
                        98%
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            fontSize: '0.75rem',
                            color: 'text.secondary',
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                        }}
                    >
                        Taux de Réussite
                    </Typography>
                </Box>
            </Box>
        </SectionPreview>
    );
};
