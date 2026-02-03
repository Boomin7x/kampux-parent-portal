import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { queryClient } from './lib/queryClient';
import router from './routes/AppRouter';
import './styles/toaster.css';
import theme from './theme';

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <RouterProvider router={router} />
                <Toaster
                    position="top-center"
                    expand={true}
                    visibleToasts={4}
                    richColors={false}
                    closeButton={true}
                    theme={theme.palette.mode}
                    offset={0}
                    gap={0}
                    toastOptions={{
                        duration: 4000,
                        style: {
                            fontFamily: theme.typography.fontFamily,
                            fontSize: '0.875rem',
                            fontWeight: 400,
                            lineHeight: '1.5',
                            padding: '0',
                            margin: '0',
                            background: 'transparent',
                            border: 'none',
                            boxShadow: 'none',
                        },
                        classNames: {
                            toast: 'excellence-toast',
                            title: 'excellence-toast-title',
                            description: 'excellence-toast-description',
                            error: 'excellence-toast-error',
                            success: 'excellence-toast-success',
                            warning: 'excellence-toast-warning',
                            info: 'excellence-toast-info',
                            loading: 'excellence-toast-loading',
                            closeButton: 'excellence-toast-close',
                            actionButton: 'excellence-toast-action',
                            cancelButton: 'excellence-toast-cancel',
                        },
                    }}
                />
                {import.meta.env.DEV && (
                    <ReactQueryDevtools initialIsOpen={false} />
                )}
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
