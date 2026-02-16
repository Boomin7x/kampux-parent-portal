import { useQuery } from '@tanstack/react-query';
import { landingPageService } from '../_services/landingPageService';

const useGetHeroInformation = () => {
    return useQuery({
        queryKey: ['get-Hero-information'],
        queryFn: landingPageService.getHeroInformation,
    });
};

export default useGetHeroInformation;
