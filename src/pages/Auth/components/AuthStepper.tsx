/* eslint-disable react-hooks/static-components */
import {
    Check as CheckIcon,
    Email as EmailIcon,
    Message as OTPIcon,
    VpnKey as PasswordIcon,
    Security as SecurityIcon,
} from '@mui/icons-material';
import {
    alpha,
    Box,
    Step,
    StepLabel,
    Stepper,
    Typography,
    useTheme,
} from '@mui/material';
import React from 'react';

export type AuthStep = 'email' | 'method' | 'auth';
export type AuthMethod = 'otp' | 'password' | null;

interface AuthStepperProps {
    activeStep: AuthStep;
    selectedMethod: AuthMethod;
    completed?: AuthStep[];
    className?: string;
}

interface StepConfig {
    id: AuthStep;
    label: string;
    icon: React.ReactElement;
    description: string;
}

export const AuthStepper: React.FC<AuthStepperProps> = ({
    activeStep,
    selectedMethod,
    completed = [],
    className = '',
}) => {
    const theme = useTheme();

    const steps: StepConfig[] = [
        {
            id: 'email',
            label: 'Email',
            icon: <EmailIcon />,
            description: 'Enter your email address',
        },
        {
            id: 'method',
            label: 'Method',
            icon: <SecurityIcon />,
            description: 'Choose authentication method',
        },
        {
            id: 'auth',
            label:
                selectedMethod === 'otp'
                    ? 'OTP'
                    : selectedMethod === 'password'
                      ? 'Password'
                      : 'Verify',
            icon:
                selectedMethod === 'otp' ? (
                    <OTPIcon />
                ) : selectedMethod === 'password' ? (
                    <PasswordIcon />
                ) : (
                    <SecurityIcon />
                ),
            description:
                selectedMethod === 'otp'
                    ? 'Enter verification code'
                    : selectedMethod === 'password'
                      ? 'Enter your password'
                      : 'Complete verification',
        },
    ];

    const getStepIndex = (stepId: AuthStep): number => {
        return steps.findIndex(step => step.id === stepId);
    };

    const activeStepIndex = getStepIndex(activeStep);

    const StepIcon = ({
        stepId,
        isActive,
        isCompleted,
    }: {
        stepId: AuthStep;
        isActive: boolean;
        isCompleted: boolean;
    }) => {
        const stepConfig = steps.find(step => step.id === stepId);
        if (!stepConfig) return null;

        const iconColor = isCompleted
            ? theme.palette.success.main
            : isActive
              ? theme.palette.primary.main
              : theme.palette.text.disabled;

        const backgroundColor = isCompleted
            ? alpha(theme.palette.success.main, 0.1)
            : isActive
              ? alpha(theme.palette.primary.main, 0.1)
              : alpha(theme.palette.text.disabled, 0.1);

        return (
            <Box
                sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    border: `2px solid ${isCompleted ? theme.palette.success.main : isActive ? theme.palette.primary.main : 'transparent'}`,
                }}
            >
                {isCompleted ? (
                    <CheckIcon
                        sx={{ color: theme.palette.success.main, fontSize: 20 }}
                    />
                ) : (
                    React.cloneElement(stepConfig.icon, {
                        sx: { color: iconColor, fontSize: 20 },
                    } as any)
                )}
            </Box>
        );
    };

    return (
        <Box
            className={className}
            sx={{ width: '100%', maxWidth: 600, mx: 'auto', mb: 4 }}
        >
            {/* Desktop Stepper */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Stepper activeStep={activeStepIndex} alternativeLabel>
                    {steps.map((step, _index) => {
                        const isCompleted = completed.includes(step.id);
                        const isActive = step.id === activeStep;

                        return (
                            <Step key={step.id} completed={isCompleted}>
                                <StepLabel
                                    StepIconComponent={() => (
                                        <StepIcon
                                            stepId={step.id}
                                            isActive={isActive}
                                            isCompleted={isCompleted}
                                        />
                                    )}
                                    sx={{
                                        '& .MuiStepLabel-label': {
                                            color: isCompleted
                                                ? 'success.main'
                                                : isActive
                                                  ? 'primary.main'
                                                  : 'text.disabled',
                                            fontWeight:
                                                isActive || isCompleted
                                                    ? 600
                                                    : 400,
                                            fontSize: '0.875rem',
                                            mt: 1,
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight:
                                                isActive || isCompleted
                                                    ? 600
                                                    : 400,
                                            color: isCompleted
                                                ? 'success.main'
                                                : isActive
                                                  ? 'primary.main'
                                                  : 'text.disabled',
                                        }}
                                    >
                                        {step.label}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            display: 'block',
                                            color: 'text.secondary',
                                            mt: 0.5,
                                        }}
                                    >
                                        {step.description}
                                    </Typography>
                                </StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </Box>

            {/* Mobile Progress Indicator */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 2,
                    }}
                >
                    <StepIcon
                        stepId={activeStep}
                        isActive={true}
                        isCompleted={completed.includes(activeStep)}
                    />
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: 'primary.main',
                                fontSize: '1.1rem',
                            }}
                        >
                            Step {activeStepIndex + 1} of {steps.length}:{' '}
                            {steps[activeStepIndex]?.label}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                fontSize: '0.875rem',
                            }}
                        >
                            {steps[activeStepIndex]?.description}
                        </Typography>
                    </Box>
                </Box>

                {/* Progress Bar */}
                <Box
                    sx={{
                        width: '100%',
                        height: 4,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        borderRadius: 2,
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        sx={{
                            width: `${((activeStepIndex + 1) / steps.length) * 100}%`,
                            height: '100%',
                            background:
                                'linear-gradient(135deg, #f59e0b, #16a34a)',
                            transition: 'width 0.3s ease',
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};
