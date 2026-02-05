import {
    Lock as PasswordIcon,
    Message as OTPIcon,
    ArrowBack as ArrowBackIcon,
    Security as SecurityIcon,
    Speed as SpeedIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    Typography,
    Chip,
    alpha,
    useTheme,
} from '@mui/material';
import React from 'react';

interface MethodSelectorProps {
    email: string;
    onSelectMethod: (method: 'otp' | 'password') => void;
    onBack: () => void;
    className?: string;
}

export const MethodSelector: React.FC<MethodSelectorProps> = ({
    email,
    onSelectMethod,
    onBack,
    className = '',
}) => {
    const theme = useTheme();

    return (
        <Box className={className}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <IconButton
                    onClick={onBack}
                    sx={{
                        mb: 2,
                        color: 'text.secondary',
                        '&:hover': {
                            backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.1
                            ),
                        },
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: 'text.primary',
                        fontSize: { xs: '1.5rem', md: '2rem' },
                    }}
                >
                    Choose Sign-In Method
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 2,
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '1rem',
                        }}
                    >
                        Signing in as:
                    </Typography>
                    <Chip
                        label={email}
                        size="small"
                        sx={{
                            backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.1
                            ),
                            color: 'primary.main',
                            fontWeight: 500,
                        }}
                    />
                </Box>

                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        maxWidth: 450,
                    }}
                >
                    Select your preferred authentication method to securely
                    access your parent portal.
                </Typography>
            </Box>

            {/* Authentication Method Cards */}
            <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}
            >
                {/* OTP Method */}
                <Card
                    sx={{
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        border: `2px solid transparent`,
                        '&:hover': {
                            borderColor: 'primary.main',
                            transform: 'translateY(-2px)',
                            boxShadow: theme.shadows[8],
                        },
                        borderRadius: 3,
                    }}
                    onClick={() => onSelectMethod('otp')}
                >
                    <CardContent sx={{ p: 4 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 3,
                            }}
                        >
                            {/* Icon */}
                            <Box
                                sx={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: 2,
                                    backgroundColor: alpha(
                                        theme.palette.primary.main,
                                        0.1
                                    ),
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                }}
                            >
                                <OTPIcon
                                    sx={{ fontSize: 28, color: 'primary.main' }}
                                />
                            </Box>

                            {/* Content */}
                            <Box sx={{ flexGrow: 1 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        mb: 1,
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: '1.25rem',
                                        }}
                                    >
                                        Sign in with OTP
                                    </Typography>
                                    <Chip
                                        label="Recommended"
                                        size="small"
                                        color="primary"
                                        sx={{
                                            fontSize: '0.75rem',
                                            height: 24,
                                        }}
                                    />
                                </Box>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        mb: 2,
                                        lineHeight: 1.6,
                                    }}
                                >
                                    Get a secure 6-digit code sent to your
                                    email. No password required.
                                </Typography>

                                {/* Features */}
                                <Box sx={{ display: 'flex', gap: 3 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <SecurityIcon
                                            sx={{
                                                fontSize: 16,
                                                color: 'success.main',
                                            }}
                                        />
                                        <Typography
                                            variant="caption"
                                            color="success.main"
                                        >
                                            More Secure
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <SpeedIcon
                                            sx={{
                                                fontSize: 16,
                                                color: 'primary.main',
                                            }}
                                        />
                                        <Typography
                                            variant="caption"
                                            color="primary.main"
                                        >
                                            Quick Access
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                {/* Password Method */}
                <Card
                    sx={{
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        border: `2px solid transparent`,
                        '&:hover': {
                            borderColor: 'primary.main',
                            transform: 'translateY(-2px)',
                            boxShadow: theme.shadows[8],
                        },
                        borderRadius: 3,
                    }}
                    onClick={() => onSelectMethod('password')}
                >
                    <CardContent sx={{ p: 4 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 3,
                            }}
                        >
                            {/* Icon */}
                            <Box
                                sx={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: 2,
                                    backgroundColor: alpha(
                                        theme.palette.secondary.main,
                                        0.1
                                    ),
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                }}
                            >
                                <PasswordIcon
                                    sx={{
                                        fontSize: 28,
                                        color: 'secondary.main',
                                    }}
                                />
                            </Box>

                            {/* Content */}
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: '1.25rem',
                                        mb: 1,
                                    }}
                                >
                                    Sign in with Password
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        mb: 2,
                                        lineHeight: 1.6,
                                    }}
                                >
                                    Use your secure password to access your
                                    account.
                                </Typography>

                                {/* Features */}
                                <Box sx={{ display: 'flex', gap: 3 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Traditional method
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            {/* Help Text */}
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                        lineHeight: 1.6,
                    }}
                >
                    Trouble accessing your account?{' '}
                    <Button
                        variant="text"
                        size="small"
                        sx={{
                            p: 0,
                            minWidth: 'auto',
                            color: 'primary.main',
                            textTransform: 'none',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            '&:hover': {
                                backgroundColor: 'transparent',
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        Get Help
                    </Button>
                </Typography>
            </Box>
        </Box>
    );
};
