import {
    Email as EmailIcon,
    Facebook as FacebookIcon,
    Instagram as InstagramIcon,
    LinkedIn as LinkedInIcon,
    LocationOn as LocationIcon,
    Phone as PhoneIcon,
    Twitter as TwitterIcon,
    YouTube as YouTubeIcon,
} from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Footer props
interface FooterProps {
    className?: string;
}

// Footer links configuration
const footerLinks = {
    about: [
        { label: 'Our Story', href: '#about' },
        { label: 'Mission & Values', href: '#about' },
        { label: 'Leadership', href: '#faculty' },
        { label: 'Careers', href: '#' },
    ],
    academics: [
        { label: 'Programs', href: '#programs' },
        { label: 'Curriculum', href: '#programs' },
        { label: 'Academic Excellence', href: '#programs' },
        { label: 'Student Resources', href: '#' },
    ],
    studentLife: [
        { label: 'Activities', href: '#student-life' },
        { label: 'Athletics', href: '#student-life' },
        { label: 'Arts & Culture', href: '#student-life' },
        { label: 'Clubs', href: '#student-life' },
    ],
    resources: [
        { label: 'Parent Portal', href: '/auth' },
        { label: 'Calendar', href: '#' },
        { label: 'News & Events', href: '#events-announcements' },
        { label: 'Contact', href: '#contact' },
    ],
};

// Contact information
const contactInfo = [
    {
        icon: <PhoneIcon />,
        label: 'Phone',
        value: '(555) 123-4567',
        href: 'tel:+15551234567',
    },
    {
        icon: <EmailIcon />,
        label: 'Email',
        value: 'info@excellenceacademy.edu',
        href: 'mailto:info@excellenceacademy.edu',
    },
    {
        icon: <LocationIcon />,
        label: 'Address',
        value: '123 Education Boulevard, Learning City, LC 12345',
        href: '#',
    },
];

// Social media links
const socialLinks = [
    { icon: <FacebookIcon />, href: '#', label: 'Facebook' },
    { icon: <TwitterIcon />, href: '#', label: 'Twitter' },
    { icon: <InstagramIcon />, href: '#', label: 'Instagram' },
    { icon: <LinkedInIcon />, href: '#', label: 'LinkedIn' },
    { icon: <YouTubeIcon />, href: '#', label: 'YouTube' },
];

// Main Footer component
export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
    const navigate = useNavigate();

    const handleLinkClick = (href: string) => {
        if (href.startsWith('#')) {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        } else if (href.startsWith('/')) {
            navigate(href);
        } else {
            window.open(href, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <Box
            component="footer"
            className={className}
            sx={{
                position: 'relative',
                backgroundColor: '#1a1a1a',
                pt: { xs: 12, md: 16 },
                pb: { xs: 6, md: 8 },
                overflow: 'hidden',
            }}
        >
            {/* Main Footer Content */}
            <Box
                sx={{
                    width: '95%',
                    maxWidth: '1600px',
                    mx: 'auto',
                    px: { xs: 3, md: 6, lg: 8 },
                }}
            >
                {/* Footer Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(4, 1fr)',
                            lg: '2fr 1fr 1fr 1fr',
                        },
                        gap: { xs: 8, md: 6 },
                        mb: { xs: 10, md: 12 },
                    }}
                >
                    {/* Brand Column */}
                    <Box>
                        {/* School Name */}
                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: { xs: '2rem', md: '2.5rem' },
                                fontWeight: 700,
                                mb: 3,
                                color: '#ffffff',
                                lineHeight: 1.1,
                            }}
                        >
                            Excellence
                            <br />
                            <Box
                                component="span"
                                sx={{
                                    background:
                                        'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #10b981 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontWeight: 300,
                                }}
                            >
                                Academy
                            </Box>
                        </Typography>

                        {/* Tagline */}
                        <Typography
                            sx={{
                                fontSize: '1rem',
                                lineHeight: 1.6,
                                color: 'rgba(255, 255, 255, 0.7)',
                                mb: 4,
                                maxWidth: '300px',
                            }}
                        >
                            Shaping tomorrow's leaders through academic
                            excellence and character development.
                        </Typography>

                        {/* Contact Info */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            {contactInfo.map((contact, index) => (
                                <Box
                                    key={index}
                                    onClick={() =>
                                        contact.href !== '#'
                                            ? handleLinkClick(contact.href)
                                            : null
                                    }
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 2,
                                        cursor:
                                            contact.href !== '#'
                                                ? 'pointer'
                                                : 'default',
                                        '&:hover': {
                                            '& .contact-icon': {
                                                transform:
                                                    contact.href !== '#'
                                                        ? 'scale(1.1)'
                                                        : 'scale(1)',
                                            },
                                        },
                                    }}
                                >
                                    <Box
                                        className="contact-icon"
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.6)',
                                            transition: 'transform 0.3s ease',
                                            flexShrink: 0,
                                            mt: 0.5,
                                        }}
                                    >
                                        {contact.icon}
                                    </Box>
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                color: 'rgba(255, 255, 255, 0.5)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                                mb: 0.5,
                                            }}
                                        >
                                            {contact.label}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: '0.875rem',
                                                color: 'rgba(255, 255, 255, 0.8)',
                                                lineHeight: 1.4,
                                            }}
                                        >
                                            {contact.value}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* About Links */}
                    <Box>
                        <Typography
                            sx={{
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: 'rgba(255, 255, 255, 0.9)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                mb: 4,
                            }}
                        >
                            About
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            {footerLinks.about.map((link, index) => (
                                <Link
                                    key={index}
                                    onClick={() => handleLinkClick(link.href)}
                                    sx={{
                                        fontSize: '0.875rem',
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                        transition: 'color 0.3s ease',
                                        '&:hover': {
                                            color: '#6366f1',
                                        },
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </Box>
                    </Box>

                    {/* Academics Links */}
                    <Box>
                        <Typography
                            sx={{
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: 'rgba(255, 255, 255, 0.9)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                mb: 4,
                            }}
                        >
                            Academics
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            {footerLinks.academics.map((link, index) => (
                                <Link
                                    key={index}
                                    onClick={() => handleLinkClick(link.href)}
                                    sx={{
                                        fontSize: '0.875rem',
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                        transition: 'color 0.3s ease',
                                        '&:hover': {
                                            color: '#6366f1',
                                        },
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </Box>
                    </Box>

                    {/* Resources Links */}
                    <Box>
                        <Typography
                            sx={{
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: 'rgba(255, 255, 255, 0.9)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                mb: 4,
                            }}
                        >
                            Resources
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            {footerLinks.resources.map((link, index) => (
                                <Link
                                    key={index}
                                    onClick={() => handleLinkClick(link.href)}
                                    sx={{
                                        fontSize: '0.875rem',
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                        transition: 'color 0.3s ease',
                                        '&:hover': {
                                            color: '#6366f1',
                                        },
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </Box>
                    </Box>
                </Box>

                {/* Divider */}
                <Box
                    sx={{
                        width: '100%',
                        height: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        mb: { xs: 6, md: 8 },
                    }}
                />

                {/* Bottom Section */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', md: 'center' },
                        gap: { xs: 4, md: 0 },
                    }}
                >
                    {/* Copyright */}
                    <Typography
                        sx={{
                            fontSize: '0.875rem',
                            color: 'rgba(255, 255, 255, 0.6)',
                        }}
                    >
                        © {new Date().getFullYear()} Excellence Academy. All
                        rights reserved.
                    </Typography>

                    {/* Social Media Links */}
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            alignItems: 'center',
                        }}
                    >
                        {socialLinks.map((social, index) => (
                            <Box
                                key={index}
                                onClick={() => handleLinkClick(social.href)}
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor:
                                        'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    cursor: 'pointer',
                                    transition:
                                        'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        backgroundColor:
                                            'rgba(99, 102, 241, 0.2)',
                                        borderColor: '#6366f1',
                                        color: '#6366f1',
                                        transform: 'translateY(-3px)',
                                    },
                                }}
                            >
                                {social.icon}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
