import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import { Grid } from '@mui/material';
import { useIntersectionObserver } from '../../../hooks/ui/useIntersectionObserver';

interface Subject {
    id: string;
    name: string;
    icon: React.ReactNode;
    courses: string[];
    weeklyHours: number;
}

interface CurriculumGridProps {
    subjects: Subject[];
}

export const CurriculumGrid: React.FC<CurriculumGridProps> = ({ subjects }) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Grid ref={targetRef} container spacing={2}>
            {subjects.map((subject, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={subject.id}>
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
                        <Box sx={{ mb: 2 }}>
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 1,
                                    background:
                                        'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#ffffff',
                                    mb: 1.5,
                                }}
                            >
                                {subject.icon}
                            </Box>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    mb: 0.5,
                                }}
                            >
                                {subject.name}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: '0.75rem',
                                    color: 'text.secondary',
                                }}
                            >
                                {subject.weeklyHours} hours/week
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 0.5,
                            }}
                        >
                            {subject.courses.map((course, courseIndex) => (
                                <Typography
                                    key={courseIndex}
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.75rem',
                                        color: 'text.secondary',
                                        pl: 1,
                                        borderLeft: '2px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    {course}
                                </Typography>
                            ))}
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};
