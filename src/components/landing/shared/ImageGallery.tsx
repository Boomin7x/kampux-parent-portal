import React, { useState, useCallback } from 'react';
import { Box, Grid, Modal, IconButton, Typography } from '@mui/material';
import {
    Close as CloseIcon,
    ChevronLeft,
    ChevronRight,
} from '@mui/icons-material';
import { ResponsiveImage } from './ResponsiveImage';
import { useIntersectionObserver } from '../../../hooks/ui/useIntersectionObserver';

/**
 * Interface for individual gallery image
 */
interface GalleryImage {
    /** Unique identifier for the image */
    id: string;
    /** Image source URL */
    src: string;
    /** Alternative text for accessibility */
    alt: string;
    /** Optional caption for the image */
    caption?: string;
    /** Optional thumbnail source (if different from main src) */
    thumbnail?: string;
}

/**
 * Interface for ImageGallery component props
 */
interface ImageGalleryProps {
    /** Array of images to display in the gallery */
    images: GalleryImage[];
    /** Number of columns for the grid layout */
    columns?: {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
    };
    /** Spacing between grid items */
    spacing?: number;
    /** Enable modal view for full-size images */
    enableModal?: boolean;
    /** Title for the gallery section */
    title?: string;
    /** Subtitle or description for the gallery */
    subtitle?: string;
    /** CSS class name for additional styling */
    className?: string;
}

/**
 * ImageGallery component for displaying responsive image collections
 *
 * Features:
 * - Responsive grid layout with customizable columns
 * - Modal view for full-size image display
 * - Navigation between images in modal
 * - Lazy loading for performance optimization
 * - Smooth animations with intersection observer
 * - Keyboard navigation support
 * - Accessibility compliance
 *
 * @example
 * ```tsx
 * const images = [
 *   { id: '1', src: '/images/gallery1.jpg', alt: 'Campus view 1', caption: 'Main building' },
 *   { id: '2', src: '/images/gallery2.jpg', alt: 'Campus view 2', caption: 'Library' },
 * ];
 *
 * <ImageGallery
 *   images={images}
 *   columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
 *   spacing={2}
 *   enableModal={true}
 *   title="Campus Gallery"
 *   subtitle="Explore our beautiful campus facilities"
 * />
 * ```
 */
export const ImageGallery: React.FC<ImageGalleryProps> = ({
    images,
    columns = { xs: 1, sm: 2, md: 3, lg: 4 },
    spacing = 2,
    enableModal = true,
    title,
    subtitle,
    className = '',
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Intersection observer for smooth animations
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    // Handle image click for modal view
    const handleImageClick = useCallback(
        (index: number) => {
            if (enableModal) {
                setSelectedImageIndex(index);
                setModalOpen(true);
            }
        },
        [enableModal]
    );

    // Navigate to previous image in modal
    const handlePrevImage = useCallback(() => {
        setSelectedImageIndex(prev =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    }, [images.length]);

    // Navigate to next image in modal
    const handleNextImage = useCallback(() => {
        setSelectedImageIndex(prev =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    }, [images.length]);

    // Handle keyboard navigation in modal
    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
            if (!modalOpen) return;

            switch (event.key) {
                case 'Escape':
                    setModalOpen(false);
                    break;
                case 'ArrowLeft':
                    handlePrevImage();
                    break;
                case 'ArrowRight':
                    handleNextImage();
                    break;
            }
        },
        [modalOpen, handlePrevImage, handleNextImage]
    );

    const selectedImage = images[selectedImageIndex];

    return (
        <Box
            ref={targetRef}
            className={className}
            sx={{
                opacity: isIntersecting ? 1 : 0,
                transform: isIntersecting
                    ? 'translateY(0)'
                    : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
        >
            {/* Gallery Header */}
            {(title || subtitle) && (
                <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
                    {title && (
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 600,
                                mb: 1,
                                background:
                                    'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            {title}
                        </Typography>
                    )}
                    {subtitle && (
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: 'text.secondary',
                                maxWidth: '600px',
                                mx: 'auto',
                            }}
                        >
                            {subtitle}
                        </Typography>
                    )}
                </Box>
            )}

            {/* Image Grid */}
            <Grid container spacing={spacing}>
                {images.map((image, index) => (
                    <Grid size={columns} key={image.id}>
                        <Box
                            onClick={() => handleImageClick(index)}
                            sx={{
                                cursor: enableModal ? 'pointer' : 'default',
                                // transition: 'transform 0.3s ease',
                                '&:hover': enableModal
                                    ? {
                                          transform: 'scale(1.02)',
                                      }
                                    : {},
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateY(0)'
                                    : 'translateY(20px)',
                                transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
                            }}
                        >
                            <ResponsiveImage
                                src={image.thumbnail || image.src}
                                alt={image.alt}
                                aspectRatio={1}
                                borderRadius={2}
                                objectFit="cover"
                            />
                            {image.caption && (
                                <Typography
                                    variant="caption"
                                    sx={{
                                        display: 'block',
                                        mt: 1,
                                        textAlign: 'center',
                                        color: 'text.secondary',
                                    }}
                                >
                                    {image.caption}
                                </Typography>
                            )}
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {/* Modal for full-size image view */}
            {enableModal && (
                <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            maxWidth: '90vw',
                            maxHeight: '90vh',
                            backgroundColor: 'background.paper',
                            borderRadius: 2,
                            overflow: 'hidden',
                            boxShadow: 24,
                        }}
                    >
                        {/* Close button */}
                        <IconButton
                            onClick={() => setModalOpen(false)}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                zIndex: 1,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                },
                            }}
                        >
                            <CloseIcon />
                        </IconButton>

                        {/* Navigation buttons */}
                        {images.length > 1 && (
                            <>
                                <IconButton
                                    onClick={handlePrevImage}
                                    sx={{
                                        position: 'absolute',
                                        left: 8,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        zIndex: 1,
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor:
                                                'rgba(0, 0, 0, 0.7)',
                                        },
                                    }}
                                >
                                    <ChevronLeft />
                                </IconButton>
                                <IconButton
                                    onClick={handleNextImage}
                                    sx={{
                                        position: 'absolute',
                                        right: 8,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        zIndex: 1,
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor:
                                                'rgba(0, 0, 0, 0.7)',
                                        },
                                    }}
                                >
                                    <ChevronRight />
                                </IconButton>
                            </>
                        )}

                        {/* Modal image */}
                        <ResponsiveImage
                            src={selectedImage?.src}
                            alt={selectedImage?.alt}
                            borderRadius={0}
                            priority={true}
                            objectFit="contain"
                        />

                        {/* Image caption in modal */}
                        {selectedImage?.caption && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    color: 'white',
                                    p: 2,
                                }}
                            >
                                <Typography variant="subtitle2">
                                    {selectedImage.caption}
                                </Typography>
                                <Typography variant="caption">
                                    {selectedImageIndex + 1} of {images.length}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Modal>
            )}
        </Box>
    );
};
