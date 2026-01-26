import { format } from 'date-fns';
import type { TableColumn, BaseTableData } from '../types/table.types';
import { createColumnHelper } from '@tanstack/react-table';

// ====================
// Column Helper Factory
// ====================

export function createTableColumnHelper<TData extends BaseTableData>() {
    const columnHelper = createColumnHelper<TData>();

    return {
        accessor: columnHelper.accessor,
        display: columnHelper.display,
        group: columnHelper.group,
    };
}

// ====================
// Common Column Builders
// ====================

export const columnBuilders = {
    /**
     * Creates a text column with search and filter capabilities
     */
    text: <TData extends BaseTableData>(
        accessorKey: keyof TData,
        options: Partial<TableColumn<TData>> = {}
    ): TableColumn<TData> => ({
        id: String(accessorKey),
        accessorKey: accessorKey as string,
        header: options.title || String(accessorKey),
        cell: ({ getValue }) => {
            const value = getValue() as string;
            return value || '—';
        },
        sortable: true,
        filterable: true,
        searchable: true,
        ...options,
    }),

    /**
     * Creates a number column with proper formatting
     */
    number: <TData extends BaseTableData>(
        accessorKey: keyof TData,
        options: Partial<TableColumn<TData>> & {
            precision?: number;
            prefix?: string;
            suffix?: string;
            format?: 'currency' | 'percentage' | 'decimal';
        } = {}
    ): TableColumn<TData> => ({
        id: String(accessorKey),
        accessorKey: accessorKey as string,
        header: options.title || String(accessorKey),
        cell: ({ getValue }) => {
            const value = getValue() as number;
            if (value == null) return '—';

            const { precision = 0, prefix = '', suffix = '', format: formatType } = options;

            let formatted: string;
            switch (formatType) {
                case 'currency':
                    formatted = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: precision,
                        maximumFractionDigits: precision,
                    }).format(value);
                    break;
                case 'percentage':
                    formatted = new Intl.NumberFormat('en-US', {
                        style: 'percent',
                        minimumFractionDigits: precision,
                        maximumFractionDigits: precision,
                    }).format(value / 100);
                    break;
                default:
                    formatted = value.toFixed(precision);
            }

            return `${prefix}${formatted}${suffix}`;
        },
        meta: {
            type: 'number',
            align: 'right',
        },
        sortable: true,
        filterable: true,
        ...options,
    }),

    /**
     * Creates a date column with proper formatting
     */
    date: <TData extends BaseTableData>(
        accessorKey: keyof TData,
        options: Partial<TableColumn<TData>> & {
            format?: string;
            relative?: boolean;
        } = {}
    ): TableColumn<TData> => ({
        id: String(accessorKey),
        accessorKey: accessorKey as string,
        header: options.title || String(accessorKey),
        cell: ({ getValue }) => {
            const value = getValue();
            if (!value) return '—';

            const date = new Date(value as string | number | Date);
            if (isNaN(date.getTime())) return 'Invalid Date';

            const dateFormat = options.format || 'MMM dd, yyyy';

            if (options.relative) {
                const now = new Date();
                const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

                if (diffInDays === 0) return 'Today';
                if (diffInDays === 1) return 'Yesterday';
                if (diffInDays === -1) return 'Tomorrow';
                if (diffInDays > 0 && diffInDays < 7) return `${diffInDays} days ago`;
                if (diffInDays < 0 && diffInDays > -7) return `In ${Math.abs(diffInDays)} days`;
            }

            return format(date, dateFormat);
        },
        meta: {
            type: 'date',
        },
        sortable: true,
        filterable: true,
        ...options,
    }),

    /**
     * Creates a status column with colored badges
     */
    status: <TData extends BaseTableData>(
        accessorKey: keyof TData,
        options: Partial<TableColumn<TData>> & {
            statusMap?: Record<string, { label: string; color: 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' }>;
        } = {}
    ): TableColumn<TData> => ({
        id: String(accessorKey),
        accessorKey: accessorKey as string,
        header: options.title || String(accessorKey),
        cell: ({ getValue }) => {
            const value = getValue() as string;
            if (!value) return '—';

            const statusConfig = options.statusMap?.[value] || {
                label: value,
                color: 'default' as const
            };

            return {
                type: 'status',
                value: statusConfig.label,
                color: statusConfig.color,
            };
        },
        meta: {
            type: 'status',
        },
        sortable: true,
        filterable: true,
        ...options,
    }),

    /**
     * Creates a boolean column with yes/no or custom labels
     */
    boolean: <TData extends BaseTableData>(
        accessorKey: keyof TData,
        options: Partial<TableColumn<TData>> & {
            trueLabel?: string;
            falseLabel?: string;
            showIcons?: boolean;
        } = {}
    ): TableColumn<TData> => ({
        id: String(accessorKey),
        accessorKey: accessorKey as string,
        header: options.title || String(accessorKey),
        cell: ({ getValue }) => {
            const value = getValue() as boolean;
            const { trueLabel = 'Yes', falseLabel = 'No', showIcons = false } = options;

            if (value == null) return '—';

            return {
                type: 'boolean',
                value: value ? trueLabel : falseLabel,
                boolean: value,
                showIcons,
            };
        },
        meta: {
            type: 'boolean',
            align: 'center',
        },
        sortable: true,
        filterable: true,
        ...options,
    }),

    /**
     * Creates an avatar column for displaying user images/initials
     */
    avatar: <TData extends BaseTableData>(
        accessorKey: keyof TData,
        options: Partial<TableColumn<TData>> & {
            nameKey?: keyof TData;
            size?: 'small' | 'medium' | 'large';
            showName?: boolean;
        } = {}
    ): TableColumn<TData> => ({
        id: String(accessorKey),
        accessorKey: accessorKey as string,
        header: options.title || String(accessorKey),
        cell: ({ getValue, row }) => {
            const avatarSrc = getValue() as string;
            const name = options.nameKey ? row.getValue(options.nameKey as string) as string : '';

            return {
                type: 'avatar',
                src: avatarSrc,
                name: name,
                size: options.size || 'medium',
                showName: options.showName || false,
            };
        },
        meta: {
            type: 'avatar',
            align: 'left',
        },
        sortable: false,
        filterable: false,
        ...options,
    }),

    /**
     * Creates an actions column with custom action buttons
     */
    actions: <TData extends BaseTableData>(
        actions: Array<{
            label: string;
            icon?: any;
            onClick: (row: TData) => void;
            disabled?: (row: TData) => boolean;
            hidden?: (row: TData) => boolean;
            color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
            variant?: 'text' | 'outlined' | 'contained';
        }>,
        options: Partial<TableColumn<TData>> = {}
    ): TableColumn<TData> => ({
        id: 'actions',
        header: options.title || 'Actions',
        cell: ({ row }) => ({
            type: 'actions',
            actions: actions.map(action => ({
                ...action,
                disabled: action.disabled?.(row.original) || false,
                hidden: action.hidden?.(row.original) || false,
                onClick: () => action.onClick(row.original),
            })),
        }),
        meta: {
            type: 'actions',
            align: 'center',
        },
        size: 120,
        enableSorting: false,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableHiding: false,
        enableResizing: false,
        ...options,
    }),

    /**
     * Creates a selection column for row selection
     */
    selection: <TData extends BaseTableData>(
        options: Partial<TableColumn<TData>> = {}
    ): TableColumn<TData> => ({
        id: 'selection',
        header: ({ table }) => ({
            type: 'selection-header',
            indeterminate: table.getIsSomeRowsSelected(),
            checked: table.getIsAllRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
        }),
        cell: ({ row }) => ({
            type: 'selection-cell',
            indeterminate: row.getIsSomeSelected(),
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            onChange: row.getToggleSelectedHandler(),
        }),
        size: 48,
        enableSorting: false,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableHiding: false,
        enableResizing: false,
        ...options,
    }),

    /**
     * Creates a row index column
     */
    index: <TData extends BaseTableData>(
        options: Partial<TableColumn<TData>> & {
            startFrom?: number;
        } = {}
    ): TableColumn<TData> => ({
        id: 'index',
        header: options.title || '#',
        cell: ({ row, table }) => {
            const { startFrom = 1 } = options;
            const { pageIndex, pageSize } = table.getState().pagination;
            return pageIndex * pageSize + row.index + startFrom;
        },
        size: 60,
        meta: {
            type: 'number',
            align: 'center',
        },
        enableSorting: false,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        ...options,
    }),
};

// ====================
// Column Utilities
// ====================

export const columnUtils = {
    /**
     * Generates columns from data keys automatically
     */
    fromData: <TData extends BaseTableData>(
        data: TData[],
        options: {
            exclude?: (keyof TData)[];
            include?: (keyof TData)[];
            columnOverrides?: Record<keyof TData, Partial<TableColumn<TData>>>;
        } = {}
    ): TableColumn<TData>[] => {
        if (!data.length) return [];

        const sample = data[0];
        const keys = Object.keys(sample) as (keyof TData)[];
        const { exclude = [], include, columnOverrides = {} } = options;

        const filteredKeys = include ? include : keys.filter(key => !exclude.includes(key));

        return filteredKeys.map(key => {
            const value = sample[key];
            const override = columnOverrides[key] || {};

            let column: TableColumn<TData>;

            // Auto-detect column type
            if (typeof value === 'boolean') {
                column = columnBuilders.boolean(key, override);
            } else if (typeof value === 'number') {
                column = columnBuilders.number(key, override);
            } else if (value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value)))) {
                column = columnBuilders.date(key, override);
            } else {
                column = columnBuilders.text(key, override);
            }

            return column;
        });
    },

    /**
     * Creates a grouped column structure
     */
    group: <TData extends BaseTableData>(
        id: string,
        header: string,
        columns: TableColumn<TData>[],
        options: Partial<TableColumn<TData>> = {}
    ): TableColumn<TData> => ({
        id,
        header,
        columns,
        enableSorting: false,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        ...options,
    }),

    /**
     * Adds responsive visibility to columns
     */
    responsive: <TData extends BaseTableData>(
        columns: TableColumn<TData>[],
        breakpoints: {
            hideOnMobile?: string[];
            hideOnTablet?: string[];
            showOnDesktop?: string[];
        }
    ): TableColumn<TData>[] => {
        return columns.map(column => {
            const { hideOnMobile = [], hideOnTablet = [], showOnDesktop = [] } = breakpoints;

            let meta = column.meta || {};

            if (hideOnMobile.includes(column.id)) {
                meta.responsive = { hideBelow: 'md' };
            } else if (hideOnTablet.includes(column.id)) {
                meta.responsive = { hideBelow: 'lg' };
            } else if (showOnDesktop.includes(column.id)) {
                meta.responsive = { hideBelow: 'xl' };
            }

            return {
                ...column,
                meta,
            };
        });
    },
};