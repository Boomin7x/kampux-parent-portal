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
    LinearProgress,
} from '@mui/material';
import {
    School,
    EmojiEvents,
    Groups,
    Psychology,
    Lightbulb,
    Diversity3,
    Star,
    TrendingUp,
} from '@mui/icons-material';
import { PageHeader } from '../../components/landing/shared/PageHeader';
import { ResponsiveImage } from '../../components/landing/shared/ResponsiveImage';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';

/**
 * Interface for school values
 */
interface SchoolValue {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

/**
 * Interface for leadership team members
 */
interface LeadershipMember {
    id: string;
    name: string;
    position: string;
    bio: string;
    image: string;
    qualifications: string[];
    experience: string;
}

/**
 * Interface for school achievement statistics
 */
interface Achievement {
    id: string;
    label: string;
    value: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    progress?: number;
}

/**
 * Interface for milestone events in school history
 */
interface HistoryMilestone {
    id: string;
    year: string;
    title: string;
    description: string;
    image?: string;
    achievement?: string;
}

/**
 * AboutPage component - Comprehensive school information
 *
 * Features:
 * - Hero banner with school overview
 * - Mission and vision statements
 * - Core values with visual hierarchy
 * - Leadership team profiles
 * - School history timeline
 * - Achievement statistics and metrics
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
export const AboutPage: React.FC = () => {
    // School values data
    const schoolValues: SchoolValue[] = [
        {
            id: '1',
            title: 'Academic Excellence',
            description:
                'Striving for the highest standards in education and fostering intellectual curiosity in every student.',
            icon: <School />,
            color: '#6366f1',
        },
        {
            id: '2',
            title: 'Character Development',
            description:
                'Building strong moral foundations and developing responsible, compassionate global citizens.',
            icon: <Psychology />,
            color: '#8b5cf6',
        },
        {
            id: '3',
            title: 'Innovation & Creativity',
            description:
                'Encouraging creative thinking and embracing innovative approaches to learning and problem-solving.',
            icon: <Lightbulb />,
            color: '#06b6d4',
        },
        {
            id: '4',
            title: 'Diversity & Inclusion',
            description:
                'Celebrating our diverse community and ensuring every student feels valued, respected, and supported.',
            icon: <Diversity3 />,
            color: '#10b981',
        },
    ];

    // Leadership team data
    const leadershipTeam: LeadershipMember[] = [
        {
            id: '1',
            name: 'Dr. Sarah Johnson',
            position: 'Principal & Chief Executive',
            bio: 'Leading Excellence Academy with 15+ years of educational leadership experience, Dr. Johnson brings innovative vision and unwavering commitment to student success.',
            image: '/pexels-katerina-holmes-5905554.jpg',
            qualifications: [
                'Ed.D in Educational Leadership',
                'M.Ed in Curriculum & Instruction',
                'B.A. in Elementary Education',
            ],
            experience: '15+ years in educational leadership',
        },
        {
            id: '2',
            name: 'Prof. Michael Chen',
            position: 'Academic Director',
            bio: 'Overseeing our comprehensive academic programs, Prof. Chen ensures curriculum excellence and innovative teaching methodologies across all grade levels.',
            image: '/patrick-amoy-6DfEbkqsTiA-unsplash.jpg',
            qualifications: [
                'Ph.D in Education',
                'M.A. in Mathematics',
                'B.S. in Computer Science',
            ],
            experience: '12+ years in curriculum development',
        },
        {
            id: '3',
            name: 'Dr. Emily Rodriguez',
            position: 'Student Affairs Director',
            bio: 'Dedicated to student wellbeing and development, Dr. Rodriguez leads our comprehensive student support services and extracurricular programs.',
            image: '/pexels-rdne-7845454.jpg',
            qualifications: [
                'Ph.D in Psychology',
                'M.A. in Counseling',
                'B.A. in Social Work',
            ],
            experience: '10+ years in student services',
        },
    ];

    // Achievement statistics
    const achievements: Achievement[] = [
        {
            id: '1',
            label: 'Student Success Rate',
            value: '98%',
            description: 'of graduates advance to top-tier universities',
            icon: <TrendingUp />,
            color: '#10b981',
            progress: 98,
        },
        {
            id: '2',
            label: 'Teaching Excellence',
            value: '95%',
            description: 'of faculty hold advanced degrees',
            icon: <Star />,
            color: '#f59e0b',
            progress: 95,
        },
        {
            id: '3',
            label: 'Student Engagement',
            value: '92%',
            description: 'participate in extracurricular activities',
            icon: <Groups />,
            color: '#8b5cf6',
            progress: 92,
        },
        {
            id: '4',
            label: 'Awards & Recognition',
            value: '50+',
            description: 'national and international accolades',
            icon: <EmojiEvents />,
            color: '#06b6d4',
        },
    ];

    // School history milestones
    const historyMilestones: HistoryMilestone[] = [
        {
            id: '1',
            year: '2010',
            title: 'Foundation',
            description:
                'Excellence Academy was established with a vision to provide world-class education in a nurturing environment.',
            image: '/trnava-university-_9xRHrMOjeg-unsplash.jpg',
            achievement: 'First intake of 150 students',
        },
        {
            id: '2',
            year: '2015',
            title: 'Expansion & Growth',
            description:
                'Major campus expansion including state-of-the-art science laboratories and modern sports facilities.',
            image: '/pexels-cics-uma-ipn-238541486-12238968.jpg',
            achievement: 'Student body grew to 500+',
        },
        {
            id: '3',
            year: '2020',
            title: 'Digital Innovation',
            description:
                'Pioneered comprehensive digital learning platform, ensuring seamless education during global challenges.',
            image: '/pexels-max-fischer-5212317.jpg',
            achievement: '100% digital readiness achieved',
        },
        {
            id: '4',
            year: '2024',
            title: 'Excellence Recognition',
            description:
                'Awarded "School of Excellence" status and recognized as a leading educational institution in the region.',
            image: '/pexels-rdne-7092339.jpg',
            achievement: 'Top 5% nationally ranked school',
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
                title="About Excellence Academy"
                subtitle="Discover our mission, values, and commitment to educational excellence"
                backgroundImage="/pexels-charlotte-may-5965698.jpg"
                backgroundImageSrcSet={{
                    small: '/pexels-charlotte-may-5965698.jpg',
                    medium: '/pexels-charlotte-may-5965698.jpg',
                    large: '/pexels-charlotte-may-5965698.jpg',
                }}
                textColor="light"
                showOverlay={true}
                minHeight="400px"
            />

            {/* Main Content */}
            <Box component="main">
                {/* Mission & Vision Section */}
                <MissionVisionSection />

                {/* Core Values Section */}
                <ValuesSection values={schoolValues} />

                {/* Leadership Team Section */}
                <LeadershipSection team={leadershipTeam} />

                {/* Achievement Statistics */}
                <AchievementsSection achievements={achievements} />

                {/* School History Timeline */}
                <HistorySection milestones={historyMilestones} />
            </Box>
        </Box>
    );
};

/**
 * Mission and Vision section component
 */
const MissionVisionSection: React.FC = () => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="mission-vision"
            sx={{
                py: { xs: 4, md: 6 },
                backgroundColor: '#ffffff',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={2}>
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
                                Our Mission
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
                                To provide exceptional education that nurtures
                                intellectual curiosity, character development,
                                and global citizenship. We empower students to
                                become confident, creative, and compassionate
                                leaders who will make a positive impact on the
                                world.
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: '0.8125rem',
                                    color: 'text.secondary',
                                    fontStyle: 'italic',
                                }}
                            >
                                "Excellence is not a destination, it's a journey
                                of continuous growth and learning."
                            </Typography>
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
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: '1.5rem',
                                    fontWeight: 600,
                                    mb: 1,
                                    color: '#8b5cf6',
                                }}
                            >
                                Our Vision
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
                                To be recognized as the premier educational
                                institution that inspires innovation, celebrates
                                diversity, and cultivates future leaders. We
                                envision a learning community where every
                                student thrives academically, socially, and
                                emotionally.
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: '0.8125rem',
                                    color: 'text.secondary',
                                    fontStyle: 'italic',
                                }}
                            >
                                "Shaping tomorrow's leaders through today's
                                exceptional education."
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

/**
 * Values section component
 */
interface ValuesSectionProps {
    values: SchoolValue[];
}

const ValuesSection: React.FC<ValuesSectionProps> = ({ values }) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="values"
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
                        Our Core Values
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
                        The fundamental principles that guide our educational
                        philosophy and shape our community
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {values.map((value, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={value.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    textAlign: 'center',
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
                                    <Avatar
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            backgroundColor: value.color,
                                            mx: 'auto',
                                            mb: 1.5,
                                        }}
                                    >
                                        {value.icon}
                                    </Avatar>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontSize: '1.125rem',
                                            fontWeight: 600,
                                            mb: 1,
                                            color: 'text.primary',
                                        }}
                                    >
                                        {value.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: '0.8125rem',
                                            color: 'text.secondary',
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        {value.description}
                                    </Typography>
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
 * Leadership section component
 */
interface LeadershipSectionProps {
    team: LeadershipMember[];
}

const LeadershipSection: React.FC<LeadershipSectionProps> = ({ team }) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="leadership"
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
                        Leadership Team
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
                        Meet the dedicated professionals leading our educational
                        mission
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {team.map((member, index) => (
                        <Grid size={{ xs: 12, md: 4 }} key={member.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    // border: '1px solid',
                                    border: '0px',
                                    borderColor: 'divider',
                                    boxShadow: 'none',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    p: 0,
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
                                    src={member.image}
                                    alt={member.name}
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
                                        {member.name}
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
                                        {member.position}
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
                                        {member.bio}
                                    </Typography>
                                    <Box sx={{ mb: 1 }}>
                                        {member.qualifications.map(
                                            (qual, qualIndex) => (
                                                <Chip
                                                    key={qualIndex}
                                                    label={qual}
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        mr: 0.5,
                                                        mb: 0.5,
                                                        fontSize: '0.75rem',
                                                        height: '18px',
                                                    }}
                                                />
                                            )
                                        )}
                                    </Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontSize: '0.75rem',
                                            color: 'text.secondary',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {member.experience}
                                    </Typography>
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
 * Achievements section component
 */
interface AchievementsSectionProps {
    achievements: Achievement[];
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({
    achievements,
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="achievements"
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
                        Our Achievements
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
                        Measurable excellence across all aspects of our
                        educational mission
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {achievements.map((achievement, index) => (
                        <Grid
                            size={{ xs: 12, sm: 6, md: 3 }}
                            key={achievement.id}
                        >
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
                                        backgroundColor: achievement.color,
                                        mx: 'auto',
                                        mb: 1.5,
                                    }}
                                >
                                    {achievement.icon}
                                </Avatar>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: '1.125rem',
                                        fontWeight: 700,
                                        color: achievement.color,
                                        mb: 0.5,
                                    }}
                                >
                                    {achievement.value}
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
                                    {achievement.label}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontSize: '0.8125rem',
                                        color: 'text.secondary',
                                        mb: achievement.progress ? 1.5 : 0,
                                    }}
                                >
                                    {achievement.description}
                                </Typography>
                                {achievement.progress && (
                                    <LinearProgress
                                        variant="determinate"
                                        value={achievement.progress}
                                        sx={{
                                            height: 4,
                                            borderRadius: 2,
                                            backgroundColor: 'grey.200',
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor:
                                                    achievement.color,
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
 * History section component
 */
interface HistorySectionProps {
    milestones: HistoryMilestone[];
}

const HistorySection: React.FC<HistorySectionProps> = ({ milestones }) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="history"
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
                        Our Journey
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
                        Key milestones in our commitment to educational
                        excellence
                    </Typography>
                </Box>

                <Box sx={{ position: 'relative' }}>
                    {/* Timeline line */}
                    <Box
                        sx={{
                            position: 'absolute',
                            left: { xs: '24px', md: '50%' },
                            top: 0,
                            bottom: 0,
                            width: '2px',
                            backgroundColor: 'primary.main',
                            transform: { md: 'translateX(-50%)' },
                        }}
                    />

                    {milestones.map((milestone, index) => (
                        <Box
                            key={milestone.id}
                            sx={{
                                position: 'relative',
                                mb: 4,
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateY(0)'
                                    : 'translateY(30px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                transitionDelay: `${index * 0.2}s`,
                            }}
                        >
                            <Grid container spacing={4} alignItems="center">
                                {/* Timeline year marker */}
                                <Grid size={{ xs: 12, md: 5 }}>
                                    <Box
                                        sx={{
                                            textAlign: {
                                                xs: 'left',
                                                md:
                                                    index % 2 === 0
                                                        ? 'right'
                                                        : 'left',
                                            },
                                            pl: { xs: 6, md: 0 },
                                        }}
                                    >
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontWeight: 700,
                                                color: 'primary.main',
                                                mb: 1,
                                            }}
                                        >
                                            {milestone.year}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 1,
                                            }}
                                        >
                                            {milestone.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'text.secondary',
                                                lineHeight: 1.6,
                                                mb: 1,
                                            }}
                                        >
                                            {milestone.description}
                                        </Typography>
                                        {milestone.achievement && (
                                            <Chip
                                                label={milestone.achievement}
                                                variant="filled"
                                                size="small"
                                                sx={{
                                                    backgroundColor:
                                                        'primary.100',
                                                    color: 'primary.main',
                                                }}
                                            />
                                        )}
                                    </Box>
                                </Grid>

                                {/* Timeline center marker */}
                                <Grid size={{ xs: 0, md: 2 }}>
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            display: { xs: 'none', md: 'flex' },
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: '50%',
                                                backgroundColor: 'primary.main',
                                                border: '3px solid white',
                                                boxShadow:
                                                    '0 0 0 3px rgba(99, 102, 241, 0.2)',
                                            }}
                                        />
                                    </Box>
                                </Grid>

                                {/* Timeline image */}
                                <Grid size={{ xs: 12, md: 5 }}>
                                    <Box
                                        sx={{
                                            order: {
                                                md: index % 2 === 0 ? -1 : 1,
                                            },
                                            pl: { xs: 6, md: 0 },
                                        }}
                                    >
                                        {milestone.image && (
                                            <ResponsiveImage
                                                src={milestone.image}
                                                alt={`${milestone.title} - ${milestone.year}`}
                                                aspectRatio={16 / 9}
                                                borderRadius={2}
                                                objectFit="cover"
                                            />
                                        )}
                                    </Box>
                                </Grid>
                            </Grid>

                            {/* Mobile timeline marker */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    left: '18px',
                                    top: '8px',
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    backgroundColor: 'primary.main',
                                    border: '3px solid white',
                                    boxShadow:
                                        '0 0 0 3px rgba(99, 102, 241, 0.2)',
                                    display: { xs: 'block', md: 'none' },
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};
