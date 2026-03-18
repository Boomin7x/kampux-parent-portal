import React from 'react';
import { EventsPreview } from '../../components/landing/EventsPreview';
import { HeroSection } from '../../components/landing/HeroSection';
import PartnersPreview from '../../components/landing/PartnersPreview';
import { AboutPreview } from '../../components/landing/preview/AboutPreview';
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
        <>
            {/* Hero Section - Full experience (to be redesigned) */}
            <HeroSection />

            {/* Preview Sections - Minimal design pattern */}
            <AboutPreview />
            <EventsPreview />
            <PartnersPreview />
            {/* <AcademicPreview /> */}
            {/* <FacultyPreview />
            <StudentLifePreview />
            <FacilitiesPreview />
            <GalleryPreview /> */}
            <ContactPreview />
        </>
    );
};

export default LandingPage;
