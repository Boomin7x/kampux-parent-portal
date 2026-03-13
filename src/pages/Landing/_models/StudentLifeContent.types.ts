/**
 * Type definitions for Student Life page content
 */

export type ActivityCategory = 'sports' | 'arts' | 'academic' | 'service';

export interface Activity {
    id: string;
    name: string;
    category: ActivityCategory;
    description: string;
    schedule: string;
    memberCount: number;
    icon: string;
    advisorName?: string;
}

export interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    category: string;
}

export interface StudentTestimonial {
    id: string;
    studentName: string;
    grade: string;
    quote: string;
    photoUrl: string;
    activity?: string;
}

export interface DailySchedule {
    period: string;
    time: string;
    activity: string;
}

export interface StudentLifeContent {
    philosophy: string;
    activities: Activity[];
    upcomingEvents: Event[];
    dailySchedule: DailySchedule[];
    testimonials: StudentTestimonial[];
}
