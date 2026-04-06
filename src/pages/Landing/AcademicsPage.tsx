import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    Chip,
    Tab,
    Tabs,
    LinearProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {
    Science,
    MenuBook,
    Calculate,
    Language,
    Palette,
    FitnessCenter,
    School,
    TrendingUp,
    Groups,
    EmojiEvents,
    CheckCircle,
} from '@mui/icons-material';
import { ResponsiveImage } from '../../components/landing/shared/ResponsiveImage';
import { PageHeader } from '../../components/landing/shared/PageHeader';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';

/**
 * Interface for academic programs
 */
interface AcademicProgram {
    id: string;
    name: string;
    level: string;
    description: string;
    subjects: string[];
    highlights: string[];
    image: string;
}

/**
 * Interface for curriculum subjects
 */
interface Subject {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    features: string[];
}

/**
 * Interface for performance metrics
 */
interface PerformanceMetric {
    id: string;
    label: string;
    value: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    progress?: number;
}

/**
 * Interface for grade level showcases
 */
interface GradeLevel {
    id: string;
    level: string;
    title: string;
    description: string;
    keySubjects: string[];
    specialPrograms: string[];
    image: string;
}

/**
 * AcademicsPage component - Comprehensive academic information
 */
export const AcademicsPage: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    // Academic programs data
    const academicPrograms: AcademicProgram[] = [
        {
            id: '1',
            name: 'Elementary Education',
            level: 'K-6',
            description:
                'Building strong foundations in literacy, numeracy, and critical thinking through engaging, hands-on learning experiences.',
            subjects: [
                'Mathematics',
                'English Language Arts',
                'Science',
                'Social Studies',
                'Arts',
            ],
            highlights: [
                'Play-based learning',
                'STEAM integration',
                'Character development',
                'Multilingual support',
            ],
            image: '/pexels-cottonbro-7395304.jpg',
        },
        {
            id: '2',
            name: 'High School Excellence',
            level: 'F1-Uppersixth',
            description:
                'Preparing students for university success and lifelong learning through rigorous academics and diverse opportunities.',
            subjects: [
                'AP Courses',
                'Advanced Sciences',
                'Calculus',
                'World Languages',
                'Fine Arts',
                'Computer Science',
            ],
            highlights: [
                'College credit courses',
                'Research projects',
                'Internship programs',
                'University partnerships',
            ],
            image: '/pexels-max-fischer-5212317.jpg',
        },
    ];

    // Core subjects data
    const coreSubjects: Subject[] = [
        {
            id: '1',
            name: 'STEM Education',
            description:
                'Comprehensive Science, Technology, Engineering, and Mathematics curriculum with hands-on laboratories and real-world applications.',
            icon: <Science />,
            color: '#10b981',
            features: [
                'State-of-the-art labs',
                'Coding & robotics',
                'Scientific method',
                'Innovation projects',
            ],
        },
        {
            id: '2',
            name: 'Language Arts',
            description:
                'Developing strong communication skills through literature, writing, speaking, and critical analysis across multiple genres.',
            icon: <MenuBook />,
            color: '#6366f1',
            features: [
                'Creative writing',
                'Public speaking',
                'Literary analysis',
                'Media literacy',
            ],
        },
        {
            id: '3',
            name: 'Mathematics',
            description:
                'Building mathematical fluency from basic concepts to advanced calculus with emphasis on problem-solving and logical reasoning.',
            icon: <Calculate />,
            color: '#8b5cf6',
            features: [
                'Problem-based learning',
                'Mathematical modeling',
                'Technology integration',
                'Competition teams',
            ],
        },
        {
            id: '4',
            name: 'World Languages',
            description:
                'Immersive language learning programs fostering global citizenship and cultural understanding through authentic experiences.',
            icon: <Language />,
            color: '#06b6d4',
            features: [
                'Native speaker teachers',
                'Cultural exchanges',
                'Immersion programs',
                'Global partnerships',
            ],
        },
        {
            id: '5',
            name: 'Creative Arts',
            description:
                'Comprehensive arts education including visual arts, music, drama, and digital media to foster creativity and self-expression.',
            icon: <Palette />,
            color: '#f59e0b',
            features: [
                'Professional studios',
                'Performance opportunities',
                'Digital art tools',
                'Artist residencies',
            ],
        },
        {
            id: '6',
            name: 'Physical Education',
            description:
                'Promoting physical fitness, teamwork, and healthy lifestyle habits through diverse sports and wellness programs.',
            icon: <FitnessCenter />,
            color: '#ef4444',
            features: [
                'Diverse sports programs',
                'Fitness training',
                'Wellness education',
                'Competitive teams',
            ],
        },
    ];

    // Performance metrics
    const performanceMetrics: PerformanceMetric[] = [
        {
            id: '1',
            label: 'Student-Teacher Ratio',
            value: '12:1',
            description: 'ensuring personalized attention and support',
            icon: <Groups />,
            color: '#10b981',
        },
        {
            id: '2',
            label: 'College Acceptance Rate',
            value: '98%',
            description: 'of graduates accepted to top universities',
            icon: <School />,
            color: '#6366f1',
            progress: 98,
        },
        {
            id: '3',
            label: 'AP Score Excellence',
            value: '4.2',
            description: 'average AP exam score (5-point scale)',
            icon: <TrendingUp />,
            color: '#8b5cf6',
            progress: 84,
        },
        {
            id: '4',
            label: 'Academic Awards',
            value: '125+',
            description: 'student achievements this year',
            icon: <EmojiEvents />,
            color: '#f59e0b',
        },
    ];

    // Grade level showcases
    const gradeLevels: GradeLevel[] = [
        {
            id: '1',
            level: 'Elementary',
            title: 'Foundation Years (K-6)',
            description:
                'Nurturing young minds through discovery-based learning that builds essential skills while maintaining the joy of learning.',
            keySubjects: [
                'Reading & Writing',
                'Number Sense',
                'Science Exploration',
                'Social Skills',
            ],
            specialPrograms: [
                'STEAM Lab',
                'Art Studio',
                'Music Program',
                'Library Adventures',
            ],
            image: '/pexels-cottonbro-6208928.jpg',
        },
        {
            id: '3',
            level: 'High School',
            title: 'Excellence Years (9-12)',
            description:
                'Preparing students for university success through rigorous academics, leadership opportunities, and real-world experiences.',
            keySubjects: [
                'AP Courses',
                'Advanced Sciences',
                'Calculus & Statistics',
                'Research Methods',
            ],
            specialPrograms: [
                'Honor Society',
                'Internships',
                'College Partnerships',
                'Leadership Academy',
            ],
            image: '/trnava-university-_9xRHrMOjeg-unsplash.jpg',
        },
    ];

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#fefefe',
            }}
        >
            {/* Page Header with Hero Banner */}
            <PageHeader
                title="Academic Excellence"
                subtitle="Comprehensive education programs designed to inspire learning and foster academic achievement"
                backgroundImage="/pexels-matazumultimedia-32951018.jpg"
                backgroundImageSrcSet={{
                    small: '/pexels-matazumultimedia-32951018.jpg',
                    medium: '/pexels-matazumultimedia-32951018.jpg',
                    large: '/pexels-matazumultimedia-32951018.jpg',
                }}
                textColor="light"
                showOverlay={true}
                minHeight="500px"
            />

            {/* Main Content */}
            <Box component="main">
                {/* Educational Philosophy Section */}
                <EducationalPhilosophySection />

                {/* Academic Programs Section */}
                <ProgramsSection programs={academicPrograms} />

                {/* Core Subjects Curriculum */}
                <CurriculumSection subjects={coreSubjects} />

                {/* Performance Dashboard */}
                <PerformanceSection metrics={performanceMetrics} />

                {/* Grade Level Showcases */}
                <GradeLevelsSection
                    levels={gradeLevels}
                    selectedTab={selectedTab}
                    onTabChange={handleTabChange}
                />
            </Box>
        </Box>
    );
};

/**
 * Educational Philosophy section component
 */
const EducationalPhilosophySection: React.FC = () => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="philosophy"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#ffffff',
            }}
        >
            <Container maxWidth="md" sx={{ mx: 'auto' }}>
                <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateX(0)'
                                    : 'translateX(-30px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                        >
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: '1.5rem',
                                    fontWeight: 600,
                                    mb: 1,
                                    background: 
                                        'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Our Educational Philosophy
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: '0.875rem',
                                    lineHeight: 1.4,
                                    color: 'text.primary',
                                    mb: 2,
                                }}
                            >
                                We believe every student is unique and capable
                                of excellence. Our approach combines rigorous
                                academics with personalized support, fostering
                                critical thinking, creativity, and character
                                development in a nurturing environment.
                            </Typography>
                            <List sx={{ mb: 3 }}>
                                {[
                                    'Student-centered learning approaches',
                                    'Inquiry-based curriculum design',
                                    'Technology-enhanced instruction',
                                    'Real-world application focus',
                                    'Collaborative learning communities',
                                ].map((item, index) => (
                                    <ListItem
                                        key={index}
                                        sx={{ py: 0.5, px: 0 }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 32 }}>
                                            <CheckCircle
                                                sx={{
                                                    fontSize: 20,
                                                    color: 'primary.main',
                                                }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item}
                                            primaryTypographyProps={{
                                                variant: 'body2',
                                                color: 'text.secondary',
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateX(0)'
                                    : 'translateX(30px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
                            }}
                        >
                            <ResponsiveImage
                                src="/pexels-mary-taylor-5896578.jpg"
                                alt="Students engaged in classroom learning"
                                aspectRatio={4 / 4}
                                borderRadius={2}
                                objectFit="cover"
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

/**
 * Academic Programs section component
 */
interface ProgramsSectionProps {
    programs: AcademicProgram[];
}

const ProgramsSection: React.FC<ProgramsSectionProps> = ({ programs }) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="programs"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#f8fafc',
            }}
        >
            <Container maxWidth="md" sx={{ mx: 'auto' }}>
                <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 3 } }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            mb: 1,
                            background:
                                'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Academic Programs
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: '1rem',
                            color: 'text.secondary',
                            maxWidth: '900px',
                            mx: 'auto',
                        }}
                    >
                        Comprehensive educational pathways designed for every
                        stage of learning
                    </Typography>
                </Box>

                <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    sx={{ maxWidth: 1000 }}>
                        {programs.map((program, index) => (
                        <Grid
                            size={{ xs: 20, md: 6 }}
                            key={program.id}
                            sx={{ display: 'inline-flex' }}
                        >
                            <Card 
                                sx={{
                                    width: 'auto',
                                    height: 'auto',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    boxShadow: 'none',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    opacity: isIntersecting ? 1 : 0,
                                    transform: isIntersecting
                                        ? 'translateY(0)'
                                        : 'translateY(30px)',
                                    transition:
                                        'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: `${index * 0.2}s`,
                                    '&:hover': {
                                        boxShadow:
                                            '0 8px 25px rgba(99, 102, 241, 0.15)',
                                        transform: 'translateY(-4px)',
                                    },
                                }}
                            >
                                <ResponsiveImage
                                    src={program.image}
                                    alt={program.name}
                                    aspectRatio={12 / 10}
                                    borderRadius={0}
                                    objectFit="cover"
                                />
                                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: {
                                                xs: 'column',
                                                sm: 'row',
                                            },
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: 2,
                                            mb: 1.5,
                                        }}
                                    >
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                fontSize: '1.125rem',
                                                fontWeight: 600,
                                                color: 'text.primary',
                                            }}
                                        >
                                            {program.name}
                                        </Typography>
                                        <Chip
                                            label={program.level}
                                            size="small"
                                            sx={{
                                                backgroundColor: 'primary.100',
                                                color: 'primary.main',
                                                fontWeight: 500,
                                            }}
                                        />
                                    </Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontSize: '0.75rem',
                                            color: 'text.secondary',
                                            fontWeight: 500,
                                            mb: 1.5,
                                            display: 'block',
                                        }}
                                    >
                                        {program.description}
                                    </Typography>
                                    <Box sx={{ mb: 1.5 }}>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: 'text.secondary',
                                                fontWeight: 500,
                                                mb: 1,
                                                display: 'block',
                                            }}
                                        >
                                            Key Subjects:
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                justifyContent: 'center',
                                                gap: 2.5,
                                            }}
                                        >
                                            {program.subjects
                                                .slice(0, 3)
                                                .map((subject, subIndex) => (
                                                    <Chip
                                                        key={subIndex}
                                                        label={subject}
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{
                                                            fontSize: '0.75rem',
                                                        }}
                                                    />
                                                ))}
                                            {program.subjects.length > 3 && (
                                                <Chip
                                                    label={`+${program.subjects.length - 3} more`}
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{ fontSize: '0.75rem' }}
                                                />
                                            )}
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: 'text.secondary',
                                                fontWeight: 500,
                                                mb: 1,
                                                display: 'block',
                                            }}
                                        >
                                            Program Highlights:
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: 'center' }}>
                                            {program.highlights.slice(0, 2).map((highlight, hIndex) => (
                                                <Box
                                                    key={hIndex}
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                        px: 1.5,
                                                        py: 0.5,
                                                        backgroundColor: 'success.50',
                                                        borderRadius: 1,
                                                        width: 'fit-content',
                                                    }}
                                                >
                                                    <CheckCircle sx={{ fontSize: 14, color: 'success.main' }} />
                                                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                                                        {highlight}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

/**
 * Curriculum section component
 */
interface CurriculumSectionProps {
    subjects: Subject[];
}

const CurriculumSection: React.FC<CurriculumSectionProps> = ({ subjects }) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="curriculum"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#ffffff',
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 600,
                            mb: 2,
                            background:
                                'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Comprehensive Curriculum
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: 'text.secondary',
                            maxWidth: '600px',
                            mx: 'auto',
                        }}
                    >
                        Interdisciplinary subjects designed to develop
                        well-rounded, critical thinkers
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {subjects.map((subject, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={subject.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    boxShadow: 'none',
                                    borderRadius: 2,
                                    transition: 'all 0.3s ease',
                                    opacity: isIntersecting ? 1 : 0,
                                    transform: isIntersecting
                                        ? 'translateY(0)'
                                        : 'translateY(30px)',
                                    transitionDelay: `${index * 0.1}s`,
                                    '&:hover': {
                                        boxShadow:
                                            '0 8px 25px rgba(99, 102, 241, 0.15)',
                                        transform: 'translateY(-4px)',
                                        borderColor: subject.color,
                                    },
                                }}
                            >
                                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                                    <Avatar
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            backgroundColor: subject.color,
                                            mx: 'auto',
                                            mb: 2,
                                        }}
                                    >
                                        {subject.icon}
                                    </Avatar>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 1.5,
                                            color: 'text.primary',
                                        }}
                                    >
                                        {subject.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.secondary',
                                            lineHeight: 1.6,
                                            mb: 2,
                                        }}
                                    >
                                        {subject.description}
                                    </Typography>
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: 'text.secondary',
                                                fontWeight: 500,
                                                mb: 1,
                                                display: 'block',
                                            }}
                                        >
                                            Key Features:
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                                            {subject.features.map((feature, fIndex) => (
                                                <Box
                                                    key={fIndex}
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                        px: 1.5,
                                                        py: 0.5,
                                                        backgroundColor: 'grey.100',
                                                        borderRadius: 1,
                                                        width: 'fit-content',
                                                    }}
                                                >
                                                    <CheckCircle sx={{ fontSize: 14, color: subject.color }} />
                                                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                                                        {feature}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

/**
 * Performance section component
 */
interface PerformanceSectionProps {
    metrics: PerformanceMetric[];
}

const PerformanceSection: React.FC<PerformanceSectionProps> = ({ metrics }) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="performance"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#f8fafc',
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 600,
                            mb: 2,
                            background:
                                'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Academic Performance
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: 'text.secondary',
                            maxWidth: '600px',
                            mx: 'auto',
                        }}
                    >
                        Measurable outcomes demonstrating our commitment to
                        educational excellence
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {metrics.map((metric, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={metric.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    textAlign: 'center',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    boxShadow: 'none',
                                    borderRadius: 2,
                                    p: 3,
                                    opacity: isIntersecting ? 1 : 0,
                                    transform: isIntersecting
                                        ? 'translateY(0)'
                                        : 'translateY(30px)',
                                    transition:
                                        'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: `${index * 0.1}s`,
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: 56,
                                        height: 56,
                                        backgroundColor: metric.color,
                                        mx: 'auto',
                                        mb: 2,
                                    }}
                                >
                                    {metric.icon}
                                </Avatar>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 700,
                                        color: metric.color,
                                        mb: 1,
                                    }}
                                >
                                    {metric.value}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 600,
                                        color: 'text.primary',
                                        mb: 1,
                                    }}
                                >
                                    {metric.label}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        mb: metric.progress ? 2 : 0,
                                    }}
                                >
                                    {metric.description}
                                </Typography>
                                {metric.progress && (
                                    <LinearProgress
                                        variant="determinate"
                                        value={metric.progress}
                                        sx={{
                                            height: 6,
                                            borderRadius: 3,
                                            backgroundColor: 'grey.200',
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: metric.color,
                                                borderRadius: 3,
                                            },
                                        }}
                                    />
                                )}
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

/**
 * Grade Levels section component
 */
interface GradeLevelsSectionProps {
    levels: GradeLevel[];
    selectedTab: number;
    onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const GradeLevelsSection: React.FC<GradeLevelsSectionProps> = ({
    levels,
    selectedTab,
    onTabChange,
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    const selectedLevel = levels[selectedTab];

    return (
        <Box
            ref={targetRef}
            component="section"
            id="grade-levels"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#ffffff',
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 600,
                            mb: 2,
                            background:
                                'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Grade Level Showcases
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: 'text.secondary',
                            maxWidth: '600px',
                            mx: 'auto',
                        }}
                    >
                        Discover what makes each stage of learning special at
                        our academy
                    </Typography>
                </Box>

                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
                    <Tabs
                        value={selectedTab}
                        onChange={onTabChange}
                        aria-label="grade level tabs"
                        variant="fullWidth"
                        sx={{
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontWeight: 500,
                                fontSize: '0.875rem',
                            },
                            '& .Mui-selected': {
                                color: 'primary.main',
                            },
                        }}
                    >
                        {levels.map((level, index) => (
                            <Tab
                                key={level.id}
                                label={level.level}
                                id={`grade-tab-${index}`}
                                aria-controls={`grade-tabpanel-${index}`}
                            />
                        ))}
                    </Tabs>
                </Box>

                {selectedLevel && (
                    <Box
                        sx={{
                            opacity: isIntersecting ? 1 : 0,
                            transform: isIntersecting
                                ? 'translateY(0)'
                                : 'translateY(20px)',
                            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                    >
                        <Grid
                            container
                            spacing={{ xs: 3, md: 4 }}
                            alignItems="center"
                        >
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 2,
                                            color: 'primary.main',
                                        }}
                                    >
                                        {selectedLevel.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontSize: '1rem',
                                            lineHeight: 1.7,
                                            color: 'text.primary',
                                            mb: 3,
                                        }}
                                    >
                                        {selectedLevel.description}
                                    </Typography>
                                    <Box sx={{ mb: 3 }}>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 1,
                                                color: 'text.primary',
                                            }}
                                        >
                                            Key Subjects:
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: 0.5,
                                                mb: 2,
                                            }}
                                        >
                                            {selectedLevel.keySubjects.map(
                                                (subject, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={subject}
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{
                                                            fontSize: '0.75rem',
                                                        }}
                                                    />
                                                )
                                            )}
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 1,
                                                color: 'text.primary',
                                            }}
                                        >
                                            Special Programs:
                                        </Typography>
                                        <List sx={{ py: 0 }}>
                                            {selectedLevel.specialPrograms.map(
                                                (program, index) => (
                                                    <ListItem
                                                        key={index}
                                                        sx={{ py: 0.5, px: 0 }}
                                                    >
                                                        <ListItemIcon
                                                            sx={{
                                                                minWidth: 32,
                                                            }}
                                                        >
                                                            <CheckCircle
                                                                sx={{
                                                                    fontSize: 18,
                                                                    color: 'success.main',
                                                                }}
                                                            />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={program}
                                                            primaryTypographyProps={{
                                                                variant:
                                                                    'body2',
                                                                color: 'text.secondary',
                                                            }}
                                                        />
                                                    </ListItem>
                                                )
                                            )}
                                        </List>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <ResponsiveImage
                                    src={selectedLevel.image}
                                    alt={`${selectedLevel.level} students`}
                                    aspectRatio={4 / 3}
                                    borderRadius={2}
                                    objectFit="cover"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </Container>
        </Box>
    );
};
