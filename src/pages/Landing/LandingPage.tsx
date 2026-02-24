import { Box } from '@mui/material';
import React from 'react';
import { HeroSection } from '../../components/landing/HeroSection';
import { Navigation } from '../../components/landing/Navigation';
import { Footer } from '../../components/landing/Footer';
import { AboutPreview } from '../../components/landing/preview/AboutPreview';
import { AcademicPreview } from '../../components/landing/preview/AcademicPreview';
import { FacultyPreview } from '../../components/landing/preview/FacultyPreview';
import { StudentLifePreview } from '../../components/landing/preview/StudentLifePreview';
import { FacilitiesPreview } from '../../components/landing/preview/FacilitiesPreview';
import { GalleryPreview } from '../../components/landing/preview/GalleryPreview';
import { ContactPreview } from '../../components/landing/preview/ContactPreview';

/**
 * LandingPage Component
 *
 * Main landing page with:
 * - Navigation & Footer
 * - Hero section (full experience)
 * - Preview sections (minimal content-dense design)
 * - Optimized layout with alternating backgrounds
 * - Responsive spacing per DESIGN_PATTERN.md
 */
const LandingPage: React.FC = () => {
    return (
        <Box sx={{ position: 'relative' }}>
            {/* Navigation */}
            <Navigation />

            {/* Hero Section - Full experience (to be redesigned) */}
            <HeroSection />

            {/* Preview Sections - Minimal design pattern */}
            <AboutPreview />
            <AcademicPreview />
            <FacultyPreview />
            <StudentLifePreview />
            <FacilitiesPreview />
            <GalleryPreview />
            <ContactPreview />

            {/* Footer */}
            <Footer />
        </Box>
    );
};

export default LandingPage;
