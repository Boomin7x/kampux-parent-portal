import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Avatar,
    Chip,
} from '@mui/material';
import { ResponsiveImage } from '../shared/ResponsiveImage';

/**
 * Interface for faculty member data
 */
interface FacultyMember {
    id: string;
    name: string;
    title: string;
    department: string;
    image: string;
    bio: string;
    qualifications: string[];
    experience?: string;
    specialties?: string[];
}

/**
 * Interface for FacultyCard component props
 */
interface FacultyCardProps {
    faculty: FacultyMember;
    index?: number;
    isIntersecting?: boolean;
}

/**
 * FacultyCard component - Individual faculty profile card
 *
 * Features:
 * - 20px avatar size as specified in requirements
 * - subtitle2 for names per typography guidelines
 * - Compact design following CLAUDE.md standards
 * - Responsive image integration
 * - Department and qualification chips
 * - Hover effects and animations
 * - TypeScript interfaces for type safety
 */
export const FacultyCard: React.FC<FacultyCardProps> = ({
    faculty,
    index = 0,
    isIntersecting = true,
}) => {
    return (
        <Card
            sx={{
                height: '100%',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: 'none',
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                opacity: isIntersecting ? 1 : 0,
                transform: isIntersecting
                    ? 'translateY(0)'
                    : 'translateY(30px)',
                transitionDelay: `${index * 0.1}s`,
                '&:hover': {
                    boxShadow: '0 8px 25px rgba(99, 102, 241, 0.15)',
                    transform: 'translateY(-4px)',
                },
            }}
        >
            <ResponsiveImage
                src={faculty.image}
                alt={faculty.name}
                aspectRatio={4 / 3}
                borderRadius={0}
                objectFit="cover"
            />
            <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar
                        sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: 'primary.main',
                            mr: 1,
                            fontSize: '0.75rem',
                        }}
                    >
                        {faculty.name
                            .split(' ')
                            .map(n => n[0])
                            .join('')
                            .slice(0, 2)}
                    </Avatar>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: 'text.primary',
                        }}
                    >
                        {faculty.name}
                    </Typography>
                </Box>

                <Typography
                    variant="body2"
                    sx={{
                        fontSize: '0.8125rem',
                        color: 'primary.main',
                        fontWeight: 500,
                        mb: 0.5,
                    }}
                >
                    {faculty.title}
                </Typography>

                <Chip
                    label={faculty.department}
                    size="small"
                    sx={{
                        fontSize: '0.75rem',
                        height: '18px',
                        mb: 1.5,
                        backgroundColor: 'primary.50',
                        color: 'primary.main',
                    }}
                />

                <Typography
                    variant="body2"
                    sx={{
                        fontSize: '0.8125rem',
                        color: 'text.secondary',
                        lineHeight: 1.4,
                        mb: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {faculty.bio}
                </Typography>

                <Box sx={{ mb: 1 }}>
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                            fontWeight: 500,
                            mb: 0.5,
                            display: 'block',
                        }}
                    >
                        Qualifications:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {faculty.qualifications
                            .slice(0, 2)
                            .map((qual, qualIndex) => (
                                <Chip
                                    key={qualIndex}
                                    label={qual}
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        fontSize: '0.75rem',
                                        height: '18px',
                                    }}
                                />
                            ))}
                        {faculty.qualifications.length > 2 && (
                            <Chip
                                label={`+${faculty.qualifications.length - 2} more`}
                                variant="outlined"
                                size="small"
                                sx={{
                                    fontSize: '0.75rem',
                                    height: '18px',
                                }}
                            />
                        )}
                    </Box>
                </Box>

                {faculty.experience && (
                    <Typography
                        variant="caption"
                        sx={{
                            fontSize: '0.75rem',
                            color: 'text.secondary',
                            fontWeight: 500,
                        }}
                    >
                        {faculty.experience}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};
