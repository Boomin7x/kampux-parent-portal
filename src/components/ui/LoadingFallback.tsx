import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export const LoadingFallback: React.FC = () => (
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#fefefe',
        }}
    >
        <CircularProgress
            sx={{
                color: '#6366f1',
            }}
        />
    </Box>
);