import '@tanstack/react-table';
import type { BaseTableData } from './table.types';

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends BaseTableData, TValue> {
        type?: string;
        align?: 'left' | 'center' | 'right';
        hidden?: boolean;
        responsive?: {
            hideBelow?: 'sm' | 'md' | 'lg' | 'xl';
        };
    }
}
