import { api } from '../../../lib/axios';
import type {
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
}

export const authenticationService = new AuthService();
