import axios, {
    AxiosError,
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
} from 'axios';

type IConfig = {
    VITE_API_BASE_URL: string;
    NODE_ENV: string;
    VITE_APP_NAME: string;
    VITE_APP_VERSION: string;
    VITE_ENABLE_DEV_TOOLS: boolean;
    VITE_ENABLE_MOCK_API: boolean;
    VITE_GA_TRACKING_ID: string;
    VITE_SENTRY_DSN: string;
};
const Config = async (): Promise<IConfig> => {
    try {
        const res = await fetch('/config.json', {
            method: 'GET',
        });

        if (!res?.ok) {
            throw new Error('Config not found');
        }
        const data = await res?.json();
        return data;
    } catch (error) {
        throw new Error('An error occured while getting Config File', {
            cause: error,
        });
    }
};

const configFile = await Config().catch(() => null);

console.log({ configFile });

// Base API configuration
const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    configFile?.VITE_API_BASE_URL ||
    'https://kampux-api.univ-soft.com';

console.log({ API_BASE_URL });
const API_TIMEOUT = 30000; // 30 seconds

// Request ID generator for debugging and request tracking
let requestIdCounter = 0;
const generateRequestId = (): string => {
    requestIdCounter += 1;
    return `req_${Date.now()}_${requestIdCounter}`;
};

// Custom error class for API errors
export class ApiError extends Error {
    public status: number;
    public code?: string;
    public requestId?: string;

    constructor(
        message: string,
        status: number,
        code?: string,
        requestId?: string
    ) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.code = code;
        this.requestId = requestId;
    }
}

// Token management utility
export const tokenManager = {
    getAccessToken: (): string | null => {
        return localStorage.getItem('access-token');
    },

    getRefreshToken: (): string | null => {
        return localStorage.getItem('refresh-token');
    },

    setTokens: (accessToken: string, refreshToken: string): void => {
        localStorage.setItem('access-token', accessToken);
        localStorage.setItem('refresh-token', refreshToken);
    },

    clearTokens: (): void => {
        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');
        localStorage.removeItem('user');
    },

    isTokenExpired: (token: string): boolean => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 < Date.now();
        } catch {
            return true;
        }
    },
};

// Create specialized API clients for different endpoints
const createApiClient = (baseURL?: string): AxiosInstance => {
    const client = axios.create({
        baseURL: baseURL || API_BASE_URL,
        timeout: API_TIMEOUT,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Request interceptor
    client.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            // Add request ID for tracking
            const requestId = generateRequestId();
            config.metadata = { ...config.metadata, requestId };

            // Add authorization header
            const accessToken = tokenManager.getAccessToken();
            if (accessToken && !tokenManager.isTokenExpired(accessToken)) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }

            // Log request in development
            if (import.meta.env.DEV) {
                console.group(`🚀 API Request [${requestId}]`);
                console.log('URL:', `${config.baseURL}${config.url}`);
                console.log('Method:', config.method?.toUpperCase());
                console.log('Headers:', config.headers);
                if (config.data) {
                    console.log('Data:', config.data);
                }
                console.groupEnd();
            }

            return config;
        },
        (error: AxiosError) => {
            console.error('Request interceptor error:', error);
            return Promise.reject(error);
        }
    );

    // Response interceptor
    client.interceptors.response.use(
        (response: AxiosResponse) => {
            const requestId = response.config.metadata?.requestId;

            // Log response in development
            if (import.meta.env.DEV) {
                console.group(`✅ API Response [${requestId}]`);
                console.log('Status:', response.status);
                console.log('Data:', response.data);
                console.groupEnd();
            }

            return response;
        },
        async (error: AxiosError) => {
            const originalRequest =
                error.config as InternalAxiosRequestConfig & {
                    _retry?: boolean;
                };
            const requestId = originalRequest?.metadata?.requestId;

            // Log error in development
            if (import.meta.env.DEV) {
                console.group(`❌ API Error [${requestId}]`);
                console.log('Status:', error.response?.status);
                console.log('Message:', error.message);
                console.log('Response:', error.response?.data);
                console.groupEnd();
            }

            // Handle 401 Unauthorized - attempt token refresh
            if (
                error.response?.status === 401 &&
                originalRequest &&
                !originalRequest._retry
            ) {
                originalRequest._retry = true;

                try {
                    const refreshToken = tokenManager.getRefreshToken();
                    if (refreshToken) {
                        // Attempt to refresh the token
                        const response = await axios.post(
                            `${API_BASE_URL}/api/identity/token/refresh-token`,
                            { refreshToken, token: '' }
                        );

                        const {
                            token: accessToken,
                            refreshToken: newRefreshToken,
                        } = response.data;
                        tokenManager.setTokens(accessToken, newRefreshToken);

                        // Retry the original request with new token
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                        return client(originalRequest);
                    }
                } catch (refreshError) {
                    // Refresh failed, redirect to login
                    console.error('Token refresh failed:', refreshError);
                    tokenManager.clearTokens();
                    window.location.href = '/auth';
                    return Promise.reject(refreshError);
                }
            }

            // Create structured error
            const apiError = new ApiError(
                (error.response?.data as { message: string })?.message ||
                    error.message ||
                    'An error occurred',
                error.response?.status || 500,
                (error.response?.data as { code: string })?.code,
                requestId
            );

            return Promise.reject(apiError);
        }
    );

    return client;
};

// Main API client instances
export const apiClient = createApiClient();
export const authApiClient = createApiClient(`${API_BASE_URL}/api/identity`);
export const parentApiClient = createApiClient(
    `${API_BASE_URL}/public-api/parent/v1`
);
export const registerApiClient = createApiClient(
    `${API_BASE_URL}/public-api/token/v1`
);

// Utility functions for common HTTP methods
export const api = {
    get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
        apiClient.get<T>(url, config).then(response => response.data),

    post: <T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> =>
        apiClient.post<T>(url, data, config).then(response => response.data),

    put: <T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> =>
        apiClient.put<T>(url, data, config).then(response => response.data),

    patch: <T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> =>
        apiClient.patch<T>(url, data, config).then(response => response.data),

    delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
        apiClient.delete<T>(url, config).then(response => response.data),
};

// File upload utility
export const uploadFile = async (
    url: string,
    file: File,
    onProgress?: (progressEvent: any) => void
): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);

    return apiClient.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: onProgress,
    });
};

// Type declarations for Axios extensions
declare module 'axios' {
    interface InternalAxiosRequestConfig {
        metadata?: {
            requestId?: string;
            [key: string]: any;
        };
    }
}
