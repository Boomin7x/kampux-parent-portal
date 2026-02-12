import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authenticationService } from '../_service/authenticationService';

const {
    getToken,
    login: loginService,
    userExists,
    createAccountRequestOtp,
    createAccountWithOtp,
    forgotPasswordRequestOtp,
    forgotPasswordReset,
} = authenticationService;

export const useLoginQuery = () => {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: loginService,
    });
};

export const useUserExistsQuery = () => {
    return useMutation({
        mutationKey: ['user-exists'],
        mutationFn: userExists,
    });
};

export const useGetTokenQuery = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ['get-token'],
        mutationFn: getToken,
        onSuccess: data => {
            if (data?.succeeded) navigate('/portal');
        },
    });
};

export const useCreateAccountRequestOtpQuery = () => {
    return useMutation({
        mutationKey: ['create-account-request-otp'],
        mutationFn: createAccountRequestOtp,
    });
};

export const useCreateAccountWithOtpQuery = () => {
    return useMutation({
        mutationKey: ['create-account-with-otp'],
        mutationFn: createAccountWithOtp,
    });
};

export const useForgotPasswordRequestOtpQuery = () => {
    return useMutation({
        mutationKey: ['forgot-password-request-otp'],
        mutationFn: forgotPasswordRequestOtp,
    });
};

export const useForgotPasswordResetQuery = () => {
    return useMutation({
        mutationKey: ['forgot-password-reset'],
        mutationFn: forgotPasswordReset,
    });
};
