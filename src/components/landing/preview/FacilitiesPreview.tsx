import { Box, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import * as MuiIcons from '@mui/icons-material';
import { facilitiesPreviewContent } from '../../../content/landing/facilitiesPreviewContent';
import { useIntersectionObserver } from '../../../hooks/ui/useIntersectionObserver';
import { SectionHeader } from '../SectionHeader';
import { CTAButton } from '../CTAButton';

/**
 * FacilitiesPreview Component
 *
 * Image-left, content-right layout featuring:
 * - Campus facilities image on left (6 cols)
 * - Key facilities list on right (6 cols)
 * - Clean content without statistics
 * - CTA button: "Tour Our Campus" → /facilities
 */
export const FacilitiesPreview: React.FC = () => {
    const { overline, title, subtitle, keyFacilities, cta } =
        facilitiesPreviewContent;

    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            id="facilities"
            component="section"
            ref={targetRef}
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#fefefe',
                position: 'relative',
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    opacity: isIntersecting ? 1 : 0,
                    transform: isIntersecting
                        ? 'translateY(0)'
                        : 'translateY(30px)',
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                {/* Section Header */}
                <SectionHeader
                    title={title}
                    subtitle={subtitle}
                    overline={overline}
                    align="center"
                />

                {/* Image + Content Layout */}
                <Grid container spacing={4} alignItems="center" sx={{ mb: 4 }}>
                    {/* Campus Facilities Image - LEFT */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                position: 'relative',
                                borderRadius: 2,
                                overflow: 'hidden',
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateX(0)'
                                    : 'translateX(-30px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
                            }}
                        >
                            <Box
                                component="img"
                                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80"
                                alt="Modern school facilities featuring state-of-the-art laboratories and learning spaces"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    aspectRatio: '4/3',
                                    objectFit: 'cover',
                                    borderRadius: 1,
                                }}
                                loading="lazy"
                            />
                            {/* Image Overlay with Caption */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    background:
                                        'linear-gradient(transparent, rgba(0,0,0,0.6))',
                                    p: 2.5,
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'white',
                                        fontWeight: 500,
                                        textShadow: '0 1px 2px rgba(0,0,0,0.7)',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    Modern Campus Facilities
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Key Facilities List - RIGHT */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateX(0)'
                                    : 'translateX(30px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2.5,
                                }}
                            >
                                {keyFacilities.map((facility, index) => {
                                    const IconComponent =
                                        MuiIcons[
                                            facility.icon as keyof typeof MuiIcons
                                        ];

                                    return (
                                        <Box
                                            key={facility.id}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: 2,
                                                p: 2.5,
                                                borderRadius: 1,
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                backgroundColor:
                                                    'background.paper',
                                                opacity: isIntersecting ? 1 : 0,
                                                transform: isIntersecting
                                                    ? 'translateY(0)'
                                                    : 'translateY(20px)',
                                                transition:
                                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                                transitionDelay: `${0.5 + index * 0.1}s`,
                                                '&:hover': {
                                                    borderColor: facility.color,
                                                    backgroundColor:
                                                        facility.color + '08',
                                                    transform:
                                                        'translateY(-2px)',
                                                },
                                            }}
                                        >
                                            {/* Facility Icon */}
                                            {IconComponent && (
                                                <Box
                                                    sx={{
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: 1,
                                                        backgroundColor:
                                                            facility.color +
                                                            '15',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        flexShrink: 0,
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

                                            {/* Facility Content */}
                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        fontWeight: 600,
                                                        mb: 0.5,
                                                        color: 'text.primary',
                                                        lineHeight: 1.3,
                                                    }}
                                                >
                                                    {facility.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'text.secondary',
                                                        lineHeight: 1.5,
                                                        fontSize: '0.8125rem',
                                                    }}
                                                >
                                                    {facility.description}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                {/* CTA Button */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <CTAButton to={cta.route} variant="primary" size="medium">
                        {cta.text}
                    </CTAButton>
                </Box>
            </Container>
        </Box>
    );
};
