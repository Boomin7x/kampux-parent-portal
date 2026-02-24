import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
    Science as ScienceIcon,
    Calculate as MathIcon,
    Language as LanguageIcon,
    Palette as ArtsIcon,
    School as SchoolIcon,
    Groups as GroupsIcon,
    WorkspacePremium as CertIcon,
} from '@mui/icons-material';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';
import {
    FacultyDirectory,
    DepartmentSection,
} from '../../components/landing/detail';
import type { FacultyMember } from '../../components/landing/detail/FacultyDirectory';

export const FacultyPage: React.FC = () => {
    const { isIntersecting: heroIntersecting, targetRef: heroRef } =
        useIntersectionObserver({
            threshold: 0.1,
            freezeOnceVisible: true,
        });

    // Sample faculty data
    const allFaculty: FacultyMember[] = [
        {
            id: '1',
            name: 'Dr. Amanda Chen',
            title: 'Lead Mathematics Teacher',
            department: 'Mathematics',
            bio: 'Dr. Chen specializes in advanced mathematics and has developed innovative teaching methods that have improved student outcomes significantly.',
            qualifications: ['Ph.D. in Mathematics', 'M.Ed. in Curriculum Design'],
            yearsOfExperience: 15,
            email: 'achen@school.edu',
        },
        {
            id: '2',
            name: 'Prof. Marcus Johnson',
            title: 'Head of Science Department',
            department: 'Science',
            bio: 'Professor Johnson brings real-world laboratory experience to the classroom and leads our award-winning science fair program.',
            qualifications: ['M.S. in Biology', 'B.S. in Chemistry'],
            yearsOfExperience: 12,
            email: 'mjohnson@school.edu',
        },
        {
            id: '3',
            name: 'Elena Rodriguez',
            title: 'World Languages Coordinator',
            department: 'Languages',
            bio: 'Fluent in five languages, Elena has transformed our language program into one of the most comprehensive in the region.',
            qualifications: ['M.A. in Linguistics', 'B.A. in Spanish Literature'],
            yearsOfExperience: 10,
            email: 'erodriguez@school.edu',
        },
        {
            id: '4',
            name: 'David Park',
            title: 'Visual Arts Director',
            department: 'Arts',
            bio: 'An accomplished artist in his own right, David mentors students in various mediums and curates our annual student exhibition.',
            qualifications: ['M.F.A. in Fine Arts', 'B.F.A. in Painting'],
            yearsOfExperience: 8,
            email: 'dpark@school.edu',
        },
        {
            id: '5',
            name: 'Sarah Mitchell',
            title: 'English Department Chair',
            department: 'Languages',
            bio: 'Sarah has published several educational articles and leads professional development workshops on literacy instruction.',
            qualifications: ['M.A. in English Literature', 'B.A. in Education'],
            yearsOfExperience: 14,
            email: 'smitchell@school.edu',
        },
        {
            id: '6',
            name: 'Dr. James Thompson',
            title: 'Physics & Engineering',
            department: 'Science',
            bio: 'Dr. Thompson previously worked at NASA and now inspires the next generation of scientists and engineers.',
            qualifications: ['Ph.D. in Physics', 'M.S. in Aerospace Engineering'],
            yearsOfExperience: 18,
            email: 'jthompson@school.edu',
        },
    ];

    const departments = [
        'Mathematics',
        'Science',
        'Languages',
        'Arts',
        'Humanities',
        'Physical Education',
    ];

    const mathFaculty = allFaculty.filter((f) => f.department === 'Mathematics');
    const scienceFaculty = allFaculty.filter((f) => f.department === 'Science');
    const languageFaculty = allFaculty.filter((f) => f.department === 'Languages');

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
                        Our Faculty
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
                        Dedicated educators committed to inspiring and empowering every
                        student.
                    </Typography>
                </Container>
            </Box>

            {/* Faculty Stats */}
            <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <Box
                                sx={{
                                    p: 2,
                                    backgroundColor: '#f8fafc',
                                    borderRadius: 1,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    textAlign: 'center',
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
                                    <GroupsIcon sx={{ fontSize: 24 }} />
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
                                    85+
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.75rem',
                                        color: 'text.secondary',
                                    }}
                                >
                                    Faculty Members
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <Box
                                sx={{
                                    p: 2,
                                    backgroundColor: '#f8fafc',
                                    borderRadius: 1,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    textAlign: 'center',
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
                                    <SchoolIcon sx={{ fontSize: 24 }} />
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
                                    6
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.75rem',
                                        color: 'text.secondary',
                                    }}
                                >
                                    Academic Departments
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <Box
                                sx={{
                                    p: 2,
                                    backgroundColor: '#f8fafc',
                                    borderRadius: 1,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    textAlign: 'center',
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
                                    <CertIcon sx={{ fontSize: 24 }} />
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
                                    95%
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.75rem',
                                        color: 'text.secondary',
                                    }}
                                >
                                    Advanced Degrees
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Faculty Directory */}
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
                            Faculty Directory
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
                            Search and filter to find faculty members by department or
                            name.
                        </Typography>
                    </Box>
                    <FacultyDirectory
                        faculty={allFaculty}
                        departments={departments}
                    />
                </Container>
            </Box>

            {/* Department Sections */}
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
                            Faculty by Department
                        </Typography>
                    </Box>
                    <DepartmentSection
                        departmentName="Mathematics"
                        description="Our mathematics faculty provides rigorous instruction from foundational concepts to advanced calculus."
                        icon={<MathIcon sx={{ fontSize: 24 }} />}
                        faculty={mathFaculty}
                        defaultExpanded={true}
                    />
                    <DepartmentSection
                        departmentName="Science"
                        description="Dedicated science educators inspiring curiosity about the natural world through hands-on learning."
                        icon={<ScienceIcon sx={{ fontSize: 24 }} />}
                        faculty={scienceFaculty}
                    />
                    <DepartmentSection
                        departmentName="Languages"
                        description="World language experts fostering communication skills and cultural understanding."
                        icon={<LanguageIcon sx={{ fontSize: 24 }} />}
                        faculty={languageFaculty}
                    />
                </Container>
            </Box>

            {/* CTA Section */}
            <Box
                component="section"
                sx={{ py: { xs: 6, md: 8 }, backgroundColor: '#f8fafc' }}
            >
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
                            Join Our Team
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
                            We're always looking for passionate educators to join our
                            community. Explore current openings and learn about our
                            faculty benefits.
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
                            View Career Opportunities
                        </Button>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};
