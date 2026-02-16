import { webApiClient } from '../../../lib/axios';
import type { HeroApiResponse } from '../_models/HeroSection';

export const landingPageService = {
    getHeroInformation: async (): Promise<HeroApiResponse[]> => {
        const result = await webApiClient.get(
            `/hero-section-content/get-contents`
        );
        return result?.data;
    },
};
