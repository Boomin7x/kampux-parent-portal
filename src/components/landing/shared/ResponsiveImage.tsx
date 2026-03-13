import React, { useState, useCallback } from 'react';
import { Box, Skeleton } from '@mui/material';
import { useIntersectionObserver } from '../../../hooks/ui/useIntersectionObserver';

/**
 * Interface for responsive image component props
 * Provides type safety for image sources, alt text, and styling
 */
interface ResponsiveImageProps {
    /** Primary image source */
    src: string;
    /** Alternative image sources for different screen sizes */
    srcSet?: {
        /** Small screen (mobile) image */
        small?: string;
        /** Medium screen (tablet) image */
        medium?: string;
        /** Large screen (desktop) image */
        large?: string;
    };
    /** Alternative text for accessibility */
    alt: string;
    /** CSS class name for additional styling */
    className?: string;
    /** Whether to enable lazy loading (default: true) */
    lazy?: boolean;
    /** Aspect ratio for the image container */
    aspectRatio?: number;
    /** Border radius for the image */
    borderRadius?: number | string;
    /** Object fit property for image */
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    /** Object position for image */
    objectPosition?: string;
    /** Priority loading for above-the-fold images */
    priority?: boolean;
    /** Callback for successful image load */
    onLoad?: () => void;
    /** Callback for image load error */
    onError?: () => void;
}

/**
 * ResponsiveImage component with lazy loading and responsive design
 *
 * Features:
 * - Lazy loading with intersection observer
 * - Responsive image sources for different screen sizes
 * - Loading skeleton with proper aspect ratio
 * - Error handling with fallback
 * - Performance optimization with proper loading strategies
 * - Accessibility compliance with alt text
 *
 * @example
 * ```tsx
 * <ResponsiveImage
 *   src="/images/hero-banner.jpg"
 *   srcSet={{
 *     small: "/images/hero-banner-mobile.jpg",
 *     medium: "/images/hero-banner-tablet.jpg",
 *     large: "/images/hero-banner-desktop.jpg"
 *   }}
 *   alt="School campus hero banner"
 *   aspectRatio={16/9}
 *   borderRadius={2}
 *   objectFit="cover"
 * />
 * ```
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
    src,
    srcSet,
    alt,
    className = '',
    lazy = true,
    aspectRatio,
    borderRadius = 1,
    objectFit = 'cover',
    objectPosition = 'center',
    priority = false,
    onLoad,
    onError,
}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Use intersection observer for lazy loading
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    // Determine if image should load based on lazy loading and intersection
    const shouldLoad = !lazy || priority || isIntersecting;

    // Handle successful image load
    const handleLoad = useCallback(() => {
        setImageLoaded(true);
        onLoad?.();
    }, [onLoad]);

    // Handle image load error
    const handleError = useCallback(() => {
        setImageError(true);
        onError?.();
    }, [onError]);

    // Generate srcset string for responsive images
    const generateSrcSet = useCallback(() => {
        if (!srcSet) return undefined;

        const sources = [];
        if (srcSet.small) sources.push(`${srcSet.small} 640w`);
        if (srcSet.medium) sources.push(`${srcSet.medium} 1024w`);
        if (srcSet.large) sources.push(`${srcSet.large} 1920w`);

        return sources.length > 0 ? sources.join(', ') : undefined;
    }, [srcSet]);

    // Generate sizes attribute for responsive images
    const sizes = srcSet
        ? '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px'
        : undefined;

    return (
        <Box
            ref={targetRef}
            className={className}
            sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: aspectRatio,
                borderRadius,
                overflow: 'hidden',
                backgroundColor: 'grey.100',
            }}
        >
            {/* Loading skeleton */}
            {!imageLoaded && !imageError && (
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    animation="wave"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        borderRadius,
                    }}
                />
            )}

            {/* Error fallback */}
            {imageError && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'grey.200',
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                    }}
                >
                    Image unavailable
                </Box>
            )}

            {/* Main image */}
            {shouldLoad && !imageError && (
                <Box
                    component="img"
                    src={src}
                    srcSet={generateSrcSet()}
                    sizes={sizes}
                    alt={alt}
                    loading={priority ? 'eager' : 'lazy'}
                    onLoad={handleLoad}
                    onError={handleError}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit,
                        objectPosition,
                        opacity: imageLoaded ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out',
                        display: 'block',
                    }}
                />
            )}
        </Box>
    );
};
