import {
    Email as EmailIcon,
    LocationOn as LocationIcon,
    Phone as PhoneIcon,
} from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { contactSectionContent } from '../../content/landing/contactSection';
import { SectionPreview } from './SectionPreview';

// Contact Preview props
interface ContactPreviewProps {
    className?: string;
}

// Icon mapping helper
const getIconComponent = (iconName: string) => {
    const iconProps = { sx: { fontSize: '1.125rem' } };
    switch (iconName) {
        case 'Phone':
            return <PhoneIcon {...iconProps} />;
        case 'Email':
            return <EmailIcon {...iconProps} />;
        case 'LocationOn':
            return <LocationIcon {...iconProps} />;
        default:
            return <PhoneIcon {...iconProps} />;
    }
};

/**
 * ContactPreview Component
 *
 * Compact preview of contact information with:
 * - Horizontal layout: Phone | Email | Location
 * - Use Box with dividers between items
 * - Compact spacing: gap: 2, py: 2
 * - Typography: caption for labels, body2 for values
 * - CTA: "Get in Touch" → /contact
 */
export const ContactPreview: React.FC<ContactPreviewProps> = ({
    className = '',
}) => {
    const contactItems = contactSectionContent.contactInfo.slice(0, 3);

    return (
        <SectionPreview
            id="contact-preview"
            title="Connect With Us"
            subtitle="Ready to begin your educational journey?"
            overline="CONTACT"
            ctaText="Get in Touch"
            ctaRoute="/contact"
            backgroundColor="#fefefe"
            className={className}
            containerMaxWidth="lg"
        >
            {/* Contact Info - Horizontal Layout */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'stretch',
                    justifyContent: 'center',
                    py: 2,
                    px: 3,
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.paper',
                    gap: { xs: 2, md: 0 },
                }}
            >
                {contactItems.map((item, index) => (
                    <React.Fragment key={item.id}>
                        {/* Contact Item */}
                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                gap: 1,
                                px: 2,
                            }}
                        >
                            {/* Icon */}
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 1,
                                    background:
                                        'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    mb: 0.5,
                                }}
                            >
                                {getIconComponent(item.icon)}
                            </Box>

                            {/* Label */}
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    color: 'text.secondary',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                }}
                            >
                                {item.title}
                            </Typography>

                            {/* Value */}
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: '0.8125rem',
                                    fontWeight: 500,
                                    color: 'text.primary',
                                    lineHeight: 1.4,
                                }}
                            >
                                {item.value}
                            </Typography>

                            {/* Description */}
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: '0.75rem',
                                    color: 'text.secondary',
                                    lineHeight: 1.3,
                                }}
                            >
                                {item.description}
                            </Typography>
                        </Box>

                        {/* Divider (not after last item) */}
                        {index < contactItems.length - 1 && (
                            <Divider
                                orientation="vertical"
                                flexItem
                                sx={{
                                    display: { xs: 'none', md: 'block' },
                                    my: 2,
                                }}
                            />
                        )}
                    </React.Fragment>
                ))}
            </Box>
        </SectionPreview>
    );
};
