import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { useCallback } from 'react';
import {
    type FieldValues,
    type Resolver,
    useForm,
    type UseFormProps,
    type UseFormReturn,
} from 'react-hook-form';
import * as yup from 'yup';
import { ApiError } from '../../lib/axios';

// Enhanced form hook that integrates React Hook Form with Yup validation and TanStack Query
export interface UseFormWithValidationProps<
    TFormData extends FieldValues,
> extends Omit<UseFormProps<TFormData>, 'resolver'> {
    schema: yup.ObjectSchema<TFormData>;
    onSubmit?: (data: TFormData) => Promise<any>;
    mutationOptions?: {
        onSuccess?: (data: any, variables: TFormData) => void;
        onError?: (error: ApiError, variables: TFormData) => void;
        onSettled?: () => void;
    };
}

export interface UseFormWithValidationReturn<
    TFormData extends FieldValues,
> extends UseFormReturn<TFormData> {
    mutation: UseMutationResult<any, ApiError, TFormData>;
    isSubmitting: boolean;
    submitError: string | null;
    handleSubmit: (
        onValid?: (data: TFormData) => void
    ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export function useFormWithValidation<TFormData extends FieldValues>({
    schema,
    onSubmit,
    mutationOptions,
    ...formOptions
}: UseFormWithValidationProps<TFormData>): UseFormWithValidationReturn<TFormData> {
    // Initialize React Hook Form with Yup resolver
    const form = useForm<TFormData>({
        ...formOptions,
        resolver: yupResolver(schema) as Resolver<TFormData>,
        mode: formOptions.mode || 'onChange',
        reValidateMode: formOptions.reValidateMode || 'onChange',
    });

    // Create mutation for form submission
    const mutation = useMutation<any, ApiError, TFormData>({
        mutationFn: async (data: TFormData) => {
            if (!onSubmit) {
                throw new Error('No submit handler provided');
            }
            return onSubmit(data);
        },
        onSuccess: (data, variables) => {
            // Clear form errors on successful submission
            form.clearErrors();
            mutationOptions?.onSuccess?.(data, variables);
        },
        onError: (error: ApiError, variables) => {
            // Handle server validation errors
            if (
                error.status === 422 &&
                typeof error === 'object' &&
                'errors' in error
            ) {
                // Set server validation errors on form fields
                const serverErrors = (error as any).errors as Record<
                    string,
                    string
                >;
                Object.entries(serverErrors).forEach(([field, message]) => {
                    form.setError(field as any, {
                        type: 'server',
                        message: message,
                    });
                });
            }
            mutationOptions?.onError?.(error, variables);
        },
        onSettled: () => {
            mutationOptions?.onSettled?.();
        },
    });

    // Enhanced submit handler
    const handleSubmit = useCallback(
        (onValid?: (data: TFormData) => void) => {
            return form.handleSubmit(async (data: TFormData) => {
                try {
                    // Clear previous submission errors
                    form.clearErrors('root');

                    // Call custom validation if provided
                    if (onValid) {
                        onValid(data);
                    }

                    // Execute mutation
                    await mutation.mutateAsync(data);
                } catch (error) {
                    // Handle any unexpected errors
                    if (error instanceof Error) {
                        form.setError('root', {
                            type: 'submit',
                            message: error.message,
                        });
                    }
                }
            });
        },
        [form, mutation]
    );

    return {
        ...form,
        mutation,
        isSubmitting: mutation.isPending,
        submitError: form.formState.errors.root?.message || null,
        handleSubmit,
    };
}

// Specialized hook for login forms
export function useLoginForm() {
    return useFormWithValidation({
        schema: yup.object({
            email: yup
                .string()
                .required('Email is required')
                .email('Invalid email'),
            password: yup.string().required('Password is required'),
            rememberMe: yup.boolean().default(false),
        }),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });
}

// Specialized hook for registration forms
export function useRegistrationForm() {
    return useFormWithValidation({
        schema: yup.object({
            firstName: yup.string().required('First name is required'),
            lastName: yup.string().required('Last name is required'),
            email: yup
                .string()
                .required('Email is required')
                .email('Invalid email'),
            phone: yup.string().required('Phone is required'),
            password: yup
                .string()
                .required('Password is required')
                .min(8, 'Password must be at least 8 characters'),
            confirmPassword: yup
                .string()
                .required('Please confirm your password')
                .oneOf([yup.ref('password')], 'Passwords must match'),
            acceptTerms: yup
                .boolean()
                .required('You must accept the terms')
                .oneOf([true], 'You must accept the terms'),
        }),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            acceptTerms: false,
        },
    });
}

// Hook for dynamic form validation (when schema changes)
export function useDynamicForm<TFormData extends FieldValues>(
    getSchema: () => yup.ObjectSchema<TFormData>,
    _dependencies: any[] = []
) {
    return useFormWithValidation({
        schema: getSchema(),
        // Re-create form when dependencies change
        // This is handled by the calling component re-rendering
    });
}

// Hook for multi-step forms
export interface UseMultiStepFormProps<TFormData extends FieldValues> {
    steps: Array<{
        name: string;
        schema: yup.ObjectSchema<Partial<TFormData>>;
    }>;
    onSubmit: (data: TFormData) => Promise<any>;
}

export function useMultiStepForm<TFormData extends FieldValues>({
    steps,
    onSubmit,
}: UseMultiStepFormProps<TFormData>) {
    // This would be expanded for full multi-step form functionality
    // For now, it's a placeholder for the pattern
    const currentStep = 0; // This would be managed with state

    return useFormWithValidation({
        schema: steps[currentStep]?.schema as any,
        onSubmit,
    });
}
