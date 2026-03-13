import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enPortal from '../pages/Portal/_locale/en.json';
import esPortal from '../pages/Portal/_locale/es.json';
import frPortal from '../pages/Portal/_locale/fr.json';
import enAcademic from '../pages/Portal/components/academic/_locale/en.json';
import esAcademic from '../pages/Portal/components/academic/_locale/es.json';
import frAcademic from '../pages/Portal/components/academic/_locale/fr.json';
import enAttendance from '../pages/Portal/components/attendance/_locale/en.json';
import esAttendance from '../pages/Portal/components/attendance/_locale/es.json';
import frAttendance from '../pages/Portal/components/attendance/_locale/fr.json';
import enBilling from '../pages/Portal/components/billing/_locale/en.json';
import esBilling from '../pages/Portal/components/billing/_locale/es.json';
import frBilling from '../pages/Portal/components/billing/_locale/fr.json';
import complaintsEn from '../pages/Portal/components/complaints/_locale/en.json';
import complaintsFr from '../pages/Portal/components/complaints/_locale/fr.json';
import enDashboard from '../pages/Portal/components/dashboard/_locale/en.json';
import frDashboard from '../pages/Portal/components/dashboard/_locale/fr.json';
import enLayout from '../pages/Portal/components/layout/_locale/en.json';
import esLayout from '../pages/Portal/components/layout/_locale/es.json';
import frLayout from '../pages/Portal/components/layout/_locale/fr.json';
import enStudent from '../pages/Portal/components/student/_locale/en.json';
import esStudent from '../pages/Portal/components/student/_locale/es.json';
import frStudent from '../pages/Portal/components/student/_locale/fr.json';

const resources = {
    en: {
        academic: enAcademic,
        attendance: enAttendance,
        layout: enLayout,
        billing: enBilling,
        student: enStudent,
        portal: enPortal,
        complaints: complaintsEn,
        dashboard: enDashboard,
    },
    fr: {
        academic: frAcademic,
        attendance: frAttendance,
        layout: frLayout,
        billing: frBilling,
        student: frStudent,
        portal: frPortal,
        complaints: complaintsFr,
        dashboard: frDashboard,
    },
    es: {
        academic: esAcademic,
        attendance: esAttendance,
        layout: esLayout,
        billing: esBilling,
        student: esStudent,
        portal: esPortal,
    },
};

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'fr',
        debug: import.meta.env.DEV,

        interpolation: {
            escapeValue: false, // React already does escaping
        },

        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
            lookupLocalStorage: 'selectedLanguage',
        },

        ns: [
            'common',
            'landing',
            'auth',
            'portal',
            'layout',
            'student',
            'complaints',
            'dashboard',
            'contact',
        ], // Add namespaces here
        defaultNS: 'academic',
    });

export default i18n;
