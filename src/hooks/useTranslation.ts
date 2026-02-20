import { useEffect, useState } from 'react';
import { useLanguage } from './useLanguage';

// Helper function to get nested values from an object using a dot-separated key
const getNestedValue = (obj: any, key: string): string | undefined => {
    return key.split('.').reduce((acc, part) => acc && acc[part], obj);
};

/**
 * A hook to provide translation functionality for a specific namespace.
 * @param namespace - The namespace for the translations, usually corresponding to a component module directory.
 * @returns \{ t, isLoading \} - A translation function `t` and a `isLoading` boolean.
 */
export const useTranslation = (namespace: string) => {
    const { currentLanguage } = useLanguage();
    const [translations, setTranslations] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadTranslations = async () => {
            setIsLoading(true);
            try {
                // Determine the path based on namespace
                const basePath = namespace.includes('/')
                    ? `/src/pages/Portal/components/${namespace}/_locale/`
                    : namespace === 'portal'
                      ? `/src/pages/Portal/_locale/`
                      : `/src/pages/Portal/components/${namespace}/_locale/`;

                // Dynamically import the JSON file for the current language
                const module = await import(
                    /* @vite-ignore */
                    `${basePath}${currentLanguage}.json`
                );
                setTranslations(module.default);
            } catch (error) {
                console.error(
                    `Could not load translations for namespace "${namespace}" and language "${currentLanguage}". Falling back to English.`,
                    error
                );
                // Fallback to English if the selected language file is not found
                try {
                    const basePath = namespace.includes('/')
                        ? `/src/pages/Portal/components/${namespace}/_locale/`
                        : namespace === 'portal'
                          ? `/src/pages/Portal/_locale/`
                          : `/src/pages/Portal/components/${namespace}/_locale/`;

                    const fallbackModule = await import(
                        /* @vite-ignore */
                        `${basePath}en.json`
                    );
                    setTranslations(fallbackModule.default);
                } catch (fallbackError) {
                    console.error(
                        `Could not load fallback English translations for namespace "${namespace}"`,
                        fallbackError
                    );
                    setTranslations({}); // Set to empty object to prevent errors
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (namespace && currentLanguage) {
            loadTranslations();
        }
    }, [currentLanguage, namespace]);

    /**
     * The translation function.
     * @param key - The key for the translation string (e.g., 'header.title').
     * @returns The translated string, or the key itself if not found.
     */
    const t = (key: string): string => {
        if (isLoading || !translations) {
            return key; // Return key as a fallback during loading
        }
        const value = getNestedValue(translations, key);
        return value || key;
    };

    return { t, isLoading };
};
