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
                    'this is a portal for parent about thier kids and also a school website',
                title: 'Kampux-portal',
                keywords: 'kamput,school,website,',
                ogImage: '',
                ogUrl: 'univ-soft.com',
            }}
        >
            <Outlet />
        </LandingPageLayout>
    );
};

export default LandingLayout;
