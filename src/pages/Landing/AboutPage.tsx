import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import {
    EmojiObjects as InnovationIcon,
    Favorite as CompassionIcon,
    School as ExcellenceIcon,
    GroupWork as CollaborationIcon,
    Verified as IntegrityIcon,
    Public as DiversityIcon,
    EmojiEvents as AchievementIcon,
    TrendingUp as GrowthIcon,
} from '@mui/icons-material';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';
import {
    HistoryTimeline,
    LeadershipGrid,
    ValuesGrid,
} from '../../components/landing/detail';

export const AboutPage: React.FC = () => {
    const { isIntersecting: heroIntersecting, targetRef: heroRef } =
        useIntersectionObserver({
            threshold: 0.1,
            freezeOnceVisible: true,
        });

    // Sample data - replace with actual data
    const leaders = [
        {
            id: '1',
            name: 'Dr. Sarah Johnson',
            role: 'Head of School',
            bio: 'With over 20 years of experience in education leadership, Dr. Johnson brings a wealth of knowledge and passion to our institution. She is committed to fostering academic excellence and character development.',
            email: 'sjohnson@school.edu',
            phone: '(555) 123-4567',
            avatar: '',
        },
        {
            id: '2',
            name: 'Michael Chen',
            role: 'Director of Academics',
            bio: 'Michael has dedicated his career to curriculum innovation and student achievement. He holds a Ph.D. in Educational Leadership and has published numerous articles on effective teaching practices.',
            email: 'mchen@school.edu',
            phone: '(555) 123-4568',
            avatar: '',
        },
        {
            id: '3',
            name: 'Dr. Patricia Williams',
            role: 'Director of Student Affairs',
            bio: "Dr. Williams ensures that every student's social, emotional, and developmental needs are met. Her approach to student welfare has been recognized nationally.",
            email: 'pwilliams@school.edu',
            phone: '(555) 123-4569',
            avatar: '',
        },
        {
            id: '4',
            name: 'James Rodriguez',
            role: 'Director of Admissions',
            bio: 'James leads our admissions team with a focus on finding students who will thrive in our community. He has helped shape our diverse and talented student body.',
            email: 'jrodriguez@school.edu',
            phone: '(555) 123-4570',
            avatar: '',
        },
        {
            id: '5',
            name: 'Dr. Emily Thompson',
            role: 'Director of Operations',
            bio: 'Dr. Thompson ensures smooth daily operations and maintains our state-of-the-art facilities. Her efficiency and attention to detail keep everything running seamlessly.',
            email: 'ethompson@school.edu',
            phone: '(555) 123-4571',
            avatar: '',
        },
        {
            id: '6',
            name: 'Robert Martinez',
            role: 'Director of Technology',
            bio: 'Robert leads our technology initiatives, ensuring students and faculty have access to cutting-edge educational tools and resources.',
            email: 'rmartinez@school.edu',
            phone: '(555) 123-4572',
            avatar: '',
        },
    ];

    const values = [
        {
            id: '1',
            title: 'Academic Excellence',
            description:
                'We maintain the highest standards of academic achievement and intellectual curiosity.',
            icon: <ExcellenceIcon sx={{ fontSize: 24 }} />,
        },
        {
            id: '2',
            title: 'Innovation',
            description:
                'We embrace creative thinking and encourage students to explore new ideas and solutions.',
            icon: <InnovationIcon sx={{ fontSize: 24 }} />,
        },
        {
            id: '3',
            title: 'Compassion',
            description:
                'We foster empathy, kindness, and respect for all members of our community.',
            icon: <CompassionIcon sx={{ fontSize: 24 }} />,
        },
        {
            id: '4',
            title: 'Collaboration',
            description:
                'We believe in the power of teamwork and collective problem-solving.',
            icon: <CollaborationIcon sx={{ fontSize: 24 }} />,
        },
        {
            id: '5',
            title: 'Integrity',
            description:
                'We uphold honesty, ethical behavior, and personal accountability in all we do.',
            icon: <IntegrityIcon sx={{ fontSize: 24 }} />,
        },
        {
            id: '6',
            title: 'Diversity',
            description:
                'We celebrate different perspectives and create an inclusive environment for all.',
            icon: <DiversityIcon sx={{ fontSize: 24 }} />,
        },
        {
            id: '7',
            title: 'Achievement',
            description:
                'We recognize and celebrate individual and collective accomplishments.',
            icon: <AchievementIcon sx={{ fontSize: 24 }} />,
        },
        {
            id: '8',
            title: 'Growth Mindset',
            description:
                'We believe in continuous learning and the potential for improvement in everyone.',
            icon: <GrowthIcon sx={{ fontSize: 24 }} />,
        },
    ];

    const history = [
        {
            year: '1985',
            title: 'School Founded',
            description:
                'Our institution was established with a vision to provide world-class education to students from all backgrounds.',
        },
        {
            year: '1992',
            title: 'First Expansion',
            description:
                'Added new science labs and arts facilities to support our growing student body.',
        },
        {
            year: '2000',
            title: 'Technology Integration',
            description:
                'Became one of the first schools in the region to integrate technology into every classroom.',
        },
        {
            year: '2008',
            title: 'International Accreditation',
            description:
                'Received international accreditation, recognizing our commitment to educational excellence.',
        },
        {
            year: '2015',
            title: 'New Campus Opening',
            description:
                'Opened our modern campus with state-of-the-art facilities and sustainable design.',
        },
        {
            year: '2020',
            title: 'Digital Transformation',
            description:
                'Successfully transitioned to hybrid learning model during global challenges.',
        },
        {
            year: '2024',
            title: 'Innovation Center Launch',
            description:
                'Launched dedicated STEM and Innovation Center with cutting-edge maker spaces.',
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
                        About Our School
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
                        Empowering students to reach their full potential
                        through excellence, innovation, and compassion.
                    </Typography>
                </Container>
            </Box>

            {/* Mission & Vision Section */}
            <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box
                                sx={{
                                    p: 3,
                                    backgroundColor: '#ffffff',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 1,
                                    height: '100%',
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 600,
                                        background:
                                            'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        mb: 2,
                                    }}
                                >
                                    Our Mission
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '0.875rem',
                                        color: 'text.secondary',
                                        lineHeight: 1.7,
                                    }}
                                >
                                    To provide a nurturing and challenging
                                    educational environment where students
                                    develop intellectually, socially, and
                                    emotionally. We are committed to fostering
                                    critical thinking, creativity, and a
                                    lifelong love of learning while instilling
                                    strong values and global citizenship.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box
                                sx={{
                                    p: 3,
                                    backgroundColor: '#ffffff',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 1,
                                    height: '100%',
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 600,
                                        background:
                                            'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        mb: 2,
                                    }}
                                >
                                    Our Vision
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '0.875rem',
                                        color: 'text.secondary',
                                        lineHeight: 1.7,
                                    }}
                                >
                                    To be a leading educational institution
                                    recognized for academic excellence,
                                    innovative teaching methods, and the
                                    holistic development of students. We
                                    envision a community where every student
                                    discovers their unique potential and becomes
                                    a confident, compassionate leader ready to
                                    make a positive impact on the world.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Core Values Section */}
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
                            Our Core Values
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
                            The principles that guide our community and shape
                            our educational philosophy.
                        </Typography>
                    </Box>
                    <ValuesGrid values={values} />
                </Container>
            </Box>

            {/* Leadership Team Section */}
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
                            Leadership Team
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
                            Meet the dedicated leaders who guide our school
                            community.
                        </Typography>
                    </Box>
                    <LeadershipGrid leaders={leaders} />
                </Container>
            </Box>

            {/* History Timeline Section */}
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
                            Our History
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
                            A journey of growth, innovation, and commitment to
                            educational excellence.
                        </Typography>
                    </Box>
                    <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
                        <HistoryTimeline items={history} />
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
                            Join Our Community
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
                            Experience firsthand what makes our school special.
                            Schedule a campus tour or contact our admissions
                            team to learn more.
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                            }}
                        >
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
                                Schedule a Tour
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                sx={{
                                    borderColor: '#ffffff',
                                    color: '#ffffff',
                                    fontSize: '0.875rem',
                                    textTransform: 'none',
                                    '&:hover': {
                                        borderColor: '#ffffff',
                                        backgroundColor:
                                            'rgba(255,255,255,0.1)',
                                    },
                                }}
                            >
                                Contact Admissions
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};
