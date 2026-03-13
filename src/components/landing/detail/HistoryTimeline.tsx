import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import { useIntersectionObserver } from '../../../hooks/ui/useIntersectionObserver';

interface TimelineItem {
    year: string;
    title: string;
    description: string;
}

interface HistoryTimelineProps {
    items: TimelineItem[];
}

export const HistoryTimeline: React.FC<HistoryTimelineProps> = ({ items }) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            sx={{
                position: 'relative',
                pl: 6,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 16,
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    backgroundColor: 'primary.main',
                },
            }}
        >
            {items.map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        position: 'relative',
                        mb: 2,
                        opacity: isIntersecting ? 1 : 0,
                        transform: isIntersecting
                            ? 'translateY(0)'
                            : 'translateY(30px)',
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: `${index * 0.1}s`,
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            left: -44,
                            top: 8,
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            backgroundColor: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2,
                        }}
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{
                                color: '#ffffff',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                            }}
                        >
                            {item.year.slice(-2)}
                        </Typography>
                    </Box>
                    <Card
                        sx={{
                            p: 2,
                            backgroundColor: '#ffffff',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                        }}
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: 'text.secondary',
                                mb: 0.5,
                            }}
                        >
                            {item.year}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: 'text.primary',
                                mb: 1,
                            }}
                        >
                            {item.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: '0.8125rem',
                                color: 'text.secondary',
                            }}
                        >
                            {item.description}
                        </Typography>
                    </Card>
                </Box>
            ))}
        </Box>
    );
};
