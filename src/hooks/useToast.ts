import { useCallback } from 'react';
import {
    ApiToast,
    AuthToast,
    FormToast,
    Toast,
    type ToastOptions,
} from '../utils/toast';

export const useToast = () => {
    const showSuccess = useCallback(
        (message: string, options?: ToastOptions) => {
            return Toast.success(message, options);
        },
        []
    );

    const showError = useCallback((message: string, options?: ToastOptions) => {
        return Toast.error(message, options);
    }, []);

    const showWarning = useCallback(
        (message: string, options?: ToastOptions) => {
            return Toast.warning(message, options);
        },
        []
    );

    const showInfo = useCallback((message: string, options?: ToastOptions) => {
        return Toast.info(message, options);
    }, []);

    const showLoading = useCallback(
        (message: string, options?: Omit<ToastOptions, 'duration'>) => {
            return Toast.loading(message, options);
        },
        []
    );

    const showPromise = useCallback(
        <T>(
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
            return Toast.promise(promise, options);
        },
        []
    );

    const dismiss = useCallback((toastId?: string | number) => {
        return Toast.dismiss(toastId);
    }, []);

    const dismissAll = useCallback(() => {
        return Toast.dismissAll();
    }, []);

    return {
        success: showSuccess,
        error: showError,
        warning: showWarning,
        info: showInfo,
        loading: showLoading,
        promise: showPromise,
        dismiss,
        dismissAll,
        // Convenient aliases
        auth: AuthToast,
        api: ApiToast,
        form: FormToast,
    };
};

export default useToast;
