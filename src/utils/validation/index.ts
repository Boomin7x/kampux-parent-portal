export * from './schemas';

// Validation utilities
import * as yup from 'yup';

// Custom validation methods
export const customValidators = {
    // Validate file size (in MB)
    fileSize: (maxSizeMB: number) => (file: File | null) => {
        if (!file) return true;
        return file.size <= maxSizeMB * 1024 * 1024;
    },

    // Validate file type
    fileType: (allowedTypes: string[]) => (file: File | null) => {
        if (!file) return true;
        return allowedTypes.includes(file.type);
    },

    // Validate that at least one checkbox is selected
    atLeastOne: (array: any[]) => array && array.length > 0,

    // Validate unique values in array
    uniqueValues: (array: any[]) => {
        if (!array) return true;
        return new Set(array).size === array.length;
    },

    // Validate date is not weekend (for school-related dates)
    notWeekend: (date: Date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6; // 0 = Sunday, 6 = Saturday
    },

    // Validate business hours (9 AM to 5 PM)
    businessHours: (time: string) => {
        const hour = parseInt(time.split(':')[0]);
        return hour >= 9 && hour <= 17;
    },
};

// Helper to create conditional validation
export const conditionalValidator = <T>(
    condition: (value: T) => boolean,
    schema: yup.Schema<any>
) => {
    return yup.mixed<T>().test('conditional', function (value) {
        if (condition(value as T)) {
            return schema.isValidSync(value);
        }
        return true;
    });
};

// Helper to transform form data before validation
export const transformers = {
    // Trim whitespace from strings
    trimString: (value: string) =>
        typeof value === 'string' ? value.trim() : value,

    // Convert empty strings to null
    emptyToNull: (value: string) => (value === '' ? null : value),

    // Convert string to number
    stringToNumber: (value: string) => {
        const num = parseFloat(value);
        return isNaN(num) ? null : num;
    },

    // Normalize phone number
    normalizePhone: (value: string) => {
        if (typeof value !== 'string') return value;
        return value.replace(/\D/g, ''); // Remove all non-digits
    },

    // Normalize email (lowercase and trim)
    normalizeEmail: (value: string) => {
        if (typeof value !== 'string') return value;
        return value.toLowerCase().trim();
    },
};

// Validation error formatter
export const formatValidationErrors = (errors: yup.ValidationError) => {
    const formattedErrors: Record<string, string> = {};

    if (errors.inner && errors.inner.length > 0) {
        errors.inner.forEach(error => {
            if (error.path) {
                formattedErrors[error.path] = error.message;
            }
        });
    } else if (errors.path) {
        formattedErrors[errors.path] = errors.message;
    }

    return formattedErrors;
};

// Async validation helper for server-side validation
export const createAsyncValidator = <T>(
    asyncValidationFn: (value: T) => Promise<boolean>,
    errorMessage: string
) => {
    return yup.mixed<T>().test('async', errorMessage, async function (value) {
        try {
            return await asyncValidationFn(value as T);
        } catch {
            return false;
        }
    });
};

// Common async validators
export const asyncValidators = {
    // Check if email is already registered
    emailAvailable: createAsyncValidator<string>(async (email: string) => {
        // TODO: Implement actual API call
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
        return !['admin@example.com', 'test@example.com'].includes(email);
    }, 'This email is already registered'),

    // Check if student ID exists
    studentIdExists: createAsyncValidator<string>(async (studentId: string) => {
        // TODO: Implement actual API call
        await new Promise(resolve => setTimeout(resolve, 300));
        return ['STU001', 'STU002', 'STU003'].includes(studentId);
    }, 'Student ID not found'),
};

// Schema composition helper
export const composeSchemas = <T extends Record<string, any>>(
    baseSchema: yup.ObjectSchema<T>,
    ...additionalSchemas: Array<Partial<yup.ObjectSchema<any>>>
) => {
    return additionalSchemas.reduce(
        (schema, additionalSchema) => schema.concat(additionalSchema),
        baseSchema
    );
};
