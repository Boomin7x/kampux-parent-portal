// Footer Content
export const footerContent = {
    // Brand Section
    brand: {
        name: {
            primary: "Excellence",
            secondary: "Academy", // Gets gradient styling
        },
        tagline: "Shaping tomorrow's leaders through academic excellence and character development.",
    },

    // Contact Information
    contactInfo: [
        {
            icon: "Phone",
            label: "Phone",
            value: "(555) 123-4567",
            href: "tel:+15551234567",
        },
        {
            icon: "Email",
            label: "Email",
            value: "info@excellenceacademy.edu",
            href: "mailto:info@excellenceacademy.edu",
        },
        {
            icon: "LocationOn",
            label: "Address",
            value: "123 Education Boulevard, Learning City, LC 12345",
            href: "#", // No action for address
        },
    ],

    // Footer Navigation Links
    links: {
        about: [
            { label: "Our Story", href: "#about" },
            { label: "Mission & Values", href: "#about" },
            { label: "Leadership", href: "#faculty" },
            { label: "Careers", href: "#" },
        ],
        academics: [
            { label: "Programs", href: "#programs" },
            { label: "Curriculum", href: "#programs" },
            { label: "Academic Excellence", href: "#programs" },
            { label: "Student Resources", href: "#" },
        ],
        studentLife: [
            { label: "Activities", href: "#student-life" },
            { label: "Athletics", href: "#student-life" },
            { label: "Arts & Culture", href: "#student-life" },
            { label: "Clubs", href: "#student-life" },
        ],
        resources: [
            { label: "Parent Portal", href: "/auth" },
            { label: "Calendar", href: "#" },
            { label: "News & Events", href: "#events-announcements" },
            { label: "Contact", href: "#contact" },
        ],
    },

    // Social Media Links
    socialLinks: [
        { icon: "Facebook", href: "#", label: "Facebook" },
        { icon: "Twitter", href: "#", label: "Twitter" },
        { icon: "Instagram", href: "#", label: "Instagram" },
        { icon: "LinkedIn", href: "#", label: "LinkedIn" },
        { icon: "YouTube", href: "#", label: "YouTube" },
    ],

    // Copyright
    copyright: {
        year: new Date().getFullYear(),
        text: "Excellence Academy. All rights reserved.",
    },

    // Visual Configuration
    styling: {
        backgroundColor: "#1a1a1a",
        brandGradient: "linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #10b981 100%)",
        primaryColor: "#6366f1",
    },
};

export type FooterContent = typeof footerContent;