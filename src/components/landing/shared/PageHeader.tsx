import React from 'react';
import { Box, Container, Typography, Breadcrumbs, Link } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { ResponsiveImage } from './ResponsiveImage';
import { useIntersectionObserver } from '../../../hooks/ui/useIntersectionObserver';

/**
 * Interface for breadcrumb navigation items
 */
interface BreadcrumbItem {
    /** Display label for the breadcrumb */
    label: string;
    /** URL path for navigation */
    href?: string;
    /** Whether this is the current page (no link) */
    current?: boolean;
}

/**
 * Interface for PageHeader component props
 */
interface PageHeaderProps {
    /** Main page title */
    title: string;
    /** Optional subtitle or description */
    subtitle?: string;
    /** Background image for the header */
    backgroundImage?: string;
    /** Background image sources for responsive design */
    backgroundImageSrcSet?: {
        small?: string;
        medium?: string;
        large?: string;
    };
    /** Custom breadcrumb items (auto-generated if not provided) */
    breadcrumbs?: BreadcrumbItem[];
    /** Minimum height for the header section */
    minHeight?: string | number;
    /** Text color for the header content */
    textColor?: 'light' | 'dark';
    /** Whether to show an overlay for better text readability */
    showOverlay?: boolean;
    /** CSS class name for additional styling */
    className?: string;
}

/**
 * PageHeader component for detail pages
 *
 * Features:
 * - Responsive background images with overlay options
 * - Automatic breadcrumb generation based on route
 * - Customizable typography and layout
 * - Smooth animations with intersection observer
 * - Accessibility compliance with proper heading structure
 * - Mobile-optimized design with responsive text sizing
 *
 * @example
 * ```tsx
 * <PageHeader
 *   title="About Excellence Academy"
 *   subtitle="Discover our mission, values, and commitment to educational excellence"
 *   backgroundImage="/images/campus-hero.jpg"
 *   backgroundImageSrcSet={{
 *     small: "/images/campus-hero-mobile.jpg",
 *     medium: "/images/campus-hero-tablet.jpg",
 *     large: "/images/campus-hero-desktop.jpg"
 *   }}
 *   textColor="light"
 *   showOverlay={true}
 *   minHeight="400px"
 * />
 * ```
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    subtitle,
    backgroundImage,
    backgroundImageSrcSet,
    breadcrumbs: customBreadcrumbs,
    minHeight = '300px',
    textColor = 'dark',
    showOverlay = false,
    className = '',
}) => {
    const location = useLocation();

    // Intersection observer for smooth animations
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    // Generate breadcrumbs automatically if not provided
    const generateBreadcrumbs = (): BreadcrumbItem[] => {
        if (customBreadcrumbs) return customBreadcrumbs;

        const pathSegments = location.pathname.split('/').filter(Boolean);
        const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];

        // Add current page based on path
        if (pathSegments.length > 0) {
            const currentPage = pathSegments[pathSegments.length - 1];
            const formattedLabel = currentPage
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            breadcrumbs.push({ label: formattedLabel, current: true });
        }

        return breadcrumbs;
    };

    const breadcrumbs = generateBreadcrumbs();

    return (
        <Box
            ref={targetRef}
            className={className}
            component="section"
            sx={{
                position: 'relative',
                minHeight,
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                backgroundColor: backgroundImage ? 'transparent' : 'grey.50',
                color: textColor === 'light' ? 'white' : 'text.primary',
            }}
        >
            {/* Background Image */}
            {backgroundImage && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 1,
                    }}
                >
                    <ResponsiveImage
                        src={backgroundImage}
                        srcSet={backgroundImageSrcSet}
                        alt={`${title} background`}
                        priority={true}
                        objectFit="cover"
                        borderRadius={0}
                    />
                </Box>
            )}

            {/* Overlay for better text readability */}
            {showOverlay && backgroundImage && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 2,
                    }}
                />
            )}

            {/* Content */}
            <Container
                maxWidth="lg"
                sx={{
                    position: 'relative',
                    zIndex: 3,
                    py: { xs: 6, md: 8 },
                }}
            >
                <Box
                    sx={{
                        maxWidth: '800px',
                        opacity: isIntersecting ? 1 : 0,
                        transform: isIntersecting
                            ? 'translateY(0)'
                            : 'translateY(30px)',
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    {/* Breadcrumbs */}
                    <Breadcrumbs
                        separator={<NavigateNext fontSize="small" />}
                        sx={{
                            mb: 2,
                            '& .MuiBreadcrumbs-ol': {
                                flexWrap: 'nowrap',
                            },
                            '& .MuiBreadcrumbs-separator': {
                                color:
                                    textColor === 'light'
                                        ? 'rgba(255, 255, 255, 0.7)'
                                        : 'text.secondary',
                            },
                        }}
                    >
                        {breadcrumbs.map((item, index) => (
                            <Box key={index}>
                                {item.current || !item.href ? (
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color:
                                                textColor === 'light'
                                                    ? 'rgba(255, 255, 255, 0.9)'
                                                    : 'text.primary',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {item.label}
                                    </Typography>
                                ) : (
                                    <Link
                                        component={RouterLink}
                                        to={item.href}
                                        variant="caption"
                                        sx={{
                                            color:
                                                textColor === 'light'
                                                    ? 'rgba(255, 255, 255, 0.7)'
                                                    : 'text.secondary',
                                            textDecoration: 'none',
                                            '&:hover': {
                                                color:
                                                    textColor === 'light'
                                                        ? 'white'
                                                        : 'primary.main',
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </Box>
                        ))}
                    </Breadcrumbs>

                    {/* Title */}
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '2rem', md: '3rem' },
                            fontWeight: 700,
                            lineHeight: 1.1,
                            mb: subtitle ? 2 : 0,
                            background:
                                textColor === 'dark' && !backgroundImage
                                    ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                                    : undefined,
                            backgroundClip:
                                textColor === 'dark' && !backgroundImage
                                    ? 'text'
                                    : undefined,
                            WebkitBackgroundClip:
                                textColor === 'dark' && !backgroundImage
                                    ? 'text'
                                    : undefined,
                            WebkitTextFillColor:
                                textColor === 'dark' && !backgroundImage
                                    ? 'transparent'
                                    : undefined,
                        }}
                    >
                        {title}
                    </Typography>

                    {/* Subtitle */}
                    {subtitle && (
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontSize: { xs: '1rem', md: '1.25rem' },
                                fontWeight: 400,
                                color:
                                    textColor === 'light'
                                        ? 'rgba(255, 255, 255, 0.9)'
                                        : 'text.secondary',
                                maxWidth: '600px',
                                lineHeight: 1.5,
                            }}
                        >
                            {subtitle}
                        </Typography>
                    )}
                </Box>
            </Container>
        </Box>
    );
};
