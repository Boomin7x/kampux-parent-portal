/**
 * Date Utility Functions
 * Formatting and parsing dates for display
 */

/**
 * Format date to readable string (e.g., "January 15, 2026")
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

/**
 * Format date to short string (e.g., "Jan 15, 2026")
 */
export const formatDateShort = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

/**
 * Format date to month and day only (e.g., "January 15")
 */
export const formatMonthDay = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
    });
};

/**
 * Format date to day of week (e.g., "Monday")
 */
export const formatDayOfWeek = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
    });
};

/**
 * Get relative time from now (e.g., "2 days ago", "in 3 weeks")
 */
export const getRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = date.getTime() - now.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
        return 'Today';
    } else if (diffInDays === 1) {
        return 'Tomorrow';
    } else if (diffInDays === -1) {
        return 'Yesterday';
    } else if (diffInDays > 1 && diffInDays < 7) {
        return `In ${diffInDays} days`;
    } else if (diffInDays < -1 && diffInDays > -7) {
        return `${Math.abs(diffInDays)} days ago`;
    } else if (diffInDays >= 7 && diffInDays < 30) {
        const weeks = Math.floor(diffInDays / 7);
        return `In ${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
    } else if (diffInDays <= -7 && diffInDays > -30) {
        const weeks = Math.floor(Math.abs(diffInDays) / 7);
        return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (diffInDays >= 30) {
        const months = Math.floor(diffInDays / 30);
        return `In ${months} ${months === 1 ? 'month' : 'months'}`;
    } else {
        const months = Math.floor(Math.abs(diffInDays) / 30);
        return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }
};

/**
 * Check if date is in the past
 */
export const isPastDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    const now = new Date();
    return date < now;
};

/**
 * Check if date is in the future
 */
export const isFutureDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    const now = new Date();
    return date > now;
};

/**
 * Parse date string to Date object
 */
export const parseDate = (dateString: string): Date => {
    return new Date(dateString);
};

/**
 * Sort dates in ascending order
 */
export const sortDatesAscending = (dates: string[]): string[] => {
    return [...dates].sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime();
    });
};

/**
 * Sort dates in descending order
 */
export const sortDatesDescending = (dates: string[]): string[] => {
    return [...dates].sort((a, b) => {
        return new Date(b).getTime() - new Date(a).getTime();
    });
};

/**
 * Get current academic year (e.g., "2025-2026")
 */
export const getCurrentAcademicYear = (): string => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    // Academic year typically starts in August (month 7)
    if (currentMonth >= 7) {
        return `${currentYear}-${currentYear + 1}`;
    } else {
        return `${currentYear - 1}-${currentYear}`;
    }
};

/**
 * Format time range (e.g., "9:00 AM - 10:30 AM")
 */
export const formatTimeRange = (startTime: string, endTime: string): string => {
    return `${startTime} - ${endTime}`;
};

/**
 * Format event date with day of week (e.g., "Monday, January 15, 2026")
 */
export const formatEventDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};
