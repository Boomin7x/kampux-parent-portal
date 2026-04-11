import { Feedback, Menu as MenuIcon } from '@mui/icons-material';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    CssBaseline,
    Drawer,
    IconButton,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LanguageSelector } from '../../../../components/common/LanguageSelector';
import { useUserProfile } from '../../../Auth/_hooks/useAuth';
import { NotificationCenter } from '../communication/NotificationCenter';
import UserDisplay from '../user/UserDisplay';
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
    const isMobile = useMediaQuery(theme.breakpoints.down(MOBILE_BREAKPOINT));
    const userProfile = useUserProfile();
    const navigate = useNavigate();
    const { t } = useTranslation('layout');

    const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleComplaintClick = () => {
        navigate('/portal/complaints');
    };

    // const unreadNotifications = 3; // Mock notification count

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
                                        'linear-gradient(135deg, #f59e0b, #16a34a)',
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
                                {userProfile?.applicationSetup?.companyName ||
                                    'Excellence Academy'}
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
                                backgroundColor: `${theme.palette.primary.main}06`,
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
                        {/* {unreadNotifications > 0 && (
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
                        )} */}

                        {/* Notification Button */}
                        {/* <IconButton
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
                        </IconButton> */}

                        {/* Complaint Button */}
                        <Button
                            onClick={handleComplaintClick}
                            size="small"
                            sx={{
                                px: 1,
                                py: 0.5,
                                mr: 0.5,
                                minWidth: 'auto',
                                borderRadius: 1,
                                backgroundColor: 'transparent',
                                border: '1px solid',
                                borderColor: 'divider',
                                color: 'text.secondary',
                                fontSize: '0.6875rem',
                                fontWeight: 500,
                                textTransform: 'none',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    backgroundColor: 'error.50',
                                    borderColor: 'error.main',
                                    color: 'error.main',
                                },
                            }}
                        >
                            <Feedback sx={{ fontSize: 12, mr: 0.5 }} />
                            <Box
                                sx={{
                                    display: { xs: 'none', sm: 'block' },
                                }}
                            >
                                {t('actions.complaint')}
                            </Box>
                        </Button>

                        {/* Language Selector */}
                        <Box sx={{ mr: 0.5 }}>
                            <LanguageSelector variant="page" />
                        </Box>

                        {/* User Menu */}
                        <UserDisplay />
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

            {/* Notification Center */}
            <NotificationCenter
                open={notificationsOpen}
                onClose={() => setNotificationsOpen(false)}
            />
        </Box>
    );
};
