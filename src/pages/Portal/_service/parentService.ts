import { parentApiClient } from '../../../lib/axios';

// Types for Parent/Student APIs based on actual API response

export interface Student {
    // Core student identification
    id: number;
    personId: number;
    firstName: string;
    lastName: string;
    fullNameFR: string | null;
    fullNameEN: string | null;
    studentCode: string | null;
    registrationCode: string;

    // School information
    schoolYearId: number;
    schoolYearName: string;
    schoolYearClassName: string;
    schoolYearClassId: number;
    studyType: string;
    studySection: string;
    studyLanguage: string;
    studyCycle: string | null;
    studyLevel: string | null;

    // Personal information
    birthDate: string;
    dateOfBirth: string;
    birthPlace: string;
    civility: string;
    gender: 'M' | 'F';
    nationality: string | null;
    particularSign: string | null;

    // Contact information
    portable1: string | null;
    portable2: string | null;
    email1: string | null;
    email2: string | null;

    // Academic information
    status: string;
    statusDate: string;
    isRepeater: boolean | null;
    isOldStudent: boolean | null;
    averageMark: number | null;
    rank: number | null;
    numberOfAbsences: number;
    numberOfDelays: number;

    // Financial information
    amount: number;
    amountPaid: number;
    unpaidAmount: number;
    dueAmount: number;
    amountRegistration: number | null;
    amountPaidRegistration: number | null;
    unpaidAmountRegistration: number | null;
    dueAmountRegistration: number | null;

    // Parent information
    fatherId: number | null;
    motherId: number | null;
    tutorId: number | null;
    fatherFirstName: string | null;
    motherFirstName: string | null;
    tutorFirstName: string | null;
    fatherLastName: string | null;
    motherLastName: string | null;
    tutorLastName: string | null;
    fatherPortable1: string | null;
    motherPortable1: string | null;
    tutorPortable1: string | null;
    fatherEmail1: string | null;
    motherEmail1: string | null;
    tutorEmail1: string | null;

    // Media
    picture: string | null;
    base64Picture: string | null;
    picturePath: string | null;

    // Additional fields
    companyCode: number;
    countRegistration: number;
    validationDate: string;
    effectiveDate: string | null;
}

export type { Student as IStudent };

// Response wrapper - the API returns an array directly
export type GetStudentsResponse = Student[];

export interface TimeTableEntry {
    id: string;
    subject: string;
    teacher: string;
    startTime: string;
    endTime: string;
    classroom: string;
    dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
}

export interface GetTimeTableResponse {
    schedule: TimeTableEntry[];
    schoolYear: string;
    className: string;
    success: boolean;
    message?: string;
}

export interface Billing {
    id: number;
    registrationId: number;
    billingTypeId: number;
    initialAmount: number;
    amount: number;
    isObligatory: boolean;
    deliveryArticleId: number | null;
    isArticleOutConfirmed: boolean | null;
    articleOutConfirmationDate: string | null;
    busDestinationId: number | null;
    isArrival: boolean | null;
    isDeparture: boolean | null;
    isCancelled: boolean;
    cancellationPurpose: string | null;
    cancellationDate: string | null;
    parentBillingTypeId: number;
    billingTypeName: string;
    billingCategoryName: string | null;
    billingAmount: number;
    discount: number;
    discountSchoolFees: number | null;
    discountRegistration: number | null;
    amountPaid: number;
    unpaidAmount: number;
    dueAmount: number;
    billingDueDate: string;
    isRegistration: boolean;
    isArticle: boolean | null;
    isTransport: boolean | null;
    startDate: string | null;
    endDate: string | null;
    billingCategory: string | null;

    // School fee breakdown
    initialAmountSchoolFees: number | null;
    amountSchoolFees: number | null;
    amountPaidSchoolFees: number | null;
    amountSchoolFeesT1: number | null;
    amountPaidSchoolFeesT1: number | null;
    amountSchoolFeesT2: number | null;
    amountPaidSchoolFeesT2: number | null;
    amountSchoolFeesT3: number | null;
    amountPaidSchoolFeesT3: number | null;
    amountSchoolFeesT4: number | null;
    amountPaidSchoolFeesT4: number | null;
    amountSchoolFeesT5: number | null;
    amountPaidSchoolFeesT5: number | null;
    dueAmountSchoolFees: number | null;
    unpaidAmountSchoolFees: number | null;

    // Other amounts
    initialAmountOther: number | null;
    amountOther: number | null;
    amountPaidOther: number | null;
    amountOtherWithoutRegistration: number | null;
    amountPaidOtherWithoutRegistration: number | null;
    dueAmountOther: number | null;
    unpaidAmountOther: number | null;

    // Registration amounts
    initialAmountRegistration: number | null;
    amountRegistration: number | null;
    amountPaidRegistration: number | null;
    dueAmountRegistration: number | null;
    unpaidAmountRegistration: number | null;

    // Additional fields
    quantity: number | null;
    quantityUsed: number | null;
    availableQuantity: number | null;
    articleOption: string | null;
    articleOptionName: string | null;
    deliveryDescription: string | null;
    busDestinationName: string | null;
}

// Response is an array directly
export type GetBillingsResponse = Billing[];

export interface TellerOperation {
    // Core operation info
    id: number;
    registrationId: number;
    amount: number;
    operationDate: string;
    issueDate: string;
    bearer: string | null;
    reference: string;
    isCancelled: boolean;
    cancellationDate: string | null;
    cancellationPurpose: string;
    isCancelledAtDayClosing: boolean;
    tellerDayClosingId: number | null;

    // Amount descriptions
    amountInLetterFR: string;
    amountInLetterEN: string;

    // Student info (can be null)
    firstName: string | null;
    lastName: string | null;
    schoolYearName: string | null;
    schoolYearClassName: string | null;
    registrationCode: string | null;
    registrationDate: string | null;
    studySection: string | null;
    studyLanguage: string | null;
    studyCycle: string | null;
    studyLevel: string | null;
    classOrder: number;
    fullNameFR: string | null;
    fullNameEN: string | null;
    studentCode: string | null;
    studentNationalCode: string | null;

    // Teller info
    tellerName: string | null;
    receiptNumber: string | null;

    // Created timestamp
    createdOn: string;

    // Billing details
    billingsDetailFR: string;
    billingsDetailEN: string;
    billingsDetailDecFR: string;
    billingsDetailDecEN: string;

    // Operation modes details
    tellerOperationModesDetailFR: string;
    tellerOperationModesDetailUS: string;
    tellerOperationModesDetailDecFR: string;
    tellerOperationModesDetailDecUS: string;

    // Previous operations details
    previousTellerOperationsDetailFR: string;
    previousTellerOperationsDetailEN: string;
    previousTellerOperationsDetailDecFR: string;
    previousTellerOperationsDetailDecEN: string;
    previousTellerOperations: unknown[];

    // Type and name
    type: string | null;
    name: string | null;

    // Amount breakdowns
    amountRegistration: number | null;
    amountSchoolFees: number | null;
    amountOther: number | null;
    amountOtherWithoutRegistration: number | null;
    netAmountRegistration: number | null;
    netAmountSchoolFees: number | null;
    netAmountOther: number | null;
    netAmountOtherWithoutRegistration: number | null;

    // Operation billing codes (up to 5)
    operationBillingCode1: string | null;
    operationBillingAmount1: number | null;
    operationBillingCode2: string | null;
    operationBillingAmount2: number | null;
    operationBillingCode3: string | null;
    operationBillingAmount3: number | null;
    operationBillingCode4: string | null;
    operationBillingAmount4: number | null;
    operationBillingCode5: string | null;
    operationBillingAmount5: number | null;

    // Operation mode details (up to 3)
    operationModeCode1: string | null;
    operationModeAmount1: number | null;
    operationModeReference1: string | null;
    operationModeOperatorCode1: string | null;
    operationModePhoneNumber1: string | null;
    operationModeTransferToAccountNumber1: string | null;
    operationModeCode2: string | null;
    operationModeAmount2: number | null;
    operationModeReference2: string | null;
    operationModeOperatorCode2: string | null;
    operationModePhoneNumber2: string | null;
    operationModeTransferToAccountNumber2: string | null;
    operationModeCode3: string | null;
    operationModeAmount3: number | null;
    operationModeReference3: string | null;
    operationModeOperatorCode3: string | null;
    operationModePhoneNumber3: string | null;
    operationModeTransferToAccountNumber3: string | null;

    // Net amounts and cancellations
    netAmount: number | null;
    netAmountAtClosingDay: number | null;
    cancelledAmount: number | null;
    cancelledAmountAtClosingDay: number | null;
    cancelledAmountAfterClosingDay: number | null;
    count: number | null;

    // Related entities
    tellerOperationBillings: unknown | null;
    tellerOperationModes: unknown | null;
}

// Response is an array directly
export type GetTellerOperationsResponse = TellerOperation[];

export interface CreateComplaintRequest {
    id: number; // registration id
    complaintCategoryCode: string; // enumeration code from Complaint_Category
    summary: string;
    description: string;
    complaintDate: string; // ISO date string
}

export interface CreateComplaintResponse {
    success: boolean;
    message?: string;
    data?: {
        complaintId?: number;
        ticketNumber?: string;
        status?: string;
    };
}

// Student sheet individual record types
export interface RegistrationSanction {
    id: number;
    registrationId: number;
    sanctionDate: string | null;
    sanctionTypeCode: string;
    description: string;
    assignedTeacherId: number | null;
    haveBeenResolved: boolean;
    resolutionDate: string | null;
    resolutionDescription: string;
    isCancelled: boolean;
    cancellationDate: string | null;
    cancellationPurpose: string | null;
}

export interface RegistrationAbsenceSheet {
    id: number;
    registrationId: number;
    absenceDate: string;
    absenceTypeCode: string;
    startTime: string | null;
    endTime: string | null;
    description: string;
    isJustified: boolean;
    justificationDate: string | null;
    justificationDescription: string;
    assignedTeacherId: number | null;
}

export interface RegistrationDisciplinarySheet {
    id: number;
    registrationId: number;
    incidentDate: string;
    disciplinaryTypeCode: string;
    description: string;
    actionTaken: string;
    assignedTeacherId: number | null;
    haveBeenResolved: boolean;
    resolutionDate: string | null;
    resolutionDescription: string;
    isCancelled: boolean;
    cancellationDate: string | null;
    cancellationPurpose: string | null;
}

export interface RegistrationObservationSheet {
    id: number;
    registrationId: number;
    observationDate: string;
    observationTypeCode: string;
    description: string;
    assignedTeacherId: number | null;
    isPositive: boolean;
    followUpRequired: boolean;
    followUpDate: string | null;
    followUpDescription: string;
}

export interface RegistrationComplaint {
    id: number;
    registrationId: number;
    complaintDate: string | null;
    complaintCategoryCode: string;
    summary: string | null;
    description: string;
    assignedTeacherId: number | null;
    haveBeenResolved: boolean;
    resolutionDate: string | null;
    resolutionDescription: string;
    isCancelled: boolean;
    cancellationDate: string | null;
    cancellationPurpose: string | null;
}

export interface GetStudentSheetsResponse {
    registrationSanctions: RegistrationSanction[];
    registrationAbsenceSheets: RegistrationAbsenceSheet[];
    registrationDisciplinarySheets: RegistrationDisciplinarySheet[];
    registrationObservationSheets: RegistrationObservationSheet[];
    registrationComplaints: RegistrationComplaint[];
}

export interface CodificationItem {
    id: number;
    enumerationId: number;
    code: string;
    name: string;
    description: string;
    enumerationCode: string;
    parentEnumerationCode: string | null;
    parentEnumerationItemCode: string | null;
    isBuiltIn: boolean;
    enumerationItemExs: unknown | null;
}

export type GetCodificationItemsResponse = CodificationItem[];

// Parent Service
export const parentService = {
    /**
     * Get all students linked to the parent
     */
    getStudents: async (): Promise<GetStudentsResponse> => {
        const response =
            await parentApiClient.get<GetStudentsResponse>('/get-students');
        return response.data;
    },

    /**
     * Get class timetable for the school year
     */
    getClassTimeTable: async (
        schoolYearClassId: number | null
    ): Promise<GetTimeTableResponse> => {
        const response = await parentApiClient.get<GetTimeTableResponse>(
            '/get-schoolYear-class-time-table',
            {
                params: {
                    ...(schoolYearClassId && { schoolYearClassId }),
                },
            }
        );
        return response.data;
    },

    /**
     * Get student billings by student ID
     */
    getStudentBillings: async (
        studentId: string
    ): Promise<GetBillingsResponse> => {
        const response = await parentApiClient.get<GetBillingsResponse>(
            `/get-billings-by-student?studentId=${studentId}`
        );
        return response.data;
    },

    /**
     * Get teller operations (payments) by student ID
     */
    getTellerOperations: async (
        studentId: string
    ): Promise<GetTellerOperationsResponse> => {
        const response = await parentApiClient.get<GetTellerOperationsResponse>(
            `/get-tellerOperations-by-student?studentId=${studentId}`
        );
        return response.data;
    },

    /**
     * Create a new complaint
     */
    createComplaint: async (
        data: CreateComplaintRequest
    ): Promise<CreateComplaintResponse> => {
        const response = await parentApiClient.post<CreateComplaintResponse>(
            '/create-complaint',
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    },

    /**
     * Get student sheets by student ID
     */
    getStudentSheets: async (
        studentId: string
    ): Promise<GetStudentSheetsResponse> => {
        const response = await parentApiClient.get<GetStudentSheetsResponse>(
            `/get-student-sheets?studentId=${studentId}`
        );
        return response.data;
    },

    /**
     * Get codification items by codification codes
     */
    getCodificationItems: async (
        codificationCodes: string | string[]
    ): Promise<GetCodificationItemsResponse> => {
        // Handle both single code and array of codes
        const codesParam = Array.isArray(codificationCodes)
            ? codificationCodes.join(',')
            : codificationCodes;

        const response = await parentApiClient.get<GetCodificationItemsResponse>(
            `/get-codificationItems-by-codificationCodes/${encodeURIComponent(codesParam)}`
        );
        return response.data;
    },
};
