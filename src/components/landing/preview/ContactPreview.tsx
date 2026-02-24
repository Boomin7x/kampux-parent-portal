import { Box, Typography, Link as MuiLink } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as MuiIcons from '@mui/icons-material';
import { contactPreviewContent } from '../../../content/landing/contactPreviewContent';
import { PreviewCard, SectionContentGrid, SectionPreview } from '../SectionPreview';
import { CTAButton } from '../CTAButton';

/**
 * ContactPreview Component
 *
 * Minimal preview of the Contact section for landing page with:
 * - Quick contact info
 * - Primary actions (Portal & Tour)
 * - CTA to full Contact page
 */
export const ContactPreview: React.FC = () => {
    const navigate = useNavigate();
    const { overline, title, subtitle, quickContact, primaryActions, cta } =
        contactPreviewContent;

    const handleAction = (action: string) => {
        if (action === 'navigate-to-auth') {
            navigate('/auth');
        } else if (action === 'schedule-tour') {
            // Future: Open tour scheduling modal/form
            console.log('Schedule tour clicked');
        }
    };

    return (
        <SectionPreview
            id="contact"
            title={title}
            subtitle={subtitle}
            overline={overline}
            ctaText={cta.text}
            ctaRoute={cta.route}
            backgroundColor="#fefefe"
        >
            {/* Quick Contact Info */}
            <SectionContentGrid columns={{ xs: 1, sm: 2, md: 4 }} spacing={2}>
                {quickContact.map(contact => {
                    const IconComponent =
                        MuiIcons[contact.icon as keyof typeof MuiIcons];

                    const content = (
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                            {/* Icon */}
                            {IconComponent && (
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 1,
                                        backgroundColor: contact.color + '15',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}
                                >
                                    <IconComponent
                                        sx={{
                                            fontSize: 20,
                                            color: contact.color,
                                        }}
                                    />
                                </Box>
                            )}

                            {/* Content */}
                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'text.secondary',
                                        fontWeight: 500,
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5,
                                    }}
                                >
                                    {contact.title}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 600,
                                        mb: 0.5,
                                        color: 'text.primary',
                                    }}
                                >
                                    {contact.value}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary', lineHeight: 1.4 }}
                                >
                                    {contact.description}
                                </Typography>
                            </Box>
                        </Box>
                    );

                    // Wrap in link if action exists
                    if (contact.action) {
                        return (
                            <MuiLink
                                key={contact.id}
                                href={contact.action}
                                sx={{ textDecoration: 'none' }}
                            >
                                <PreviewCard hoverable>{content}</PreviewCard>
                            </MuiLink>
                        );
                    }

                    return <PreviewCard key={contact.id}>{content}</PreviewCard>;
                })}
            </SectionContentGrid>

            {/* Primary Actions */}
            <Box
                sx={{
                    mt: 4,
                    p: 3,
                    borderRadius: 1,
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
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
                                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
                                        onClick={() => handleAction(action.action)}
                                    >
                                        {action.buttonText}
                                    </CTAButton>
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </SectionPreview>
    );
};
