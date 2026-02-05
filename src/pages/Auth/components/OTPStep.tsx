import { yupResolver } from '@hookform/resolvers/yup';
import {
    ArrowBack as ArrowBackIcon,
    Refresh as RefreshIcon,
    CheckCircle as CheckIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    TextField,
    Typography,
    IconButton,
    Alert,
    CircularProgress,
    Chip,
    alpha,
    useTheme,
} from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    authSchemas,
    type OTPVerificationFormData,
} from '../../../utils/validation/schemas';

interface OTPStepProps {
    email: string;
    onVerify: (otp: string) => void;
    onBack: () => void;
    onResendOTP: () => void;
    className?: string;
}

export const OTPStep: React.FC<OTPStepProps> = ({
    email,
    onVerify,
    onBack,
    onResendOTP,
    className = '',
}) => {
    const theme = useTheme();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<OTPVerificationFormData>({
        resolver: yupResolver(authSchemas.otpVerification),
        mode: 'onChange',
        defaultValues: {
            otp: '',
        },
    });

    const otpValue = watch('otp');

    // Countdown timer for resend
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [countdown]);

    const onSubmit = async (data: OTPVerificationFormData) => {
        setIsSubmitting(true);
        setError(null);
        setSuccess(null);

        try {
            // TODO: Implement OTP verification API call
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

            // Simulate OTP verification
            const isValidOTP = data.otp === '123456'; // This would come from API response

            if (!isValidOTP) {
                setError(
                    'Invalid OTP code. Please check your email and try again.'
                );
                return;
            }

            setSuccess('OTP verified successfully!');
            setTimeout(() => onVerify(data.otp), 500);
        } catch (err) {
            console.error('OTP verification error:', err);
            setError('Unable to verify OTP. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendOTP = async () => {
        if (!canResend) return;

        try {
            setError(null);
            setSuccess(null);

            // TODO: Implement resend OTP API call
            await onResendOTP();

            setSuccess('New OTP sent to your email!');
            setCountdown(60);
            setCanResend(false);
            setValue('otp', '');

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            console.error('Resend OTP error:', err);
            setError('Unable to resend OTP. Please try again.');
        }
    };

    const handleOTPChange = (value: string, index: number) => {
        // Only allow numbers
        const numericValue = value.replace(/[^0-9]/g, '');

        if (numericValue.length <= 1) {
            const newOTP = otpValue.split('');
            newOTP[index] = numericValue;
            const updatedOTP = newOTP.join('');
            setValue('otp', updatedOTP);

            // Auto-focus next input
            if (numericValue && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Backspace' && !otpValue[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData
            .getData('text')
            .replace(/[^0-9]/g, '')
            .slice(0, 6);
        setValue('otp', pastedData);
    };

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
                    Enter Verification Code
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
                        We sent a 6-digit code to:
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
                    }}
                >
                    Please check your email and enter the verification code
                    below.
                </Typography>
            </Box>

            {/* Success Alert */}
            {success && (
                <Alert
                    severity="success"
                    icon={<CheckIcon fontSize="inherit" />}
                    sx={{ mb: 3, borderRadius: 2 }}
                >
                    {success}
                </Alert>
            )}

            {/* Error Alert */}
            {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {error}
                </Alert>
            )}

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                {/* OTP Input Fields */}
                <Controller
                    name="otp"
                    control={control}
                    render={() => (
                        <Box sx={{ mb: 4 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    justifyContent: 'center',
                                    mb: 2,
                                }}
                                onPaste={handlePaste}
                            >
                                {[0, 1, 2, 3, 4, 5].map(index => (
                                    <TextField
                                        key={index}
                                        inputRef={el =>
                                            (inputRefs.current[index] = el)
                                        }
                                        value={otpValue[index] || ''}
                                        onChange={e =>
                                            handleOTPChange(
                                                e.target.value,
                                                index
                                            )
                                        }
                                        onKeyDown={e => handleKeyDown(e, index)}
                                        inputProps={{
                                            maxLength: 1,
                                            style: {
                                                textAlign: 'center',
                                                fontSize: '1.5rem',
                                                fontWeight: 600,
                                                padding: '16px 0',
                                            },
                                        }}
                                        sx={{
                                            width: 56,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                                height: 64,
                                                '&.Mui-focused': {
                                                    '& fieldset': {
                                                        borderColor:
                                                            'primary.main',
                                                        borderWidth: 2,
                                                    },
                                                },
                                            },
                                        }}
                                        disabled={isSubmitting}
                                        error={!!errors.otp}
                                    />
                                ))}
                            </Box>

                            {errors.otp && (
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'error.main',
                                        display: 'block',
                                        textAlign: 'center',
                                    }}
                                >
                                    {errors.otp.message}
                                </Typography>
                            )}
                        </Box>
                    )}
                />

                {/* Verify Button */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isSubmitting || otpValue.length !== 6}
                    sx={{
                        py: 2,
                        borderRadius: 3,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        height: 56,
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        '&:hover': {
                            background:
                                'linear-gradient(135deg, #5b5bd6, #7c3aed)',
                            transform: 'translateY(-1px)',
                            boxShadow: theme.shadows[8],
                        },
                        '&:disabled': {
                            background: 'grey.300',
                            transform: 'none',
                        },
                        transition: 'all 0.3s ease',
                        mb: 3,
                    }}
                >
                    {isSubmitting ? (
                        <>
                            <CircularProgress
                                size={20}
                                color="inherit"
                                sx={{ mr: 1 }}
                            />
                            Verifying...
                        </>
                    ) : (
                        'Verify & Continue'
                    )}
                </Button>
            </Box>

            {/* Resend Section */}
            <Box sx={{ textAlign: 'center' }}>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                        mb: 2,
                    }}
                >
                    Didn't receive the code?
                </Typography>

                <Button
                    variant="text"
                    onClick={handleResendOTP}
                    disabled={!canResend}
                    startIcon={<RefreshIcon />}
                    sx={{
                        color: canResend ? 'primary.main' : 'text.disabled',
                        textTransform: 'none',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        '&:hover': {
                            backgroundColor: canResend
                                ? alpha(theme.palette.primary.main, 0.1)
                                : 'transparent',
                        },
                    }}
                >
                    {canResend ? 'Resend Code' : `Resend in ${countdown}s`}
                </Button>
            </Box>
        </Box>
    );
};
