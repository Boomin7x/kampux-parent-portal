import { Box, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';
import { CTAButton } from './CTAButton';
import { SectionHeader } from './SectionHeader';

// Section preview props
interface SectionPreviewProps {
    id: string;
    title: string;
    subtitle?: string;
    overline?: string;
    ctaText?: string;
    ctaRoute?: string;
    backgroundColor?: string;
    children: React.ReactNode;
    className?: string;
    containerMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | false;
    showCTA?: boolean;
}

/**
 * SectionPreview Component
 *
 * Base component for landing page preview sections with:
 * - Minimal design pattern implementation
 * - "View More" CTA integration
 * - Intersection observer for animations
 * - Responsive grid system
 * - Consistent spacing per DESIGN_PATTERN.md
 */
export const SectionPreview: React.FC<SectionPreviewProps> = ({
    id,
    title,
    subtitle,
    overline,
    ctaText = 'Learn More',
    ctaRoute,
    backgroundColor = 'background.default',
    children,
    className = '',
    containerMaxWidth = 'lg',
    showCTA = true,
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            id={id}
            component="section"
            className={className}
            ref={targetRef}
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor,
                position: 'relative',
            }}
        >
            <Container
                maxWidth={containerMaxWidth}
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

                {/* Section Content */}
                <Box sx={{ mb: showCTA && ctaRoute ? 4 : 0 }}>{children}</Box>

                {/* CTA Button */}
                {showCTA && ctaRoute && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 4,
                        }}
                    >
                        <CTAButton
                            to={ctaRoute}
                            variant="primary"
                            size="medium"
                        >
                            {ctaText}
                        </CTAButton>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

// Section content grid wrapper for consistent layout
interface SectionContentGridProps {
    children: React.ReactNode;
    columns?: { xs: number; sm: number; md: number; lg?: number };
    spacing?: number;
}

export const SectionContentGrid: React.FC<SectionContentGridProps> = ({
    children,
    columns = { xs: 1, sm: 2, md: 3 },
    spacing = 2,
}) => {
    return (
        <Grid container spacing={spacing}>
            {React.Children.map(children, child => (
                <Grid
                    size={{
                        xs: 12 / (columns.xs || 1),
                        sm: 12 / (columns.sm || 2),
                        md: 12 / (columns.md || 3),
                        lg: columns.lg ? 12 / columns.lg : undefined,
                    }}
                >
                    {child}
                </Grid>
            ))}
        </Grid>
    );
};

// Preview card wrapper for individual preview items
interface PreviewCardProps {
    children: React.ReactNode;
    hoverable?: boolean;
    onClick?: () => void;
    className?: string;
}

export const PreviewCard: React.FC<PreviewCardProps> = ({
    children,
    hoverable = false,
    onClick,
    className = '',
}) => {
    return (
        <Box
            className={className}
            onClick={onClick}
            sx={{
                p: 2,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper',
                cursor: onClick ? 'pointer' : 'default',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                ...(hoverable && {
                    '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: 'primary.50',
                        transform: 'translateY(-2px)',
                    },
                }),
            }}
        >
            {children}
        </Box>
    );
};
