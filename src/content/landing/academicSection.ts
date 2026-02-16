// Academic Section Content
export const academicSectionContent = {
    // Section Header
    overline: "Academic Programs",

    // Main Headlines
    title: {
        primary: "Excellence",
        secondary: "Across", // This gets gradient styling
        tertiary: "Every Level",
    },

    // Subtitle
    subtitle: "Comprehensive programs designed to challenge, inspire, and prepare students for lifelong success.",

    // Academic Programs Data
    programs: [
        {
            id: "elementary",
            title: "Elementary Excellence",
            level: "Grades K-5",
            description: "Building strong foundations through hands-on learning, creativity, and character development in our nurturing elementary environment.",
            icon: "School", // Material-UI icon name
            color: "#6366f1",
            backgroundImage: "/pexels-rdne-8500421.jpg",
            features: [
                "Small Classes",
                "STEAM Learning",
                "Character Building",
                "Creative Arts",
            ],
            stats: [
                { label: "Class Size", value: "12:1" },
                { label: "Programs", value: "8+" },
            ],
        },
        {
            id: "middle",
            title: "Middle School Growth",
            level: "Grades 6-8",
            description: "Developing critical thinking and leadership skills during these crucial formative years with personalized attention and advanced curricula.",
            icon: "MenuBook",
            color: "#8b5cf6",
            backgroundImage: "/shraga-kopstein-eUa90rsmjIs-unsplash.jpg",
            features: [
                "Advanced Academics",
                "Leadership",
                "Technology",
                "Social Development",
            ],
            stats: [
                { label: "Honor Students", value: "85%" },
                { label: "Clubs", value: "15+" },
            ],
        },
        {
            id: "high",
            title: "College Preparatory",
            level: "Grades 9-12",
            description: "Comprehensive preparation for higher education with AP courses, college counseling, and real-world application opportunities.",
            icon: "School",
            color: "#ec4899",
            backgroundImage: "/joydeep-sensarma-utyOEK4GwDM-unsplash.jpg",
            features: [
                "AP Courses",
                "College Prep",
                "Career Guidance",
                "Internships",
            ],
            stats: [
                { label: "College Accept", value: "100%" },
                { label: "Scholarships", value: "$2.4M" },
            ],
        },
        {
            id: "stem",
            title: "STEM Innovation",
            level: "All Grades",
            description: "Cutting-edge Science, Technology, Engineering, and Mathematics programs with state-of-the-art labs and research opportunities.",
            icon: "Science",
            color: "#10b981",
            backgroundImage: "/azzedine-rouichi-KDM09YR4_bY-unsplash.jpg",
            features: ["Research Labs", "Robotics", "Coding", "Innovation"],
            stats: [
                { label: "Competitions", value: "12+" },
                { label: "Awards", value: "45+" },
            ],
        },
        {
            id: "arts",
            title: "Creative Expression",
            level: "All Grades",
            description: "Comprehensive arts education fostering creativity through visual arts, music, theater, and digital media in dedicated studio spaces.",
            icon: "Palette",
            color: "#f59e0b",
            backgroundImage: "/pexels-mary-taylor-5896578.jpg",
            features: ["Visual Arts", "Music", "Theater", "Digital Media"],
            stats: [
                { label: "Exhibitions", value: "6+" },
                { label: "Performances", value: "20+" },
            ],
        },
        {
            id: "athletics",
            title: "Athletic Excellence",
            level: "All Grades",
            description: "Comprehensive athletics promoting fitness, teamwork, and competitive excellence with championship-level coaching and facilities.",
            icon: "Sports",
            color: "#ef4444",
            backgroundImage: "/pexels-rdne-8500421.jpg",
            features: ["Team Sports", "Fitness", "Championships", "Scholarships"],
            stats: [
                { label: "Sports", value: "18+" },
                { label: "Championships", value: "32+" },
            ],
        },
    ],

    // Swiper Configuration
    swiperConfig: {
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 1000,
        loop: true,
    },
};

export type AcademicSectionContent = typeof academicSectionContent;