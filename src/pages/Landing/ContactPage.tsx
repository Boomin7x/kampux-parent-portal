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
            name: 'Admissions & Enrollment',
            description:
                'Application process, enrollment questions, and new student support.',
            icon: <AdmissionsIcon />,
            contact: {
                email: 'admissions@school.edu',
                phone: '(555) 123-4567',
                hours: 'Mon-Fri 8:00 AM - 5:00 PM',
            },
            color: '#6366f1',
        },
        {
            id: 'academics',
            name: 'Academic Affairs',
            description:
                'Curriculum questions, academic support, and graduation requirements.',
            icon: <AcademicsIcon />,
            contact: {
                email: 'academics@school.edu',
                phone: '(555) 123-4568',
                hours: 'Mon-Fri 7:30 AM - 4:30 PM',
            },
            color: '#8b5cf6',
        },
        {
            id: 'student-services',
            name: 'Student Services',
            description:
                'Counseling, student support, and extracurricular activities.',
            icon: <SocialIcon />,
            contact: {
                email: 'services@school.edu',
                phone: '(555) 123-4569',
                hours: 'Mon-Fri 8:00 AM - 6:00 PM',
            },
            color: '#10b981',
        },
        {
            id: 'athletics',
            name: 'Athletics Department',
            description:
                'Sports programs, athletic scholarships, and team information.',
            icon: <AthleticsIcon />,
            contact: {
                email: 'athletics@school.edu',
                phone: '(555) 123-4570',
                hours: 'Mon-Sat 7:00 AM - 8:00 PM',
            },
            color: '#f59e0b',
        },
        {
            id: 'facilities',
            name: 'Facilities & Maintenance',
            description:
                'Campus facilities, maintenance requests, and building information.',
            icon: <BusinessIcon />,
            contact: {
                email: 'facilities@school.edu',
                phone: '(555) 123-4571',
                hours: 'Mon-Fri 7:00 AM - 3:30 PM',
            },
            color: '#ef4444',
        },
        {
            id: 'technology',
            name: 'Technology Support',
            description: 'IT support, portal access, and technical assistance.',
            icon: <TechIcon />,
            contact: {
                email: 'tech@school.edu',
                phone: '(555) 123-4572',
                hours: 'Mon-Fri 8:00 AM - 5:00 PM',
            },
            color: '#8b5cf6',
        },
        {
            id: 'health',
            name: 'Health & Wellness',
            description:
                'Nurse services, health records, and wellness programs.',
            icon: <HealthIcon />,
            contact: {
                email: 'health@school.edu',
                phone: '(555) 123-4573',
                hours: 'Mon-Fri 8:00 AM - 4:00 PM',
            },
            color: '#06b6d4',
        },
        {
            id: 'transportation',
            name: 'Transportation',
            description:
                'Bus routes, transportation requests, and safety information.',
            icon: <TransportIcon />,
            contact: {
                email: 'transport@school.edu',
                phone: '(555) 123-4574',
                hours: 'Mon-Fri 6:00 AM - 5:00 PM',
            },
            color: '#84cc16',
        },
    ];

    // Contact information
    const contactInfo: ContactInfo[] = [
        {
            type: 'Phone',
            icon: <PhoneIcon />,
            primary: '(555) 123-4567',
            secondary: 'Main Office Line',
            action: 'tel:+15551234567',
        },
        {
            type: 'Email',
            icon: <EmailIcon />,
            primary: 'info@school.edu',
            secondary: 'General Inquiries',
            action: 'mailto:info@school.edu',
        },
        {
            type: 'Address',
            icon: <LocationIcon />,
            primary: '123 Education Way',
            secondary: 'Your City, State 12345',
        },
        {
            type: 'Hours',
            icon: <HoursIcon />,
            primary: 'Monday - Friday',
            secondary: '7:30 AM - 5:00 PM',
        },
        {
            type: 'Emergency',
            icon: <EmergencyIcon />,
            primary: '(555) 911-HELP',
            secondary: 'After Hours Emergency',
            action: 'tel:+15559114357',
        },
    ];

    // Form validation
    const validateForm = (): boolean => {
        const errors: FormErrors = {};

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!formData.subject) {
            errors.subject = 'Please select a subject';
        }

        if (!formData.message.trim()) {
            errors.message = 'Message is required';
        } else if (formData.message.length < 10) {
            errors.message = 'Message must be at least 10 characters';
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
                            Get In Touch
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
                            Contact Our School
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
                            We're here to help parents, students, and community
                            members connect with our school community. Reach out
                            with questions, concerns, or to learn more about our
                            programs.
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
                        title="Send Us a Message"
                        subtitle="Fill out the form below and we'll get back to you as soon as possible."
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
                                            label="Full Name"
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
                                            label="Email Address"
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
                                            label="Phone Number (Optional)"
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
                                                Subject / Department
                                            </InputLabel>
                                            <Select
                                                value={formData.subject}
                                                onChange={handleSelectChange(
                                                    'subject'
                                                )}
                                                label="Subject / Department"
                                                size="medium"
                                            >
                                                <MenuItem value="general">
                                                    General Inquiry
                                                </MenuItem>
                                                <MenuItem value="admissions">
                                                    Admissions & Enrollment
                                                </MenuItem>
                                                <MenuItem value="academics">
                                                    Academic Affairs
                                                </MenuItem>
                                                <MenuItem value="student-services">
                                                    Student Services
                                                </MenuItem>
                                                <MenuItem value="athletics">
                                                    Athletics
                                                </MenuItem>
                                                <MenuItem value="facilities">
                                                    Facilities & Maintenance
                                                </MenuItem>
                                                <MenuItem value="technology">
                                                    Technology Support
                                                </MenuItem>
                                                <MenuItem value="health">
                                                    Health & Wellness
                                                </MenuItem>
                                                <MenuItem value="transportation">
                                                    Transportation
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
                                            label="Student Name (If Applicable)"
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
                                                Preferred Contact Method
                                            </InputLabel>
                                            <Select
                                                value={
                                                    formData.preferredContact
                                                }
                                                onChange={handleSelectChange(
                                                    'preferredContact'
                                                )}
                                                label="Preferred Contact Method"
                                                size="medium"
                                            >
                                                <MenuItem value="email">
                                                    Email
                                                </MenuItem>
                                                <MenuItem value="phone">
                                                    Phone
                                                </MenuItem>
                                                <MenuItem value="both">
                                                    Either
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <FormControl fullWidth>
                                            <InputLabel>
                                                Urgency Level
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
                                                    Low - General inquiry
                                                </MenuItem>
                                                <MenuItem value="normal">
                                                    Normal - Response within
                                                    24-48 hours
                                                </MenuItem>
                                                <MenuItem value="high">
                                                    High - Response needed soon
                                                </MenuItem>
                                                <MenuItem value="urgent">
                                                    Urgent - Immediate attention
                                                    needed
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
                                            label="Your Message"
                                            value={formData.message}
                                            onChange={handleInputChange(
                                                'message'
                                            )}
                                            error={!!formErrors.message}
                                            helperText={
                                                formErrors.message ||
                                                'Please provide details about your inquiry'
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
                                                ? 'Sending Message...'
                                                : 'Send Message'}
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
                                    Contact Information
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
                        title="Department Directory"
                        subtitle="Connect directly with specific departments for faster assistance with your questions."
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
                                    title="Visit Our Campus"
                                    subtitle="We welcome visitors and encourage you to experience our vibrant school community."
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
                                        School Address
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: '0.875rem',
                                            lineHeight: 1.6,
                                            mb: 3,
                                        }}
                                    >
                                        123 Education Way
                                        <br />
                                        Your City, State 12345
                                        <br />
                                        United States
                                    </Typography>

                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 2,
                                            fontSize: '0.875rem',
                                        }}
                                    >
                                        Directions
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: '0.875rem',
                                            lineHeight: 1.6,
                                            color: 'text.secondary',
                                            mb: 3,
                                        }}
                                    >
                                        Located in the heart of downtown, easily
                                        accessible by public transportation.
                                        Visitor parking is available in the main
                                        lot adjacent to the administration
                                        building.
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
                                        View on Google Maps
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
                                    title="Emergency Contacts"
                                    subtitle="For urgent matters outside of normal business hours."
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
                                        Emergency Line
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
                                        (555) 911-HELP
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: '0.8125rem',
                                            color: 'text.secondary',
                                            mb: 3,
                                        }}
                                    >
                                        Available 24/7 for true emergencies
                                    </Typography>

                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 2,
                                            fontSize: '0.875rem',
                                        }}
                                    >
                                        After Hours Support
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: '0.875rem',
                                            lineHeight: 1.6,
                                            color: 'text.secondary',
                                            mb: 3,
                                        }}
                                    >
                                        For non-emergency matters outside
                                        business hours, please use the contact
                                        form above or email us. We'll respond
                                        within 24 hours on weekdays.
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
                                        For medical emergencies, always call 911
                                        first, then contact the school emergency
                                        line.
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
                    Message sent successfully! We'll get back to you soon.
                </Alert>
            </Snackbar>
        </Box>
    );
};
