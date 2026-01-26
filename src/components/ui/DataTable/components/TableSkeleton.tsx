import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Skeleton,
    Box,
    useTheme,
    alpha,
} from '@mui/material';

interface TableSkeletonProps {
    rows?: number;
    columns?: number;
    height?: number | string;
    showHeader?: boolean;
    density?: 'compact' | 'standard' | 'comfortable';
    showPagination?: boolean;
    showToolbar?: boolean;
}

export function TableSkeleton({
    rows = 10,
    columns = 5,
    height = 400,
    showHeader = true,
    density = 'standard',
    showPagination = true,
    showToolbar = true,
}: TableSkeletonProps) {
    const theme = useTheme();

    const getRowHeight = () => {
        switch (density) {
            case 'compact': return 40;
            case 'comfortable': return 64;
            default: return 52;
        }
    };

    const getCellPadding = () => {
        switch (density) {
            case 'compact': return 1;
            case 'comfortable': return 2;
            default: return 1.5;
        }
    };

    const generateColumnWidths = (columnCount: number) => {
        const widths = [];
        for (let i = 0; i < columnCount; i++) {
            if (i === 0) widths.push('20%'); // First column (usually ID or selection)
            else if (i === columnCount - 1) widths.push('15%'); // Last column (usually actions)
            else widths.push(`${65 / (columnCount - 2)}%`); // Distribute remaining space
        }
        return widths;
    };

    const columnWidths = generateColumnWidths(columns);

    return (
        <Box>
            {/* Toolbar Skeleton */}
            {showToolbar && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        p: 2,
                        backgroundColor: alpha(theme.palette.background.paper, 0.8),
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        borderTopLeftRadius: theme.shape.borderRadius,
                        borderTopRightRadius: theme.shape.borderRadius,
                    }}
                >
                    {/* Left side - Title */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
                        <Skeleton variant="circular" width={24} height={24} />
                        <Skeleton variant="text" width={120} height={24} />
                        <Skeleton variant="text" width={80} height={20} />
                    </Box>

                    {/* Right side - Actions */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Skeleton variant="rectangular" width={240} height={40} sx={{ borderRadius: 1 }} />
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="circular" width={40} height={40} />
                    </Box>
                </Box>
            )}

            {/* Table Container */}
            <TableContainer
                component={Paper}
                sx={{
                    height,
                    borderRadius: showToolbar ? 0 : 2,
                    borderTopLeftRadius: showToolbar ? 0 : theme.shape.borderRadius,
                    borderTopRightRadius: showToolbar ? 0 : theme.shape.borderRadius,
                }}
            >
                <Table size={density === 'compact' ? 'small' : 'medium'} stickyHeader>
                    {/* Table Header */}
                    {showHeader && (
                        <TableHead>
                            <TableRow>
                                {Array.from({ length: columns }).map((_, index) => (
                                    <TableCell
                                        key={index}
                                        sx={{
                                            py: getCellPadding(),
                                            fontWeight: 600,
                                            backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                            borderBottom: `2px solid ${theme.palette.divider}`,
                                            width: columnWidths[index],
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Skeleton
                                                variant="text"
                                                width={
                                                    index === 0 ? 60 :
                                                    index === columns - 1 ? 80 :
                                                    Math.random() * 80 + 40
                                                }
                                                height={20}
                                            />
                                            {index > 0 && index < columns - 1 && (
                                                <Skeleton variant="circular" width={16} height={16} />
                                            )}
                                        </Box>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                    )}

                    {/* Table Body */}
                    <TableBody>
                        {Array.from({ length: rows }).map((_, rowIndex) => (
                            <TableRow
                                key={rowIndex}
                                sx={{
                                    height: getRowHeight(),
                                    '&:nth-of-type(odd)': {
                                        backgroundColor: alpha(theme.palette.action.hover, 0.3),
                                    },
                                }}
                            >
                                {Array.from({ length: columns }).map((_, cellIndex) => (
                                    <TableCell
                                        key={cellIndex}
                                        sx={{
                                            py: getCellPadding(),
                                            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                                        }}
                                    >
                                        {cellIndex === 0 ? (
                                            // First column - Selection checkbox or ID
                                            <Skeleton variant="circular" width={20} height={20} />
                                        ) : cellIndex === columns - 1 ? (
                                            // Last column - Actions
                                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                <Skeleton variant="circular" width={24} height={24} />
                                                <Skeleton variant="circular" width={24} height={24} />
                                                <Skeleton variant="circular" width={24} height={24} />
                                            </Box>
                                        ) : (
                                            // Content columns
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                {/* Randomly show different content types */}
                                                {Math.random() > 0.7 && (
                                                    <Skeleton variant="circular" width={32} height={32} />
                                                )}
                                                {Math.random() > 0.8 ? (
                                                    <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
                                                ) : (
                                                    <Skeleton
                                                        variant="text"
                                                        width={Math.random() * 100 + 50}
                                                        height={20}
                                                    />
                                                )}
                                            </Box>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination Skeleton */}
            {showPagination && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 2,
                        borderTop: `1px solid ${theme.palette.divider}`,
                        backgroundColor: alpha(theme.palette.background.paper, 0.8),
                        borderBottomLeftRadius: theme.shape.borderRadius,
                        borderBottomRightRadius: theme.shape.borderRadius,
                    }}
                >
                    {/* Left side - Info and page size */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Skeleton variant="text" width={180} height={20} />
                        <Skeleton variant="text" width={60} height={20} />
                        <Skeleton variant="rectangular" width={70} height={32} sx={{ borderRadius: 1 }} />
                        <Skeleton variant="text" width={60} height={20} />
                    </Box>

                    {/* Center - Page navigation */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Skeleton variant="circular" width={32} height={32} />
                        <Skeleton variant="circular" width={32} height={32} />
                        <Skeleton variant="circular" width={32} height={32} />
                        <Skeleton variant="circular" width={32} height={32} />
                        <Skeleton variant="circular" width={32} height={32} />
                        <Skeleton variant="circular" width={32} height={32} />
                        <Skeleton variant="circular" width={32} height={32} />
                    </Box>

                    {/* Right side - Jump to page */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Skeleton variant="text" width={40} height={20} />
                        <Skeleton variant="rectangular" width={80} height={32} sx={{ borderRadius: 1 }} />
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default TableSkeleton;