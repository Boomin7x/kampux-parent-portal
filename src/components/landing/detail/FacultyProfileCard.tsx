import React, { useState } from 'react';
import {
    Box,
    Typography,
    Avatar,
    Card,
    Chip,
    Button,
    Collapse,
} from '@mui/material';
import { Email as EmailIcon, Star as StarIcon } from '@mui/icons-material';
import { useIntersectionObserver } from '../../../hooks/ui/useIntersectionObserver';
import type { FacultyMember } from './FacultyDirectory';

interface FacultyProfileCardProps {
    member: FacultyMember;
    index?: number;
}

export const FacultyProfileCard: React.FC<FacultyProfileCardProps> = ({
    member,
    index = 0,
}) => {
    const [expanded, setExpanded] = useState(false);
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Card
            ref={targetRef}
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
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Avatar
                    src={member.avatar}
                    alt={member.name}
                    sx={{
                        width: 72,
                        height: 72,
                        mb: 1.5,
                        border: '2px solid',
                        borderColor: 'primary.main',
                    }}
                >
                    {member.name.charAt(0)}
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
                    {member.name}
                </Typography>
                <Typography
                    variant="caption"
                    sx={{
                        fontSize: '0.75rem',
                        color: 'text.secondary',
                        mb: 1,
                    }}
                >
                    {member.title}
                </Typography>
                <Chip
                    label={member.department}
                    size="small"
                    sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        backgroundColor: 'primary.main',
                        color: '#ffffff',
                        fontWeight: 600,
                        mb: 2,
                    }}
                />
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: '0.8125rem',
                        color: 'text.secondary',
                        display: '-webkit-box',
                        WebkitLineClamp: expanded ? 'unset' : 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {member.bio}
                </Typography>
                {member.bio.length > 150 && (
                    <Button
                        size="small"
                        onClick={() => setExpanded(!expanded)}
                        sx={{
                            fontSize: '0.75rem',
                            textTransform: 'none',
                            p: 0,
                            mt: 0.5,
                            minWidth: 'auto',
                        }}
                    >
                        {expanded ? 'Show less' : 'Read more'}
                    </Button>
                )}
            </Box>

            <Collapse in={expanded}>
                <Box sx={{ mb: 2 }}>
                    <Typography
                        variant="caption"
                        sx={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: 'text.primary',
                            mb: 1,
                            display: 'block',
                        }}
                    >
                        Qualifications
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        {member.qualifications.map((qual, idx) => (
                            <Typography
                                key={idx}
                                variant="caption"
                                sx={{
                                    fontSize: '0.75rem',
                                    color: 'text.secondary',
                                    pl: 1,
                                    borderLeft: '2px solid',
                                    borderColor: 'divider',
                                }}
                            >
                                {qual}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            </Collapse>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1,
                    mt: 'auto',
                    pt: 2,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <StarIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                    <Typography
                        variant="caption"
                        sx={{ fontSize: '0.75rem', color: 'text.secondary' }}
                    >
                        {member.yearsOfExperience}+ years
                    </Typography>
                </Box>
                <Button
                    size="small"
                    href={`mailto:${member.email}`}
                    startIcon={<EmailIcon sx={{ fontSize: 16 }} />}
                    sx={{
                        fontSize: '0.75rem',
                        textTransform: 'none',
                    }}
                >
                    Contact
                </Button>
            </Box>
        </Card>
    );
};
