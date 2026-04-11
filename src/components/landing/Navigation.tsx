/* eslint-disable react-hooks/set-state-in-effect */
import React, { useCallback, useEffect, useState } from 'react';
import {
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Close as CloseIcon, Menu as MenuIcon } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { navigationContent } from '../../content/landing/navigationContent';
import { useIsAuthenticated } from '../../pages/Auth/_hooks/useAuth';
import { ROUTES } from '../../routes/routes';
import { LanguageSelector } from '../common/LanguageSelector';
import AuthenticatedUserDisplay from './AuthenticatedUserDisplay';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';

// Import logo from public directory
const logo = '/logo.jpg';

// Navigation item interface
interface NavItem {
    label: string;
    href: string;
    isExternal?: boolean;
}

// Navigation props interface
interface NavigationProps {
    transparent?: boolean;
    className?: string;
}

// Mobile list item props interface
interface MobileListItemProps {
    item: NavItem;
    isActive: boolean;
    onClick: () => void;
    index: number;
}

// Using navigation content from external source
const navItems: NavItem[] = navigationContent.navItems;

// Mobile List Item Component
const MobileListItem: React.FC<MobileListItemProps> = ({
    item,
    isActive,
    onClick,
}) => {
    return (
        <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
                onClick={onClick}
                sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 1,
                    backgroundColor: 'transparent',
                    transition: 'background-color 0.2s ease',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                }}
            >
                <Typography
                    sx={{
                        fontSize: '0.9375rem',
                        fontWeight: isActive ? 500 : 400,
                        color: isActive
                            ? '#15803d'
                            : 'rgba(255, 255, 255, 0.9)',
                        transition: 'color 0.2s ease',
                    }}
                >
                    {item.label}
                </Typography>
            </ListItemButton>
        </ListItem>
    );
};

// Main Navigation component
export const Navigation: React.FC<NavigationProps> = ({
    transparent = false,
    className = '',
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = useIsAuthenticated();
    const { isIntersecting: isScrolled, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        rootMargin: '-100px',
    });

    const [mobileOpen, setMobileOpen] = useState(false);
    const scrolled = !isScrolled;

    // Memoized handlers for better performance
    const handleDrawerToggle = useCallback(() => {
        setMobileOpen(prev => !prev);
    }, []);

    const handlePortalClick = useCallback(() => {
        navigate(ROUTES.AUTH);
        setMobileOpen(false);
    }, [navigate]);

    const handleNavClick = useCallback(
        (href: string) => {
            navigate(href);
            setMobileOpen(false);
        },
        [navigate]
    );

    const handleHomeClick = useCallback(() => {
        navigate(ROUTES.HOME);
    }, [navigate]);

    // Check if route is active
    const isActiveRoute = useCallback(
        (href: string): boolean => {
            return location.pathname === href;
        },
        [location.pathname]
    );

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    // Prevent scroll when mobile menu is open
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;

        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [mobileOpen]);

    // Mobile drawer content
    const drawer = (
        <Box
            sx={{
                width: navigationContent.mobileNav.drawerWidth,
                height: '100%',
                backgroundColor: 'rgba(17, 17, 17, 0.95)',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    p: 3,
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: 72,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        component="img"
                        src={logo}
                        alt="Les Kaniles Logo"
                        sx={{
                            width: 32,
                            height: 32,
                            borderRadius: 1,
                        }}
                    />
                    <Box>
                        <Typography
                            variant="h6"
                            id="mobile-navigation-title"
                            sx={{
                                fontWeight: 600,
                                color: 'white',
                                fontSize: '1rem',
                                lineHeight: 1.2,
                            }}
                        >
                            {navigationContent.brand.name}
                        </Typography>
                    </Box>
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
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>

            {/* Navigation Items */}
            <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
                <List
                    sx={{ p: 0, mt: 2 }}
                    role="menu"
                    aria-label="Navigation links"
                >
                    {navItems.map((item, i) => {
                        const isActive = isActiveRoute(item.href);
                        return (
                            <MobileListItem
                                index={i}
                                key={item.label}
                                item={item}
                                isActive={isActive}
                                onClick={() => handleNavClick(item.href)}
                            />
                        );
                    })}
                </List>

                {/* Language Selector */}
                <Box sx={{ mt: 4 }}>
                    <Typography
                        sx={{
                            fontSize: '0.8125rem',
                            fontWeight: 500,
                            color: 'rgba(255, 255, 255, 0.6)',
                            mb: 2,
                            px: 3,
                        }}
                    >
                        Language
                    </Typography>
                    <Box sx={{ px: 3 }}>
                        <LanguageSelector />
                    </Box>
                </Box>

                {/* Authentication Display */}
                <Box sx={{ mt: 6, px: 3 }}>
                    {isAuthenticated ? (
                        <AuthenticatedUserDisplay
                            transparent={false}
                            scrolled={true}
                        />
                    ) : (
                        <Button
                            fullWidth
                            onClick={handlePortalClick}
                            sx={{
                                py: 2,
                                backgroundColor: '#15803d',
                                color: 'white',
                                fontWeight: 500,
                                fontSize: '0.875rem',
                                textTransform: 'none',
                                borderRadius: 1,
                                transition: 'background-color 0.2s ease',
                                '&:hover': {
                                    backgroundColor: '#166534',
                                },
                            }}
                        >
                            {navigationContent.auth.portalButtonTextMobile}
                        </Button>
                    )}
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
                ref={targetRef}
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1200,
                    backgroundColor:
                        transparent && !scrolled
                            ? 'rgba(255, 255, 255, 0.02)'
                            : 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(16px)',
                    borderBottom: scrolled
                        ? '1px solid rgba(0, 0, 0, 0.08)'
                        : transparent
                          ? 'none'
                          : '1px solid rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.3s ease',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '1200px',
                        mx: 'auto',
                        px: { xs: 3, sm: 4, md: 6 },
                        display: 'flex',
                        alignItems: 'center',
                        minHeight: 64,
                        gap: 2,
                    }}
                >
                    {/* Logo/Brand */}
                    <Box
                        component="button"
                        role="button"
                        aria-label="Go to homepage"
                        tabIndex={0}
                        onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleHomeClick();
                            }
                        }}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexGrow: 1,
                            cursor: 'pointer',
                            transition: 'opacity 0.2s ease',
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            '&:hover': {
                                opacity: 0.8,
                            },
                            '&:focus-visible': {
                                outline: '2px solid #15803d',
                                outlineOffset: '2px',
                                borderRadius: 1,
                            },
                        }}
                        onClick={handleHomeClick}
                    >
                        <Box
                            component="img"
                            src={logo}
                            alt="Les Kaniles Logo"
                            sx={{
                                width: 36,
                                height: 36,
                                borderRadius: 1,
                                mr: 2.5,
                            }}
                        />
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '1.125rem',
                                    color:
                                        transparent && !scrolled
                                            ? 'white'
                                            : '#171717',
                                    transition: 'color 0.3s ease',
                                    lineHeight: 1.2,
                                }}
                            >
                                {navigationContent.brand.name}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    display: {
                                        xs: 'none',
                                        lg: 'block',
                                    },
                                    color:
                                        transparent && !scrolled
                                            ? 'rgba(255, 255, 255, 0.7)'
                                            : 'rgba(23, 23, 23, 0.6)',
                                    fontSize: '0.75rem',
                                    fontWeight: 400,
                                    transition: 'color 0.3s ease',
                                }}
                            >
                                École de Référence
                            </Typography>
                        </Box>
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
                            {navItems.map(item => {
                                const isActive = isActiveRoute(item.href);
                                return (
                                    <Button
                                        key={item.label}
                                        onClick={() =>
                                            handleNavClick(item.href)
                                        }
                                        aria-current={
                                            isActive ? 'page' : undefined
                                        }
                                        role="menuitem"
                                        sx={{
                                            color: isActive
                                                ? '#15803d'
                                                : transparent && !scrolled
                                                  ? 'rgba(255, 255, 255, 0.9)'
                                                  : 'rgba(23, 23, 23, 0.7)',
                                            fontWeight: isActive ? 500 : 400,
                                            fontSize: '0.875rem',
                                            px: 2,
                                            py: 1.5,
                                            borderRadius: 1,
                                            textTransform: 'none',
                                            minWidth: 'auto',
                                            position: 'relative',
                                            transition: 'color 0.2s ease',
                                            '&:hover': {
                                                color:
                                                    transparent && !scrolled
                                                        ? 'white'
                                                        : '#15803d',
                                                backgroundColor: 'transparent',
                                            },
                                            '&:focus-visible': {
                                                outline: '2px solid #15803d',
                                                outlineOffset: '2px',
                                            },
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                );
                            })}

                            {/* Language Selector */}
                            <Box
                                sx={{
                                    ml: 3,
                                    display: {
                                        xs: 'none',
                                        sm: 'block',
                                    },
                                }}
                            >
                                <LanguageSelector />
                            </Box>

                            {/* Authentication Display */}
                            <Box sx={{ ml: 2 }}>
                                {isAuthenticated ? (
                                    <AuthenticatedUserDisplay
                                        transparent={transparent}
                                        scrolled={scrolled}
                                    />
                                ) : (
                                    <Button
                                        onClick={handlePortalClick}
                                        sx={{
                                            px: 3,
                                            py: 1.5,
                                            fontWeight: 500,
                                            fontSize: '0.875rem',
                                            borderRadius: 1,
                                            textTransform: 'none',
                                            backgroundColor: '#15803d',
                                            color: 'white',
                                            transition:
                                                'background-color 0.2s ease',
                                            '&:hover': {
                                                backgroundColor: '#166534',
                                            },
                                        }}
                                    >
                                        {
                                            navigationContent.auth
                                                .portalButtonText
                                        }
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    )}

                    {/* Mobile Menu Button */}
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label={
                                mobileOpen
                                    ? 'Close navigation menu'
                                    : 'Open navigation menu'
                            }
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-navigation-drawer"
                            edge="end"
                            onClick={handleDrawerToggle}
                            size="medium"
                            sx={{
                                color:
                                    transparent && !scrolled
                                        ? 'rgba(255, 255, 255, 0.9)'
                                        : '#171717',
                                p: 1.5,
                                borderRadius: 1,
                                transition: 'color 0.2s ease',
                                '&:hover': {
                                    backgroundColor:
                                        transparent && !scrolled
                                            ? 'rgba(255, 255, 255, 0.1)'
                                            : 'rgba(0, 0, 0, 0.04)',
                                },
                            }}
                        >
                            <MenuIcon fontSize="medium" />
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
                    disableScrollLock: true,
                    'aria-labelledby': 'mobile-navigation-title',
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: {
                            xs: '85vw',
                            sm: navigationContent.mobileNav.drawerWidth,
                        },
                        maxWidth: 360,
                        backgroundColor: 'transparent',
                        border: 'none',
                        id: 'mobile-navigation-drawer',
                        role: 'navigation',
                        'aria-label': 'Mobile navigation menu',
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
