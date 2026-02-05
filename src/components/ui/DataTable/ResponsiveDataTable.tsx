// import { useMediaQuery, useTheme } from '@mui/material';

// import { DataTable } from './DataTable';
// import { MobileDataTable } from './components/MobileDataTable';
// import { VirtualizedDataTable } from './components/VirtualizedDataTable';
// import type { BaseTableData, DataTableProps } from './types/table.types';

// interface ResponsiveDataTableProps<
//     TData extends BaseTableData,
// > extends DataTableProps<TData> {
//     // Responsive options
//     mobileBreakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
//     forceMobile?: boolean;
//     forceDesktop?: boolean;

//     // Virtualization options
//     enableVirtualization?: boolean;
//     virtualizationThreshold?: number;

//     // Mobile-specific options
//     mobileCardElevation?: number;
//     mobileCardSpacing?: number;
//     mobileShowExpandButton?: boolean;
//     mobilePrimaryFields?: string[];
//     mobileSecondaryFields?: string[];
//     mobileCompactMode?: boolean;

//     // Virtualization-specific options
//     virtualItemHeight?: number;
//     virtualOverscan?: number;
//     enableInfiniteLoading?: boolean;
//     hasNextPage?: boolean;
//     isNextPageLoading?: boolean;
//     loadNextPage?: () => Promise<void>;
// }

// export function ResponsiveDataTable<TData extends BaseTableData>({
//     mobileBreakpoint = 'md',
//     forceMobile = false,
//     forceDesktop = false,
//     enableVirtualization = false,
//     virtualizationThreshold = 1000,
//     mobileCardElevation,
//     mobileCardSpacing,
//     mobileShowExpandButton,
//     mobilePrimaryFields,
//     mobileSecondaryFields,
//     mobileCompactMode,
//     virtualItemHeight,
//     virtualOverscan,
//     enableInfiniteLoading,
//     hasNextPage,
//     isNextPageLoading,
//     loadNextPage,
//     ...props
// }: ResponsiveDataTableProps<TData>) {
//     const theme = useTheme();

//     // Determine breakpoint for mobile view
//     const isMobileSize = useMediaQuery(
//         theme.breakpoints.down(mobileBreakpoint)
//     );
//     const shouldUseMobile = forceMobile || (!forceDesktop && isMobileSize);

//     // Determine if we should use virtualization
//     const shouldUseVirtualization =
//         enableVirtualization &&
//         (virtualizationThreshold <= 0 ||
//             props.data.length >= virtualizationThreshold);

//     // Mobile view
//     if (shouldUseMobile) {
//         return (
//             <MobileDataTable
//                 {...props}
//                 cardElevation={mobileCardElevation}
//                 cardSpacing={mobileCardSpacing}
//                 showExpandButton={mobileShowExpandButton}
//                 primaryFields={mobilePrimaryFields}
//                 secondaryFields={mobileSecondaryFields}
//                 compactMode={mobileCompactMode}
//             />
//         );
//     }

//     // Virtualized desktop view for large datasets
//     if (shouldUseVirtualization && !shouldUseMobile) {
//         return (
//             <VirtualizedDataTable
//                 {...props}
//                 itemHeight={virtualItemHeight}
//                 overscan={virtualOverscan}
//                 enableInfiniteLoading={enableInfiniteLoading}
//                 hasNextPage={hasNextPage}
//                 isNextPageLoading={isNextPageLoading}
//                 loadNextPage={loadNextPage}
//             />
//         );
//     }

//     // Standard desktop view
//     return <DataTable {...props} />;
// }

// export default ResponsiveDataTable;
