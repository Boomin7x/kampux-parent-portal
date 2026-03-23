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
            title: 'Inquiry & Information',
            description: 'Learn about our programs and admission requirements',
            icon: <Info />,
            details: [
                'Browse our academic programs and curriculum',
                'Attend virtual or in-person information sessions',
                'Connect with our admissions counselors',
                'Schedule a campus tour',
            ],
            required: false,
            timeline: 'Anytime',
        },
        {
            id: '2',
            title: 'Application Submission',
            description: 'Complete and submit your admission application',
            icon: <Assignment />,
            details: [
                'Fill out the online application form',
                'Pay non-refundable application fee',
                'Submit required documents',
                'Provide emergency contact information',
            ],
            required: true,
            timeline: 'By January 15',
        },
        {
            id: '3',
            title: 'Document Review',
            description: 'Our team reviews your complete application',
            icon: <Description />,
            details: [
                'Academic transcripts evaluation',
                'Previous school records verification',
                'Character reference checks',
                'Medical history review',
            ],
            required: true,
            timeline: '2-3 weeks',
        },
        {
            id: '4',
            title: 'Assessment & Interview',
            description: 'Academic assessment and family interview',
            icon: <School />,
            details: [
                'Age-appropriate academic assessment',
                'Family interview with admissions team',
                'Student interaction session',
                'Special needs evaluation (if applicable)',
            ],
            required: true,
            timeline: 'Within 1 week of review',
        },
        {
            id: '5',
            title: 'Admission Decision',
            description: 'Receive your admission notification',
            icon: <Verified />,
            details: [
                'Official admission decision letter',
                'Enrollment package and next steps',
                'Financial aid notification (if applicable)',
                'Orientation session scheduling',
            ],
            required: false,
            timeline: 'Within 5 business days',
        },
        {
            id: '6',
            title: 'Enrollment & Preparation',
            description: 'Complete enrollment and prepare for the new year',
            icon: <CheckCircle />,
            details: [
                'Submit enrollment deposit',
                'Complete health and immunization forms',
                'Purchase uniforms and supplies',
                'Attend new student orientation',
            ],
            required: true,
            timeline: 'By March 1',
        },
    ];

    // Requirements data
    const admissionRequirements: AdmissionRequirement[] = [
        {
            id: '1',
            category: 'Academic Records',
            title: 'Previous School Transcripts',
            description:
                'Official transcripts from current and previous schools',
            documents: [
                'Current year report cards',
                'Previous 2 years transcripts',
                'Standardized test scores (if available)',
                'Teacher recommendations',
            ],
            deadline: 'January 15, 2026',
            priority: 'high',
        },
        {
            id: '2',
            category: 'Personal Information',
            title: 'Student & Family Details',
            description: 'Complete personal and family information',
            documents: [
                'Birth certificate (certified copy)',
                'Passport or ID documents',
                'Proof of residency',
                'Family contact information',
            ],
            deadline: 'January 15, 2026',
            priority: 'high',
        },
        {
            id: '3',
            category: 'Health & Medical',
            title: 'Medical Documentation',
            description: 'Current health records and immunization history',
            documents: [
                'Current immunization records',
                'Medical examination report',
                'Special needs documentation (if applicable)',
                'Emergency medical information',
            ],
            deadline: 'February 1, 2026',
            priority: 'medium',
        },
        {
            id: '4',
            category: 'Financial',
            title: 'Financial Information',
            description:
                'Financial documentation for tuition and aid consideration',
            documents: [
                'Financial aid application (if applying)',
                'Income verification documents',
                'Bank statements (for international students)',
                'Scholarship application materials',
            ],
            deadline: 'January 31, 2026',
            priority: 'medium',
        },
    ];

    // Fee structure data
    const feeStructures: FeeStructure[] = [
        {
            id: '1',
            grade: 'Pre-K & Kindergarten',
            tuitionFee: 12500,
            additionalFees: [
                { name: 'Registration Fee', amount: 500, required: true },
                { name: 'Technology Fee', amount: 300, required: true },
                { name: 'Activity Fee', amount: 250, required: true },
                { name: 'Lunch Program', amount: 1200, required: false },
                { name: 'After School Care', amount: 2000, required: false },
            ],
            totalEstimate: 14750,
            paymentPlans: [
                'Annual Payment',
                '2 Semester Plan',
                '10 Month Plan',
            ],
        },
        {
            id: '2',
            grade: 'Elementary (Grades 1-5)',
            tuitionFee: 14500,
            additionalFees: [
                { name: 'Registration Fee', amount: 500, required: true },
                { name: 'Technology Fee', amount: 400, required: true },
                { name: 'Activity Fee', amount: 350, required: true },
                { name: 'Lunch Program', amount: 1200, required: false },
                { name: 'After School Care', amount: 2000, required: false },
                { name: 'Field Trip Fund', amount: 150, required: false },
            ],
            totalEstimate: 16900,
            paymentPlans: [
                'Annual Payment',
                '2 Semester Plan',
                '10 Month Plan',
            ],
        },
        {
            id: '3',
            grade: 'Middle School (Grades 6-8)',
            tuitionFee: 16500,
            additionalFees: [
                { name: 'Registration Fee', amount: 500, required: true },
                { name: 'Technology Fee', amount: 500, required: true },
                { name: 'Activity Fee', amount: 400, required: true },
                { name: 'Lab Fee', amount: 300, required: true },
                { name: 'Lunch Program', amount: 1200, required: false },
                { name: 'Sports Program', amount: 400, required: false },
            ],
            totalEstimate: 19800,
            paymentPlans: [
                'Annual Payment',
                '2 Semester Plan',
                '10 Month Plan',
            ],
        },
        {
            id: '4',
            grade: 'High School (Grades 9-12)',
            tuitionFee: 18500,
            additionalFees: [
                { name: 'Registration Fee', amount: 500, required: true },
                { name: 'Technology Fee', amount: 600, required: true },
                { name: 'Activity Fee', amount: 500, required: true },
                { name: 'Lab Fee', amount: 400, required: true },
                { name: 'Graduation Fee', amount: 200, required: true },
                { name: 'Lunch Program', amount: 1200, required: false },
                { name: 'AP Exam Fees', amount: 600, required: false },
            ],
            totalEstimate: 22500,
            paymentPlans: [
                'Annual Payment',
                '2 Semester Plan',
                '10 Month Plan',
            ],
        },
    ];

    // Important dates data
    const importantDates: ImportantDate[] = [
        {
            id: '1',
            title: 'Application Opens',
            date: 'October 1, 2025',
            description:
                'Online application portal becomes available for new families',
            type: 'event',
        },
        {
            id: '2',
            title: 'Information Sessions Begin',
            date: 'October 15, 2025',
            description: 'Virtual and in-person information sessions start',
            type: 'event',
        },
        {
            id: '3',
            title: 'Application Deadline',
            date: 'January 15, 2026',
            description: 'Final deadline for admission application submission',
            type: 'deadline',
        },
        {
            id: '4',
            title: 'Document Deadline',
            date: 'February 1, 2026',
            description: 'All supporting documents must be received',
            type: 'deadline',
        },
        {
            id: '5',
            title: 'Assessment Period',
            date: 'February 1-28, 2026',
            description: 'Student assessments and family interviews conducted',
            type: 'event',
        },
        {
            id: '6',
            title: 'Admission Notifications',
            date: 'March 15, 2026',
            description: 'Admission decisions sent to all applicant families',
            type: 'notification',
        },
        {
            id: '7',
            title: 'Enrollment Deadline',
            date: 'April 1, 2026',
            description: 'Deadline to confirm enrollment with deposit',
            type: 'deadline',
        },
        {
            id: '8',
            title: 'New Student Orientation',
            date: 'August 15, 2026',
            description: 'Welcome orientation for new students and families',
            type: 'event',
        },
    ];

    // FAQ data
    const faqItems: FAQItem[] = [
        {
            id: '1',
            question: 'What is the application deadline?',
            answer: 'The application deadline is January 15, 2026. We encourage early submission as we review applications on a rolling basis and some programs may fill before the deadline.',
            category: 'general',
        },
        {
            id: '2',
            question: 'Is there an application fee?',
            answer: 'Yes, there is a non-refundable application fee of $100. This fee helps cover the cost of processing your application and conducting assessments.',
            category: 'financial',
        },
        {
            id: '3',
            question: 'What curriculum do you follow?',
            answer: 'We follow an enhanced national curriculum with international standards, incorporating STEM education, arts integration, and character development programs.',
            category: 'academic',
        },
        {
            id: '4',
            question: 'Do you offer financial aid or scholarships?',
            answer: 'Yes, we offer need-based financial aid and merit scholarships. Financial aid applications must be submitted by January 31, 2026. Merit scholarships are awarded based on academic performance and special talents.',
            category: 'financial',
        },
        {
            id: '5',
            question: 'What is the student-to-teacher ratio?',
            answer: 'We maintain small class sizes with a student-to-teacher ratio of 15:1 in elementary grades and 18:1 in middle and high school grades to ensure personalized attention.',
            category: 'academic',
        },
        {
            id: '6',
            question: 'Do you provide transportation?',
            answer: 'Yes, we offer bus transportation to various neighborhoods. Transportation fees range from $800-1200 per year depending on the route distance.',
            category: 'logistics',
        },
        {
            id: '7',
            question: 'What extracurricular activities are available?',
            answer: 'We offer a wide range of activities including sports teams, music and drama programs, academic clubs, community service opportunities, and leadership development programs.',
            category: 'general',
        },
        {
            id: '8',
            question: 'Can we schedule a campus visit?',
            answer: 'Absolutely! We encourage campus visits. You can schedule individual tours or attend our group information sessions. Virtual tours are also available for families unable to visit in person.',
            category: 'general',
        },
        {
            id: '9',
            question:
                'What support is available for students with learning differences?',
            answer: 'We have a dedicated learning support team that works with students who have diagnosed learning differences. We provide individualized education plans and specialized support services.',
            category: 'academic',
        },
        {
            id: '10',
            question: 'What is the dress code policy?',
            answer: 'We have a uniform policy that promotes equality and school spirit. Uniform details and approved vendors are provided upon enrollment. The estimated cost is $300-500 per student.',
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
                title="Admission Information"
                subtitle="Join our community of learners and discover the path to academic excellence"
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
            title: 'Academic Excellence',
            description:
                'Top 5% nationally ranked school with 98% university acceptance rate',
            color: '#6366f1',
        },
        {
            icon: <Group />,
            title: 'Small Classes',
            description:
                '15:1 student-to-teacher ratio ensuring personalized attention',
            color: '#8b5cf6',
        },
        {
            icon: <MenuBook />,
            title: 'Holistic Education',
            description:
                'Comprehensive curriculum with STEM, arts, and character development',
            color: '#06b6d4',
        },
        {
            icon: <Timeline />,
            title: 'Proven Track Record',
            description:
                '15+ years of educational excellence and student success',
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
                        Why Choose Excellence Academy?
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
                        We are committed to providing exceptional education that
                        nurtures intellectual curiosity, character development,
                        and prepares students for success in an ever-changing
                        world. Our admission process is designed to identify
                        students who will thrive in our collaborative learning
                        environment.
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
                        Application Process
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
                        Follow these six simple steps to complete your admission
                        application
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
                                            Step {parseInt(step.id)}:{' '}
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
            case 'high':
                return 'error';
            case 'medium':
                return 'warning';
            case 'low':
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
                        Admission Requirements
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
                        Complete document checklist to ensure a smooth admission
                        process
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
                                        Deadline: {requirement.deadline}
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
            case 'deadline':
                return 'error.main';
            case 'event':
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
                        Important Dates & Deadlines
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
                        Mark your calendar with these key dates in the admission
                        process
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
                        Tuition & Fees
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
                        Transparent pricing with flexible payment options to
                        support your family's educational investment
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
                                                Base Tuition
                                            </Typography>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontSize: '0.875rem',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                $
                                                {structure.tuitionFee.toLocaleString()}
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
                                            ADDITIONAL FEES
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
                                                        $
                                                        {fee.amount.toLocaleString()}
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
                                            Estimated Total (with required fees)
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontSize: '0.875rem',
                                                fontWeight: 600,
                                                color: 'primary.main',
                                            }}
                                        >
                                            $
                                            {structure.totalEstimate.toLocaleString()}
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
                                            PAYMENT PLAN OPTIONS
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
                        Financial Aid Available
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: '0.8125rem',
                            color: 'text.secondary',
                            lineHeight: 1.4,
                        }}
                    >
                        We believe that financial circumstances should not be a
                        barrier to excellent education. Need-based financial aid
                        and merit scholarships are available for qualifying
                        families. Contact our admissions office for more
                        information about financial assistance options.
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
        { value: 'all', label: 'All Questions' },
        { value: 'general', label: 'General' },
        { value: 'academic', label: 'Academic' },
        { value: 'financial', label: 'Financial' },
        { value: 'logistics', label: 'Logistics' },
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
                        Frequently Asked Questions
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
                        Find answers to common questions about our admission
                        process
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
            title: 'Phone',
            details: ['+1 (555) 123-4567', 'Mon-Fri: 8:00 AM - 4:00 PM'],
        },
        {
            icon: <Email />,
            title: 'Email',
            details: [
                'admissions@excellenceacademy.edu',
                'Response within 24 hours',
            ],
        },
        {
            icon: <LocationOn />,
            title: 'Visit Us',
            details: ['123 Excellence Avenue', 'Academic City, AC 12345'],
        },
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
                        Ready to Apply?
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
                        Start your journey with Excellence Academy today or get
                        in touch with our admission team
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
                                Contact Information
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
                                Get In Touch
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
                                    label="Full Name"
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
                                    label="Email Address"
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
                                    label="Phone Number"
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
                                    Send Message
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
                                    Start Your Application
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontSize: '0.8125rem',
                                        color: 'text.secondary',
                                        mb: 2,
                                    }}
                                >
                                    Begin your admission journey with our online
                                    application portal.
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
                                    Apply Now
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
                                    Schedule Tour
                                </Button>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
