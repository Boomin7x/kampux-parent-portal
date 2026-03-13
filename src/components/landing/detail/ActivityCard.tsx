import React, { type RefObject } from 'react';
import { Box, Typography, Card, Chip, Button, IconButton } from '@mui/material';
import {
    ArrowForward as ArrowIcon,
    Schedule as TimeIcon,
    LocationOn as LocationIcon,
    Group as GroupIcon,
    Star as StarIcon,
    Favorite as FavoriteIcon,
    FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';
import { useIntersectionObserver } from '../../../hooks/ui/useIntersectionObserver';

interface ActivityCardProps {
    id: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    category: string;
    schedule?: string;
    location?: string;
    capacity?: number;
    enrolled?: number;
    difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
    rating?: number;
    instructor?: string;
    ageGroup?: string;
    price?: string;
    isPopular?: boolean;
    isFavorite?: boolean;
    onFavoriteToggle?: (id: string) => void;
    onEnroll?: (id: string) => void;
    onViewDetails?: (id: string) => void;
    index?: number;
    className?: string;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
    id,
    title,
    description,
    image,
    imageAlt,
    category,
    schedule,
    location,
    capacity,
    enrolled = 0,
    difficulty,
    rating,
    instructor,
    ageGroup,
    price,
    isPopular = false,
    isFavorite = false,
    onFavoriteToggle,
    onEnroll,
    onViewDetails,
    index = 0,
    className = '',
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    const getDifficultyColor = (level?: string) => {
        switch (level) {
            case 'Beginner':
                return 'success';
            case 'Intermediate':
                return 'warning';
            case 'Advanced':
                return 'error';
            default:
                return 'default';
        }
    };

    const availableSpots = capacity ? capacity - enrolled : null;
    const isFullyBooked = capacity && enrolled >= capacity;

    return (
        <Card
            ref={targetRef as RefObject<HTMLDivElement>}
            className={className}
            sx={{
                position: 'relative',
                p: 0,
                backgroundColor: '#ffffff',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: isIntersecting ? 1 : 0,
                transform: isIntersecting
                    ? 'translateY(0)'
                    : 'translateY(30px)',
                transitionDelay: `${index * 0.1}s`,
                '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: 'primary.main',
                    '& .activity-image': {
                        transform: 'scale(1.05)',
                    },
                    '& .overlay': {
                        opacity: 1,
                    },
                },
            }}
        >
            {/* Image Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: 220,
                    overflow: 'hidden',
                }}
            >
                <Box
                    className="activity-image"
                    component="img"
                    src={image}
                    alt={imageAlt}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        transition: 'transform 0.3s ease-in-out',
                    }}
                />

                {/* Overlay */}
                <Box
                    className="overlay"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                            'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease-in-out',
                    }}
                />

                {/* Top Badges */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        right: 12,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        zIndex: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
                        <Chip
                            label={category}
                            size="small"
                            sx={{
                                backgroundColor: 'primary.main',
                                color: '#ffffff',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                            }}
                        />
                        {isPopular && (
                            <Chip
                                icon={<StarIcon sx={{ fontSize: 14 }} />}
                                label="Popular"
                                size="small"
                                sx={{
                                    backgroundColor: '#ff9800',
                                    color: '#ffffff',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    '& .MuiChip-icon': {
                                        color: '#ffffff',
                                    },
                                }}
                            />
                        )}
                    </Box>

                    {/* Favorite Button */}
                    {onFavoriteToggle && (
                        <IconButton
                            onClick={() => onFavoriteToggle(id)}
                            size="small"
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                color: isFavorite
                                    ? 'error.main'
                                    : 'text.secondary',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 1)',
                                    color: 'error.main',
                                },
                            }}
                        >
                            {isFavorite ? (
                                <FavoriteIcon sx={{ fontSize: 18 }} />
                            ) : (
                                <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                            )}
                        </IconButton>
                    )}
                </Box>

                {/* Bottom Info Overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 12,
                        left: 12,
                        right: 12,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        zIndex: 2,
                    }}
                >
                    {price && (
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#ffffff',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            {price}
                        </Typography>
                    )}

                    {rating && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                            }}
                        >
                            <StarIcon sx={{ fontSize: 14, color: '#ffd700' }} />
                            <Typography
                                variant="caption"
                                sx={{
                                    color: '#ffffff',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                }}
                            >
                                {rating.toFixed(1)}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>

            {/* Content Section */}
            <Box sx={{ p: 2.5 }}>
                {/* Title and Difficulty */}
                <Box sx={{ mb: 1.5 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            gap: 1,
                            mb: 0.5,
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: '1rem',
                                fontWeight: 700,
                                color: 'text.primary',
                                lineHeight: 1.3,
                                flex: 1,
                            }}
                        >
                            {title}
                        </Typography>
                        {difficulty && (
                            <Chip
                                label={difficulty}
                                size="small"
                                color={getDifficultyColor(difficulty) as any}
                                sx={{
                                    fontSize: '0.7rem',
                                    height: 20,
                                    fontWeight: 600,
                                }}
                            />
                        )}
                    </Box>
                    {instructor && (
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.75rem',
                                color: 'primary.main',
                                fontWeight: 600,
                            }}
                        >
                            with {instructor}
                        </Typography>
                    )}
                </Box>

                {/* Description */}
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: '0.8125rem',
                        color: 'text.secondary',
                        lineHeight: 1.5,
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {description}
                </Typography>

                {/* Activity Info */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        mb: 2,
                    }}
                >
                    {schedule && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <TimeIcon
                                sx={{ fontSize: 16, color: 'text.secondary' }}
                            />
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: '0.75rem',
                                    color: 'text.secondary',
                                }}
                            >
                                {schedule}
                            </Typography>
                        </Box>
                    )}
                    {location && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <LocationIcon
                                sx={{ fontSize: 16, color: 'text.secondary' }}
                            />
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: '0.75rem',
                                    color: 'text.secondary',
                                }}
                            >
                                {location}
                            </Typography>
                        </Box>
                    )}
                    {capacity && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <GroupIcon
                                sx={{ fontSize: 16, color: 'text.secondary' }}
                            />
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: '0.75rem',
                                    color: isFullyBooked
                                        ? 'error.main'
                                        : 'text.secondary',
                                }}
                            >
                                {enrolled}/{capacity} enrolled
                                {availableSpots && availableSpots > 0 && (
                                    <span style={{ color: '#4caf50' }}>
                                        {' '}
                                        ({availableSpots} spots left)
                                    </span>
                                )}
                                {isFullyBooked && (
                                    <span style={{ color: '#f44336' }}>
                                        {' '}
                                        (Full)
                                    </span>
                                )}
                            </Typography>
                        </Box>
                    )}
                    {ageGroup && (
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.75rem',
                                color: 'text.secondary',
                                fontStyle: 'italic',
                            }}
                        >
                            Age group: {ageGroup}
                        </Typography>
                    )}
                </Box>

                {/* Action Buttons */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 1,
                        pt: 2,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => onViewDetails?.(id)}
                        sx={{
                            fontSize: '0.75rem',
                            textTransform: 'none',
                            flex: 1,
                        }}
                    >
                        Details
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        disabled={isFullyBooked as boolean}
                        endIcon={<ArrowIcon sx={{ fontSize: 14 }} />}
                        onClick={() => onEnroll?.(id)}
                        sx={{
                            fontSize: '0.75rem',
                            textTransform: 'none',
                            flex: 2,
                            backgroundColor: isFullyBooked
                                ? 'grey.400'
                                : 'primary.main',
                            '&:hover': {
                                backgroundColor: isFullyBooked
                                    ? 'grey.400'
                                    : 'primary.dark',
                            },
                        }}
                    >
                        {isFullyBooked ? 'Full' : 'Enroll'}
                    </Button>
                </Box>
            </Box>
        </Card>
    );
};
