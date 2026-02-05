import {
    Close as CloseIcon,
    // Assignment as AssignmentIcon,
    EventAvailable as EventIcon,
    Info as InfoIcon,
    MarkEmailRead as MarkReadIcon,
    School as SchoolIcon,
    CheckCircle as SuccessIcon,
    Circle as UnreadIcon,
    Warning as WarningIcon,
} from '@mui/icons-material';
import {
    Avatar,
    Badge,
    Box,
    Button,
    Chip,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    Tab,
    Tabs,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useState } from 'react';

interface NotificationCenterProps {
    open: boolean;
    onClose: () => void;
}

interface Notification {
    id: string;
    type: 'academic' | 'attendance' | 'general' | 'alert' | 'achievement';
    title: string;
    message: string;
    timestamp: string;
    isRead: boolean;
    priority: 'low' | 'medium' | 'high';
    studentId?: string;
    studentName?: string;
    actionRequired?: boolean;
    actionText?: string;
    source: string; // e.g., "Ms. Johnson", "School Office"
}

// Mock notification data
const mockNotifications: Notification[] = [
    {
        id: '1',
        type: 'alert',
        title: 'Missing Assignment Alert',
        message: 'Math homework due yesterday has not been submitted.',
        timestamp: '2024-01-18T10:30:00Z',
        isRead: false,
        priority: 'high',
        studentId: 'student1',
        studentName: 'Emma Johnson',
        actionRequired: true,
        actionText: 'Contact Teacher',
        source: 'Ms. Rodriguez - Mathematics',
    },
    {
        id: '2',
        type: 'academic',
        title: 'Grade Posted',
        message: 'New grade posted for Science Quiz #3: A-',
        timestamp: '2024-01-18T09:15:00Z',
        isRead: false,
        priority: 'medium',
        studentId: 'student1',
        studentName: 'Emma Johnson',
        source: 'Mr. Thompson - Science',
    },
    {
        id: '3',
        type: 'general',
        title: 'Parent-Teacher Conference',
        message:
            'Reminder: Your conference is scheduled for tomorrow at 2:00 PM.',
        timestamp: '2024-01-17T16:00:00Z',
        isRead: true,
        priority: 'medium',
        source: 'School Office',
    },
    {
        id: '4',
        type: 'achievement',
        title: 'Student Recognition',
        message:
            'Emma was recognized for outstanding participation in class discussions.',
        timestamp: '2024-01-17T14:30:00Z',
        isRead: false,
        priority: 'low',
        studentId: 'student1',
        studentName: 'Emma Johnson',
        source: 'Ms. Davis - English',
    },
    {
        id: '5',
        type: 'attendance',
        title: 'Attendance Notice',
        message: 'Emma arrived 15 minutes late to first period today.',
        timestamp: '2024-01-17T08:15:00Z',
        isRead: true,
        priority: 'low',
        studentId: 'student1',
        studentName: 'Emma Johnson',
        source: 'Attendance Office',
    },
];

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
    open,
    onClose,
}) => {
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState(0);
    const [notifications, setNotifications] = useState(mockNotifications);

    const getNotificationIcon = (type: Notification['type']) => {
        switch (type) {
            case 'academic':
                return <SchoolIcon fontSize="small" />;
            case 'attendance':
                return <EventIcon fontSize="small" />;
            case 'alert':
                return <WarningIcon fontSize="small" />;
            case 'achievement':
                return <SuccessIcon fontSize="small" />;
            default:
                return <InfoIcon fontSize="small" />;
        }
    };

    const getNotificationColor = (
        type: Notification['type'],
        priority: Notification['priority']
    ) => {
        if (priority === 'high') return theme.palette.error.main;
        if (type === 'achievement') return theme.palette.success.main;
        if (type === 'academic') return theme.palette.primary.main;
        return theme.palette.text.secondary;
    };

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInMinutes = Math.floor(
            (now.getTime() - date.getTime()) / (1000 * 60)
        );

        if (diffInMinutes < 60) {
            return `${diffInMinutes}m ago`;
        } else if (diffInMinutes < 1440) {
            return `${Math.floor(diffInMinutes / 60)}h ago`;
        } else {
            return `${Math.floor(diffInMinutes / 1440)}d ago`;
        }
    };

    const markAsRead = (notificationId: string) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === notificationId
                    ? { ...notification, isRead: true }
                    : notification
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, isRead: true }))
        );
    };

    const filteredNotifications = () => {
        switch (activeTab) {
            case 0: // All
                return notifications;
            case 1: // Unread
                return notifications.filter(n => !n.isRead);
            case 2: // Academic
                return notifications.filter(
                    n => n.type === 'academic' || n.type === 'alert'
                );
            case 3: // General
                return notifications.filter(
                    n =>
                        n.type === 'general' ||
                        n.type === 'attendance' ||
                        n.type === 'achievement'
                );
            default:
                return notifications;
        }
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: '100%', sm: 400 },
                    maxWidth: '100vw',
                },
            }}
        >
            <Box
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        p: 2,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Notifications
                        {unreadCount > 0 && (
                            <Badge
                                badgeContent={unreadCount}
                                color="error"
                                sx={{ ml: 2 }}
                            />
                        )}
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Action Bar */}
                {unreadCount > 0 && (
                    <Box
                        sx={{
                            p: 2,
                            borderBottom: `1px solid ${theme.palette.divider}`,
                        }}
                    >
                        <Button
                            size="small"
                            startIcon={<MarkReadIcon />}
                            onClick={markAllAsRead}
                            sx={{ textTransform: 'none' }}
                        >
                            Mark all as read
                        </Button>
                    </Box>
                )}

                {/* Filter Tabs */}
                <Box
                    sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
                >
                    <Tabs
                        value={activeTab}
                        onChange={(_, newValue) => setActiveTab(newValue)}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            '& .MuiTab-root': {
                                minWidth: 'auto',
                                textTransform: 'none',
                                fontSize: '0.8125rem',
                            },
                        }}
                    >
                        <Tab label="All" />
                        <Tab
                            label={
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    Unread
                                    {unreadCount > 0 && (
                                        <Chip
                                            label={unreadCount}
                                            size="small"
                                            sx={{
                                                height: 18,
                                                fontSize: '0.6875rem',
                                                backgroundColor: 'error.main',
                                                color: 'white',
                                            }}
                                        />
                                    )}
                                </Box>
                            }
                        />
                        <Tab label="Academic" />
                        <Tab label="General" />
                    </Tabs>
                </Box>

                {/* Notifications List */}
                <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    <List sx={{ p: 0 }}>
                        {filteredNotifications().map((notification, index) => (
                            <React.Fragment key={notification.id}>
                                <ListItem
                                    sx={{
                                        px: 2,
                                        py: 1.5,
                                        cursor: 'pointer',
                                        backgroundColor: notification.isRead
                                            ? 'transparent'
                                            : 'action.hover',
                                        '&:hover': {
                                            backgroundColor: 'action.selected',
                                        },
                                    }}
                                    onClick={() => markAsRead(notification.id)}
                                >
                                    <Box sx={{ width: '100%' }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: 1.5,
                                                mb: 1,
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    width: 32,
                                                    height: 32,
                                                    backgroundColor:
                                                        getNotificationColor(
                                                            notification.type,
                                                            notification.priority
                                                        ),
                                                    color: 'white',
                                                }}
                                            >
                                                {getNotificationIcon(
                                                    notification.type
                                                )}
                                            </Avatar>

                                            <Box
                                                sx={{
                                                    flexGrow: 1,
                                                    minWidth: 0,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    {!notification.isRead && (
                                                        <UnreadIcon
                                                            sx={{
                                                                fontSize: 8,
                                                                color: 'primary.main',
                                                            }}
                                                        />
                                                    )}
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            fontWeight:
                                                                notification.isRead
                                                                    ? 400
                                                                    : 600,
                                                            fontSize:
                                                                '0.8125rem',
                                                            overflow: 'hidden',
                                                            textOverflow:
                                                                'ellipsis',
                                                            whiteSpace:
                                                                'nowrap',
                                                        }}
                                                    >
                                                        {notification.title}
                                                    </Typography>
                                                    {notification.priority ===
                                                        'high' && (
                                                        <Chip
                                                            label="High"
                                                            size="small"
                                                            color="error"
                                                            sx={{
                                                                height: 16,
                                                                fontSize:
                                                                    '0.6875rem',
                                                            }}
                                                        />
                                                    )}
                                                </Box>

                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'text.secondary',
                                                        fontSize: '0.75rem',
                                                        mb: 0.5,
                                                        lineHeight: 1.4,
                                                    }}
                                                >
                                                    {notification.message}
                                                </Typography>

                                                {notification.studentName && (
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color: 'primary.main',
                                                            fontSize:
                                                                '0.6875rem',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {
                                                            notification.studentName
                                                        }
                                                    </Typography>
                                                )}

                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'space-between',
                                                        mt: 1,
                                                    }}
                                                >
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color: 'text.secondary',
                                                            fontSize:
                                                                '0.6875rem',
                                                        }}
                                                    >
                                                        {notification.source} •{' '}
                                                        {formatTimestamp(
                                                            notification.timestamp
                                                        )}
                                                    </Typography>

                                                    {notification.actionRequired &&
                                                        notification.actionText && (
                                                            <Button
                                                                size="small"
                                                                variant="text"
                                                                sx={{
                                                                    textTransform:
                                                                        'none',
                                                                    fontSize:
                                                                        '0.6875rem',
                                                                    minWidth:
                                                                        'auto',
                                                                    p: 0.5,
                                                                }}
                                                            >
                                                                {
                                                                    notification.actionText
                                                                }
                                                            </Button>
                                                        )}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </ListItem>
                                {index < filteredNotifications().length - 1 && (
                                    <Divider />
                                )}
                            </React.Fragment>
                        ))}
                    </List>

                    {filteredNotifications().length === 0 && (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                py: 8,
                                px: 3,
                                textAlign: 'center',
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 64,
                                    height: 64,
                                    backgroundColor: 'action.hover',
                                    color: 'text.secondary',
                                    mb: 2,
                                }}
                            >
                                <InfoIcon sx={{ fontSize: 32 }} />
                            </Avatar>
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                No notifications
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {activeTab === 1
                                    ? "You're all caught up!"
                                    : 'No notifications to display'}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Drawer>
    );
};
