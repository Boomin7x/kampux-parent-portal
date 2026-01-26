import {
    alpha,
    Box,
    Paper,
    TableContainer,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { InfiniteLoader } from 'react-window-infinite-loader';
import type { ListChildComponentProps } from 'react-window';

import { useDataTable } from '../hooks/useDataTable';
import type { BaseTableData, DataTableProps } from '../types/table.types';
import { EmptyState } from './EmptyState';
import { TableFilters } from './TableFilters';
import { TableToolbar } from './TableToolbar';

interface VirtualizedDataTableProps<
    TData extends BaseTableData,
> extends DataTableProps<TData> {
    itemHeight?: number;
    overscan?: number;
    enableInfiniteLoading?: boolean;
    hasNextPage?: boolean;
    isNextPageLoading?: boolean;
    loadNextPage?: () => Promise<void>;
}

interface VirtualRowProps extends ListChildComponentProps {
    data: {
        rows: any[];
        columns: any[];
        visibleColumns: any[];
        onRowClick?: (row: any, index: number) => void;
        onRowDoubleClick?: (row: any, index: number) => void;
        onCellClick?: (cell: any, row: any) => void;
        rowHeight: number;
        cellPadding: number;
        striped: boolean;
        hoverable: boolean;
        renderCell: (cell: any, row: any) => React.ReactNode;
        theme: any;
    };
}

const VirtualRow = React.memo(({ index, style, data }: VirtualRowProps) => {
    const {
        rows,
        onRowClick,
        onRowDoubleClick,
        onCellClick,
        striped,
        hoverable,
        renderCell,
        theme,
        cellPadding,
    } = data;

    const row = rows[index];
    if (!row) return null;

    return (
        <Box
            style={{
                ...style,
                display: 'flex',
                alignItems: 'stretch',
            }}
            sx={{
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                ...(striped &&
                    index % 2 === 1 && {
                        backgroundColor: alpha(theme.palette.action.hover, 0.3),
                    }),
                ...(hoverable && {
                    '&:hover': {
                        backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.08
                        ),
                        cursor: onRowClick ? 'pointer' : 'default',
                    },
                }),
                ...(row.getIsSelected() && {
                    backgroundColor: alpha(theme.palette.primary.main, 0.12),
                }),
            }}
            onClick={e => {
                if (onRowClick) {
                    onRowClick(row.original, row.index);
                }
            }}
            onDoubleClick={e => {
                if (onRowDoubleClick) {
                    onRowDoubleClick(row.original, row.index);
                }
            }}
        >
            {row.getVisibleCells().map((cell: any) => {
                const columnMeta = cell.column.columnDef.meta;
                const column = cell.column;
                const width = column.getSize();

                return (
                    <Box
                        key={cell.id}
                        sx={{
                            width,
                            minWidth: width,
                            maxWidth: width,
                            display: 'flex',
                            alignItems: 'center',
                            px: cellPadding,
                            py: cellPadding,
                            textAlign: columnMeta?.align || 'left',
                            overflow: 'hidden',
                            borderRight: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                            '&:last-child': {
                                borderRight: 'none',
                            },
                        }}
                        onClick={e => {
                            if (onCellClick) {
                                e.stopPropagation();
                                onCellClick(cell, row.original);
                            }
                        }}
                    >
                        {renderCell(cell, row)}
                    </Box>
                );
            })}
        </Box>
    );
});

VirtualRow.displayName = 'VirtualRow';

const VirtualHeader = React.memo(
    ({
        table,
        theme,
        cellPadding,
    }: {
        table: any;
        theme: any;
        cellPadding: number;
    }) => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'stretch',
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    borderBottom: `2px solid ${theme.palette.divider}`,
                    fontWeight: 600,
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                }}
            >
                {table.getHeaderGroups()[0]?.headers.map((header: any) => {
                    const columnMeta = header.column.columnDef.meta;
                    const canSort = header.column.getCanSort();
                    const sortDirection = header.column.getIsSorted();
                    const width = header.getSize();

                    return (
                        <Box
                            key={header.id}
                            sx={{
                                width,
                                minWidth: width,
                                maxWidth: width,
                                display: 'flex',
                                alignItems: 'center',
                                px: cellPadding,
                                py: cellPadding,
                                textAlign: columnMeta?.align || 'left',
                                borderRight: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                                '&:last-child': {
                                    borderRight: 'none',
                                },
                                ...(canSort && {
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                    '&:hover': {
                                        backgroundColor: alpha(
                                            theme.palette.primary.main,
                                            0.1
                                        ),
                                    },
                                }),
                            }}
                            onClick={
                                canSort
                                    ? header.column.getToggleSortingHandler()
                                    : undefined
                            }
                        >
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    flex: 1,
                                }}
                            >
                                {header.isPlaceholder
                                    ? null
                                    : typeof header.column.columnDef.header ===
                                        'string'
                                      ? header.column.columnDef.header
                                      : 'Column'}
                            </Typography>

                            {canSort && (
                                <Box
                                    sx={{
                                        ml: 1,
                                        opacity: sortDirection ? 1 : 0.5,
                                    }}
                                >
                                    {sortDirection === 'asc'
                                        ? '↑'
                                        : sortDirection === 'desc'
                                          ? '↓'
                                          : '↕'}
                                </Box>
                            )}
                        </Box>
                    );
                })}
            </Box>
        );
    }
);

VirtualHeader.displayName = 'VirtualHeader';

export function VirtualizedDataTable<TData extends BaseTableData>(
    props: VirtualizedDataTableProps<TData>
) {
    const theme = useTheme();
    const {
        styling = {},
        toolbar = { enabled: true },
        onRowClick,
        onRowDoubleClick,
        onCellClick,
        emptyMessage,
        className,
        sx,
        itemHeight = 52,
        overscan = 5,
        enableInfiniteLoading = false,
        hasNextPage = false,
        isNextPageLoading = false,
        loadNextPage,
    } = props;

    const {
        density = 'standard',
        striped = true,
        hoverable = true,
        maxHeight = 600,
    } = styling;

    const { table, state, actions, computed } = useDataTable(props);

    // Calculate row height based on density
    const rowHeight = useMemo(() => {
        if (typeof itemHeight === 'number') return itemHeight;
        switch (density) {
            case 'compact':
                return 40;
            case 'comfortable':
                return 64;
            default:
                return 52;
        }
    }, [density, itemHeight]);

    // Calculate cell padding based on density
    const cellPadding = useMemo(() => {
        switch (density) {
            case 'compact':
                return 1;
            case 'comfortable':
                return 2;
            default:
                return 1.5;
        }
    }, [density]);

    // Cell renderer function
    const renderCell = useCallback((cell: any, row: any) => {
        const cellValue = cell.getValue();
        const columnMeta = cell.column.columnDef.meta;

        // Handle different cell types
        if (columnMeta?.type === 'selection') {
            return (
                <input
                    type="checkbox"
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                    disabled={!row.getCanSelect()}
                />
            );
        }

        // For virtualized tables, we keep cell rendering simple for performance
        if (cellValue === null || cellValue === undefined) {
            return '-';
        }

        if (typeof cellValue === 'boolean') {
            return cellValue ? 'Yes' : 'No';
        }

        if (typeof cellValue === 'object' && cellValue.value !== undefined) {
            return cellValue.value;
        }

        return String(cellValue);
    }, []);

    const rows = table.getRowModel().rows;
    const totalHeight = typeof maxHeight === 'number' ? maxHeight : 600;
    const headerHeight = 48;
    const listHeight = totalHeight - headerHeight;

    // Infinite loading setup
    const itemCount = enableInfiniteLoading
        ? hasNextPage
            ? rows.length + 1
            : rows.length
        : rows.length;

    const isItemLoaded = useCallback(
        (index: number) => {
            return !!rows[index];
        },
        [rows]
    );

    const loadMoreItems = useCallback(async () => {
        if (loadNextPage && !isNextPageLoading) {
            await loadNextPage();
        }
    }, [loadNextPage, isNextPageLoading]);

    // Prepare data for virtual rows
    const virtualRowData = useMemo(
        () => ({
            rows,
            columns: props.columns,
            visibleColumns: table
                .getAllColumns()
                .filter(col => col.getIsVisible()),
            onRowClick,
            onRowDoubleClick,
            onCellClick,
            rowHeight,
            cellPadding,
            striped,
            hoverable,
            renderCell,
            theme,
        }),
        [
            rows,
            props.columns,
            table,
            onRowClick,
            onRowDoubleClick,
            onCellClick,
            rowHeight,
            cellPadding,
            striped,
            hoverable,
            renderCell,
            theme,
        ]
    );

    // Empty state
    if (!state.isLoading && rows.length === 0) {
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
                        emptyMessage || 'There are no records to display.'
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

    const ListComponent = enableInfiniteLoading ? (
        <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems}
        >
            {({ onItemsRendered, ref }) => (
                <List
                    ref={ref}
                    height={listHeight}
                    itemCount={itemCount}
                    itemSize={rowHeight}
                    itemData={virtualRowData}
                    overscanCount={overscan}
                    onItemsRendered={onItemsRendered}
                    style={{
                        overflow: 'auto',
                    }}
                >
                    {VirtualRow}
                </List>
            )}
        </InfiniteLoader>
    ) : (
        <List
            height={listHeight}
            itemCount={rows.length}
            itemSize={rowHeight}
            itemData={virtualRowData}
            overscanCount={overscan}
            style={{
                overflow: 'auto',
            }}
        >
            {VirtualRow}
        </List>
    );

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

            {/* Virtualized Table Container */}
            <TableContainer
                component={Paper}
                sx={{
                    height: totalHeight,
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                {/* Header */}
                <VirtualHeader
                    table={table}
                    theme={theme}
                    cellPadding={cellPadding}
                />

                {/* Virtualized Body */}
                <Box sx={{ height: listHeight }}>{ListComponent}</Box>

                {/* Loading indicator for infinite loading */}
                {enableInfiniteLoading && isNextPageLoading && (
                    <Box
                        sx={{
                            p: 2,
                            textAlign: 'center',
                            backgroundColor: alpha(
                                theme.palette.background.paper,
                                0.9
                            ),
                            borderTop: `1px solid ${theme.palette.divider}`,
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            Loading more data...
                        </Typography>
                    </Box>
                )}
            </TableContainer>
        </Box>
    );
}

export default VirtualizedDataTable;
