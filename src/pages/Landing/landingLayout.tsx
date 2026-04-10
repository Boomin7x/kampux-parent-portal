import { Outlet } from 'react-router-dom';
import { LandingPageLayout } from '../../components/landing';

const LandingLayout = () => {
    return (
        // <Box sx={{ position: 'relative' }}>
        //     <Navigation className='' />
        //     <Outlet />
        //     <Footer />
        // </Box>
        <LandingPageLayout
            maxWidth={false}
            transparentNav={false}
            seo={{
                description:
                    'Ce portail est pour les parents à propos de leurs enfants et site web pour l établissement',
                title: 'Kampux-portal',
                keywords: 'kampux,établissement,site web,',
                ogImage: '',
                ogUrl: 'univ-soft.com',
            }}
        >
            <Outlet />
        </LandingPageLayout>
    );
};

export default LandingLayout;
