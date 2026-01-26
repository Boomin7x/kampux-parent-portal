import { Close as CloseIcon, Menu as MenuIcon } from '@mui/icons-material';
import {
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Navigation item interface
interface NavItem {
    label: string;
    href: string;
    isExternal?: boolean;
}

// Navigation props
interface NavigationProps {
    transparent?: boolean;
    className?: string;
}

// Navigation items configuration
const navItems: NavItem[] = [
    { label: 'About', href: '#about' },
    { label: 'Programs', href: '#programs' },
    { label: 'Faculty', href: '#faculty' },
    { label: 'Student Life', href: '#student-life' },
    { label: 'Facilities', href: '#facilities' },
    { label: 'Contact', href: '#contact' },
];

// Main Navigation component
export const Navigation: React.FC<NavigationProps> = ({
    transparent = false,
    className = '',
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect for navigation background
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle mobile drawer toggle
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // Handle navigation to portal
    const handlePortalClick = () => {
        navigate('/auth');
    };

    // Handle smooth scroll to sections
    const handleNavClick = (href: string) => {
        if (href.startsWith('#')) {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }
        setMobileOpen(false);
    };

    // Mobile drawer content
    const drawer = (
        <Box
            sx={{
                width: 320,
                height: '100%',
                background: 'rgba(26, 26, 26, 0.98)',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    p: 4,
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        sx={{
                            width: 32,
                            height: 32,
                            borderRadius: 1,
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '1rem',
                        }}
                    >
                        EA
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: 'white',
                            fontSize: '1rem',
                        }}
                    >
                        Excellence Academy
                    </Typography>
                </Box>
                <IconButton
                    onClick={handleDrawerToggle}
                    size="small"
                    sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&:hover': {
                            color: 'white',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* Navigation Items */}
            <Box sx={{ flex: 1, p: 4 }}>
                <Typography
                    sx={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#6366f1',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        mb: 4,
                    }}
                >
                    Navigation
                </Typography>
                <List sx={{ p: 0 }}>
                    {navItems.map((item, index) => (
                        <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                onClick={() => handleNavClick(item.href)}
                                sx={{
                                    px: 0,
                                    py: 2,
                                    borderRadius: 1,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        transform: 'translateX(8px)',
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color: 'rgba(255, 255, 255, 0.9)',
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                {/* Portal Button */}
                <Box sx={{ mt: 6 }}>
                    <Button
                        fullWidth
                        onClick={handlePortalClick}
                        sx={{
                            py: 2,
                            background: 'rgba(99, 102, 241, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(99, 102, 241, 0.3)',
                            borderRadius: 1,
                            color: '#6366f1',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            textTransform: 'none',
                            '&:hover': {
                                background: 'rgba(99, 102, 241, 0.2)',
                                borderColor: '#6366f1',
                                transform: 'translateY(-2px)',
                            },
                        }}
                    >
                        Access Portal
                    </Button>
                </Box>
            </Box>
        </Box>
    );

    return (
        <>
            {/* Main Navigation */}
            <Box
                component="nav"
                className={className}
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1200,
                    backgroundColor:
                        transparent && !scrolled
                            ? 'rgba(26, 26, 26, 0.02)'
                            : 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: scrolled ? 'blur(20px)' : 'blur(5px)',
                    borderBottom:
                        scrolled
                            ? '1px solid rgba(99, 102, 241, 0.08)'
                            : 'none',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                <Box
                    sx={{
                        width: '95%',
                        maxWidth: '1600px',
                        mx: 'auto',
                        px: { xs: 3, md: 6, lg: 8 },
                        display: 'flex',
                        alignItems: 'center',
                        minHeight: { xs: 70, md: 80 },
                    }}
                >
                    {/* Logo/Brand */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexGrow: 1,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                transform: 'scale(1.02)',
                            },
                        }}
                        onClick={() => handleNavClick('#hero')}
                    >
                        <Box
                            sx={{
                                width: { xs: 36, md: 42 },
                                height: { xs: 36, md: 42 },
                                borderRadius: 1,
                                background:
                                    'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: { xs: '1rem', md: '1.125rem' },
                                mr: { xs: 2, md: 3 },
                                boxShadow: '0 2px 8px rgba(99, 102, 241, 0.2)',
                            }}
                        >
                            EA
                        </Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                fontSize: { xs: '1.125rem', md: '1.25rem' },
                                color:
                                    transparent && !scrolled
                                        ? 'white'
                                        : '#1a1a1a',
                                transition: 'color 0.3s ease',
                            }}
                        >
                            Excellence Academy
                        </Typography>
                    </Box>

                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            {navItems.map((item) => (
                                <Button
                                    key={item.label}
                                    onClick={() => handleNavClick(item.href)}
                                    sx={{
                                        color:
                                            transparent && !scrolled
                                                ? 'rgba(255, 255, 255, 0.9)'
                                                : 'rgba(26, 26, 26, 0.8)',
                                        fontWeight: 500,
                                        fontSize: '0.875rem',
                                        px: 2.5,
                                        py: 1.5,
                                        borderRadius: 1,
                                        textTransform: 'none',
                                        minWidth: 'auto',
                                        position: 'relative',
                                        transition:
                                            'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            color:
                                                transparent && !scrolled
                                                    ? 'white'
                                                    : '#6366f1',
                                            backgroundColor:
                                                transparent && !scrolled
                                                    ? 'rgba(255, 255, 255, 0.1)'
                                                    : 'rgba(99, 102, 241, 0.05)',
                                            transform: 'translateY(-1px)',
                                        },
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}

                            {/* Portal Button */}
                            <Button
                                onClick={handlePortalClick}
                                sx={{
                                    ml: 3,
                                    px: 4,
                                    py: 1.5,
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    borderRadius: 1,
                                    textTransform: 'none',
                                    background:
                                        transparent && !scrolled
                                            ? 'rgba(255, 255, 255, 0.1)'
                                            : 'rgba(99, 102, 241, 0.1)',
                                    backdropFilter: 'blur(10px)',
                                    border:
                                        transparent && !scrolled
                                            ? '1px solid rgba(255, 255, 255, 0.2)'
                                            : '1px solid rgba(99, 102, 241, 0.2)',
                                    color:
                                        transparent && !scrolled
                                            ? 'white'
                                            : '#6366f1',
                                    transition:
                                        'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        background:
                                            transparent && !scrolled
                                                ? 'rgba(255, 255, 255, 0.2)'
                                                : '#6366f1',
                                        color:
                                            transparent && !scrolled
                                                ? 'white'
                                                : 'white',
                                        borderColor:
                                            transparent && !scrolled
                                                ? 'rgba(255, 255, 255, 0.4)'
                                                : '#6366f1',
                                        transform: 'translateY(-2px)',
                                        boxShadow:
                                            '0 4px 12px rgba(99, 102, 241, 0.3)',
                                    },
                                }}
                            >
                                Portal
                            </Button>
                        </Box>
                    )}

                    {/* Mobile Menu Button */}
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerToggle}
                            sx={{
                                color:
                                    transparent && !scrolled
                                        ? 'rgba(255, 255, 255, 0.9)'
                                        : '#6366f1',
                                backgroundColor:
                                    transparent && !scrolled
                                        ? 'rgba(255, 255, 255, 0.1)'
                                        : 'rgba(99, 102, 241, 0.1)',
                                backdropFilter: 'blur(10px)',
                                border:
                                    transparent && !scrolled
                                        ? '1px solid rgba(255, 255, 255, 0.2)'
                                        : '1px solid rgba(99, 102, 241, 0.2)',
                                borderRadius: 1,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    backgroundColor:
                                        transparent && !scrolled
                                            ? 'rgba(255, 255, 255, 0.2)'
                                            : 'rgba(99, 102, 241, 0.2)',
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                </Box>
            </Box>

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: 320,
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                    '& .MuiBackdrop-root': {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(8px)',
                    },
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
};
