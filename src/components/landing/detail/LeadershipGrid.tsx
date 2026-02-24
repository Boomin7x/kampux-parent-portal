import React from 'react';
import { Box, Typography, Avatar, Card, Link } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Email as EmailIcon, Phone as PhoneIcon } from '@mui/icons-material';
import { useIntersectionObserver } from '../../../hooks/ui/useIntersectionObserver';

interface Leader {
    id: string;
    name: string;
    role: string;
    bio: string;
    email: string;
    phone?: string;
    avatar?: string;
}

interface LeadershipGridProps {
    leaders: Leader[];
}

export const LeadershipGrid: React.FC<LeadershipGridProps> = ({ leaders }) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Grid ref={targetRef} container spacing={2}>
            {leaders.map((leader, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={leader.id}>
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
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <Avatar
                                src={leader.avatar}
                                alt={leader.name}
                                sx={{
                                    width: 80,
                                    height: 80,
                                    mb: 2,
                                    border: '3px solid',
                                    borderColor: 'primary.main',
                                }}
                            >
                                {leader.name.charAt(0)}
                            </Avatar>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    mb: 0.5,
                                }}
                            >
                                {leader.name}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: '0.75rem',
                                    color: 'primary.main',
                                    fontWeight: 600,
                                    mb: 2,
                                }}
                            >
                                {leader.role}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: '0.8125rem',
                                    color: 'text.secondary',
                                    mb: 2,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 4,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}
                            >
                                {leader.bio}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                    width: '100%',
                                    mt: 'auto',
                                }}
                            >
                                <Link
                                    href={`mailto:${leader.email}`}
                                    underline="none"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        color: 'text.secondary',
                                        fontSize: '0.8125rem',
                                        '&:hover': {
                                            color: 'primary.main',
                                        },
                                    }}
                                >
                                    <EmailIcon sx={{ fontSize: 16 }} />
                                    <Typography
                                        variant="body2"
                                        sx={{ fontSize: '0.8125rem' }}
                                    >
                                        {leader.email}
                                    </Typography>
                                </Link>
                                {leader.phone && (
                                    <Link
                                        href={`tel:${leader.phone}`}
                                        underline="none"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            color: 'text.secondary',
                                            fontSize: '0.8125rem',
                                            '&:hover': {
                                                color: 'primary.main',
                                            },
                                        }}
                                    >
                                        <PhoneIcon sx={{ fontSize: 16 }} />
                                        <Typography
                                            variant="body2"
                                            sx={{ fontSize: '0.8125rem' }}
                                        >
                                            {leader.phone}
                                        </Typography>
                                    </Link>
                                )}
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};
