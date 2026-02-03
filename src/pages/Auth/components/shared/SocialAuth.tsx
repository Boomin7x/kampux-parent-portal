import { Google as GoogleIcon } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import React from 'react';
import { authStyles } from './authStyles';

interface SocialAuthProps {
    onGoogleSignIn: () => void;
    isLoading?: boolean;
    mode?: 'signin' | 'signup';
}

export const SocialAuth: React.FC<SocialAuthProps> = ({
    onGoogleSignIn,
    isLoading = false,
    mode = 'signin',
}) => {
    const actionText = mode === 'signin' ? 'Sign in' : 'Sign up';

    return (
        <>
            {/* Divider */}
            <Box sx={authStyles.dividerContainer}>
                <Divider />
                <Typography variant="body2" sx={authStyles.dividerText}>
                    Or {actionText.toLowerCase()} with
                </Typography>
            </Box>

            {/* Google SSO Button */}
            <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={onGoogleSignIn}
                disabled={isLoading}
                startIcon={
                    <GoogleIcon
                        sx={{
                            fontSize: 20,
                            color: '#EA4335',
                        }}
                    />
                }
                sx={authStyles.socialButton}
            >
                {actionText} with Google
            </Button>
        </>
    );
};