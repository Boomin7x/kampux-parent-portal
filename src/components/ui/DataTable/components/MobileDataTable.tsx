import {
    Check,
    Close,
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    MoreVert as MoreIcon,
    Person,
} from '@mui/icons-material';
import {
    alpha,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Chip,
    Collapse,
    IconButton,
    Paper,
    Stack,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import { useMemo, useState } from 'react';

import { useDataTable } from '../hooks/useDataTable';
import type { BaseTableData, DataTableProps } from '../types/table.types';
import { EmptyState } from './EmptyState';
import { TableFilters } from './TableFilters';
import { TablePagination } from './TablePagination';
import { TableSkeleton } from './TableSkeleton';
import { TableToolbar } from './TableToolbar';

interface MobileDataTableProps<
    TData extends BaseTableData,
> extends DataTableProps<TData> {
    cardElevation?: number;
    cardSpacing?: number;
    showExpandButton?: boolean;
    primaryFields?: string[];
    secondaryFields?: string[];
    compactMode?: boolean;
}

interface MobileCardProps<TData extends BaseTableData> {
    row: any;
    columns: any[];
    primaryFields?: string[];
    secondaryFields?: string[];
    showExpandButton?: boolean;
    compactMode?: boolean;
    onRowClick?: (row: TData, index: number) => void;
    onRowDoubleClick?: (row: TData, index: number) => void;
    onCellClick?: (cell: any, row: TData) => void;
}

function MobileCard<TData extends BaseTableData>({
    row,
    primaryFields = [],
    secondaryFields = [],
    showExpandButton = true,
    compactMode = false,
    onRowClick,
    onRowDoubleClick,
    onCellClick,
}: MobileCardProps<TData>) {
    const theme = useTheme();
    const [expanded, setExpanded] = useState(false);

    const data = row.original;
    const cells = row.getVisibleCells() as any[];

    // Organize fields into primary, secondary, and remaining
    const fieldGroups = useMemo(() => {
        const primary: any[] = [];
        const secondary: any[] = [];
        const remaining: any[] = [];

        cells.forEach((cell: any) => {
            const columnId = cell.column.id;
            const columnMeta = cell.column.columnDef.meta;

            // Skip selection and action columns in card view
            if (
                columnMeta?.type === 'selection' ||
                columnMeta?.type === 'actions'
            ) {
                return;
            }

            if (primaryFields.includes(columnId)) {
                primary.push(cell);
            } else if (secondaryFields.includes(columnId)) {
                secondary.push(cell);
            } else {
                remaining.push(cell);
            }
        });

        return { primary, secondary, remaining };
    }, [cells, primaryFields, secondaryFields]);

    const renderCellValue = (cell: any) => {
        const cellValue = cell.getValue();
        const columnMeta = cell.column.columnDef.meta;

        if (columnMeta?.type === 'avatar' && cellValue) {
            const { src, name, size = 'medium', showName = false } = cellValue;
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar
                        src={src}
                        sx={{
                            width:
                                size === 'small'
                                    ? 32
                                    : size === 'large'
                                      ? 48
                                      : 40,
                            height:
                                size === 'small'
                                    ? 32
                                    : size === 'large'
                                      ? 48
                                      : 40,
                            fontSize:
                                size === 'small'
                                    ? '0.875rem'
                                    : size === 'large'
                                      ? '1.25rem'
                                      : '1rem',
                        }}
                    >
                        {!src && name ? (
                            name.charAt(0).toUpperCase()
                        ) : (
                            <Person />
                        )}
                    </Avatar>
                    {showName && name && (
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {name}
                        </Typography>
                    )}
                </Box>
            );
        }

        if (columnMeta?.type === 'status' && cellValue) {
            const { value, color } = cellValue;
            return (
                <Chip
                    label={value}
                    size="small"
                    color={color}
                    variant="outlined"
                    sx={{ fontWeight: 500 }}
                />
            );
        }

        if (columnMeta?.type === 'boolean' && cellValue !== undefined) {
            const { value, boolean, showIcons = false } = cellValue;
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {showIcons &&
                        (boolean ? (
                            <Check color="success" fontSize="small" />
                        ) : (
                            <Close color="error" fontSize="small" />
                        ))}
                    <Typography
                        variant="body2"
                        sx={{
                            color: boolean ? 'success.main' : 'error.main',
                            fontWeight: 500,
                        }}
                    >
                        {value}
                    </Typography>
                </Box>
            );
        }

        if (cellValue === null || cellValue === undefined) {
            return (
                <Typography variant="body2" color="text.disabled">
                    —
                </Typography>
            );
        }

        return (
            <Typography
                variant="body2"
                sx={{
                    wordBreak: 'break-word',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: compactMode ? 1 : 2,
                    WebkitBoxOrient: 'vertical',
                }}
            >
                {String(cellValue)}
            </Typography>
        );
    };

    const renderField = (cell: any, isSecondary = false) => {
        const columnHeader = cell.column.columnDef.header;
        const label =
            typeof columnHeader === 'string' ? columnHeader : cell.column.id;

        return (
            <Box
                key={cell.id}
                sx={{
                    display: 'flex',
                    flexDirection: isSecondary ? 'row' : 'column',
                    gap: isSecondary ? 1 : 0.5,
                    alignItems: isSecondary ? 'center' : 'flex-start',
                }}
                onClick={e => {
                    if (onCellClick) {
                        e.stopPropagation();
                        onCellClick(cell, data);
                    }
                }}
            >
                <Typography
                    variant={isSecondary ? 'caption' : 'subtitle2'}
                    color="text.secondary"
                    sx={{
                        fontWeight: 500,
                        minWidth: isSecondary ? 80 : undefined,
                        flexShrink: 0,
                    }}
                >
                    {label}:
                </Typography>
                {renderCellValue(cell)}
            </Box>
        );
    };

    // Get actions from columns
    const actionCells = cells.filter(
        (cell: any) => cell.column.columnDef.meta?.type === 'actions'
    );
    const selectionCells = cells.filter(
        (cell: any) => cell.column.columnDef.meta?.type === 'selection'
    );

    return (
        <Card
            elevation={1}
            sx={{
                mb: 2,
                cursor: onRowClick ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
                '&:hover': {
                    elevation: 2,
                    ...(onRowClick && {
                        transform: 'translateY(-1px)',
                        boxShadow: theme.shadows[4],
                    }),
                },
                ...(row.getIsSelected() && {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    borderColor: 'primary.main',
                }),
            }}
            onClick={_ => {
                if (onRowClick) {
                    onRowClick(data, row.index);
                }
            }}
            onDoubleClick={_ => {
                if (onRowDoubleClick) {
                    onRowDoubleClick(data, row.index);
                }
            }}
        >
            <CardContent
                sx={{
                    pb: compactMode ? 1 : 2,
                    '&:last-child': { pb: compactMode ? 1 : 2 },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    {/* Selection checkbox */}
                    {selectionCells.length > 0 && (
                        <Box sx={{ mt: 0.5 }}>
                            <Checkbox
                                checked={row.getIsSelected()}
                                indeterminate={row.getIsSomeSelected()}
                                onChange={row.getToggleSelectedHandler()}
                                disabled={!row.getCanSelect()}
                                size="small"
                                onClick={e => e.stopPropagation()}
                            />
                        </Box>
                    )}

                    {/* Main content */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        {/* Primary fields */}
                        {fieldGroups.primary.length > 0 && (
                            <Stack
                                spacing={compactMode ? 1 : 1.5}
                                sx={{ mb: compactMode ? 1 : 2 }}
                            >
                                {fieldGroups.primary.map(cell =>
                                    renderField(cell, false)
                                )}
                            </Stack>
                        )}

                        {/* Secondary fields */}
                        {fieldGroups.secondary.length > 0 && (
                            <Box sx={{ mb: compactMode ? 0.5 : 1 }}>
                                <Stack spacing={compactMode ? 0.5 : 1}>
                                    {fieldGroups.secondary.map(cell =>
                                        renderField(cell, true)
                                    )}
                                </Stack>
                            </Box>
                        )}

                        {/* Expandable content */}
                        {fieldGroups.remaining.length > 0 &&
                            showExpandButton && (
                                <>
                                    <Collapse in={expanded}>
                                        <Box
                                            sx={{
                                                mt: 1,
                                                pt: 1,
                                                borderTop: `1px solid ${theme.palette.divider}`,
                                            }}
                                        >
                                            <Stack spacing={1}>
                                                {fieldGroups.remaining.map(
                                                    cell =>
                                                        renderField(cell, true)
                                                )}
                                            </Stack>
                                        </Box>
                                    </Collapse>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            mt: 1,
                                        }}
                                    >
                                        <Button
                                            size="small"
                                            onClick={e => {
                                                e.stopPropagation();
                                                setExpanded(!expanded);
                                            }}
                                            endIcon={
                                                expanded ? (
                                                    <ExpandLessIcon />
                                                ) : (
                                                    <ExpandMoreIcon />
                                                )
                                            }
                                            sx={{ textTransform: 'none' }}
                                        >
                                            {expanded
                                                ? 'Show Less'
                                                : `Show ${fieldGroups.remaining.length} More`}
                                        </Button>
                                    </Box>
                                </>
                            )}
                    </Box>

                    {/* Actions */}
                    {actionCells.length > 0 && (
                        <Box sx={{ flexShrink: 0 }}>
                            {actionCells.map(cell => {
                                const cellValue = cell.getValue();
                                if (cellValue?.actions) {
                                    return (
                                        <Box
                                            key={cell.id}
                                            sx={{ display: 'flex', gap: 0.5 }}
                                        >
                                            {cellValue.actions
                                                .filter(
                                                    (action: any) =>
                                                        !action.hidden
                                                )
                                                .slice(0, 2) // Show only first 2 actions on mobile
                                                .map(
                                                    (
                                                        action: any,
                                                        index: number
                                                    ) => (
                                                        <Tooltip
                                                            key={index}
                                                            title={action.label}
                                                        >
                                                            <span>
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={e => {
                                                                        e.stopPropagation();
                                                                        action.onClick();
                                                                    }}
                                                                    disabled={
                                                                        action.disabled
                                                                    }
                                                                    sx={{
                                                                        color: action.color
                                                                            ? `${action.color}.main`
                                                                            : 'primary.main',
                                                                    }}
                                                                >
                                                                    {action.icon || (
                                                                        <MoreIcon />
                                                                    )}
                                                                </IconButton>
                                                            </span>
                                                        </Tooltip>
                                                    )
                                                )}
                                        </Box>
                                    );
                                }
                                return null;
                            })}
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}

export function MobileDataTable<TData extends BaseTableData>({
    // cardElevation = 1,
    // cardSpacing = 2,
    showExpandButton = true,
    primaryFields = [],
    secondaryFields = [],
    compactMode = false,
    ...props
}: MobileDataTableProps<TData>) {
    const theme = useTheme();
    const {
        toolbar = { enabled: true },
        onRowClick,
        onRowDoubleClick,
        onCellClick,
        emptyMessage,
        className,
        sx,
    } = props;

    const { table, state, actions, computed } = useDataTable(props);

    // Loading state
    if (state.isLoading && table.getRowModel().rows.length === 0) {
        return (
            <Box className={className} sx={sx}>
                {toolbar.enabled && (
                    <TableToolbar
                        table={table}
                        state={state}
                        actions={actions}
                        computed={computed}
                        config={toolbar}
                        filters={props.filters}
                    />
                )}
                <TableSkeleton
                    rows={5}
                    columns={3}
                    showHeader={false}
                    showToolbar={false}
                />
            </Box>
        );
    }

    // Error state
    if (state.error) {
        return (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography color="error" variant="h6" gutterBottom>
                    Error Loading Data
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {typeof state.error === 'string'
                        ? state.error
                        : 'An unexpected error occurred'}
                </Typography>
                <Button
                    variant="outlined"
                    onClick={actions.refresh}
                    sx={{ mt: 2 }}
                >
                    Retry
                </Button>
            </Paper>
        );
    }

    // Empty state
    if (!state.isLoading && table.getRowModel().rows.length === 0) {
        return (
            <Box className={className} sx={sx}>
                {toolbar.enabled && (
                    <TableToolbar
                        table={table}
                        state={state}
                        actions={actions}
                        computed={computed}
                        config={toolbar}
                        filters={props.filters}
                    />
                )}
                <EmptyState
                    title="No Data Available"
                    description={
                        (emptyMessage as string) ||
                        'There are no records to display.'
                    }
                    onReset={
                        computed.activeFilters.length > 0
                            ? () => {
                                  actions.setColumnFilters([]);
                                  actions.setGlobalFilter('');
                              }
                            : undefined
                    }
                />
            </Box>
        );
    }

    return (
        <Box className={className} sx={sx}>
            {/* Toolbar */}
            {toolbar.enabled && (
                <TableToolbar
                    table={table}
                    state={state}
                    actions={actions}
                    computed={computed}
                    config={toolbar}
                    filters={props.filters}
                />
            )}

            {/* Active Filters Display */}
            {computed.activeFilters.length > 0 && (
                <TableFilters
                    activeFilters={computed.activeFilters}
                    onClearFilter={column => {
                        if (column === 'all') {
                            actions.setGlobalFilter('');
                        } else {
                            const newFilters = state.columnFilters.filter(
                                f => f.id !== column
                            );
                            actions.setColumnFilters(newFilters);
                        }
                    }}
                    onClearAllFilters={() => {
                        actions.setColumnFilters([]);
                        actions.setGlobalFilter('');
                    }}
                />
            )}

            {/* Cards Container */}
            <Box sx={{ p: 2 }}>
                {/* Selection summary */}
                {computed.selectedRows.length > 0 && (
                    <Box
                        sx={{
                            mb: 2,
                            p: 2,
                            backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.08
                            ),
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            variant="body2"
                            color="primary.main"
                            sx={{ fontWeight: 500 }}
                        >
                            {computed.selectedRows.length} item
                            {computed.selectedRows.length === 1 ? '' : 's'}{' '}
                            selected
                        </Typography>
                        <Button
                            size="small"
                            onClick={() => actions.setRowSelection({})}
                            sx={{ textTransform: 'none' }}
                        >
                            Clear Selection
                        </Button>
                    </Box>
                )}

                {/* Cards */}
                {table.getRowModel().rows.map(row => (
                    <MobileCard
                        key={row.id}
                        row={row}
                        columns={props.columns}
                        primaryFields={primaryFields}
                        secondaryFields={secondaryFields}
                        showExpandButton={showExpandButton}
                        compactMode={compactMode}
                        onRowClick={onRowClick}
                        onRowDoubleClick={onRowDoubleClick}
                        onCellClick={onCellClick}
                    />
                ))}

                {/* Loading more indicator */}
                {state.isLoading && table.getRowModel().rows.length > 0 && (
                    <Box sx={{ textAlign: 'center', py: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                            Loading more data...
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* Pagination */}
            {props.pagination?.enabled !== false && (
                <TablePagination
                    table={table}
                    state={state}
                    actions={actions}
                    computed={computed}
                    config={props.pagination}
                />
            )}
        </Box>
    );
}

export default MobileDataTable;
