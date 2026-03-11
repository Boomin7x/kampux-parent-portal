import React from 'react';
import { Box, Typography, Card, Chip } from '@mui/material';
import {
    School as EducationIcon,
    Business as BusinessIcon,
    EmojiEvents as AchievementIcon,
    Group as CommunityIcon,
    Build as DevelopmentIcon,
    Star as StarIcon,
} from '@mui/icons-material';
import { useIntersectionObserver } from '../../../hooks/ui/useIntersectionObserver';

interface TimelineItemProps {
    id: string;
    year: string;
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
    category?: 'education' | 'business' | 'achievement' | 'community' | 'development' | 'milestone';
    details?: string[];
    statistics?: { label: string; value: string }[];
    isHighlight?: boolean;
    position?: 'left' | 'right';
    index?: number;
    className?: string;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
    id,
    year,
    title,
    description,
    image,
    imageAlt = title,
    category = 'milestone',
    details = [],
    statistics = [],
    isHighlight = false,
    position = 'right',
    index = 0,
    className = '',
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.2,
        freezeOnceVisible: true,
    });

    const getCategoryIcon = () => {
        switch (category) {
            case 'education':
                return <EducationIcon sx={{ fontSize: 20 }} />;
            case 'business':
                return <BusinessIcon sx={{ fontSize: 20 }} />;
            case 'achievement':
                return <AchievementIcon sx={{ fontSize: 20 }} />;
            case 'community':
                return <CommunityIcon sx={{ fontSize: 20 }} />;
            case 'development':
                return <DevelopmentIcon sx={{ fontSize: 20 }} />;
            default:
                return <StarIcon sx={{ fontSize: 20 }} />;
        }
    };

    const getCategoryColor = () => {
        switch (category) {
            case 'education':
                return '#2196f3';
            case 'business':
                return '#ff9800';
            case 'achievement':
                return '#4caf50';
            case 'community':
                return '#9c27b0';
            case 'development':
                return '#f44336';
            default:
                return '#6366f1';
        }
    };

    return (
        <Box
            ref={targetRef}
            className={className}
            sx={{
                display: 'flex',
                position: 'relative',
                flexDirection: position === 'left' ? 'row-reverse' : 'row',
                alignItems: 'center',
                mb: { xs: 4, md: 6 },
                opacity: isIntersecting ? 1 : 0,
                transform: isIntersecting
                    ? 'translateY(0)'
                    : 'translateY(40px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: `${index * 0.2}s`,
            }}
        >
            {/* Timeline Line and Dot */}
            <Box
                sx={{
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    bottom: -48,
                    width: 2,
                    backgroundColor: 'divider',
                    zIndex: 1,
                    display: { xs: 'none', md: 'block' },
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    left: '50%',
                    top: 24,
                    width: 48,
                    height: 48,
                    backgroundColor: getCategoryColor(),
                    border: '4px solid #ffffff',
                    borderRadius: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateX(-50%) scale(1.1)',
                    },
                    display: { xs: 'none', md: 'flex' },
                }}
            >
                {getCategoryIcon()}
            </Box>

            {/* Year Badge (Mobile) */}
            <Box
                sx={{
                    display: { xs: 'block', md: 'none' },
                    mb: 2,
                }}
            >
                <Chip
                    label={year}
                    sx={{
                        backgroundColor: getCategoryColor(),
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                    }}
                />
            </Box>

            {/* Content Card */}
            <Card
                sx={{
                    flex: 1,
                    maxWidth: { xs: '100%', md: 'calc(50% - 60px)' },
                    p: 3,
                    backgroundColor: isHighlight ? '#f8fafc' : '#ffffff',
                    border: '1px solid',
                    borderColor: isHighlight ? getCategoryColor() : 'divider',
                    borderRadius: 1,
                    position: 'relative',
                    ml: position === 'left' ? { xs: 0, md: 0 } : { xs: 0, md: 6 },
                    mr: position === 'right' ? { xs: 0, md: 0 } : { xs: 0, md: 6 },
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        borderColor: getCategoryColor(),
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                    },
                    // Arrow pointing to timeline dot (desktop only)
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 24,
                        [position === 'left' ? 'right' : 'left']: -8,
                        width: 0,
                        height: 0,
                        borderTop: '8px solid transparent',
                        borderBottom: '8px solid transparent',
                        [position === 'left' ? 'borderRight' : 'borderLeft']: `8px solid ${
                            isHighlight ? getCategoryColor() : '#e0e0e0'
                        }`,
                        display: { xs: 'none', md: 'block' },
                    },
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                            sx={{
                                display: { xs: 'flex', md: 'none' },
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 32,
                                height: 32,
                                backgroundColor: getCategoryColor(),
                                borderRadius: '50%',
                                color: '#ffffff',
                            }}
                        >
                            {getCategoryIcon()}
                        </Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                color: 'text.primary',
                            }}
                        >
                            {title}
                        </Typography>
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            color: getCategoryColor(),
                            display: { xs: 'none', md: 'block' },
                        }}
                    >
                        {year}
                    </Typography>
                </Box>

                {/* Image */}
                {image && (
                    <Box
                        sx={{
                            mb: 2,
                            borderRadius: 1,
                            overflow: 'hidden',
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Box
                            component="img"
                            src={image}
                            alt={imageAlt}
                            sx={{
                                width: '100%',
                                height: 200,
                                objectFit: 'cover',
                                objectPosition: 'center',
                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}
                        />
                    </Box>
                )}

                {/* Description */}
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: '0.875rem',
                        color: 'text.secondary',
                        lineHeight: 1.6,
                        mb: details.length > 0 ? 2 : 0,
                    }}
                >
                    {description}
                </Typography>

                {/* Details */}
                {details.length > 0 && (
                    <Box sx={{ mb: statistics.length > 0 ? 2 : 0 }}>
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: 'text.primary',
                                mb: 1,
                                display: 'block',
                            }}
                        >
                            Key Highlights
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            {details.map((detail, idx) => (
                                <Typography
                                    key={idx}
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.8125rem',
                                        color: 'text.secondary',
                                        pl: 1.5,
                                        borderLeft: '2px solid',
                                        borderColor: getCategoryColor(),
                                        lineHeight: 1.4,
                                    }}
                                >
                                    {detail}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                )}

                {/* Statistics */}
                {statistics.length > 0 && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2,
                            pt: 2,
                            borderTop: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        {statistics.map((stat, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    textAlign: 'center',
                                    minWidth: 80,
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                        color: getCategoryColor(),
                                    }}
                                >
                                    {stat.value}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.75rem',
                                        color: 'text.secondary',
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5,
                                    }}
                                >
                                    {stat.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                )}
            </Card>
        </Box>
    );
};