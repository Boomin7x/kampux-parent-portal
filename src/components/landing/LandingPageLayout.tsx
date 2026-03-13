import { Box, Container } from '@mui/material';
import React, { useEffect } from 'react';
import { Footer } from './Footer';
import { Navigation } from './Navigation';

// SEO metadata interface
interface SEOMetadata {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
    ogUrl?: string;
}

// Landing page layout props
interface LandingPageLayoutProps {
    children: React.ReactNode;
    seo: SEOMetadata;
    transparentNav?: boolean;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | false;
    className?: string;
}

/**
 * LandingPageLayout Component
 *
 * Shared wrapper for all landing pages with:
 * - Navigation bar integration
 * - Footer integration
 * - Consistent spacing and max-width constraints
 * - SEO meta tag support
 * - Minimal design pattern implementation
 */
export const LandingPageLayout: React.FC<LandingPageLayoutProps> = ({
    children,
    seo,
    transparentNav = false,
    maxWidth = 'lg',
    className = '',
}) => {
    // Update document title and meta tags
    useEffect(() => {
        document.title = `${seo.title} | Excellence Academy`;

        // Update or create meta description
        let metaDescription = document.querySelector(
            'meta[name="description"]'
        );
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', seo.description);

        // Update or create meta keywords if provided
        if (seo.keywords) {
            let metaKeywords = document.querySelector('meta[name="keywords"]');
            if (!metaKeywords) {
                metaKeywords = document.createElement('meta');
                metaKeywords.setAttribute('name', 'keywords');
                document.head.appendChild(metaKeywords);
            }
            metaKeywords.setAttribute('content', seo.keywords);
        }

        // Open Graph tags
        const updateMetaProperty = (property: string, content: string) => {
            let meta = document.querySelector(`meta[property="${property}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute('property', property);
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
        };

        updateMetaProperty('og:type', 'website');
        updateMetaProperty('og:title', `${seo.title} | Excellence Academy`);
        updateMetaProperty('og:description', seo.description);
        if (seo.ogUrl) updateMetaProperty('og:url', seo.ogUrl);
        if (seo.ogImage) updateMetaProperty('og:image', seo.ogImage);

        // Twitter Card tags
        const updateMetaName = (name: string, content: string) => {
            let meta = document.querySelector(`meta[name="${name}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute('name', name);
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
        };

        updateMetaName('twitter:card', 'summary_large_image');
        updateMetaName('twitter:title', `${seo.title} | Excellence Academy`);
        updateMetaName('twitter:description', seo.description);
        if (seo.ogImage) updateMetaName('twitter:image', seo.ogImage);
    }, [seo]);

    return (
        <>
            {/* Page Structure */}
            <Box
                className={className}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    backgroundColor: 'background.default',
                }}
            >
                {/* Navigation */}
                <Navigation transparent={transparentNav} />

                {/* Main Content */}
                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        pt: { xs: '70px', md: '80px' }, // Account for fixed navigation
                    }}
                >
                    {maxWidth !== false ? (
                        <Container
                            maxWidth={maxWidth}
                            disableGutters
                            sx={{
                                px: { xs: 2, sm: 3, md: 4 },
                            }}
                        >
                            {children}
                        </Container>
                    ) : (
                        children
                    )}
                </Box>

                {/* Footer */}
                <Footer />
            </Box>
        </>
    );
};
