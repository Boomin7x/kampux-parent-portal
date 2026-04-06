import { Icon } from '@iconify/react';
import { alpha, Box, Button, Container, Grid, Typography } from '@mui/material';
import React, { useMemo, type FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const threeCardsNav = [
    {
        name: 'Programmes',
        icon: 'material-symbols-light:menu-book-outline-rounded',
        link: '/academics',
        img: '/pexels-boomheadshot-31785121.jpg',
    },
    {
        name: 'A propos',
        icon: null,
        link: '/about',
        img: '/pexels-katerina-holmes-5905554.jpg',
    },
    {
        name: 'Admission',
        icon: 'game-icons:graduate-cap',
        link: '/admission',
        img: '/pexels-mickael-ange-konan-2156070331-34526425.jpg',
    },
];
const NavCards: FC<{ items: IThreeCardNav; index?: number }> = ({
    items,
    index = 0,
}) => {
    const isEven = index % 2 === 0;

    return (
        <Box
            component={Link}
            to={items?.link}
            sx={{
                textDecoration: 'none',
                height: '100%',
                minHeight: { xs: '100px', md: '120px' }, // Ensures cards are uniform height
                display: 'flex',
                flexDirection: 'row', // Keep horizontal to look like a navigation bar
                alignItems: 'center',
                justifyContent: items?.icon ? 'flex-start' : 'center', // Center text if no icon
                px: 3,
                position: 'relative',
                borderRadius: { xs: '0px', md: '8px' }, // Modern rounded look
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                overflow: 'hidden',
                '&:before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: theme =>
                        isEven
                            ? `linear-gradient(135deg, ${alpha(theme.palette.secondary.dark, 1)}, ${alpha(theme.palette.secondary.light, 0.4)})`
                            : `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 1)}, ${alpha(theme.palette.primary.light, 0.8)})`,
                },
                backgroundImage: `url(${items?.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
                    '& .card-icon': { transform: 'scale(1.1) rotate(-5deg)' },
                    '& .inner-border': { opacity: 1, inset: '4px' },
                },
            }}
        >
            {/* Animated Inner Border */}
            <Box
                className="inner-border"
                sx={{
                    display: { xs: 'none', md: 'inline-block' },
                    position: 'absolute',
                    inset: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '8px',
                    pointerEvents: 'none',
                    transition: 'all 0.3s ease',
                    opacity: 0.5,
                }}
            />

            {items?.icon && (
                <Box
                    className="card-icon"
                    component={Icon}
                    icon={items?.icon}
                    sx={{
                        position: 'relative',
                        fontSize: { xs: '2.5rem', md: '3rem' },
                        mr: 2,
                        transition: 'all 0.3s ease',
                        color: theme =>
                            isEven
                                ? theme.palette.secondary.contrastText
                                : theme.palette.primary.contrastText,
                    }}
                />
            )}

            <Typography
                variant="h6"
                sx={{
                    position: 'relative',
                    fontWeight: 800,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase', // More "Nav-like"
                    fontSize: { xs: '0.9rem', md: '1.1rem' },
                    color: theme =>
                        isEven
                            ? theme.palette.secondary.contrastText
                            : theme.palette.primary.contrastText,
                }}
            >
                {items?.name}
            </Typography>
        </Box>
    );
};

type IThreeCardNav = (typeof threeCardsNav)[0];

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

    const handlePrimaryClick = () => {
        navigate('/about');
    };

    const handleSecondaryClick = () => {
        navigate('/auth');
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
                height: '80vh',
                minHeight: '650px',
                // overflow: 'hidden',
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
            <Box
                sx={{
                    position: 'absolute',
                    // Instead of a fixed height, use minHeight to allow growth on mobile
                    minHeight: { xs: 'auto', md: '8rem' },
                    bottom: 0,
                    right: 0,
                    left: 0,
                    transform: 'translateY(50%)',
                    zIndex: 3,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Container maxWidth="xl">
                    <Grid container spacing={{ xs: 0, md: 3 }}>
                        {' '}
                        {/* Increased spacing for a breathable look */}
                        {threeCardsNav.map((items, idx) => (
                            <Grid key={items?.link} size={{ xs: 12, md: 4 }}>
                                <NavCards items={items} index={idx} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
            {/* Main Content Container */}
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    height: '100%',
                    width: '100%',
                    maxWidth: '1200px',
                    mx: 'auto',
                    px: { xs: 2, md: 3 },
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
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            letterSpacing: '0.15em',
                            mb: 2,
                            display: 'block',
                            textTransform: 'uppercase',
                        }}
                    >
                        {dynamicContent.overline}
                    </Typography>

                    {/* Main Headline - Reduced Typography */}
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: {
                                xs: '2rem',
                                sm: '2.5rem',
                                md: '3rem',
                                lg: '3.5rem',
                                xl: '4rem',
                            },
                            fontWeight: 700,
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em',
                            mb: { xs: 2, md: 3 },
                            textShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
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

                    {/* Subtitle - Reduced Typography */}
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: {
                                xs: '1rem',
                                md: '1.125rem',
                            },
                            fontWeight: 400,
                            lineHeight: 1.5,
                            color: 'rgba(255, 255, 255, 0.9)',
                            mb: { xs: 4, md: 5 },
                            maxWidth: { xs: '100%', lg: '90%' },
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

                    {/* CTA Buttons - Compact Design */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: 2,
                            mb: { xs: 5, md: 6 },
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
                            size="medium"
                            onClick={handlePrimaryClick}
                            sx={{
                                px: 3,
                                py: 1.5,
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                borderRadius: 1,
                                background: 'rgba(255, 255, 255, 0.95)',
                                color: '#1a1a1a',
                                backdropFilter: 'blur(10px)',
                                border: 'none',
                                textTransform: 'none',
                                transition:
                                    'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 1)',
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            Explore Excellence
                        </Button>

                        <Button
                            variant="outlined"
                            size="medium"
                            onClick={handleSecondaryClick}
                            sx={{
                                px: 3,
                                py: 1.5,
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                borderRadius: 1,
                                color: 'white',
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                                backdropFilter: 'blur(10px)',
                                textTransform: 'none',
                                transition:
                                    'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    borderColor: 'rgba(255, 255, 255, 0.6)',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            Parent Portal
                        </Button>
                    </Box>

                    {/* Compact Stats Under Buttons */}
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'grid' },
                            gridTemplateColumns: 'repeat(4, auto)',
                            gap: 3,
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
                                    variant="h5"
                                    sx={{
                                        color: 'white',
                                        fontWeight: 700,
                                        fontSize: '1.5rem',
                                        lineHeight: 1,
                                        mb: 0.5,
                                        textShadow:
                                            '0 2px 12px rgba(0, 0, 0, 0.3)',
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
                                            '0 1px 6px rgba(0, 0, 0, 0.2)',
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
                    display: { xs: 'none', md: 'inline-block' },
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
