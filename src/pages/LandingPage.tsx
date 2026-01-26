import { Box } from '@mui/material';
import React from 'react';
import { AboutSection } from '../components/landing/AboutSection';
import { AcademicSection } from '../components/landing/AcademicSection';
import { ContactSection } from '../components/landing/ContactSection';
import { EventsAnnouncementsSection } from '../components/landing/EventsAnnouncementsSection';
import { FacilitiesSection } from '../components/landing/FacilitiesSection';
import { FacultySection } from '../components/landing/FacultySection';
import { Footer } from '../components/landing/Footer';
import { GallerySection } from '../components/landing/GallerySection';
import { HeroSection } from '../components/landing/HeroSection';
import { Navigation } from '../components/landing/Navigation';
import { StudentLifeSection } from '../components/landing/StudentLifeSection';

export const LandingPage: React.FC = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#fefefe',
                position: 'relative',
            }}
        >
            {/* Navigation */}
            <Navigation />

            {/* Main Content */}
            <Box component="main">
                {/* Hero Section */}
                <HeroSection />

                {/* About Section */}
                <AboutSection />

                {/* Academic Programs Section */}
                <AcademicSection />

                {/* Faculty Section */}
                <FacultySection />

                {/* Student Life Section */}
                <StudentLifeSection />

                {/* Facilities Section */}
                <FacilitiesSection />

                {/* Contact & Portal Access Section */}
                <GallerySection />
                <EventsAnnouncementsSection />
                <ContactSection />
            </Box>

            {/* Footer */}
            <Footer />

            {/* Scroll to Top Button */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    zIndex: 1000,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    '&.visible': {
                        opacity: 1,
                    },
                }}
                id="scroll-to-top"
            >
                {/* Scroll to top functionality can be added later if needed */}
            </Box>
        </Box>
    );
};
