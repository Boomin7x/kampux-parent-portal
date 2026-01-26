import '@fontsource/outfit/300.css';
import '@fontsource/outfit/400.css';
import '@fontsource/outfit/500.css';
import '@fontsource/outfit/600.css';
import '@fontsource/outfit/700.css';
import { createTheme } from '@mui/material/styles';

// Design tokens
const colors = {
    purple: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#6366f1', // main
        600: '#4f46e5',
        700: '#4338ca', // dark
        800: '#3730a3',
        900: '#312e81',
    },
    neutral: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#e5e5e5',
        300: '#d4d4d4',
        400: '#a3a3a3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
    },
};

const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
};

const shadows = {
    subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    soft: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

const theme = createTheme({
    transitions: {
        duration: {
            shortest: 150,
            shorter: 200,
            short: 250,
            standard: 300,
            complex: 375,
            enteringScreen: 225,
            leavingScreen: 195,
        },
        easing: {
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
        },
    },
    palette: {
        primary: {
            main: colors.purple[500],
            light: '#8b5cf6',
            dark: colors.purple[700],
            contrastText: '#ffffff',
        },
        secondary: {
            main: colors.neutral[800],
            light: colors.neutral[600],
            dark: colors.neutral[900],
            contrastText: '#ffffff',
        },
        background: {
            default: '#fefefe',
            paper: '#ffffff',
        },
        text: {
            primary: colors.neutral[900],
            secondary: colors.neutral[600],
            disabled: colors.neutral[400],
        },
        divider: colors.neutral[200],
        grey: colors.neutral,
        success: {
            main: '#10b981',
            light: '#34d399',
            dark: '#059669',
        },
        warning: {
            main: '#f59e0b',
            light: '#fbbf24',
            dark: '#d97706',
        },
        error: {
            main: '#ef4444',
            light: '#f87171',
            dark: '#dc2626',
        },
    },
    typography: {
        fontFamily: '"Outfit", "Inter", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
        h1: {
            fontWeight: 700,
            fontSize: '2rem', // Reduced from 2.5rem
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
        },
        h2: {
            fontWeight: 600,
            fontSize: '1.75rem', // Reduced from 2rem
            lineHeight: 1.3,
            letterSpacing: '-0.02em',
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.5rem', // Reduced from 1.75rem
            lineHeight: 1.3,
            letterSpacing: '-0.015em',
        },
        h4: {
            fontWeight: 500,
            fontSize: '1.25rem', // Reduced from 1.5rem
            lineHeight: 1.4,
            letterSpacing: '-0.01em',
        },
        h5: {
            fontWeight: 500,
            fontSize: '1.125rem', // Reduced from 1.25rem
            lineHeight: 1.4,
            letterSpacing: '-0.005em',
        },
        h6: {
            fontWeight: 500,
            fontSize: '1rem',
            lineHeight: 1.5,
            letterSpacing: '0em',
        },
        subtitle1: {
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: 1.5,
            letterSpacing: '0.005em',
        },
        subtitle2: {
            fontWeight: 500,
            fontSize: '0.8125rem',
            lineHeight: 1.5,
            letterSpacing: '0.01em',
        },
        body1: {
            fontWeight: 400,
            fontSize: '0.875rem', // Reduced from 1rem
            lineHeight: 1.6,
            letterSpacing: '0.005em',
        },
        body2: {
            fontWeight: 400,
            fontSize: '0.8125rem', // Reduced from 0.875rem
            lineHeight: 1.6,
            letterSpacing: '0.01em',
        },
        button: {
            fontWeight: 500,
            fontSize: '0.8125rem', // Reduced from 0.875rem
            lineHeight: 1.4,
            letterSpacing: '0.01em',
            textTransform: 'none',
        },
        caption: {
            fontWeight: 400,
            fontSize: '0.75rem',
            lineHeight: 1.5,
            letterSpacing: '0.015em',
        },
        overline: {
            fontWeight: 500,
            fontSize: '0.6875rem',
            lineHeight: 1.4,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
        },
    },
    spacing: spacing.sm, // 8px base unit
    shape: {
        borderRadius: 4, // Extra small radius
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    padding: `${spacing.sm}px ${spacing.lg}px`,
                    boxShadow: 'none',
                    minHeight: 40,
                    fontWeight: 500,
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        boxShadow: shadows.soft,
                        transform: 'translateY(-1px)',
                    },
                    '&:active': {
                        transform: 'translateY(0px)',
                    },
                },
                sizeSmall: {
                    padding: `${spacing.xs}px ${spacing.md}px`,
                    minHeight: 32,
                    fontSize: '0.75rem',
                },
                sizeLarge: {
                    padding: `${spacing.md}px ${spacing.xl}px`,
                    minHeight: 48,
                    fontSize: '0.875rem',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    boxShadow: shadows.subtle,
                    border: `1px solid ${colors.neutral[200]}`,
                    padding: spacing.lg,
                    '&:hover': {
                        boxShadow: shadows.soft,
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 4,
                        fontSize: '0.875rem',
                        backgroundColor: '#ffffff',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: colors.neutral[400],
                            },
                        },
                        '&.Mui-focused': {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderWidth: 2,
                                borderColor: colors.purple[500],
                                boxShadow: `0 0 0 3px ${colors.purple[500]}20`,
                            },
                        },
                    },
                    '& .MuiInputLabel-root': {
                        fontSize: '0.875rem',
                        '&.Mui-focused': {
                            color: colors.purple[500],
                        },
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    boxShadow: shadows.subtle,
                    border: `1px solid ${colors.neutral[200]}`,
                },
                elevation1: {
                    boxShadow: shadows.soft,
                },
                elevation2: {
                    boxShadow: shadows.medium,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    height: 28,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                    color: colors.neutral[900],
                    boxShadow: shadows.subtle,
                    borderBottom: `1px solid ${colors.neutral[200]}`,
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    fontSize: '0.8125rem',
                    padding: `${spacing.md}px ${spacing.lg}px`,
                    borderBottom: `1px solid ${colors.neutral[200]}`,
                },
                head: {
                    backgroundColor: colors.neutral[50],
                    fontWeight: 600,
                    color: colors.neutral[700],
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    padding: spacing.sm,
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        backgroundColor: colors.neutral[100],
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    minHeight: 44,
                },
                indicator: {
                    backgroundColor: colors.purple[500],
                    height: 2,
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    minHeight: 44,
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textTransform: 'none',
                    color: colors.neutral[600],
                    '&.Mui-selected': {
                        color: colors.purple[500],
                    },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 8,
                    padding: spacing.lg,
                    boxShadow: shadows.xl,
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: colors.neutral[200],
                    margin: `${spacing.lg}px 0`,
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    marginBottom: spacing.xs,
                    '&.Mui-selected': {
                        backgroundColor: colors.purple[50],
                        color: colors.purple[700],
                        '&:hover': {
                            backgroundColor: colors.purple[100],
                        },
                    },
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingLeft: spacing.lg,
                    paddingRight: spacing.lg,
                    '@media (max-width: 768px)': {
                        paddingLeft: spacing.md,
                        paddingRight: spacing.md,
                    },
                },
            },
        },
    },
});

export default theme;
