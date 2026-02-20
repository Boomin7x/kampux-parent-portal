import type { ReactNode } from 'react';
import React, { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { LanguageContextType } from '../types/language.types';
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from '../types/language.types';

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
    children,
}) => {
    const { i18n } = useTranslation();

    const getInitialLanguage = () => {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (
            savedLanguage &&
            AVAILABLE_LANGUAGES.find(lang => lang.code === savedLanguage)
        ) {
            return savedLanguage;
        }
        return DEFAULT_LANGUAGE;
    };

    const [currentLanguage, setCurrentLanguage] =
        useState<string>(getInitialLanguage);

    // Sync with i18next on mount and listen for changes
    useEffect(() => {
        // Set initial language
        i18n.changeLanguage(currentLanguage);

        // Listen for i18next language changes
        const handleLanguageChange = (lng: string) => {
            if (lng !== currentLanguage) {
                setCurrentLanguage(lng);
                localStorage.setItem('selectedLanguage', lng);
            }
        };

        i18n.on('languageChanged', handleLanguageChange);

        // Cleanup listener
        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, [i18n, currentLanguage]);

    const setLanguage = (languageCode: string) => {
        console.log('Language selected:', languageCode);
        console.log('Previous language:', currentLanguage);

        setCurrentLanguage(languageCode);
        localStorage.setItem('selectedLanguage', languageCode);

        // Update i18next language
        i18n.changeLanguage(languageCode);

        console.log('Language changed to:', languageCode);
    };

    const value: LanguageContextType = {
        currentLanguage,
        setLanguage,
        availableLanguages: AVAILABLE_LANGUAGES,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export { LanguageContext };

// Helper function to get current language for locale-aware formatting
export const getLanguage = (): string => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (
        savedLanguage &&
        AVAILABLE_LANGUAGES.find(lang => lang.code === savedLanguage)
    ) {
        return savedLanguage;
    }
    return DEFAULT_LANGUAGE;
};
