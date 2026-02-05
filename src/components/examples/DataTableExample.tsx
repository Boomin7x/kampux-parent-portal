// import React, { useState, useMemo } from 'react';
// import {
//     Box,
//     Container,
//     Typography,
//     Paper,
//     Button,
//     Stack,
//     Switch,
//     FormControlLabel,
//     Divider,
// } from '@mui/material';
// import {
//     Person as PersonIcon,
//     Edit as EditIcon,
//     Delete as DeleteIcon,
//     Visibility as ViewIcon,
// } from '@mui/icons-material';

// import {
//     ResponsiveDataTable,
//     columnBuilders,
//     type TableColumn,
// } from '../ui/DataTable';

// // Sample data types
// interface User {
//     id: number;
//     firstName: string;
//     lastName: string;
//     email: string;
//     age: number;
//     department: string;
//     salary: number;
//     isActive: boolean;
//     joinDate: string;
//     avatar?: string;
//     status: 'active' | 'inactive' | 'pending';
// }

// // Generate sample data
// const generateSampleData = (count: number): User[] => {
//     const departments = [
//         'Engineering',
//         'Marketing',
//         'Sales',
//         'HR',
//         'Finance',
//         'Operations',
//     ];
//     const statuses: User['status'][] = ['active', 'inactive', 'pending'];

//     return Array.from({ length: count }, (_, index) => ({
//         id: index + 1,
//         firstName: `FirstName${index + 1}`,
//         lastName: `LastName${index + 1}`,
//         email: `user${index + 1}@example.com`,
//         age: Math.floor(Math.random() * 40) + 25,
//         department: departments[Math.floor(Math.random() * departments.length)],
//         salary: Math.floor(Math.random() * 80000) + 40000,
//         isActive: Math.random() > 0.3,
//         joinDate: new Date(
//             Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 5
//         )
//             .toISOString()
//             .split('T')[0],
//         status: statuses[Math.floor(Math.random() * statuses.length)],
//     }));
// };

// export function DataTableExample() {
//     const [dataSize, setDataSize] = useState(100);
//     const [enableVirtualization, setEnableVirtualization] = useState(false);
//     const [serverSideMode, setServerSideMode] = useState(false);

//     // Generate data
//     const data = useMemo(() => generateSampleData(dataSize), [dataSize]);

//     // Define columns
//     const columns = useMemo<TableColumn<User>[]>(
//         () => [
//             {
//                 id: 'avatar',
//                 header: 'Avatar',
//                 accessorFn: row => ({
//                     src: row.avatar,
//                     name: `${row.firstName} ${row.lastName}`,
//                     size: 'medium',
//                     showName: false,
//                 }),
//                 size: 80,
//                 meta: { type: 'avatar', align: 'center' },
//                 enableSorting: false,
//                 enableColumnFilter: false,
//             },
//             columnBuilders.text<User>('firstName', {
//                 title: 'First Name',
//                 width: 150,
//             }),
//             columnBuilders.text<User>('lastName', {
//                 title: 'Last Name',
//                 width: 150,
//             }),
//             columnBuilders.text<User>('email', {
//                 title: 'Email',
//                 width: 200,
//             }),
//             columnBuilders.number<User>('age', {
//                 title: 'Age',
//                 width: 100,
//                 meta: { align: 'center' },
//             }),
//             {
//                 id: 'department',
//                 header: 'Department',
//                 accessorKey: 'department',
//                 size: 120,
//                 filterable: true,
//             },
//             columnBuilders.number<User>('salary', {
//                 title: 'Salary',
//                 width: 120,
//                 meta: { align: 'right' },
//                 cell: ({ getValue }) => `$${getValue().toLocaleString()}`,
//             }),
//             {
//                 id: 'status',
//                 header: 'Status',
//                 accessorFn: row => ({
//                     value:
//                         row.status.charAt(0).toUpperCase() +
//                         row.status.slice(1),
//                     color:
//                         row.status === 'active'
//                             ? 'success'
//                             : row.status === 'inactive'
//                               ? 'error'
//                               : 'warning',
//                 }),
//                 size: 120,
//                 meta: { type: 'status', align: 'center' },
//                 enableSorting: false,
//             },
//             {
//                 id: 'isActive',
//                 header: 'Active',
//                 accessorFn: row => ({
//                     value: row.isActive ? 'Yes' : 'No',
//                     boolean: row.isActive,
//                     showIcons: true,
//                 }),
//                 size: 100,
//                 meta: { type: 'boolean', align: 'center' },
//             },
//             columnBuilders.date<User>('joinDate', {
//                 title: 'Join Date',
//                 width: 120,
//             }),
//             {
//                 id: 'actions',
//                 header: 'Actions',
//                 size: 120,
//                 enableSorting: false,
//                 enableColumnFilter: false,
//                 enableGlobalFilter: false,
//                 enableHiding: false,
//                 meta: { type: 'actions', align: 'center' },
//                 cell: ({ row }) => ({
//                     actions: [
//                         {
//                             icon: <ViewIcon />,
//                             label: 'View',
//                             onClick: () =>
//                                 console.log('View user:', row.original.id),
//                             color: 'primary',
//                         },
//                         {
//                             icon: <EditIcon />,
//                             label: 'Edit',
//                             onClick: () =>
//                                 console.log('Edit user:', row.original.id),
//                             color: 'secondary',
//                         },
//                         {
//                             icon: <DeleteIcon />,
//                             label: 'Delete',
//                             onClick: () =>
//                                 console.log('Delete user:', row.original.id),
//                             color: 'error',
//                             disabled: row.original.isActive, // Can't delete active users
//                         },
//                     ],
//                 }),
//             },
//         ],
//         []
//     );

//     // Table filters
//     const filters = useMemo(
//         () => [
//             {
//                 id: 'department',
//                 column: 'department',
//                 type: 'select' as const,
//                 label: 'Department',
//                 options: [
//                     { label: 'Engineering', value: 'Engineering' },
//                     { label: 'Marketing', value: 'Marketing' },
//                     { label: 'Sales', value: 'Sales' },
//                     { label: 'HR', value: 'HR' },
//                     { label: 'Finance', value: 'Finance' },
//                     { label: 'Operations', value: 'Operations' },
//                 ],
//             },
//             {
//                 id: 'age',
//                 column: 'age',
//                 type: 'numberRange' as const,
//                 label: 'Age Range',
//                 min: 20,
//                 max: 70,
//             },
//             {
//                 id: 'isActive',
//                 column: 'isActive',
//                 type: 'boolean' as const,
//                 label: 'Active Status',
//             },
//             {
//                 id: 'joinDate',
//                 column: 'joinDate',
//                 type: 'dateRange' as const,
//                 label: 'Join Date Range',
//             },
//         ],
//         []
//     );

//     return (
//         <Container maxWidth="xl" sx={{ py: 4 }}>
//             <Typography variant="h4" component="h1" gutterBottom>
//                 DataTable Component Example
//             </Typography>
//             <Typography variant="body1" color="text.secondary" paragraph>
//                 A comprehensive example of the DataTable component showcasing
//                 various features including responsive design, virtualization,
//                 filtering, and more.
//             </Typography>

//             {/* Controls */}
//             <Paper sx={{ p: 3, mb: 3 }}>
//                 <Typography variant="h6" gutterBottom>
//                     Demo Controls
//                 </Typography>
//                 <Stack direction="row" spacing={3} flexWrap="wrap">
//                     <Stack direction="row" spacing={1} alignItems="center">
//                         <Typography variant="body2">Data Size:</Typography>
//                         <Button
//                             size="small"
//                             variant={dataSize === 10 ? 'contained' : 'outlined'}
//                             onClick={() => setDataSize(10)}
//                         >
//                             10
//                         </Button>
//                         <Button
//                             size="small"
//                             variant={
//                                 dataSize === 100 ? 'contained' : 'outlined'
//                             }
//                             onClick={() => setDataSize(100)}
//                         >
//                             100
//                         </Button>
//                         <Button
//                             size="small"
//                             variant={
//                                 dataSize === 1000 ? 'contained' : 'outlined'
//                             }
//                             onClick={() => setDataSize(1000)}
//                         >
//                             1,000
//                         </Button>
//                         <Button
//                             size="small"
//                             variant={
//                                 dataSize === 10000 ? 'contained' : 'outlined'
//                             }
//                             onClick={() => setDataSize(10000)}
//                         >
//                             10,000
//                         </Button>
//                     </Stack>

//                     <Divider orientation="vertical" flexItem />

//                     <FormControlLabel
//                         control={
//                             <Switch
//                                 checked={enableVirtualization}
//                                 onChange={e =>
//                                     setEnableVirtualization(e.target.checked)
//                                 }
//                             />
//                         }
//                         label="Enable Virtualization"
//                     />

//                     <FormControlLabel
//                         control={
//                             <Switch
//                                 checked={serverSideMode}
//                                 onChange={e =>
//                                     setServerSideMode(e.target.checked)
//                                 }
//                                 disabled // Not implemented in this example
//                             />
//                         }
//                         label="Server-side Mode (Coming Soon)"
//                     />
//                 </Stack>
//             </Paper>

//             {/* Basic Table Example */}
//             <Paper sx={{ mb: 4 }}>
//                 <ResponsiveDataTable
//                     data={data}
//                     columns={columns}
//                     filters={filters}
//                     enableSearch
//                     enableFilters
//                     enableSorting
//                     enableColumnResizing
//                     enableHiding
//                     enableVirtualization={enableVirtualization}
//                     virtualizationThreshold={500}
//                     selection={{ enabled: true, multiple: true }}
//                     pagination={{
//                         enabled: true,
//                         pageSize: 25,
//                         pageSizes: [10, 25, 50, 100],
//                         showQuickJumper: true,
//                         showTotal: true,
//                     }}
//                     toolbar={{
//                         enabled: true,
//                         showSearch: true,
//                         showFilters: true,
//                         showColumns: true,
//                         showExport: true,
//                         showRefresh: true,
//                         showDensity: true,
//                         customActions: [
//                             {
//                                 id: 'add-user',
//                                 label: 'Add User',
//                                 icon: <PersonIcon />,
//                                 onClick: () => console.log('Add new user'),
//                                 variant: 'contained',
//                                 color: 'primary',
//                             },
//                         ],
//                     }}
//                     styling={{
//                         density: 'standard',
//                         striped: true,
//                         hoverable: true,
//                         stickyHeader: true,
//                         maxHeight: 600,
//                     }}
//                     onRowClick={row => console.log('Row clicked:', row)}
//                     onRowDoubleClick={row =>
//                         console.log('Row double-clicked:', row)
//                     }
//                     emptyMessage="No users found. Try adjusting your search criteria."
//                     // Mobile configuration
//                     mobilePrimaryFields={['firstName', 'lastName', 'email']}
//                     mobileSecondaryFields={['department', 'status']}
//                     mobileShowExpandButton={true}
//                 />
//             </Paper>

//             {/* Usage Examples */}
//             <Paper sx={{ p: 3 }}>
//                 <Typography variant="h6" gutterBottom>
//                     Key Features Demonstrated
//                 </Typography>
//                 <Stack spacing={2}>
//                     <Box>
//                         <Typography
//                             variant="subtitle2"
//                             fontWeight="bold"
//                             color="primary"
//                         >
//                             Responsive Design
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             Automatically switches to card view on mobile
//                             devices with customizable field display.
//                         </Typography>
//                     </Box>
//                     <Box>
//                         <Typography
//                             variant="subtitle2"
//                             fontWeight="bold"
//                             color="primary"
//                         >
//                             Virtualization
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             Handle large datasets efficiently with virtual
//                             scrolling (enabled for 500+ rows).
//                         </Typography>
//                     </Box>
//                     <Box>
//                         <Typography
//                             variant="subtitle2"
//                             fontWeight="bold"
//                             color="primary"
//                         >
//                             Advanced Filtering
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             Multiple filter types including text search, select
//                             dropdowns, date ranges, and number ranges.
//                         </Typography>
//                     </Box>
//                     <Box>
//                         <Typography
//                             variant="subtitle2"
//                             fontWeight="bold"
//                             color="primary"
//                         >
//                             Data Export
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             Export filtered data to CSV, Excel, JSON, or PDF
//                             formats with customizable options.
//                         </Typography>
//                     </Box>
//                     <Box>
//                         <Typography
//                             variant="subtitle2"
//                             fontWeight="bold"
//                             color="primary"
//                         >
//                             Column Management
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             Show/hide columns, resize, and reorder with
//                             intuitive controls.
//                         </Typography>
//                     </Box>
//                     <Box>
//                         <Typography
//                             variant="subtitle2"
//                             fontWeight="bold"
//                             color="primary"
//                         >
//                             Row Selection
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             Single or multi-row selection with bulk actions
//                             support.
//                         </Typography>
//                     </Box>
//                 </Stack>
//             </Paper>
//         </Container>
//     );
// }

// export default DataTableExample;
