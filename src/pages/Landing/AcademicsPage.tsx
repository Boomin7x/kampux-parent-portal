import React, { useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import {
    Science as ScienceIcon,
    Book as BookIcon,
    Calculate as MathIcon,
    Language as LanguageIcon,
    Palette as ArtsIcon,
    FitnessCenter as PEIcon,
    School as SchoolIcon,
    TrendingUp as TrendingIcon,
    Groups as GroupsIcon,
    EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';
import {
    ProgramCard,
    CurriculumGrid,
    AcademicStats,
} from '../../components/landing/detail';

export const AcademicsPage: React.FC = () => {
    const [expandedProgram, setExpandedProgram] = useState<string | null>(
        'elementary'
    );

    const { isIntersecting: heroIntersecting, targetRef: heroRef } =
        useIntersectionObserver({
            threshold: 0.1,
            freezeOnceVisible: true,
        });

    const stats = [
        {
            id: '1',
            label: 'Student-Teacher Ratio',
            value: '12:1',
            icon: <GroupsIcon sx={{ fontSize: 24 }} />,
        },
        {
            id: '2',
            label: 'Average Class Size',
            value: '18',
            icon: <SchoolIcon sx={{ fontSize: 24 }} />,
        },
        {
            id: '3',
            label: 'College Acceptance',
            value: '98%',
            icon: <TrendingIcon sx={{ fontSize: 24 }} />,
        },
        {
            id: '4',
            label: 'Advanced Placement',
            value: '15+',
            icon: <TrophyIcon sx={{ fontSize: 24 }} />,
        },
    ];

    const subjects = [
        {
            id: '1',
            name: 'Mathematics',
            icon: <MathIcon sx={{ fontSize: 24 }} />,
            courses: [
                'Pre-Algebra',
                'Algebra I & II',
                'Geometry',
                'Pre-Calculus',
                'AP Calculus',
            ],
            weeklyHours: 5,
        },
        {
            id: '2',
            name: 'Science',
            icon: <ScienceIcon sx={{ fontSize: 24 }} />,
            courses: ['Biology', 'Chemistry', 'Physics', 'Environmental Science'],
            weeklyHours: 5,
        },
        {
            id: '3',
            name: 'Language Arts',
            icon: <BookIcon sx={{ fontSize: 24 }} />,
            courses: [
                'Literature',
                'Creative Writing',
                'Composition',
                'Public Speaking',
            ],
            weeklyHours: 5,
        },
        {
            id: '4',
            name: 'World Languages',
            icon: <LanguageIcon sx={{ fontSize: 24 }} />,
            courses: ['Spanish', 'French', 'Mandarin Chinese'],
            weeklyHours: 3,
        },
        {
            id: '5',
            name: 'Arts',
            icon: <ArtsIcon sx={{ fontSize: 24 }} />,
            courses: [
                'Visual Arts',
                'Music',
                'Theater',
                'Digital Media',
                'Dance',
            ],
            weeklyHours: 3,
        },
        {
            id: '6',
            name: 'Physical Education',
            icon: <PEIcon sx={{ fontSize: 24 }} />,
            courses: [
                'Team Sports',
                'Individual Fitness',
                'Health & Wellness',
            ],
            weeklyHours: 3,
        },
    ];

    return (
        <Box sx={{ backgroundColor: '#fefefe', minHeight: '100vh' }}>
            {/* Hero Section */}
            <Box
                ref={heroRef}
                component="section"
                sx={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '21/9',
                    minHeight: { xs: '200px', sm: '300px', md: '400px' },
                    backgroundColor: '#171717',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                            'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(139, 92, 246, 0.9))',
                        zIndex: 1,
                    }}
                />
                <Container
                    maxWidth="lg"
                    sx={{
                        position: 'relative',
                        zIndex: 2,
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: '1.5rem', md: '2.5rem' },
                            fontWeight: 700,
                            color: '#ffffff',
                            mb: 2,
                            opacity: heroIntersecting ? 1 : 0,
                            transform: heroIntersecting
                                ? 'translateY(0)'
                                : 'translateY(30px)',
                            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                    >
                        Academic Excellence
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: '0.875rem', md: '1rem' },
                            color: '#ffffff',
                            maxWidth: '800px',
                            mx: 'auto',
                            opacity: heroIntersecting ? 1 : 0,
                            transform: heroIntersecting
                                ? 'translateY(0)'
                                : 'translateY(30px)',
                            transition:
                                'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
                        }}
                    >
                        A comprehensive curriculum designed to challenge, inspire, and
                        prepare students for lifelong success.
                    </Typography>
                </Container>
            </Box>

            {/* Academic Stats */}
            <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
                <Container maxWidth="lg">
                    <AcademicStats stats={stats} />
                </Container>
            </Box>

            {/* Program Overview */}
            <Box
                component="section"
                sx={{ py: { xs: 6, md: 8 }, backgroundColor: '#f8fafc' }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '1.5rem', md: '1.5rem' },
                                fontWeight: 600,
                                background:
                                    'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 2,
                            }}
                        >
                            Programs by Grade Level
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: '0.875rem',
                                color: 'text.secondary',
                                maxWidth: '700px',
                                mx: 'auto',
                            }}
                        >
                            Our curriculum is carefully structured to meet students at
                            every stage of their educational journey.
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <ProgramCard
                            programName="Elementary Program"
                            gradeLevel="Grades K-5"
                            description="Our elementary program builds strong foundational skills in literacy, numeracy, and critical thinking while nurturing curiosity and creativity."
                            features={[
                                'Integrated STEM curriculum',
                                'Project-based learning experiences',
                                'Daily arts and music instruction',
                                'Character education program',
                                'Small class sizes for personalized attention',
                            ]}
                            expanded={expandedProgram === 'elementary'}
                            onChange={(isExpanded) =>
                                setExpandedProgram(
                                    isExpanded ? 'elementary' : null
                                )
                            }
                        />
                        <ProgramCard
                            programName="Middle School Program"
                            gradeLevel="Grades 6-8"
                            description="Middle school students engage in rigorous academic coursework while developing independence, leadership skills, and self-advocacy."
                            features={[
                                'Departmentalized instruction',
                                'Honors course options',
                                'Advisory program for social-emotional support',
                                'Technology integration across all subjects',
                                'Comprehensive elective offerings',
                            ]}
                            expanded={expandedProgram === 'middle'}
                            onChange={(isExpanded) =>
                                setExpandedProgram(isExpanded ? 'middle' : null)
                            }
                        />
                        <ProgramCard
                            programName="High School Program"
                            gradeLevel="Grades 9-12"
                            description="Our high school program offers challenging coursework, advanced placement options, and college preparation to ensure students are ready for their next chapter."
                            features={[
                                '15+ Advanced Placement courses',
                                'College counseling and career guidance',
                                'Dual enrollment opportunities',
                                'Independent study and research options',
                                'Internship and service learning programs',
                            ]}
                            expanded={expandedProgram === 'high'}
                            onChange={(isExpanded) =>
                                setExpandedProgram(isExpanded ? 'high' : null)
                            }
                        />
                    </Box>
                </Container>
            </Box>

            {/* Curriculum Areas */}
            <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '1.5rem', md: '1.5rem' },
                                fontWeight: 600,
                                background:
                                    'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 2,
                            }}
                        >
                            Curriculum Areas
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: '0.875rem',
                                color: 'text.secondary',
                                maxWidth: '700px',
                                mx: 'auto',
                            }}
                        >
                            A well-rounded education that prepares students for college
                            and beyond.
                        </Typography>
                    </Box>
                    <CurriculumGrid subjects={subjects} />
                </Container>
            </Box>

            {/* Special Programs */}
            <Box
                component="section"
                sx={{ py: { xs: 6, md: 8 }, backgroundColor: '#f8fafc' }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '1.5rem', md: '1.5rem' },
                                fontWeight: 600,
                                background:
                                    'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 2,
                            }}
                        >
                            Special Programs
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: '0.875rem',
                                color: 'text.secondary',
                                maxWidth: '700px',
                                mx: 'auto',
                                mb: 4,
                            }}
                        >
                            Enhanced learning opportunities for students with unique
                            interests and talents.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                        }}
                    >
                        <Box
                            sx={{
                                p: 3,
                                backgroundColor: '#ffffff',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1,
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    fontSize: '1.125rem',
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    mb: 1,
                                }}
                            >
                                STEM Innovation Center
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: '0.8125rem',
                                    color: 'text.secondary',
                                }}
                            >
                                State-of-the-art facilities for robotics, coding, 3D
                                printing, and engineering projects. Students engage in
                                hands-on learning and participate in regional and national
                                competitions.
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                p: 3,
                                backgroundColor: '#ffffff',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1,
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    fontSize: '1.125rem',
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    mb: 1,
                                }}
                            >
                                Performing & Visual Arts Academy
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: '0.8125rem',
                                    color: 'text.secondary',
                                }}
                            >
                                Comprehensive arts education including theater, music,
                                dance, and visual arts. Students showcase their work in
                                annual exhibitions, concerts, and theatrical productions.
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                p: 3,
                                backgroundColor: '#ffffff',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1,
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    fontSize: '1.125rem',
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    mb: 1,
                                }}
                            >
                                Athletic Excellence Program
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: '0.8125rem',
                                    color: 'text.secondary',
                                }}
                            >
                                Competitive sports programs across 12 varsity sports with
                                professional coaching, strength and conditioning, and
                                sports medicine support. Multiple state championships and
                                college athletic placements.
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            p: { xs: 3, md: 4 },
                            background:
                                'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            borderRadius: 1,
                            textAlign: 'center',
                        }}
                    >
                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                                fontWeight: 600,
                                color: '#ffffff',
                                mb: 2,
                            }}
                        >
                            Experience Our Academic Programs
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: '0.875rem',
                                color: '#ffffff',
                                mb: 3,
                                maxWidth: '600px',
                                mx: 'auto',
                            }}
                        >
                            Schedule a campus tour to see our classrooms, labs, and
                            special program facilities in action.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                backgroundColor: '#ffffff',
                                color: 'primary.main',
                                fontSize: '0.875rem',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#f8fafc',
                                },
                            }}
                        >
                            Schedule a Campus Tour
                        </Button>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};
