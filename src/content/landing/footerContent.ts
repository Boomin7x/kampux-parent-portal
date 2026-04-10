// Footer Content
export const footerContent = {
    // Brand Section
    brand: {
        name: {
            primary: 'GSB',
            secondary: 'Les Kamites', // Gets gradient styling
        },
        tagline:
            'Former les leaders de demain grâce à l’excellence académique et au développement du caractère.',
    },

    // Contact Information
    contactInfo: [
        {
            icon: 'Phone',
            label: 'Téléphone',
            value: '(237) 6 77 42 12 52',
            href: 'tel:+15551234567',
        },
        {
            icon: 'Email',
            label: 'E-mail',
            value: 'gsbleskamites@gmail.com',
            href: 'mailto:info@excellenceacademy.edu',
        },
        {
            icon: 'LocationOn',
            label: 'Addresse',
            value: 'Yaoundé Cameroun, SOA lieu-dit EBOGO',
            href: '#', // No action for address
        },
    ],

    // Footer Navigation Links
    links: {
        about: [
            { label: 'A propos', href: '#about' },
            { label: 'Mission & Valuers', href: '#about' },
            { label: 'Leadership', href: '#faculty' },
            { label: 'Carrières', href: '#contact' },
        ],
        academics: [
            { label: 'Programmes', href: '#academic' },
            { label: 'Curriculum', href: '#academic' },
            { label: 'Excellence', href: '#academic' },
            { label: 'Ressources', href: '#academic' },
        ],
        studentLife: [
            { label: 'Activités', href: '#student-life' },
            { label: 'Sports', href: '#student-life' },
            { label: 'Art & Culture', href: '#student-life' },
            { label: 'Clubs', href: '#student-life' },
        ],
        resources: [
            { label: 'Portail Parent', href: '/auth' },
            { label: 'Gallerie', href: '#gallery' },
            { label: 'Facilité', href: '#facilities' },
            { label: 'Contact', href: '#contact' },
        ],
    },

    // Social Media Links
    socialLinks: [
        { icon: 'Facebook', href: '#', label: 'Facebook' },
        { icon: 'Twitter', href: '#', label: 'Twitter' },
        { icon: 'Instagram', href: '#', label: 'Instagram' },
        { icon: 'LinkedIn', href: '#', label: 'LinkedIn' },
        { icon: 'YouTube', href: '#', label: 'YouTube' },
    ],

    // Copyright
    copyright: {
        year: new Date().getFullYear(),
        text: 'Chez Nous. Tous droits réservés.',
    },

    // Visual Configuration
    styling: {
        backgroundColor: '#1a1a1a',
        brandGradient:
            'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #10b981 100%)',
        primaryColor: '#6366f1',
    },
};

export type FooterContent = typeof footerContent;
