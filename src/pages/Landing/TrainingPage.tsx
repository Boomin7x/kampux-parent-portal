import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    Chip,
    Button,
    LinearProgress,
    Stack,
    Divider,
} from '@mui/material';
import {
    MenuBook,
    Psychology,
    Computer,
    Science,
    Business,
    Language,
    Schedule,
    Groups,
    CheckCircle,
    Star,
    CalendarMonth,
    Person,
    ContactMail,
    WorkspacePremium,
    TrendingUp,
    AccessTime,
    LocationOn,
    Email,
    Phone,
} from '@mui/icons-material';
import { PageHeader } from '../../components/landing/shared/PageHeader';
import { ResponsiveImage } from '../../components/landing/shared/ResponsiveImage';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';

/**
 * Interface for training categories
 */
interface TrainingCategory {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    courseCount: number;
    popularCourses: string[];
}

/**
 * Interface for training courses
 */
interface TrainingCourse {
    id: string;
    title: string;
    description: string;
    category: string;
    duration: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    format: 'Online' | 'In-Person' | 'Hybrid';
    price: string;
    rating: number;
    enrolledCount: number;
    startDate: string;
    instructor: string;
    features: string[];
    prerequisites?: string[];
    learningOutcomes: string[];
}

/**
 * Interface for instructor profiles
 */
interface Instructor {
    id: string;
    name: string;
    title: string;
    expertise: string[];
    bio: string;
    image: string;
    experience: string;
    qualifications: string[];
    coursesCount: number;
    studentsCount: number;
    rating: number;
}

/**
 * Interface for certification pathways
 */
interface Certification {
    id: string;
    title: string;
    description: string;
    duration: string;
    courses: string[];
    benefits: string[];
    requirements: string[];
    careerPaths: string[];
    icon: React.ReactNode;
    color: string;
}

/**
 * Interface for training statistics
 */
interface TrainingStats {
    id: string;
    label: string;
    value: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    progress?: number;
}

/**
 * TrainingPage component - Comprehensive training and professional development programs
 *
 * Features:
 * - Hero banner with training program overview
 * - Training categories and domains
 * - Course catalog with detailed listings
 * - Professional development programs
 * - Certification pathways
 * - Training calendar and schedule
 * - Instructor profiles
 * - Registration and enrollment information
 * - Success metrics and statistics
 * - Contact and support information
 * - Responsive design with animations
 * - TypeScript interfaces for type safety
 *
 * Architecture:
 * - Follows DESIGN_PATTERN.md for minimal typography
 * - Uses MUI Grid v2 syntax throughout
 * - Implements intersection observer for animations
 * - Responsive images with lazy loading
 * - Accessibility compliance with proper ARIA labels
 */
export const TrainingPage: React.FC = () => {
    // Training categories data
    const trainingCategories: TrainingCategory[] = [
        {
            id: '1',
            title: 'Digital Literacy',
            description:
                'Essential computer skills and digital tools for modern education and workplace.',
            icon: <Computer />,
            color: '#6366f1',
            courseCount: 12,
            popularCourses: [
                'Basic Computer Skills',
                'Microsoft Office Suite',
                'Digital Communication',
            ],
        },
        {
            id: '2',
            title: 'STEM Education',
            description:
                'Science, Technology, Engineering, and Mathematics training programs.',
            icon: <Science />,
            color: '#10b981',
            courseCount: 18,
            popularCourses: [
                'Laboratory Management',
                'Engineering Principles',
                'Math Pedagogy',
            ],
        },
        {
            id: '3',
            title: 'Language Arts',
            description:
                'Communication skills, writing, and multilingual education programs.',
            icon: <Language />,
            color: '#f59e0b',
            courseCount: 15,
            popularCourses: [
                'English Proficiency',
                'Creative Writing',
                'Public Speaking',
            ],
        },
        {
            id: '4',
            title: 'Business & Leadership',
            description:
                'Management, entrepreneurship, and leadership development programs.',
            icon: <Business />,
            color: '#8b5cf6',
            courseCount: 10,
            popularCourses: [
                'Project Management',
                'Team Leadership',
                'Financial Literacy',
            ],
        },
        {
            id: '5',
            title: 'Educational Psychology',
            description:
                'Child development, learning theories, and educational best practices.',
            icon: <Psychology />,
            color: '#06b6d4',
            courseCount: 8,
            popularCourses: [
                'Child Development',
                'Learning Disabilities',
                'Classroom Management',
            ],
        },
        {
            id: '6',
            title: 'Continuing Education',
            description:
                'Professional development and lifelong learning opportunities.',
            icon: <MenuBook />,
            color: '#ef4444',
            courseCount: 20,
            popularCourses: [
                'Research Methods',
                'Academic Writing',
                'Conference Presentation',
            ],
        },
    ];

    // Featured courses data
    const featuredCourses: TrainingCourse[] = [
        {
            id: '1',
            title: 'Advanced Digital Teaching Methods',
            description:
                'Master modern educational technology and digital classroom management techniques.',
            category: 'Digital Literacy',
            duration: '8 weeks',
            level: 'Advanced',
            format: 'Hybrid',
            price: '$299',
            rating: 4.8,
            enrolledCount: 156,
            startDate: '2026-04-15',
            instructor: 'Dr. Sarah Chen',
            features: [
                'Interactive Workshops',
                'Real-world Projects',
                'Certification Included',
                'Lifetime Access',
            ],
            prerequisites: ['Basic Computer Skills', 'Teaching Experience'],
            learningOutcomes: [
                'Design engaging digital learning experiences',
                'Implement educational technology tools effectively',
                'Manage virtual and hybrid classrooms',
                'Assess student learning in digital environments',
            ],
        },
        {
            id: '2',
            title: 'STEM Integration Workshop Series',
            description:
                'Comprehensive training on integrating science, technology, engineering, and math curricula.',
            category: 'STEM Education',
            duration: '6 weeks',
            level: 'Intermediate',
            format: 'In-Person',
            price: '$450',
            rating: 4.9,
            enrolledCount: 89,
            startDate: '2026-04-22',
            instructor: 'Prof. Michael Rodriguez',
            features: [
                'Hands-on Labs',
                'Curriculum Resources',
                'Peer Collaboration',
                'Follow-up Support',
            ],
            prerequisites: ['Science or Math Background'],
            learningOutcomes: [
                'Create interdisciplinary STEM lessons',
                'Use laboratory equipment safely and effectively',
                'Develop critical thinking activities',
                'Assess STEM learning outcomes',
            ],
        },
        {
            id: '3',
            title: 'Multilingual Education Strategies',
            description:
                'Effective methods for teaching in multilingual and multicultural environments.',
            category: 'Language Arts',
            duration: '4 weeks',
            level: 'Beginner',
            format: 'Online',
            price: '$189',
            rating: 4.7,
            enrolledCount: 234,
            startDate: '2026-05-01',
            instructor: 'Dr. Emily Nguyen',
            features: [
                'Flexible Schedule',
                'Cultural Resources',
                'Language Tools',
                'Community Access',
            ],
            learningOutcomes: [
                'Support diverse language learners',
                'Create inclusive learning environments',
                'Adapt curriculum for multilingual students',
                'Collaborate with families and communities',
            ],
        },
    ];

    // Instructor profiles data
    const instructors: Instructor[] = [
        {
            id: '1',
            name: 'Dr. Sarah Chen',
            title: 'Educational Technology Specialist',
            expertise: [
                'Digital Learning',
                'Curriculum Design',
                'Teacher Training',
            ],
            bio: 'Leading expert in educational technology with 15+ years of experience in digital transformation of educational institutions.',
            image: '/pexels-katerina-holmes-5905554.jpg',
            experience: '15+ years in EdTech',
            qualifications: [
                'Ph.D in Educational Technology',
                'M.Ed in Curriculum Design',
                'Google Certified Trainer',
            ],
            coursesCount: 12,
            studentsCount: 1850,
            rating: 4.8,
        },
        {
            id: '2',
            name: 'Prof. Michael Rodriguez',
            title: 'STEM Education Director',
            expertise: [
                'Science Education',
                'Laboratory Management',
                'STEM Integration',
            ],
            bio: 'Renowned science educator and researcher, passionate about making STEM accessible and engaging for all learners.',
            image: '/patrick-amoy-6DfEbqsTiA-unsplash.jpg',
            experience: '20+ years in STEM Education',
            qualifications: [
                'Ph.D in Science Education',
                'M.S. in Chemistry',
                'STEM Certification',
            ],
            coursesCount: 18,
            studentsCount: 2340,
            rating: 4.9,
        },
        {
            id: '3',
            name: 'Dr. Emily Nguyen',
            title: 'Multilingual Education Expert',
            expertise: [
                'Language Learning',
                'Cultural Competency',
                'ESL/EFL Teaching',
            ],
            bio: 'Dedicated to supporting diverse learners through innovative multilingual and multicultural education approaches.',
            image: '/pexels-rdne-7845454.jpg',
            experience: '12+ years in Language Education',
            qualifications: [
                'Ph.D in Applied Linguistics',
                'M.A. in TESOL',
                'Cultural Competency Certified',
            ],
            coursesCount: 15,
            studentsCount: 1920,
            rating: 4.7,
        },
    ];

    // Certification pathways data
    const certifications: Certification[] = [
        {
            id: '1',
            title: 'Digital Education Specialist',
            description:
                'Comprehensive certification in educational technology and digital teaching methods.',
            duration: '6 months',
            courses: [
                'Digital Teaching Methods',
                'Educational Technology Tools',
                'Online Assessment',
                'Digital Citizenship',
            ],
            benefits: [
                'Industry Recognition',
                'Salary Advancement',
                'Career Opportunities',
                'Professional Network',
            ],
            requirements: [
                'Teaching Experience',
                'Basic Computer Skills',
                'Portfolio Submission',
            ],
            careerPaths: [
                'Technology Coordinator',
                'Instructional Designer',
                'Online Learning Specialist',
            ],
            icon: <Computer />,
            color: '#6366f1',
        },
        {
            id: '2',
            title: 'STEM Integration Certificate',
            description:
                'Specialized training in interdisciplinary STEM education and implementation.',
            duration: '4 months',
            courses: [
                'STEM Pedagogy',
                'Laboratory Management',
                'Engineering Design',
                'Data Analysis',
            ],
            benefits: [
                'STEM Expertise',
                'Grant Eligibility',
                'Leadership Roles',
                'Research Opportunities',
            ],
            requirements: [
                'Science/Math Background',
                'Classroom Experience',
                'Final Project',
            ],
            careerPaths: [
                'STEM Coordinator',
                'Science Department Head',
                'Curriculum Specialist',
            ],
            icon: <Science />,
            color: '#10b981',
        },
    ];

    // Training statistics data
    const trainingStats: TrainingStats[] = [
        {
            id: '1',
            label: 'Course Completion Rate',
            value: '94%',
            description:
                'of enrolled participants successfully complete their training',
            icon: <CheckCircle />,
            color: '#10b981',
            progress: 94,
        },
        {
            id: '2',
            label: 'Professional Advancement',
            value: '87%',
            description: 'of graduates report career advancement within 1 year',
            icon: <TrendingUp />,
            color: '#6366f1',
            progress: 87,
        },
        {
            id: '3',
            label: 'Student Satisfaction',
            value: '4.8/5',
            description: 'average rating from program participants',
            icon: <Star />,
            color: '#f59e0b',
        },
        {
            id: '4',
            label: 'Training Programs',
            value: '85+',
            description: 'comprehensive courses and certification programs',
            icon: <MenuBook />,
            color: '#8b5cf6',
        },
    ];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#fefefe',
            }}
        >
            {/* Page Header with Hero Banner */}
            <PageHeader
                title="Training & Professional Development"
                subtitle="Comprehensive training programs designed to enhance educational excellence and professional growth"
                backgroundImage="/pexels-max-fischer-5212317.jpg"
                backgroundImageSrcSet={{
                    small: '/pexels-max-fischer-5212317.jpg',
                    medium: '/pexels-max-fischer-5212317.jpg',
                    large: '/pexels-max-fischer-5212317.jpg',
                }}
                textColor="light"
                showOverlay={true}
                minHeight="500px"
            />

            {/* Main Content */}
            <Box component="main">
                {/* Training Overview Section */}
                <TrainingOverviewSection />

                {/* Training Categories Section */}
                <CategoriesSection categories={trainingCategories} />

                {/* Featured Courses Section */}
                <FeaturedCoursesSection courses={featuredCourses} />

                {/* Instructor Profiles Section */}
                <InstructorsSection instructors={instructors} />

                {/* Certification Pathways Section */}
                <CertificationsSection certifications={certifications} />

                {/* Training Statistics Section */}
                <StatsSection stats={trainingStats} />

                {/* Training Calendar Section */}
                <CalendarSection />

                {/* Registration and Contact Section */}
                <RegistrationSection />
            </Box>
        </Box>
    );
};

/**
 * Training overview section component
 */
const TrainingOverviewSection: React.FC = () => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="training-overview"
            sx={{
                py: { xs: 4, md: 6 },
                backgroundColor: '#ffffff',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 8 }}>
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
                                    color: '#6366f1',
                                }}
                            >
                                Empowering Educational Excellence
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: '0.875rem',
                                    lineHeight: 1.4,
                                    color: 'text.primary',
                                    mb: 1.5,
                                }}
                            >
                                Our comprehensive training programs are designed
                                to enhance teaching methodologies, integrate
                                modern technology, and foster professional
                                growth. Whether you're a new educator or a
                                seasoned professional, our courses provide
                                practical skills and theoretical knowledge to
                                excel in today's educational landscape.
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: '0.8125rem',
                                    color: 'text.secondary',
                                    mb: 2,
                                }}
                            >
                                Join thousands of educators who have transformed
                                their teaching practice through our
                                evidence-based training programs, expert
                                instruction, and collaborative learning
                                community.
                            </Typography>

                            {/* Key Features */}
                            <Grid container spacing={1}>
                                {[
                                    {
                                        icon: <Schedule />,
                                        text: 'Flexible Scheduling',
                                    },
                                    {
                                        icon: <WorkspacePremium />,
                                        text: 'Professional Certification',
                                    },
                                    {
                                        icon: <Groups />,
                                        text: 'Collaborative Learning',
                                    },
                                    {
                                        icon: <ContactMail />,
                                        text: 'Expert Support',
                                    },
                                ].map((feature, index) => (
                                    <Grid size={{ xs: 6, sm: 3 }} key={index}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                                p: 1,
                                                backgroundColor: 'primary.50',
                                                borderRadius: 1,
                                                transition: 'all 0.3s ease',
                                                transitionDelay: `${index * 0.1}s`,
                                                opacity: isIntersecting ? 1 : 0,
                                                transform: isIntersecting
                                                    ? 'translateY(0)'
                                                    : 'translateY(20px)',
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    width: 16,
                                                    height: 16,
                                                    backgroundColor:
                                                        'primary.main',
                                                }}
                                            >
                                                {feature.icon}
                                            </Avatar>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.75rem',
                                                    fontWeight: 500,
                                                    color: 'primary.main',
                                                }}
                                            >
                                                {feature.text}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
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
                                src="/pexels-rdne-7092339.jpg"
                                alt="Professional training session"
                                aspectRatio={4 / 3}
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
 * Training categories section component
 */
interface CategoriesSectionProps {
    categories: TrainingCategory[];
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
    categories,
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="training-categories"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#f8fafc',
            }}
        >
            <Container maxWidth="lg">
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
                        Training Categories
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: '1rem',
                            color: 'text.secondary',
                            maxWidth: '600px',
                            mx: 'auto',
                        }}
                    >
                        Explore our diverse range of professional development
                        programs tailored to modern educational needs
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {categories.map((category, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category.id}>
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
                                        boxShadow: `0 8px 25px ${category.color}20`,
                                        transform: 'translateY(-4px)',
                                        borderColor: category.color,
                                    },
                                }}
                            >
                                <CardContent sx={{ p: 2 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            mb: 1.5,
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: 20,
                                                height: 20,
                                                backgroundColor: category.color,
                                                mr: 1,
                                            }}
                                        >
                                            {category.icon}
                                        </Avatar>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                fontSize: '1.125rem',
                                                fontWeight: 600,
                                                color: 'text.primary',
                                                flex: 1,
                                            }}
                                        >
                                            {category.title}
                                        </Typography>
                                        <Chip
                                            label={`${category.courseCount} courses`}
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                fontSize: '0.75rem',
                                                height: '18px',
                                                borderColor: category.color,
                                                color: category.color,
                                            }}
                                        />
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: '0.8125rem',
                                            color: 'text.secondary',
                                            lineHeight: 1.4,
                                            mb: 1.5,
                                        }}
                                    >
                                        {category.description}
                                    </Typography>
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                color: 'text.primary',
                                                mb: 0.5,
                                                display: 'block',
                                            }}
                                        >
                                            Popular Courses:
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            spacing={0.5}
                                            flexWrap="wrap"
                                        >
                                            {category.popularCourses
                                                .slice(0, 2)
                                                .map((course, courseIndex) => (
                                                    <Chip
                                                        key={courseIndex}
                                                        label={course}
                                                        variant="filled"
                                                        size="small"
                                                        sx={{
                                                            fontSize:
                                                                '0.6875rem',
                                                            height: '16px',
                                                            backgroundColor: `${category.color}15`,
                                                            color: category.color,
                                                            mb: 0.5,
                                                        }}
                                                    />
                                                ))}
                                        </Stack>
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
 * Featured courses section component
 */
interface FeaturedCoursesSectionProps {
    courses: TrainingCourse[];
}

const FeaturedCoursesSection: React.FC<FeaturedCoursesSectionProps> = ({
    courses,
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="featured-courses"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#ffffff',
            }}
        >
            <Container maxWidth="lg">
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
                        Featured Courses
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: '1rem',
                            color: 'text.secondary',
                            maxWidth: '600px',
                            mx: 'auto',
                        }}
                    >
                        Highly-rated training programs designed by experts for
                        professional development
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {courses.map((course, index) => (
                        <Grid size={{ xs: 12, lg: 4 }} key={course.id}>
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
                                    transitionDelay: `${index * 0.2}s`,
                                    '&:hover': {
                                        boxShadow:
                                            '0 8px 25px rgba(99, 102, 241, 0.15)',
                                        transform: 'translateY(-4px)',
                                    },
                                }}
                            >
                                <CardContent sx={{ p: 2 }}>
                                    {/* Course Header */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            mb: 1,
                                        }}
                                    >
                                        <Stack spacing={0.5}>
                                            <Typography
                                                variant="h4"
                                                sx={{
                                                    fontSize: '1.125rem',
                                                    fontWeight: 600,
                                                    color: 'text.primary',
                                                    lineHeight: 1.2,
                                                }}
                                            >
                                                {course.title}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                }}
                                            >
                                                <Chip
                                                    label={course.category}
                                                    variant="filled"
                                                    size="small"
                                                    sx={{
                                                        fontSize: '0.6875rem',
                                                        height: '16px',
                                                        backgroundColor:
                                                            'primary.100',
                                                        color: 'primary.main',
                                                    }}
                                                />
                                                <Chip
                                                    label={course.level}
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        fontSize: '0.6875rem',
                                                        height: '16px',
                                                    }}
                                                />
                                            </Box>
                                        </Stack>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontSize: '1rem',
                                                fontWeight: 700,
                                                color: 'primary.main',
                                            }}
                                        >
                                            {course.price}
                                        </Typography>
                                    </Box>

                                    {/* Course Description */}
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: '0.8125rem',
                                            color: 'text.secondary',
                                            lineHeight: 1.4,
                                            mb: 1.5,
                                        }}
                                    >
                                        {course.description}
                                    </Typography>

                                    {/* Course Details */}
                                    <Grid
                                        container
                                        spacing={1}
                                        sx={{ mb: 1.5 }}
                                    >
                                        <Grid size={6}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.5,
                                                }}
                                            >
                                                <AccessTime
                                                    sx={{
                                                        fontSize: '0.875rem',
                                                        color: 'text.secondary',
                                                    }}
                                                />
                                                <Typography
                                                    variant="caption"
                                                    sx={{ fontSize: '0.75rem' }}
                                                >
                                                    {course.duration}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid size={6}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.5,
                                                }}
                                            >
                                                <LocationOn
                                                    sx={{
                                                        fontSize: '0.875rem',
                                                        color: 'text.secondary',
                                                    }}
                                                />
                                                <Typography
                                                    variant="caption"
                                                    sx={{ fontSize: '0.75rem' }}
                                                >
                                                    {course.format}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid size={6}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.5,
                                                }}
                                            >
                                                <Star
                                                    sx={{
                                                        fontSize: '0.875rem',
                                                        color: '#f59e0b',
                                                    }}
                                                />
                                                <Typography
                                                    variant="caption"
                                                    sx={{ fontSize: '0.75rem' }}
                                                >
                                                    {course.rating} rating
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid size={6}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.5,
                                                }}
                                            >
                                                <Groups
                                                    sx={{
                                                        fontSize: '0.875rem',
                                                        color: 'text.secondary',
                                                    }}
                                                />
                                                <Typography
                                                    variant="caption"
                                                    sx={{ fontSize: '0.75rem' }}
                                                >
                                                    {course.enrolledCount}{' '}
                                                    enrolled
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    {/* Course Features */}
                                    <Box sx={{ mb: 1.5 }}>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                color: 'text.primary',
                                                mb: 0.5,
                                                display: 'block',
                                            }}
                                        >
                                            What's Included:
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            spacing={0.5}
                                            flexWrap="wrap"
                                        >
                                            {course.features
                                                .slice(0, 3)
                                                .map(
                                                    (feature, featureIndex) => (
                                                        <Chip
                                                            key={featureIndex}
                                                            label={feature}
                                                            variant="outlined"
                                                            size="small"
                                                            sx={{
                                                                fontSize:
                                                                    '0.6875rem',
                                                                height: '16px',
                                                                mb: 0.5,
                                                            }}
                                                        />
                                                    )
                                                )}
                                        </Stack>
                                    </Box>

                                    <Divider sx={{ mb: 1.5 }} />

                                    {/* Instructor and Action */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.75rem',
                                                    color: 'text.secondary',
                                                }}
                                            >
                                                Instructor: {course.instructor}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.75rem',
                                                    color: 'text.secondary',
                                                    display: 'block',
                                                }}
                                            >
                                                Starts:{' '}
                                                {new Date(
                                                    course.startDate
                                                ).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            sx={{
                                                fontSize: '0.75rem',
                                                py: 0.5,
                                                px: 1.5,
                                                backgroundColor: 'primary.main',
                                                '&:hover': {
                                                    backgroundColor:
                                                        'primary.dark',
                                                },
                                            }}
                                        >
                                            Enroll Now
                                        </Button>
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
 * Instructors section component
 */
interface InstructorsSectionProps {
    instructors: Instructor[];
}

const InstructorsSection: React.FC<InstructorsSectionProps> = ({
    instructors,
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="instructors"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#f8fafc',
            }}
        >
            <Container maxWidth="lg">
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
                        Expert Instructors
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: '1rem',
                            color: 'text.secondary',
                            maxWidth: '600px',
                            mx: 'auto',
                        }}
                    >
                        Learn from experienced educators and industry
                        professionals
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {instructors.map((instructor, index) => (
                        <Grid size={{ xs: 12, md: 4 }} key={instructor.id}>
                            <Card
                                sx={{
                                    height: '100%',
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
                                }}
                            >
                                <ResponsiveImage
                                    src={instructor.image}
                                    alt={instructor.name}
                                    aspectRatio={4 / 3}
                                    borderRadius={0}
                                    objectFit="cover"
                                />
                                <CardContent sx={{ p: 2 }}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            mb: 0.5,
                                            color: 'text.primary',
                                        }}
                                    >
                                        {instructor.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: '0.8125rem',
                                            color: 'primary.main',
                                            fontWeight: 500,
                                            mb: 1,
                                        }}
                                    >
                                        {instructor.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: '0.8125rem',
                                            color: 'text.secondary',
                                            lineHeight: 1.4,
                                            mb: 1,
                                        }}
                                    >
                                        {instructor.bio}
                                    </Typography>

                                    {/* Stats */}
                                    <Grid container spacing={1} sx={{ mb: 1 }}>
                                        <Grid size={4}>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        fontSize: '0.875rem',
                                                        fontWeight: 700,
                                                        color: 'primary.main',
                                                    }}
                                                >
                                                    {instructor.coursesCount}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontSize: '0.75rem',
                                                        color: 'text.secondary',
                                                    }}
                                                >
                                                    Courses
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid size={4}>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        fontSize: '0.875rem',
                                                        fontWeight: 700,
                                                        color: 'primary.main',
                                                    }}
                                                >
                                                    {instructor.studentsCount}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontSize: '0.75rem',
                                                        color: 'text.secondary',
                                                    }}
                                                >
                                                    Students
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid size={4}>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        fontSize: '0.875rem',
                                                        fontWeight: 700,
                                                        color: 'primary.main',
                                                    }}
                                                >
                                                    {instructor.rating}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontSize: '0.75rem',
                                                        color: 'text.secondary',
                                                    }}
                                                >
                                                    Rating
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    {/* Expertise Tags */}
                                    <Box>
                                        {instructor.expertise
                                            .slice(0, 3)
                                            .map((skill, skillIndex) => (
                                                <Chip
                                                    key={skillIndex}
                                                    label={skill}
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        mr: 0.5,
                                                        mb: 0.5,
                                                        fontSize: '0.75rem',
                                                        height: '18px',
                                                    }}
                                                />
                                            ))}
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
 * Certifications section component
 */
interface CertificationsSectionProps {
    certifications: Certification[];
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({
    certifications,
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="certifications"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#ffffff',
            }}
        >
            <Container maxWidth="lg">
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
                        Professional Certifications
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: '1rem',
                            color: 'text.secondary',
                            maxWidth: '600px',
                            mx: 'auto',
                        }}
                    >
                        Comprehensive certification programs for career
                        advancement and professional recognition
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {certifications.map((certification, index) => (
                        <Grid size={{ xs: 12, md: 6 }} key={certification.id}>
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
                                    transitionDelay: `${index * 0.2}s`,
                                    '&:hover': {
                                        boxShadow: `0 8px 25px ${certification.color}20`,
                                        transform: 'translateY(-4px)',
                                    },
                                }}
                            >
                                <CardContent sx={{ p: 2 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            mb: 1.5,
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                backgroundColor:
                                                    certification.color,
                                                mr: 1,
                                            }}
                                        >
                                            {certification.icon}
                                        </Avatar>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                fontSize: '1.125rem',
                                                fontWeight: 600,
                                                color: 'text.primary',
                                                flex: 1,
                                            }}
                                        >
                                            {certification.title}
                                        </Typography>
                                        <Chip
                                            label={certification.duration}
                                            variant="filled"
                                            size="small"
                                            sx={{
                                                fontSize: '0.75rem',
                                                height: '18px',
                                                backgroundColor: `${certification.color}15`,
                                                color: certification.color,
                                            }}
                                        />
                                    </Box>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: '0.8125rem',
                                            color: 'text.secondary',
                                            lineHeight: 1.4,
                                            mb: 1.5,
                                        }}
                                    >
                                        {certification.description}
                                    </Typography>

                                    {/* Certification Details */}
                                    <Grid container spacing={2}>
                                        <Grid size={6}>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.75rem',
                                                    fontWeight: 600,
                                                    color: 'text.primary',
                                                    mb: 0.5,
                                                    display: 'block',
                                                }}
                                            >
                                                Key Benefits:
                                            </Typography>
                                            <Stack spacing={0.5}>
                                                {certification.benefits
                                                    .slice(0, 3)
                                                    .map(
                                                        (
                                                            benefit,
                                                            benefitIndex
                                                        ) => (
                                                            <Box
                                                                key={
                                                                    benefitIndex
                                                                }
                                                                sx={{
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
                                                                    gap: 0.5,
                                                                }}
                                                            >
                                                                <CheckCircle
                                                                    sx={{
                                                                        fontSize:
                                                                            '0.75rem',
                                                                        color: certification.color,
                                                                    }}
                                                                />
                                                                <Typography
                                                                    variant="caption"
                                                                    sx={{
                                                                        fontSize:
                                                                            '0.75rem',
                                                                        color: 'text.secondary',
                                                                    }}
                                                                >
                                                                    {benefit}
                                                                </Typography>
                                                            </Box>
                                                        )
                                                    )}
                                            </Stack>
                                        </Grid>
                                        <Grid size={6}>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.75rem',
                                                    fontWeight: 600,
                                                    color: 'text.primary',
                                                    mb: 0.5,
                                                    display: 'block',
                                                }}
                                            >
                                                Career Paths:
                                            </Typography>
                                            <Stack spacing={0.25}>
                                                {certification.careerPaths.map(
                                                    (path, pathIndex) => (
                                                        <Typography
                                                            key={pathIndex}
                                                            variant="caption"
                                                            sx={{
                                                                fontSize:
                                                                    '0.75rem',
                                                                color: 'text.secondary',
                                                            }}
                                                        >
                                                            • {path}
                                                        </Typography>
                                                    )
                                                )}
                                            </Stack>
                                        </Grid>
                                    </Grid>

                                    <Divider sx={{ my: 1.5 }} />

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'text.secondary',
                                            }}
                                        >
                                            {certification.courses.length}{' '}
                                            Required Courses
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                fontSize: '0.75rem',
                                                py: 0.5,
                                                px: 1.5,
                                                borderColor:
                                                    certification.color,
                                                color: certification.color,
                                                '&:hover': {
                                                    backgroundColor: `${certification.color}10`,
                                                    borderColor:
                                                        certification.color,
                                                },
                                            }}
                                        >
                                            Learn More
                                        </Button>
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
 * Training statistics section component
 */
interface StatsSectionProps {
    stats: TrainingStats[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="training-stats"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#f8fafc',
            }}
        >
            <Container maxWidth="lg">
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
                        Training Success Metrics
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: '1rem',
                            color: 'text.secondary',
                            maxWidth: '600px',
                            mx: 'auto',
                        }}
                    >
                        Measurable results and success stories from our training
                        programs
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {stats.map((stat, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    textAlign: 'center',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    boxShadow: 'none',
                                    borderRadius: 1,
                                    p: 2,
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
                                        width: 24,
                                        height: 24,
                                        backgroundColor: stat.color,
                                        mx: 'auto',
                                        mb: 1.5,
                                    }}
                                >
                                    {stat.icon}
                                </Avatar>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: '1.125rem',
                                        fontWeight: 700,
                                        color: stat.color,
                                        mb: 0.5,
                                    }}
                                >
                                    {stat.value}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: 'text.primary',
                                        mb: 0.5,
                                    }}
                                >
                                    {stat.label}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontSize: '0.8125rem',
                                        color: 'text.secondary',
                                        mb: stat.progress ? 1.5 : 0,
                                    }}
                                >
                                    {stat.description}
                                </Typography>
                                {stat.progress && (
                                    <LinearProgress
                                        variant="determinate"
                                        value={stat.progress}
                                        sx={{
                                            height: 4,
                                            borderRadius: 2,
                                            backgroundColor: 'grey.200',
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: stat.color,
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
 * Training calendar section component
 */
const CalendarSection: React.FC = () => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    const upcomingTraining = [
        {
            id: '1',
            title: 'Digital Teaching Workshop',
            date: 'April 15, 2026',
            time: '9:00 AM - 4:00 PM',
            location: 'Main Campus',
            instructor: 'Dr. Sarah Chen',
            spots: '12 spots available',
        },
        {
            id: '2',
            title: 'STEM Integration Bootcamp',
            date: 'April 22, 2026',
            time: '10:00 AM - 5:00 PM',
            location: 'Science Building',
            instructor: 'Prof. Michael Rodriguez',
            spots: '8 spots available',
        },
        {
            id: '3',
            title: 'Multilingual Education Seminar',
            date: 'May 1, 2026',
            time: '2:00 PM - 6:00 PM',
            location: 'Online',
            instructor: 'Dr. Emily Nguyen',
            spots: '25 spots available',
        },
    ];

    return (
        <Box
            ref={targetRef}
            component="section"
            id="training-calendar"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#ffffff',
            }}
        >
            <Container maxWidth="lg">
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
                        Upcoming Training Sessions
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: '1rem',
                            color: 'text.secondary',
                            maxWidth: '600px',
                            mx: 'auto',
                        }}
                    >
                        Join our scheduled training sessions and professional
                        development workshops
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {upcomingTraining.map((session, index) => (
                        <Grid size={{ xs: 12, md: 4 }} key={session.id}>
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
                                    },
                                }}
                            >
                                <CardContent sx={{ p: 2 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            mb: 1,
                                        }}
                                    >
                                        <CalendarMonth
                                            sx={{
                                                fontSize: '1rem',
                                                color: 'primary.main',
                                                mr: 1,
                                            }}
                                        />
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'primary.main',
                                                fontWeight: 500,
                                            }}
                                        >
                                            {session.date}
                                        </Typography>
                                    </Box>

                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontSize: '1.125rem',
                                            fontWeight: 600,
                                            color: 'text.primary',
                                            mb: 1,
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {session.title}
                                    </Typography>

                                    <Stack spacing={0.5} sx={{ mb: 1.5 }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                            }}
                                        >
                                            <Schedule
                                                sx={{
                                                    fontSize: '0.875rem',
                                                    color: 'text.secondary',
                                                }}
                                            />
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.75rem',
                                                    color: 'text.secondary',
                                                }}
                                            >
                                                {session.time}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                            }}
                                        >
                                            <LocationOn
                                                sx={{
                                                    fontSize: '0.875rem',
                                                    color: 'text.secondary',
                                                }}
                                            />
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.75rem',
                                                    color: 'text.secondary',
                                                }}
                                            >
                                                {session.location}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                            }}
                                        >
                                            <Person
                                                sx={{
                                                    fontSize: '0.875rem',
                                                    color: 'text.secondary',
                                                }}
                                            />
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.75rem',
                                                    color: 'text.secondary',
                                                }}
                                            >
                                                {session.instructor}
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Divider sx={{ mb: 1.5 }} />

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'text.secondary',
                                            }}
                                        >
                                            {session.spots}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            sx={{
                                                fontSize: '0.75rem',
                                                py: 0.5,
                                                px: 1.5,
                                            }}
                                        >
                                            Register
                                        </Button>
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
 * Registration and contact section component
 */
const RegistrationSection: React.FC = () => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="registration"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#f8fafc',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    {/* Registration Information */}
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
                                    color: '#6366f1',
                                }}
                            >
                                Ready to Get Started?
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
                                Join our comprehensive training programs and
                                take your professional development to the next
                                level. Our flexible scheduling and expert
                                instructors make it easy to enhance your skills
                                while maintaining your current commitments.
                            </Typography>

                            <Box sx={{ mb: 2 }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: 'text.primary',
                                        mb: 1,
                                    }}
                                >
                                    Enrollment Process:
                                </Typography>
                                <Stack spacing={0.5}>
                                    {[
                                        'Browse our course catalog and select your program',
                                        'Complete the online registration form',
                                        'Submit required documentation and payment',
                                        'Receive confirmation and course materials',
                                        'Begin your learning journey with expert support',
                                    ].map((step, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: 0.5,
                                            }}
                                        >
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.75rem',
                                                    color: 'primary.main',
                                                    fontWeight: 600,
                                                    minWidth: '20px',
                                                }}
                                            >
                                                {index + 1}.
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: '0.8125rem',
                                                    color: 'text.secondary',
                                                    lineHeight: 1.4,
                                                }}
                                            >
                                                {step}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </Box>

                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    py: 1,
                                    px: 3,
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                }}
                            >
                                Browse All Courses
                            </Button>
                        </Box>
                    </Grid>

                    {/* Contact Information */}
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
                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: '1.25rem',
                                    fontWeight: 600,
                                    mb: 1,
                                    color: 'text.primary',
                                }}
                            >
                                Get in Touch
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: '0.8125rem',
                                    color: 'text.secondary',
                                    mb: 2,
                                }}
                            >
                                Have questions about our training programs? Our
                                team is here to help you choose the right course
                                for your professional goals.
                            </Typography>

                            <Stack spacing={1.5}>
                                {[
                                    {
                                        icon: <Email />,
                                        title: 'Email Support',
                                        info: 'training@excellenceacademy.edu',
                                        description:
                                            'General inquiries and course information',
                                    },
                                    {
                                        icon: <Phone />,
                                        title: 'Phone Support',
                                        info: '+1 (555) 123-4567',
                                        description:
                                            'Monday - Friday, 8:00 AM - 6:00 PM',
                                    },
                                    {
                                        icon: <LocationOn />,
                                        title: 'Training Center',
                                        info: '123 Education Avenue, Suite 200',
                                        description:
                                            'In-person consultations by appointment',
                                    },
                                ].map((contact, index) => (
                                    <Card
                                        key={index}
                                        sx={{
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            boxShadow: 'none',
                                            borderRadius: 2,
                                            p: 1.5,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: 1,
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    width: 20,
                                                    height: 20,
                                                    backgroundColor:
                                                        'primary.main',
                                                }}
                                            >
                                                {contact.icon}
                                            </Avatar>
                                            <Box>
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        fontSize: '0.875rem',
                                                        fontWeight: 600,
                                                        color: 'text.primary',
                                                        mb: 0.25,
                                                    }}
                                                >
                                                    {contact.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontSize: '0.8125rem',
                                                        color: 'primary.main',
                                                        fontWeight: 500,
                                                        mb: 0.25,
                                                    }}
                                                >
                                                    {contact.info}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontSize: '0.75rem',
                                                        color: 'text.secondary',
                                                    }}
                                                >
                                                    {contact.description}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Card>
                                ))}
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
