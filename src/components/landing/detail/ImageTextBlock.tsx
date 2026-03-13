import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { useIntersectionObserver } from '../../../hooks/ui/useIntersectionObserver';

interface ImageTextBlockProps {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    imagePosition?: 'left' | 'right';
    ctaText?: string;
    ctaLink?: string;
    onCtaClick?: () => void;
    badge?: string;
    backgroundColor?: string;
    textColor?: 'light' | 'dark';
    imageAspectRatio?: string; // e.g., '16/9', '4/3', '1/1'
    className?: string;
}

export const ImageTextBlock: React.FC<ImageTextBlockProps> = ({
    title,
    description,
    image,
    imageAlt,
    imagePosition = 'right',
    ctaText,
    ctaLink,
    onCtaClick,
    badge,
    backgroundColor = 'transparent',
    textColor = 'dark',
    imageAspectRatio = '16/9',
    className = '',
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    const textColorValue = textColor === 'light' ? '#ffffff' : 'text.primary';
    const secondaryTextColor =
        textColor === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'text.secondary';

    const handleCtaClick = () => {
        if (onCtaClick) {
            onCtaClick();
        } else if (ctaLink) {
            window.open(ctaLink, '_blank');
        }
    };

    const TextContent = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
                pr: imagePosition === 'right' ? { xs: 0, md: 3 } : 0,
                pl: imagePosition === 'left' ? { xs: 0, md: 3 } : 0,
                opacity: isIntersecting ? 1 : 0,
                transform: isIntersecting
                    ? 'translateY(0)'
                    : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: '0.2s',
            }}
        >
            {badge && (
                <Typography
                    variant="overline"
                    sx={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: 1,
                        color: 'primary.main',
                        mb: 1,
                        opacity: isIntersecting ? 1 : 0,
                        transform: isIntersecting
                            ? 'translateY(0)'
                            : 'translateY(20px)',
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: '0.1s',
                    }}
                >
                    {badge}
                </Typography>
            )}

            <Typography
                variant="h3"
                component="h3"
                sx={{
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    fontWeight: 700,
                    lineHeight: 1.3,
                    color: textColorValue,
                    mb: 2,
                    opacity: isIntersecting ? 1 : 0,
                    transform: isIntersecting
                        ? 'translateY(0)'
                        : 'translateY(30px)',
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDelay: '0.3s',
                }}
            >
                {title}
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    color: secondaryTextColor,
                    mb: ctaText ? 3 : 0,
                    opacity: isIntersecting ? 1 : 0,
                    transform: isIntersecting
                        ? 'translateY(0)'
                        : 'translateY(20px)',
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDelay: '0.4s',
                }}
            >
                {description}
            </Typography>

            {ctaText && (
                <Box
                    sx={{
                        opacity: isIntersecting ? 1 : 0,
                        transform: isIntersecting
                            ? 'translateY(0)'
                            : 'translateY(20px)',
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: '0.5s',
                    }}
                >
                    <Button
                        variant="contained"
                        endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                        onClick={handleCtaClick}
                        sx={{
                            backgroundColor: 'primary.main',
                            color: '#ffffff',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            textTransform: 'none',
                            py: 1,
                            px: 3,
                            borderRadius: 1,
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                                transform: 'translateY(-1px)',
                            },
                        }}
                    >
                        {ctaText}
                    </Button>
                </Box>
            )}
        </Box>
    );

    const ImageContent = (
        <Box
            sx={{
                position: 'relative',
                aspectRatio: imageAspectRatio,
                borderRadius: 1,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                opacity: isIntersecting ? 1 : 0,
                transform: isIntersecting
                    ? 'translateY(0)'
                    : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: '0.1s',
                '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.3s ease-in-out',
                },
            }}
        >
            <Box
                component="img"
                src={image}
                alt={imageAlt}
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                }}
            />
        </Box>
    );

    return (
        <Box
            ref={targetRef}
            className={className}
            sx={{
                backgroundColor,
                py: { xs: 4, md: 6 },
            }}
        >
            <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center">
                {imagePosition === 'left' ? (
                    <>
                        <Grid size={{ xs: 12, md: 6 }}>{ImageContent}</Grid>
                        <Grid size={{ xs: 12, md: 6 }}>{TextContent}</Grid>
                    </>
                ) : (
                    <>
                        <Grid
                            size={{ xs: 12, md: 6 }}
                            sx={{ order: { xs: 2, md: 1 } }}
                        >
                            {TextContent}
                        </Grid>
                        <Grid
                            size={{ xs: 12, md: 6 }}
                            sx={{ order: { xs: 1, md: 2 } }}
                        >
                            {ImageContent}
                        </Grid>
                    </>
                )}
            </Grid>
        </Box>
    );
};
