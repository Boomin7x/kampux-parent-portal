import type { SxProps, Theme } from '@mui/material/styles';

// Common form styling constants for auth components
export const authStyles = {
    // Form container
    formContainer: {
        width: '100%',
        maxWidth: '400px',
        mx: 'auto',
    } as SxProps<Theme>,

    // Input field styling
    textField: {
        mb: 3,
        '& .MuiOutlinedInput-root': {
            borderRadius: 2,
        },
    } as SxProps<Theme>,

    // Password field styling
    passwordField: {
        mb: 2,
        '& .MuiOutlinedInput-root': {
            borderRadius: 2,
        },
    } as SxProps<Theme>,

    // Confirm password field styling
    confirmPasswordField: {
        mb: 3,
        '& .MuiOutlinedInput-root': {
            borderRadius: 2,
        },
    } as SxProps<Theme>,

    // Name fields container
    nameFieldsContainer: {
        display: 'flex',
        gap: 2,
        mb: 3,
    } as SxProps<Theme>,

    // Submit button styling
    submitButton: {
        py: 1.5,
        borderRadius: 2,
        fontSize: '1rem',
        fontWeight: 600,
        textTransform: 'none',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        '&:hover': {
            background: 'linear-gradient(135deg, #5b5bd6, #7c3aed)',
            transform: 'translateY(-1px)',
        },
        '&:disabled': {
            background: 'grey.300',
            transform: 'none',
        },
        mb: 3,
    } as SxProps<Theme>,

    // Social auth button styling
    socialButton: {
        py: 1.5,
        borderRadius: 2,
        fontSize: '1rem',
        fontWeight: 500,
        textTransform: 'none',
        borderColor: 'grey.300',
        color: 'text.primary',
        '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'grey.50',
        },
        mb: 4,
    } as SxProps<Theme>,

    // Divider container
    dividerContainer: {
        position: 'relative',
        mb: 3,
    } as SxProps<Theme>,

    // Divider text
    dividerText: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        px: 2,
        color: 'text.secondary',
        fontSize: '0.875rem',
    } as SxProps<Theme>,

    // Checkbox styling
    checkbox: {
        color: 'text.secondary',
        '&.Mui-checked': {
            color: 'primary.main',
        },
    } as SxProps<Theme>,

    // Link button styling
    linkButton: {
        p: 0,
        minWidth: 'auto',
        color: 'primary.main',
        textDecoration: 'none',
        fontSize: '0.875rem',
        '&:hover': {
            backgroundColor: 'transparent',
            textDecoration: 'underline',
        },
    } as SxProps<Theme>,

    // Form actions container
    formActionsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
    } as SxProps<Theme>,

    // Terms container (for signup)
    termsContainer: {
        alignItems: 'flex-start',
        mb: 4,
    } as SxProps<Theme>,

    // Footer text
    footerText: {
        color: 'text.secondary',
        fontSize: '0.875rem',
        textAlign: 'center',
    } as SxProps<Theme>,

    // Footer link
    footerLink: {
        p: 0,
        minWidth: 'auto',
        color: 'primary.main',
        textTransform: 'none',
        fontSize: '0.875rem',
        fontWeight: 600,
        '&:hover': {
            backgroundColor: 'transparent',
            textDecoration: 'underline',
        },
    } as SxProps<Theme>,
};

// Animation keyframes for form transitions
export const formAnimations = {
    slideIn: {
        animation: 'slideInForm 0.3s ease-out',
        '@keyframes slideInForm': {
            from: {
                opacity: 0,
                transform: 'translateY(20px)',
            },
            to: {
                opacity: 1,
                transform: 'translateY(0)',
            },
        },
    } as SxProps<Theme>,

    fadeIn: {
        animation: 'fadeInForm 0.2s ease-in-out',
        '@keyframes fadeInForm': {
            from: {
                opacity: 0,
            },
            to: {
                opacity: 1,
            },
        },
    } as SxProps<Theme>,
};
