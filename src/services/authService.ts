import { api, tokenManager } from '../lib/axios';
import { User } from '../types';

// Authentication API endpoints and types
export interface LoginRequest {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface LoginResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    token: string;
    password: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

// Authentication service
export const authService = {
    // Login user
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await api.post<LoginResponse>(
            '/auth/login',
            credentials
        );

        // Store tokens
        tokenManager.setTokens(response.accessToken, response.refreshToken);

        // Store user data
        localStorage.setItem('user', JSON.stringify(response.user));

        return response;
    },

    // Register new user
    async register(userData: RegisterRequest): Promise<LoginResponse> {
        const response = await api.post<LoginResponse>(
            '/auth/register',
            userData
        );

        // Store tokens and user data
        tokenManager.setTokens(response.accessToken, response.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.user));

        return response;
    },

    // Logout user
    async logout(): Promise<void> {
        try {
            // Notify server about logout
            await api.post('/auth/logout');
        } catch (error) {
            // Continue with client-side logout even if server request fails
            console.warn('Server logout failed:', error);
        } finally {
            // Clear local storage
            tokenManager.clearTokens();
        }
    },

    // Get current user
    async getCurrentUser(): Promise<User> {
        return api.get<User>('/auth/me');
    },

    // Refresh access token
    async refreshToken(): Promise<{
        accessToken: string;
        refreshToken: string;
    }> {
        const refreshToken = tokenManager.getRefreshToken();
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await api.post<{
            accessToken: string;
            refreshToken: string;
        }>('/auth/refresh', { refreshToken });

        // Update stored tokens
        tokenManager.setTokens(response.accessToken, response.refreshToken);

        return response;
    },

    // Request password reset
    async forgotPassword(
        data: ForgotPasswordRequest
    ): Promise<{ message: string }> {
        return api.post<{ message: string }>('/auth/forgot-password', data);
    },

    // Reset password with token
    async resetPassword(
        data: ResetPasswordRequest
    ): Promise<{ message: string }> {
        return api.post<{ message: string }>('/auth/reset-password', data);
    },

    // Change password for logged-in user
    async changePassword(
        data: ChangePasswordRequest
    ): Promise<{ message: string }> {
        return api.put<{ message: string }>('/auth/change-password', data);
    },

    // Verify email
    async verifyEmail(token: string): Promise<{ message: string }> {
        return api.post<{ message: string }>('/auth/verify-email', { token });
    },

    // Resend verification email
    async resendVerificationEmail(): Promise<{ message: string }> {
        return api.post<{ message: string }>('/auth/resend-verification');
    },

    // Check if user is authenticated
    isAuthenticated(): boolean {
        const token = tokenManager.getAccessToken();
        if (!token) return false;
        return !tokenManager.isTokenExpired(token);
    },

    // Get stored user data
    getStoredUser(): User | null {
        try {
            const userData = localStorage.getItem('user');
            return userData ? JSON.parse(userData) : null;
        } catch {
            return null;
        }
    },
};
