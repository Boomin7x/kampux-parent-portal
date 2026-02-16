// Faculty Section Content
export const facultySectionContent = {
    // Section Header
    overline: "Meet Our Faculty",

    // Main Headlines
    title: {
        primary: "Inspiring",
        secondary: "Educators", // This gets gradient styling
    },

    // Subtitle
    subtitle: "World-class educators dedicated to nurturing minds and shaping tomorrow's leaders.",

    // Featured Faculty Data
    featuredFaculty: [
        {
            id: "1",
            name: "Dr. Sarah Mitchell",
            title: "Principal & Educational Leader",
            department: "Administration",
            specialization: "Educational Excellence & Innovation",
            bio: "Leading Excellence Academy with 25+ years of educational expertise, championing student-centered learning and academic innovation.",
            image: "/pexels-cottonbro-7395304.jpg",
        },
        {
            id: "2",
            name: "Prof. Michael Chen",
            title: "STEM Department Head",
            department: "Science & Mathematics",
            specialization: "Advanced Physics & Research Methods",
            bio: "Inspiring the next generation of scientists through hands-on research and innovative STEM curricula that bridge theory and practice.",
            image: "/pexels-matazumultimedia-32951018.jpg",
        },
        {
            id: "3",
            name: "Ms. Elena Rodriguez",
            title: "Arts & Literature Director",
            department: "Humanities & Fine Arts",
            specialization: "Creative Writing & Visual Arts",
            bio: "Fostering creativity and critical thinking through integrated arts education that develops both artistic expression and analytical skills.",
            image: "/pexels-katerina-holmes-5905899.jpg",
        },
    ],

    // Faculty Excellence Statistics
    stats: {
        title: "Excellence in Education",
        data: [
            {
                number: "85+",
                label: "Expert\nEducators",
                description: "Qualified professionals",
            },
            {
                number: "95%",
                label: "Advanced\nDegrees",
                description: "Master's or higher",
            },
            {
                number: "12:1",
                label: "Student\nRatio",
                description: "Personalized attention",
            },
            {
                number: "25+",
                label: "Years\nExperience",
                description: "Average tenure",
            },
        ],
    },

    // Inspirational Quote
    quote: {
        text: "Excellence is never an accident. It is always the result of high intention, sincere effort, and skilled execution.",
        attribution: "Our Faculty Philosophy",
    },

    // Visual Configuration
    styling: {
        backgroundColor: "#f8fafc",
        titleGradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        primaryColor: "#6366f1",
        secondaryColor: "#8b5cf6",
        aspectRatio: "3/4", // For faculty images
    },
};

export type FacultySectionContent = typeof facultySectionContent;