import {
    Check,
    Close,
    ExpandLess,
    ExpandMore,
    KeyboardArrowRight,
    Person,
    UnfoldMore,
} from '@mui/icons-material';
import {
    alpha,
    Avatar,
    Box,
    Button,
    Checkbox,
    Chip,
    IconButton,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import { flexRender } from '@tanstack/react-table';
import { useMemo } from 'react';

import { EmptyState } from './components/EmptyState';
import { TableFilters } from './components/TableFilters';
import { TablePagination } from './components/TablePagination';
import { TableSkeleton } from './components/TableSkeleton';
import { TableToolbar } from './components/TableToolbar';
import { useDataTable } from './hooks/useDataTable';
import type { BaseTableData, DataTableProps } from './types/table.types';

export function DataTable<TData extends BaseTableData>(
    props: DataTableProps<TData>
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
    } = props;

    const {
        density = 'standard',
        striped = true,
        bordered = false,
        hoverable = true,
        stickyHeader = false,
        maxHeight,
    } = styling;

    const { table, state, actions, computed } = useDataTable(props);

    // ====================
    // Cell Renderers
    // ====================

    const renderCell = (cell: any, row: any) => {
        const cellValue = cell.getValue();
        const columnMeta = cell.column.columnDef.meta;

        // Handle different cell types
        if (columnMeta?.type === 'selection') {
            return (
                <Checkbox
                    checked={row.getIsSelected()}
                    indeterminate={row.getIsSomeSelected()}
                    onChange={row.getToggleSelectedHandler()}
                    disabled={!row.getCanSelect()}
                    size="small"
                />
            );
        }

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
                            <Check color="success" />
                        ) : (
                            <Close color="error" />
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

        if (columnMeta?.type === 'actions' && cellValue) {
            const { actions: actionList } = cellValue;
            return (
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {actionList
                        .filter((action: any) => !action.hidden)
                        .map((action: any, index: number) => (
                            <Tooltip key={index} title={action.label}>
                                <span>
                                    <IconButton
                                        size="small"
                                        onClick={e => {
                                            e.stopPropagation();
                                            action.onClick();
                                        }}
                                        disabled={action.disabled}
                                        sx={{
                                            color: action.color
                                                ? `${action.color}.main`
                                                : 'primary.main',
                                        }}
                                    >
                                        {action.icon || <KeyboardArrowRight />}
                                    </IconButton>
                                </span>
                            </Tooltip>
                        ))}
                </Box>
            );
        }

        // Default cell rendering
        return flexRender(cell.column.columnDef.cell, cell.getContext());
    };

    // ====================
    // Style Calculations
    // ====================

    const rowHeight = useMemo(() => {
        switch (density) {
            case 'compact':
                return 40;
            case 'comfortable':
                return 64;
            default:
                return 52;
        }
    }, [density]);

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

    // ====================
    // Loading State
    // ====================

    if (state.isLoading && table.getRowModel().rows.length === 0) {
        return (
            <TableSkeleton rows={10} columns={table.getAllColumns().length} />
        );
    }

    // ====================
    // Error State
    // ====================

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

    // ====================
    // Empty State
    // ====================

    if (!state.isLoading && table.getRowModel().rows.length === 0) {
        return (
            <Box>
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

            {/* Table Container */}
            <TableContainer
                component={Paper}
                sx={{
                    maxHeight,
                    border: bordered
                        ? `1px solid ${theme.palette.divider}`
                        : 'none',
                    borderRadius: 2,
                    ...(!bordered && { boxShadow: 'none' }),
                }}
            >
                <Table
                    stickyHeader={stickyHeader}
                    size={density === 'compact' ? 'small' : 'medium'}
                    sx={{
                        '& .MuiTableCell-root': {
                            py: cellPadding,
                            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                        },
                        '& .MuiTableHead-root .MuiTableCell-root': {
                            fontWeight: 600,
                            backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.05
                            ),
                            borderBottom: `2px solid ${theme.palette.divider}`,
                        },
                        ...(striped && {
                            '& .MuiTableBody-root .MuiTableRow-root:nth-of-type(odd)':
                                {
                                    backgroundColor: alpha(
                                        theme.palette.action.hover,
                                        0.3
                                    ),
                                },
                        }),
                        ...(hoverable && {
                            '& .MuiTableBody-root .MuiTableRow-root:hover': {
                                backgroundColor: alpha(
                                    theme.palette.primary.main,
                                    0.08
                                ),
                            },
                        }),
                    }}
                >
                    {/* Table Header */}
                    <TableHead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    const columnMeta =
                                        header.column.columnDef.meta;
                                    const canSort = header.column.getCanSort();
                                    const sortDirection =
                                        header.column.getIsSorted();

                                    return (
                                        <TableCell
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            sx={{
                                                width: header.getSize(),
                                                minWidth:
                                                    header.column.columnDef
                                                        .minSize,
                                                maxWidth:
                                                    header.column.columnDef
                                                        .maxSize,
                                                textAlign:
                                                    (columnMeta as any)
                                                        ?.align || 'left',
                                                position: 'relative',
                                                userSelect: 'none',
                                                ...(canSort && {
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        backgroundColor: alpha(
                                                            theme.palette
                                                                .primary.main,
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
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                }}
                                            >
                                                {header.isPlaceholder ? null : (
                                                    <>
                                                        {flexRender(
                                                            header.column
                                                                .columnDef
                                                                .header,
                                                            header.getContext()
                                                        )}
                                                        {canSort && (
                                                            <Box
                                                                sx={{
                                                                    ml: 'auto',
                                                                }}
                                                            >
                                                                {sortDirection ===
                                                                'asc' ? (
                                                                    <ExpandLess fontSize="small" />
                                                                ) : sortDirection ===
                                                                  'desc' ? (
                                                                    <ExpandMore fontSize="small" />
                                                                ) : (
                                                                    <UnfoldMore
                                                                        fontSize="small"
                                                                        sx={{
                                                                            opacity: 0.5,
                                                                        }}
                                                                    />
                                                                )}
                                                            </Box>
                                                        )}
                                                    </>
                                                )}
                                            </Box>

                                            {/* Column Resizer */}
                                            {header.column.getCanResize() && (
                                                <Box
                                                    onMouseDown={header.getResizeHandler()}
                                                    onTouchStart={header.getResizeHandler()}
                                                    sx={{
                                                        position: 'absolute',
                                                        right: 0,
                                                        top: 0,
                                                        height: '100%',
                                                        width: 4,
                                                        cursor: 'col-resize',
                                                        backgroundColor:
                                                            'transparent',
                                                        '&:hover, &:active': {
                                                            backgroundColor:
                                                                'primary.main',
                                                        },
                                                    }}
                                                />
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHead>

                    {/* Table Body */}
                    <TableBody>
                        {state.isLoading
                            ? // Loading rows
                              Array.from({ length: 5 }).map((_, index) => (
                                  <TableRow key={`loading-${index}`}>
                                      {table.getAllColumns().map(column => (
                                          <TableCell key={column.id}>
                                              <Skeleton variant="text" />
                                          </TableCell>
                                      ))}
                                  </TableRow>
                              ))
                            : table.getRowModel().rows.map(row => (
                                  <TableRow
                                      key={row.id}
                                      selected={row.getIsSelected()}
                                      sx={{
                                          height: rowHeight,
                                          cursor: onRowClick
                                              ? 'pointer'
                                              : 'default',
                                          '&.Mui-selected': {
                                              backgroundColor: alpha(
                                                  theme.palette.primary.main,
                                                  0.12
                                              ),
                                          },
                                      }}
                                      onClick={() => {
                                          if (onRowClick) {
                                              onRowClick(
                                                  row.original,
                                                  row.index
                                              );
                                          }
                                      }}
                                      onDoubleClick={_ => {
                                          if (onRowDoubleClick) {
                                              onRowDoubleClick(
                                                  row.original,
                                                  row.index
                                              );
                                          }
                                      }}
                                  >
                                      {row.getVisibleCells().map(cell => {
                                          const columnMeta =
                                              cell.column.columnDef.meta;
                                          return (
                                              <TableCell
                                                  key={cell.id}
                                                  sx={{
                                                      textAlign:
                                                          (columnMeta as any)
                                                              ?.align || 'left',
                                                  }}
                                                  onClick={e => {
                                                      if (onCellClick) {
                                                          e.stopPropagation();
                                                          onCellClick(
                                                              cell,
                                                              row.original
                                                          );
                                                      }
                                                  }}
                                              >
                                                  {renderCell(cell, row)}
                                              </TableCell>
                                          );
                                      })}
                                  </TableRow>
                              ))}
                    </TableBody>
                </Table>
            </TableContainer>

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
