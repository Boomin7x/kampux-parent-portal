import React, { type RefObject } from 'react';
import { Box, Typography, Card, Chip, Button } from '@mui/material';
import { Group as GroupIcon } from '@mui/icons-material';
import { useIntersectionObserver } from '../../../hooks/ui/useIntersectionObserver';
import type { Activity } from './ActivityCatalog';

interface ClubCardProps {
    activity: Activity;
    index?: number;
}

export const ClubCard: React.FC<ClubCardProps> = ({ activity, index = 0 }) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    const getCategoryColor = (category: string) => {
        const colors = {
            Sports: '#10b981',
            Arts: '#f59e0b',
            Academic: '#6366f1',
            Service: '#ef4444',
        };
        return colors[category as keyof typeof colors] || '#6366f1';
    };

    return (
        <Card
            ref={targetRef as RefObject<HTMLDivElement>}
            sx={{
                p: 2,
                height: '100%',
                backgroundColor: '#ffffff',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                display: 'flex',
                flexDirection: 'column',
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
                    alignItems: 'flex-start',
                    gap: 2,
                    mb: 2,
                }}
            >
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1,
                        background: `linear-gradient(135deg, ${getCategoryColor(
                            activity.category
                        )}, ${getCategoryColor(activity.category)}dd)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        flexShrink: 0,
                    }}
                >
                    {activity.icon}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: 'text.primary',
                            mb: 0.5,
                        }}
                    >
                        {activity.name}
                    </Typography>
                    <Chip
                        label={activity.category}
                        size="small"
                        sx={{
                            height: 20,
                            fontSize: '0.75rem',
                            backgroundColor: getCategoryColor(
                                activity.category
                            ),
                            color: '#ffffff',
                            fontWeight: 600,
                        }}
                    />
                </Box>
            </Box>

            <Typography
                variant="body2"
                sx={{
                    fontSize: '0.8125rem',
                    color: 'text.secondary',
                    mb: 2,
                    flexGrow: 1,
                }}
            >
                {activity.description}
            </Typography>

            <Box
                sx={{
                    pt: 2,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        mb: 2,
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{
                            fontSize: '0.75rem',
                            color: 'text.secondary',
                        }}
                    >
                        <strong>Schedule:</strong> {activity.meetingSchedule}
                    </Typography>
                    <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                        <GroupIcon
                            sx={{ fontSize: 16, color: 'text.secondary' }}
                        />
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.75rem',
                                color: 'text.secondary',
                            }}
                        >
                            {activity.memberCount} members
                        </Typography>
                    </Box>
                </Box>
                <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{
                        fontSize: '0.75rem',
                        textTransform: 'none',
                    }}
                >
                    Learn More
                </Button>
            </Box>
        </Card>
    );
};
