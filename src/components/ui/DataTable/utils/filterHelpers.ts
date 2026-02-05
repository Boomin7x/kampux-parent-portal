/* eslint-disable no-case-declarations */
import { format, isAfter, isBefore, isEqual, parseISO } from 'date-fns';
import { debounce } from 'lodash';
import type {
    ActiveFilter,
    BaseTableData,
    FilterOption,
    TableFilter,
} from '../types/table.types';

// ====================
// Filter Value Processing
// ====================

export const filterValueProcessors = {
    text: (value: string, caseSensitive = false): string => {
        return caseSensitive ? value : value.toLowerCase();
    },

    number: (value: string | number): number | null => {
        const num = typeof value === 'string' ? parseFloat(value) : value;
        return isNaN(num) ? null : num;
    },

    date: (value: string | Date): Date | null => {
        if (value instanceof Date) return value;
        try {
            return parseISO(value);
        } catch {
            return null;
        }
    },

    array: (value: any): any[] => {
        return Array.isArray(value) ? value : [value].filter(Boolean);
    },
};

// ====================
// Filter Functions
// ====================

export const filterFunctions = {
    text: {
        contains: (
            value: any,
            filterValue: string,
            caseSensitive = false
        ): boolean => {
            if (!value) return false;
            const processedValue = filterValueProcessors.text(
                String(value),
                caseSensitive
            );
            const processedFilter = filterValueProcessors.text(
                filterValue,
                caseSensitive
            );
            return processedValue.includes(processedFilter);
        },

        startsWith: (
            value: any,
            filterValue: string,
            caseSensitive = false
        ): boolean => {
            if (!value) return false;
            const processedValue = filterValueProcessors.text(
                String(value),
                caseSensitive
            );
            const processedFilter = filterValueProcessors.text(
                filterValue,
                caseSensitive
            );
            return processedValue.startsWith(processedFilter);
        },

        endsWith: (
            value: any,
            filterValue: string,
            caseSensitive = false
        ): boolean => {
            if (!value) return false;
            const processedValue = filterValueProcessors.text(
                String(value),
                caseSensitive
            );
            const processedFilter = filterValueProcessors.text(
                filterValue,
                caseSensitive
            );
            return processedValue.endsWith(processedFilter);
        },

        equals: (
            value: any,
            filterValue: string,
            caseSensitive = false
        ): boolean => {
            if (!value) return false;
            const processedValue = filterValueProcessors.text(
                String(value),
                caseSensitive
            );
            const processedFilter = filterValueProcessors.text(
                filterValue,
                caseSensitive
            );
            return processedValue === processedFilter;
        },

        isEmpty: (value: any): boolean => {
            return !value || String(value).trim() === '';
        },

        isNotEmpty: (value: any): boolean => {
            return !!value && String(value).trim() !== '';
        },
    },

    number: {
        equals: (value: any, filterValue: number): boolean => {
            const num = filterValueProcessors.number(value);
            return num === filterValue;
        },

        greaterThan: (value: any, filterValue: number): boolean => {
            const num = filterValueProcessors.number(value);
            return num !== null && num > filterValue;
        },

        greaterThanOrEqual: (value: any, filterValue: number): boolean => {
            const num = filterValueProcessors.number(value);
            return num !== null && num >= filterValue;
        },

        lessThan: (value: any, filterValue: number): boolean => {
            const num = filterValueProcessors.number(value);
            return num !== null && num < filterValue;
        },

        lessThanOrEqual: (value: any, filterValue: number): boolean => {
            const num = filterValueProcessors.number(value);
            return num !== null && num <= filterValue;
        },

        between: (value: any, range: [number, number]): boolean => {
            const num = filterValueProcessors.number(value);
            if (num === null) return false;
            const [min, max] = range;
            return num >= min && num <= max;
        },

        isEmpty: (value: any): boolean => {
            return value == null || value === '';
        },

        isNotEmpty: (value: any): boolean => {
            return value != null && value !== '';
        },
    },

    date: {
        equals: (value: any, filterValue: Date): boolean => {
            const date = filterValueProcessors.date(value);
            return date ? isEqual(date, filterValue) : false;
        },

        after: (value: any, filterValue: Date): boolean => {
            const date = filterValueProcessors.date(value);
            return date ? isAfter(date, filterValue) : false;
        },

        before: (value: any, filterValue: Date): boolean => {
            const date = filterValueProcessors.date(value);
            return date ? isBefore(date, filterValue) : false;
        },

        between: (value: any, range: [Date, Date]): boolean => {
            const date = filterValueProcessors.date(value);
            if (!date) return false;
            const [start, end] = range;
            return (
                (isAfter(date, start) || isEqual(date, start)) &&
                (isBefore(date, end) || isEqual(date, end))
            );
        },

        isEmpty: (value: any): boolean => {
            return !value;
        },

        isNotEmpty: (value: any): boolean => {
            return !!value;
        },
    },

    select: {
        equals: (value: any, filterValue: any): boolean => {
            return value === filterValue;
        },

        in: (value: any, filterValues: any[]): boolean => {
            return filterValues.includes(value);
        },

        notIn: (value: any, filterValues: any[]): boolean => {
            return !filterValues.includes(value);
        },
    },

    boolean: {
        is: (value: any, filterValue: boolean): boolean => {
            return Boolean(value) === filterValue;
        },
    },
};

// ====================
// Filter Builders
// ====================

export const filterBuilders = {
    text: (
        column: string,
        options: {
            placeholder?: string;
            caseSensitive?: boolean;
            debounceMs?: number;
        } = {}
    ): TableFilter => ({
        id: `${column}_text`,
        column,
        type: 'text',
        label: options.placeholder || `Filter ${column}`,
        placeholder: options.placeholder,
        caseSensitive: options.caseSensitive || false,
        debounceMs: options.debounceMs || 300,
    }),

    select: (
        column: string,
        options: FilterOption[],
        config: {
            multiple?: boolean;
            searchable?: boolean;
            placeholder?: string;
        } = {}
    ): TableFilter => ({
        id: `${column}_select`,
        column,
        type: config.multiple ? 'multiSelect' : 'select',
        options,
        multiple: config.multiple || false,
        searchable: config.searchable || false,
        placeholder: config.placeholder || `Select ${column}`,
    }),

    numberRange: (
        column: string,
        options: {
            min?: number;
            max?: number;
            step?: number;
            precision?: number;
            placeholder?: string;
        } = {}
    ): TableFilter => ({
        id: `${column}_number_range`,
        column,
        type: 'numberRange',
        min: options.min,
        max: options.max,
        step: options.step || 1,
        precision: options.precision || 0,
        placeholder: options.placeholder || `Filter ${column} range`,
    }),

    dateRange: (
        column: string,
        options: {
            minDate?: Date;
            maxDate?: Date;
            format?: string;
            placeholder?: string;
        } = {}
    ): TableFilter => ({
        id: `${column}_date_range`,
        column,
        type: 'dateRange',
        minDate: options.minDate,
        maxDate: options.maxDate,
        format: options.format || 'yyyy-MM-dd',
        placeholder: options.placeholder || `Filter ${column} range`,
        presets: [
            { label: 'Today', value: [new Date(), new Date()] },
            {
                label: 'Yesterday',
                value: [
                    new Date(Date.now() - 24 * 60 * 60 * 1000),
                    new Date(Date.now() - 24 * 60 * 60 * 1000),
                ],
            },
            {
                label: 'Last 7 days',
                value: [
                    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                    new Date(),
                ],
            },
            {
                label: 'Last 30 days',
                value: [
                    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                    new Date(),
                ],
            },
        ],
    }),

    boolean: (
        column: string,
        options: {
            trueLabel?: string;
            falseLabel?: string;
            placeholder?: string;
        } = {}
    ): TableFilter => ({
        id: `${column}_boolean`,
        column,
        type: 'boolean',
        trueLabel: options.trueLabel || 'Yes',
        falseLabel: options.falseLabel || 'No',
        placeholder: options.placeholder || `Filter ${column}`,
    }),
};

// ====================
// Filter State Management
// ====================

export const filterStateManager = {
    /**
     * Converts filter values to active filter display objects
     */
    getActiveFilters: (
        filters: Record<string, any>,
        filterConfigs: TableFilter[]
    ): ActiveFilter[] => {
        return Object.entries(filters)
            .filter(
                ([_, value]) =>
                    value != null &&
                    value !== '' &&
                    !(Array.isArray(value) && value.length === 0)
            )
            .map(([column, value]) => {
                const config = filterConfigs.find(f => f.column === column);
                if (!config) return null;

                const displayValue = formatFilterValue(value, config);

                return {
                    id: config.id,
                    column,
                    type: config.type,
                    value,
                    label: config.label || column,
                    displayValue,
                };
            })
            .filter(Boolean) as ActiveFilter[];
    },

    /**
     * Clears a specific filter
     */
    clearFilter: (
        filters: Record<string, any>,
        column: string
    ): Record<string, any> => {
        const newFilters = { ...filters };
        delete newFilters[column];
        return newFilters;
    },

    /**
     * Clears all filters
     */
    clearAllFilters: (): Record<string, any> => {
        return {};
    },

    /**
     * Updates a specific filter value
     */
    updateFilter: (
        filters: Record<string, any>,
        column: string,
        value: any
    ): Record<string, any> => {
        if (
            value == null ||
            value === '' ||
            (Array.isArray(value) && value.length === 0)
        ) {
            return filterStateManager.clearFilter(filters, column);
        }

        return {
            ...filters,
            [column]: value,
        };
    },
};

// ====================
// Filter Display Helpers
// ====================

export function formatFilterValue(value: any, config: TableFilter): string {
    switch (config.type) {
        case 'text':
            return `"${value}"`;

        case 'select':
            const option = config.options?.find(opt => opt.value === value);
            return option?.label || String(value);

        case 'multiSelect':
            if (!Array.isArray(value)) return String(value);
            const labels = value.map(v => {
                const option = config.options?.find(opt => opt.value === v);
                return option?.label || String(v);
            });
            return labels.join(', ');

        case 'number':
            return String(value);

        case 'numberRange':
            if (Array.isArray(value) && value.length === 2) {
                return `${value[0]} - ${value[1]}`;
            }
            return String(value);

        case 'date':
            if (value instanceof Date) {
                return format(value, config.format || 'MMM dd, yyyy');
            }
            return String(value);

        case 'dateRange':
            if (Array.isArray(value) && value.length === 2) {
                const formatStr = config.format || 'MMM dd, yyyy';
                const start =
                    value[0] instanceof Date
                        ? format(value[0], formatStr)
                        : value[0];
                const end =
                    value[1] instanceof Date
                        ? format(value[1], formatStr)
                        : value[1];
                return `${start} - ${end}`;
            }
            return String(value);

        case 'boolean':
            return value
                ? config.trueLabel || 'Yes'
                : config.falseLabel || 'No';

        default:
            return String(value);
    }
}

// ====================
// Filter Options Generation
// ====================

export function generateFilterOptions<TData extends BaseTableData>(
    data: TData[],
    column: keyof TData,
    options: {
        includeEmpty?: boolean;
        sortAlphabetically?: boolean;
        maxOptions?: number;
        customLabels?: Record<string, string>;
    } = {}
): FilterOption[] {
    const {
        includeEmpty = false,
        sortAlphabetically = true,
        maxOptions = 100,
        customLabels = {},
    } = options;

    // Get unique values
    const uniqueValues = Array.from(
        new Set(
            data
                .map(row => row[column])
                .filter(
                    value => includeEmpty || (value != null && value !== '')
                )
        )
    );

    // Create options
    let filterOptions: FilterOption[] = uniqueValues.map(value => ({
        label: customLabels[String(value)] || String(value),
        value: value as string | number | boolean,
        count: data.filter(row => row[column] === value).length,
    }));

    // Sort if requested
    if (sortAlphabetically) {
        filterOptions.sort((a, b) => a.label.localeCompare(b.label));
    } else {
        // Sort by count descending
        filterOptions.sort((a, b) => (b.count || 0) - (a.count || 0));
    }

    // Limit options
    if (filterOptions.length > maxOptions) {
        filterOptions = filterOptions.slice(0, maxOptions);
    }

    return filterOptions;
}

// ====================
// Debounced Filter Creators
// ====================

export function createDebouncedFilterHandler(
    callback: (value: any) => void,
    delay = 300
) {
    return debounce(callback, delay, {
        leading: false,
        trailing: true,
    });
}

// ====================
// Filter Validation
// ====================

export const filterValidators = {
    text: (value: string, config: TableFilter): boolean => {
        if (!value) return true;
        const maxLength = (config as any).maxLength;
        return !maxLength || value.length <= maxLength;
    },

    number: (value: any, config: TableFilter): boolean => {
        const num = filterValueProcessors.number(value);
        if (num === null) return false;

        const { min, max } = config as any;
        if (min != null && num < min) return false;
        if (max != null && num > max) return false;

        return true;
    },

    date: (value: any, config: TableFilter): boolean => {
        const date = filterValueProcessors.date(value);
        if (!date) return false;

        const { minDate, maxDate } = config as any;
        if (minDate && isBefore(date, minDate)) return false;
        if (maxDate && isAfter(date, maxDate)) return false;

        return true;
    },
};

// ====================
// Export Utilities
// ====================

export const filterUtils = {
    filterValueProcessors,
    filterFunctions,
    filterBuilders,
    filterStateManager,
    formatFilterValue,
    generateFilterOptions,
    createDebouncedFilterHandler,
    filterValidators,
};
