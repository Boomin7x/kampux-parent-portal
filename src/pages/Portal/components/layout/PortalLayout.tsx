import {
    Badge,
    Logout as LogoutIcon,
    Menu as MenuIcon,
    Notifications as NotificationIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';
import {
    AppBar,
    Avatar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationCenter } from '../communication/NotificationCenter';
import { PortalSidebar } from './PortalSidebar';

interface PortalLayoutProps {
    children: React.ReactNode;
    currentStudent?: {
        id: string;
        name: string;
        avatar?: string;
        grade: string;
    };
}

const SIDEBAR_WIDTH = 240;
const MOBILE_BREAKPOINT = 'md';

export const PortalLayout: React.FC<PortalLayoutProps> = ({
    children,
    currentStudent,
}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down(MOBILE_BREAKPOINT));

    const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
    const [accountMenuAnchor, setAccountMenuAnchor] =
        useState<null | HTMLElement>(null);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    // Mock user data - replace with actual auth context
    const currentUser = {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        avatar: undefined,
    };

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAccountMenuAnchor(event.currentTarget);
    };

    const handleAccountMenuClose = () => {
        setAccountMenuAnchor(null);
    };

    const handleLogout = () => {
        // Implement logout logic
        navigate('/auth');
        handleAccountMenuClose();
    };

    const handleSettings = () => {
        navigate('/portal/settings');
        handleAccountMenuClose();
    };

    const unreadNotifications = 3; // Mock notification count

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <CssBaseline />

            {/* App Bar */}
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    zIndex: theme.zIndex.drawer + 1,
                    color: 'text.primary',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    backdropFilter: 'blur(8px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                }}
            >
                <Toolbar
                    variant="dense"
                    sx={{
                        minHeight: '44px !important',
                        px: { xs: 1, sm: 1.5 },
                        py: 0.25,
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr auto',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    {/* Left: Menu & Brand */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.75,
                        }}
                    >
                        <IconButton
                            onClick={handleSidebarToggle}
                            size="small"
                            sx={{
                                color: 'text.primary',
                                p: 0.75,
                                borderRadius: 1,
                                '&:hover': { backgroundColor: 'action.hover' },
                            }}
                        >
                            <MenuIcon sx={{ fontSize: 16 }} />
                        </IconButton>

                        <Box
                            sx={{
                                display: { xs: 'none', sm: 'flex' },
                                alignItems: 'center',
                                gap: 0.5,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: '50%',
                                    background:
                                        'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '0.5rem',
                                        fontWeight: 700,
                                        color: 'white',
                                    }}
                                >
                                    E
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 500,
                                    color: 'text.primary',
                                    fontSize: '0.75rem',
                                }}
                            >
                                Excellence Academy
                            </Typography>
                        </Box>
                    </Box>

                    {/* Center: Current Student */}
                    {currentStudent ? (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 0.75,
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                backgroundColor:
                                    theme.palette.primary.main + '06',
                                border: `1px solid ${theme.palette.primary.main}12`,
                                minWidth: 0,
                                maxWidth: 180,
                            }}
                        >
                            <Avatar
                                src={currentStudent.avatar}
                                sx={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: 'primary.main',
                                    fontSize: '0.5625rem',
                                }}
                            >
                                {currentStudent?.name?.charAt(0)}
                            </Avatar>
                            <Box
                                sx={{
                                    display: { xs: 'none', md: 'block' },
                                    minWidth: 0,
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 600,
                                        display: 'block',
                                        lineHeight: 1,
                                        fontSize: '0.6875rem',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        maxWidth: 100,
                                    }}
                                >
                                    {currentStudent.name}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        fontSize: '0.5625rem',
                                        lineHeight: 1,
                                    }}
                                >
                                    Grade {currentStudent.grade}
                                </Typography>
                            </Box>
                        </Box>
                    ) : (
                        <Box />
                    )}

                    {/* Right: Actions */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.25,
                            justifyContent: 'flex-end',
                        }}
                    >
                        {/* Quick Alert Count */}
                        {unreadNotifications > 0 && (
                            <Box
                                sx={{
                                    display: { xs: 'none', lg: 'flex' },
                                    alignItems: 'center',
                                    px: 0.5,
                                    py: 0.25,
                                    borderRadius: 0.5,
                                    backgroundColor: 'error.50',
                                    mr: 0.5,
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.5625rem',
                                        fontWeight: 600,
                                        color: 'error.main',
                                    }}
                                >
                                    {unreadNotifications} alerts
                                </Typography>
                            </Box>
                        )}

                        {/* Notification Button */}
                        <IconButton
                            size="small"
                            onClick={() => setNotificationsOpen(true)}
                            sx={{
                                color: 'text.secondary',
                                p: 0.75,
                                borderRadius: 1,
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                    color: 'text.primary',
                                },
                            }}
                        >
                            <Badge
                                badgeContent={unreadNotifications}
                                color="error"
                                sx={{
                                    '& .MuiBadge-badge': {
                                        fontSize: '0.5rem',
                                        height: 10,
                                        minWidth: 10,
                                        top: 0,
                                        right: 0,
                                    },
                                }}
                            >
                                <NotificationIcon sx={{ fontSize: 14 }} />
                            </Badge>
                        </IconButton>

                        {/* User Menu */}
                        <IconButton
                            size="small"
                            onClick={handleAccountMenuOpen}
                            sx={{
                                color: 'text.secondary',
                                p: 0.5,
                                borderRadius: 1,
                                '&:hover': { backgroundColor: 'action.hover' },
                            }}
                        >
                            <Avatar
                                src={currentUser.avatar}
                                sx={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: 'secondary.main',
                                    fontSize: '0.5625rem',
                                    border: `1px solid ${theme.palette.divider}`,
                                }}
                            >
                                {currentUser?.name?.charAt(0)}
                            </Avatar>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            <Box component="nav">
                <Drawer
                    variant={isMobile ? 'temporary' : 'persistent'}
                    open={sidebarOpen}
                    onClose={handleSidebarToggle}
                    ModalProps={{
                        keepMounted: true, // Better mobile performance
                    }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: SIDEBAR_WIDTH,
                            boxSizing: 'border-box',
                            borderRight: `1px solid ${theme.palette.divider}`,
                            backgroundColor: 'background.paper',
                            position: 'fixed',
                            height: '100%',
                            top: 0,
                            left: 0,
                            zIndex: theme.zIndex.drawer,
                            transition: theme.transitions.create('transform', {
                                easing: theme.transitions.easing.sharp,
                                duration:
                                    theme.transitions.duration.enteringScreen,
                            }),
                        },
                    }}
                >
                    <Toolbar /> {/* Spacer for app bar */}
                    <PortalSidebar
                        onItemClick={isMobile ? handleSidebarToggle : undefined}
                    />
                </Drawer>
            </Box>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    backgroundColor: 'background.default',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: {
                        xs: 0,
                        [MOBILE_BREAKPOINT]: sidebarOpen
                            ? `${SIDEBAR_WIDTH}px`
                            : 0,
                    },
                    width: {
                        xs: '100%',
                        [MOBILE_BREAKPOINT]: sidebarOpen
                            ? `calc(100% - ${SIDEBAR_WIDTH}px)`
                            : '100%',
                    },
                    transition: theme.transitions.create(['margin', 'width'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                <Toolbar /> {/* Spacer for app bar */}
                <Box sx={{ flexGrow: 1, p: 2 }}>{children}</Box>
            </Box>

            {/* Account Menu */}
            <Menu
                anchorEl={accountMenuAnchor}
                open={Boolean(accountMenuAnchor)}
                onClose={handleAccountMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                    sx: {
                        minWidth: 180,
                        mt: 0.5,
                    },
                }}
            >
                <Box sx={{ px: 1.5, py: 0.75 }}>
                    <Typography
                        variant="caption"
                        sx={{ fontWeight: 600, display: 'block' }}
                    >
                        {currentUser.name}
                    </Typography>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: '0.6875rem' }}
                    >
                        {currentUser.email}
                    </Typography>
                </Box>
                <Divider />
                <MenuItem onClick={handleSettings}>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </MenuItem>
            </Menu>

            {/* Notification Center */}
            <NotificationCenter
                open={notificationsOpen}
                onClose={() => setNotificationsOpen(false)}
            />
        </Box>
    );
};
