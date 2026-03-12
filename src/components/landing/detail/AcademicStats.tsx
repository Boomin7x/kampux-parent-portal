import React, { type RefObject } from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useIntersectionObserver } from '../../../hooks/ui/useIntersectionObserver';

interface Stat {
    id: string;
    label: string;
    value: string;
    icon: React.ReactNode;
}

interface AcademicStatsProps {
    stats: Stat[];
}

export const AcademicStats: React.FC<AcademicStatsProps> = ({ stats }) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Grid
            container
            spacing={2}
            ref={targetRef as RefObject<HTMLDivElement>}
        >
            {stats.map((stat, index) => (
                <Grid
                    size={{ xs: 12, sm: 6, md: stats.length > 4 ? 2.4 : 3 }}
                    key={stat.id}
                >
                    <Box
                        sx={{
                            p: 2,
                            backgroundColor: '#f8fafc',
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'divider',
                            textAlign: 'center',
                            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                            opacity: isIntersecting ? 1 : 0,
                            transform: isIntersecting
                                ? 'translateY(0)'
                                : 'translateY(30px)',
                            transitionDelay: `${index * 0.1}s`,
                        }}
                    >
                        <Box
                            sx={{
                                color: 'primary.main',
                                mb: 1,
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            {stat.icon}
                        </Box>
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: '1.125rem',
                                fontWeight: 700,
                                color: 'text.primary',
                                mb: 0.5,
                            }}
                        >
                            {stat.value}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.75rem',
                                color: 'text.secondary',
                                fontWeight: 500,
                            }}
                        >
                            {stat.label}
                        </Typography>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};
