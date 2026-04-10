import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Stepper,
    Step,
    StepLabel,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    TextField,
    Paper,
    Divider,
} from '@mui/material';
import {
    School,
    Assignment,
    Schedule,
    ContactMail,
    CheckCircle,
    ExpandMore,
    Person,
    Email,
    Phone,
    LocationOn,
    CalendarToday,
    AttachMoney,
    MenuBook,
    EmojiEvents,
    Group,
    Timeline,
    Description,
    Verified,
    Info,
} from '@mui/icons-material';
import { PageHeader } from '../../components/landing/shared/PageHeader';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';

/**
 * Interface for admission process steps
 */
interface AdmissionStep {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    details: string[];
    required: boolean;
    timeline: string;
}

/**
 * Interface for admission requirements
 */
interface AdmissionRequirement {
    id: string;
    category: string;
    title: string;
    description: string;
    documents: string[];
    deadline: string;
    priority: 'high' | 'medium' | 'low';
}

/**
 * Interface for tuition and fee information
 */
interface FeeStructure {
    id: string;
    grade: string;
    tuitionFee: number;
    additionalFees: {
        name: string;
        amount: number;
        required: boolean;
    }[];
    totalEstimate: number;
    paymentPlans: string[];
}

/**
 * Interface for FAQ items
 */
interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: 'general' | 'academic' | 'financial' | 'logistics';
}

/**
 * Interface for key admission dates
 */
interface ImportantDate {
    id: string;
    title: string;
    date: string;
    description: string;
    type: 'deadline' | 'event' | 'notification';
}

/**
 * AdmissionPage component - Comprehensive school admission information
 *
 * Features:
 * - Hero section with admission overview
 * - Step-by-step application process guide
 * - Detailed requirements and document checklist
 * - Transparent tuition and fee structure
 * - Important dates and deadlines timeline
 * - Comprehensive FAQ section
 * - Contact information and application CTA
 * - Responsive design with minimal typography
 * - Intersection observer animations
 * - TypeScript interfaces for type safety
 *
 * Architecture:
 * - Follows DESIGN_PATTERN.md minimal content-dense pattern
 * - Uses MUI Grid v2 syntax throughout
 * - Implements proper spacing scale (xs: 4px, sm: 8px, md: 12px, lg: 16px, xl: 24px, xxl: 32px)
 * - Typography follows established scale (h1: 32px, h2: 24px, h3: 20px, etc.)
 * - Color scheme uses primary (#6366f1), primary light (#8b5cf6), primary dark (#4338ca)
 */
export const AdmissionPage: React.FC = () => {
    // State for FAQ filter
    const [faqCategory, setFaqCategory] = useState<string>('all');

    // Admission process steps data
    const admissionSteps: AdmissionStep[] = [
        {
            id: '1',
            title: 'Information & Orientation',
            description:
                'Découvrez notre école, ses programmes et conditions d’admission',
            icon: <Info />,
            details: [
                'Consulter les programmes de la maternelle, primaire et collège',
                'Participer aux journées portes ouvertes',
                'Contacter le service des admissions pour conseils',
                'Visiter l’école et ses installations (bibliothèque, cantine, garderie, terrains de sport)',
            ],
            required: false,
            timeline: 'Juillet 2026',
        },
        {
            id: '2',
            title: 'Dépôt du dossier de candidature',
            description:
                'Constituez et déposez votre dossier pour l’année 2026-2027',
            icon: <Assignment />,
            details: [
                'Remplir la fiche d’inscription en ligne ou sur place',
                'Joindre les bulletins scolaires récents (si primaire ou collège)',
                'Fournir l’acte de naissance et 2 photos d’identité',
                'Indiquer les besoins spécifiques (garderie, transport scolaire, cantine)',
            ],
            required: true,
            timeline: 'Juillet - Août 2026',
        },
        {
            id: '3',
            title: 'Étude du dossier',
            description: 'Analyse du dossier par l’administration',
            icon: <Description />,
            details: [
                'Vérification des résultats scolaires et notes précédentes',
                'Analyse du comportement et de la discipline',
                'Validation de toutes les pièces fournies',
            ],
            required: true,
            timeline: '1 à 2 semaines après dépôt',
        },
        {
            id: '4',
            title: 'Test d’entrée & Entretien',
            description:
                'Évaluation académique adaptée à l’âge et entretien avec les parents',
            icon: <School />,
            details: [
                'Test de niveau (Français, Mathématiques pour primaire et collège)',
                'Entretien avec les parents pour comprendre les besoins de l’enfant',
                'Observation et interaction avec l’élève',
            ],
            required: true,
            timeline: 'Juillet - Août 2026',
        },
        {
            id: '5',
            title: 'Résultats d’admission',
            description:
                'Annonce des résultats et instructions pour finaliser l’inscription',
            icon: <Verified />,
            details: [
                'Notification par affichage, appel ou email',
                'Explication des étapes suivantes pour la rentrée',
                'Information sur les services complémentaires (cantine, garderie, transport)',
            ],
            required: false,
            timeline: 'Fin Août 2026',
        },
        {
            id: '6',
            title: 'Inscription définitive & Préparation',
            description:
                'Finalisez l’inscription et préparez l’enfant pour la rentrée',
            icon: <CheckCircle />,
            details: [
                'Paiement des frais de scolarité et services supplémentaires (bus, cantine, garderie)',
                'Achat des uniformes et fournitures scolaires',
                'Dépôt du dossier médical et vaccins',
                'Participation à la réunion d’accueil et orientation des nouveaux élèves',
            ],
            required: true,
            timeline: 'Août 2026 (avant la rentrée de septembre)',
        },
    ];

    // Requirements data
    const admissionRequirements: AdmissionRequirement[] = [
        {
            id: '1',
            category: 'Dossiers Scolaires',
            title: 'Relevés de notes précédents',
            description:
                'Relevés officiels de l’école actuelle et des années précédentes',
            documents: [
                'Bulletins de l’année en cours',
                'Relevés des 2 années précédentes',
                'Résultats aux tests standardisés (si disponibles)',
                'Recommandations des enseignants',
            ],
            deadline: 'Juillet 2026',
            priority: 'high',
        },
        {
            id: '2',
            category: 'Informations Personnelles',
            title: 'Détails de l’élève et de la famille',
            description:
                'Fournir les informations personnelles et familiales complètes',
            documents: [
                'Acte de naissance (copie certifiée)',
                'Passeport ou carte d’identité',
                'Justificatif de domicile',
                'Coordonnées de la famille',
            ],
            deadline: 'Juillet 2026',
            priority: 'high',
        },
        {
            id: '3',
            category: 'Santé & Médical',
            title: 'Documents médicaux',
            description: 'Dossier de santé actuel et antécédents vaccinaux',
            documents: [
                'Carnet de vaccination à jour',
                'Rapport d’examen médical',
                'Documents relatifs aux besoins spécifiques (si applicable)',
                'Informations médicales d’urgence',
            ],
            deadline: 'Août 2026',
            priority: 'medium',
        },
        {
            id: '4',
            category: 'Financier',
            title: 'Informations financières',
            description:
                'Documents financiers pour l’inscription et la prise en compte des aides éventuelles',
            documents: [
                'Formulaire de demande d’aide financière (si applicable)',
                'Justificatifs de revenus',
                'Relevés bancaires (pour les étudiants internationaux)',
                'Documents pour demandes de bourses',
            ],
            deadline: 'Août 2026',
            priority: 'medium',
        },
    ];

    // Fee structure data
    const feeStructures: FeeStructure[] = [
        {
            id: '1',
            grade: 'Maternelle (Petite à Grande Section)',
            tuitionFee: 125000,
            additionalFees: [
                { name: 'Frais d’inscription', amount: 25000, required: true },
                { name: 'Frais technologique', amount: 3000, required: true },
                { name: 'Frais d’activités', amount: 2500, required: true },
                { name: 'Cantine', amount: 15000, required: false },
                {
                    name: 'Garderie périscolaire',
                    amount: 20000,
                    required: false,
                },
            ],
            totalEstimate: 175000,
            paymentPlans: [
                'Paiement annuel',
                'Plan semestriel (3 semestres)',
                'Plan mensuel (9 mois)',
            ],
        },
        {
            id: '2',
            grade: 'Primaire (CP à CM2)',
            tuitionFee: 145000,
            additionalFees: [
                { name: 'Frais d’inscription', amount: 25000, required: true },
                { name: 'Frais technologique', amount: 4000, required: true },
                { name: 'Frais d’activités', amount: 3500, required: true },
                { name: 'Cantine', amount: 15000, required: false },
                {
                    name: 'Garderie périscolaire',
                    amount: 20000,
                    required: false,
                },
                {
                    name: 'Fonds sorties pédagogiques',
                    amount: 5000,
                    required: false,
                },
            ],
            totalEstimate: 217500,
            paymentPlans: [
                'Paiement annuel',
                'Plan semestriel (3 semestres)',
                'Plan mensuel (9 mois)',
            ],
        },
        {
            id: '3',
            grade: 'Collège (6ème à 3ème)',
            tuitionFee: 165000,
            additionalFees: [
                { name: 'Frais d’inscription', amount: 50000, required: true },
                { name: 'Frais technologique', amount: 5000, required: true },
                { name: 'Frais d’activités', amount: 4000, required: true },
                { name: 'Frais de laboratoire', amount: 3000, required: true },
                { name: 'Cantine', amount: 15000, required: false },
                { name: 'Programme sportif', amount: 4000, required: false },
            ],
            totalEstimate: 246000,
            paymentPlans: [
                'Paiement annuel',
                'Plan semestriel (3 semestres)',
                'Plan mensuel (9 mois)',
            ],
        },
    ];

    // Important dates data
    const importantDates: ImportantDate[] = [
        {
            id: '1',
            title: 'Ouverture des candidatures',
            date: '1er juillet 2026',
            description:
                'Le portail de candidature en ligne devient disponible pour les nouvelles familles',
            type: 'event',
        },
        {
            id: '2',
            title: "Début des sessions d'information",
            date: '10 juillet 2026',
            description:
                "Sessions d'information virtuelles et en présentiel pour les parents et élèves",
            type: 'event',
        },
        {
            id: '3',
            title: 'Date limite de dépôt des candidatures',
            date: '25 juillet 2026',
            description:
                'Dernier délai pour soumettre le dossier de candidature complet',
            type: 'deadline',
        },
        {
            id: '4',
            title: 'Date limite des documents',
            date: '30 juillet 2026',
            description: 'Tous les documents justificatifs doivent être reçus',
            type: 'deadline',
        },
        {
            id: '5',
            title: "Période d'évaluation",
            date: '1er - 10 août 2026',
            description:
                'Évaluations des élèves et entretiens avec les parents',
            type: 'event',
        },
        {
            id: '6',
            title: 'Notification des admissions',
            date: '12 août 2026',
            description:
                "Les décisions d'admission sont communiquées aux familles des candidats",
            type: 'notification',
        },
        {
            id: '7',
            title: "Date limite d'inscription",
            date: '20 août 2026',
            description:
                "Dernier délai pour confirmer l'inscription et verser l'acompte",
            type: 'deadline',
        },
        {
            id: '8',
            title: 'Orientation des nouveaux élèves',
            date: '25 août 2026',
            description:
                "Séance d'accueil et orientation pour les élèves et leurs familles",
            type: 'event',
        },
    ];

    // FAQ data
    const faqItems: FAQItem[] = [
        {
            id: '1',
            question: 'Quelle est la date limite de dépôt des candidatures ?',
            answer: 'La date limite de dépôt des candidatures est le 25 juillet 2026. Nous encourageons les soumissions anticipées car certaines places peuvent être attribuées au fur et à mesure de la réception des dossiers.',
            category: 'general',
        },
        {
            id: '2',
            question: 'Y a-t-il des frais de dossier ?',
            answer: "Oui, des frais de dossier non remboursables de 50 000 FCFA s'appliquent. Ces frais couvrent le traitement de votre candidature et l'organisation des évaluations.",
            category: 'financial',
        },
        {
            id: '3',
            question: 'Quel programme scolaire suivez-vous ?',
            answer: 'Nous suivons le programme national renforcé avec des standards internationaux, incluant les sciences, les arts, l’éducation physique et le développement du caractère.',
            category: 'academic',
        },
        {
            id: '4',
            question: 'Proposez-vous des bourses ou aides financières ?',
            answer: 'Oui, nous offrons des bourses au mérite et des aides financières selon les besoins. Les demandes d’aide financière doivent être soumises avant le 31 juillet 2026. Les bourses au mérite sont attribuées selon les performances académiques et les talents spéciaux.',
            category: 'financial',
        },
        {
            id: '5',
            question: 'Quel est le ratio élèves/professeur ?',
            answer: 'Nous maintenons des classes à effectif réduit : environ 15 élèves par enseignant en primaire et 18 élèves par enseignant au collège, pour assurer un suivi personnalisé.',
            category: 'academic',
        },
        {
            id: '6',
            question: 'Proposez-vous un service de transport scolaire ?',
            answer: 'Oui, nous offrons un service de bus couvrant plusieurs quartiers. Les frais annuels varient de 500 000 à 800 000 FCFA selon la distance.',
            category: 'logistics',
        },
        {
            id: '7',
            question: 'Quelles activités périscolaires sont disponibles ?',
            answer: 'Nous proposons de nombreuses activités : équipes sportives, musique, théâtre, clubs académiques, projets de service communautaire et programmes de leadership.',
            category: 'general',
        },
        {
            id: '8',
            question: 'Pouvons-nous visiter l’école avant l’inscription ?',
            answer: 'Bien sûr ! Nous encourageons les visites de l’école. Vous pouvez planifier des visites individuelles ou participer à nos sessions d’information en groupe. Des visites virtuelles sont également disponibles pour les familles qui ne peuvent pas se déplacer.',
            category: 'general',
        },
        {
            id: '9',
            question:
                'Quel soutien est offert aux élèves avec besoins éducatifs particuliers ?',
            answer: 'Nous disposons d’une équipe spécialisée pour accompagner les élèves ayant des besoins éducatifs particuliers. Des plans personnalisés et un suivi spécialisé sont proposés selon les besoins.',
            category: 'academic',
        },
        {
            id: '10',
            question: 'Quelle est la politique vestimentaire ?',
            answer: 'Nous avons une politique d’uniforme qui favorise l’égalité et l’esprit d’école. Les détails des uniformes et les fournisseurs agréés sont communiqués lors de l’inscription. Le coût estimé est de 50 000 à 80 000 FCFA par élève.',
            category: 'logistics',
        },
    ];

    // Filter FAQ items based on category
    const filteredFAQs =
        faqCategory === 'all'
            ? faqItems
            : faqItems.filter(item => item.category === faqCategory);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#fefefe',
            }}
        >
            {/* Page Header with Hero Banner */}
            <PageHeader
                title="Les Admissions"
                subtitle="Rejoignez notre communauté d'apprenants et découvrez le chemin vers l'excellence académique"
                backgroundImage="/pexels-katerina-holmes-5905554.jpg"
                backgroundImageSrcSet={{
                    small: '/pexels-katerina-holmes-5905554.jpg',
                    medium: '/pexels-katerina-holmes-5905554.jpg',
                    large: '/pexels-katerina-holmes-5905554.jpg',
                }}
                textColor="light"
                showOverlay={true}
                minHeight="400px"
            />

            {/* Main Content */}
            <Box component="main">
                {/* Admission Overview Section */}
                <AdmissionOverviewSection />

                {/* Application Process Section */}
                <ApplicationProcessSection steps={admissionSteps} />

                {/* Requirements Section */}
                <RequirementsSection requirements={admissionRequirements} />

                {/* Important Dates Section */}
                <ImportantDatesSection dates={importantDates} />

                {/* Tuition & Fees Section */}
                <TuitionFeesSection feeStructures={feeStructures} />

                {/* FAQ Section */}
                <FAQSection
                    faqItems={filteredFAQs}
                    currentCategory={faqCategory}
                    onCategoryChange={setFaqCategory}
                />

                {/* Contact & Application CTA Section */}
                <ContactApplicationSection />
            </Box>
        </Box>
    );
};

/**
 * Admission Overview section component
 */
const AdmissionOverviewSection: React.FC = () => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    const highlights = [
        {
            icon: <EmojiEvents />,
            title: 'GBS Les Kamites',
            description:
                'École parmi les meilleures du pays avec un taux de réussite élevé et 98 % d’admission en université',
            color: '#6366f1',
        },
        {
            icon: <Group />,
            title: 'Classes à Effectifs Réduits',
            description:
                'Ratio élèves/enseignant de 8:1 pour une attention personnalisée',
            color: '#8b5cf6',
        },
        {
            icon: <MenuBook />,
            title: 'Éducation Globale',
            description:
                'Programme complet incluant STEM, arts, et développement du caractère',
            color: '#06b6d4',
        },
        {
            icon: <Timeline />,
            title: 'Historique Réussi',
            description:
                'Plus de 5 ans d’excellence éducative et de réussite des élèves',
            color: '#10b981',
        },
    ];

    return (
        <Box
            ref={targetRef}
            component="section"
            id="admission-overview"
            sx={{
                py: { xs: 4, md: 6 },
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
                        Pourquoi Choisis GSB Les Kamites?
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: '1rem',
                            color: 'text.secondary',
                            maxWidth: '800px',
                            mx: 'auto',
                            mb: 3,
                        }}
                    >
                        Nous nous engageons à offrir une éducation
                        exceptionnelle qui stimule la curiosité intellectuelle,
                        favorise le développement du caractère et prépare les
                        élèves à réussir dans un monde en constante évolution.
                        Notre processus d’admission est conçu pour identifier
                        les élèves qui s’épanouiront dans notre environnement
                        d’apprentissage collaboratif.
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {highlights.map((highlight, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    p: 2,
                                    borderRadius: 1,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    height: '100%',
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
                                        backgroundColor: highlight.color,
                                        mx: 'auto',
                                        mb: 1.5,
                                    }}
                                >
                                    {highlight.icon}
                                </Avatar>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        mb: 1,
                                        color: 'text.primary',
                                    }}
                                >
                                    {highlight.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontSize: '0.8125rem',
                                        color: 'text.secondary',
                                        lineHeight: 1.4,
                                    }}
                                >
                                    {highlight.description}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

/**
 * Application Process section component
 */
interface ApplicationProcessSectionProps {
    steps: AdmissionStep[];
}

const ApplicationProcessSection: React.FC<ApplicationProcessSectionProps> = ({
    steps,
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="application-process"
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
                        Processus d’Admission
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
                        Découvrez les étapes pour inscrire votre enfant et
                        rejoindre notre communauté scolaire.
                    </Typography>
                </Box>

                {/* Desktop Stepper */}
                <Box sx={{ display: { xs: 'none', md: 'block' }, mb: 4 }}>
                    <Stepper activeStep={-1} alternativeLabel>
                        {steps.map(step => (
                            <Step key={step.id}>
                                <StepLabel
                                    icon={
                                        <Avatar
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                backgroundColor: 'primary.main',
                                            }}
                                        >
                                            {step.icon}
                                        </Avatar>
                                    }
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{ fontSize: '0.75rem' }}
                                    >
                                        {step.title}
                                    </Typography>
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                {/* Step Details */}
                <Grid container spacing={2}>
                    {steps.map((step, index) => (
                        <Grid size={{ xs: 12, md: 6 }} key={step.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    boxShadow: 'none',
                                    borderRadius: 1,
                                    opacity: isIntersecting ? 1 : 0,
                                    transform: isIntersecting
                                        ? 'translateY(0)'
                                        : 'translateY(30px)',
                                    transition:
                                        'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: `${index * 0.1}s`,
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
                                        <Avatar
                                            sx={{
                                                width: 20,
                                                height: 20,
                                                backgroundColor: 'primary.main',
                                                mr: 1,
                                            }}
                                        >
                                            {step.icon}
                                        </Avatar>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontSize: '0.875rem',
                                                fontWeight: 600,
                                                color: 'text.primary',
                                            }}
                                        >
                                            Étape {parseInt(step.id)}:{' '}
                                            {step.title}
                                        </Typography>
                                        {step.required && (
                                            <Chip
                                                label="Required"
                                                size="small"
                                                color="error"
                                                sx={{
                                                    ml: 1,
                                                    height: '16px',
                                                    fontSize: '0.75rem',
                                                }}
                                            />
                                        )}
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: '0.8125rem',
                                            color: 'text.secondary',
                                            mb: 1,
                                        }}
                                    >
                                        {step.description}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontSize: '0.75rem',
                                            color: 'primary.main',
                                            fontWeight: 500,
                                            mb: 1,
                                            display: 'block',
                                        }}
                                    >
                                        Timeline: {step.timeline}
                                    </Typography>
                                    <List dense sx={{ p: 0 }}>
                                        {step.details.map(
                                            (detail, detailIndex) => (
                                                <ListItem
                                                    key={detailIndex}
                                                    sx={{ px: 0, py: 0.25 }}
                                                >
                                                    <ListItemIcon
                                                        sx={{ minWidth: 16 }}
                                                    >
                                                        <CheckCircle
                                                            sx={{
                                                                fontSize:
                                                                    '0.875rem',
                                                                color: 'success.main',
                                                            }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={detail}
                                                        primaryTypographyProps={{
                                                            variant: 'body2',
                                                            sx: {
                                                                fontSize:
                                                                    '0.8125rem',
                                                            },
                                                        }}
                                                    />
                                                </ListItem>
                                            )
                                        )}
                                    </List>
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
 * Requirements section component
 */
interface RequirementsSectionProps {
    requirements: AdmissionRequirement[];
}

const RequirementsSection: React.FC<RequirementsSectionProps> = ({
    requirements,
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'élevé':
                return 'error';
            case 'moyenne':
                return 'warning';
            case 'moins':
                return 'success';
            default:
                return 'default';
        }
    };

    return (
        <Box
            ref={targetRef}
            component="section"
            id="requirements"
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
                        Exigences d’admission
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
                        Liste complète des documents pour garantir un processus
                        d’admission fluide Complete document checklist to ensure
                        a smooth admission process
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {requirements.map((requirement, index) => (
                        <Grid size={{ xs: 12, md: 6 }} key={requirement.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    boxShadow: 'none',
                                    borderRadius: 1,
                                    opacity: isIntersecting ? 1 : 0,
                                    transform: isIntersecting
                                        ? 'translateY(0)'
                                        : 'translateY(30px)',
                                    transition:
                                        'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: `${index * 0.1}s`,
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
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'primary.main',
                                                fontWeight: 500,
                                                textTransform: 'uppercase',
                                            }}
                                        >
                                            {requirement.category}
                                        </Typography>
                                        <Chip
                                            label={requirement.priority}
                                            size="small"
                                            color={
                                                getPriorityColor(
                                                    requirement.priority
                                                ) as any
                                            }
                                            sx={{
                                                ml: 'auto',
                                                height: '16px',
                                                fontSize: '0.75rem',
                                            }}
                                        />
                                    </Box>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            mb: 1,
                                            color: 'text.primary',
                                        }}
                                    >
                                        {requirement.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: '0.8125rem',
                                            color: 'text.secondary',
                                            mb: 1,
                                        }}
                                    >
                                        {requirement.description}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontSize: '0.75rem',
                                            color: 'error.main',
                                            fontWeight: 500,
                                            mb: 1.5,
                                            display: 'block',
                                        }}
                                    >
                                        Date limite: {requirement.deadline}
                                    </Typography>
                                    <List dense sx={{ p: 0 }}>
                                        {requirement.documents.map(
                                            (document, docIndex) => (
                                                <ListItem
                                                    key={docIndex}
                                                    sx={{ px: 0, py: 0.25 }}
                                                >
                                                    <ListItemIcon
                                                        sx={{ minWidth: 16 }}
                                                    >
                                                        <Assignment
                                                            sx={{
                                                                fontSize:
                                                                    '0.875rem',
                                                                color: 'text.secondary',
                                                            }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={document}
                                                        primaryTypographyProps={{
                                                            variant: 'body2',
                                                            sx: {
                                                                fontSize:
                                                                    '0.8125rem',
                                                            },
                                                        }}
                                                    />
                                                </ListItem>
                                            )
                                        )}
                                    </List>
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
 * Important Dates section component
 */
interface ImportantDatesSectionProps {
    dates: ImportantDate[];
}

const ImportantDatesSection: React.FC<ImportantDatesSectionProps> = ({
    dates,
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'date limite':
                return 'error.main';
            case 'événement':
                return 'primary.main';
            case 'notification':
                return 'success.main';
            default:
                return 'text.secondary';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'deadline':
                return <Schedule />;
            case 'event':
                return <CalendarToday />;
            case 'notification':
                return <ContactMail />;
            default:
                return <Info />;
        }
    };

    return (
        <Box
            ref={targetRef}
            component="section"
            id="important-dates"
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
                        Dates et délais importants
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
                        Notez ces dates importantes du processus d’admission
                        dans votre calendrier
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

                    {dates.map((date, index) => (
                        <Box
                            key={date.id}
                            sx={{
                                position: 'relative',
                                mb: 3,
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateY(0)'
                                    : 'translateY(30px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                transitionDelay: `${index * 0.1}s`,
                            }}
                        >
                            <Grid container spacing={2} alignItems="center">
                                <Grid size={{ xs: 12, md: 6 }}>
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
                                        <Chip
                                            label={date.type}
                                            size="small"
                                            sx={{
                                                mb: 1,
                                                backgroundColor: getTypeColor(
                                                    date.type
                                                ),
                                                color: 'white',
                                                height: '16px',
                                                fontSize: '0.75rem',
                                            }}
                                        />
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontSize: '0.875rem',
                                                fontWeight: 600,
                                                color: getTypeColor(date.type),
                                                mb: 0.5,
                                            }}
                                        >
                                            {date.date}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontSize: '1rem',
                                                fontWeight: 600,
                                                mb: 1,
                                                color: 'text.primary',
                                            }}
                                        >
                                            {date.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: '0.8125rem',
                                                color: 'text.secondary',
                                                lineHeight: 1.4,
                                            }}
                                        >
                                            {date.description}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 0, md: 6 }}>
                                    <Box
                                        sx={{
                                            textAlign: {
                                                md:
                                                    index % 2 === 0
                                                        ? 'left'
                                                        : 'right',
                                            },
                                            display: {
                                                xs: 'none',
                                                md: 'block',
                                            },
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: 20,
                                                height: 20,
                                                backgroundColor: getTypeColor(
                                                    date.type
                                                ),
                                                mx:
                                                    index % 2 === 0
                                                        ? 0
                                                        : 'auto',
                                                mr:
                                                    index % 2 === 0
                                                        ? 'auto'
                                                        : 0,
                                            }}
                                        >
                                            {getTypeIcon(date.type)}
                                        </Avatar>
                                    </Box>
                                </Grid>
                            </Grid>

                            {/* Timeline marker */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    left: { xs: '18px', md: 'calc(50% - 6px)' },
                                    top: '8px',
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    backgroundColor: getTypeColor(date.type),
                                    border: '3px solid white',
                                    boxShadow: `0 0 0 3px ${getTypeColor(date.type)}20`,
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

/**
 * Tuition & Fees section component
 */
interface TuitionFeesSectionProps {
    feeStructures: FeeStructure[];
}

const TuitionFeesSection: React.FC<TuitionFeesSectionProps> = ({
    feeStructures,
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="tuition-fees"
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
                        Frais de scolarité et frais divers
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: '1rem',
                            color: 'text.secondary',
                            maxWidth: '700px',
                            mx: 'auto',
                        }}
                    >
                        Tarification transparente avec des options de paiement
                        flexibles pour soutenir l’investissement éducatif de
                        votre famille
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {feeStructures.map((structure, index) => (
                        <Grid size={{ xs: 12, lg: 6 }} key={structure.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    boxShadow: 'none',
                                    borderRadius: 1,
                                    opacity: isIntersecting ? 1 : 0,
                                    transform: isIntersecting
                                        ? 'translateY(0)'
                                        : 'translateY(30px)',
                                    transition:
                                        'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: `${index * 0.1}s`,
                                }}
                            >
                                <CardContent sx={{ p: 2 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            mb: 2,
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: 20,
                                                height: 20,
                                                backgroundColor: 'primary.main',
                                                mr: 1,
                                            }}
                                        >
                                            <AttachMoney
                                                sx={{ fontSize: '0.875rem' }}
                                            />
                                        </Avatar>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontSize: '0.875rem',
                                                fontWeight: 600,
                                                color: 'text.primary',
                                            }}
                                        >
                                            {structure.grade}
                                        </Typography>
                                    </Box>

                                    {/* Base Tuition */}
                                    <Box sx={{ mb: 2 }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                mb: 1,
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontSize: '0.875rem',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Frais de scolarité
                                            </Typography>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontSize: '0.875rem',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {structure.tuitionFee.toLocaleString()} FCFA
                                            </Typography>
                                        </Box>
                                        <Divider />
                                    </Box>

                                    {/* Additional Fees */}
                                    <Box sx={{ mb: 2 }}>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'text.secondary',
                                                fontWeight: 500,
                                                mb: 1,
                                                display: 'block',
                                            }}
                                        >
                                            Frais supplémentaires
                                        </Typography>
                                        {structure.additionalFees.map(
                                            (fee, feeIndex) => (
                                                <Box
                                                    key={feeIndex}
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'space-between',
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontSize:
                                                                '0.8125rem',
                                                            color: fee.required
                                                                ? 'text.primary'
                                                                : 'text.secondary',
                                                        }}
                                                    >
                                                        {fee.name}{' '}
                                                        {!fee.required &&
                                                            '(Optional)'}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontSize:
                                                                '0.8125rem',
                                                            color: fee.required
                                                                ? 'text.primary'
                                                                : 'text.secondary',
                                                        }}
                                                    >
                                                        {fee.amount.toLocaleString()} FCFA
                                                    </Typography>
                                                </Box>
                                            )
                                        )}
                                    </Box>

                                    {/* Total Estimate */}
                                    <Divider sx={{ mb: 2 }} />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            mb: 2,
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontSize: '0.875rem',
                                                fontWeight: 600,
                                                color: 'primary.main',
                                            }}
                                        >
                                            Total estimé (avec les frais
                                            obligatoires)
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontSize: '0.875rem',
                                                fontWeight: 600,
                                                color: 'primary.main',
                                            }}
                                        >
                                            {structure.totalEstimate.toLocaleString()} FCFA
                                        </Typography>
                                    </Box>

                                    {/* Payment Plans */}
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'text.secondary',
                                                fontWeight: 500,
                                                mb: 1,
                                                display: 'block',
                                            }}
                                        >
                                            Options de plan de paiement
                                        </Typography>
                                        {structure.paymentPlans.map(
                                            (plan, planIndex) => (
                                                <Chip
                                                    key={planIndex}
                                                    label={plan}
                                                    size="small"
                                                    variant="outlined"
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
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Financial Aid Notice */}
                <Paper
                    sx={{
                        mt: 3,
                        p: 2,
                        backgroundColor: 'primary.50',
                        border: '1px solid',
                        borderColor: 'primary.100',
                    }}
                >
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            mb: 1,
                            color: 'primary.main',
                        }}
                    >
                        Aide financière disponible
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: '0.8125rem',
                            color: 'text.secondary',
                            lineHeight: 1.4,
                        }}
                    >
                        Nous croyons que les contraintes financières ne
                        devraient pas constituer un obstacle à une éducation
                        d’excellence. Des aides financières basées sur les
                        besoins et des bourses au mérite sont disponibles pour
                        les familles éligibles. Contactez notre service des
                        admissions pour plus d’informations sur les options
                        d’aide financière
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

/**
 * FAQ section component
 */
interface FAQSectionProps {
    faqItems: FAQItem[];
    currentCategory: string;
    onCategoryChange: (category: string) => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({
    faqItems,
    currentCategory,
    onCategoryChange,
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    const categories = [
        { value: 'all', label: 'Toutes les questions' },
        { value: 'general', label: 'Général' },
        { value: 'academic', label: 'Académique' },
        { value: 'financial', label: 'Financier' },
        { value: 'logistics', label: 'Logistique' },
    ];

    return (
        <Box
            ref={targetRef}
            component="section"
            id="faq"
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
                        Questions fréquentes
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
                        Trouvez les réponses aux questions courantes concernant
                        notre processus d’admission
                    </Typography>

                    {/* Category Filter */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            gap: 1,
                        }}
                    >
                        {categories.map(category => (
                            <Chip
                                key={category.value}
                                label={category.label}
                                onClick={() => onCategoryChange(category.value)}
                                variant={
                                    currentCategory === category.value
                                        ? 'filled'
                                        : 'outlined'
                                }
                                size="small"
                                sx={{
                                    fontSize: '0.75rem',
                                    height: '24px',
                                    cursor: 'pointer',
                                }}
                            />
                        ))}
                    </Box>
                </Box>

                <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
                    {faqItems.map((faq, index) => (
                        <Accordion
                            key={faq.id}
                            sx={{
                                mb: 1,
                                border: '1px solid',
                                borderColor: 'divider',
                                boxShadow: 'none',
                                borderRadius: 1,
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateY(0)'
                                    : 'translateY(20px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                transitionDelay: `${index * 0.05}s`,
                                '&:before': { display: 'none' },
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                sx={{ p: 1.5 }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: 'text.primary',
                                    }}
                                >
                                    {faq.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ pt: 0, px: 1.5, pb: 1.5 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontSize: '0.8125rem',
                                        color: 'text.secondary',
                                        lineHeight: 1.5,
                                    }}
                                >
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

/**
 * Contact & Application CTA section component
 */
const ContactApplicationSection: React.FC = () => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const contactInfo = [
        {
            icon: <Phone />,
            title: 'Téléphone',
            details: ['(+237) 6 77 42 12 52', 'Lun-Ven : 8h00 - 16h00'],
        },
        {
            icon: <Email />,
            title: 'Email',
            details: ['gsbleskamites@gmail.com', 'Réponse sous 24 heures'],
        },
            details: ['Yaoundé - Cameroun', 'SOA, EBOGO'],
        },
>>>>>>> 65fec3d7d561c7bd828f2100c5e7ec1cd616252b
=======
        {
            icon: <LocationOn />,
            title: 'Nous rendre visite',
            details: ['Yaoundé - Cameroun', 'SOA, lieu-dit EBOGO'],
        }
=======
            details: ['Yaoundé - Cameroun', 'SOA, lieu-dit EBOGO'],
        }
    ];

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Box
            ref={targetRef}
            component="section"
            id="contact-application"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#ffffff',
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
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
                        Prêt à postuler ?
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
                        Commencez votre parcours à l’Excellence Academy dès
                        aujourd’hui ou contactez notre équipe des admissions
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {/* Contact Information */}
                    <Grid size={{ xs: 12, md: 4 }}>
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
                                variant="h3"
                                sx={{
                                    fontSize: '1.25rem',
                                    fontWeight: 600,
                                    mb: 2,
                                    color: 'text.primary',
                                }}
                            >
                                Coordonnées
                            </Typography>
                            {contactInfo.map((info, index) => (
                                <Box
                                    key={index}
                                    sx={{ display: 'flex', mb: 2 }}
                                >
                                    <Avatar
                                        sx={{
                                            width: 20,
                                            height: 20,
                                            backgroundColor: 'primary.main',
                                            mr: 1.5,
                                        }}
                                    >
                                        {info.icon}
                                    </Avatar>
                                    <Box>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontSize: '0.875rem',
                                                fontWeight: 600,
                                                color: 'text.primary',
                                                mb: 0.5,
                                            }}
                                        >
                                            {info.title}
                                        </Typography>
                                        {info.details.map(
                                            (detail, detailIndex) => (
                                                <Typography
                                                    key={detailIndex}
                                                    variant="body2"
                                                    sx={{
                                                        fontSize: '0.8125rem',
                                                        color: 'text.secondary',
                                                    }}
                                                >
                                                    {detail}
                                                </Typography>
                                            )
                                        )}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                    {/* Quick Contact Form */}
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Box
                            sx={{
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateY(0)'
                                    : 'translateY(30px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
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
                                Contactez-nous
                            </Typography>
                            <Box
                                component="form"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1.5,
                                }}
                            >
                                <TextField
                                    fullWidth
                                    name="name"
                                    label="Nom & Prénom"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    size="small"
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            fontSize: '0.875rem',
                                        },
                                        '& .MuiInputBase-input': {
                                            fontSize: '0.875rem',
                                        },
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    name="email"
                                    label="Adresse Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    size="small"
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            fontSize: '0.875rem',
                                        },
                                        '& .MuiInputBase-input': {
                                            fontSize: '0.875rem',
                                        },
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    name="phone"
                                    label="Téléphone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    size="small"
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            fontSize: '0.875rem',
                                        },
                                        '& .MuiInputBase-input': {
                                            fontSize: '0.875rem',
                                        },
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    name="message"
                                    label="Message"
                                    multiline
                                    rows={3}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    size="small"
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            fontSize: '0.875rem',
                                        },
                                        '& .MuiInputBase-input': {
                                            fontSize: '0.875rem',
                                        },
                                    }}
                                />
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        mt: 1,
                                        py: 1,
                                        fontSize: '0.875rem',
                                        borderRadius: 1,
                                    }}
                                >
                                    Envoyer Nous un message
                                </Button>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Application CTA */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Box
                            sx={{
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateX(0)'
                                    : 'translateX(30px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
                            }}
                        >
                            <Paper
                                sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    backgroundColor: 'primary.50',
                                    border: '1px solid',
                                    borderColor: 'primary.100',
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        backgroundColor: 'primary.main',
                                        mx: 'auto',
                                        mb: 1.5,
                                    }}
                                >
                                    <Person />
                                </Avatar>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: '1.125rem',
                                        fontWeight: 600,
                                        mb: 1,
                                        color: 'primary.main',
                                    }}
                                >
                                    Commencez votre admission
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontSize: '0.8125rem',
                                        color: 'text.secondary',
                                        mb: 2,
                                    }}
                                >
                                    Commencez votre parcours d’admission via
                                    notre portail de candidature en ligne.
                                </Typography>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        py: 1,
                                        fontSize: '0.875rem',
                                        borderRadius: 1,
                                        mb: 1,
                                    }}
                                >
                                    Postulez maintenant
                                </Button>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        py: 1,
                                        fontSize: '0.875rem',
                                        borderRadius: 1,
                                    }}
                                >
                                    Planifier une visite
                                </Button>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
