import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authenticationService } from '../_service/authenticationService';

const { getToken, login: loginService, userExists } = authenticationService;

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
