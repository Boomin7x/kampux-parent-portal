import {
    getCoreRowModel,
    getExpandedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnFiltersState,
    type PaginationState,
    type RowSelectionState,
    type SortingState,
    type VisibilityState,
} from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type {
    ActiveFilter,
    BaseTableData,
    DataTableProps,
    ExportFormat,
    TableColumn,
    UseDataTableReturn,
} from '../types/table.types';
import { exportTableData } from '../utils/exportHelpers';
import { filterStateManager } from '../utils/filterHelpers';

export function useDataTable<TData extends BaseTableData>(
    props: DataTableProps<TData>
): UseDataTableReturn<TData> {
    const {
        data,
        columns,
        serverSide,
        enableSearch = false,
        enableFilters = false,
        enableSorting = true,
        enableColumnResizing = false,
        // enableColumnOrdering= false,
        enableHiding = true,
        enablePinning = false,
        filters: customFilters = [],
        pagination: paginationConfig = { enabled: true },
        selection: selectionConfig = { enabled: false },
        initialSorting = [],
        initialFilters = [],
        initialPagination = { pageIndex: 0, pageSize: 10 },
        initialColumnVisibility = {},
        initialRowSelection = {},
        loading = false,
        error = null,
        debugTable = false,
    } = props;

    // ====================
    // Internal State
    // ====================

    const [sorting, setSorting] = useState<SortingState>(initialSorting);
    const [columnFilters, setColumnFilters] =
        useState<ColumnFiltersState>(initialFilters);
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        initialColumnVisibility
    );
    const [rowSelection, setRowSelection] =
        useState<RowSelectionState>(initialRowSelection);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: initialPagination.pageIndex || 0,
        pageSize: initialPagination.pageSize || paginationConfig.pageSize || 10,
    });

    // ====================
    // Server-side Effect Handlers
    // ====================

    useEffect(() => {
        if (serverSide?.enabled && serverSide.onSortingChange) {
            serverSide.onSortingChange(sorting);
        }
    }, [sorting, serverSide]);

    useEffect(() => {
        if (serverSide?.enabled && serverSide.onFiltersChange) {
            serverSide.onFiltersChange(columnFilters);
        }
    }, [columnFilters, serverSide]);

    useEffect(() => {
        if (serverSide?.enabled && serverSide.onPaginationChange) {
            serverSide.onPaginationChange(pagination);
        }
    }, [pagination, serverSide]);

    useEffect(() => {
        if (serverSide?.enabled && serverSide.onSearchChange) {
            serverSide.onSearchChange(globalFilter);
        }
    }, [globalFilter, serverSide]);

    useEffect(() => {
        if (serverSide?.enabled && serverSide.onColumnVisibilityChange) {
            serverSide.onColumnVisibilityChange(columnVisibility);
        }
    }, [columnVisibility, serverSide]);

    // ====================
    // Column Configuration
    // ====================

    const tableColumns = useMemo<TableColumn<TData>[]>(() => {
        const processedColumns = [...columns];

        // Add selection column if enabled
        if (selectionConfig.enabled) {
            const selectionColumn: TableColumn<TData> = {
                id: 'selection',
                header: ({ table }) =>
                    table.getIsAllRowsSelected()
                        ? 'Deselect All'
                        : table.getIsSomeRowsSelected()
                          ? 'Select All'
                          : 'Select All',
                cell: ({ row }) => row.getIsSelected(),
                size: 48,
                enableSorting: false,
                enableColumnFilter: false,
                enableGlobalFilter: false,
                enableHiding: false,
                enableResizing: false,
                meta: { type: 'selection' },
            };
            processedColumns.unshift(selectionColumn);
        }

        // Set default sizes and options
        return processedColumns.map(col => ({
            enableSorting: enableSorting && col.sortable !== false,
            enableColumnFilter: enableFilters && col.filterable !== false,
            enableGlobalFilter: enableSearch && col.searchable !== false,
            enableHiding: enableHiding && col.hideable !== false,
            enableResizing: enableColumnResizing && col.resizable !== false,
            size: col.width || 150,
            minSize: col.minWidth || 60,
            maxSize: col.maxWidth || 400,
            ...col,
        }));
    }, [
        columns,
        selectionConfig.enabled,
        enableSorting,
        enableFilters,
        enableSearch,
        enableHiding,
        enableColumnResizing,
    ]);

    // ====================
    // Table Instance
    // ====================

    const table = useReactTable({
        data,
        columns: tableColumns,
        state: {
            sorting,
            columnFilters,
            globalFilter,
            columnVisibility,
            rowSelection,
            pagination,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: serverSide?.enabled
            ? undefined
            : getFilteredRowModel(),
        getPaginationRowModel: serverSide?.enabled
            ? undefined
            : getPaginationRowModel(),
        getSortedRowModel: serverSide?.enabled
            ? undefined
            : getSortedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        enableRowSelection: selectionConfig.enabled,
        enableColumnResizing: enableColumnResizing,
        // enableColumnFilters
        // enableColumnOrdering: enableColumnOrdering,
        enableMultiSort: true,
        enableSortingRemoval: true,
        enableColumnPinning: enablePinning,
        manualFiltering: serverSide?.enabled,
        manualPagination: serverSide?.enabled,
        manualSorting: serverSide?.enabled,
        pageCount: serverSide?.enabled
            ? Math.ceil((serverSide.totalCount || 0) / pagination.pageSize)
            : undefined,
        autoResetPageIndex: false,
        autoResetExpanded: false,
        // autoResetRowSelection: false,
        debugTable: debugTable,
        meta: {
            updateData: (
                rowIndex: number,
                columnId: string,
                value: unknown
            ) => {
                // This would be used for inline editing
                console.log('Update data:', { rowIndex, columnId, value });
            },
        },
    });

    // ====================
    // Action Handlers
    // ====================

    const resetTable = useCallback(() => {
        setSorting(initialSorting);
        setColumnFilters(initialFilters);
        setGlobalFilter('');
        setColumnVisibility(initialColumnVisibility);
        setRowSelection(initialRowSelection);
        setPagination({
            pageIndex: initialPagination.pageIndex || 0,
            pageSize: initialPagination.pageSize || 10,
        });
    }, [
        initialSorting,
        initialFilters,
        initialColumnVisibility,
        initialRowSelection,
        initialPagination,
    ]);

    const exportData = useCallback(
        (format: ExportFormat) => {
            const visibleColumns = table
                .getAllColumns()
                .filter(col => col.getIsVisible() && col.id !== 'selection')
                .map(col => columns.find(c => c.id === col.id)!)
                .filter(Boolean);

            const filteredData = serverSide?.enabled
                ? data // Server-side should already be filtered
                : table.getFilteredRowModel().rows.map(row => row.original);

            exportTableData(filteredData, visibleColumns, format, {
                filename: `table_export_${
                    new Date().toISOString().split('T')[0]
                }`,
                includeHeaders: true,
            });
        },
        [table, columns, data, serverSide?.enabled]
    );

    const refresh = useCallback(() => {
        if (serverSide?.enabled && props.serverSide?.onPaginationChange) {
            // Trigger a refresh by calling the pagination handler with current state
            props.serverSide.onPaginationChange(pagination);
        }
        // For client-side, data is controlled by parent component
    }, [serverSide?.enabled, props.serverSide, pagination]);

    // ====================
    // Computed Values
    // ====================

    const visibleColumns = useMemo(() => {
        return table.getAllColumns().filter(col => col.getIsVisible());
    }, [table]);

    const selectedRows = useMemo(() => {
        return table.getSelectedRowModel().rows.map(row => row.original);
    }, [table]);

    const filteredRowCount = useMemo(() => {
        return serverSide?.enabled
            ? serverSide.totalCount || 0
            : table.getFilteredRowModel().rows.length;
    }, [table, serverSide?.enabled, serverSide?.totalCount]);

    const totalRowCount = useMemo(() => {
        return serverSide?.enabled ? serverSide.totalCount || 0 : data.length;
    }, [data.length, serverSide?.enabled, serverSide?.totalCount]);

    const pageCount = useMemo(() => {
        return Math.ceil(filteredRowCount / pagination.pageSize);
    }, [filteredRowCount, pagination.pageSize]);

    const canPreviousPage = useMemo(() => {
        return pagination.pageIndex > 0;
    }, [pagination.pageIndex]);

    const canNextPage = useMemo(() => {
        return pagination.pageIndex < pageCount - 1;
    }, [pagination.pageIndex, pageCount]);

    const activeFilters = useMemo((): ActiveFilter[] => {
        const globalFilterActive = globalFilter
            ? [
                  {
                      id: 'global',
                      column: 'all',
                      type: 'text' as const,
                      value: globalFilter,
                      label: 'Search',
                      displayValue: `"${globalFilter}"`,
                  },
              ]
            : [];

        const columnFilterMap = columnFilters.reduce(
            (acc, filter) => {
                acc[filter.id] = filter.value;
                return acc;
            },
            {} as Record<string, any>
        );

        const columnFilterActive = filterStateManager.getActiveFilters(
            columnFilterMap,
            customFilters
        );

        return [...globalFilterActive, ...columnFilterActive];
    }, [globalFilter, columnFilters, customFilters]);

    // ====================
    // Return API
    // ====================

    return {
        table,
        state: {
            sorting,
            columnFilters,
            pagination,
            columnVisibility,
            rowSelection,
            globalFilter,
            isLoading: loading || serverSide?.loading || false,
            error: (error as string) || serverSide?.error || null,
        },
        actions: {
            setSorting,
            setColumnFilters,
            setPagination,
            setColumnVisibility,
            setRowSelection,
            setGlobalFilter,
            resetTable,
            exportData,
            refresh,
        },
        computed: {
            visibleColumns,
            selectedRows,
            filteredRowCount,
            totalRowCount,
            pageCount,
            canPreviousPage,
            canNextPage,
            activeFilters,
        },
    };
}

// ====================
// Specialized Hooks
// ====================

export function useServerSideDataTable<TData extends BaseTableData>(
    props: DataTableProps<TData> & {
        serverSide: NonNullable<DataTableProps<TData>['serverSide']>;
    }
): UseDataTableReturn<TData> {
    return useDataTable({
        ...props,
        serverSide: {
            ...props.serverSide,
            enabled: true,
        },
    });
}

export function useClientSideDataTable<TData extends BaseTableData>(
    props: Omit<DataTableProps<TData>, 'serverSide'>
): UseDataTableReturn<TData> {
    return useDataTable({
        ...props,
        serverSide: { enabled: false, totalCount: props.data.length },
    });
}

// ====================
// Table State Utilities
// ====================

export const tableStateUtils = {
    /**
     * Serializes table state for persistence
     */
    serializeState: (state: UseDataTableReturn<any>['state']) => {
        return JSON.stringify({
            sorting: state.sorting,
            columnFilters: state.columnFilters,
            pagination: state.pagination,
            columnVisibility: state.columnVisibility,
            globalFilter: state.globalFilter,
        });
    },

    /**
     * Deserializes table state from persistence
     */
    deserializeState: (serializedState: string) => {
        try {
            return JSON.parse(serializedState);
        } catch {
            return null;
        }
    },

    /**
     * Creates a state key for persistence
     */
    createStateKey: (tableId: string, userId?: string) => {
        return `datatable_${tableId}${userId ? `_${userId}` : ''}`;
    },

    /**
     * Saves table state to localStorage
     */
    saveStateToStorage: (
        tableId: string,
        state: UseDataTableReturn<any>['state'],
        userId?: string
    ) => {
        const key = tableStateUtils.createStateKey(tableId, userId);
        const serialized = tableStateUtils.serializeState(state);
        localStorage.setItem(key, serialized);
    },

    /**
     * Loads table state from localStorage
     */
    loadStateFromStorage: (tableId: string, userId?: string) => {
        const key = tableStateUtils.createStateKey(tableId, userId);
        const serialized = localStorage.getItem(key);
        return serialized ? tableStateUtils.deserializeState(serialized) : null;
    },
};
