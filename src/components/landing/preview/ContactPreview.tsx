import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as MuiIcons from '@mui/icons-material';
import { contactPreviewContent } from '../../../content/landing/contactPreviewContent';
import { CTAButton } from '../CTAButton';
import { SectionHeader } from '../SectionHeader';
import { useIntersectionObserver } from '../../../hooks/ui/useIntersectionObserver';

/**
 * ContactPreview Component
 *
 * Image-left, content-right layout featuring:
 * - School entrance image on left (6 cols)
 * - Contact information on right (6 cols)
 * - Clean essential contact info
 * - CTA button: "Get in Touch" → /contact
 */
export const ContactPreview: React.FC = () => {
    const navigate = useNavigate();
    const { overline, title, subtitle, quickContact, primaryActions, cta } =
        contactPreviewContent;

    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    const handleAction = (action: string) => {
        if (action === 'navigate-to-auth') {
            navigate('/auth');
        } else if (action === 'schedule-tour') {
            // Future: Open tour scheduling modal/form
            console.log('Schedule tour clicked');
        }
    };

    return (
        <Box
            id="contact"
            component="section"
            ref={targetRef}
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#fefefe',
                position: 'relative',
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    opacity: isIntersecting ? 1 : 0,
                    transform: isIntersecting
                        ? 'translateY(0)'
                        : 'translateY(30px)',
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                {/* Section Header */}
                <SectionHeader
                    title={title}
                    subtitle={subtitle}
                    overline={overline}
                    align="center"
                />

                {/* Image + Content Layout */}
                <Grid container spacing={4} alignItems="center" sx={{ mb: 4 }}>
                    {/* School Entrance Image - LEFT */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                position: 'relative',
                                borderRadius: 2,
                                overflow: 'hidden',
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateX(0)'
                                    : 'translateX(-30px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
                            }}
                        >
                            <Box
                                component="img"
                                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80"
                                alt="Welcoming entrance to Excellence Academy showcasing our commitment to educational excellence"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    aspectRatio: '4/3',
                                    objectFit: 'cover',
                                    borderRadius: 1,
                                }}
                                loading="lazy"
                            />
                            {/* Image Overlay with Caption */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    background:
                                        'linear-gradient(transparent, rgba(0,0,0,0.6))',
                                    p: 2.5,
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'white',
                                        fontWeight: 500,
                                        textShadow: '0 1px 2px rgba(0,0,0,0.7)',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    Welcome to Excellence Academy
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Contact Information - Right Side */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateX(0)'
                                    : 'translateX(30px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                transitionDelay: '0.2s',
                            }}
                        >
                            <Grid container spacing={2}>
                                {quickContact.map((contact, index) => {
                                    const IconComponent =
                                        MuiIcons[
                                            contact.icon as keyof typeof MuiIcons
                                        ];

                                    const content = (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: 1.5,
                                            }}
                                        >
                                            {/* Icon */}
                                            {IconComponent && (
                                                <Box
                                                    sx={{
                                                        width: 32,
                                                        height: 32,
                                                        borderRadius: 1,
                                                        backgroundColor:
                                                            contact.color +
                                                            '15',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <IconComponent
                                                        sx={{
                                                            fontSize: 16,
                                                            color: contact.color,
                                                        }}
                                                    />
                                                </Box>
                                            )}

                                            {/* Content */}
                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: 'text.secondary',
                                                        fontWeight: 500,
                                                        textTransform:
                                                            'uppercase',
                                                        letterSpacing: 0.5,
                                                        fontSize: '0.65rem',
                                                    }}
                                                >
                                                    {contact.title}
                                                </Typography>
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        fontWeight: 600,
                                                        mb: 0.25,
                                                        color: 'text.primary',
                                                        lineHeight: 1.2,
                                                    }}
                                                >
                                                    {contact.value}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'text.secondary',
                                                        lineHeight: 1.3,
                                                        fontSize: '0.8rem',
                                                    }}
                                                >
                                                    {contact.description}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    );

                                    const cardContent = (
                                        <Box
                                            sx={{
                                                p: 2,
                                                borderRadius: 1,
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                backgroundColor:
                                                    'background.paper',
                                                height: '100%',
                                                opacity: isIntersecting ? 1 : 0,
                                                transform: isIntersecting
                                                    ? 'translateY(0)'
                                                    : 'translateY(20px)',
                                                transition:
                                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                                transitionDelay: `${0.3 + index * 0.1}s`,
                                                cursor: contact.action
                                                    ? 'pointer'
                                                    : 'default',
                                                '&:hover': contact.action
                                                    ? {
                                                          borderColor:
                                                              contact.color,
                                                          backgroundColor:
                                                              contact.color +
                                                              '08',
                                                          transform:
                                                              'translateY(-2px)',
                                                      }
                                                    : {},
                                            }}
                                        >
                                            {content}
                                        </Box>
                                    );

                                    // Wrap in link if action exists
                                    if (contact.action) {
                                        return (
                                            <Grid
                                                size={{ xs: 12, sm: 6 }}
                                                key={contact.id}
                                            >
                                                <MuiLink
                                                    href={contact.action}
                                                    sx={{
                                                        textDecoration: 'none',
                                                    }}
                                                >
                                                    {cardContent}
                                                </MuiLink>
                                            </Grid>
                                        );
                                    }

                                    return (
                                        <Grid
                                            size={{ xs: 12, sm: 6 }}
                                            key={contact.id}
                                        >
                                            {cardContent}
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                {/* </Box> */}

                {/* Primary Actions */}
                <Box
                    sx={{
                        mt: 4,
                        p: 3,
                        borderRadius: 1,
                        background:
                            'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        opacity: isIntersecting ? 1 : 0,
                        transform: isIntersecting
                            ? 'translateY(0)'
                            : 'translateY(30px)',
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: '0.6s',
                    }}
                >
                    <Grid container spacing={3}>
                        {primaryActions.map(action => {
                            const IconComponent =
                                MuiIcons[action.icon as keyof typeof MuiIcons];

                            return (
                                <Grid size={{ xs: 12, sm: 6 }} key={action.id}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {/* Icon */}
                                        {IconComponent && (
                                            <Box
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: 1,
                                                    backgroundColor:
                                                        'rgba(255, 255, 255, 0.2)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    mb: 1.5,
                                                }}
                                            >
                                                <IconComponent
                                                    sx={{
                                                        fontSize: 24,
                                                        color: 'white',
                                                    }}
                                                />
                                            </Box>
                                        )}

                                        {/* Content */}
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 0.5,
                                                color: 'white',
                                            }}
                                        >
                                            {action.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.9)',
                                                lineHeight: 1.5,
                                                mb: 2,
                                            }}
                                        >
                                            {action.description}
                                        </Typography>

                                        {/* Action Button */}
                                        <CTAButton
                                            variant="secondary"
                                            size="medium"
                                            onClick={() =>
                                                handleAction(action.action)
                                            }
                                        >
                                            {action.buttonText}
                                        </CTAButton>
                                    </Box>
                                </Grid>
                            );
                        })}
                    </Grid>

                    {/* CTA Button */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <CTAButton
                            to={cta.route}
                            variant="primary"
                            size="medium"
                        >
                            {cta.text}
                        </CTAButton>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};
