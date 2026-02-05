import { toast } from 'sonner';

export interface ToastOptions {
    description?: string;
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
    cancel?: {
        label: string;
        onClick?: () => void;
    };
    important?: boolean;
}

export const Toast = {
    success: (message: string, options?: ToastOptions) => {
        return toast.success(message, {
            description: options?.description,
            duration: options?.duration || 4000,
            action: options?.action,
            cancel: options?.cancel as any,
        });
    },

    error: (message: string, options?: ToastOptions) => {
        return toast.error(message, {
            description: options?.description,
            duration: options?.duration || 5000,
            action: options?.action,
            cancel: options?.cancel as any,
        });
    },

    warning: (message: string, options?: ToastOptions) => {
        return toast.warning(message, {
            description: options?.description,
            duration: options?.duration || 4000,
            action: options?.action,
            cancel: options?.cancel as any,
        });
    },

    info: (message: string, options?: ToastOptions) => {
        return toast.info(message, {
            description: options?.description,
            duration: options?.duration || 4000,
            action: options?.action,
            cancel: options?.cancel as any,
        });
    },

    loading: (message: string, options?: Omit<ToastOptions, 'duration'>) => {
        return toast.loading(message, {
            description: options?.description,
            action: options?.action,
            cancel: options?.cancel as any,
        });
    },

    promise: <T>(
        promise: Promise<T>,
        options: {
            loading: string;
            success: string | ((data: T) => string);
            error: string | ((error: Error) => string);
            description?: string;
            duration?: number;
            action?: {
                label: string;
                onClick: () => void;
            };
        }
    ) => {
        return toast.promise(promise, {
            loading: options.loading,
            success: options.success,
            error: options.error,
            description: options.description,
            duration: options.duration || 4000,
            action: options.action,
        });
    },

    custom: (jsx: React.ReactNode, options?: ToastOptions) => {
        return toast(jsx, {
            duration: options?.duration || 4000,
            action: options?.action,
            cancel: options?.cancel as any,
        });
    },

    dismiss: (toastId?: string | number) => {
        return toast.dismiss(toastId);
    },

    dismissAll: () => {
        return toast.dismiss();
    },
};

// Auth-specific toast helpers
export const AuthToast = {
    loginSuccess: (userName?: string) => {
        Toast.success(
            userName ? `Welcome back, ${userName}!` : 'Login successful!',
            {
                description: 'Redirecting to your dashboard...',
            }
        );
    },

    loginError: (error?: string) => {
        Toast.error('Login failed', {
            description:
                error || 'Please check your credentials and try again.',
        });
    },

    signupSuccess: () => {
        Toast.success('Account created successfully!', {
            description: 'Please check your email to verify your account.',
        });
    },

    signupError: (error?: string) => {
        Toast.error('Registration failed', {
            description: error || 'Please try again or contact support.',
        });
    },

    passwordResetSent: (email: string) => {
        Toast.success('Password reset link sent!', {
            description: `Check your inbox at ${email}`,
        });
    },

    passwordResetSuccess: () => {
        Toast.success('Password reset successful!', {
            description: 'You can now log in with your new password.',
        });
    },

    emailVerified: () => {
        Toast.success('Email verified successfully!', {
            description: 'Welcome to the parent portal.',
        });
    },

    emailVerificationSent: (email: string) => {
        Toast.info('Verification email sent', {
            description: `Check your inbox at ${email}`,
        });
    },

    otpSent: (email: string) => {
        Toast.info('OTP sent to your email', {
            description: `Check ${email} for your verification code.`,
        });
    },

    sessionExpired: () => {
        Toast.warning('Session expired', {
            description: 'Please log in again to continue.',
        });
    },
};

// API-specific toast helpers
export const ApiToast = {
    networkError: () => {
        Toast.error('Network error', {
            description: 'Please check your internet connection and try again.',
            action: {
                label: 'Retry',
                onClick: () => window.location.reload(),
            },
        });
    },

    serverError: () => {
        Toast.error('Server error', {
            description:
                'Something went wrong on our end. Please try again later.',
        });
    },

    unauthorized: () => {
        Toast.warning('Unauthorized access', {
            description: 'Please log in to access this feature.',
        });
    },

    permissionDenied: () => {
        Toast.error('Permission denied', {
            description: "You don't have permission to perform this action.",
        });
    },
};

// Form-specific toast helpers
export const FormToast = {
    saveSuccess: (itemName?: string) => {
        Toast.success(
            itemName ? `${itemName} saved successfully!` : 'Changes saved!',
            {
                description: 'Your updates have been applied.',
            }
        );
    },

    deleteSuccess: (itemName?: string) => {
        Toast.success(
            itemName ? `${itemName} deleted successfully!` : 'Item deleted!',
            {
                description: 'The item has been permanently removed.',
            }
        );
    },

    validationError: (errors: string[]) => {
        Toast.error('Please fix the following errors:', {
            description:
                errors.slice(0, 3).join(', ') +
                (errors.length > 3 ? '...' : ''),
        });
    },
};

export default Toast;
