import React from 'react';
import { HeroSection } from '../../components/landing/HeroSection';
import { AboutPreview } from '../../components/landing/preview/AboutPreview';
import { AcademicPreview } from '../../components/landing/preview/AcademicPreview';
import { ContactPreview } from '../../components/landing/preview/ContactPreview';
import { FacilitiesPreview } from '../../components/landing/preview/FacilitiesPreview';
import { FacultyPreview } from '../../components/landing/preview/FacultyPreview';
import { GalleryPreview } from '../../components/landing/preview/GalleryPreview';
import { StudentLifePreview } from '../../components/landing/preview/StudentLifePreview';

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
        <>
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
        </>
    );
};

export default LandingPage;
