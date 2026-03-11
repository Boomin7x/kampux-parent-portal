import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Footer, Navigation } from '../../components/landing';

const LandingLayout = () => {
    return (
        <Box sx={{ position: 'relative' }}>
            <Navigation />
            <Outlet />
            <Footer />
        </Box>
    );
};

export default LandingLayout;
