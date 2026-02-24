import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export const StudentLifePage: React.FC = () => {
    return (
        <Box
            component="main"
            sx={{
                minHeight: '100vh',
                pt: { xs: 12, md: 14 },
                pb: { xs: 8, md: 12 },
                backgroundColor: '#fefefe',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        textAlign: 'center',
                        mb: { xs: 6, md: 8 },
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            fontWeight: 700,
                            mb: 2,
                            background:
                                'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Student Life
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '0.875rem',
                        }}
                    >
                        Coming soon
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};
