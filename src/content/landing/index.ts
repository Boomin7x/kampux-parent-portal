// Landing Page Content - Centralized Export
// This file exports all the content for landing page sections

import { aboutSectionContent } from './aboutSection';
import { academicSectionContent } from './academicSection';
import { contactSectionContent } from './contactSection';
import { eventsAnnouncementsSectionContent } from './eventsAnnouncementsSection';
import { facilitiesSectionContent } from './facilitiesSection';
import { facultySectionContent } from './facultySection';
import { footerContent } from './footerContent';
import { gallerySectionContent } from './gallerySection';
import { heroSectionContent } from './heroSection';
import { navigationContent } from './navigationContent';
import { studentLifeSectionContent } from './studentLifeSection';

export { heroSectionContent } from './heroSection';
export type { IHeroSectionContent } from './heroSection';

export { aboutSectionContent } from './aboutSection';
export type { AboutSectionContent } from './aboutSection';

export { academicSectionContent } from './academicSection';
export type { AcademicSectionContent } from './academicSection';

export { facultySectionContent } from './facultySection';
export type { FacultySectionContent } from './facultySection';

export { studentLifeSectionContent } from './studentLifeSection';
export type { StudentLifeSectionContent } from './studentLifeSection';

export { facilitiesSectionContent } from './facilitiesSection';
export type { FacilitiesSectionContent } from './facilitiesSection';

export { gallerySectionContent } from './gallerySection';
export type { GallerySectionContent } from './gallerySection';

export { eventsAnnouncementsSectionContent } from './eventsAnnouncementsSection';
export type { EventsAnnouncementsSectionContent } from './eventsAnnouncementsSection';

export { contactSectionContent } from './contactSection';
export type { ContactSectionContent } from './contactSection';

export { navigationContent } from './navigationContent';
export type { NavigationContent } from './navigationContent';

export { footerContent } from './footerContent';
export type { FooterContent } from './footerContent';

// Consolidated content object for easy access
export const landingContent = {
    hero: heroSectionContent,
    about: aboutSectionContent,
    academic: academicSectionContent,
    faculty: facultySectionContent,
    studentLife: studentLifeSectionContent,
    facilities: facilitiesSectionContent,
    gallery: gallerySectionContent,
    eventsAnnouncements: eventsAnnouncementsSectionContent,
    contact: contactSectionContent,
    navigation: navigationContent,
    footer: footerContent,
} as const;
