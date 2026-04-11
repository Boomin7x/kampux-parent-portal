import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useIntersectionObserver } from '../../../hooks/ui/useIntersectionObserver';

interface Value {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}

interface ValuesGridProps {
    values: Value[];
}

export const ValuesGrid: React.FC<ValuesGridProps> = ({ values }) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Grid
            container
            ref={targetRef as React.RefObject<HTMLDivElement>}
            spacing={2}
        >
            {values.map((value, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={value.id}>
                    <Card
                        sx={{
                            p: 2,
                            height: '100%',
                            backgroundColor: '#ffffff',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            opacity: isIntersecting ? 1 : 0,
                            transform: isIntersecting
                                ? 'translateY(0)'
                                : 'translateY(30px)',
                            transitionDelay: `${index * 0.1}s`,
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                borderColor: 'primary.main',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                mb: 1.5,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 1,
                                    background:
                                        'linear-gradient(135deg, #f59e0b, #16a34a)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#ffffff',
                                    flexShrink: 0,
                                }}
                            >
                                {value.icon}
                            </Box>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    color: 'text.primary',
                                }}
                            >
                                {value.title}
                            </Typography>
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: '0.8125rem',
                                color: 'text.secondary',
                            }}
                        >
                            {value.description}
                        </Typography>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};
