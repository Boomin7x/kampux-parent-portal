# DataTable Quick Usage Guide

## 🚀 Getting Started (5 minutes)

### 1. Basic Table Setup

```tsx
import { ResponsiveDataTable, columnBuilders } from '@/components/ui/DataTable';

// Define your data type
interface Student {
    id: number;
    name: string;
    email: string;
    grade: number;
    isActive: boolean;
}

// Create columns
const columns = [
    columnBuilders.text<Student>('name', { title: 'Student Name' }),
    columnBuilders.text<Student>('email', { title: 'Email Address' }),
    columnBuilders.number<Student>('grade', { title: 'Grade' }),
];

// Use the table
function StudentsTable() {
    const [students, setStudents] = useState<Student[]>([]);

    return (
        <ResponsiveDataTable
            data={students}
            columns={columns}
            enableSearch
            pagination={{ enabled: true }}
        />
    );
}
```

### 2. Add Search and Filters

```tsx
const filters = [
    {
        id: 'grade',
        column: 'grade',
        type: 'numberRange' as const,
        label: 'Grade Range',
        min: 0,
        max: 100,
    },
    {
        id: 'isActive',
        column: 'isActive',
        type: 'boolean' as const,
        label: 'Active Students Only',
    },
];

<ResponsiveDataTable
    data={students}
    columns={columns}
    filters={filters}
    enableSearch
    enableFilters
    pagination={{ enabled: true }}
/>;
```

### 3. Add Actions

```tsx
import { Edit, Delete, Visibility } from '@mui/icons-material';

const columnsWithActions = [
    ...columns,
    {
        id: 'actions',
        header: 'Actions',
        meta: { type: 'actions' },
        cell: ({ row }: any) => ({
            actions: [
                {
                    icon: <Visibility />,
                    label: 'View',
                    onClick: () => viewStudent(row.original.id),
                    color: 'primary',
                },
                {
                    icon: <Edit />,
                    label: 'Edit',
                    onClick: () => editStudent(row.original.id),
                    color: 'secondary',
                },
                {
                    icon: <Delete />,
                    label: 'Delete',
                    onClick: () => deleteStudent(row.original.id),
                    color: 'error',
                },
            ],
        }),
    },
];
```

## 🎯 Common Use Cases

### Student Management Table

```tsx
<ResponsiveDataTable
    data={students}
    columns={studentColumns}
    enableSearch
    enableFilters
    selection={{ enabled: true, multiple: true }}
    toolbar={{
        customActions: [
            {
                id: 'add-student',
                label: 'Add Student',
                icon: <PersonAdd />,
                onClick: () => setShowAddModal(true),
                variant: 'contained',
            },
        ],
    }}
    onRowClick={student => navigate(`/students/${student.id}`)}
/>
```

### Financial Reports Table

```tsx
<ResponsiveDataTable
    data={transactions}
    columns={[
        columnBuilders.date('date', { title: 'Date' }),
        columnBuilders.text('description', { title: 'Description' }),
        columnBuilders.number('amount', {
            title: 'Amount',
            cell: ({ getValue }) => `$${getValue().toLocaleString()}`,
            meta: { align: 'right' },
        }),
    ]}
    toolbar={{ showExport: true }}
    styling={{ stickyHeader: true, maxHeight: 500 }}
/>
```

### Large Dataset with Virtualization

```tsx
<ResponsiveDataTable
    data={largeDataset}
    columns={columns}
    enableVirtualization
    virtualizationThreshold={500}
    enableInfiniteLoading
    hasNextPage={hasMore}
    loadNextPage={loadMoreData}
/>
```

## 📱 Mobile Optimization

```tsx
<ResponsiveDataTable
    data={users}
    columns={columns}
    // Define what shows prominently on mobile
    mobilePrimaryFields={['name', 'email']}
    // Secondary info in compact view
    mobileSecondaryFields={['department', 'status']}
    // Enable expand button for additional fields
    mobileShowExpandButton={true}
/>
```

## 🔧 Pro Tips

### 1. Performance

- Use `useMemo` for columns and data
- Enable virtualization for 500+ rows
- Use server-side processing for 10,000+ rows

### 2. TypeScript

- Always define your data interface
- Use typed column builders
- Type your event handlers

### 3. User Experience

- Provide meaningful empty states
- Add loading indicators
- Use appropriate filter types

### 4. Mobile

- Test on actual devices
- Define mobile field priorities
- Consider touch target sizes

## 🆘 Need Help?

1. **Check the example**: `/src/components/examples/DataTableExample.tsx`
2. **Read the full docs**: `README.md` in the DataTable folder
3. **Common patterns**: Look for similar tables in the codebase
4. **TypeScript errors**: Ensure your data interface extends `BaseTableData`

## ⚡ Quick Commands

```bash
# Run the example
npm run dev
# Navigate to the DataTable example page

# Add new filter type
# Edit: src/components/ui/DataTable/utils/filterHelpers.ts

# Customize styling
# Edit: Your table's styling prop or theme
```
