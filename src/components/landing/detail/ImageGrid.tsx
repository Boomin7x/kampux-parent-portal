import React, { useState } from 'react';
import { Box, Typography, Card, Modal, IconButton, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import {
    Close as CloseIcon,
    NavigateBefore as PrevIcon,
    NavigateNext as NextIcon,
    ZoomIn as ZoomIcon,
} from '@mui/icons-material';
import { useIntersectionObserver } from '../../../hooks/ui/useIntersectionObserver';

interface ImageItem {
    id: string;
    src: string;
    alt: string;
    title?: string;
    description?: string;
    category?: string;
}

interface ImageGridProps {
    images: ImageItem[];
    columns?: { xs: number; sm: number; md: number; lg: number };
    aspectRatio?: string;
    spacing?: number;
    enableLightbox?: boolean;
    showTitles?: boolean;
    showCategories?: boolean;
    filterCategories?: boolean;
    className?: string;
}

export const ImageGrid: React.FC<ImageGridProps> = ({
    images,
    columns = { xs: 1, sm: 2, md: 3, lg: 4 },
    aspectRatio = '4/3',
    spacing = 2,
    enableLightbox = true,
    showTitles = false,
    showCategories = false,
    filterCategories = false,
    className = '',
}) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
        null
    );
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    // Get unique categories
    const categories = Array.from(
        new Set(images.map(img => img.category).filter(Boolean))
    ) as string[];

    // Filter images by active category
    const filteredImages = activeCategory
        ? images.filter(img => img.category === activeCategory)
        : images;

    const handleImageClick = (index: number) => {
        if (enableLightbox) {
            setSelectedImageIndex(index);
        }
    };

    const handleCloseLightbox = () => {
        setSelectedImageIndex(null);
    };

    const handlePrevImage = () => {
        if (selectedImageIndex !== null && selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        }
    };

    const handleNextImage = () => {
        if (
            selectedImageIndex !== null &&
            selectedImageIndex < filteredImages.length - 1
        ) {
            setSelectedImageIndex(selectedImageIndex + 1);
        }
    };

    const selectedImage =
        selectedImageIndex !== null ? filteredImages[selectedImageIndex] : null;

    return (
        <Box ref={targetRef} className={className}>
            {/* Category Filter */}
            {filterCategories && categories.length > 0 && (
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                        mb: 3,
                        justifyContent: 'center',
                        opacity: isIntersecting ? 1 : 0,
                        transform: isIntersecting
                            ? 'translateY(0)'
                            : 'translateY(20px)',
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: '0.1s',
                    }}
                >
                    <Chip
                        label="All"
                        clickable
                        onClick={() => setActiveCategory(null)}
                        sx={{
                            backgroundColor: !activeCategory
                                ? 'primary.main'
                                : 'transparent',
                            color: !activeCategory ? '#ffffff' : 'text.primary',
                            border: '1px solid',
                            borderColor: !activeCategory
                                ? 'primary.main'
                                : 'divider',
                            fontSize: '0.8125rem',
                            fontWeight: 600,
                            '&:hover': {
                                backgroundColor: !activeCategory
                                    ? 'primary.dark'
                                    : 'action.hover',
                            },
                        }}
                    />
                    {categories.map(category => (
                        <Chip
                            key={category}
                            label={category}
                            clickable
                            onClick={() => setActiveCategory(category)}
                            sx={{
                                backgroundColor:
                                    activeCategory === category
                                        ? 'primary.main'
                                        : 'transparent',
                                color:
                                    activeCategory === category
                                        ? '#ffffff'
                                        : 'text.primary',
                                border: '1px solid',
                                borderColor:
                                    activeCategory === category
                                        ? 'primary.main'
                                        : 'divider',
                                fontSize: '0.8125rem',
                                fontWeight: 600,
                                '&:hover': {
                                    backgroundColor:
                                        activeCategory === category
                                            ? 'primary.dark'
                                            : 'action.hover',
                                },
                            }}
                        />
                    ))}
                </Box>
            )}

            {/* Image Grid */}
            <Grid container spacing={spacing}>
                {filteredImages.map((image, index) => (
                    <Grid
                        size={{
                            xs: 12 / columns.xs,
                            sm: 12 / columns.sm,
                            md: 12 / columns.md,
                            lg: 12 / columns.lg,
                        }}
                        key={image.id}
                    >
                        <Card
                            sx={{
                                position: 'relative',
                                cursor: enableLightbox ? 'pointer' : 'default',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1,
                                overflow: 'hidden',
                                transition:
                                    'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateY(0)'
                                    : 'translateY(30px)',
                                transitionDelay: `${index * 0.1}s`,
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    borderColor: 'primary.main',
                                    '& .image-overlay': {
                                        opacity: enableLightbox ? 1 : 0,
                                    },
                                },
                            }}
                            onClick={() => handleImageClick(index)}
                        >
                            <Box
                                sx={{
                                    position: 'relative',
                                    aspectRatio: aspectRatio,
                                    overflow: 'hidden',
                                }}
                            >
                                <Box
                                    component="img"
                                    src={image.src}
                                    alt={image.alt}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        transition:
                                            'transform 0.3s ease-in-out',
                                    }}
                                />

                                {/* Hover Overlay */}
                                {enableLightbox && (
                                    <Box
                                        className="image-overlay"
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor:
                                                'rgba(0, 0, 0, 0.5)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            opacity: 0,
                                            transition:
                                                'opacity 0.3s ease-in-out',
                                        }}
                                    >
                                        <ZoomIcon
                                            sx={{
                                                fontSize: 32,
                                                color: '#ffffff',
                                            }}
                                        />
                                    </Box>
                                )}

                                {/* Category Badge */}
                                {showCategories && image.category && (
                                    <Chip
                                        label={image.category}
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            left: 8,
                                            backgroundColor: 'primary.main',
                                            color: '#ffffff',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                        }}
                                    />
                                )}
                            </Box>

                            {/* Title */}
                            {showTitles && image.title && (
                                <Box sx={{ p: 1.5 }}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            color: 'text.primary',
                                            mb: image.description ? 0.5 : 0,
                                        }}
                                    >
                                        {image.title}
                                    </Typography>
                                    {image.description && (
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'text.secondary',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {image.description}
                                        </Typography>
                                    )}
                                </Box>
                            )}
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Lightbox Modal */}
            {enableLightbox && (
                <Modal
                    open={selectedImageIndex !== null}
                    onClose={handleCloseLightbox}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 2,
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            maxWidth: '90vw',
                            maxHeight: '90vh',
                            outline: 'none',
                        }}
                    >
                        {selectedImage && (
                            <>
                                <Box
                                    component="img"
                                    src={selectedImage.src}
                                    alt={selectedImage.alt}
                                    sx={{
                                        maxWidth: '100%',
                                        maxHeight: '90vh',
                                        objectFit: 'contain',
                                        borderRadius: 1,
                                    }}
                                />

                                {/* Close Button */}
                                <IconButton
                                    onClick={handleCloseLightbox}
                                    sx={{
                                        position: 'absolute',
                                        top: -40,
                                        right: -40,
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        color: '#ffffff',
                                        '&:hover': {
                                            backgroundColor:
                                                'rgba(0, 0, 0, 0.7)',
                                        },
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>

                                {/* Navigation Buttons */}
                                {filteredImages.length > 1 && (
                                    <>
                                        {(selectedImageIndex as number) > 0 && (
                                            <IconButton
                                                onClick={handlePrevImage}
                                                sx={{
                                                    position: 'absolute',
                                                    left: -50,
                                                    top: '50%',
                                                    transform:
                                                        'translateY(-50%)',
                                                    backgroundColor:
                                                        'rgba(0, 0, 0, 0.5)',
                                                    color: '#ffffff',
                                                    '&:hover': {
                                                        backgroundColor:
                                                            'rgba(0, 0, 0, 0.7)',
                                                    },
                                                }}
                                            >
                                                <PrevIcon />
                                            </IconButton>
                                        )}

                                        {(selectedImageIndex as number) <
                                            filteredImages.length - 1 && (
                                            <IconButton
                                                onClick={handleNextImage}
                                                sx={{
                                                    position: 'absolute',
                                                    right: -50,
                                                    top: '50%',
                                                    transform:
                                                        'translateY(-50%)',
                                                    backgroundColor:
                                                        'rgba(0, 0, 0, 0.5)',
                                                    color: '#ffffff',
                                                    '&:hover': {
                                                        backgroundColor:
                                                            'rgba(0, 0, 0, 0.7)',
                                                    },
                                                }}
                                            >
                                                <NextIcon />
                                            </IconButton>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </Box>
                </Modal>
            )}
        </Box>
    );
};
