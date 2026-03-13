import type { AcademicsContent } from '../../pages/Landing/_models/AcademicsContent.types';

/**
 * Comprehensive content for the Academics page
 * Includes educational philosophy, programs, curriculum, calendar, and statistics
 */

export const academicsContent: AcademicsContent = {
    philosophy:
        "At Kampux Academy, our educational philosophy centers on developing the whole child through a balanced approach that honors both academic rigor and creative exploration. We believe that true learning happens when students are actively engaged in constructing knowledge, not passively receiving information. Our curriculum is designed to foster critical thinking, creativity, collaboration, and communication—the essential skills for success in the 21st century. By integrating project-based learning, technology, and real-world applications across all subjects, we prepare students to become lifelong learners who can adapt to an ever-changing world. We recognize that each student learns differently, and our differentiated instruction ensures that every child is appropriately challenged and supported.",

    programs: [
        {
            id: 'elementary',
            name: 'Elementary Program',
            gradeLevel: 'Kindergarten - Grade 5',
            description:
                'Our elementary program builds a strong foundation in literacy, mathematics, and scientific inquiry while nurturing curiosity and creativity. Students develop essential skills through hands-on learning experiences, collaborative projects, and personalized instruction.',
            features: [
                'Balanced literacy approach with daily reading and writing workshops',
                'Singapore Math methodology for conceptual understanding',
                'Integrated STEM curriculum with weekly maker time',
                'Social-emotional learning embedded in daily routines',
                'Specialist instruction in art, music, physical education, and technology',
                'Small class sizes (average 16 students) for individualized attention',
            ],
            subjects: [
                'Language Arts',
                'Mathematics',
                'Science',
                'Social Studies',
                'Visual Arts',
                'Music',
                'Physical Education',
                'Spanish',
            ],
        },
        {
            id: 'middle',
            name: 'Middle School Program',
            gradeLevel: 'Grades 6-8',
            description:
                'Our middle school program challenges students to think critically, work collaboratively, and develop their unique identities. The curriculum balances core academic subjects with exploratory courses, providing opportunities for students to discover their passions.',
            features: [
                'Interdisciplinary project-based learning units',
                'Advisory program providing academic and social-emotional support',
                'Advanced coursework options in all subject areas',
                'Design thinking and entrepreneurship electives',
                'Comprehensive digital literacy and coding curriculum',
                'Leadership opportunities through student government and clubs',
            ],
            subjects: [
                'English Language Arts',
                'Mathematics (Pre-Algebra to Geometry)',
                'Physical Science',
                'Life Science',
                'World History',
                'Geography',
                'Spanish or Mandarin',
                'Electives (Arts, Technology, Engineering)',
            ],
        },
        {
            id: 'high',
            name: 'High School Program',
            gradeLevel: 'Grades 9-12',
            description:
                'Our high school program offers a rigorous college-preparatory curriculum with extensive Advanced Placement options and personalized pathways. Students engage in deep inquiry, independent research, and real-world applications while receiving comprehensive college counseling support.',
            features: [
                '28 Advanced Placement courses across all disciplines',
                'Dual enrollment options with partner universities',
                'Senior capstone project with community partnership',
                'Comprehensive college counseling beginning in 9th grade',
                'Internship and mentorship opportunities with local businesses',
                'Flexible scheduling to accommodate advanced coursework and activities',
            ],
            subjects: [
                'English Literature & Composition',
                'Mathematics (Algebra II through Calculus)',
                'Biology, Chemistry, Physics',
                'World History, US History, Government, Economics',
                'World Languages (Spanish, Mandarin, French)',
                'Computer Science & Engineering',
                'Visual & Performing Arts',
                'Electives (Psychology, Environmental Science, Philosophy)',
            ],
        },
    ],

    specialPrograms: [
        {
            id: 'stem',
            name: 'STEM Excellence Program',
            description:
                'Our STEM program integrates science, technology, engineering, and mathematics through hands-on projects, competitions, and partnerships with industry leaders. Students work in our state-of-the-art labs on real-world challenges.',
            gradeLevels: ['Elementary', 'Middle School', 'High School'],
            features: [
                'Robotics teams competing at national and international levels',
                'Coding bootcamps and computer science pathways',
                'Engineering design challenges with community impact',
                'Partnerships with local tech companies for mentorship',
                'Annual Innovation Fair showcasing student projects',
            ],
            icon: 'Science',
        },
        {
            id: 'arts',
            name: 'Visual & Performing Arts',
            description:
                'Our comprehensive arts program develops creative expression across multiple disciplines, from visual arts to music, theater, and dance. Students showcase their talents through exhibitions, concerts, and performances throughout the year.',
            gradeLevels: ['Elementary', 'Middle School', 'High School'],
            features: [
                'Professional-grade art studios and music facilities',
                'Multiple performance opportunities including fall play and spring musical',
                'Portfolio development for college-bound artists',
                'Master classes with visiting artists and performers',
                'Annual Art Exhibition and Spring Arts Festival',
            ],
            icon: 'Palette',
        },
        {
            id: 'athletics',
            name: 'Athletics & Wellness',
            description:
                'Our athletics program promotes physical fitness, teamwork, and sportsmanship through competitive sports and wellness education. Students develop healthy habits and leadership skills while representing Kampux in interscholastic competitions.',
            gradeLevels: ['Middle School', 'High School'],
            features: [
                '18 varsity sports teams with championship records',
                'Strength and conditioning program for all athletes',
                'Sports medicine and injury prevention training',
                'Wellness education including nutrition and mental health',
                'Junior varsity and recreational sports for all skill levels',
            ],
            icon: 'SportsBasketball',
        },
        {
            id: 'languages',
            name: 'World Languages Program',
            description:
                'Our language program develops proficiency in Spanish, Mandarin, and French through immersive instruction and cultural experiences. Students gain global competency and intercultural communication skills.',
            gradeLevels: ['Elementary', 'Middle School', 'High School'],
            features: [
                'Immersion experiences beginning in elementary school',
                'AP-level courses in Spanish, Mandarin, and French',
                'Study abroad and exchange programs with partner schools',
                'Language clubs and cultural celebration events',
                'Service learning projects with international focus',
            ],
            icon: 'Language',
        },
    ],

    curriculum: [
        {
            id: 'english',
            name: 'English Language Arts',
            description:
                'Our ELA curriculum develops strong reading, writing, speaking, and listening skills through the study of diverse literary genres and authentic writing experiences.',
            courses: [
                'Literature & Composition',
                'Creative Writing',
                'Rhetoric & Public Speaking',
                'AP English Language',
                'AP English Literature',
                'Journalism',
            ],
            weeklyHours: 5,
            icon: 'MenuBook',
        },
        {
            id: 'mathematics',
            name: 'Mathematics',
            description:
                'Our math program builds conceptual understanding and problem-solving skills through a progression from foundational arithmetic to advanced calculus.',
            courses: [
                'Pre-Algebra',
                'Algebra I & II',
                'Geometry',
                'Trigonometry',
                'Pre-Calculus',
                'AP Calculus AB & BC',
                'Statistics & Data Science',
            ],
            weeklyHours: 5,
            icon: 'Calculate',
        },
        {
            id: 'science',
            name: 'Science',
            description:
                'Our science curriculum emphasizes inquiry-based learning, laboratory investigations, and real-world applications across multiple scientific disciplines.',
            courses: [
                'Physical Science',
                'Biology',
                'Chemistry',
                'Physics',
                'AP Biology',
                'AP Chemistry',
                'AP Physics',
                'Environmental Science',
            ],
            weeklyHours: 5,
            icon: 'Science',
        },
        {
            id: 'social-studies',
            name: 'Social Studies',
            description:
                'Our social studies program develops historical thinking, cultural awareness, and civic engagement through the study of history, geography, economics, and government.',
            courses: [
                'World Geography',
                'World History',
                'US History',
                'Government & Politics',
                'Economics',
                'AP US History',
                'AP World History',
                'AP Government',
            ],
            weeklyHours: 4,
            icon: 'PublicOutlined',
        },
        {
            id: 'world-languages',
            name: 'World Languages',
            description:
                'Our language program develops proficiency through communicative approaches, cultural studies, and authentic language experiences.',
            courses: [
                'Spanish I-IV',
                'Mandarin I-IV',
                'French I-IV',
                'AP Spanish',
                'AP Mandarin',
                'AP French',
            ],
            weeklyHours: 4,
            icon: 'Language',
        },
        {
            id: 'computer-science',
            name: 'Computer Science & Technology',
            description:
                'Our CS program teaches computational thinking, programming, and digital literacy skills essential for the modern world.',
            courses: [
                'Introduction to Programming',
                'Web Development',
                'Data Structures',
                'AP Computer Science A',
                'AP Computer Science Principles',
                'Robotics & Engineering',
            ],
            weeklyHours: 3,
            icon: 'Computer',
        },
        {
            id: 'arts',
            name: 'Visual & Performing Arts',
            description:
                'Our arts program nurtures creativity and artistic expression across visual arts, music, theater, and dance.',
            courses: [
                'Drawing & Painting',
                'Digital Media & Photography',
                'Ceramics & Sculpture',
                'Concert Band',
                'Chorus',
                'Theater Arts',
                'AP Studio Art',
            ],
            weeklyHours: 3,
            icon: 'Palette',
        },
        {
            id: 'physical-education',
            name: 'Physical Education & Health',
            description:
                'Our PE and health program promotes lifelong fitness, healthy living, and personal wellness through diverse physical activities.',
            courses: [
                'Physical Education',
                'Health & Wellness',
                'Sports Medicine',
                'Nutrition Science',
                'Personal Fitness',
            ],
            weeklyHours: 3,
            icon: 'FitnessCenter',
        },
    ],

    calendar: [
        {
            id: 'fall-start',
            date: '2026-08-25',
            title: 'Fall Semester Begins',
            description: 'First day of school for all grades',
            type: 'event',
        },
        {
            id: 'labor-day',
            date: '2026-09-07',
            title: 'Labor Day Holiday',
            description: 'No school - campus closed',
            type: 'holiday',
        },
        {
            id: 'parent-conferences',
            date: '2026-10-15',
            title: 'Fall Parent-Teacher Conferences',
            description: 'Evening conferences for all grade levels',
            type: 'event',
        },
        {
            id: 'thanksgiving',
            date: '2026-11-23',
            title: 'Thanksgiving Break',
            description: 'Week-long break (November 23-27)',
            type: 'break',
        },
        {
            id: 'winter-exams',
            date: '2026-12-14',
            title: 'Fall Semester Exams',
            description: 'Final examinations for middle and high school',
            type: 'exam',
        },
        {
            id: 'winter-break',
            date: '2026-12-21',
            title: 'Winter Break',
            description: 'Holiday break (December 21 - January 3)',
            type: 'break',
        },
        {
            id: 'spring-start',
            date: '2027-01-04',
            title: 'Spring Semester Begins',
            description: 'Students return from winter break',
            type: 'event',
        },
        {
            id: 'mlk-day',
            date: '2027-01-18',
            title: 'Martin Luther King Jr. Day',
            description: 'No school - campus closed',
            type: 'holiday',
        },
        {
            id: 'spring-break',
            date: '2027-03-15',
            title: 'Spring Break',
            description: 'Week-long break (March 15-19)',
            type: 'break',
        },
        {
            id: 'ap-exams',
            date: '2027-05-03',
            title: 'AP Examination Period',
            description: 'College Board AP exams (May 3-14)',
            type: 'exam',
        },
        {
            id: 'spring-exams',
            date: '2027-05-24',
            title: 'Spring Semester Exams',
            description: 'Final examinations for all grade levels',
            type: 'exam',
        },
        {
            id: 'graduation',
            date: '2027-06-05',
            title: 'Commencement Ceremony',
            description: 'High school graduation ceremony',
            type: 'event',
        },
        {
            id: 'school-end',
            date: '2027-06-10',
            title: 'Last Day of School',
            description: 'End of academic year for all students',
            type: 'event',
        },
    ],

    stats: {
        graduationRate: '100%',
        collegeAcceptance: '100%',
        averageGPA: '3.85',
        apCourses: '28',
        studentTeacherRatio: '8:1',
        nationalMeritScholars: '47',
    },
};
