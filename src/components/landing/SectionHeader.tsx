import { Box, Typography } from '@mui/material';
import React from 'react';

// Section header props
interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    overline?: string;
    align?: 'left' | 'center' | 'right';
    gradient?: boolean;
    className?: string;
    spacing?: number;
}

/**
 * SectionHeader Component
 *
 * Reusable header component for sections with:
 * - Typography scale compliance (h2: 1.5rem, subtitle2: 0.875rem)
 * - Gradient text support
 * - Overline support (caption variant)
 * - Consistent spacing per DESIGN_PATTERN.md
 * - Flexible alignment options
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    overline,
    align = 'left',
    gradient = false,
    className = '',
    spacing = 1.5,
}) => {
    return (
        <Box
            className={className}
            sx={{
                textAlign: align,
                mb: { xs: 4, md: 6 },
            }}
        >
            {/* Overline */}
            {overline && (
                <Typography
                    variant="caption"
                    component="p"
                    sx={{
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'primary.main',
                        mb: spacing,
                    }}
                >
                    {overline}
                </Typography>
            )}

            {/* Title */}
            <Typography
                variant="h2"
                component="h2"
                sx={{
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                    fontWeight: 600,
                    mb: subtitle ? spacing : 0,
                    ...(gradient
                        ? {
                              background:
                                  'linear-gradient(135deg, #f59e0b, #16a34a)',
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                          }
                        : {
                              color: 'text.primary',
                          }),
                }}
            >
                {title}
            </Typography>

            {/* Subtitle */}
            {subtitle && (
                <Typography
                    variant="subtitle2"
                    component="p"
                    sx={{
                        fontSize: '0.875rem',
                        color: 'text.secondary',
                        maxWidth: align === 'center' ? '600px' : 'none',
                        mx: align === 'center' ? 'auto' : 0,
                        lineHeight: 1.6,
                    }}
                >
                    {subtitle}
                </Typography>
            )}
        </Box>
    );
};

// Compact section header for smaller sections or cards
interface CompactSectionHeaderProps {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    className?: string;
}

export const CompactSectionHeader: React.FC<CompactSectionHeaderProps> = ({
    title,
    subtitle,
    icon,
    className = '',
}) => {
    return (
        <Box
            className={className}
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.5,
                mb: 2,
            }}
        >
            {icon && (
                <Box
                    sx={{
                        color: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        mt: 0.25,
                        fontSize: '1.25rem',
                    }}
                >
                    {icon}
                </Box>
            )}

            <Box sx={{ flex: 1 }}>
                <Typography
                    variant="subtitle2"
                    component="h3"
                    sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: subtitle ? 0.5 : 0,
                    }}
                >
                    {title}
                </Typography>

                {subtitle && (
                    <Typography
                        variant="caption"
                        component="p"
                        sx={{
                            color: 'text.secondary',
                            lineHeight: 1.4,
                        }}
                    >
                        {subtitle}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};
