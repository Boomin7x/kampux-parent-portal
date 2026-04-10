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
            label: 'Personnel Enseignant',
            value: '24',
            description: 'enseignants qualifiés et engagés',
            icon: <Groups />,
            color: '#6366f1',
        },
        {
            id: '2',
            label: 'Départements',
            value: '8',
            description: 'disciplines académiques',
            icon: <School />,
            color: '#10b981',
        },
        {
            id: '3',
            label: 'Diplômes Avancés',
            value: '85%',
            description: 'détiennent un Master ou un Doctorat',
            icon: <WorkspacePremium />,
            color: '#8b5cf6',
            progress: 85,
        },
        {
            id: '4',
            label: 'Expérience Moyenne',
            value: '6',
            description: 'années d’expérience dans l’enseignement',
            icon: <TrendingUp />,
            color: '#f59e0b',
        },
    ];

    // Faculty members data
    const allFaculty: FacultyMember[] = [
        {
            id: '1',
            name: 'M. Alain Ndzié',
            title: 'Enseignant de Mathématiques',
            department: 'Mathématiques',
            bio: 'Enseignant passionné, spécialisé dans la pédagogie active pour faciliter la compréhension des mathématiques.',
            qualifications: [
                'Master en Mathématiques',
                'Licence en Sciences de l’Éducation',
            ],
            yearsOfExperience: 6,
            email: 'maths@gbsleskamites.cm',
            image: '/pexels-katerina-holmes-5905554.jpg',
            specialties: ['Algèbre', 'Géométrie', 'Statistiques'],
            achievements: [
                'Encadrement des meilleurs élèves',
                'Participation aux Olympiades scolaires',
            ],
        },
        {
            id: '2',
            name: 'Mme Clarisse Ndzi',
            title: 'Responsable des Sciences',
            department: 'Sciences',
            bio: 'Spécialiste des sciences naturelles, elle rend les cours pratiques et interactifs pour stimuler la curiosité des élèves.',
            qualifications: ['Master en Biologie', 'Licence en Chimie'],
            yearsOfExperience: 5,
            email: 'sciences@gbsleskamites.cm',
            image: '/patrick-amoy-6DfEbkqsTiA-unsplash.jpg',
            specialties: ['Biologie', 'Chimie', 'SVT'],
            achievements: [
                'Organisation de foires scientifiques',
                'Encadrement de projets scientifiques',
            ],
        },
        {
            id: '3',
            name: 'Mme Grâce Ndzié',
            title: 'Coordinatrice des Langues',
            department: 'Langues',
            bio: 'Enseignante dynamique favorisant l’apprentissage des langues à travers des méthodes interactives.',
            qualifications: [
                'Master en Linguistique',
                'Licence en Lettres modernes',
            ],
            yearsOfExperience: 6,
            email: 'langues@gbsleskamites.cm',
            image: '/pexels-katerina-holmes-5905899.jpg',
            specialties: ['Français', 'Anglais'],
            achievements: [
                'Amélioration du niveau linguistique des élèves',
                'Organisation de clubs de langues',
            ],
        },
        {
            id: '4',
            name: 'M. Serge Ndzi',
            title: 'Responsable des Arts',
            department: 'Arts',
            bio: 'Artiste et enseignant, il développe la créativité et l’expression artistique des élèves.',
            qualifications: ['Licence en Beaux-Arts'],
            yearsOfExperience: 4,
            email: 'arts@gbsleskamites.cm',
            specialties: ['Dessin', 'Peinture', 'Arts plastiques'],
            achievements: [
                'Organisation d’expositions scolaires',
                'Encadrement artistique des élèves',
            ],
        },
        {
            id: '5',
            name: 'Mme Mireille Ndzi',
            title: 'Responsable de Français',
            department: 'Lettres',
            bio: 'Spécialiste en littérature, elle développe les compétences en lecture et en rédaction.',
            qualifications: ['Master en Lettres modernes'],
            yearsOfExperience: 6,
            email: 'francais@gbsleskamites.cm',
            specialties: ['Littérature', 'Expression écrite'],
            achievements: [
                'Encadrement aux concours littéraires',
                'Promotion de la lecture',
            ],
        },
        {
            id: '6',
            name: 'M. Patrick Ndzi',
            title: 'Enseignant de Physique',
            department: 'Sciences',
            bio: 'Passionné par les sciences physiques, il simplifie les concepts complexes pour les élèves.',
            qualifications: ['Master en Physique', 'Licence en Sciences'],
            yearsOfExperience: 5,
            email: 'physique@gbsleskamites.cm',
            specialties: ['Physique', 'Technologie'],
            achievements: [
                'Encadrement de projets scientifiques',
                'Initiation à la robotique',
            ],
        },
        {
            id: '7',
            name: 'Mme Nadia Ndzi',
            title: 'Éducation Physique et Sportive',
            department: 'EPS',
            bio: 'Encadre les élèves pour développer discipline, santé et esprit d’équipe.',
            qualifications: ['Licence en Sciences du Sport'],
            yearsOfExperience: 5,
            email: 'eps@gbsleskamites.cm',
            specialties: ['Sport', 'Fitness', 'Athlétisme'],
            achievements: [
                'Organisation de compétitions scolaires',
                'Encadrement des équipes sportives',
            ],
        },
        {
            id: '8',
            name: 'M. Junior Ndzi',
            title: 'Responsable Musique',
            department: 'Arts',
            bio: 'Musicien passionné, il initie les élèves à la pratique musicale et à la culture artistique.',
            qualifications: ['Diplôme en Musique', 'Certificat en pédagogie'],
            yearsOfExperience: 4,
            email: 'musique@gbsleskamites.cm',
            specialties: ['Chant', 'Instrument', 'Théorie musicale'],
            achievements: [
                'Organisation de spectacles scolaires',
                'Encadrement de chorales',
            ],
        },
    ];

    // Department statistics data
    const departmentStats: DepartmentStats[] = [
        {
            id: '1',
            name: 'Mathématiques',
            facultyCount: 3,
            icon: <Calculate />,
            color: '#6366f1',
            description:
                'Développement des compétences en mathématiques et du raisonnement logique',
        },
        {
            id: '2',
            name: 'Sciences',
            facultyCount: 4,
            icon: <Science />,
            color: '#10b981',
            description:
                'Sciences expérimentales avec des approches pratiques et méthodiques',
        },
        {
            id: '3',
            name: 'Langues',
            facultyCount: 3,
            icon: <Language />,
            color: '#8b5cf6',
            description:
                'Apprentissage des langues et développement des compétences en communication',
        },
        {
            id: '4',
            name: 'Arts',
            facultyCount: 3,
            icon: <Palette />,
            color: '#f59e0b',
            description: 'Expression créative et développement artistique',
        },
        {
            id: '5',
            name: 'Lettres Anglaises',
            facultyCount: 2,
            icon: <MenuBook />,
            color: '#06b6d4',
            description: 'Littérature, expression écrite et analyse de textes',
        },
        {
            id: '6',
            name: 'Éducation Physique et Sportive',
            facultyCount: 2,
            icon: <Person />,
            color: '#ef4444',
            description:
                'Sport, bien-être et développement physique des élèves',
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
        'Tous',
        'Mathématiques',
        'Sciences',
        'Langues',
        'Arts',
        'Lettres Anglaises',
        'Éducation Physique et Sportive',
    ];

    // const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    //     setSelectedTab(newValue);
    // };

    return (
        <Box sx={{ backgroundColor: '#fefefe', minHeight: '100vh' }}>
            {/* Page Header with Hero Banner */}
            <PageHeader
                title="Notre équipe pédagogique"
                subtitle="Des enseignants passionnés, engagés à inspirer et à accompagner chaque élève vers l’excellence"
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
                        Excellence pédagogique
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
                        Des éducateurs passionnés, experts et dévoués dans
                        chaque classe
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
                        Équipe pédagogique
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
                        {faculty.length} Corps enseignant
                        {faculty.length !== 1 ? 's' : ''} trouvez
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
                                                Domaines d’expertise:
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
                                            {member.yearsOfExperience}+ années
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
                        Départements académiques
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
                        Une expertise diversifiée couvrant des disciplines
                        académiques spécialisées
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
                                    {dept.facultyCount} Corps enseignant
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
                        Rejoignez notre équipe d’excellence
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
                        Rejoignez une équipe d’éducateurs passionnés, engagés
                        pour l’excellence académique et le succès de chaque
                        élève. Profitez d’avantages compétitifs, de formations
                        continues et d’un environnement collaboratif.
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
                        Voir les opportunités de carrière
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};
