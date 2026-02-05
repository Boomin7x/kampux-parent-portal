import {
    ChevronLeft,
    ChevronRight,
    FirstPage,
    LastPage,
    MoreHoriz,
} from '@mui/icons-material';
import {
    alpha,
    Box,
    FormControl,
    IconButton,
    MenuItem,
    Select,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import type {
    BaseTableData,
    PaginationConfig,
    UseDataTableReturn,
} from '../types/table.types';

interface TablePaginationProps<TData extends BaseTableData> {
    table: UseDataTableReturn<TData>['table'];
    state: UseDataTableReturn<TData>['state'];
    actions: UseDataTableReturn<TData>['actions'];
    computed: UseDataTableReturn<TData>['computed'];
    config?: PaginationConfig;
}

export function TablePagination<TData extends BaseTableData>({
    state,
    actions,
    computed,
    config = {},
}: TablePaginationProps<TData>) {
    const theme = useTheme();
    const [jumpToPage, setJumpToPage] = useState('');

    const {
        pageSizes = [10, 25, 50, 100],
        showPageSizeSelector = true,
        showFirstLastButtons = true,
        showPreviousNextButtons = true,
        showQuickJumper = true,
        showTotal = true,
    } = config;

    const currentPage = state.pagination.pageIndex + 1;
    const totalPages = computed.pageCount;
    const pageSize = state.pagination.pageSize;

    // ====================
    // Page Navigation
    // ====================

    const goToPage = (page: number) => {
        const pageIndex = Math.max(0, Math.min(page - 1, totalPages - 1));
        actions.setPagination({
            ...state.pagination,
            pageIndex,
        });
    };

    const goToFirstPage = () => goToPage(1);
    const goToLastPage = () => goToPage(totalPages);
    const goToPreviousPage = () => goToPage(currentPage - 1);
    const goToNextPage = () => goToPage(currentPage + 1);

    const handlePageSizeChange = (newPageSize: number) => {
        actions.setPagination({
            pageIndex: 0, // Reset to first page
            pageSize: newPageSize,
        });
    };

    const handleJumpToPage = () => {
        const page = parseInt(jumpToPage, 10);
        if (!isNaN(page) && page >= 1 && page <= totalPages) {
            goToPage(page);
            setJumpToPage('');
        }
    };

    const handleJumpToPageKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleJumpToPage();
        }
    };

    // ====================
    // Page Number Generation
    // ====================

    const pageNumbers = useMemo(() => {
        const delta = 2; // Number of pages to show on each side of current page
        const range = [];
        const rangeWithDots = [];

        // Calculate range of page numbers to show
        const left = Math.max(1, currentPage - delta);
        const right = Math.min(totalPages, currentPage + delta);

        for (let i = left; i <= right; i++) {
            range.push(i);
        }

        let l = 0; // Last page added to rangeWithDots

        for (let i = 0; i < range.length; i++) {
            const page = range[i];

            // Add dots if there's a gap
            if (page - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (page - l !== 1) {
                rangeWithDots.push('...');
            }

            rangeWithDots.push(page);
            l = page;
        }

        return rangeWithDots;
    }, [currentPage, totalPages]);

    // ====================
    // Display Information
    // ====================

    const startRow =
        computed.filteredRowCount === 0
            ? 0
            : state.pagination.pageIndex * pageSize + 1;
    const endRow = Math.min(
        (state.pagination.pageIndex + 1) * pageSize,
        computed.filteredRowCount
    );

    if (totalPages <= 1 && !showTotal) {
        return null;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2,
                p: 2,
                borderTop: `1px solid ${theme.palette.divider}`,
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
            }}
        >
            {/* Left side - Total and page size selector */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    flexWrap: 'wrap',
                }}
            >
                {showTotal && (
                    <Typography variant="body2" color="text.secondary">
                        {computed.filteredRowCount === 0
                            ? 'No records'
                            : `Showing ${startRow.toLocaleString()} to ${endRow.toLocaleString()} of ${computed.filteredRowCount.toLocaleString()} ${computed.filteredRowCount === 1 ? 'record' : 'records'}`}
                        {computed.filteredRowCount !==
                            computed.totalRowCount && (
                            <span>
                                {' '}
                                (filtered from{' '}
                                {computed.totalRowCount.toLocaleString()} total)
                            </span>
                        )}
                    </Typography>
                )}

                {showPageSizeSelector && pageSizes.length > 1 && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Show
                        </Typography>
                        <FormControl size="small" variant="outlined">
                            <Select
                                value={pageSize}
                                onChange={e =>
                                    handlePageSizeChange(Number(e.target.value))
                                }
                                sx={{
                                    minWidth: 70,
                                    '& .MuiSelect-select': {
                                        py: 0.75,
                                    },
                                }}
                            >
                                {pageSizes.map(size => (
                                    <MenuItem key={size} value={size}>
                                        {size}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Typography variant="body2" color="text.secondary">
                            per page
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* Center - Page navigation */}
            {totalPages > 1 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* First page button */}
                    {showFirstLastButtons && (
                        <Tooltip title="First page">
                            <span>
                                <IconButton
                                    size="small"
                                    onClick={goToFirstPage}
                                    disabled={!computed.canPreviousPage}
                                    sx={{
                                        color: 'text.secondary',
                                        '&:hover': {
                                            backgroundColor: alpha(
                                                theme.palette.primary.main,
                                                0.1
                                            ),
                                            color: 'primary.main',
                                        },
                                    }}
                                >
                                    <FirstPage />
                                </IconButton>
                            </span>
                        </Tooltip>
                    )}

                    {/* Previous page button */}
                    {showPreviousNextButtons && (
                        <Tooltip title="Previous page">
                            <span>
                                <IconButton
                                    size="small"
                                    onClick={goToPreviousPage}
                                    disabled={!computed.canPreviousPage}
                                    sx={{
                                        color: 'text.secondary',
                                        '&:hover': {
                                            backgroundColor: alpha(
                                                theme.palette.primary.main,
                                                0.1
                                            ),
                                            color: 'primary.main',
                                        },
                                    }}
                                >
                                    <ChevronLeft />
                                </IconButton>
                            </span>
                        </Tooltip>
                    )}

                    {/* Page numbers */}
                    <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                        {/* Always show page 1 if not in current range */}
                        {!pageNumbers.includes(1) && totalPages > 1 && (
                            <>
                                <IconButton
                                    size="small"
                                    onClick={() => goToPage(1)}
                                    sx={{
                                        minWidth: 32,
                                        height: 32,
                                        color: 'text.secondary',
                                        '&:hover': {
                                            backgroundColor: alpha(
                                                theme.palette.primary.main,
                                                0.1
                                            ),
                                            color: 'primary.main',
                                        },
                                    }}
                                >
                                    1
                                </IconButton>
                                {pageNumbers[0] !== 2 && (
                                    <MoreHoriz
                                        sx={{
                                            color: 'text.disabled',
                                            fontSize: '1rem',
                                        }}
                                    />
                                )}
                            </>
                        )}

                        {/* Page number buttons */}
                        {pageNumbers.map((page, index) => (
                            <React.Fragment key={index}>
                                {page === '...' ? (
                                    <MoreHoriz
                                        sx={{
                                            color: 'text.disabled',
                                            fontSize: '1rem',
                                        }}
                                    />
                                ) : (
                                    <IconButton
                                        size="small"
                                        onClick={() => goToPage(page as number)}
                                        sx={{
                                            minWidth: 32,
                                            height: 32,
                                            backgroundColor:
                                                currentPage === page
                                                    ? alpha(
                                                          theme.palette.primary
                                                              .main,
                                                          0.2
                                                      )
                                                    : 'transparent',
                                            color:
                                                currentPage === page
                                                    ? 'primary.main'
                                                    : 'text.secondary',
                                            fontWeight:
                                                currentPage === page
                                                    ? 600
                                                    : 400,
                                            '&:hover': {
                                                backgroundColor: alpha(
                                                    theme.palette.primary.main,
                                                    0.1
                                                ),
                                                color: 'primary.main',
                                            },
                                        }}
                                    >
                                        {page}
                                    </IconButton>
                                )}
                            </React.Fragment>
                        ))}

                        {/* Always show last page if not in current range */}
                        {!pageNumbers.includes(totalPages) &&
                            totalPages > 1 && (
                                <>
                                    {pageNumbers[pageNumbers.length - 1] !==
                                        totalPages - 1 && (
                                        <MoreHoriz
                                            sx={{
                                                color: 'text.disabled',
                                                fontSize: '1rem',
                                            }}
                                        />
                                    )}
                                    <IconButton
                                        size="small"
                                        onClick={() => goToPage(totalPages)}
                                        sx={{
                                            minWidth: 32,
                                            height: 32,
                                            color: 'text.secondary',
                                            '&:hover': {
                                                backgroundColor: alpha(
                                                    theme.palette.primary.main,
                                                    0.1
                                                ),
                                                color: 'primary.main',
                                            },
                                        }}
                                    >
                                        {totalPages}
                                    </IconButton>
                                </>
                            )}
                    </Box>

                    {/* Next page button */}
                    {showPreviousNextButtons && (
                        <Tooltip title="Next page">
                            <span>
                                <IconButton
                                    size="small"
                                    onClick={goToNextPage}
                                    disabled={!computed.canNextPage}
                                    sx={{
                                        color: 'text.secondary',
                                        '&:hover': {
                                            backgroundColor: alpha(
                                                theme.palette.primary.main,
                                                0.1
                                            ),
                                            color: 'primary.main',
                                        },
                                    }}
                                >
                                    <ChevronRight />
                                </IconButton>
                            </span>
                        </Tooltip>
                    )}

                    {/* Last page button */}
                    {showFirstLastButtons && (
                        <Tooltip title="Last page">
                            <span>
                                <IconButton
                                    size="small"
                                    onClick={goToLastPage}
                                    disabled={!computed.canNextPage}
                                    sx={{
                                        color: 'text.secondary',
                                        '&:hover': {
                                            backgroundColor: alpha(
                                                theme.palette.primary.main,
                                                0.1
                                            ),
                                            color: 'primary.main',
                                        },
                                    }}
                                >
                                    <LastPage />
                                </IconButton>
                            </span>
                        </Tooltip>
                    )}
                </Box>
            )}

            {/* Right side - Quick jump to page */}
            {showQuickJumper && totalPages > 5 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        Go to
                    </Typography>
                    <TextField
                        size="small"
                        variant="outlined"
                        value={jumpToPage}
                        onChange={e => setJumpToPage(e.target.value)}
                        onBlur={handleJumpToPage}
                        onKeyDown={handleJumpToPageKeyDown}
                        placeholder={`1-${totalPages}`}
                        sx={{
                            width: 80,
                            '& .MuiOutlinedInput-root': {
                                height: 32,
                                '& input': {
                                    py: 0.5,
                                    textAlign: 'center',
                                },
                            },
                        }}
                        inputProps={{
                            type: 'number',
                            min: 1,
                            max: totalPages,
                        }}
                    />
                </Box>
            )}
        </Box>
    );
}
