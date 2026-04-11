import {
    School as EducationIcon,
    Email as EmailIcon,
    ExpandMore as ExpandIcon,
    LinkedIn as LinkedInIcon,
    Phone as PhoneIcon,
    Star as StarIcon,
} from '@mui/icons-material';
import {
    Box,
    Card,
    Chip,
    Collapse,
    IconButton,
    Link,
    Typography,
} from '@mui/material';
import React, { useState, type RefObject } from 'react';
import { useIntersectionObserver } from '../../../hooks/ui/useIntersectionObserver';

interface ProfileCardProps {
    id: string;
    name: string;
    title: string;
    department?: string;
    bio: string;
    qualifications?: string[];
    yearsOfExperience?: number;
    email?: string;
    phone?: string;
    linkedIn?: string;
    avatar: string;
    specialties?: string[];
    achievements?: string[];
    index?: number;
    variant?: 'faculty' | 'leadership' | 'staff';
    showContactInfo?: boolean;
    className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
    name,
    title,
    department,
    bio,
    qualifications = [],
    yearsOfExperience,
    email,
    phone,
    linkedIn,
    avatar,
    specialties = [],
    achievements = [],
    index = 0,
    variant = 'faculty',
    showContactInfo = true,
    className = '',
}) => {
    const [expanded, setExpanded] = useState(false);
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    const getVariantStyles = () => {
        switch (variant) {
            case 'leadership':
                return {
                    avatarSize: 100,
                    borderColor: 'primary.main',
                    chipColor: 'primary',
                };
            case 'staff':
                return {
                    avatarSize: 80,
                    borderColor: 'secondary.main',
                    chipColor: 'secondary',
                };
            default: // faculty
                return {
                    avatarSize: 90,
                    borderColor: 'primary.main',
                    chipColor: 'primary',
                };
        }
    };

    const styles = getVariantStyles();

    return (
        <Card
            ref={targetRef as RefObject<HTMLDivElement>}
            className={className}
            sx={{
                position: 'relative',
                p: 0,
                backgroundColor: '#ffffff',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: isIntersecting ? 1 : 0,
                transform: isIntersecting
                    ? 'translateY(0)'
                    : 'translateY(30px)',
                transitionDelay: `${index * 0.1}s`,
                '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: styles.borderColor,
                    '& .profile-image': {
                        transform: 'scale(1.05)',
                    },
                },
            }}
        >
            {/* Header Section with Image */}
            <Box
                sx={{
                    position: 'relative',
                    height: 200,
                    background:
                        'linear-gradient(135deg, #f59e0b 0%, #16a34a 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                {/* Background Pattern */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '20px 20px',
                    }}
                />

                {/* Profile Image */}
                <Box
                    className="profile-image"
                    component="img"
                    src={avatar}
                    alt={name}
                    sx={{
                        width: styles.avatarSize,
                        height: styles.avatarSize,
                        borderRadius: '50%',
                        border: '4px solid #ffffff',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        position: 'relative',
                        zIndex: 2,
                        transition: 'transform 0.3s ease-in-out',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    }}
                />

                {/* Experience Badge */}
                {yearsOfExperience && (
                    <Chip
                        icon={<StarIcon sx={{ fontSize: 16 }} />}
                        label={`${yearsOfExperience}+ years`}
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            backgroundColor: '#ffffff',
                            color: 'primary.main',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            '& .MuiChip-icon': {
                                color: 'primary.main',
                            },
                        }}
                    />
                )}
            </Box>

            {/* Content Section */}
            <Box sx={{ p: 3 }}>
                {/* Name and Title */}
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: 'text.primary',
                            mb: 0.5,
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: '0.875rem',
                            color: 'text.secondary',
                            mb: department ? 0.5 : 1,
                        }}
                    >
                        {title}
                    </Typography>
                    {department && (
                        <Chip
                            label={department}
                            size="small"
                            sx={{
                                height: 24,
                                fontSize: '0.75rem',
                                backgroundColor: `${styles.chipColor}.main`,
                                color: '#ffffff',
                                fontWeight: 600,
                                mb: 1,
                            }}
                        />
                    )}
                </Box>

                {/* Bio */}
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: '0.8125rem',
                        color: 'text.secondary',
                        lineHeight: 1.6,
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: expanded ? 'unset' : 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {bio}
                </Typography>

                {/* Specialties */}
                {specialties.length > 0 && (
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
                            Specialties
                        </Typography>
                        <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
                            {specialties
                                .slice(0, expanded ? specialties.length : 3)
                                .map((specialty, idx) => (
                                    <Chip
                                        key={idx}
                                        label={specialty}
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            fontSize: '0.75rem',
                                            height: 24,
                                            borderColor: 'divider',
                                            color: 'text.secondary',
                                        }}
                                    />
                                ))}
                        </Box>
                    </Box>
                )}

                {/* Expandable Content */}
                <Collapse in={expanded}>
                    <Box sx={{ mb: 2 }}>
                        {qualifications.length > 0 && (
                            <Box sx={{ mb: 2 }}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        color: 'text.primary',
                                        mb: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                    }}
                                >
                                    <EducationIcon sx={{ fontSize: 16 }} />
                                    Education & Qualifications
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 0.5,
                                    }}
                                >
                                    {qualifications.map((qual, idx) => (
                                        <Typography
                                            key={idx}
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'text.secondary',
                                                pl: 1.5,
                                                borderLeft: '2px solid',
                                                borderColor: 'divider',
                                            }}
                                        >
                                            {qual}
                                        </Typography>
                                    ))}
                                </Box>
                            </Box>
                        )}

                        {achievements.length > 0 && (
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
                                    Recent Achievements
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 0.5,
                                    }}
                                >
                                    {achievements.map((achievement, idx) => (
                                        <Typography
                                            key={idx}
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'text.secondary',
                                                pl: 1.5,
                                                borderLeft: '2px solid',
                                                borderColor: 'primary.main',
                                            }}
                                        >
                                            {achievement}
                                        </Typography>
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Collapse>

                {/* Action Buttons */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        pt: 2,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    {/* Contact Info */}
                    {showContactInfo && (email || phone || linkedIn) && (
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                            {email && (
                                <IconButton
                                    component={Link}
                                    href={`mailto:${email}`}
                                    size="small"
                                    sx={{
                                        color: 'text.secondary',
                                        '&:hover': { color: 'primary.main' },
                                    }}
                                >
                                    <EmailIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                            )}
                            {phone && (
                                <IconButton
                                    component={Link}
                                    href={`tel:${phone}`}
                                    size="small"
                                    sx={{
                                        color: 'text.secondary',
                                        '&:hover': { color: 'primary.main' },
                                    }}
                                >
                                    <PhoneIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                            )}
                            {linkedIn && (
                                <IconButton
                                    component={Link}
                                    href={linkedIn}
                                    target="_blank"
                                    size="small"
                                    sx={{
                                        color: 'text.secondary',
                                        '&:hover': { color: 'primary.main' },
                                    }}
                                >
                                    <LinkedInIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                            )}
                        </Box>
                    )}

                    {/* Expand Button */}
                    {(bio.length > 150 ||
                        qualifications.length > 0 ||
                        achievements.length > 0 ||
                        specialties.length > 3) && (
                        <IconButton
                            onClick={() => setExpanded(!expanded)}
                            size="small"
                            sx={{
                                color: 'text.secondary',
                                transform: expanded
                                    ? 'rotate(180deg)'
                                    : 'rotate(0)',
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': { color: 'primary.main' },
                            }}
                        >
                            <ExpandIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                    )}
                </Box>
            </Box>
        </Card>
    );
};
