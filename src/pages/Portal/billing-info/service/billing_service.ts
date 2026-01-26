import { api } from "../../../../../lib/axios";
import type { IBilling, IBillingSearch } from "../model/billing_model";


class BillingService {
    createBilling(billing: IBilling) {
        return api.post('/api/finance/billing/create',billing)
    }
    updateBilling(billing: IBilling) {
        return api.post('/api/finance/billing/update',billing)
    }
    getBilling(id : number) {
        return api.get(`/api/finance/billing/get-billing/${id}`)
    }
    getBillings(criteria: IBillingSearch) : Promise<IBilling[]> {
        return api.get(`/api/finance/billing/get-billings`,{params:criteria})
    }
    getBillingsByRegistration(registrationId: number) : Promise<IBilling[]> {
        return api.get(`/api/finance/billing/get-billings-by-registration`,{params:{registrationId}})
    }
}

export const billingService = new BillingService();
