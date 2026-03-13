/**
 * Type definitions for About page content
 */

export interface LeaderProfile {
    id: string;
    name: string;
    role: string;
    bio: string;
    photoUrl: string;
    email: string;
    qualifications?: string[];
    linkedIn?: string;
}

export interface HistoryMilestone {
    year: string;
    title: string;
    description: string;
}

export interface CoreValue {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export interface Achievement {
    id: string;
    label: string;
    value: string;
    description: string;
    icon: string;
}

export interface AboutContent {
    mission: string;
    vision: string;
    coreValues: CoreValue[];
    leadership: LeaderProfile[];
    history: HistoryMilestone[];
    achievements: Achievement[];
}
