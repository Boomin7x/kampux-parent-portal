import React, { useState, useMemo } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Avatar,
    Chip,
    Tabs,
    Tab,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
    SportsBasketball,
    Brush,
    MenuBook,
    VolunteerActivism,
    EmojiEvents,
    Groups,
    Schedule,
    LocationOn,
    Person,
    Star,
    CalendarToday,
    AccessTime,
    CheckCircle,
    Favorite,
    School,
    MusicNote,
    SportsVolleyball,
    Science,
} from '@mui/icons-material';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';
import { PageHeader } from '../../components/landing/shared/PageHeader';
import { ResponsiveImage } from '../../components/landing/shared/ResponsiveImage';

/**
 * Interface for activity categories
 */
interface ActivityCategory {
    id: string;
    name: string;
    icon: React.ReactNode;
    color: string;
    count: number;
    description: string;
}

/**
 * Interface for student activities
 */
interface StudentActivity {
    id: string;
    name: string;
    category: string;
    description: string;
    image?: string;
    meetingSchedule: string;
    memberCount: number;
    highlights: string[];
    achievements?: string[];
}

/**
 * Interface for student testimonials
 */
interface StudentTestimonial {
    id: string;
    name: string;
    grade: string;
    quote: string;
    activity: string;
    image?: string;
}

/**
 * Interface for campus events
 */
interface CampusEvent {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    category: string;
    description?: string;
}

/**
 * Interface for student life statistics
 */
interface StudentLifeStatistic {
    id: string;
    label: string;
    value: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

export const StudentLifePage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState(0);

    // Student Life Statistics
    const studentLifeStats: StudentLifeStatistic[] = [
        {
            id: '1',
            label: 'Clubs & Organizations',
            value: '50+',
            description: 'diverse interest groups',
            icon: <Groups />,
            color: '#6366f1',
        },
        {
            id: '2',
            label: 'Varsity Sports',
            value: '12',
            description: 'competitive athletic teams',
            icon: <SportsBasketball />,
            color: '#10b981',
        },
        {
            id: '3',
            label: 'Arts Programs',
            value: '8',
            description: 'creative expression opportunities',
            icon: <Brush />,
            color: '#f59e0b',
        },
        {
            id: '4',
            label: 'Service Hours/Year',
            value: '5000+',
            description: 'community impact hours',
            icon: <VolunteerActivism />,
            color: '#ef4444',
        },
    ];

    // Activity Categories
    const activityCategories: ActivityCategory[] = [
        {
            id: '1',
            name: 'Sports & Athletics',
            icon: <SportsBasketball />,
            color: '#10b981',
            count: 15,
            description: 'Competitive sports teams and recreational athletics programs',
        },
        {
            id: '2',
            name: 'Arts & Culture',
            icon: <Brush />,
            color: '#f59e0b',
            count: 12,
            description: 'Creative expression through visual arts, music, and theater',
        },
        {
            id: '3',
            name: 'Academic Clubs',
            icon: <MenuBook />,
            color: '#6366f1',
            count: 18,
            description: 'Subject-focused groups and competitive academic teams',
        },
        {
            id: '4',
            name: 'Community Service',
            icon: <VolunteerActivism />,
            color: '#ef4444',
            count: 8,
            description: 'Volunteer opportunities and social impact initiatives',
        },
    ];

    // Student Activities Data
    const studentActivities: StudentActivity[] = [
        // Sports & Athletics
        {
            id: '1',
            name: 'Varsity Basketball',
            category: 'Sports & Athletics',
            description: 'Competitive varsity and JV teams with professional coaching and multiple league championships.',
            image: '/pexels-max-fischer-5212317.jpg',
            meetingSchedule: 'Mon-Fri, 3:30-5:30 PM',
            memberCount: 28,
            highlights: ['League Champions 2023', 'State Tournament Qualifiers', 'Division Leaders'],
            achievements: ['Regional Champions', 'Sportsmanship Award'],
        },
        {
            id: '2',
            name: 'Soccer Club',
            category: 'Sports & Athletics',
            description: 'Both competitive and recreational soccer programs welcoming all skill levels.',
            image: '/pexels-cottonbro-6208926.jpg',
            meetingSchedule: 'Mon, Wed, Fri 3:30-5:00 PM',
            memberCount: 32,
            highlights: ['All-skill levels welcome', 'Inter-school tournaments', 'Fitness focused'],
        },
        {
            id: '3',
            name: 'Track & Field',
            category: 'Sports & Athletics',
            description: 'Distance running, sprints, and field events with individual and team competitions.',
            meetingSchedule: 'Daily 3:30-5:30 PM',
            memberCount: 25,
            highlights: ['Individual excellence', 'Team spirit', 'State qualifiers'],
        },
        // Arts & Culture
        {
            id: '4',
            name: 'Drama Club',
            category: 'Arts & Culture',
            description: 'Annual theatrical productions, improv workshops, and performance opportunities throughout the year.',
            image: '/pexels-cottonbro-6208928.jpg',
            meetingSchedule: 'Tue & Thu, 3:00-5:00 PM',
            memberCount: 35,
            highlights: ['Spring Musical', 'Fall Drama', 'Improv Nights'],
            achievements: ['Regional Theater Excellence', 'Best Student Production 2023'],
        },
        {
            id: '5',
            name: 'Art Studio',
            category: 'Arts & Culture',
            description: 'Explore various art mediums including painting, sculpture, and digital art.',
            image: '/pexels-cottonbro-7395304.jpg',
            meetingSchedule: 'Open Studio: Daily 3:00-6:00 PM',
            memberCount: 30,
            highlights: ['Multiple mediums', 'Student exhibitions', 'Portfolio development'],
        },
        {
            id: '6',
            name: 'Orchestra & Band',
            category: 'Arts & Culture',
            description: 'Concert performances, competitions, and music education for all experience levels.',
            meetingSchedule: 'Daily 7:30-8:30 AM & 3:00-4:30 PM',
            memberCount: 42,
            highlights: ['Concert performances', 'Music competitions', 'Solo opportunities'],
        },
        // Academic Clubs
        {
            id: '7',
            name: 'Debate Team',
            category: 'Academic Clubs',
            description: 'Compete in regional and national tournaments while developing critical thinking and public speaking skills.',
            meetingSchedule: 'Wed & Fri, 3:30-5:00 PM',
            memberCount: 22,
            highlights: ['Tournament competitions', 'Public speaking', 'Critical thinking'],
            achievements: ['State Debate Champions', 'National Qualifiers'],
        },
        {
            id: '8',
            name: 'Robotics Team',
            category: 'Academic Clubs',
            description: 'Design, build, and program robots for FIRST Robotics competitions.',
            meetingSchedule: 'Daily, 3:30-6:00 PM',
            memberCount: 18,
            highlights: ['FIRST Robotics', 'Engineering design', 'Programming'],
            achievements: ['State Champions 2023', 'Innovation Award'],
        },
        {
            id: '9',
            name: 'Science Olympiad',
            category: 'Academic Clubs',
            description: 'Competitive science team participating in regional and state tournaments.',
            meetingSchedule: 'Tue & Thu, 3:30-5:00 PM',
            memberCount: 24,
            highlights: ['Science competitions', 'Team collaboration', 'STEM excellence'],
        },
        // Community Service
        {
            id: '10',
            name: 'Community Service Club',
            category: 'Community Service',
            description: 'Organize volunteer projects and service initiatives benefiting local and global communities.',
            meetingSchedule: 'Thursdays, 3:00-4:30 PM',
            memberCount: 45,
            highlights: ['Local partnerships', 'Global awareness', 'Leadership development'],
        },
        {
            id: '11',
            name: 'Environmental Club',
            category: 'Community Service',
            description: 'Campus sustainability initiatives, environmental awareness campaigns, and outdoor conservation projects.',
            meetingSchedule: 'Tuesdays, 3:30-4:30 PM',
            memberCount: 27,
            highlights: ['Sustainability projects', 'Environmental awareness', 'Conservation efforts'],
        },
        {
            id: '12',
            name: 'Peer Tutoring',
            category: 'Community Service',
            description: 'Students helping students achieve academic success through peer-to-peer learning.',
            meetingSchedule: 'Flexible scheduling',
            memberCount: 38,
            highlights: ['Academic support', 'Leadership skills', 'Mentorship'],
        },
    ];

    // Student Testimonials
    const studentTestimonials: StudentTestimonial[] = [
        {
            id: '1',
            name: 'Sarah Chen',
            grade: '11th Grade',
            quote: 'Being part of the Drama Club has helped me build confidence and discover my passion for storytelling. The supportive community here is amazing!',
            activity: 'Drama Club President',
            image: '/pexels-mary-taylor-5896578.jpg',
        },
        {
            id: '2',
            name: 'Marcus Johnson',
            grade: '12th Grade',
            quote: 'The Robotics Team taught me problem-solving skills that go far beyond engineering. We\'re not just building robots - we\'re building our futures.',
            activity: 'Robotics Team Captain',
        },
        {
            id: '3',
            name: 'Emily Rodriguez',
            grade: '10th Grade',
            quote: 'Through community service, I\'ve learned that small actions can make a big difference. Our environmental projects have real impact.',
            activity: 'Environmental Club VP',
        },
    ];

    // Campus Events
    const upcomingEvents: CampusEvent[] = [
        {
            id: '1',
            title: 'Spring Musical Performance',
            date: '2024-03-15',
            time: '7:00 PM',
            location: 'Main Auditorium',
            category: 'Arts',
            description: 'Annual spring musical featuring our talented drama club students',
        },
        {
            id: '2',
            title: 'Science Fair',
            date: '2024-03-20',
            time: '9:00 AM - 3:00 PM',
            location: 'Gymnasium',
            category: 'Academic',
            description: 'Student research projects and scientific innovations on display',
        },
        {
            id: '3',
            title: 'Basketball Championship Game',
            date: '2024-03-28',
            time: '6:00 PM',
            location: 'Home Court',
            category: 'Sports',
            description: 'Varsity basketball team competing for the regional championship',
        },
        {
            id: '4',
            title: 'Art Exhibition Opening',
            date: '2024-04-02',
            time: '5:30 PM',
            location: 'Art Gallery',
            category: 'Arts',
            description: 'Showcase of student artwork from all grade levels',
        },
        {
            id: '5',
            title: 'Spring Concert',
            date: '2024-04-10',
            time: '7:00 PM',
            location: 'Main Auditorium',
            category: 'Arts',
            description: 'Orchestra and band performances celebrating musical excellence',
        },
        {
            id: '6',
            title: 'Community Service Day',
            date: '2024-04-15',
            time: '9:00 AM - 3:00 PM',
            location: 'Various Locations',
            category: 'Service',
            description: 'School-wide volunteer projects in the local community',
        },
    ];

    // Filter activities by selected category
    const filteredActivities = useMemo(() => {
        if (selectedCategory === 0) return studentActivities;
        const categoryName = activityCategories[selectedCategory - 1]?.name;
        return studentActivities.filter(activity => activity.category === categoryName);
    }, [selectedCategory]);

    const handleCategoryChange = (_: React.SyntheticEvent, newValue: number) => {
        setSelectedCategory(newValue);
    };

    return (
        <Box sx={{ backgroundColor: '#fefefe', minHeight: '100vh' }}>
            {/* Page Header with Hero Banner */}
            <PageHeader
                title="Experience Campus Life"
                subtitle="A vibrant community where students discover passions, build friendships, and create lasting memories through diverse activities and meaningful experiences"
                backgroundImage="/pexels-mary-taylor-5896578.jpg"
                backgroundImageSrcSet={{
                    small: '/pexels-mary-taylor-5896578.jpg',
                    medium: '/pexels-mary-taylor-5896578.jpg',
                    large: '/pexels-mary-taylor-5896578.jpg',
                }}
                textColor="light"
                showOverlay={true}
                minHeight="400px"
            />

            {/* Main Content */}
            <Box component="main">
                {/* Student Life Statistics */}
                <StudentLifeStatsSection statistics={studentLifeStats} />

                {/* Activity Categories with Tabs */}
                <ActivityCategoriesSection
                    categories={activityCategories}
                    activities={filteredActivities}
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                />

                {/* Student Testimonials */}
                <StudentTestimonialsSection testimonials={studentTestimonials} />

                {/* Events Calendar */}
                <EventsCalendarSection events={upcomingEvents} />

                {/* Daily Schedule */}
                <DailyScheduleSection />
            </Box>
        </Box>
    );
};

/**
 * Student Life Statistics section component
 */
interface StudentLifeStatsSectionProps {
    statistics: StudentLifeStatistic[];
}

const StudentLifeStatsSection: React.FC<StudentLifeStatsSectionProps> = ({ statistics }) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="student-life-stats"
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
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Student Life at a Glance
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
                        Discover the vibrant opportunities that make our school community special
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {statistics.map((stat, index) => (
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
                                    }}
                                >
                                    {stat.description}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

/**
 * Activity Categories section component
 */
interface ActivityCategoriesSectionProps {
    categories: ActivityCategory[];
    activities: StudentActivity[];
    selectedCategory: number;
    onCategoryChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const ActivityCategoriesSection: React.FC<ActivityCategoriesSectionProps> = ({
    categories,
    activities,
    selectedCategory,
    onCategoryChange,
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="activities"
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
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Activities & Programs
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
                        Explore our diverse range of extracurricular activities and find your passion
                    </Typography>
                </Box>

                {/* Category Tabs */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs
                        value={selectedCategory}
                        onChange={onCategoryChange}
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
                        <Tab label="All Activities" />
                        {categories.map((category) => (
                            <Tab key={category.id} label={category.name} />
                        ))}
                    </Tabs>
                </Box>

                {/* Activity Grid */}
                <Grid container spacing={2}>
                    {activities.map((activity, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={activity.id}>
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
                                    transitionDelay: `${index * 0.1}s`,
                                    '&:hover': {
                                        boxShadow: '0 8px 25px rgba(99, 102, 241, 0.15)',
                                        transform: 'translateY(-2px)',
                                    },
                                }}
                            >
                                {activity.image && (
                                    <ResponsiveImage
                                        src={activity.image}
                                        alt={activity.name}
                                        aspectRatio={16 / 9}
                                        borderRadius={0}
                                        objectFit="cover"
                                    />
                                )}
                                <CardContent sx={{ p: 2 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            mb: 1,
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontSize: '1rem',
                                                fontWeight: 600,
                                                color: 'text.primary',
                                            }}
                                        >
                                            {activity.name}
                                        </Typography>
                                        <Chip
                                            label={activity.category}
                                            size="small"
                                            variant="outlined"
                                            sx={{
                                                fontSize: '0.75rem',
                                                height: '20px',
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
                                        {activity.description}
                                    </Typography>
                                    <Box sx={{ mb: 1.5 }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                                mb: 0.5,
                                            }}
                                        >
                                            <Schedule sx={{ fontSize: 14, color: 'text.secondary' }} />
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.75rem',
                                                    color: 'text.secondary',
                                                }}
                                            >
                                                {activity.meetingSchedule}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                            }}
                                        >
                                            <Person sx={{ fontSize: 14, color: 'text.secondary' }} />
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.75rem',
                                                    color: 'text.secondary',
                                                }}
                                            >
                                                {activity.memberCount} members
                                            </Typography>
                                        </Box>
                                    </Box>
                                    {activity.highlights && activity.highlights.length > 0 && (
                                        <Box>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: 'text.secondary',
                                                    fontWeight: 500,
                                                    mb: 0.5,
                                                    display: 'block',
                                                }}
                                            >
                                                Highlights:
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: 0.5,
                                                }}
                                            >
                                                {activity.highlights.slice(0, 3).map((highlight, hIndex) => (
                                                    <Chip
                                                        key={hIndex}
                                                        label={highlight}
                                                        variant="filled"
                                                        size="small"
                                                        sx={{
                                                            fontSize: '0.75rem',
                                                            height: '18px',
                                                            backgroundColor: 'primary.50',
                                                            color: 'primary.main',
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        </Box>
                                    )}
                                    <Box sx={{ mt: 1.5, textAlign: 'center' }}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                fontSize: '0.75rem',
                                                textTransform: 'none',
                                                borderRadius: 1,
                                                px: 2,
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
 * Student Testimonials section component
 */
interface StudentTestimonialsSectionProps {
    testimonials: StudentTestimonial[];
}

const StudentTestimonialsSection: React.FC<StudentTestimonialsSectionProps> = ({ testimonials }) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="testimonials"
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
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Student Voices
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
                        Hear from our students about their experiences and growth
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {testimonials.map((testimonial, index) => (
                        <Grid size={{ xs: 12, md: 4 }} key={testimonial.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    boxShadow: 'none',
                                    borderRadius: 2,
                                    p: 2,
                                    opacity: isIntersecting ? 1 : 0,
                                    transform: isIntersecting
                                        ? 'translateY(0)'
                                        : 'translateY(30px)',
                                    transition:
                                        'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: `${index * 0.2}s`,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 2,
                                    }}
                                >
                                    {testimonial.image ? (
                                        <Avatar
                                            sx={{
                                                width: 20,
                                                height: 20,
                                                mr: 1,
                                            }}
                                        >
                                            <ResponsiveImage
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                aspectRatio={1}
                                                borderRadius={0}
                                                objectFit="cover"
                                            />
                                        </Avatar>
                                    ) : (
                                        <Avatar
                                            sx={{
                                                width: 20,
                                                height: 20,
                                                mr: 1,
                                                backgroundColor: 'primary.main',
                                            }}
                                        >
                                            {testimonial.name.charAt(0)}
                                        </Avatar>
                                    )}
                                    <Box>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontSize: '0.875rem',
                                                fontWeight: 600,
                                                color: 'text.primary',
                                            }}
                                        >
                                            {testimonial.name}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'text.secondary',
                                            }}
                                        >
                                            {testimonial.grade} • {testimonial.activity}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ position: 'relative' }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: '0.8125rem',
                                            color: 'text.secondary',
                                            lineHeight: 1.5,
                                            fontStyle: 'italic',
                                            pl: 2,
                                            borderLeft: '3px solid',
                                            borderColor: 'primary.main',
                                        }}
                                    >
                                        "{testimonial.quote}"
                                    </Typography>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

/**
 * Events Calendar section component
 */
interface EventsCalendarSectionProps {
    events: CampusEvent[];
}

const EventsCalendarSection: React.FC<EventsCalendarSectionProps> = ({ events }) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="events"
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
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Upcoming Events
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
                        Don't miss out on these exciting upcoming events and activities
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {events.map((event, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={event.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    boxShadow: 'none',
                                    borderRadius: 2,
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
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        mb: 1,
                                    }}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            color: 'text.primary',
                                        }}
                                    >
                                        {event.title}
                                    </Typography>
                                    <Chip
                                        label={event.category}
                                        size="small"
                                        variant="filled"
                                        sx={{
                                            fontSize: '0.75rem',
                                            height: '18px',
                                            backgroundColor: 'primary.50',
                                            color: 'primary.main',
                                        }}
                                    />
                                </Box>
                                <Box sx={{ mb: 1 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            mb: 0.5,
                                        }}
                                    >
                                        <CalendarToday sx={{ fontSize: 14, color: 'text.secondary' }} />
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'text.secondary',
                                            }}
                                        >
                                            {new Date(event.date).toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            mb: 0.5,
                                        }}
                                    >
                                        <AccessTime sx={{ fontSize: 14, color: 'text.secondary' }} />
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'text.secondary',
                                            }}
                                        >
                                            {event.time}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                        }}
                                    >
                                        <LocationOn sx={{ fontSize: 14, color: 'text.secondary' }} />
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'text.secondary',
                                            }}
                                        >
                                            {event.location}
                                        </Typography>
                                    </Box>
                                </Box>
                                {event.description && (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: '0.8125rem',
                                            color: 'text.secondary',
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        {event.description}
                                    </Typography>
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
 * Daily Schedule section component
 */
const DailyScheduleSection: React.FC = () => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    const scheduleItems = [
        {
            time: '7:45 - 8:00 AM',
            activity: 'Morning Assembly',
            description: 'Daily announcements and school community gathering',
        },
        {
            time: '8:00 - 11:30 AM',
            activity: 'Morning Classes',
            description: 'Core academic subjects and specialized courses',
        },
        {
            time: '11:30 AM - 12:15 PM',
            activity: 'Lunch Break',
            description: 'Cafeteria dining and social time with peers',
        },
        {
            time: '12:15 - 3:00 PM',
            activity: 'Afternoon Classes',
            description: 'Continued learning and hands-on activities',
        },
        {
            time: '3:00 - 6:00 PM',
            activity: 'Extracurricular Activities',
            description: 'Clubs, sports, arts, and enrichment programs',
        },
    ];

    return (
        <Box
            ref={targetRef}
            component="section"
            id="schedule"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#ffffff',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Box
                            sx={{
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting ? 'translateX(0)' : 'translateX(-30px)',
                                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                        >
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: '1.5rem',
                                    fontWeight: 600,
                                    mb: 1,
                                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Daily Schedule
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontSize: '1rem',
                                    color: 'text.secondary',
                                    mb: 3,
                                }}
                            >
                                A structured day that balances academics with personal growth
                            </Typography>
                            <Paper
                                sx={{
                                    p: 2,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    boxShadow: 'none',
                                    borderRadius: 2,
                                }}
                            >
                                <List sx={{ py: 0 }}>
                                    {scheduleItems.map((item, index) => (
                                        <ListItem
                                            key={index}
                                            sx={{
                                                py: 1.5,
                                                px: 0,
                                                borderBottom:
                                                    index < scheduleItems.length - 1
                                                        ? '1px solid'
                                                        : 'none',
                                                borderColor: 'divider',
                                            }}
                                        >
                                            <ListItemIcon sx={{ minWidth: 40 }}>
                                                <Avatar
                                                    sx={{
                                                        width: 20,
                                                        height: 20,
                                                        backgroundColor: 'primary.main',
                                                    }}
                                                >
                                                    <CheckCircle sx={{ fontSize: 14 }} />
                                                </Avatar>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 2,
                                                            mb: 0.5,
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                fontSize: '0.75rem',
                                                                fontWeight: 600,
                                                                color: 'primary.main',
                                                                minWidth: '120px',
                                                            }}
                                                        >
                                                            {item.time}
                                                        </Typography>
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{
                                                                fontSize: '0.875rem',
                                                                fontWeight: 600,
                                                                color: 'text.primary',
                                                            }}
                                                        >
                                                            {item.activity}
                                                        </Typography>
                                                    </Box>
                                                }
                                                secondary={
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontSize: '0.8125rem',
                                                            color: 'text.secondary',
                                                            lineHeight: 1.4,
                                                        }}
                                                    >
                                                        {item.description}
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box
                            sx={{
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting ? 'translateX(0)' : 'translateX(30px)',
                                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
                            }}
                        >
                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: '1.25rem',
                                    fontWeight: 600,
                                    mb: 2,
                                    color: 'text.primary',
                                }}
                            >
                                Join the Fun!
                            </Typography>
                            <Paper
                                sx={{
                                    p: 2,
                                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    color: 'white',
                                    borderRadius: 2,
                                    textAlign: 'center',
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '0.875rem',
                                        mb: 2,
                                        opacity: 0.9,
                                    }}
                                >
                                    Ready to explore your interests and make new friends?
                                    Browse our activities and find your perfect fit!
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: 'white',
                                        color: 'primary.main',
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        '&:hover': {
                                            backgroundColor: '#f8fafc',
                                        },
                                    }}
                                >
                                    Explore Activities
                                </Button>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};