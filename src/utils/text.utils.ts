/**
 * Text Utility Functions
 * String manipulation and formatting utilities
 */

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength).trim() + '...';
};

/**
 * Truncate text at word boundary
 */
export const truncateAtWord = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
        return text;
    }

    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');

    if (lastSpace > 0) {
        return truncated.substring(0, lastSpace).trim() + '...';
    }

    return truncated.trim() + '...';
};

/**
 * Capitalize first letter of string
 */
export const capitalize = (text: string): string => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Capitalize first letter of each word (Title Case)
 */
export const toTitleCase = (text: string): string => {
    if (!text) return '';
    return text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

/**
 * Format name (First Last) from various formats
 */
export const formatName = (firstName: string, lastName: string): string => {
    return `${capitalize(firstName)} ${capitalize(lastName)}`;
};

/**
 * Get initials from name (e.g., "John Doe" -> "JD")
 */
export const getInitials = (name: string): string => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Convert string to URL-friendly slug
 */
export const toSlug = (text: string): string => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

/**
 * Extract excerpt from longer text
 */
export const getExcerpt = (text: string, wordCount: number = 30): string => {
    const words = text.split(' ');
    if (words.length <= wordCount) {
        return text;
    }
    return words.slice(0, wordCount).join(' ') + '...';
};

/**
 * Count words in text
 */
export const countWords = (text: string): number => {
    return text.trim().split(/\s+/).length;
};

/**
 * Estimate reading time in minutes
 */
export const estimateReadingTime = (text: string, wordsPerMinute: number = 200): number => {
    const wordCount = countWords(text);
    return Math.ceil(wordCount / wordsPerMinute);
};

/**
 * Format phone number (e.g., "(555) 123-4567")
 */
export const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6)}`;
    }
    return phone;
};

/**
 * Format email for display
 */
export const formatEmail = (email: string): string => {
    return email.toLowerCase().trim();
};

/**
 * Remove HTML tags from string
 */
export const stripHtml = (html: string): string => {
    return html.replace(/<[^>]*>/g, '');
};

/**
 * Convert line breaks to <br> tags
 */
export const nl2br = (text: string): string => {
    return text.replace(/\n/g, '<br>');
};

/**
 * Pluralize word based on count
 */
export const pluralize = (word: string, count: number, suffix: string = 's'): string => {
    return count === 1 ? word : word + suffix;
};

/**
 * Format list with commas and "and"
 */
export const formatList = (items: string[]): string => {
    if (items.length === 0) return '';
    if (items.length === 1) return items[0];
    if (items.length === 2) return items.join(' and ');
    return items.slice(0, -1).join(', ') + ', and ' + items[items.length - 1];
};

/**
 * Highlight search term in text
 */
export const highlightText = (text: string, searchTerm: string): string => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
};

/**
 * Clean and normalize whitespace
 */
export const normalizeWhitespace = (text: string): string => {
    return text.replace(/\s+/g, ' ').trim();
};

/**
 * Check if string is empty or only whitespace
 */
export const isEmptyOrWhitespace = (text: string): boolean => {
    return !text || text.trim().length === 0;
};

/**
 * Format file size (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};
