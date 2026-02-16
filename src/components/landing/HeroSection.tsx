import { Box, Button, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    heroSectionContent,
    type IHeroSectionContent,
} from '../../content/landing/heroSection';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';
import useGetHeroInformation from '../../pages/Landing/_hooks/useGetHeroInformation';
import type { HeroApiResponse } from '../../pages/Landing/_models/HeroSection';

// API Response Interface

// Hero Section props
interface HeroSectionProps {
    className?: string;
}

const transformApiToHeroContent = (
    apiData: HeroApiResponse[]
): IHeroSectionContent => {
    if (!apiData || apiData.length === 0) return heroSectionContent;

    const data = apiData[0]; // Get first item

    return {
        overline: data.overline,
        title: {
            primary: data.title_primary,
            secondary: data.title_secondary,
        },
        subtitle: data.subtitle,
        buttons: {
            primary: {
                text: data.buttons_primary_text,
                action: data.buttons_primary_action,
            },
            secondary: {
                text: data.buttons_secondary_text,
                action: data.buttons_secondary_action,
            },
        },
        stats: [
            { number: data.stats_number_0, label: data.stats_label_0 },
            { number: data.stats_number_1, label: data.stats_label_1 },
            { number: data.stats_number_2, label: data.stats_label_2 },
            { number: data.stats_number_3, label: data.stats_label_3 },
        ],

        backgroundImage: heroSectionContent.backgroundImage,
        scrollIndicator: {
            text: data.scrollIndicator_text,
            targetSection: data.scrollIndicator_targetSection,
        },
    };
};

// Main Hero Section component
export const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {
    const navigate = useNavigate();

    const { data, isLoading } = useGetHeroInformation();

    // Transform API data to heroSectionContent format
    const dynamicContent = useMemo(() => {
        if (isLoading || !data) {
            return heroSectionContent; // Fallback to static content while loading
        }
        return transformApiToHeroContent(data);
    }, [data, isLoading]);

    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    const handleParentPortalClick = () => {
        navigate('/auth');
    };

    const handleSecondaryButtonClick = () => {
        const action = dynamicContent.buttons.secondary.action;

        if (action === 'scroll-to-about' || action.startsWith('scroll-to-')) {
            const targetId = action.replace('scroll-to-', '');
            const targetSection = document.querySelector(`#${targetId}`);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        } else if (action.startsWith('/')) {
            navigate(action);
        } else {
            console.log('Secondary button action:', action);
        }
    };

    const handleScrollIndicatorClick = () => {
        const targetSection = document.querySelector(
            `#${dynamicContent.scrollIndicator.targetSection}`
        );
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    return (
        <Box
            id="hero"
            component="section"
            className={className}
            ref={targetRef}
            sx={{
                position: 'relative',
                height: '100vh',
                minHeight: '800px',
                overflow: 'hidden',
                backgroundImage: `url("${dynamicContent.backgroundImage}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                        'linear-gradient(to right, rgba(0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0.4) 70%, transparent 100%)',
                    zIndex: 1,
                },
            }}
        >
            {/* Main Content Container */}
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    height: '100%',
                    width: '95%',
                    maxWidth: '1600px',
                    mx: 'auto',
                    px: { xs: 3, md: 6, lg: 8 },
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {/* Left Content - Hero Text */}
                <Box
                    sx={{
                        maxWidth: { xs: '100%', lg: '50%' },
                        color: 'white',
                        opacity: isIntersecting ? 1 : 0,
                        transform: isIntersecting
                            ? 'translateY(0)'
                            : 'translateY(50px)',
                        transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: '0.3s',
                    }}
                >
                    {/* Overline */}
                    <Typography
                        variant="overline"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: { xs: '0.8rem', md: '0.9rem' },
                            fontWeight: 500,
                            letterSpacing: '0.2em',
                            mb: { xs: 3, md: 4 },
                            display: 'block',
                            textTransform: 'uppercase',
                        }}
                    >
                        {dynamicContent.overline}
                    </Typography>

                    {/* Main Headline - Ultra Large */}
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: {
                                xs: '3.5rem',
                                sm: '4.5rem',
                                md: '6rem',
                                lg: '7rem',
                                xl: '8rem',
                            },
                            fontWeight: 700,
                            lineHeight: { xs: 0.9, md: 0.85 },
                            letterSpacing: '-0.04em',
                            mb: { xs: 4, md: 6 },
                            textShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                        }}
                    >
                        {dynamicContent.title.primary}
                        <br />
                        <Box
                            component="span"
                            sx={{
                                background:
                                    'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 300,
                            }}
                        >
                            {dynamicContent.title.secondary}
                        </Box>
                    </Typography>

                    {/* Subtitle */}
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: {
                                xs: '1.25rem',
                                md: '1.75rem',
                                lg: '2rem',
                            },
                            fontWeight: 400,
                            lineHeight: 1.3,
                            color: 'rgba(255, 255, 255, 0.9)',
                            mb: { xs: 6, md: 8 },
                            maxWidth: { xs: '100%', lg: '85%' },
                            opacity: isIntersecting ? 1 : 0,
                            transform: isIntersecting
                                ? 'translateY(0)'
                                : 'translateY(30px)',
                            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: '0.6s',
                        }}
                    >
                        {dynamicContent.subtitle}
                    </Typography>

                    {/* CTA Buttons */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: { xs: 3, sm: 4 },
                            mb: { xs: 8, md: 10 },
                            opacity: isIntersecting ? 1 : 0,
                            transform: isIntersecting
                                ? 'translateY(0)'
                                : 'translateY(30px)',
                            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: '0.9s',
                        }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleParentPortalClick}
                            sx={{
                                px: { xs: 5, md: 8 },
                                py: { xs: 2.5, md: 3 },
                                fontSize: { xs: '1.1rem', md: '1.2rem' },
                                fontWeight: 600,
                                borderRadius: 2,
                                background: 'rgba(255, 255, 255, 0.95)',
                                color: '#1a1a1a',
                                backdropFilter: 'blur(10px)',
                                border: 'none',
                                textTransform: 'none',
                                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
                                transition:
                                    'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 1)',
                                    transform: 'translateY(-3px)',
                                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                                },
                            }}
                        >
                            {dynamicContent.buttons.primary.text}
                        </Button>

                        <Button
                            variant="outlined"
                            size="large"
                            onClick={handleSecondaryButtonClick}
                            sx={{
                                px: { xs: 5, md: 8 },
                                py: { xs: 2.5, md: 3 },
                                fontSize: { xs: '1.1rem', md: '1.2rem' },
                                fontWeight: 500,
                                borderRadius: 2,
                                color: 'white',
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                                backdropFilter: 'blur(10px)',
                                textTransform: 'none',
                                transition:
                                    'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    borderColor: 'rgba(255, 255, 255, 0.6)',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    transform: 'translateY(-3px)',
                                },
                            }}
                        >
                            {dynamicContent.buttons.secondary.text}
                        </Button>
                    </Box>

                    {/* Minimal Stats Under Buttons */}
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'grid' },
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: { md: 4, lg: 6 },
                            maxWidth: '400px',
                            opacity: isIntersecting ? 1 : 0,
                            transform: isIntersecting
                                ? 'translateY(0)'
                                : 'translateY(30px)',
                            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: '1.2s',
                        }}
                    >
                        {dynamicContent.stats.map((stat, index) => (
                            <Box
                                key={stat.label}
                                sx={{
                                    opacity: isIntersecting ? 1 : 0,
                                    transform: isIntersecting
                                        ? 'scale(1)'
                                        : 'scale(0.8)',
                                    transition:
                                        'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: `${1.4 + index * 0.1}s`,
                                }}
                            >
                                {/* Compact Number Display */}
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: 'white',
                                        fontWeight: 700,
                                        fontSize: {
                                            md: '1.8rem',
                                            lg: '2.2rem',
                                        },
                                        lineHeight: 1,
                                        mb: 0.5,
                                        textShadow:
                                            '0 2px 15px rgba(0, 0, 0, 0.3)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.1)',
                                            textShadow:
                                                '0 4px 25px rgba(0, 0, 0, 0.4)',
                                        },
                                    }}
                                >
                                    {stat.number}
                                </Typography>

                                {/* Compact Label */}
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.75)',
                                        fontSize: '0.75rem',
                                        fontWeight: 500,
                                        letterSpacing: '0.03em',
                                        textTransform: 'uppercase',
                                        lineHeight: 1.2,
                                        textShadow:
                                            '0 1px 8px rgba(0, 0, 0, 0.2)',
                                        display: 'block',
                                    }}
                                >
                                    {stat.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* Elegant Scroll Indicator */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 50,
                    left: '5%',
                    zIndex: 10,
                    color: 'white',
                    cursor: 'pointer',
                    opacity: isIntersecting ? 1 : 0,
                    transition: 'opacity 1.5s ease-in-out',
                    transitionDelay: '2s',
                }}
                onClick={handleScrollIndicatorClick}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                        '&:hover': {
                            '& .scroll-line': {
                                width: 60,
                            },
                        },
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                        }}
                    >
                        {dynamicContent.scrollIndicator.text}
                    </Typography>
                    <Box
                        className="scroll-line"
                        sx={{
                            width: 40,
                            height: 1,
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            transition: 'width 0.3s ease',
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};
