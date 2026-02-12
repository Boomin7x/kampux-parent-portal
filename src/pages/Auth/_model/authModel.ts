import md5 from 'md5';

export interface IUserNameExistRequest {
    userName: string;
    password: string;
    language: ILanguage;
    tenantAlias: string;
    hubConnectionId: string | null;
}

export interface IUserExistResponse {
    data: boolean;
    messages: Array<any>;
    succeeded: boolean;
}

export interface ICreateAccount {
    email: string;
    language: 'fr-FR' | 'en-US';
    tenantAlias: string;
    hubConnectionId: string | null;
}

export interface ICreateAccountRequestOtp {
    email: string;
    language: 'fr-FR' | 'en-US';
    tenantAlias: string;
    hubConnectionId: string | null;
}

export interface IConfirmCreateAccountOtp {
    token: string;
    otp: string;
    email: string;
    language: 'fr-FR' | 'en-US';
    tenantAlias: string;
    passwordMD5: string;
}

export interface IForgotPasswordRequestOtp {
    email: string;
    language: 'fr-FR' | 'en-US';
    tenantAlias: string;
    hubConnectionId: string | null;
}

export interface IForgotPasswordReset {
    token: string;
    otp: string;
    email: string;
    language: 'fr-FR' | 'en-US';
    tenantAlias: string;
    passwordMD5: string;
}

export enum ILanguage {
    FR = 'fr-FR',
    EN = 'en-US',
}

export const defaultUser = {
    userName: 'moussango@gmail.com',
    // name: 'Moussango Bertrand',
    password: md5('P@ssw0rd'),
    tenantAlias: 'univ',
};

export interface IGetTokenResponse {
    data: IAuthResponse;
    messages: Array<any>;
    succeeded: boolean;
}

export interface IAuthResponse {
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
    refreshTokenExpiryTime: string; // or Date if you parse it
    language: string;
    isAuthenticated: boolean;
    shouldResetPassword: boolean;
    isPasswordComplexityAllowed: boolean;
    displayPasswordExpirationWarning: boolean;
    isExtractAndExportAllowed: boolean;
    intermediaryCode: string;
    roleEntities: any[]; // Replace with specific type if roles have a structure
    schoolYears: SchoolYear[];
    allowedOperationModes: any[];
    applicationSetup: ApplicationSetup;
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
    applicationSetups: any | null;
    schoolYearMaterials: any | null;
    schoolYearTimeSlots: any | null;
    schoolYearRegistrationExtensions: any | null;
    schoolYearPeriods: any | null;
    schoolYearClassTemplates: any | null;
    schoolYearBillingTypes: any | null;
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
    applicationApiToken: string | null;
    websiteApplicationApiToken: string | null;
    whatsAppBaseUrl: string | null;
    whatsAppIdentityToken: string | null;
    whatsAppLogin: string | null;
    whatsAppPasswordMd5: string | null;
    webhookToken: string | null;
    isSmsOn: boolean;
    isWhatsAppOn: boolean;
    isReportScheduleOn: boolean;
    isFeatureScheduleOn: boolean;
    notificationWhatsAppNumber1: string | null;
    notificationWhatsAppNumber2: string | null;
    smtpServer: string | null;
    smtpPort: number | string | null;
    smtpUsername: string | null;
    smtpPassword: string | null;
    smtpSenderEmail: string | null;
    smtpUseTls: boolean | null;
    smtpServerType: any | null;
    isPayPalLive: boolean | null;
    payPalClientID: string | null;
    payPalSecretKey: string | null;
    isPasswordChanged: boolean;
    whatsAppPassword: string;
    intermediaryEntityQueryName: string;
    policyEntityQueryName: string;
    policyRiskEntityQueryName: string;
    personEntityQueryName: string;
    policyEntityGetQueryName: string;
    applicationTheme: ApplicationTheme;
    companyCode: number;
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
