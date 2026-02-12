/* eslint-disable react-hooks/set-state-in-effect */
import {
    EventAvailable as AttendanceIcon,
    AccountBalance as BillingIcon,
    Check as CheckIcon,
    Dashboard as DashboardIcon,
    ExpandLess,
    ExpandMore,
    Payment as FeesIcon,
    Home as HomeIcon,
    Grade as MarksIcon,
    Receipt as PaymentIcon,
    Assessment as ResultsIcon,
    Description as StudentSheetIcon,
    Schedule as TimetableIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    Collapse,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface PortalSidebarProps {
    onItemClick?: () => void;
}

interface NavigationItem {
    id: string;
    label: string;
    icon: React.ReactElement;
    path: string;
    badge?: number;
    children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <DashboardIcon />,
        path: 'dashboard',
    },
    {
        id: 'billing',
        label: 'Billing',
        icon: <BillingIcon />,
        path: 'billing',
        children: [
            {
                id: 'billing-overview',
                label: 'Fee Overview',
                icon: <FeesIcon />,
                path: 'billing/overview',
            },
            {
                id: 'billing-payments',
                label: 'Payment History',
                icon: <PaymentIcon />,
                path: 'billing/payments',
            },
        ],
    },
    {
        id: 'results',
        label: 'Academic Results',
        icon: <ResultsIcon />,
        path: 'results',
        children: [
            {
                id: 'results-marks',
                label: 'Student Marks',
                icon: <MarksIcon />,
                path: 'results/marks',
            },
            // {
            //     id: 'results-overview',
            //     label: 'Results Overview',
            //     icon: <GradesIcon />,
            //     path: 'results/overview',
            // },
            // {
            //     id: 'results-sequential',
            //     label: 'Sequential Assessments',
            //     icon: <ProgressIcon />,
            //     path: 'results/sequential',
            // },
            // {
            //     id: 'results-term',
            //     label: 'Term Reports',
            //     icon: <ResultsIcon />,
            //     path: 'results/term',
            // },
        ],
    },
    {
        id: 'timetable',
        label: 'Timetable',
        icon: <TimetableIcon />,
        path: 'timetable',
    },
    {
        id: 'attendance',
        label: 'Attendance',
        icon: <AttendanceIcon />,
        path: 'attendance',
        children: [
            {
                id: 'attendance-tracking',
                label: 'Attendance Tracking',
                icon: <CheckIcon />,
                path: 'attendance/tracking',
            },
        ],
    },
    {
        id: 'student-sheet',
        label: 'Student Sheet',
        icon: <StudentSheetIcon />,
        path: 'student-sheet',
    },
];

export const PortalSidebar: React.FC<PortalSidebarProps> = ({
    onItemClick,
}) => {
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    // Auto-expand sections based on current route
    useEffect(() => {
        const currentPath = location.pathname;
        const newExpanded = new Set<string>();

        navigationItems.forEach(item => {
            if (item.children) {
                const shouldExpand =
                    item.children.some(
                        child => currentPath === `/portal/${child.path}`
                    ) || currentPath.startsWith(`/portal/${item.path}/`);

                if (shouldExpand) {
                    newExpanded.add(item.id);
                }
            }
        });

        // Only update if there's a difference to prevent unnecessary re-renders
        setExpandedItems(prev => {
            const prevArray = Array.from(prev).sort();
            const newArray = Array.from(newExpanded).sort();

            if (
                prevArray.length !== newArray.length ||
                !prevArray.every((item, index) => item === newArray[index])
            ) {
                return newExpanded;
            }
            return prev;
        });
    }, [location.pathname]);

    const handleItemClick = (item: NavigationItem) => {
        if (item.children) {
            // For parent items with children, only toggle expansion state
            setExpandedItems(prev => {
                const newSet = new Set(prev);
                if (newSet.has(item.id)) {
                    newSet.delete(item.id);
                } else {
                    newSet.add(item.id);
                }
                return newSet;
            });
            // Do not navigate for parent items
        } else {
            // For child items and single items, navigate directly
            navigate(`/portal/${item.path}`);
            onItemClick?.();
        }
    };

    const isSelected = (item: NavigationItem): boolean => {
        // Exact match for the item's path
        const exactMatch = location.pathname === `/portal/${item.path}`;

        // For items without children, check exact match
        if (!item.children) {
            return exactMatch;
        }

        // For parent items, check if we're on a child route
        return item.children.some(
            child => location.pathname === `/portal/${child.path}`
        );
    };

    const isParentSelected = (item: NavigationItem): boolean => {
        if (!item.children) return false;

        // Check if any child path matches current location
        return item.children.some(
            child => location.pathname === `/portal/${child.path}`
        );
    };

    const renderNavigationItem = (item: NavigationItem, depth = 0) => {
        const isExpanded = expandedItems.has(item.id);
        const selected = isSelected(item);
        const parentSelected = isParentSelected(item);
        const hasChildren = Boolean(item.children);
        const isChildItem = depth > 0;
        const isActiveChild = selected && isChildItem;
        const isActiveParent = parentSelected && hasChildren;

        return (
            <Box key={item.id}>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => handleItemClick(item)}
                        selected={selected || parentSelected}
                        sx={{
                            pl: depth * 1.5 + 1.5,
                            borderRadius: 1,
                            mx: 0.5,
                            mb: 0.25,
                            minHeight: 36,

                            // Active child - darker background
                            ...(isActiveChild && {
                                backgroundColor: 'primary.100',
                                color: 'primary.main',
                                '&:hover': {
                                    backgroundColor: 'primary.200',
                                },
                            }),

                            // Active parent - light background
                            ...(isActiveParent && {
                                backgroundColor: 'primary.50',
                                color: 'text.primary',
                                '&:hover': {
                                    backgroundColor: 'primary.100',
                                },
                            }),

                            // Regular hover
                            ...(!selected &&
                                !parentSelected && {
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                    },
                                }),
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 32,
                                color: isActiveChild
                                    ? 'primary.main'
                                    : isActiveParent
                                      ? 'primary.main'
                                      : 'text.secondary',
                                '& > svg': {
                                    fontSize: isChildItem ? 16 : 18,
                                },
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>

                        <ListItemText
                            primary={
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight:
                                            selected || parentSelected
                                                ? 600
                                                : 400,
                                        fontSize: isChildItem
                                            ? '0.75rem'
                                            : '0.8125rem',
                                        color: isActiveChild
                                            ? 'primary.main'
                                            : isActiveParent
                                              ? 'text.primary'
                                              : 'inherit',
                                    }}
                                >
                                    {item.label}
                                </Typography>
                            }
                        />

                        {item.badge && item.badge > 0 && (
                            <Chip
                                label={item.badge > 99 ? '99+' : item.badge}
                                size="small"
                                sx={{
                                    height: 16,
                                    fontSize: '0.625rem',
                                    fontWeight: 600,
                                    mr: hasChildren ? 0 : 0.5,
                                    minWidth: 16,
                                    backgroundColor: 'error.main',
                                    color: 'white',
                                }}
                            />
                        )}

                        {hasChildren && (
                            <Box sx={{ ml: 0.5 }}>
                                {isExpanded ? (
                                    <ExpandLess
                                        sx={{
                                            fontSize: 16,
                                            color: isActiveParent
                                                ? 'primary.main'
                                                : 'text.secondary',
                                        }}
                                    />
                                ) : (
                                    <ExpandMore
                                        sx={{
                                            fontSize: 16,
                                            color: isActiveParent
                                                ? 'primary.main'
                                                : 'text.secondary',
                                        }}
                                    />
                                )}
                            </Box>
                        )}
                    </ListItemButton>
                </ListItem>

                {hasChildren && (
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {item.children?.map(child =>
                                renderNavigationItem(child, depth + 1)
                            )}
                        </List>
                    </Collapse>
                )}
            </Box>
        );
    };

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Navigation Header */}
            <Box
                sx={{
                    p: 1.5,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Typography
                    variant="caption"
                    sx={{
                        fontWeight: 600,
                        color: 'text.secondary',
                        letterSpacing: 0.5,
                        fontSize: '0.6875rem',
                        textTransform: 'uppercase',
                    }}
                >
                    Parent Portal
                </Typography>
            </Box>

            {/* Navigation Items */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                <List sx={{ pt: 0.5, px: 0.5 }}>
                    {navigationItems.map(item => renderNavigationItem(item))}
                </List>
            </Box>

            {/* Back to Landing Button */}
            <Box sx={{ p: 1 }}>
                <Button
                    fullWidth
                    startIcon={<HomeIcon />}
                    onClick={() => navigate('/')}
                    size="small"
                    sx={{
                        py: 1,
                        fontSize: '0.75rem',
                        textAlign: 'start',
                        fontWeight: 500,
                        textTransform: 'none',
                        color: 'text.secondary',
                        backgroundColor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        '&:hover': {
                            backgroundColor: 'primary.50',
                            borderColor: 'primary.main',
                            color: 'primary.main',
                        },
                    }}
                >
                    Retour à l'Accueil
                </Button>
            </Box>

            {/* Footer */}
            <Box
                sx={{
                    p: 1.5,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    backgroundColor: 'background.default',
                }}
            >
                <Typography
                    variant="caption"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.625rem',
                        textAlign: 'center',
                        display: 'block',
                        lineHeight: 1.3,
                    }}
                >
                    Excellence Academy
                    <br />
                    Parent Portal v2.0
                </Typography>
            </Box>
        </Box>
    );
};
