import React from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    useTheme,
    alpha,
} from '@mui/material';
import {
    TableChart as TableIcon,
    SearchOff as SearchOffIcon,
    FilterAltOff as FilterOffIcon,
    Refresh as RefreshIcon,
    Add as AddIcon,
    ErrorOutline as ErrorIcon,
    CloudOff as CloudOffIcon,
    HourglassEmpty as LoadingIcon,
    Description as NoDataIcon,
} from '@mui/icons-material';

export type EmptyStateType =
    | 'no-data'
    | 'no-results'
    | 'filtered'
    | 'error'
    | 'loading-failed'
    | 'offline'
    | 'permission-denied'
    | 'custom';

interface EmptyStateAction {
    label: string;
    onClick: () => void;
    variant?: 'contained' | 'outlined' | 'text';
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    startIcon?: React.ReactNode;
    disabled?: boolean;
}

interface EmptyStateProps {
    type?: EmptyStateType;
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    actions?: EmptyStateAction[];
    onReset?: () => void;
    onRetry?: () => void;
    onCreate?: () => void;
    height?: number | string;
    className?: string;
}

const EmptyStateConfigs: Record<EmptyStateType, {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
}> = {
    'no-data': {
        icon: <NoDataIcon sx={{ fontSize: 64 }} />,
        title: 'No Data Available',
        description: 'There are no records to display. You can create a new record to get started.',
        color: 'text.secondary',
    },
    'no-results': {
        icon: <SearchOffIcon sx={{ fontSize: 64 }} />,
        title: 'No Results Found',
        description: 'We couldn\'t find any records matching your search criteria. Try adjusting your search terms.',
        color: 'warning.main',
    },
    'filtered': {
        icon: <FilterOffIcon sx={{ fontSize: 64 }} />,
        title: 'No Matching Records',
        description: 'No records match the current filters. Try removing some filters to see more results.',
        color: 'info.main',
    },
    'error': {
        icon: <ErrorIcon sx={{ fontSize: 64 }} />,
        title: 'Error Loading Data',
        description: 'An unexpected error occurred while loading the data. Please try again.',
        color: 'error.main',
    },
    'loading-failed': {
        icon: <LoadingIcon sx={{ fontSize: 64 }} />,
        title: 'Loading Failed',
        description: 'Failed to load data from the server. Please check your connection and try again.',
        color: 'error.main',
    },
    'offline': {
        icon: <CloudOffIcon sx={{ fontSize: 64 }} />,
        title: 'No Internet Connection',
        description: 'You appear to be offline. Please check your internet connection and try again.',
        color: 'warning.main',
    },
    'permission-denied': {
        icon: <ErrorIcon sx={{ fontSize: 64 }} />,
        title: 'Access Denied',
        description: 'You don\'t have permission to view this data. Contact your administrator if you need access.',
        color: 'error.main',
    },
    'custom': {
        icon: <TableIcon sx={{ fontSize: 64 }} />,
        title: 'Custom State',
        description: 'This is a custom empty state.',
        color: 'text.secondary',
    },
};

export function EmptyState({
    type = 'no-data',
    title,
    description,
    icon,
    actions = [],
    onReset,
    onRetry,
    onCreate,
    height = 400,
    className = '',
}: EmptyStateProps) {
    const theme = useTheme();
    const config = EmptyStateConfigs[type];

    const displayTitle = title || config.title;
    const displayDescription = description || config.description;
    const displayIcon = icon || config.icon;

    const defaultActions: EmptyStateAction[] = [];

    // Add default actions based on type and available handlers
    if (type === 'filtered' && onReset) {
        defaultActions.push({
            label: 'Clear Filters',
            onClick: onReset,
            variant: 'outlined',
            color: 'primary',
            startIcon: <FilterOffIcon />,
        });
    }

    if ((type === 'error' || type === 'loading-failed' || type === 'offline') && onRetry) {
        defaultActions.push({
            label: 'Try Again',
            onClick: onRetry,
            variant: 'contained',
            color: 'primary',
            startIcon: <RefreshIcon />,
        });
    }

    if (type === 'no-data' && onCreate) {
        defaultActions.push({
            label: 'Create New Record',
            onClick: onCreate,
            variant: 'contained',
            color: 'primary',
            startIcon: <AddIcon />,
        });
    }

    if (type === 'no-results' && onReset) {
        defaultActions.push({
            label: 'Clear Search',
            onClick: onReset,
            variant: 'outlined',
            color: 'primary',
            startIcon: <SearchOffIcon />,
        });
    }

    const allActions = [...defaultActions, ...actions];

    return (
        <Paper
            className={className}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: height,
                p: 4,
                textAlign: 'center',
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
                border: `1px dashed ${alpha(theme.palette.divider, 0.5)}`,
                borderRadius: 2,
                gap: 3,
            }}
        >
            {/* Icon */}
            <Box
                sx={{
                    color: config.color,
                    opacity: 0.7,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {displayIcon}
            </Box>

            {/* Content */}
            <Box sx={{ maxWidth: 400, width: '100%' }}>
                <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 1,
                    }}
                >
                    {displayTitle}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        lineHeight: 1.6,
                        mb: 2,
                    }}
                >
                    {displayDescription}
                </Typography>

                {/* Actions */}
                {allActions.length > 0 && (
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            mt: 3,
                        }}
                    >
                        {allActions.map((action, index) => (
                            <Button
                                key={index}
                                variant={action.variant || 'contained'}
                                color={action.color || 'primary'}
                                onClick={action.onClick}
                                startIcon={action.startIcon}
                                disabled={action.disabled}
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: 1.5,
                                    px: 3,
                                    py: 1,
                                    fontWeight: 500,
                                    minWidth: 120,
                                    boxShadow: action.variant === 'contained' ? 2 : 'none',
                                    '&:hover': {
                                        boxShadow: action.variant === 'contained' ? 4 : 1,
                                    },
                                }}
                            >
                                {action.label}
                            </Button>
                        ))}
                    </Box>
                )}
            </Box>

            {/* Additional info for specific types */}
            {(type === 'offline' || type === 'loading-failed') && (
                <Box
                    sx={{
                        mt: 2,
                        p: 2,
                        backgroundColor: alpha(theme.palette.warning.main, 0.1),
                        borderRadius: 1,
                        border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
                        maxWidth: 300,
                    }}
                >
                    <Typography variant="caption" color="warning.dark">
                        {type === 'offline'
                            ? 'Check your network connection and try refreshing the page.'
                            : 'If this problem persists, please contact support.'}
                    </Typography>
                </Box>
            )}
        </Paper>
    );
}

export default EmptyState;