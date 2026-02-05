import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { IBilling, IBillingSearch } from '../model/billing_model';
import { billingService } from '../service/billing_service';

const billingServiceQueryKeys = {
    getBilling: 'getBilling',
    getBillings: 'getBillings',
    getBillingsByRegistration: 'getBillingsByRegistration',
    createBilling: 'createBilling',
    updateBilling: 'updateBilling',
};

const useGetBilling = (id: number) => {
    return useQuery({
        queryKey: [billingServiceQueryKeys.getBilling, id],
        queryFn: () => billingService.getBilling(id),
    });
};

const useGetBillings = (criteria: IBillingSearch) => {
    return useQuery({
        queryKey: [billingServiceQueryKeys.getBillings, criteria],
        queryFn: () => billingService.getBillings(criteria),
    });
};

const useGetBillingsByRegistration = (registrationId: number) => {
    return useQuery({
        queryKey: [
            billingServiceQueryKeys.getBillingsByRegistration,
            registrationId,
        ],
        queryFn: () => billingService.getBillingsByRegistration(registrationId),
    });
};

const useCreateBilling = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [billingServiceQueryKeys.createBilling],
        mutationFn: billingService.createBilling,
        onSuccess: () => {
            [
                billingServiceQueryKeys.getBillings,
                billingServiceQueryKeys.getBilling,
            ].forEach(key => {
                queryClient.invalidateQueries({ queryKey: [key] });
            });
        },
    });
};

const useUpdateBilling = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [billingServiceQueryKeys.updateBilling],
        mutationFn: (billing: IBilling) =>
            billingService.updateBilling(billing),
        onSuccess: () => {
            [
                billingServiceQueryKeys.getBillings,
                billingServiceQueryKeys.getBilling,
            ].forEach(key => {
                queryClient.invalidateQueries({ queryKey: [key] });
            });
        },
    });
};

export {
    useCreateBilling,
    useGetBilling,
    useGetBillings,
    useGetBillingsByRegistration,
    useUpdateBilling,
};
