import { Box, Chip, Typography } from '@mui/material';
import React from 'react';
import { BaseSwiper, useSwiper } from './BaseSwiper';
import { facultySwiperConfig } from './swiperConfig';

// Faculty member data interface
export interface FacultyMember {
    id: string;
    name: string;
    title: string;
    department: string;
    qualifications: string[];
    experience: string;
    specializations: string[];
    avatar?: string;
    email?: string;
    bio?: string;
}

// Faculty Swiper props
export interface FacultySwiperProps {
    faculty: FacultyMember[];
    showNavigation?: boolean;
    className?: string;
}

// Individual faculty card component
const FacultyCard: React.FC<{ faculty: FacultyMember }> = ({ faculty }) => {
    return (
        <Box className="faculty-card">
            <Box className="faculty-image">
                {faculty.avatar ? (
                    <img
                        src={faculty.avatar}
                        alt={faculty.name}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                ) : (
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'grey.100',
                            color: 'grey.500',
                        }}
                    >
                        <Typography variant="h4" sx={{ mb: 1, opacity: 0.5 }}>
                            👨‍🏫
                        </Typography>
                        <Typography variant="caption">Faculty Photo</Typography>
                    </Box>
                )}
            </Box>

            <Box sx={{ p: 3 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        mb: 0.5,
                        color: 'text.primary',
                        fontSize: '1rem',
                    }}
                >
                    {faculty.name}
                </Typography>

                <Typography
                    variant="subtitle2"
                    sx={{
                        color: 'primary.main',
                        fontWeight: 500,
                        mb: 0.5,
                        fontSize: '0.8125rem',
                    }}
                >
                    {faculty.title}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        mb: 2,
                        fontSize: '0.75rem',
                    }}
                >
                    {faculty.department}
                </Typography>

                <Typography
                    variant="caption"
                    sx={{
                        color: 'text.secondary',
                        mb: 2,
                        display: 'block',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                    }}
                >
                    {faculty.experience} Experience
                </Typography>

                {faculty.bio && (
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            mb: 2,
                            fontSize: '0.75rem',
                            lineHeight: 1.5,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {faculty.bio}
                    </Typography>
                )}

                {faculty.qualifications.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'text.secondary',
                                fontWeight: 600,
                                mb: 1,
                                display: 'block',
                                fontSize: '0.6875rem',
                                textTransform: 'uppercase',
                                letterSpacing: 0.5,
                            }}
                        >
                            Qualifications
                        </Typography>
                        <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
                            {faculty.qualifications
                                .slice(0, 2)
                                .map((qual, index) => (
                                    <Chip
                                        key={index}
                                        label={qual}
                                        size="small"
                                        sx={{
                                            fontSize: '0.6875rem',
                                            height: 20,
                                            bgcolor: 'grey.100',
                                            color: 'text.secondary',
                                            '& .MuiChip-label': {
                                                px: 1,
                                            },
                                        }}
                                    />
                                ))}
                        </Box>
                    </Box>
                )}

                {faculty.specializations.length > 0 && (
                    <Box>
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'text.secondary',
                                fontWeight: 600,
                                mb: 1,
                                display: 'block',
                                fontSize: '0.6875rem',
                                textTransform: 'uppercase',
                                letterSpacing: 0.5,
                            }}
                        >
                            Specializations
                        </Typography>
                        <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
                            {faculty.specializations
                                .slice(0, 3)
                                .map((spec, index) => (
                                    <Chip
                                        key={index}
                                        label={spec}
                                        size="small"
                                        sx={{
                                            fontSize: '0.6875rem',
                                            height: 20,
                                            bgcolor: 'primary.50',
                                            color: 'primary.main',
                                            '& .MuiChip-label': {
                                                px: 1,
                                            },
                                        }}
                                    />
                                ))}
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

// Main Faculty Swiper component
export const FacultySwiper: React.FC<FacultySwiperProps> = ({
    faculty,
    showNavigation = true,
    className = '',
}) => {
    const { handleSwiper, handleSlideChange } = useSwiper();

    return (
        <BaseSwiper
            className={`faculty-swiper ${className}`}
            onSwiper={handleSwiper}
            onSlideChange={handleSlideChange}
            // slidesPerView={'auto'}
            {...facultySwiperConfig}
        >
            {faculty.map(member => (
                <FacultyCard key={member.id} faculty={member} />
            ))}
        </BaseSwiper>
    );
};

// Default faculty data for demo/placeholder
export const defaultFaculty: FacultyMember[] = [
    {
        id: '1',
        name: 'Dr. Sarah Mitchell',
        title: 'Principal',
        department: 'Administration',
        qualifications: ['Ph.D. Educational Leadership', 'M.Ed. Curriculum'],
        experience: '15+ years',
        specializations: [
            'Educational Leadership',
            'Curriculum Development',
            'Student Success',
        ],
        bio: 'Dr. Mitchell brings over 15 years of educational leadership experience, with a passion for creating innovative learning environments that foster student growth and achievement.',
    },
    {
        id: '2',
        name: 'Mr. James Rodriguez',
        title: 'Mathematics Teacher',
        department: 'Mathematics',
        qualifications: ['M.S. Mathematics', 'B.Ed. Secondary Education'],
        experience: '10+ years',
        specializations: ['Algebra', 'Calculus', 'STEM Integration'],
        bio: 'Mr. Rodriguez is dedicated to making mathematics accessible and engaging for all students, using innovative teaching methods and real-world applications.',
    },
    {
        id: '3',
        name: 'Ms. Emily Chen',
        title: 'English Literature Teacher',
        department: 'English',
        qualifications: ['M.A. English Literature', 'B.A. English'],
        experience: '8+ years',
        specializations: [
            'Creative Writing',
            'Literary Analysis',
            'Public Speaking',
        ],
        bio: 'Ms. Chen inspires students to discover the power of language through literature, creative writing, and effective communication skills.',
    },
    {
        id: '4',
        name: 'Dr. Michael Thompson',
        title: 'Science Department Head',
        department: 'Science',
        qualifications: ['Ph.D. Chemistry', 'M.S. Education'],
        experience: '12+ years',
        specializations: [
            'Chemistry',
            'Laboratory Research',
            'Science Fair Coordination',
        ],
        bio: 'Dr. Thompson leads our science department with expertise in chemistry and a commitment to hands-on, inquiry-based learning experiences.',
    },
    {
        id: '5',
        name: 'Mrs. Jennifer Davis',
        title: 'Art Teacher',
        department: 'Fine Arts',
        qualifications: ['M.F.A. Studio Art', 'B.A. Art Education'],
        experience: '9+ years',
        specializations: ['Visual Arts', 'Digital Media', 'Art History'],
        bio: 'Mrs. Davis nurtures creativity and artistic expression while teaching students various art techniques and art history appreciation.',
    },
    {
        id: '6',
        name: 'Coach Robert Wilson',
        title: 'Physical Education Teacher',
        department: 'Physical Education',
        qualifications: ['M.S. Kinesiology', 'B.S. Physical Education'],
        experience: '11+ years',
        specializations: [
            'Athletic Training',
            'Health Education',
            'Team Sports',
        ],
        bio: 'Coach Wilson promotes physical fitness, teamwork, and healthy lifestyle choices through engaging physical education programs.',
    },
];
