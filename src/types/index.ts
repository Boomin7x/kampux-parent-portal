export interface User {
    id: string;
    email: string;
    name: string;
    role: 'parent' | 'admin';
}

export interface Student {
    id: string;
    name: string;
    grade: string;
    class: string;
    parentId: string;
}

export interface School {
    id: string;
    name: string;
    logo?: string;
    address: string;
    phone: string;
    email: string;
}

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

// Export dashboard types
export * from './dashboard.types';
