import React, { useState } from 'react';
import {
    Box,
    Toolbar,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Tooltip,
    Badge,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    useTheme,
    alpha,
} from '@mui/material';
import {
    Search as SearchIcon,
    FilterList as FilterIcon,
    ViewColumn as ColumnsIcon,
    FileDownload as ExportIcon,
    Refresh as RefreshIcon,
    TableChart as TableIcon,
    ViewComfy as DensityIcon,
    Fullscreen as FullscreenIcon,
    MoreVert as MoreIcon,
    Close as CloseIcon,
    GetApp as DownloadIcon,
} from '@mui/icons-material';

import type {
    UseDataTableReturn,
    BaseTableData,
    ToolbarConfig,
    TableFilter,
    ExportFormat,
} from '../types/table.types';
import { exportFormatConfigs } from '../utils/exportHelpers';

interface TableToolbarProps<TData extends BaseTableData> {
    table: UseDataTableReturn<TData>['table'];
    state: UseDataTableReturn<TData>['state'];
    actions: UseDataTableReturn<TData>['actions'];
    computed: UseDataTableReturn<TData>['computed'];
    config: ToolbarConfig;
    filters?: TableFilter[];
}

export function TableToolbar<TData extends BaseTableData>({
    table,
    state,
    actions,
    computed,
    config,
    filters = [],
}: TableToolbarProps<TData>) {
    const theme = useTheme();
    const [searchValue, setSearchValue] = useState(state.globalFilter || '');
    const [columnsMenuAnchor, setColumnsMenuAnchor] = useState<null | HTMLElement>(null);
    const [exportMenuAnchor, setExportMenuAnchor] = useState<null | HTMLElement>(null);
    const [densityMenuAnchor, setDensityMenuAnchor] = useState<null | HTMLElement>(null);
    const [moreMenuAnchor, setMoreMenuAnchor] = useState<null | HTMLElement>(null);

    const {
        showSearch = true,
        showFilters = false,
        showColumns = true,
        showExport = true,
        showRefresh = true,
        showDensity = true,
        showFullscreen = false,
        customActions = [],
    } = config;

    // ====================
    // Search Handler
    // ====================

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value);
    };

    const handleSearchSubmit = () => {
        actions.setGlobalFilter(searchValue);
    };

    const handleSearchKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    const handleClearSearch = () => {
        setSearchValue('');
        actions.setGlobalFilter('');
    };

    // ====================
    // Column Visibility
    // ====================

    const handleColumnsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setColumnsMenuAnchor(event.currentTarget);
    };

    const handleColumnsMenuClose = () => {
        setColumnsMenuAnchor(null);
    };

    const toggleColumnVisibility = (columnId: string) => {
        const column = table.getColumn(columnId);
        if (column) {
            column.toggleVisibility();
        }
    };

    const resetColumnVisibility = () => {
        table.resetColumnVisibility();
    };

    const hideAllColumns = () => {
        table.getAllColumns().forEach(column => {
            if (column.getCanHide()) {
                column.toggleVisibility(false);
            }
        });
    };

    const showAllColumns = () => {
        table.getAllColumns().forEach(column => {
            if (column.getCanHide()) {
                column.toggleVisibility(true);
            }
        });
    };

    // ====================
    // Export Handlers
    // ====================

    const handleExportMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setExportMenuAnchor(event.currentTarget);
    };

    const handleExportMenuClose = () => {
        setExportMenuAnchor(null);
    };

    const handleExport = (format: ExportFormat) => {
        actions.exportData(format);
        handleExportMenuClose();
    };

    // ====================
    // Density Control
    // ====================

    const handleDensityMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setDensityMenuAnchor(event.currentTarget);
    };

    const handleDensityMenuClose = () => {
        setDensityMenuAnchor(null);
    };

    // ====================
    // More Actions Menu
    // ====================

    const handleMoreMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMoreMenuAnchor(event.currentTarget);
    };

    const handleMoreMenuClose = () => {
        setMoreMenuAnchor(null);
    };

    // ====================
    // Computed Values
    // ====================

    const visibleColumnsCount = table.getAllColumns().filter(col => col.getIsVisible()).length;
    const hiddenColumnsCount = table.getAllColumns().filter(col => !col.getIsVisible() && col.getCanHide()).length;
    const activeFiltersCount = computed.activeFilters.length;
    const hasSelection = computed.selectedRows.length > 0;

    return (
        <Toolbar
            variant="dense"
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: { sm: 2 },
                py: 1,
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
                borderBottom: `1px solid ${theme.palette.divider}`,
                borderTopLeftRadius: theme.shape.borderRadius,
                borderTopRightRadius: theme.shape.borderRadius,
                flexWrap: 'wrap',
                minHeight: 'auto',
            }}
        >
            {/* Left side - Title and info */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TableIcon color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        Data Table
                    </Typography>
                </Box>

                {/* Row count and selection info */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        {computed.filteredRowCount.toLocaleString()} {computed.filteredRowCount === 1 ? 'row' : 'rows'}
                        {computed.filteredRowCount !== computed.totalRowCount && (
                            <span> (of {computed.totalRowCount.toLocaleString()})</span>
                        )}
                    </Typography>

                    {hasSelection && (
                        <Typography variant="body2" color="primary.main" sx={{ fontWeight: 500 }}>
                            {computed.selectedRows.length} selected
                        </Typography>
                    )}

                    {activeFiltersCount > 0 && (
                        <Badge badgeContent={activeFiltersCount} color="primary">
                            <FilterIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        </Badge>
                    )}
                </Box>
            </Box>

            {/* Right side - Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                {/* Search */}
                {showSearch && (
                    <TextField
                        size="small"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={handleSearchChange}
                        onKeyDown={handleSearchKeyDown}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ fontSize: 18 }} />
                                </InputAdornment>
                            ),
                            endAdornment: searchValue && (
                                <InputAdornment position="end">
                                    <IconButton size="small" onClick={handleClearSearch}>
                                        <CloseIcon sx={{ fontSize: 16 }} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            width: 240,
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: 'background.paper',
                            },
                        }}
                    />
                )}

                {/* Column Visibility */}
                {showColumns && (
                    <Tooltip title="Manage columns">
                        <IconButton size="small" onClick={handleColumnsMenuOpen}>
                            <Badge badgeContent={hiddenColumnsCount || undefined} color="warning">
                                <ColumnsIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                )}

                {/* Export */}
                {showExport && (
                    <Tooltip title="Export data">
                        <IconButton size="small" onClick={handleExportMenuOpen}>
                            <ExportIcon />
                        </IconButton>
                    </Tooltip>
                )}

                {/* Refresh */}
                {showRefresh && (
                    <Tooltip title="Refresh data">
                        <IconButton
                            size="small"
                            onClick={actions.refresh}
                            disabled={state.isLoading}
                        >
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                )}

                {/* Custom Actions */}
                {customActions.map((action) => (
                    <Tooltip key={action.id} title={action.tooltip || action.label}>
                        <span>
                            <Button
                                size="small"
                                variant={action.variant || 'text'}
                                color={action.color || 'primary'}
                                startIcon={action.icon}
                                onClick={action.onClick}
                                disabled={action.disabled || action.loading}
                                sx={{ textTransform: 'none' }}
                            >
                                {action.label}
                            </Button>
                        </span>
                    </Tooltip>
                ))}

                {/* More actions menu */}
                {(showDensity || showFullscreen) && (
                    <Tooltip title="More options">
                        <IconButton size="small" onClick={handleMoreMenuOpen}>
                            <MoreIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Box>

            {/* Column Visibility Menu */}
            <Menu
                anchorEl={columnsMenuAnchor}
                open={Boolean(columnsMenuAnchor)}
                onClose={handleColumnsMenuClose}
                PaperProps={{
                    sx: { maxHeight: 400, width: 280 },
                }}
            >
                <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Column Visibility
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {visibleColumnsCount} of {table.getAllColumns().length} columns visible
                    </Typography>
                </Box>
                <Divider />

                <Box sx={{ px: 1 }}>
                    <FormControl component="fieldset" variant="standard" sx={{ width: '100%' }}>
                        <FormGroup>
                            {table.getAllColumns()
                                .filter(column => column.getCanHide())
                                .map((column) => (
                                    <FormControlLabel
                                        key={column.id}
                                        control={
                                            <Checkbox
                                                checked={column.getIsVisible()}
                                                onChange={() => toggleColumnVisibility(column.id)}
                                                size="small"
                                            />
                                        }
                                        label={
                                            <Typography variant="body2">
                                                {column.columnDef.header as string || column.id}
                                            </Typography>
                                        }
                                        sx={{ mx: 0 }}
                                    />
                                ))}
                        </FormGroup>
                    </FormControl>
                </Box>

                <Divider />
                <Box sx={{ p: 1, display: 'flex', gap: 1 }}>
                    <Button size="small" onClick={showAllColumns} sx={{ flex: 1 }}>
                        Show All
                    </Button>
                    <Button size="small" onClick={hideAllColumns} sx={{ flex: 1 }}>
                        Hide All
                    </Button>
                    <Button size="small" onClick={resetColumnVisibility} sx={{ flex: 1 }}>
                        Reset
                    </Button>
                </Box>
            </Menu>

            {/* Export Menu */}
            <Menu
                anchorEl={exportMenuAnchor}
                open={Boolean(exportMenuAnchor)}
                onClose={handleExportMenuClose}
            >
                <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Export Data
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {computed.filteredRowCount} rows • {visibleColumnsCount} columns
                    </Typography>
                </Box>
                <Divider />

                {Object.entries(exportFormatConfigs).map(([format, config]) => (
                    <MenuItem
                        key={format}
                        onClick={() => handleExport(format as ExportFormat)}
                        sx={{ minWidth: 200 }}
                    >
                        <ListItemIcon>
                            <DownloadIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary={config.label}
                            secondary={config.description}
                        />
                    </MenuItem>
                ))}
            </Menu>

            {/* More Options Menu */}
            <Menu
                anchorEl={moreMenuAnchor}
                open={Boolean(moreMenuAnchor)}
                onClose={handleMoreMenuClose}
            >
                {showDensity && (
                    <MenuItem onClick={handleDensityMenuOpen}>
                        <ListItemIcon>
                            <DensityIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Table Density" />
                    </MenuItem>
                )}

                {showFullscreen && (
                    <MenuItem>
                        <ListItemIcon>
                            <FullscreenIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Fullscreen" />
                    </MenuItem>
                )}

                <MenuItem onClick={actions.resetTable}>
                    <ListItemIcon>
                        <RefreshIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Reset Table" />
                </MenuItem>
            </Menu>
        </Toolbar>
    );
}