import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
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

    const setLanguage = (languageCode: string) => {
        console.log('Language selected:', languageCode);
        console.log('Previous language:', currentLanguage);

        setCurrentLanguage(languageCode);
        localStorage.setItem('selectedLanguage', languageCode);

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
