import { authApiClient } from '../../../lib/axios';

// Types for authentication
export interface LoginRequest {
    userName: string;
    password: string;
    language: 'fr-FR' | 'en-US';
    tenantAlias: string;
    hubConnectionId: string | null;
}

export interface SchoolYear {
    id: number;
    year: number;
    name: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    registrationSequenceExpression: string | null;
    registrationCodeExpression: string | null;
    studentSequenceExpression: string | null;
    studentCodeExpression: string | null;
    markDecimalLengthForRanking: number;
    category: string;
    allowPartialRegistrationPayment: boolean;
    allowRegistrationValidationWithoutPayment: boolean | null;
    validateRegistrationByAdmission: boolean;
}

export interface ApplicationTheme {
    id: number;
    applicationSetupId: number;
    background: string;
    primary: string;
    secondary: string;
    success: string;
    info: string;
    danger: string;
    warning: string;
    dark: string;
    light: string;
    muted: string;
    border: string;
    inverse: string;
    shaft: string;
    menuButton: string;
    menuIcon: string;
    gridHeader: string;
    gridAlt: string;
    gridActiveRow: string;
    gridSelectedRows: string;
    logo: string | null;
}

export interface ApplicationSetup {
    id: number;
    companyName: string;
    name: string | null;
    nameAlt: string | null;
    description: string;
    descriptionAlt: string | null;
    motto: string | null;
    mottoAlt: string | null;
    shortName: string | null;
    establishmentDate: string | null;
    accreditationNumber: string | null;
    portable1: string | null;
    portable2: string | null;
    fax: string | null;
    landLine1: string | null;
    landLine2: string | null;
    email1: string | null;
    email2: string | null;
    websiteUrl: string | null;
    address: string | null;
    country: string | null;
    region: string | null;
    city: string | null;
    defaultCurrency: string | null;
    timezone: string | null;
    currentSchoolYearId: number;
    isPasswordComplexityAllowed: boolean;
    passwordDuration: number;
    passwordRotation: number;
    maxAccessFailedCount: number;
    accessLockoutDuration: number;
    applicationTheme: ApplicationTheme;
    companyCode: number;
}

export interface UserData {
    userId: number;
    userName: string;
    userDescription: string;
    userAlias: string;
    isTeacher: boolean;
    teacherId: number;
    personId: number;
    token: string;
    refreshToken: string;
    userImageURL: string;
    refreshTokenExpiryTime: string;
    language: string;
    isAuthenticated: boolean;
    shouldResetPassword: boolean;
    isPasswordComplexityAllowed: boolean;
    displayPasswordExpirationWarning: boolean;
    isExtractAndExportAllowed: boolean;
    intermediaryCode: string;
    roleEntities: unknown[];
    schoolYears: SchoolYear[];
    allowedOperationModes: unknown[];
    applicationSetup: ApplicationSetup;
}

export interface LoginResponse {
    data: UserData;
    messages: string[];
    succeeded: boolean;
}

export interface UsernameExistsRequest {
    userName: string;
    password: string;
    language: 'fr-FR' | 'en-US';
    tenantAlias: string;
    hubConnectionId: string | null;
}

export interface UsernameExistsResponse {
    exists: boolean;
    message?: string;
}

// Authentication Service
export const authService = {
    /**
     * Check if username exists
     */
    checkUsernameExists: async (
        data: UsernameExistsRequest
    ): Promise<UsernameExistsResponse> => {
        const response = await authApiClient.post<UsernameExistsResponse>(
            '/token/username-exists',
            data
        );
        return response.data;
    },

    /**
     * Get authentication token
     */
    getToken: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await authApiClient.post<LoginResponse>(
            '/token/get-token',
            data
        );
        return response.data;
    },

    /**
     * Combined login method that checks username and gets token
     */
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        // First check if username exists
        await authService.checkUsernameExists(data);

        // Then get the token
        return authService.getToken(data);
    },
};
