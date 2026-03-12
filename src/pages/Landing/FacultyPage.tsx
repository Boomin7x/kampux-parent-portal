import {
    Calculate,
    Email,
    Groups,
    Language,
    MenuBook,
    Palette,
    Person,
    School,
    Science,
    Search,
    TrendingUp,
    WorkspacePremium,
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    FormControl,
    InputAdornment,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useMemo, useState } from 'react';
import { PageHeader } from '../../components/landing/shared/PageHeader';
import { ResponsiveImage } from '../../components/landing/shared/ResponsiveImage';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';

/**
 * Interface for faculty members
 */
interface FacultyMember {
    id: string;
    name: string;
    title: string;
    department: string;
    bio: string;
    qualifications: string[];
    yearsOfExperience: number;
    email: string;
    image?: string;
    specialties?: string[];
    achievements?: string[];
}

/**
 * Interface for faculty statistics
 */
interface FacultyStatistic {
    id: string;
    label: string;
    value: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    progress?: number;
}

/**
 * Interface for department statistics
 */
interface DepartmentStats {
    id: string;
    name: string;
    facultyCount: number;
    icon: React.ReactNode;
    color: string;
    description: string;
}

export const FacultyPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    // const [selectedTab, setSelectedTab] = useState(0);

    const facultyStatistics: FacultyStatistic[] = [
        {
            id: '1',
            label: 'Total Faculty',
            value: '24',
            description: 'dedicated educators',
            icon: <Groups />,
            color: '#6366f1',
        },
        {
            id: '2',
            label: 'Departments',
            value: '8',
            description: 'academic divisions',
            icon: <School />,
            color: '#10b981',
        },
        {
            id: '3',
            label: 'Advanced Degrees',
            value: '85%',
            description: `hold Master's or PhD`,
            icon: <WorkspacePremium />,
            color: '#8b5cf6',
            progress: 85,
        },
        {
            id: '4',
            label: 'Average Experience',
            value: '12',
            description: 'years in education',
            icon: <TrendingUp />,
            color: '#f59e0b',
        },
    ];

    // Faculty members data
    const allFaculty: FacultyMember[] = [
        {
            id: '1',
            name: 'Dr. Amanda Chen',
            title: 'Lead Mathematics Teacher',
            department: 'Mathematics',
            bio: 'Dr. Chen specializes in advanced mathematics and has developed innovative teaching methods.',
            qualifications: [
                'Ph.D. in Mathematics',
                'M.Ed. in Curriculum Design',
            ],
            yearsOfExperience: 15,
            email: 'achen@school.edu',
            image: '/pexels-katerina-holmes-5905554.jpg',
            specialties: ['Calculus', 'Statistics', 'AP Mathematics'],
            achievements: [
                'Teacher of the Year 2023',
                'Mathematics Innovation Award',
            ],
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
            image: '/patrick-amoy-6DfEbkqsTiA-unsplash.jpg',
            specialties: ['Biology', 'Chemistry', 'Environmental Science'],
            achievements: [
                'Science Fair Championship Coach',
                'Research Excellence Award',
            ],
        },
        {
            id: '3',
            name: 'Elena Rodriguez',
            title: 'World Languages Coordinator',
            department: 'Languages',
            bio: 'Fluent in five languages, Elena has transformed our language program into one of the most comprehensive in the region.',
            qualifications: [
                'M.A. in Linguistics',
                'B.A. in Spanish Literature',
            ],
            yearsOfExperience: 10,
            email: 'erodriguez@school.edu',
            image: '/pexels-katerina-holmes-5905899.jpg',
            specialties: ['Spanish', 'French', 'ESL'],
            achievements: [
                'Language Program Excellence',
                'Cultural Exchange Leader',
            ],
        },
        {
            id: '4',
            name: 'David Park',
            title: 'Visual Arts Director',
            department: 'Arts',
            bio: 'An accomplished artist whose work has been featured in regional galleries. Mentors students in various mediums.',
            qualifications: ['M.F.A. in Fine Arts', 'B.F.A. in Painting'],
            yearsOfExperience: 8,
            email: 'dpark@school.edu',
            specialties: ['Painting', 'Digital Art', 'Sculpture'],
            achievements: [
                'Regional Artist Award',
                'Student Exhibition Curator',
            ],
        },
        {
            id: '5',
            name: 'Sarah Mitchell',
            title: 'English Department Chair',
            department: 'English',
            bio: 'Sarah has published several educational articles and leads professional development workshops on literacy instruction.',
            qualifications: ['M.A. in English Literature', 'B.A. in Education'],
            yearsOfExperience: 14,
            email: 'smitchell@school.edu',
            specialties: ['Literature', 'Creative Writing', 'AP English'],
            achievements: [
                'Published Educational Researcher',
                'Literacy Excellence Award',
            ],
        },
        {
            id: '6',
            name: 'Dr. James Thompson',
            title: 'Physics & Engineering',
            department: 'Science',
            bio: 'Dr. Thompson previously worked at NASA and now inspires the next generation of scientists and engineers.',
            qualifications: [
                'Ph.D. in Physics',
                'M.S. in Aerospace Engineering',
            ],
            yearsOfExperience: 18,
            email: 'jthompson@school.edu',
            specialties: ['Physics', 'Engineering', 'Robotics'],
            achievements: ['NASA Research Veteran', 'STEM Excellence Award'],
        },
        {
            id: '7',
            name: 'Ms. Jennifer Walsh',
            title: 'Physical Education Director',
            department: 'Physical Education',
            bio: 'Former Olympic athlete turned educator, inspiring students to achieve their athletic and personal best.',
            qualifications: ['M.S. in Sports Science', 'B.S. in Kinesiology'],
            yearsOfExperience: 11,
            email: 'jwalsh@school.edu',
            specialties: ['Athletics', 'Sports Medicine', 'Fitness'],
            achievements: ['Olympic Competitor', 'Athletic Excellence Coach'],
        },
        {
            id: '8',
            name: 'Dr. Robert Kim',
            title: 'Music Department Head',
            department: 'Arts',
            bio: 'Professional musician and composer who has performed with major orchestras worldwide.',
            qualifications: [
                'D.M.A. in Music Composition',
                'M.M. in Performance',
            ],
            yearsOfExperience: 16,
            email: 'rkim@school.edu',
            specialties: ['Orchestra', 'Composition', 'Music Theory'],
            achievements: [
                'Symphony Orchestra Performer',
                'Composition Award Winner',
            ],
        },
    ];

    // Department statistics data
    const departmentStats: DepartmentStats[] = [
        {
            id: '1',
            name: 'Mathematics',
            facultyCount: 3,
            icon: <Calculate />,
            color: '#6366f1',
            description: 'Advanced mathematics and computational thinking',
        },
        {
            id: '2',
            name: 'Science',
            facultyCount: 4,
            icon: <Science />,
            color: '#10b981',
            description: 'Laboratory sciences and research methodologies',
        },
        {
            id: '3',
            name: 'Languages',
            facultyCount: 3,
            icon: <Language />,
            color: '#8b5cf6',
            description: 'World languages and communication skills',
        },
        {
            id: '4',
            name: 'Arts',
            facultyCount: 3,
            icon: <Palette />,
            color: '#f59e0b',
            description: 'Creative expression and artistic development',
        },
        {
            id: '5',
            name: 'English',
            facultyCount: 2,
            icon: <MenuBook />,
            color: '#06b6d4',
            description: 'Literature, writing, and critical analysis',
        },
        {
            id: '6',
            name: 'Physical Education',
            facultyCount: 2,
            icon: <Person />,
            color: '#ef4444',
            description: 'Athletics, wellness, and physical development',
        },
    ];

    // Filtered faculty based on search and department
    const filteredFaculty = useMemo(() => {
        return allFaculty.filter(member => {
            const matchesSearch =
                member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.department
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            const matchesDepartment =
                selectedDepartment === 'All' ||
                member.department === selectedDepartment;
            return matchesSearch && matchesDepartment;
        });
    }, [searchTerm, selectedDepartment]);

    const departments = [
        'All',
        'Mathematics',
        'Science',
        'Languages',
        'Arts',
        'English',
        'Physical Education',
    ];

    // const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    //     setSelectedTab(newValue);
    // };

    return (
        <Box sx={{ backgroundColor: '#fefefe', minHeight: '100vh' }}>
            {/* Page Header with Hero Banner */}
            <PageHeader
                title="Meet Our Educators"
                subtitle="Dedicated professionals committed to inspiring and empowering every student to reach their full potential"
                backgroundImage="/pexels-kampus-8629106.jpg"
                backgroundImageSrcSet={{
                    small: '/pexels-kampus-8629106.jpg',
                    medium: '/pexels-kampus-8629106.jpg',
                    large: '/pexels-kampus-8629106.jpg',
                }}
                textColor="light"
                showOverlay={true}
                minHeight="400px"
            />

            {/* Main Content */}
            <Box component="main">
                {/* Faculty Statistics Dashboard */}
                <FacultyStatsSection statistics={facultyStatistics} />

                {/* Search and Filter Section */}
                <SearchFilterSection
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedDepartment={selectedDepartment}
                    setSelectedDepartment={setSelectedDepartment}
                    departments={departments}
                />

                {/* Faculty Directory Grid */}
                <FacultyDirectorySection faculty={filteredFaculty} />

                {/* Department Overview */}
                <DepartmentOverviewSection departments={departmentStats} />

                {/* Join Our Team CTA */}
                <JoinTeamSection />
            </Box>
        </Box>
    );
};

/**
 * Faculty Statistics section component
 */
interface FacultyStatsSectionProps {
    statistics: FacultyStatistic[];
}

const FacultyStatsSection: React.FC<FacultyStatsSectionProps> = ({
    statistics,
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="faculty-stats"
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
                        Faculty Excellence
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
                        Our exceptional educators bring expertise, passion, and
                        dedication to every classroom
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
 * Search and Filter section component
 */
interface SearchFilterSectionProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedDepartment: string;
    setSelectedDepartment: (dept: string) => void;
    departments: string[];
}

const SearchFilterSection: React.FC<SearchFilterSectionProps> = ({
    searchTerm,
    setSearchTerm,
    selectedDepartment,
    setSelectedDepartment,
    departments,
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="search-filter"
            sx={{
                py: { xs: 4, md: 6 },
                backgroundColor: '#f8fafc',
            }}
        >
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    sx={{
                        opacity: isIntersecting ? 1 : 0,
                        transform: isIntersecting
                            ? 'translateY(0)'
                            : 'translateY(30px)',
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search faculty by name, title, or department"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search
                                            sx={{
                                                fontSize: 20,
                                                color: 'text.secondary',
                                            }}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1,
                                    backgroundColor: 'white',
                                    '& fieldset': {
                                        borderColor: 'divider',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    fontSize: '0.875rem',
                                },
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl fullWidth>
                            <InputLabel sx={{ fontSize: '0.875rem' }}>
                                Department
                            </InputLabel>
                            <Select
                                value={selectedDepartment}
                                onChange={e =>
                                    setSelectedDepartment(e.target.value)
                                }
                                label="Department"
                                sx={{
                                    borderRadius: 1,
                                    backgroundColor: 'white',
                                    '& .MuiSelect-select': {
                                        fontSize: '0.875rem',
                                    },
                                }}
                            >
                                {departments.map(dept => (
                                    <MenuItem key={dept} value={dept}>
                                        {dept}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

/**
 * Faculty Directory section component
 */
interface FacultyDirectorySectionProps {
    faculty: FacultyMember[];
}

const FacultyDirectorySection: React.FC<FacultyDirectorySectionProps> = ({
    faculty,
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="faculty-directory"
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
                        Faculty Directory
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: '1rem',
                            color: 'text.secondary',
                            maxWidth: '600px',
                            mx: 'auto',
                            mb: 2,
                        }}
                    >
                        {faculty.length} faculty member
                        {faculty.length !== 1 ? 's' : ''} found
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {faculty.map((member, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={member.id}>
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
                                        boxShadow:
                                            '0 8px 25px rgba(99, 102, 241, 0.15)',
                                        transform: 'translateY(-2px)',
                                    },
                                }}
                            >
                                {member.image && (
                                    <ResponsiveImage
                                        src={member.image}
                                        alt={member.name}
                                        aspectRatio={4 / 3}
                                        borderRadius={0}
                                        objectFit="cover"
                                    />
                                )}
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
                                            mb: 0.5,
                                        }}
                                    >
                                        {member.title}
                                    </Typography>
                                    <Chip
                                        label={member.department}
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            mb: 1,
                                            fontSize: '0.75rem',
                                            height: '18px',
                                        }}
                                    />
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
                                    {member.specialties && (
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
                                                Specialties:
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: 0.5,
                                                }}
                                            >
                                                {member.specialties
                                                    .slice(0, 3)
                                                    .map(
                                                        (
                                                            specialty,
                                                            specIndex
                                                        ) => (
                                                            <Chip
                                                                key={specIndex}
                                                                label={
                                                                    specialty
                                                                }
                                                                variant="outlined"
                                                                size="small"
                                                                sx={{
                                                                    fontSize:
                                                                        '0.75rem',
                                                                    height: '18px',
                                                                }}
                                                            />
                                                        )
                                                    )}
                                            </Box>
                                        </Box>
                                    )}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            mt: 1,
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'text.secondary',
                                                fontWeight: 500,
                                            }}
                                        >
                                            {member.yearsOfExperience}+ years
                                            exp.
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    color: 'primary.main',
                                                },
                                            }}
                                        >
                                            <Email sx={{ fontSize: 14 }} />
                                            <Typography
                                                variant="caption"
                                                sx={{ fontSize: '0.75rem' }}
                                            >
                                                Contact
                                            </Typography>
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
 * Department Overview section component
 */
interface DepartmentOverviewSectionProps {
    departments: DepartmentStats[];
}

const DepartmentOverviewSection: React.FC<DepartmentOverviewSectionProps> = ({
    departments,
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="departments"
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
                        Academic Departments
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
                        Diverse expertise across specialized academic
                        disciplines
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {departments.map((dept, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={dept.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    textAlign: 'center',
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
                                    '&:hover': {
                                        boxShadow:
                                            '0 8px 25px rgba(99, 102, 241, 0.15)',
                                        transform: 'translateY(-2px)',
                                        borderColor: dept.color,
                                    },
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        backgroundColor: dept.color,
                                        mx: 'auto',
                                        mb: 1.5,
                                    }}
                                >
                                    {dept.icon}
                                </Avatar>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: '1.125rem',
                                        fontWeight: 600,
                                        mb: 0.5,
                                        color: 'text.primary',
                                    }}
                                >
                                    {dept.name}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.75rem',
                                        color: dept.color,
                                        fontWeight: 600,
                                        mb: 1,
                                        display: 'block',
                                    }}
                                >
                                    {dept.facultyCount} Faculty Member
                                    {dept.facultyCount !== 1 ? 's' : ''}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontSize: '0.8125rem',
                                        color: 'text.secondary',
                                        lineHeight: 1.4,
                                    }}
                                >
                                    {dept.description}
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
 * Join Our Team CTA section component
 */
const JoinTeamSection: React.FC = () => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="join-team"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#ffffff',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        p: { xs: 3, md: 4 },
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        borderRadius: 1,
                        textAlign: 'center',
                        opacity: isIntersecting ? 1 : 0,
                        transform: isIntersecting
                            ? 'translateY(0)'
                            : 'translateY(30px)',
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: { xs: '1.25rem', md: '1.5rem' },
                            fontWeight: 600,
                            color: '#ffffff',
                            mb: 1,
                        }}
                    >
                        Join Our Excellence Team
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: '0.875rem',
                            color: '#ffffff',
                            mb: 2,
                            maxWidth: '600px',
                            mx: 'auto',
                            opacity: 0.9,
                        }}
                    >
                        We're seeking passionate educators who share our
                        commitment to academic excellence and student success.
                        Discover competitive benefits, professional development
                        opportunities, and a collaborative community.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            backgroundColor: '#ffffff',
                            color: 'primary.main',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            textTransform: 'none',
                            px: 3,
                            '&:hover': {
                                backgroundColor: '#f8fafc',
                                transform: 'translateY(-1px)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            },
                        }}
                    >
                        View Career Opportunities
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};
