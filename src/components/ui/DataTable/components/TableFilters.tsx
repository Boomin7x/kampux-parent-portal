import React from 'react';
import {
    Box,
    Chip,
    Typography,
    IconButton,
    Tooltip,
    Collapse,
    useTheme,
    alpha,
} from '@mui/material';
import {
    Close as CloseIcon,
    FilterAlt as FilterIcon,
    Clear as ClearAllIcon,
} from '@mui/icons-material';
import type { ActiveFilter } from '../types/table.types';

interface TableFiltersProps {
    activeFilters: ActiveFilter[];
    onClearFilter: (column: string) => void;
    onClearAllFilters: () => void;
    className?: string;
}

export function TableFilters({
    activeFilters,
    onClearFilter,
    onClearAllFilters,
    className = '',
}: TableFiltersProps) {
    const theme = useTheme();

    if (activeFilters.length === 0) {
        return null;
    }

    const getFilterColor = (filterType: string) => {
        switch (filterType) {
            case 'text':
                return 'primary';
            case 'select':
            case 'multiSelect':
                return 'secondary';
            case 'number':
            case 'numberRange':
                return 'info';
            case 'date':
            case 'dateRange':
                return 'success';
            case 'boolean':
                return 'warning';
            default:
                return 'default';
        }
    };

    const getFilterIcon = (filterType: string) => {
        // You can add different icons for different filter types
        return <FilterIcon sx={{ fontSize: 16 }} />;
    };

    return (
        <Collapse in={activeFilters.length > 0}>
            <Box
                className={className}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 2,
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    flexWrap: 'wrap',
                }}
            >
                {/* Filter indicator and label */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 1 }}>
                    <FilterIcon
                        sx={{
                            fontSize: 18,
                            color: 'primary.main',
                        }}
                    />
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 500,
                            color: 'primary.main',
                        }}
                    >
                        Active Filters:
                    </Typography>
                </Box>

                {/* Filter chips */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', flexGrow: 1 }}>
                    {activeFilters.map((filter) => (
                        <Chip
                            key={filter.id}
                            size="small"
                            icon={getFilterIcon(filter.type)}
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <Typography
                                        component="span"
                                        variant="caption"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {filter.label}:
                                    </Typography>
                                    <Typography
                                        component="span"
                                        variant="caption"
                                    >
                                        {filter.displayValue}
                                    </Typography>
                                </Box>
                            }
                            onDelete={() => onClearFilter(filter.column)}
                            deleteIcon={
                                <CloseIcon sx={{ fontSize: '0.875rem !important' }} />
                            }
                            color={getFilterColor(filter.type) as any}
                            variant="outlined"
                            sx={{
                                maxWidth: 300,
                                '& .MuiChip-label': {
                                    maxWidth: 240,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                },
                                '& .MuiChip-icon': {
                                    fontSize: 14,
                                },
                                '& .MuiChip-deleteIcon': {
                                    fontSize: 14,
                                    '&:hover': {
                                        color: 'error.main',
                                    },
                                },
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                    boxShadow: 1,
                                },
                            }}
                        />
                    ))}
                </Box>

                {/* Clear all button */}
                <Tooltip title="Clear all filters">
                    <IconButton
                        size="small"
                        onClick={onClearAllFilters}
                        sx={{
                            ml: 'auto',
                            color: 'text.secondary',
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 1,
                            '&:hover': {
                                backgroundColor: 'error.main',
                                borderColor: 'error.main',
                                color: 'error.contrastText',
                            },
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <ClearAllIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                </Tooltip>
            </Box>
        </Collapse>
    );
}