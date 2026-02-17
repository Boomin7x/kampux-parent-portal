import type { SelectChangeEvent } from '@mui/material';
import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material';
import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';

interface LanguageSelectorProps {
    variant?: 'navigation' | 'page';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
    variant = 'navigation',
}) => {
    const { currentLanguage, setLanguage, availableLanguages } = useLanguage();

    const handleLanguageChange = (event: SelectChangeEvent) => {
        setLanguage(event.target.value as string);
    };

    const currentLang = availableLanguages.find(
        lang => lang.code === currentLanguage
    );

    const isNavigation = variant === 'navigation';

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FormControl
                size="small"
                sx={{
                    minWidth: isNavigation ? 120 : 140,
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                        '& fieldset': {
                            borderColor: isNavigation
                                ? 'rgba(255, 255, 255, 0.23)'
                                : 'rgba(99, 102, 241, 0.23)',
                        },
                        '&:hover fieldset': {
                            borderColor: isNavigation
                                ? 'rgba(255, 255, 255, 0.4)'
                                : 'rgba(99, 102, 241, 0.4)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                        },
                    },
                    '& .MuiSelect-select': {
                        color: isNavigation ? 'white' : 'text.primary',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    },
                    '& .MuiSelect-icon': {
                        color: isNavigation
                            ? 'rgba(255, 255, 255, 0.7)'
                            : 'text.secondary',
                    },
                }}
            >
                <Select
                    value={currentLanguage}
                    onChange={handleLanguageChange}
                    displayEmpty
                    renderValue={() => (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <Typography
                                component="span"
                                sx={{ fontSize: '1.2rem' }}
                            >
                                {currentLang?.flag}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: isNavigation
                                        ? 'white'
                                        : 'text.primary',
                                }}
                            >
                                {currentLang?.name}
                            </Typography>
                        </Box>
                    )}
                >
                    {availableLanguages.map(language => (
                        <MenuItem key={language.code} value={language.code}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                <Typography
                                    component="span"
                                    sx={{ fontSize: '1.2rem' }}
                                >
                                    {language.flag}
                                </Typography>
                                <Typography variant="body2">
                                    {language.name}
                                </Typography>
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};
