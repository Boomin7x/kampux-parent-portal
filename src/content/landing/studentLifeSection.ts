// Student Life Section Content
export const studentLifeSectionContent = {
    // Section Header
    overline: "Student Life",

    // Main Headlines
    title: {
        primary: "Beyond the",
        secondary: "Classroom", // This gets gradient styling
    },

    // Subtitle
    subtitle: "Rich extracurricular programs that develop character, creativity, and leadership for life.",

    // Featured Activities Data
    featuredActivities: [
        {
            id: "athletics",
            title: "Athletic Excellence",
            description: "Competitive sports programs that build character, develop teamwork, and foster physical wellness while creating champions on and off the field.",
            icon: "Sports", // Material-UI icon name
            color: "#ef4444",
            participants: "400+ Students",
            achievements: [
                "State Championships",
                "Regional Titles",
                "College Scholarships",
            ],
            image: "/pexels-cics-uma-ipn-238541486-12238968.jpg",
        },
        {
            id: "creative-arts",
            title: "Creative Arts",
            description: "Comprehensive arts programs including theater, music, and visual arts that nurture creative expression and artistic excellence.",
            icon: "Palette",
            color: "#ec4899",
            participants: "350+ Students",
            achievements: [
                "Award-Winning Productions",
                "Art Exhibitions",
                "Music Festivals",
            ],
            image: "/raymond-yeung-uwhDZbX-sz8-unsplash.jpg",
        },
        {
            id: "stem-innovation",
            title: "STEM Innovation",
            description: "Cutting-edge science, technology, and robotics programs that prepare students for tomorrow's challenges through hands-on learning.",
            icon: "Science",
            color: "#10b981",
            participants: "280+ Students",
            achievements: [
                "National Competitions",
                "Innovation Awards",
                "Research Publications",
            ],
            image: "/patrick-amoy-6DfEbkqsTiA-unsplash.jpg",
        },
        {
            id: "leadership",
            title: "Leadership Development",
            description: "Student government, debate teams, and community service programs that cultivate the next generation of ethical leaders.",
            icon: "Groups",
            color: "#6366f1",
            participants: "200+ Students",
            achievements: [
                "Student Government",
                "Community Impact",
                "Leadership Awards",
            ],
            image: "/azzedine-rouichi-KDM09YR4_bY-unsplash.jpg",
        },
    ],

    // Student Life Statistics
    stats: {
        title: "Engagement & Impact",
        data: [
            {
                number: "45+",
                label: "Clubs &\nActivities",
                description: "Something for everyone",
            },
            {
                number: "1200+",
                label: "Active\nParticipants",
                description: "Engaged students",
            },
            {
                number: "95%",
                label: "Student\nParticipation",
                description: "School-wide involvement",
            },
            {
                number: "150+",
                label: "Annual\nEvents",
                description: "Year-round activities",
            },
        ],
    },

    // Inspirational Quote
    quote: {
        text: "Student life at Excellence Academy isn't just about activities—it's about discovering passions, building confidence, and creating memories that last a lifetime.",
        attribution: "Student Experience Philosophy",
    },

    // Visual Configuration
    styling: {
        backgroundColor: "#fefefe",
        titleGradient: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
        statsColor: "#ec4899",
        aspectRatio: "16/10", // For activity images
    },
};

export type StudentLifeSectionContent = typeof studentLifeSectionContent;