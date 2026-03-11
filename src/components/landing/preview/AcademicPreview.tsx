import { Box, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import * as MuiIcons from '@mui/icons-material';
import { academicPreviewContent } from '../../../content/landing/academicPreviewContent';
import { useIntersectionObserver } from '../../../hooks/ui/useIntersectionObserver';
import { SectionHeader } from '../SectionHeader';
import { CTAButton } from '../CTAButton';

/**
 * AcademicPreview Component
 *
 * Content-left, image-right layout featuring:
 * - Program highlights on left (6 cols)
 * - Classroom learning image on right (6 cols)
 * - Clean content without statistics
 * - CTA button: "Explore All Programs" → /academics
 */
export const AcademicPreview: React.FC = () => {
    const { overline, title, subtitle, programs, cta } = academicPreviewContent;

    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: false,
    });

    return (
        <Box
            id="academics"
            component="section"
            ref={targetRef}
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#f8fafc',
                position: 'relative',
            }}
        >
            <Container
                maxWidth="xl"
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

                {/* Content + Image Layout */}
                <Grid container spacing={4} alignItems="center" sx={{ mb: 4 }}>
                    {/* Program Highlights - LEFT */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateX(0)'
                                    : 'translateX(-30px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
                            }}
                        >
                            {/* Featured Programs - Clean Cards */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2.5,
                                }}
                            >
                                {programs.slice(0, 4).map((program, index) => {
                                    const IconComponent =
                                        MuiIcons[
                                            program.icon as keyof typeof MuiIcons
                                        ];

                                    return (
                                        <Box
                                            key={program.id}
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
                                                transitionDelay: `${0.3 + index * 0.1}s`,
                                                '&:hover': {
                                                    borderColor: program.color,
                                                    backgroundColor:
                                                        program.color + '08',
                                                    transform:
                                                        'translateY(-2px)',
                                                },
                                            }}
                                        >
                                            {/* Program Icon */}
                                            {IconComponent && (
                                                <Box
                                                    sx={{
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: 1,
                                                        backgroundColor:
                                                            program.color +
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
                                                            color: program.color,
                                                        }}
                                                    />
                                                </Box>
                                            )}

                                            {/* Program Content */}
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
                                                    {program.title}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: program.color,
                                                        fontWeight: 500,
                                                        fontSize: '0.8125rem',
                                                        mb: 1,
                                                        display: 'block',
                                                    }}
                                                >
                                                    {program.level}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'text.secondary',
                                                        lineHeight: 1.5,
                                                        fontSize: '0.8125rem',
                                                    }}
                                                >
                                                    {program.description}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Grid>

                    {/* Classroom Image - RIGHT */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                position: 'relative',
                                borderRadius: 2,
                                overflow: 'hidden',
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateX(0)'
                                    : 'translateX(30px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
                            }}
                        >
                            <Box
                                component="img"
                                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
                                alt="Students engaged in interactive classroom learning with modern educational technology"
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
                                    Interactive Learning Environment
                                </Typography>
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
