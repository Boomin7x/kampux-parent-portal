import { Box } from '@mui/material';
import React from 'react';
import { AboutSection } from '../../components/landing/AboutSection';
import { AcademicSection } from '../../components/landing/AcademicSection';
import { ContactSection } from '../../components/landing/ContactSection';
import { FacilitiesSection } from '../../components/landing/FacilitiesSection';
import { FacultySection } from '../../components/landing/FacultySection';
import { GallerySection } from '../../components/landing/GallerySection';
import { HeroSection } from '../../components/landing/HeroSection';
import { Navigation } from '../../components/landing/Navigation';
import { StudentLifeSection } from '../../components/landing/StudentLifeSection';

const LandingPage: React.FC = () => {
    return (
        <Box sx={{ position: 'relative' }}>
            <Navigation />
            <HeroSection />
            <AboutSection />
            <AcademicSection />
            <FacultySection />
            <StudentLifeSection />
            <FacilitiesSection />
            <GallerySection />
            <ContactSection />
        </Box>
    );
};

export default LandingPage;
