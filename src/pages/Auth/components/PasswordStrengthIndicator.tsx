import { Box, LinearProgress, Typography } from '@mui/material';
import { CheckCircle as CheckIcon } from '@mui/icons-material';
import React from 'react';

interface PasswordStrengthIndicatorProps {
    password: string;
    showRequirements?: boolean;
}

interface StrengthRequirement {
    id: string;
    label: string;
    test: (password: string) => boolean;
}

const requirements: StrengthRequirement[] = [
    {
        id: 'length',
        label: 'At least 8 characters',
        test: (password) => password.length >= 8,
    },
    {
        id: 'uppercase',
        label: 'One uppercase letter',
        test: (password) => /[A-Z]/.test(password),
    },
    {
        id: 'lowercase',
        label: 'One lowercase letter',
        test: (password) => /[a-z]/.test(password),
    },
    {
        id: 'number',
        label: 'One number',
        test: (password) => /\d/.test(password),
    },
    {
        id: 'special',
        label: 'One special character',
        test: (password) => /[@$!%*?&]/.test(password),
    },
];

const getPasswordStrength = (password: string): { score: number; label: string; color: string } => {
    if (!password) return { score: 0, label: '', color: '#e5e7eb' };

    const metRequirements = requirements.filter(req => req.test(password)).length;
    const score = (metRequirements / requirements.length) * 100;

    if (score < 40) {
        return { score, label: 'Weak', color: '#ef4444' };
    } else if (score < 80) {
        return { score, label: 'Fair', color: '#f59e0b' };
    } else if (score < 100) {
        return { score, label: 'Good', color: '#10b981' };
    } else {
        return { score, label: 'Strong', color: '#059669' };
    }
};

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
    password,
    showRequirements = true,
}) => {
    const strength = getPasswordStrength(password);

    if (!password) return null;

    return (
        <Box sx={{ mt: 2 }}>
            {/* Strength Bar */}
            <Box sx={{ mb: showRequirements ? 3 : 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1,
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            color: 'text.secondary',
                        }}
                    >
                        Password Strength
                    </Typography>
                    {strength.label && (
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: strength.color,
                            }}
                        >
                            {strength.label}
                        </Typography>
                    )}
                </Box>
                <LinearProgress
                    variant="determinate"
                    value={strength.score}
                    sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: '#f3f4f6',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: strength.color,
                            borderRadius: 3,
                            transition: 'all 0.3s ease',
                        },
                    }}
                />
            </Box>

            {/* Requirements List */}
            {showRequirements && (
                <Box sx={{ space: 'y-2' }}>
                    <Typography
                        variant="caption"
                        sx={{
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            color: 'text.secondary',
                            display: 'block',
                            mb: 2,
                        }}
                    >
                        Password Requirements
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {requirements.map((requirement) => {
                            const isMet = requirement.test(password);
                            return (
                                <Box
                                    key={requirement.id}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.5,
                                    }}
                                >
                                    <CheckIcon
                                        sx={{
                                            fontSize: 16,
                                            color: isMet ? '#10b981' : '#d1d5db',
                                            transition: 'color 0.2s ease',
                                        }}
                                    />
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontSize: '0.75rem',
                                            color: isMet ? '#059669' : 'text.secondary',
                                            fontWeight: isMet ? 500 : 400,
                                            transition: 'color 0.2s ease',
                                        }}
                                    >
                                        {requirement.label}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            )}
        </Box>
    );
};