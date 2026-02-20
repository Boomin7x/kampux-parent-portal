export interface Language {
    code: string;
    name: string;
    flag: string;
}

export interface LanguageContextType {
    currentLanguage: string;
    setLanguage: (languageCode: string) => void;
    availableLanguages: Language[];
}

export const AVAILABLE_LANGUAGES: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export const DEFAULT_LANGUAGE = 'en';
