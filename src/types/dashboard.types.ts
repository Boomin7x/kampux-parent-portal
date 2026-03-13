// Dashboard Types
export interface Registration {
    schoolYearId: number;
    schoolYearClassTemplateId: number;
    classTemplateId: number;
    studyType: string | null;
    studySection: string | null;
    studyLanguage: string | null;
    studyCycle: string | null;
    studyLevel: string | null;
    classOrder: number;
    schoolYearName: string;
    schoolYearCategory: string | null;
    schoolYearAllowPartialRegistrationPayment: boolean | null;
    schoolYearValidateRegistrationByAdmission: boolean | null;
    schoolYearYear: string | null;
    schoolYearClassName: string;
    classTemplateLevel: string | null;
    firstName: string;
    lastName: string;
    fullNameFR: string | null;
    fullNameEN: string | null;
    particularSign: string | null;
    birthDate: string;
    dateOfBirth: string;
    birthPlace: string | null;
    civility: string | null;
    gender: string | null;
    studentCode: string;
    nationalCode: string | null;
    studentNationalCode: string | null;
    nationalStudentCode: string | null;
    defaultLanguage: string | null;
    nationality: string | null;
    identificationType: string | null;
    identificationNumber: string | null;
    identificationDelivrancePlace: string | null;
    identificationStartDate: string;
    identificationEndDate: string;
    birthCertificateNumber: string | null;
    civilRegistrar: string | null;
    birthCertificateDelivrancePlace: string | null;
    bloodType: string | null;
    rhesusFactor: string | null;
    chronicIllnessCode: string | null;
    hasSpecificNeeds: boolean | null;
    specificNeedPurposeCode: string | null;
    hasDisability: boolean | null;
    disabilityType: string | null;
    picture: string | null;
    base64Picture: string | null;
    picturePath: string | null;
    studentName: string | null;
    fullTeacherFirstName: string | null;
    fullTeacherLastName: string | null;
    fullTeacherCivility: string | null;
    fullTeacherGender: string | null;
    fullTeacherFullName: string | null;
    fullTeacherFullNameFR: string | null;
    fullTeacherFullNameEN: string | null;
    substituteTeacherFullName: string | null;
    substituteTeacherFullNameFR: string | null;
    substituteTeacherFullNameEN: string | null;

    // Financial Information
    initialAmount: number | null;
    amount: number;
    amountPaid: number;
    unpaidAmount: number;
    dueAmount: number;
    amountRegistration: number | null;
    amountPaidRegistration: number | null;
    unpaidAmountRegistration: number | null;
    dueAmountRegistration: number | null;
    amountTransport: number | null;
    amountPaidTransport: number | null;
    unpaidAmountTransport: number | null;
    dueAmountTransport: number | null;
    amountArticle: number | null;
    amountPaidArticle: number | null;
    unpaidAmountArticle: number | null;
    dueAmountArticle: number | null;
    amountOther: number | null;
    amountPaidOther: number | null;
    unpaidAmountOther: number | null;
    dueAmountOther: number | null;
    amountOtherWithoutRegistration: number | null;
    amountPaidOtherWithoutRegistration: number | null;
    unpaidAmountOtherWithoutRegistration: number | null;
    dueAmountOtherWithoutRegistration: number | null;
    amountSchoolFees: number | null;
    amountPaidSchoolFees: number | null;
    dueAmountSchoolFees: number | null;
    unpaidAmountSchoolFees: number | null;

    // Parent Information
    fatherId: number | null;
    motherId: number | null;
    tutorId: number | null;
    fatherCivility: string | null;
    motherCivility: string | null;
    tutorCivility: string | null;
    fatherGender: string | null;
    motherGender: string | null;
    tutorGender: string | null;
    fatherFirstName: string | null;
    motherFirstName: string | null;
    tutorFirstName: string | null;
    fatherLastName: string | null;
    motherLastName: string | null;
    tutorLastName: string | null;
    fatherBirthDate: string | null;
    motherBirthDate: string | null;
    tutorBirthDate: string | null;
    fatherBirthPlace: string | null;
    motherBirthPlace: string | null;
    tutorBirthPlace: string | null;
    fatherParticularSign: string | null;
    motherParticularSign: string | null;
    tutorParticularSign: string | null;
    fatherBirthCertificateNumber: string | null;
    motherBirthCertificateNumber: string | null;
    tutorBirthCertificateNumber: string | null;
    fatherCivilRegistrar: string | null;
    motherCivilRegistrar: string | null;
    tutorCivilRegistrar: string | null;
    fatherName: string | null;
    motherName: string | null;
    tutorName: string | null;
    fatherPortable1: string | null;
    motherPortable1: string | null;
    tutorPortable1: string | null;
    fatherPortable2: string | null;
    motherPortable2: string | null;
    tutorPortable2: string | null;
    fatherEmail1: string | null;
    motherEmail1: string | null;
    tutorEmail1: string | null;
    fatherEmail2: string | null;
    motherEmail2: string | null;
    tutorEmail2: string | null;

    // Academic Information
    tellerOperations: any | null;
    isMarkExcluded: boolean;
    subjects: any[];
    subjectMarksAsString: string;
    reportCardMaxMark: number;
    defaultSuccessMark: number | null;
    annualAverageMark: number | null;
    mark: number;
    currentMarkStatus: string | null;
    currentAverageMark: number | null;
    currentRank: number | null;
    currentAppreciation: string | null;
    currentShortAppreciation: string | null;
    currentAltAppreciation: string | null;
    currentAltShortAppreciation: string | null;

    // Registration Details
    companyCode: number;
    countRegistration: number;
    id: number;
    schoolYearClassId: number;
    personId: number;
    registrationSequence: string | null;
    registrationCode: string | null;
    status: string | null;
    statusDate: string;
    validationDate: string | null;
    arriveOrGoesByBus: boolean | null;
    busDestinationId: number | null;
    takeBrunch: boolean | null;
    order1: string | null;
    order2: string | null;
    orderX: string | null;
    portable1: string | null;
    portable2: string | null;
    email1: string | null;
    email2: string | null;
    effectiveDate: string | null;
    isRepeater: boolean | null;
    isOldStudent: boolean | null;
    studentFrom: string | null;
    averageMark: number | null;
    averageMarkAppreciationId: number | null;
    rank: number | null;
    succeededInHigherClass: boolean | null;
    numberOfAbsences: number;
    numberOfDelays: number;
    hasDeparted: boolean | null;
    departureDate: string | null;
    departureType: string | null;
    departurePurpose: string | null;
    departureDescription: string | null;
    isSocialCase: boolean | null;
    socialCaseReason: string | null;
    socialCaseDescription: string | null;
    billings: any | null;
    registrationMaterials: any | null;
}

export interface PeriodMark {
    schoolYearPeriodName: string;
    schoolYearPeriodAlias: string;
    id: number;
    registrationId: number;
    schoolYearPeriodId: number;
    reportCard: string;
    averageMark: number;
    averageMarkAppreciationId: number;
    rank: number;
    isMarkExcluded: boolean | null;
    markExcludedPurpose: string | null;
    conductGrade: string | null;
}

export interface AnnualMark {
    id: number;
    registrationId: number;
    reportCard: string;
    averageMark: number;
    averageMarkAppreciationId: number;
    rank: number;
    isMarkExcluded: boolean | null;
    markExcludedPurpose: string | null;
    conductGrade: string | null;
}

export interface DashboardBilling {
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

    // School Fees by Tranche
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

    // Other Amounts
    initialAmountOther: number | null;
    amountOther: number | null;
    amountPaidOther: number | null;
    amountOtherWithoutRegistration: number | null;
    amountPaidOtherWithoutRegistration: number | null;
    initialAmountRegistration: number | null;
    amountRegistration: number | null;
    amountPaidRegistration: number | null;

    // Due Amounts
    dueAmountSchoolFees: number | null;
    unpaidAmountSchoolFees: number | null;
    dueAmountSchoolFeesT1: number | null;
    unpaidAmountSchoolFeesT1: number | null;
    dueAmountSchoolFeesT2: number | null;
    unpaidAmountSchoolFeesT2: number | null;
    dueAmountSchoolFeesT3: number | null;
    unpaidAmountSchoolFeesT3: number | null;
    dueAmountSchoolFeesT4: number | null;
    unpaidAmountSchoolFeesT4: number | null;
    dueAmountSchoolFeesT5: number | null;
    unpaidAmountSchoolFeesT5: number | null;
    dueAmountOther: number | null;
    unpaidAmountOther: number | null;
    dueAmountOtherWithoutRegistration: number | null;
    unpaidAmountOtherWithoutRegistration: number | null;
    dueAmountRegistration: number | null;
    unpaidAmountRegistration: number | null;

    // Billing Names and Dates
    dueSchoolFeesBillingName: string | null;
    dueOtherBillingName: string | null;
    unpaidSchoolFeesBillingName: string | null;
    unpaidOtherBillingName: string | null;
    dueDateSchoolFees: string | null;
    dueDateOrther: string | null;
    billingDueDate: string;

    // Billing Categories
    isRegistration: boolean;
    isArticle: boolean | null;
    isTransport: boolean | null;
    startDate: string | null;
    endDate: string | null;
    billingCategory: string | null;

    // Student Information (embedded)
    gender: string | null;
    civility: string | null;
    firstName: string | null;
    lastName: string | null;
    birhDate: string | null;
    birthPlace: string | null;
    schoolYearClassName: string | null;
    schoolYearClassId: number | null;
    schoolYearClassTemplateId: number | null;
    fullNameFR: string | null;
    fullNameEN: string | null;
    studentCode: string | null;
    studentNationalCode: string | null;
    nationalStudentCode: string | null;
    isOldStudent: boolean | null;
    isRepeater: boolean | null;
    isSocialCase: boolean | null;
    hasDeparted: boolean | null;
    portable1: string | null;
    portable2: string | null;
    email1: string | null;
    email2: string | null;
    studyType: string | null;
    studySection: string | null;
    studyLanguage: string | null;
    classOrder: number;
    schoolYearName: string | null;
    countStudents: number | null;

    // Article Information
    articleOption: string | null;
    articleOptionName: string | null;
    deliveryDescription: string | null;
    busDestinationName: string | null;
    quantity: number | null;
    quantityUsed: number | null;
    availableQuantity: number | null;
}

export interface DashboardData {
    registration: Registration;
    periodMarks: PeriodMark[];
    annualMarks: AnnualMark[];
    billings: DashboardBilling[];
}

// Response type for the API
export interface DashboardResponse {
    success: boolean;
    data: DashboardData;
    message?: string;
}

// Dashboard summary calculated data
export interface DashboardSummary {
    student: {
        fullName: string;
        studentCode: string;
        className: string;
        schoolYear: string;
    };
    academic: {
        currentRank: number | null;
        currentAverage: number | null;
        numberOfAbsences: number;
        numberOfDelays: number;
        subjects: number;
    };
    financial: {
        totalAmount: number;
        totalPaid: number;
        totalUnpaid: number;
        totalDue: number;
        unpaidBillings: number;
        overdueBillings: number;
    };
}
