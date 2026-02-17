import { useQuery } from '@tanstack/react-query';
import { landingPageService } from '../_services/landingPageService';

const useGetAboutSection = () => {
    return useQuery({
        queryKey: ['get-About-section'],
        queryFn: landingPageService.getAboutInformation,
    });
};

export default useGetAboutSection;
