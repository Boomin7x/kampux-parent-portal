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
import Grid from '@mui/material/Grid';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { footerContent } from '../../content/landing/footerContent';

// Footer props
interface FooterProps {
    className?: string;
}

// Icon mapping helper
const getIconComponent = (iconName: string) => {
    switch (iconName) {
        case 'Phone':
            return <PhoneIcon fontSize="small" />;
        case 'Email':
            return <EmailIcon fontSize="small" />;
        case 'LocationOn':
            return <LocationIcon fontSize="small" />;
        case 'Facebook':
            return <FacebookIcon fontSize="small" />;
        case 'Twitter':
            return <TwitterIcon fontSize="small" />;
        case 'Instagram':
            return <InstagramIcon fontSize="small" />;
        case 'LinkedIn':
            return <LinkedInIcon fontSize="small" />;
        case 'YouTube':
            return <YouTubeIcon fontSize="small" />;
        default:
            return <PhoneIcon fontSize="small" />;
    }
};

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
                backgroundColor: footerContent.styling.backgroundColor,
                pt: { xs: 6, md: 8 },
                pb: { xs: 4, md: 6 },
            }}
        >
            {/* Main Footer Content */}
            <Box
                sx={{
                    maxWidth: '1200px',
                    mx: 'auto',
                    px: { xs: 2, md: 3 },
                }}
            >
                {/* Footer Grid */}
                <Grid
                    container
                    spacing={2}
                    sx={{
                        mb: { xs: 4, md: 6 },
                    }}
                >
                    {/* Brand Column */}
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        {/* School Name */}
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: '1.125rem',
                                fontWeight: 600,
                                mb: 1.5,
                                color: '#ffffff',
                                lineHeight: 1.2,
                            }}
                        >
                            {footerContent.brand.name.primary}{' '}
                            <Box
                                component="span"
                                sx={{
                                    background:
                                        'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                {footerContent.brand.name.secondary}
                            </Box>
                        </Typography>

                        {/* Tagline */}
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: '0.8125rem',
                                lineHeight: 1.5,
                                color: 'rgba(255, 255, 255, 0.7)',
                                mb: 2,
                            }}
                        >
                            {footerContent.brand.tagline}
                        </Typography>

                        {/* Contact Info */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                            }}
                        >
                            {footerContent.contactInfo.map((contact, index) => (
                                <Box
                                    key={index}
                                    onClick={() =>
                                        contact.href !== '#'
                                            ? handleLinkClick(contact.href)
                                            : null
                                    }
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        cursor:
                                            contact.href !== '#'
                                                ? 'pointer'
                                                : 'default',
                                        transition: 'color 0.2s ease',
                                        '&:hover': {
                                            color:
                                                contact.href !== '#'
                                                    ? '#6366f1'
                                                    : 'inherit',
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.6)',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {getIconComponent(contact.icon)}
                                    </Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontSize: '0.75rem',
                                            color: 'rgba(255, 255, 255, 0.8)',
                                        }}
                                    >
                                        {contact.value}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                    {/* Quick Links Column 1 */}
                    <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: 'rgba(255, 255, 255, 0.9)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                mb: 1.5,
                                display: 'block',
                            }}
                        >
                            About
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                            }}
                        >
                            {footerContent.links.about.map((link, index) => (
                                <Link
                                    key={index}
                                    onClick={() => handleLinkClick(link.href)}
                                    sx={{
                                        fontSize: '0.8125rem',
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                        transition: 'color 0.2s ease',
                                        '&:hover': {
                                            color: '#6366f1',
                                        },
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </Box>
                    </Grid>

                    {/* Quick Links Column 2 */}
                    <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: 'rgba(255, 255, 255, 0.9)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                mb: 1.5,
                                display: 'block',
                            }}
                        >
                            Academics
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                            }}
                        >
                            {footerContent.links.academics.map(
                                (link, index) => (
                                    <Link
                                        key={index}
                                        onClick={() =>
                                            handleLinkClick(link.href)
                                        }
                                        sx={{
                                            fontSize: '0.8125rem',
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            textDecoration: 'none',
                                            cursor: 'pointer',
                                            transition: 'color 0.2s ease',
                                            '&:hover': {
                                                color: '#6366f1',
                                            },
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                )
                            )}
                        </Box>
                    </Grid>

                    {/* Quick Links Column 3 */}
                    <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: 'rgba(255, 255, 255, 0.9)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                mb: 1.5,
                                display: 'block',
                            }}
                        >
                            Vie Scolaire
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                            }}
                        >
                            {footerContent.links.studentLife?.map(
                                (link, index) => (
                                    <Link
                                        key={index}
                                        onClick={() =>
                                            handleLinkClick(link.href)
                                        }
                                        sx={{
                                            fontSize: '0.8125rem',
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            textDecoration: 'none',
                                            cursor: 'pointer',
                                            transition: 'color 0.2s ease',
                                            '&:hover': {
                                                color: '#6366f1',
                                            },
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                )
                            )}
                        </Box>
                    </Grid>

                    {/* Quick Links Column 4 */}
                    <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: 'rgba(255, 255, 255, 0.9)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                mb: 1.5,
                                display: 'block',
                            }}
                        >
                            Ressources
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                            }}
                        >
                            {footerContent.links.resources.map(
                                (link, index) => (
                                    <Link
                                        key={index}
                                        onClick={() =>
                                            handleLinkClick(link.href)
                                        }
                                        sx={{
                                            fontSize: '0.8125rem',
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            textDecoration: 'none',
                                            cursor: 'pointer',
                                            transition: 'color 0.2s ease',
                                            '&:hover': {
                                                color: '#6366f1',
                                            },
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                )
                            )}
                        </Box>
                    </Grid>
                </Grid>

                {/* Divider */}
                <Box
                    sx={{
                        width: '100%',
                        height: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        mb: 2,
                    }}
                />

                {/* Bottom Section */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        gap: 2,
                    }}
                >
                    {/* Copyright */}
                    <Typography
                        variant="caption"
                        sx={{
                            fontSize: '0.75rem',
                            color: 'rgba(255, 255, 255, 0.6)',
                        }}
                    >
                        © {footerContent.copyright.year}{' '}
                        {footerContent.copyright.text}
                    </Typography>

                    {/* Social Media Links */}
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            alignItems: 'center',
                        }}
                    >
                        {footerContent.socialLinks.map((social, index) => (
                            <Box
                                key={index}
                                onClick={() => handleLinkClick(social.href)}
                                sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor:
                                        'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    cursor: 'pointer',
                                    transition:
                                        'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        backgroundColor:
                                            'rgba(99, 102, 241, 0.2)',
                                        borderColor: '#6366f1',
                                        color: '#6366f1',
                                        transform: 'translateY(-2px)',
                                    },
                                }}
                            >
                                {getIconComponent(social.icon)}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
