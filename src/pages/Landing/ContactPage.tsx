import {
    AccessTime as HoursIcon,
    AssignmentTurnedIn as SubmitIcon,
    BusinessCenter as BusinessIcon,
    DirectionsBus as TransportIcon,
    Email as EmailIcon,
    EmojiPeople as SocialIcon,
    FitnessCenter as AthleticsIcon,
    HealthAndSafety as HealthIcon,
    LocalHospital as EmergencyIcon,
    LocationOn as LocationIcon,
    MenuBook as AcademicsIcon,
    Phone as PhoneIcon,
    School as AdmissionsIcon,
    Settings as TechIcon,
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { SectionHeader } from '../../components/landing/SectionHeader';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';

// Form data interface
interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    studentName: string;
    studentGrade: string;
    preferredContact: string;
    urgency: string;
}

// Form validation errors interface
interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
    subject?: string;
}

// Department data structure
interface Department {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    contact: {
        email: string;
        phone?: string;
        hours?: string;
    };
    color: string;
}

// Contact info structure
interface ContactInfo {
    type: string;
    icon: React.ReactNode;
    primary: string;
    secondary?: string;
    action?: string;
}

export const ContactPage: React.FC = () => {
    // Form state management
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        studentName: '',
        studentGrade: '',
        preferredContact: 'email',
        urgency: 'normal',
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Intersection observer hooks
    const { isIntersecting: isHeroIntersecting, targetRef: heroRef } =
        useIntersectionObserver({
            threshold: 0.1,
            freezeOnceVisible: true,
        });

    const { isIntersecting: isFormIntersecting, targetRef: formRef } =
        useIntersectionObserver({
            threshold: 0.1,
            freezeOnceVisible: true,
        });

    const {
        isIntersecting: isDepartmentsIntersecting,
        targetRef: departmentsRef,
    } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    const { isIntersecting: isInfoIntersecting, targetRef: infoRef } =
        useIntersectionObserver({
            threshold: 0.1,
            freezeOnceVisible: true,
        });

    // Department data
    const departments: Department[] = [
        {
            id: 'admissions',
            name: 'Admissions & Inscriptions',
            description:
                "Processus de candidature, questions d'inscription et accompagnement des nouveaux élèves.",
            icon: <AdmissionsIcon />,
            contact: {
                email: 'gbsleskamites@gmail.com',
                phone: '(237) 6 77 42 12 52',
                hours: 'Lun-Ven 08:00 - 17:00',
            },
            color: '#6366f1',
        },
        {
            id: 'academics',
            name: 'Affaires Académiques',
            description:
                'Questions liées au programme, soutien académique et conditions de diplomation.',
            icon: <AcademicsIcon />,
            contact: {
                email: 'gbsleskamites@gmail.com',
                phone: '(237) 6 77 42 12 52',
                hours: 'Lun-Ven 07:30 - 16:30',
            },
            color: '#8b5cf6',
        },
        {
            id: 'student-services',
            name: 'Services aux Élèves',
            description:
                'Orientation, accompagnement des étudiants et activités parascolaires.',
            icon: <SocialIcon />,
            contact: {
                email: 'gbsleskamites@gmail.com',
                phone: '(237) 6 77 42 12 52',
                hours: 'Lun-Ven 08:00 - 18:00',
            },
            color: '#10b981',
        },
        {
            id: 'athletics',
            name: 'Département des Sports',
            description:
                'Programmes sportifs, bourses sportives et informations sur les équipes.',
            icon: <AthleticsIcon />,
            contact: {
                email: 'gbsleskamites@gmail.com',
                phone: '(237) 6 77 42 12 52',
                hours: 'Lun-Sam 07:00 - 20:00',
            },
            color: '#f59e0b',
        },
        {
            id: 'facilities',
            name: 'Infrastructures & Maintenance',
            description:
                'Installations du campus, demandes de maintenance et informations sur les bâtiments.',
            icon: <BusinessIcon />,
            contact: {
                email: 'gbsleskamites@gmail.com',
                phone: '(237) 6 77 42 12 52',
                hours: 'Lun-Ven 07:00 - 15:30',
            },
            color: '#ef4444',
        },
        {
            id: 'technology',
            name: 'Support Informatique',
            description:
                'Assistance IT, accès au portail et support technique.',
            icon: <TechIcon />,
            contact: {
                email: 'gbsleskamites@gmail.com',
                phone: '(237) 6 77 42 12 52',
                hours: 'Lun-Ven 08:00 - 17:00',
            },
            color: '#8b5cf6',
        },
        {
            id: 'health',
            name: 'Santé & Bien-être',
            description:
                'Services infirmiers, dossiers médicaux et programmes de bien-être.',
            icon: <HealthIcon />,
            contact: {
                email: 'gbsleskamites@gmail.com',
                phone: '(237) 6 77 42 12 52',
                hours: 'Lun-Ven 08:00 - 16:00',
            },
            color: '#06b6d4',
        },
        {
            id: 'transportation',
            name: 'Transport',
            description:
                'Itinéraires des bus, demandes de transport et informations de sécurité.',
            icon: <TransportIcon />,
            contact: {
                email: 'gbsleskamites@gmail.com',
                phone: '(237) 6 77 42 12 52',
                hours: 'Lun-Ven 06:00 - 17:00',
            },
            color: '#84cc16',
        },
    ];

    // Contact information
    const contactInfo: ContactInfo[] = [
        {
            type: 'Phone',
            icon: <PhoneIcon />,
            primary: '+237 6 77 42 12 52',
            secondary: 'Ligne principale',
            action: 'tel:+237677421252',
        },
        {
            type: 'Email',
            icon: <EmailIcon />,
            primary: 'gbsleskamites@gmail.com',
            secondary: 'Renseignements généraux',
            action: 'mailto:gbsleskamites@gmail.com',
        },
        {
            type: 'Address',
            icon: <LocationIcon />,
            primary: 'SOA, lieu-dit EBOGO',
            secondary: 'Yaoundé, Cameroun',
        },
        {
            type: 'Hours',
            icon: <HoursIcon />,
            primary: 'Lundi - Vendredi',
            secondary: '07:30 - 17:00',
        },
        {
            type: 'Emergency',
            icon: <EmergencyIcon />,
            primary: '+237 6 77 42 12 52',
            secondary: "Urgence (en dehors des heures d'ouverture)",
            action: 'tel:+237677421252',
        },
    ];

    // Form validation
    const validateForm = (): boolean => {
        const errors: FormErrors = {};

        if (!formData.name.trim()) {
            errors.name = 'Le nom est requis';
        }

        if (!formData.email.trim()) {
            errors.email = "L'adresse email est requise";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Veuillez entrer une adresse email valide';
        }

        if (!formData.subject) {
            errors.subject = 'Veuillez sélectionner un sujet';
        }

        if (!formData.message.trim()) {
            errors.message = 'Le message est requis';
        } else if (formData.message.length < 10) {
            errors.message = 'Le message doit contenir au moins 10 caractères';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            setShowSuccess(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
                studentName: '',
                studentGrade: '',
                preferredContact: 'email',
                urgency: 'normal',
            });
            setFormErrors({});
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Form field handlers
    const handleInputChange =
        (field: keyof ContactFormData) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormData(prev => ({ ...prev, [field]: e.target.value }));
            if (formErrors[field as keyof FormErrors]) {
                setFormErrors(prev => ({ ...prev, [field]: undefined }));
            }
        };

    const handleSelectChange = (field: keyof ContactFormData) => (e: any) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        if (formErrors[field as keyof FormErrors]) {
            setFormErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const handleContactClick = (action?: string) => {
        if (action) {
            window.location.href = action;
        }
    };

    return (
        <Box
            component="main"
            sx={{
                minHeight: '100vh',
                pt: { xs: 12, md: 14 },
                pb: { xs: 8, md: 12 },
                backgroundColor: '#fefefe',
            }}
        >
            {/* Hero Section */}
            <Box
                ref={heroRef}
                component="section"
                sx={{
                    py: { xs: 8, md: 12 },
                    background:
                        'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            textAlign: 'center',
                            position: 'relative',
                            zIndex: 2,
                            opacity: isHeroIntersecting ? 1 : 0,
                            transform: isHeroIntersecting
                                ? 'translateY(0)'
                                : 'translateY(30px)',
                            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.8125rem',
                                fontWeight: 600,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                opacity: 0.9,
                                mb: 2,
                                display: 'block',
                            }}
                        >
                            Prendre contact
                        </Typography>

                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: {
                                    xs: '2.5rem',
                                    md: '3.5rem',
                                    lg: '4rem',
                                },
                                fontWeight: 700,
                                mb: 3,
                                lineHeight: 1.1,
                            }}
                        >
                            Contactez Nous
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: '1rem', md: '1.125rem' },
                                opacity: 0.95,
                                maxWidth: '600px',
                                mx: 'auto',
                                lineHeight: 1.6,
                            }}
                        >
                            Nous sommes là pour aider les parents, les élèves et
                            les membres de la communauté à entrer en contact
                            avec notre établissement. N’hésitez pas à nous
                            contacter pour toute question, préoccupation ou pour
                            en savoir plus sur nos programmes.
                        </Typography>
                    </Box>
                </Container>
            </Box>

            {/* Contact Form & Information Section */}
            <Box
                ref={formRef}
                component="section"
                sx={{
                    py: { xs: 8, md: 12 },
                    backgroundColor: '#ffffff',
                }}
            >
                <Container maxWidth="lg">
                    <SectionHeader
                        title="Envoyez-nous un message"
                        subtitle="Complétez le formulaire ci-dessous et nous vous répondrons dès que possible."
                        align="center"
                        gradient
                    />

                    <Grid container spacing={{ xs: 4, md: 8 }}>
                        {/* Contact Form */}
                        <Grid size={{ xs: 12, lg: 8 }}>
                            <Card
                                component="form"
                                onSubmit={handleSubmit}
                                sx={{
                                    p: { xs: 3, md: 4 },
                                    borderRadius: 1,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    boxShadow: 'none',
                                    opacity: isFormIntersecting ? 1 : 0,
                                    transform: isFormIntersecting
                                        ? 'translateY(0)'
                                        : 'translateY(30px)',
                                    transition:
                                        'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: '0.2s',
                                }}
                            >
                                <Grid container spacing={3}>
                                    {/* Name and Email */}
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Nom"
                                            value={formData.name}
                                            onChange={handleInputChange('name')}
                                            error={!!formErrors.name}
                                            helperText={formErrors.name}
                                            required
                                            size="medium"
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            fullWidth
                                            type="email"
                                            label="Addresse mail"
                                            value={formData.email}
                                            onChange={handleInputChange(
                                                'email'
                                            )}
                                            error={!!formErrors.email}
                                            helperText={formErrors.email}
                                            required
                                            size="medium"
                                        />
                                    </Grid>

                                    {/* Phone and Subject */}
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Téléphone (Optionnel)"
                                            value={formData.phone}
                                            onChange={handleInputChange(
                                                'phone'
                                            )}
                                            size="medium"
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <FormControl
                                            fullWidth
                                            error={!!formErrors.subject}
                                            required
                                        >
                                            <InputLabel>
                                                Objet / Service
                                            </InputLabel>
                                            <Select
                                                value={formData.subject}
                                                onChange={handleSelectChange(
                                                    'subject'
                                                )}
                                                label="Subject / Department"
                                                size="medium"
                                            >
                                                <MenuItem value="academics">
                                                    Affaires académiques
                                                </MenuItem>
                                                <MenuItem value="student-services">
                                                    Services aux étudiants
                                                </MenuItem>
                                                <MenuItem value="athletics">
                                                    Sports
                                                </MenuItem>
                                                <MenuItem value="facilities">
                                                    Infrastructures &
                                                    Maintenance
                                                </MenuItem>
                                                <MenuItem value="technology">
                                                    Support informatique
                                                </MenuItem>
                                                <MenuItem value="health">
                                                    Santé & Bien-être
                                                </MenuItem>
                                                <MenuItem value="transportation">
                                                    Transport
                                                </MenuItem>
                                            </Select>
                                            {formErrors.subject && (
                                                <FormHelperText>
                                                    {formErrors.subject}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>

                                    {/* Student Information */}
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Nom de l'élève (Si Applicable)"
                                            value={formData.studentName}
                                            onChange={handleInputChange(
                                                'studentName'
                                            )}
                                            size="medium"
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Student Grade (If Applicable)"
                                            value={formData.studentGrade}
                                            onChange={handleInputChange(
                                                'studentGrade'
                                            )}
                                            size="medium"
                                        />
                                    </Grid>

                                    {/* Preferences */}
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <FormControl fullWidth>
                                            <InputLabel>
                                                Comment souhaitez-vous être
                                                contacté ?
                                            </InputLabel>
                                            <Select
                                                value={
                                                    formData.preferredContact
                                                }
                                                onChange={handleSelectChange(
                                                    'preferredContact'
                                                )}
                                                label="Preffered Contact Method"
                                                size="medium"
                                            >
                                                <MenuItem value="email">
                                                    Email
                                                </MenuItem>
                                                <MenuItem value="phone">
                                                    Téléphone
                                                </MenuItem>
                                                <MenuItem value="both">
                                                    Les deux
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <FormControl fullWidth>
                                            <InputLabel>
                                                Niveau D'Urgence
                                            </InputLabel>
                                            <Select
                                                value={formData.urgency}
                                                onChange={handleSelectChange(
                                                    'urgency'
                                                )}
                                                label="Urgency Level"
                                                size="medium"
                                            >
                                                <MenuItem value="low">
                                                    Faible - Demande générale
                                                </MenuItem>
                                                <MenuItem value="normal">
                                                    Normal - Réponse sous 24 à
                                                    48 heures
                                                </MenuItem>
                                                <MenuItem value="high">
                                                    Élevé - Réponse rapide
                                                    souhaitée
                                                </MenuItem>
                                                <MenuItem value="urgent">
                                                    Urgent - Attention immédiate
                                                    requise
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    {/* Message */}
                                    <Grid size={{ xs: 12 }}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={4}
                                            label="Votre Message"
                                            value={formData.message}
                                            onChange={handleInputChange(
                                                'message'
                                            )}
                                            error={!!formErrors.message}
                                            helperText={
                                                formErrors.message ||
                                                'Merci de fournir les détails de votre demande'
                                            }
                                            required
                                        />
                                    </Grid>

                                    {/* Submit Button */}
                                    <Grid size={{ xs: 12 }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            disabled={isSubmitting}
                                            startIcon={<SubmitIcon />}
                                            sx={{
                                                background:
                                                    'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                                color: 'white',
                                                fontWeight: 600,
                                                px: 4,
                                                py: 1.5,
                                                borderRadius: 1,
                                                textTransform: 'none',
                                                fontSize: '0.875rem',
                                                '&:hover': {
                                                    background:
                                                        'linear-gradient(135deg, #5048e5, #7c3aed)',
                                                },
                                                '&.Mui-disabled': {
                                                    background: '#e5e7eb',
                                                    color: '#9ca3af',
                                                },
                                            }}
                                        >
                                            {isSubmitting
                                                ? ' Envoi de Message...'
                                                : 'Envoyez le Message'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>

                        {/* Contact Information */}
                        <Grid size={{ xs: 12, lg: 4 }}>
                            <Box
                                sx={{
                                    opacity: isFormIntersecting ? 1 : 0,
                                    transform: isFormIntersecting
                                        ? 'translateY(0)'
                                        : 'translateY(30px)',
                                    transition:
                                        'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: '0.4s',
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        mb: 3,
                                        fontSize: {
                                            xs: '1rem',
                                            md: '1.125rem',
                                        },
                                    }}
                                >
                                    Coordonnées
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 3,
                                    }}
                                >
                                    {contactInfo.map(contact => (
                                        <Box
                                            key={contact.type}
                                            onClick={() =>
                                                handleContactClick(
                                                    contact.action
                                                )
                                            }
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: 2,
                                                p: 2,
                                                borderRadius: 1,
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                cursor: contact.action
                                                    ? 'pointer'
                                                    : 'default',
                                                transition:
                                                    'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                '&:hover': contact.action
                                                    ? {
                                                          borderColor:
                                                              'primary.main',
                                                          backgroundColor:
                                                              'action.hover',
                                                      }
                                                    : {},
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    color: 'primary.main',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    mt: 0.25,
                                                }}
                                            >
                                                {contact.icon}
                                            </Box>
                                            <Box>
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: '0.875rem',
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    {contact.primary}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: 'text.secondary',
                                                        fontSize: '0.8125rem',
                                                    }}
                                                >
                                                    {contact.secondary}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Department Directory Section */}
            <Box
                ref={departmentsRef}
                component="section"
                sx={{
                    py: { xs: 8, md: 12 },
                    backgroundColor: '#f8fafc',
                }}
            >
                <Container maxWidth="lg">
                    <SectionHeader
                        title="Annuaire des départements"
                        subtitle="Entrez directement en contact avec les services concernés pour obtenir une réponse plus rapide à vos questions."
                        align="center"
                        gradient
                    />

                    <Grid container spacing={{ xs: 3, md: 4 }}>
                        {departments.map((department, index) => (
                            <Grid
                                key={department.id}
                                size={{ xs: 12, sm: 6, lg: 3 }}
                            >
                                <Card
                                    sx={{
                                        height: '100%',
                                        borderRadius: 1,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        boxShadow: 'none',
                                        transition:
                                            'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        opacity: isDepartmentsIntersecting
                                            ? 1
                                            : 0,
                                        transform: isDepartmentsIntersecting
                                            ? 'translateY(0)'
                                            : 'translateY(30px)',
                                        transitionDelay: `${index * 0.1}s`,
                                        '&:hover': {
                                            borderColor: department.color,
                                            transform: 'translateY(-8px)',
                                        },
                                    }}
                                >
                                    <CardContent sx={{ p: 3 }}>
                                        <Box
                                            sx={{
                                                width: 48,
                                                height: 48,
                                                borderRadius: 1.5,
                                                backgroundColor: `${department.color}15`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mb: 2,
                                                color: department.color,
                                            }}
                                        >
                                            {department.icon}
                                        </Box>

                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 1.5,
                                                fontSize: '0.875rem',
                                                lineHeight: 1.3,
                                            }}
                                        >
                                            {department.name}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'text.secondary',
                                                mb: 2,
                                                fontSize: '0.8125rem',
                                                lineHeight: 1.5,
                                            }}
                                        >
                                            {department.description}
                                        </Typography>

                                        <Box sx={{ mt: 'auto' }}>
                                            <Typography
                                                component="a"
                                                href={`mailto:${department.contact.email}`}
                                                sx={{
                                                    display: 'block',
                                                    color: department.color,
                                                    textDecoration: 'none',
                                                    fontSize: '0.8125rem',
                                                    fontWeight: 600,
                                                    mb: 0.5,
                                                    '&:hover': {
                                                        textDecoration:
                                                            'underline',
                                                    },
                                                }}
                                            >
                                                {department.contact.email}
                                            </Typography>

                                            {department.contact.phone && (
                                                <Typography
                                                    component="a"
                                                    href={`tel:${department.contact.phone.replace(/[^\d]/g, '')}`}
                                                    sx={{
                                                        display: 'block',
                                                        color: 'text.secondary',
                                                        textDecoration: 'none',
                                                        fontSize: '0.8125rem',
                                                        mb: 0.5,
                                                        '&:hover': {
                                                            color: 'text.primary',
                                                        },
                                                    }}
                                                >
                                                    {department.contact.phone}
                                                </Typography>
                                            )}

                                            {department.contact.hours && (
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: 'text.secondary',
                                                        fontSize: '0.75rem',
                                                    }}
                                                >
                                                    {department.contact.hours}
                                                </Typography>
                                            )}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Location & Emergency Information */}
            <Box
                ref={infoRef}
                component="section"
                sx={{
                    py: { xs: 8, md: 12 },
                    backgroundColor: '#ffffff',
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={{ xs: 6, md: 8 }}>
                        {/* Location Information */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box
                                sx={{
                                    opacity: isInfoIntersecting ? 1 : 0,
                                    transform: isInfoIntersecting
                                        ? 'translateX(0)'
                                        : 'translateX(-30px)',
                                    transition:
                                        'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: '0.2s',
                                }}
                            >
                                <SectionHeader
                                    title="Visitez notre campus"
                                    subtitle="Nous serons ravis de vous accueillir et de vous faire découvrir notre communauté scolaire dynamique."
                                    gradient
                                />

                                <Card
                                    sx={{
                                        p: 4,
                                        borderRadius: 1,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        boxShadow: 'none',
                                        background:
                                            'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 2,
                                            fontSize: '0.875rem',
                                        }}
                                    >
                                        Adresse scolaire
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: '0.875rem',
                                            lineHeight: 1.6,
                                            mb: 3,
                                        }}
                                    >
                                        GBS Les Kamites
                                        <br />
                                        SOA , lieu-dit EBOGO
                                        <br />
                                        Yaoundé , Cameroun
                                    </Typography>

                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 2,
                                            fontSize: '0.875rem',
                                        }}
                                    >
                                        Itinéraire
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: '0.875rem',
                                            lineHeight: 1.6,
                                            color: 'text.secondary',
                                            mb: 3,
                                        }}
                                    >
                                        Notre établissement est situé à SOA,
                                        EBOGO (Yaoundé), dans un environnement
                                        facilement accessible en transport en
                                        commun. Un parking visiteurs est
                                        disponible sur le site principal, près
                                        du bâtiment administratif.
                                    </Typography>

                                    <Button
                                        variant="outlined"
                                        startIcon={<LocationIcon />}
                                        href="https://maps.google.com"
                                        target="_blank"
                                        sx={{
                                            borderColor: 'primary.main',
                                            color: 'primary.main',
                                            fontWeight: 600,
                                            textTransform: 'none',
                                            fontSize: '0.875rem',
                                            '&:hover': {
                                                backgroundColor: 'primary.main',
                                                color: 'white',
                                            },
                                        }}
                                    >
                                        Voir sur Google Maps
                                    </Button>
                                </Card>
                            </Box>
                        </Grid>

                        {/* Emergency & After Hours */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box
                                sx={{
                                    opacity: isInfoIntersecting ? 1 : 0,
                                    transform: isInfoIntersecting
                                        ? 'translateX(0)'
                                        : 'translateX(30px)',
                                    transition:
                                        'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: '0.4s',
                                }}
                            >
                                <SectionHeader
                                    title="Contacts d’urgence"
                                    subtitle="Pour toute situation urgente en dehors des heures de service."
                                    gradient
                                />

                                <Card
                                    sx={{
                                        p: 4,
                                        borderRadius: 1,
                                        border: '1px solid',
                                        borderColor: 'error.light',
                                        boxShadow: 'none',
                                        background:
                                            'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)',
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 2,
                                            fontSize: '0.875rem',
                                            color: 'error.main',
                                        }}
                                    >
                                        Line D'Urgence
                                    </Typography>

                                    <Typography
                                        component="a"
                                        href="tel:+15559114357"
                                        sx={{
                                            display: 'block',
                                            fontSize: '1.125rem',
                                            fontWeight: 600,
                                            color: 'error.main',
                                            textDecoration: 'none',
                                            mb: 1,
                                            '&:hover': {
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >
                                        (237) 119-HELP
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: '0.8125rem',
                                            color: 'text.secondary',
                                            mb: 3,
                                        }}
                                    >
                                        Disponible 24h/24 et 7j/7 en cas
                                        d’urgence réelle
                                    </Typography>

                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 2,
                                            fontSize: '0.875rem',
                                        }}
                                    >
                                        Assistance hors horaires de service
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: '0.875rem',
                                            lineHeight: 1.6,
                                            color: 'text.secondary',
                                            mb: 3,
                                        }}
                                    >
                                        Pour les demandes non urgentes en dehors
                                        des heures de service, veuillez utiliser
                                        le formulaire de contact ci-dessus ou
                                        nous envoyer un email. Nous vous
                                        répondrons sous 24 heures en semaine.
                                    </Typography>

                                    <Alert
                                        severity="info"
                                        sx={{
                                            fontSize: '0.8125rem',
                                            '& .MuiAlert-message': {
                                                fontSize: 'inherit',
                                            },
                                        }}
                                    >
                                        Pour toute urgence médicale, appelez
                                        d’abord le 119, puis contactez la ligne
                                        d’urgence de l’établissement.
                                    </Alert>
                                </Card>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Success Snackbar */}
            <Snackbar
                open={showSuccess}
                autoHideDuration={6000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setShowSuccess(false)}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Merci ! Votre message a bien été envoyé. Nous revenons vers
                    vous très bientôt.
                </Alert>
            </Snackbar>
        </Box>
    );
};
