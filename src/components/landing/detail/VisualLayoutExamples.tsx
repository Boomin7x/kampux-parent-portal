import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import {
    ImageHero,
    ImageTextBlock,
    ImageGrid,
    ProfileCard,
    ActivityCard,
    TimelineItem,
} from './index';

// This component demonstrates how to use the Phase 3 visual components
// to create compelling, image-forward layouts

export const VisualLayoutExamples: React.FC = () => {
    // Sample data for demonstrations
    const sampleImages = [
        {
            id: '1',
            src: '/images/sample/classroom-1.jpg',
            alt: 'Modern classroom with interactive whiteboard',
            title: 'Interactive Learning Environment',
            description: 'State-of-the-art classrooms equipped with the latest technology',
            category: 'Classrooms',
        },
        {
            id: '2',
            src: '/images/sample/library-1.jpg',
            alt: 'Spacious library with natural lighting',
            title: 'Digital Library',
            description: 'Over 50,000 digital and physical resources',
            category: 'Library',
        },
        {
            id: '3',
            src: '/images/sample/lab-1.jpg',
            alt: 'Science laboratory with modern equipment',
            title: 'Science Laboratory',
            description: 'Fully equipped labs for hands-on experiments',
            category: 'Laboratories',
        },
        // Add more images as needed
    ];

    const sampleProfile = {
        id: 'prof-1',
        name: 'Dr. Sarah Johnson',
        title: 'Head of Mathematics Department',
        department: 'Mathematics',
        bio: 'Dr. Johnson brings over 15 years of experience in mathematical education and research. She specializes in advanced calculus and statistical analysis, with a passion for making complex concepts accessible to all students.',
        qualifications: [
            'Ph.D. in Mathematics - Stanford University',
            'M.S. in Applied Mathematics - MIT',
            'B.S. in Mathematics - Harvard University',
        ],
        yearsOfExperience: 15,
        email: 'sarah.johnson@school.edu',
        phone: '+1 (555) 123-4567',
        avatar: '/images/faculty/sarah-johnson.jpg',
        specialties: ['Calculus', 'Statistics', 'Data Analysis', 'Linear Algebra'],
        achievements: [
            'Outstanding Teacher Award 2023',
            'Published 25+ peer-reviewed papers',
            'Mathematics Department Excellence Award',
        ],
    };

    const sampleActivity = {
        id: 'activity-1',
        title: 'Advanced Robotics Club',
        description: 'Learn to build and program robots using cutting-edge technology. Students work on real-world projects and compete in national competitions.',
        image: '/images/activities/robotics-club.jpg',
        imageAlt: 'Students working on robot programming',
        category: 'STEM',
        schedule: 'Tuesdays & Thursdays, 3:30-5:00 PM',
        location: 'Engineering Lab, Building A',
        capacity: 20,
        enrolled: 15,
        difficulty: 'Intermediate' as const,
        rating: 4.8,
        instructor: 'Prof. Michael Chen',
        ageGroup: '14-18 years',
        price: 'Free',
        isPopular: true,
    };

    const timelineItems = [
        {
            id: 'timeline-1',
            year: '2020',
            title: 'Digital Transformation Initiative',
            description: 'Launched comprehensive digital learning platform and equipped all classrooms with interactive technology.',
            image: '/images/timeline/digital-transformation.jpg',
            category: 'development' as const,
            details: [
                'Installed 150+ interactive whiteboards',
                'Deployed 1:1 device program for all students',
                'Launched custom learning management system',
            ],
            statistics: [
                { label: 'Classrooms', value: '150+' },
                { label: 'Devices', value: '2,000' },
                { label: 'Teachers Trained', value: '200+' },
            ],
            isHighlight: true,
            position: 'right' as const,
        },
        {
            id: 'timeline-2',
            year: '2019',
            title: 'New Science Building Opens',
            description: 'State-of-the-art science facility with advanced laboratories and research spaces opened to students.',
            image: '/images/timeline/science-building.jpg',
            category: 'education' as const,
            details: [
                ' 12 specialized laboratory spaces',
                'Greenhouse and observatory',
                'Research collaboration spaces',
            ],
            statistics: [
                { label: 'Labs', value: '12' },
                { label: 'Sq Ft', value: '50K+' },
                { label: 'Students', value: '800+' },
            ],
            position: 'left' as const,
        },
    ];

    return (
        <Box>
            {/* Hero Section Example */}
            <Box component="section" sx={{ mb: 8 }}>
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: 'center',
                        mb: 4,
                        fontWeight: 700,
                        color: 'text.primary',
                    }}
                >
                    Visual Layout Examples
                </Typography>
                <ImageHero
                    title="Excellence in Education"
                    subtitle="Where Innovation Meets Tradition"
                    description="Discover our state-of-the-art facilities and world-class programs designed to prepare students for tomorrow's challenges."
                    backgroundImage="/images/hero/school-campus.jpg"
                    badge="Established 1985"
                    height={{ xs: '50vh', md: '60vh' }}
                    textAlign="center"
                />
            </Box>

            {/* Image Text Block Examples */}
            <Container maxWidth="lg" sx={{ mb: 8 }}>
                <Typography
                    variant="h5"
                    sx={{
                        textAlign: 'center',
                        mb: 6,
                        fontWeight: 600,
                        color: 'text.primary',
                    }}
                >
                    Image-Text Block Layouts
                </Typography>

                <Box sx={{ mb: 6 }}>
                    <ImageTextBlock
                        title="Our Mission"
                        description="We believe in nurturing young minds through innovative teaching methods and cutting-edge technology. Our approach combines traditional values with modern educational practices to create well-rounded individuals ready for the challenges of tomorrow."
                        image="/images/content/mission-image.jpg"
                        imageAlt="Students collaborating in modern classroom"
                        imagePosition="right"
                        ctaText="Learn More About Us"
                        onCtaClick={() => console.log('Mission CTA clicked')}
                        badge="Our Purpose"
                        backgroundColor="#f8fafc"
                    />
                </Box>

                <Box sx={{ mb: 6 }}>
                    <ImageTextBlock
                        title="Advanced Technology Integration"
                        description="Every classroom is equipped with the latest technology to enhance learning experiences. From interactive whiteboards to VR learning stations, we provide students with tools that prepare them for a digital future."
                        image="/images/content/technology-classroom.jpg"
                        imageAlt="Interactive classroom technology"
                        imagePosition="left"
                        ctaText="Explore Our Facilities"
                        badge="Innovation"
                    />
                </Box>
            </Container>

            {/* Image Grid Example */}
            <Container maxWidth="lg" sx={{ mb: 8 }}>
                <Typography
                    variant="h5"
                    sx={{
                        textAlign: 'center',
                        mb: 6,
                        fontWeight: 600,
                        color: 'text.primary',
                    }}
                >
                    Campus Gallery
                </Typography>
                <ImageGrid
                    images={sampleImages}
                    columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
                    aspectRatio="4/3"
                    enableLightbox={true}
                    showTitles={true}
                    showCategories={true}
                    filterCategories={true}
                />
            </Container>

            {/* Profile Card Example */}
            <Container maxWidth="lg" sx={{ mb: 8 }}>
                <Typography
                    variant="h5"
                    sx={{
                        textAlign: 'center',
                        mb: 6,
                        fontWeight: 600,
                        color: 'text.primary',
                    }}
                >
                    Faculty Showcase
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <ProfileCard
                            {...sampleProfile}
                            variant="faculty"
                            showContactInfo={true}
                        />
                    </Grid>
                </Grid>
            </Container>

            {/* Activity Card Example */}
            <Container maxWidth="lg" sx={{ mb: 8 }}>
                <Typography
                    variant="h5"
                    sx={{
                        textAlign: 'center',
                        mb: 6,
                        fontWeight: 600,
                        color: 'text.primary',
                    }}
                >
                    Student Activities
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <ActivityCard
                            {...sampleActivity}
                            onEnroll={(id) => console.log('Enroll clicked:', id)}
                            onViewDetails={(id) => console.log('Details clicked:', id)}
                            onFavoriteToggle={(id) => console.log('Favorite toggled:', id)}
                        />
                    </Grid>
                </Grid>
            </Container>

            {/* Timeline Example */}
            <Container maxWidth="lg" sx={{ mb: 8 }}>
                <Typography
                    variant="h5"
                    sx={{
                        textAlign: 'center',
                        mb: 6,
                        fontWeight: 600,
                        color: 'text.primary',
                    }}
                >
                    Our Journey
                </Typography>
                <Box sx={{ position: 'relative' }}>
                    {timelineItems.map((item, index) => (
                        <TimelineItem
                            key={item.id}
                            {...item}
                            index={index}
                        />
                    ))}
                </Box>
            </Container>
        </Box>
    );
};