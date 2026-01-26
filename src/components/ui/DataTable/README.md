# DataTable Component Suite

A comprehensive, enterprise-grade table component system built with TanStack Table v8, Material-UI, and TypeScript. Designed for maximum developer productivity and user experience.

## 🚀 Features

### Core Features
- **Full TypeScript Support** - Type-safe development with comprehensive interfaces
- **Responsive Design** - Automatically adapts to mobile with card layouts
- **Virtualization** - Handle 10,000+ rows with smooth scrolling
- **Server-side Support** - Complete server-side data handling
- **Advanced Filtering** - 7+ filter types with intuitive UI
- **Export Functionality** - CSV, Excel, JSON, PDF export options
- **Column Management** - Show/hide, resize, reorder columns
- **Row Selection** - Single/multi selection with bulk actions
- **Professional Styling** - Material-UI integration with customizable themes

### Advanced Features
- **Infinite Loading** - Seamless data loading for large datasets
- **Search & Filtering** - Global search + column-specific filters
- **Sorting & Pagination** - Multi-column sorting with smart pagination
- **Loading States** - Beautiful skeleton loaders and empty states
- **Accessibility** - WCAG compliant with keyboard navigation
- **State Persistence** - Save table state to localStorage
- **Custom Cell Renderers** - Avatar, status chips, boolean indicators, actions

## 📦 Installation

The table system is already installed and configured. Dependencies include:

```json
{
  "@tanstack/react-table": "^8.x",
  "@mui/material": "^5.x",
  "@mui/icons-material": "^5.x",
  "react-window": "^1.x",
  "react-window-infinite-loader": "^1.x"
}
```

## 🏁 Quick Start

### Basic Usage

```tsx
import { ResponsiveDataTable, columnBuilders } from '@/components/ui/DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

const columns = [
  columnBuilders.text<User>('name', { title: 'Name' }),
  columnBuilders.text<User>('email', { title: 'Email' }),
  {
    id: 'status',
    header: 'Status',
    accessorFn: (row) => ({
      value: row.status,
      color: row.status === 'active' ? 'success' : 'error',
    }),
    meta: { type: 'status' },
  },
];

function MyTable() {
  const [data, setData] = useState<User[]>([]);

  return (
    <ResponsiveDataTable
      data={data}
      columns={columns}
      enableSearch
      enableFilters
      pagination={{ enabled: true, pageSize: 25 }}
    />
  );
}
```

### Advanced Configuration

```tsx
<ResponsiveDataTable
  data={users}
  columns={columns}

  // Core features
  enableSearch={true}
  enableFilters={true}
  enableSorting={true}
  enableColumnResizing={true}
  enableHiding={true}

  // Virtualization for large datasets
  enableVirtualization={true}
  virtualizationThreshold={1000}

  // Row selection
  selection={{
    enabled: true,
    multiple: true,
  }}

  // Pagination
  pagination={{
    enabled: true,
    pageSize: 50,
    pageSizes: [25, 50, 100],
    showQuickJumper: true,
    showTotal: true,
  }}

  // Toolbar customization
  toolbar={{
    enabled: true,
    showSearch: true,
    showFilters: true,
    showColumns: true,
    showExport: true,
    showRefresh: true,
    customActions: [
      {
        id: 'add',
        label: 'Add User',
        icon: <AddIcon />,
        onClick: handleAddUser,
        variant: 'contained',
      },
    ],
  }}

  // Styling
  styling={{
    density: 'standard', // 'compact' | 'standard' | 'comfortable'
    striped: true,
    hoverable: true,
    stickyHeader: true,
    maxHeight: 600,
  }}

  // Mobile configuration
  mobilePrimaryFields={['name', 'email']}
  mobileSecondaryFields={['status', 'department']}

  // Event handlers
  onRowClick={(row) => console.log('Clicked:', row)}
  onRowDoubleClick={(row) => console.log('Double-clicked:', row)}
  onCellClick={(cell, row) => console.log('Cell clicked:', cell, row)}
/>
```

## 🔧 Column Builders

Use pre-built column types for common data patterns:

### Text Columns
```tsx
columnBuilders.text<User>('firstName', {
  title: 'First Name',
  width: 150,
  searchable: true,
  sortable: true,
})
```

### Number Columns
```tsx
columnBuilders.number<User>('salary', {
  title: 'Salary',
  width: 120,
  cell: ({ getValue }) => `$${getValue().toLocaleString()}`,
  meta: { align: 'right' },
})
```

### Date Columns
```tsx
columnBuilders.date<User>('joinDate', {
  title: 'Join Date',
  width: 120,
  format: 'MM/dd/yyyy',
})
```

### Custom Columns
```tsx
{
  id: 'avatar',
  header: 'Profile',
  accessorFn: (row) => ({
    src: row.avatar,
    name: row.fullName,
    size: 'medium',
    showName: true,
  }),
  meta: { type: 'avatar' },
}
```

## 🎯 Filter Types

The system supports comprehensive filtering:

```tsx
const filters = [
  {
    id: 'department',
    column: 'department',
    type: 'select',
    label: 'Department',
    options: [
      { label: 'Engineering', value: 'engineering' },
      { label: 'Marketing', value: 'marketing' },
    ],
  },
  {
    id: 'salary',
    column: 'salary',
    type: 'numberRange',
    label: 'Salary Range',
    min: 30000,
    max: 200000,
  },
  {
    id: 'joinDate',
    column: 'joinDate',
    type: 'dateRange',
    label: 'Join Date Range',
  },
  {
    id: 'isActive',
    column: 'isActive',
    type: 'boolean',
    label: 'Active Status',
  },
];
```

## 📱 Responsive Design

The table automatically switches to mobile-optimized card layout:

```tsx
<ResponsiveDataTable
  // ... other props
  mobileBreakpoint="md" // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  mobilePrimaryFields={['name', 'email']} // Always visible
  mobileSecondaryFields={['department', 'status']} // Compact view
  mobileShowExpandButton={true} // Show "View More" for additional fields
  mobileCompactMode={false} // Dense card layout
/>
```

## 🚀 Server-side Data

For server-side data handling:

```tsx
function ServerSideTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const handleDataRequest = useCallback(async (params) => {
    setLoading(true);
    try {
      const response = await fetchUsers(params);
      setData(response.data);
      setTotalCount(response.total);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ResponsiveDataTable
      data={data}
      columns={columns}
      serverSide={{
        enabled: true,
        loading,
        totalCount,
        onPaginationChange: handleDataRequest,
        onSortingChange: handleDataRequest,
        onFiltersChange: handleDataRequest,
        onSearchChange: handleDataRequest,
      }}
    />
  );
}
```

## ⚡ Virtualization

For large datasets (1000+ rows):

```tsx
<ResponsiveDataTable
  data={largeDataset}
  columns={columns}
  enableVirtualization={true}
  virtualizationThreshold={500} // Auto-enable at 500+ rows
  virtualItemHeight={52} // Row height in pixels
  virtualOverscan={10} // Buffer rows for smooth scrolling

  // Infinite loading
  enableInfiniteLoading={true}
  hasNextPage={hasMore}
  isNextPageLoading={loading}
  loadNextPage={loadMoreData}
/>
```

## 💾 Export Functionality

Built-in export to multiple formats:

```tsx
// Automatic export via toolbar
<ResponsiveDataTable
  toolbar={{ showExport: true }}
  // ... other props
/>

// Programmatic export
import { exportTableData } from '@/components/ui/DataTable';

const handleExport = () => {
  exportTableData(
    filteredData,
    visibleColumns,
    'csv', // 'csv' | 'excel' | 'json' | 'pdf'
    {
      filename: 'users_export',
      includeHeaders: true,
    }
  );
};
```

## 🎨 Custom Cell Renderers

Built-in cell types for common UI patterns:

### Avatar Cells
```tsx
{
  accessorFn: (row) => ({
    src: row.profileImage,
    name: `${row.firstName} ${row.lastName}`,
    size: 'medium',
    showName: true,
  }),
  meta: { type: 'avatar' },
}
```

### Status Chips
```tsx
{
  accessorFn: (row) => ({
    value: row.status,
    color: getStatusColor(row.status),
  }),
  meta: { type: 'status' },
}
```

### Boolean Indicators
```tsx
{
  accessorFn: (row) => ({
    value: row.isVerified ? 'Verified' : 'Pending',
    boolean: row.isVerified,
    showIcons: true,
  }),
  meta: { type: 'boolean' },
}
```

### Action Buttons
```tsx
{
  meta: { type: 'actions' },
  cell: ({ row }) => ({
    actions: [
      {
        icon: <EditIcon />,
        label: 'Edit',
        onClick: () => editUser(row.original.id),
        color: 'primary',
      },
      {
        icon: <DeleteIcon />,
        label: 'Delete',
        onClick: () => deleteUser(row.original.id),
        color: 'error',
        disabled: !row.original.canDelete,
      },
    ],
  }),
}
```

## 💡 Best Practices

### Performance Optimization
```tsx
// 1. Memoize columns and data
const columns = useMemo(() => [...], []);
const data = useMemo(() => [...], [rawData]);

// 2. Use virtualization for large datasets
enableVirtualization={data.length > 500}

// 3. Server-side processing for very large datasets
serverSide={{ enabled: data.length > 10000 }}

// 4. Debounce search and filters
onSearchChange={debounce(handleSearch, 300)}
```

### Type Safety
```tsx
// 1. Define strict interfaces
interface User extends BaseTableData {
  id: number;
  name: string;
  email: string;
}

// 2. Use typed column builders
const columns: TableColumn<User>[] = [
  columnBuilders.text<User>('name', { ... }),
];

// 3. Type event handlers
const handleRowClick = (row: User, index: number) => {
  // Fully typed row data
};
```

### Responsive Design
```tsx
// 1. Define mobile field priorities
mobilePrimaryFields={['name', 'email']} // Always visible
mobileSecondaryFields={['status']} // Compact view
// Other fields in expandable section

// 2. Optimize for touch devices
mobileCardSpacing={2} // Adequate touch targets
mobileShowExpandButton={true} // Progressive disclosure
```

## 🔍 Troubleshooting

### Common Issues

**Table not rendering:**
- Ensure data is an array
- Check that columns have valid accessorKey or accessorFn
- Verify all required props are provided

**Performance issues:**
- Enable virtualization for large datasets
- Use server-side processing for 10,000+ rows
- Memoize columns and data props

**Mobile layout issues:**
- Define mobilePrimaryFields for key data
- Test on actual mobile devices
- Consider mobileCompactMode for dense data

**Filter not working:**
- Ensure filter column matches actual column id
- Check filter type matches data type
- Verify filter options format

## 📚 API Reference

### Components
- `ResponsiveDataTable` - Main responsive table component
- `DataTable` - Desktop-only table component
- `MobileDataTable` - Mobile-optimized card layout
- `VirtualizedDataTable` - High-performance virtualized table

### Hooks
- `useDataTable` - Core table state management
- `useServerSideDataTable` - Server-side data handling
- `useClientSideDataTable` - Client-side data handling

### Utilities
- `columnBuilders` - Pre-built column configurations
- `filterFunctions` - Data filtering utilities
- `exportTableData` - Data export functionality
- `tableStateUtils` - State persistence utilities

### Types
- `BaseTableData` - Base interface for table data
- `TableColumn<T>` - Column configuration interface
- `DataTableProps<T>` - Main table props interface
- `FilterTypes` - Available filter type definitions

## 🤝 Contributing

1. Follow TypeScript strict mode
2. Add comprehensive prop documentation
3. Include unit tests for new features
4. Test on mobile devices
5. Performance test with large datasets

## 📄 License

This component is part of the Parent Portal project and follows the project's licensing terms.