// Navigation Content
export const navigationContent = {
    // Brand/Logo
    brand: {
        name: 'Excellence Academy',
        shortName: 'EA',
        logoText: 'EA', // Text displayed in logo box
    },

    // Navigation Items
    navItems: [
        { label: 'About', href: '#about' },
        { label: 'Programs', href: '#programs' },
        { label: 'Faculty', href: '#faculty' },
        { label: 'Student Life', href: '#student-life' },
        { label: 'Facilities', href: '#facilities' },
        { label: 'Contact', href: '#contact' },
    ],

    // Authentication
    auth: {
        portalButtonText: 'Portal',
        portalButtonTextMobile: 'Access Portal',
        signInText: 'Sign In',
    },

    // Mobile Navigation
    mobileNav: {
        menuLabel: 'Navigation',
        drawerWidth: 320,
    },

    // Visual Configuration
    styling: {
        scrollThreshold: 100, // Pixels scrolled before nav changes appearance
        brandGradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        primaryColor: '#6366f1',
        transparentMode: true, // Supports transparent mode on hero
    },
};

export type NavigationContent = typeof navigationContent;
