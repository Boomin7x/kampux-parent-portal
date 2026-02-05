import * as yup from 'yup';

// Custom validation messages
const messages = {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    minLength: (min: number) => `Must be at least ${min} characters`,
    maxLength: (max: number) => `Must be no more than ${max} characters`,
    phone: 'Please enter a valid phone number',
    password: 'Password must be at least 6 characters',
    confirmPassword: 'Passwords must match',
    positiveNumber: 'Must be a positive number',
    url: 'Please enter a valid URL',
};

// Common field validators
export const validators = {
    email: yup
        .string()
        .required(messages.required)
        .email(messages.email)
        .lowercase()
        .trim(),

    password: yup
        .string()
        .required(messages.required)
        .min(6, messages.minLength(6)),

    confirmPassword: (passwordField = 'password') =>
        yup
            .string()
            .required(messages.required)
            .oneOf([yup.ref(passwordField)], messages.confirmPassword),

    phone: yup
        .string()
        .required(messages.required)
        .matches(/^[+]?[1-9][\d]{0,15}$/, messages.phone),

    name: yup
        .string()
        .required(messages.required)
        .min(2, messages.minLength(2))
        .max(50, messages.maxLength(50))
        .trim()
        .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

    studentId: yup
        .string()
        .required(messages.required)
        .matches(
            /^[A-Z0-9]{6,10}$/,
            'Student ID must be 6-10 characters (letters and numbers)'
        ),

    grade: yup
        .string()
        .required(messages.required)
        .oneOf(
            [
                'K',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
            ],
            'Please select a valid grade'
        ),

    url: yup.string().url(messages.url).nullable(),

    positiveNumber: yup
        .number()
        .required(messages.required)
        .positive(messages.positiveNumber),

    dateOfBirth: yup
        .date()
        .required(messages.required)
        .max(new Date(), 'Date of birth cannot be in the future')
        .test(
            'age',
            'Student must be between 3 and 25 years old',
            function (value) {
                if (!value) return false;
                const age = new Date().getFullYear() - value.getFullYear();
                return age >= 3 && age <= 25;
            }
        ),

    schoolYear: yup
        .string()
        .required(messages.required)
        .matches(
            /^\d{4}-\d{4}$/,
            'School year format: YYYY-YYYY (e.g., 2023-2024)'
        ),
};

// Authentication schemas
export const authSchemas = {
    // Multi-step authentication schemas
    emailOnly: yup.object({
        email: validators.email,
    }),

    otpVerification: yup.object({
        otp: yup
            .string()
            .required('OTP is required')
            .matches(/^\d{6}$/, 'OTP must be exactly 6 digits')
            .length(6, 'OTP must be exactly 6 digits'),
    }),

    passwordAuth: yup.object({
        password: yup.string().required(messages.required),
        rememberMe: yup.boolean().default(false),
    }),

    // Legacy single-step login (kept for backwards compatibility)
    login: yup.object({
        email: validators.email,
        password: yup.string().required(messages.required),
        rememberMe: yup.boolean().default(false),
    }),

    register: yup.object({
        firstName: validators.name,
        lastName: validators.name,
        email: validators.email,
        password: validators.password,
        confirmPassword: validators.confirmPassword(),
        acceptTerms: yup
            .boolean()
            .required('You must accept the terms and conditions')
            .oneOf([true], 'You must accept the terms and conditions'),
    }),

    forgotPassword: yup.object({
        email: validators.email,
    }),

    resetPassword: yup.object({
        password: validators.password,
        confirmPassword: validators.confirmPassword(),
        token: yup.string().required('Reset token is required'),
    }),

    emailVerification: yup.object({
        verificationCode: yup
            .string()
            .required('Verification code is required')
            .matches(/^\d{6}$/, 'Verification code must be exactly 6 digits')
            .length(6, 'Verification code must be exactly 6 digits'),
    }),
};

// Student-related schemas
export const studentSchemas = {
    studentInfo: yup.object({
        firstName: validators.name,
        lastName: validators.name,
        studentId: validators.studentId,
        grade: validators.grade,
        dateOfBirth: validators.dateOfBirth,
        parentEmail: validators.email,
        emergencyContact: validators.phone,
        address: yup.object({
            street: yup.string().required(messages.required),
            city: yup.string().required(messages.required),
            state: yup.string().required(messages.required),
            zipCode: yup
                .string()
                .required(messages.required)
                .matches(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
        }),
    }),

    enrollment: yup.object({
        studentId: validators.studentId,
        schoolYear: validators.schoolYear,
        grade: validators.grade,
        parentConsent: yup
            .boolean()
            .required('Parent consent is required')
            .oneOf([true], 'Parent consent must be provided'),
    }),
};

// School-related schemas
export const schoolSchemas = {
    schoolInfo: yup.object({
        name: yup.string().required(messages.required),
        address: yup.string().required(messages.required),
        phone: validators.phone,
        email: validators.email,
        website: validators.url,
        principalName: validators.name,
        establishedYear: yup
            .number()
            .required(messages.required)
            .min(1800, 'Year must be after 1800')
            .max(new Date().getFullYear(), 'Year cannot be in the future'),
    }),

    announcement: yup.object({
        title: yup
            .string()
            .required(messages.required)
            .max(100, messages.maxLength(100)),
        content: yup
            .string()
            .required(messages.required)
            .max(1000, messages.maxLength(1000)),
        priority: yup
            .string()
            .required(messages.required)
            .oneOf(['low', 'medium', 'high'], 'Please select a valid priority'),
        publishDate: yup.date().required(messages.required),
        expiryDate: yup
            .date()
            .nullable()
            .when('publishDate', (publishDate, schema) =>
                publishDate
                    ? schema.min(
                          publishDate,
                          'Expiry date must be after publish date'
                      )
                    : schema
            ),
        targetAudience: yup
            .array()
            .of(yup.string().oneOf(['parents', 'students', 'staff']))
            .min(1, 'Please select at least one target audience'),
    }),
};

// Contact/Communication schemas
export const communicationSchemas = {
    contactForm: yup.object({
        name: validators.name,
        email: validators.email,
        subject: yup
            .string()
            .required(messages.required)
            .max(100, messages.maxLength(100)),
        message: yup
            .string()
            .required(messages.required)
            .min(10, messages.minLength(10))
            .max(500, messages.maxLength(500)),
        category: yup
            .string()
            .required(messages.required)
            .oneOf(
                ['general', 'academic', 'technical', 'billing'],
                'Please select a category'
            ),
    }),

    feedbackForm: yup.object({
        rating: yup
            .number()
            .required(messages.required)
            .min(1, 'Please provide a rating')
            .max(5, 'Rating cannot exceed 5'),
        feedback: yup
            .string()
            .required(messages.required)
            .min(10, messages.minLength(10))
            .max(1000, messages.maxLength(1000)),
        wouldRecommend: yup
            .boolean()
            .required('Please indicate if you would recommend us'),
    }),
};

// Settings/Profile schemas
export const profileSchemas = {
    updateProfile: yup.object({
        firstName: validators.name,
        lastName: validators.name,
        phone: validators.phone,
        avatar: yup.mixed().nullable(),
        preferences: yup.object({
            emailNotifications: yup.boolean().default(true),
            smsNotifications: yup.boolean().default(false),
            language: yup
                .string()
                .required(messages.required)
                .oneOf(
                    ['en', 'es', 'fr'],
                    'Please select a supported language'
                ),
        }),
    }),

    changePassword: yup.object({
        currentPassword: yup.string().required('Current password is required'),
        newPassword: validators.password,
        confirmPassword: validators.confirmPassword('newPassword'),
    }),
};

// Type inference helpers
export type EmailOnlyFormData = yup.InferType<typeof authSchemas.emailOnly>;
export type OTPVerificationFormData = yup.InferType<
    typeof authSchemas.otpVerification
>;
export type PasswordAuthFormData = yup.InferType<
    typeof authSchemas.passwordAuth
>;
export type LoginFormData = yup.InferType<typeof authSchemas.login>;
export type RegisterFormData = yup.InferType<typeof authSchemas.register>;
export type ForgotPasswordFormData = yup.InferType<
    typeof authSchemas.forgotPassword
>;
export type ResetPasswordFormData = yup.InferType<
    typeof authSchemas.resetPassword
>;
export type EmailVerificationFormData = yup.InferType<
    typeof authSchemas.emailVerification
>;
export type StudentInfoFormData = yup.InferType<
    typeof studentSchemas.studentInfo
>;
export type ContactFormData = yup.InferType<
    typeof communicationSchemas.contactForm
>;
export type UpdateProfileFormData = yup.InferType<
    typeof profileSchemas.updateProfile
>;
