import { format } from 'date-fns';
import type {
    BaseTableData,
    ExportFormat,
    TableColumn,
} from '../types/table.types';

// ====================
// Export Data Processors
// ====================

export interface ExportOptions<TData extends BaseTableData = BaseTableData> {
    filename?: string;
    includeHeaders?: boolean;
    includeHiddenColumns?: boolean;
    customHeaders?: Record<string, string>;
    dateFormat?: string;
    numberFormat?: Intl.NumberFormatOptions;
    excludeColumns?: string[];
    onlyColumns?: string[];
    transformData?: (data: TData[]) => any[];
}

export const dataProcessors = {
    /**
     * Converts table data to exportable format
     */
    processTableData: <TData extends BaseTableData>(
        data: TData[],
        columns: TableColumn<TData>[],
        options: ExportOptions<TData> = {}
    ): any[] => {
        const {
            includeHiddenColumns = false,
            excludeColumns = [],
            onlyColumns,
            transformData,
            dateFormat = 'yyyy-MM-dd',
            numberFormat = { maximumFractionDigits: 2 },
        } = options;

        if (transformData) {
            return transformData(data);
        }

        // Filter columns
        const exportColumns = columns.filter(col => {
            if (!includeHiddenColumns && col.meta?.hidden) return false;
            if (excludeColumns.includes(col.id)) return false;
            if (onlyColumns && !onlyColumns.includes(col.id)) return false;
            if (col.meta?.type === 'actions') return false;
            if (col.meta?.type === 'selection') return false;
            return true;
        });

        return data.map(row => {
            const exportRow: any = {};

            exportColumns.forEach(column => {
                const value = row[column.accessorKey as keyof TData];
                let exportValue: string;

                // Format based on column type
                if (
                    column.meta?.type === 'date' &&
                    (value as any) instanceof Date
                ) {
                    exportValue = format(value, dateFormat);
                } else if (
                    column.meta?.type === 'number' &&
                    typeof value === 'number'
                ) {
                    exportValue = new Intl.NumberFormat(
                        'en-US',
                        numberFormat
                    ).format(value);
                } else if (column.meta?.type === 'boolean') {
                    exportValue = value ? 'Yes' : 'No';
                } else if (value == null) {
                    exportValue = '';
                } else if (typeof value === 'object') {
                    exportValue = JSON.stringify(value);
                } else {
                    exportValue = String(value);
                }

                exportRow[column.header as string] = exportValue;
            });

            return exportRow;
        });
    },

    /**
     * Generates headers for export
     */
    generateHeaders: <TData extends BaseTableData>(
        columns: TableColumn<TData>[],
        options: ExportOptions<TData> = {}
    ): string[] => {
        const {
            customHeaders = {},
            includeHiddenColumns = false,
            excludeColumns = [],
            onlyColumns,
        } = options;

        return columns
            .filter(col => {
                if (!includeHiddenColumns && col.meta?.hidden) return false;
                if (excludeColumns.includes(col.id)) return false;
                if (onlyColumns && !onlyColumns.includes(col.id)) return false;
                if (col.meta?.type === 'actions') return false;
                if (col.meta?.type === 'selection') return false;
                return true;
            })
            .map(col => customHeaders[col.id] || (col.header as string));
    },
};

// ====================
// CSV Export
// ====================

export const csvExporter = {
    /**
     * Converts data to CSV string
     */
    dataToCSV: <TData extends BaseTableData>(
        data: TData[],
        columns: TableColumn<TData>[],
        options: ExportOptions<TData> = {}
    ): string => {
        const { includeHeaders = true } = options;
        const processedData = dataProcessors.processTableData(
            data,
            columns,
            options
        );

        if (processedData.length === 0) {
            return '';
        }

        const headers = dataProcessors.generateHeaders(columns, options);
        const csvRows: string[] = [];

        // Add headers if requested
        if (includeHeaders) {
            csvRows.push(csvExporter.arrayToCSVRow(headers));
        }

        // Add data rows
        processedData.forEach(row => {
            const values = headers.map(header => row[header] || '');
            csvRows.push(csvExporter.arrayToCSVRow(values));
        });

        return csvRows.join('\n');
    },

    /**
     * Converts array to CSV row
     */
    arrayToCSVRow: (array: any[]): string => {
        return array
            .map(value => {
                const stringValue = String(value);
                // Escape quotes and wrap in quotes if necessary
                if (
                    stringValue.includes(',') ||
                    stringValue.includes('"') ||
                    stringValue.includes('\n')
                ) {
                    return `"${stringValue.replace(/"/g, '""')}"`;
                }
                return stringValue;
            })
            .join(',');
    },

    /**
     * Downloads CSV file
     */
    downloadCSV: <TData extends BaseTableData>(
        data: TData[],
        columns: TableColumn<TData>[],
        options: ExportOptions<TData> = {}
    ): void => {
        const { filename = 'export.csv' } = options;
        const csvContent = csvExporter.dataToCSV(data, columns, options);
        const blob = new Blob([csvContent], {
            type: 'text/csv;charset=utf-8;',
        });
        downloadUtils.downloadBlob(
            blob,
            filename.endsWith('.csv') ? filename : `${filename}.csv`
        );
    },
};

// ====================
// Excel Export
// ====================

export const excelExporter = {
    /**
     * Converts data to Excel-compatible format
     */
    dataToWorksheet: <TData extends BaseTableData>(
        data: TData[],
        columns: TableColumn<TData>[],
        options: ExportOptions<TData> = {}
    ): any[][] => {
        const { includeHeaders = true } = options;
        const processedData = dataProcessors.processTableData(
            data,
            columns,
            options
        );

        if (processedData.length === 0) {
            return [];
        }

        const headers = dataProcessors.generateHeaders(columns, options);
        const worksheet: any[][] = [];

        // Add headers if requested
        if (includeHeaders) {
            worksheet.push(headers);
        }

        // Add data rows
        processedData.forEach(row => {
            const values = headers.map(header => {
                const value = row[header];
                // Excel handles dates and numbers better when not stringified
                if (value instanceof Date || typeof value === 'number') {
                    return value;
                }
                return value || '';
            });
            worksheet.push(values);
        });

        return worksheet;
    },

    /**
     * Creates downloadable Excel file (requires additional library)
     */
    downloadExcel: <TData extends BaseTableData>(
        data: TData[],
        columns: TableColumn<TData>[],
        options: ExportOptions<TData> = {}
    ): void => {
        const { filename = 'export.xlsx' } = options;

        // Note: This is a simplified version. In a real implementation,
        // you would use a library like xlsx or exceljs
        console.warn(
            'Excel export requires additional library (xlsx). Falling back to CSV.'
        );
        csvExporter.downloadCSV(data, columns, {
            ...options,
            filename: filename.replace('.xlsx', '.csv'),
        });
    },
};

// ====================
// JSON Export
// ====================

export const jsonExporter = {
    /**
     * Converts data to JSON string
     */
    dataToJSON: <TData extends BaseTableData>(
        data: TData[],
        columns: TableColumn<TData>[],
        options: ExportOptions<TData> = {}
    ): string => {
        const processedData = dataProcessors.processTableData(
            data,
            columns,
            options
        );
        return JSON.stringify(processedData, null, 2);
    },

    /**
     * Downloads JSON file
     */
    downloadJSON: <TData extends BaseTableData>(
        data: TData[],
        columns: TableColumn<TData>[],
        options: ExportOptions<TData> = {}
    ): void => {
        const { filename = 'export.json' } = options;
        const jsonContent = jsonExporter.dataToJSON(data, columns, options);
        const blob = new Blob([jsonContent], {
            type: 'application/json;charset=utf-8;',
        });
        downloadUtils.downloadBlob(
            blob,
            filename.endsWith('.json') ? filename : `${filename}.json`
        );
    },
};

// ====================
// PDF Export
// ====================

export const pdfExporter = {
    /**
     * Creates PDF table (requires additional library)
     */
    downloadPDF: <TData extends BaseTableData>(
        data: TData[],
        columns: TableColumn<TData>[],
        options: ExportOptions<TData> = {}
    ): void => {
        const { filename = 'export.pdf' } = options;

        // Note: This is a placeholder. In a real implementation,
        // you would use a library like jsPDF with autoTable plugin
        console.warn(
            'PDF export requires additional library (jsPDF). Falling back to CSV.'
        );
        csvExporter.downloadCSV(data, columns, {
            ...options,
            filename: filename.replace('.pdf', '.csv'),
        });
    },
};

// ====================
// Download Utilities
// ====================

export const downloadUtils = {
    /**
     * Downloads a blob as a file
     */
    downloadBlob: (blob: Blob, filename: string): void => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    },

    /**
     * Generates timestamp-based filename
     */
    generateTimestampedFilename: (
        baseName: string,
        extension: string,
        includeTime = false
    ): string => {
        const timestamp = includeTime
            ? format(new Date(), 'yyyy-MM-dd_HH-mm-ss')
            : format(new Date(), 'yyyy-MM-dd');

        return `${baseName}_${timestamp}.${extension}`;
    },

    /**
     * Validates filename
     */
    validateFilename: (filename: string): string => {
        // Remove or replace invalid characters
        return filename.replace(/[<>:"/\\|?*]/g, '_').trim();
    },
};

// ====================
// Main Export Function
// ====================

export function exportTableData<TData extends BaseTableData>(
    data: TData[],
    columns: TableColumn<TData>[],
    format: ExportFormat,
    options: ExportOptions<TData> = {}
): void {
    const { filename } = options;

    // Generate filename if not provided
    const finalFilename =
        filename ||
        downloadUtils.generateTimestampedFilename(
            'table_export',
            format === 'excel' ? 'xlsx' : format
        );

    const validatedFilename = downloadUtils.validateFilename(finalFilename);

    switch (format) {
        case 'csv':
            csvExporter.downloadCSV(data, columns, {
                ...options,
                filename: validatedFilename,
            });
            break;
        case 'excel':
            excelExporter.downloadExcel(data, columns, {
                ...options,
                filename: validatedFilename,
            });
            break;
        case 'json':
            jsonExporter.downloadJSON(data, columns, {
                ...options,
                filename: validatedFilename,
            });
            break;
        case 'pdf':
            pdfExporter.downloadPDF(data, columns, {
                ...options,
                filename: validatedFilename,
            });
            break;
        default:
            throw new Error(`Unsupported export format: ${format}`);
    }
}

// ====================
// Export Utilities
// ====================

export const exportUtils = {
    dataProcessors,
    csvExporter,
    excelExporter,
    jsonExporter,
    pdfExporter,
    downloadUtils,
    exportTableData,
};

// ====================
// Export Format Configurations
// ====================

export const exportFormatConfigs = {
    csv: {
        label: 'CSV',
        description: 'Comma-separated values file',
        extension: 'csv',
        mimeType: 'text/csv',
        supportsImages: false,
        supportsFormatting: false,
    },
    excel: {
        label: 'Excel',
        description: 'Microsoft Excel spreadsheet',
        extension: 'xlsx',
        mimeType:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        supportsImages: true,
        supportsFormatting: true,
    },
    json: {
        label: 'JSON',
        description: 'JavaScript Object Notation file',
        extension: 'json',
        mimeType: 'application/json',
        supportsImages: false,
        supportsFormatting: false,
    },
    pdf: {
        label: 'PDF',
        description: 'Portable Document Format file',
        extension: 'pdf',
        mimeType: 'application/pdf',
        supportsImages: true,
        supportsFormatting: true,
    },
};
