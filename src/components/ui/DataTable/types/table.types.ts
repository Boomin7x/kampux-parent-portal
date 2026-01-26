import type {
    ColumnDef,
    SortingState,
    ColumnFiltersState,
    VisibilityState,
    PaginationState,
    Table as TanStackTable,
    Row,
    Cell,
    Header,
    Column,
    RowSelectionState,
} from '@tanstack/react-table';
import type { ReactNode, ComponentType } from 'react';

// ====================
// Base Table Types
// ====================

export interface BaseTableData {
    id: string | number;
    [key: string]: any;
}

export interface TableColumn<TData extends BaseTableData = BaseTableData>
    extends Omit<ColumnDef<TData>, 'id'> {
    id: string;
    accessorKey?: keyof TData | string;
    title?: string;
    description?: string;
    sortable?: boolean;
    filterable?: boolean;
    searchable?: boolean;
    hideable?: boolean;
    resizable?: boolean;
    pinnable?: boolean;
    exportable?: boolean;
    width?: number;
    minWidth?: number;
    maxWidth?: number;
}

// ====================
// Filter Types
// ====================

export type FilterType =
    | 'text'
    | 'select'
    | 'multiSelect'
    | 'number'
    | 'numberRange'
    | 'date'
    | 'dateRange'
    | 'boolean'
    | 'custom';

export interface FilterOption {
    label: string;
    value: string | number | boolean;
    description?: string;
    count?: number;
}

export interface BaseFilter {
    id: string;
    column: string;
    type: FilterType;
    label?: string;
    placeholder?: string;
    description?: string;
    required?: boolean;
    disabled?: boolean;
    clearable?: boolean;
    debounceMs?: number;
}

export interface TextFilter extends BaseFilter {
    type: 'text';
    maxLength?: number;
    caseSensitive?: boolean;
}

export interface SelectFilter extends BaseFilter {
    type: 'select' | 'multiSelect';
    options: FilterOption[];
    multiple?: boolean;
    searchable?: boolean;
    creatable?: boolean;
}

export interface NumberFilter extends BaseFilter {
    type: 'number';
    min?: number;
    max?: number;
    step?: number;
    precision?: number;
}

export interface NumberRangeFilter extends BaseFilter {
    type: 'numberRange';
    min?: number;
    max?: number;
    step?: number;
    precision?: number;
}

export interface DateFilter extends BaseFilter {
    type: 'date';
    minDate?: Date | string;
    maxDate?: Date | string;
    format?: string;
}

export interface DateRangeFilter extends BaseFilter {
    type: 'dateRange';
    minDate?: Date | string;
    maxDate?: Date | string;
    format?: string;
    presets?: DateRangePreset[];
}

export interface BooleanFilter extends BaseFilter {
    type: 'boolean';
    trueLabel?: string;
    falseLabel?: string;
}

export interface CustomFilter extends BaseFilter {
    type: 'custom';
    component: ComponentType<CustomFilterProps>;
}

export type TableFilter =
    | TextFilter
    | SelectFilter
    | NumberFilter
    | NumberRangeFilter
    | DateFilter
    | DateRangeFilter
    | BooleanFilter
    | CustomFilter;

export interface CustomFilterProps {
    filter: CustomFilter;
    value: any;
    onChange: (value: any) => void;
    onClear: () => void;
}

export interface DateRangePreset {
    label: string;
    value: [Date, Date];
    description?: string;
}

export interface ActiveFilter {
    id: string;
    column: string;
    type: FilterType;
    value: any;
    label: string;
    displayValue: string;
}

// ====================
// Pagination Types
// ====================

export interface PaginationConfig {
    enabled?: boolean;
    pageSize?: number;
    pageSizes?: number[];
    showPageSizeSelector?: boolean;
    showPageInfo?: boolean;
    showFirstLastButtons?: boolean;
    showPreviousNextButtons?: boolean;
    showQuickJumper?: boolean;
    showTotal?: boolean;
    position?: 'top' | 'bottom' | 'both';
}

export interface ServerSidePaginationConfig extends PaginationConfig {
    totalCount: number;
    onPaginationChange: (pagination: PaginationState) => void;
}

// ====================
// Selection Types
// ====================

export interface SelectionConfig {
    enabled?: boolean;
    mode?: 'single' | 'multiple';
    selectOnRowClick?: boolean;
    showSelectAll?: boolean;
    preserveSelectionOnPageChange?: boolean;
    onSelectionChange?: (selectedRows: any[]) => void;
    onRowSelect?: (row: any, selected: boolean) => void;
    disableRowSelection?: (row: any) => boolean;
}

// ====================
// Export Types
// ====================

export type ExportFormat = 'csv' | 'excel' | 'pdf' | 'json';

export interface ExportConfig {
    enabled?: boolean;
    formats?: ExportFormat[];
    filename?: string;
    includeHeaders?: boolean;
    includeFilters?: boolean;
    customExporter?: (data: any[], format: ExportFormat) => void;
}

// ====================
// Server-Side Types
// ====================

export interface ServerSideConfig<TData extends BaseTableData = BaseTableData> {
    enabled: boolean;
    loading?: boolean;
    error?: string | null;
    totalCount: number;
    onPaginationChange?: (pagination: PaginationState) => void;
    onSortingChange?: (sorting: SortingState) => void;
    onFiltersChange?: (filters: ColumnFiltersState) => void;
    onSearchChange?: (search: string) => void;
    onColumnVisibilityChange?: (visibility: VisibilityState) => void;
}

// ====================
// Toolbar Types
// ====================

export interface ToolbarConfig {
    enabled?: boolean;
    showSearch?: boolean;
    showFilters?: boolean;
    showColumns?: boolean;
    showExport?: boolean;
    showRefresh?: boolean;
    showDensity?: boolean;
    showFullscreen?: boolean;
    customActions?: ToolbarAction[];
    position?: 'top' | 'bottom' | 'both';
}

export interface ToolbarAction {
    id: string;
    label: string;
    icon?: ReactNode;
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
    tooltip?: string;
    variant?: 'text' | 'outlined' | 'contained';
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

// ====================
// Virtualization Types
// ====================

export interface VirtualizationConfig {
    enabled?: boolean;
    rowHeight?: number;
    overscan?: number;
    estimateSize?: (index: number) => number;
}

// ====================
// Styling Types
// ====================

export type TableDensity = 'compact' | 'standard' | 'comfortable';

export interface TableStyling {
    density?: TableDensity;
    striped?: boolean;
    bordered?: boolean;
    hoverable?: boolean;
    stickyHeader?: boolean;
    maxHeight?: string | number;
    className?: string;
    sx?: any; // MUI sx prop
}

// ====================
// Main DataTable Props
// ====================

export interface DataTableProps<TData extends BaseTableData = BaseTableData> {
    // Core Data
    data: TData[];
    columns: TableColumn<TData>[];

    // Server-side
    serverSide?: ServerSideConfig<TData>;

    // Features
    enableSearch?: boolean;
    enableFilters?: boolean;
    enableSorting?: boolean;
    enableColumnResizing?: boolean;
    enableColumnReordering?: boolean;
    enableHiding?: boolean;
    enablePinning?: boolean;

    // Custom Configuration
    filters?: TableFilter[];
    pagination?: PaginationConfig;
    selection?: SelectionConfig;
    export?: ExportConfig;
    toolbar?: ToolbarConfig;
    virtualization?: VirtualizationConfig;
    styling?: TableStyling;

    // Default States
    initialSorting?: SortingState;
    initialFilters?: ColumnFiltersState;
    initialPagination?: Partial<PaginationState>;
    initialColumnVisibility?: VisibilityState;
    initialRowSelection?: RowSelectionState;

    // Callbacks
    onRowClick?: (row: TData, index: number) => void;
    onRowDoubleClick?: (row: TData, index: number) => void;
    onCellClick?: (cell: Cell<TData, unknown>, row: TData) => void;

    // Loading & Error States
    loading?: boolean;
    error?: string | Error | null;
    emptyMessage?: ReactNode;

    // Advanced
    debugTable?: boolean;
    className?: string;
    sx?: any;
}

// ====================
// Hook Return Types
// ====================

export interface UseDataTableReturn<TData extends BaseTableData = BaseTableData> {
    table: TanStackTable<TData>;
    state: {
        sorting: SortingState;
        columnFilters: ColumnFiltersState;
        pagination: PaginationState;
        columnVisibility: VisibilityState;
        rowSelection: RowSelectionState;
        globalFilter: string;
        isLoading: boolean;
        error: string | null;
    };
    actions: {
        setSorting: (sorting: SortingState) => void;
        setColumnFilters: (filters: ColumnFiltersState) => void;
        setPagination: (pagination: PaginationState) => void;
        setColumnVisibility: (visibility: VisibilityState) => void;
        setRowSelection: (selection: RowSelectionState) => void;
        setGlobalFilter: (filter: string) => void;
        resetTable: () => void;
        exportData: (format: ExportFormat) => void;
        refresh: () => void;
    };
    computed: {
        visibleColumns: Column<TData, unknown>[];
        selectedRows: TData[];
        filteredRowCount: number;
        totalRowCount: number;
        pageCount: number;
        canPreviousPage: boolean;
        canNextPage: boolean;
        activeFilters: ActiveFilter[];
    };
}

// ====================
// Event Types
// ====================

export interface TableEvents<TData extends BaseTableData = BaseTableData> {
    onStateChange?: (state: any) => void;
    onDataChange?: (data: TData[]) => void;
    onError?: (error: Error) => void;
    onLoadingChange?: (loading: boolean) => void;
}

// ====================
// Utility Types
// ====================

export type TableSize = 'small' | 'medium' | 'large';
export type TableVariant = 'standard' | 'outlined' | 'elevated';

export interface TableTheme {
    size?: TableSize;
    variant?: TableVariant;
    colors?: {
        primary?: string;
        secondary?: string;
        success?: string;
        warning?: string;
        error?: string;
    };
}