import {
    Email as EmailIcon,
    LocationOn as LocationIcon,
    Phone as PhoneIcon,
    School as PortalIcon,
    Schedule as ScheduleIcon,
    TourOutlined as TourIcon,
} from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';

// Contact info interface
interface ContactInfo {
    id: string;
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
    action?: string;
    description?: string;
}

// Contact Section props
interface ContactSectionProps {
    className?: string;
}

// Contact information data
const contactInfo: ContactInfo[] = [
    {
        id: 'phone',
        title: 'Call Us',
        value: '(555) 123-4567',
        description: 'Available during office hours',
        icon: <PhoneIcon />,
        color: '#6366f1',
        action: 'tel:+15551234567',
    },
    {
        id: 'email',
        title: 'Email Us',
        value: 'info@excellenceacademy.edu',
        description: 'General inquiries & support',
        icon: <EmailIcon />,
        color: '#8b5cf6',
        action: 'mailto:info@excellenceacademy.edu',
    },
    {
        id: 'location',
        title: 'Visit Us',
        value: '123 Education Boulevard',
        description: 'Learning City, LC 12345',
        icon: <LocationIcon />,
        color: '#10b981',
    },
    {
        id: 'hours',
        title: 'Office Hours',
        value: 'Monday - Friday',
        description: '8:00 AM - 4:00 PM',
        icon: <ScheduleIcon />,
        color: '#f59e0b',
    },
];

// Main Contact Section component
export const ContactSection: React.FC<ContactSectionProps> = ({
    className = '',
}) => {
    const navigate = useNavigate();

    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    const handlePortalAccess = () => {
        navigate('/auth');
    };

    const handleScheduleTour = () => {
        console.log('Schedule tour clicked');
    };

    const handleContactClick = (action?: string) => {
        if (action) {
            if (action.startsWith('tel:') || action.startsWith('mailto:')) {
                // eslint-disable-next-line react-hooks/immutability
                window.location.href = action;
            } else {
                window.open(action, '_blank', 'noopener,noreferrer');
            }
        }
    };

    return (
        <Box
            id="contact"
            component="section"
            className={className}
            ref={targetRef}
            sx={{
                position: 'relative',
                py: { xs: 12, md: 20 },
                backgroundColor: '#1a1a1a',
                backgroundImage:
                    'url("/azzedine-rouichi-KDM09YR4_bY-unsplash.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                        'linear-gradient(to bottom, rgba(26, 26, 26, 0.85) 0%, rgba(26, 26, 26, 0.95) 100%)',
                    zIndex: 1,
                },
            }}
        >
            {/* Main Content Container */}
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    width: '95%',
                    maxWidth: '1600px',
                    mx: 'auto',
                    px: { xs: 3, md: 6, lg: 8 },
                }}
            >
                {/* Section Header */}
                <Box
                    sx={{
                        mb: { xs: 12, md: 16 },
                        opacity: isIntersecting ? 1 : 0,
                        transform: isIntersecting
                            ? 'translateY(0)'
                            : 'translateY(50px)',
                        transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: '0.2s',
                    }}
                >
                    {/* Overline */}
                    <Typography
                        variant="overline"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontSize: { xs: '0.8rem', md: '0.9rem' },
                            fontWeight: 500,
                            letterSpacing: '0.2em',
                            mb: { xs: 3, md: 4 },
                            display: 'block',
                            textTransform: 'uppercase',
                        }}
                    >
                        Contact Excellence Academy
                    </Typography>

                    {/* Main Headline */}
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: {
                                xs: '3rem',
                                sm: '4rem',
                                md: '5rem',
                                lg: '6rem',
                                xl: '7rem',
                            },
                            fontWeight: 700,
                            lineHeight: { xs: 0.9, md: 0.85 },
                            letterSpacing: '-0.03em',
                            mb: { xs: 4, md: 6 },
                            color: '#ffffff',
                            maxWidth: { xs: '100%', lg: '80%' },
                        }}
                    >
                        Connect
                        <br />
                        <Box
                            component="span"
                            sx={{
                                background:
                                    'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 300,
                            }}
                        >
                            With Us
                        </Box>
                    </Typography>

                    {/* Large Subtitle */}
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: {
                                xs: '1.25rem',
                                md: '1.75rem',
                                lg: '2rem',
                            },
                            fontWeight: 400,
                            lineHeight: 1.3,
                            color: 'rgba(255, 255, 255, 0.8)',
                            maxWidth: { xs: '100%', lg: '70%' },
                            opacity: isIntersecting ? 1 : 0,
                            transform: isIntersecting
                                ? 'translateY(0)'
                                : 'translateY(30px)',
                            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: '0.5s',
                        }}
                    >
                        Ready to begin your educational journey? We're here to
                        guide you every step of the way.
                    </Typography>
                </Box>

                {/* Main Content Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
                        gap: { xs: 12, lg: 16 },
                        mb: { xs: 12, md: 16 },
                    }}
                >
                    {/* Left Side - Contact Information */}
                    <Box
                        sx={{
                            opacity: isIntersecting ? 1 : 0,
                            transform: isIntersecting
                                ? 'translateX(0)'
                                : 'translateX(-30px)',
                            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: '0.8s',
                        }}
                    >
                        {/* Contact Header */}
                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: {
                                    xs: '2rem',
                                    md: '2.5rem',
                                    lg: '3rem',
                                },
                                fontWeight: 700,
                                mb: { xs: 6, md: 8 },
                                color: '#ffffff',
                                lineHeight: 1.1,
                            }}
                        >
                            Get In Touch
                        </Typography>

                        {/* Contact Items */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 6,
                            }}
                        >
                            {contactInfo.map((contact, index) => (
                                <Box
                                    key={contact.id}
                                    onClick={() =>
                                        handleContactClick(contact.action)
                                    }
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 4,
                                        opacity: isIntersecting ? 1 : 0,
                                        transform: isIntersecting
                                            ? 'translateY(0)'
                                            : 'translateY(30px)',
                                        transition:
                                            'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                                        transitionDelay: `${1 + index * 0.1}s`,
                                        cursor: contact.action
                                            ? 'pointer'
                                            : 'default',
                                        '&:hover': {
                                            '& .contact-icon': {
                                                transform: contact.action
                                                    ? 'scale(1.1)'
                                                    : 'scale(1)',
                                                backgroundColor: contact.action
                                                    ? contact.color
                                                    : undefined,
                                            },
                                        },
                                    }}
                                >
                                    {/* Icon */}
                                    <Box
                                        className="contact-icon"
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: '50%',
                                            background:
                                                'rgba(255, 255, 255, 0.1)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                            transition:
                                                'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            '& svg': {
                                                fontSize: '1.5rem',
                                                color: 'white',
                                            },
                                        }}
                                    >
                                        {contact.icon}
                                    </Box>

                                    {/* Contact Info */}
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                color: contact.color,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em',
                                                mb: 1,
                                            }}
                                        >
                                            {contact.title}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: {
                                                    xs: '1.125rem',
                                                    md: '1.25rem',
                                                },
                                                fontWeight: 600,
                                                color: '#ffffff',
                                                mb: 1,
                                                lineHeight: 1.3,
                                            }}
                                        >
                                            {contact.value}
                                        </Typography>
                                        {contact.description && (
                                            <Typography
                                                sx={{
                                                    fontSize: '0.875rem',
                                                    color: 'rgba(255, 255, 255, 0.7)',
                                                    lineHeight: 1.4,
                                                }}
                                            >
                                                {contact.description}
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* Right Side - Actions */}
                    <Box
                        sx={{
                            opacity: isIntersecting ? 1 : 0,
                            transform: isIntersecting
                                ? 'translateX(0)'
                                : 'translateX(30px)',
                            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: '1s',
                        }}
                    >
                        {/* Actions Header */}
                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: {
                                    xs: '2rem',
                                    md: '2.5rem',
                                    lg: '3rem',
                                },
                                fontWeight: 700,
                                mb: { xs: 6, md: 8 },
                                color: '#ffffff',
                                lineHeight: 1.1,
                            }}
                        >
                            Take Action
                        </Typography>

                        {/* Parent Portal Action */}
                        <Box
                            onClick={handlePortalAccess}
                            sx={{
                                mb: 8,
                                p: 6,
                                borderRadius: 2,
                                background: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                cursor: 'pointer',
                                transition:
                                    'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateY(0)'
                                    : 'translateY(30px)',
                                transitionDelay: '1.4s',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    transform: 'translateY(-8px)',
                                    '& .portal-icon': {
                                        transform: 'scale(1.1)',
                                        backgroundColor: '#6366f1',
                                    },
                                },
                            }}
                        >
                            {/* Portal Icon */}
                            <Box
                                className="portal-icon"
                                sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: '50%',
                                    background: 'rgba(99, 102, 241, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 4,
                                    transition:
                                        'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '& svg': {
                                        fontSize: '2.5rem',
                                        color: 'white',
                                    },
                                }}
                            >
                                <PortalIcon />
                            </Box>

                            <Typography
                                sx={{
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    color: '#6366f1',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    mb: 2,
                                }}
                            >
                                Parent Portal
                            </Typography>

                            <Typography
                                variant="h4"
                                sx={{
                                    fontSize: {
                                        xs: '1.5rem',
                                        md: '1.75rem',
                                    },
                                    fontWeight: 700,
                                    color: '#ffffff',
                                    mb: 3,
                                    lineHeight: 1.2,
                                }}
                            >
                                Access Your Dashboard
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: '1rem',
                                    lineHeight: 1.6,
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    mb: 4,
                                }}
                            >
                                Monitor your child's academic progress, view
                                assignments, track attendance, and stay
                                connected with educators.
                            </Typography>

                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    backgroundColor: '#6366f1',
                                    color: 'white',
                                    fontWeight: 600,
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 1,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    '&:hover': {
                                        backgroundColor: '#5048e5',
                                    },
                                }}
                            >
                                Sign In Now
                            </Button>
                        </Box>

                        {/* Campus Tour Action */}
                        <Box
                            onClick={handleScheduleTour}
                            sx={{
                                p: 6,
                                borderRadius: 2,
                                background: 'rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                cursor: 'pointer',
                                transition:
                                    'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateY(0)'
                                    : 'translateY(30px)',
                                transitionDelay: '1.6s',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    transform: 'translateY(-8px)',
                                    '& .tour-icon': {
                                        transform: 'scale(1.1)',
                                        backgroundColor: '#10b981',
                                    },
                                },
                            }}
                        >
                            {/* Tour Icon */}
                            <Box
                                className="tour-icon"
                                sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: '50%',
                                    background: 'rgba(16, 185, 129, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 3,
                                    transition:
                                        'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '& svg': {
                                        fontSize: '1.75rem',
                                        color: 'white',
                                    },
                                }}
                            >
                                <TourIcon />
                            </Box>

                            <Typography
                                sx={{
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    color: '#10b981',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    mb: 2,
                                }}
                            >
                                Campus Tour
                            </Typography>

                            <Typography
                                variant="h5"
                                sx={{
                                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                                    fontWeight: 700,
                                    color: '#ffffff',
                                    mb: 2,
                                    lineHeight: 1.3,
                                }}
                            >
                                Schedule Your Visit
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: '0.875rem',
                                    lineHeight: 1.6,
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    mb: 3,
                                }}
                            >
                                Experience our world-class facilities and meet
                                our dedicated team of educators.
                            </Typography>

                            <Button
                                variant="outlined"
                                size="medium"
                                sx={{
                                    borderColor: '#10b981',
                                    color: '#10b981',
                                    fontWeight: 600,
                                    px: 3,
                                    py: 1,
                                    borderRadius: 1,
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: '#10b981',
                                        color: 'white',
                                        borderColor: '#10b981',
                                    },
                                }}
                            >
                                Book Now
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
