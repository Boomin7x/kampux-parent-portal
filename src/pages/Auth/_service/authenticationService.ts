import { api, registerApiClient } from '../../../lib/axios';
import type {
    IConfirmCreateAccountOtp,
    ICreateAccountRequestOtp,
    IForgotPasswordRequestOtp,
    IForgotPasswordReset,
    IGetTokenResponse,
    IUserExistResponse,
    IUserNameExistRequest,
} from '../_model/authModel';

class AuthService {
    login(data: IUserNameExistRequest) {
        return api.post('/api/identity', data);
    }
    userExists(data: IUserNameExistRequest) {
        return api.post<IUserExistResponse>(
            '/api/identity/token/username-exists',
            data
        );
    }
    getToken(data: IUserNameExistRequest) {
        return api.post<IGetTokenResponse>(
            '/api/identity/token/get-token',
            data
        );
    }
    async createAccountRequestOtp(data: ICreateAccountRequestOtp) {
        const result = await registerApiClient.post(`/request-otp`, data);
        return result?.data;
    }
    async createAccountWithOtp(data: IConfirmCreateAccountOtp) {
        const result = await registerApiClient.post(
            `/create-account-with-otp`,
            data
        );
        return result?.data;
    }
    async forgotPasswordRequestOtp(data: IForgotPasswordRequestOtp) {
        const result = await registerApiClient.post(
            `/forgot-password/request-otp`,
            data
        );
        return result?.data;
    }
    async forgotPasswordReset(data: IForgotPasswordReset) {
        const result = await registerApiClient.post(
            `/forgot-password/reset`,
            data
        );
        return result?.data;
    }
}

export const authenticationService = new AuthService();
