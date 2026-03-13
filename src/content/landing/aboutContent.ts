import type { AboutContent } from '../../pages/Landing/_models/AboutContent.types';

/**
 * Comprehensive content for the About page
 * Includes mission, vision, core values, leadership team, history timeline, and achievements
 */

export const aboutContent: AboutContent = {
    mission:
        'At Kampux Academy, we are dedicated to nurturing curious, confident, and compassionate learners who are prepared to thrive in an ever-changing world. Through innovative teaching methods, personalized learning experiences, and a supportive community, we empower students to discover their unique strengths and passions. Our mission is to cultivate critical thinkers, creative problem-solvers, and responsible global citizens who will make meaningful contributions to society. We believe that every student deserves an education that honors their individuality while preparing them for academic excellence and lifelong success. By fostering a culture of respect, integrity, and collaboration, we create an environment where students can explore, grow, and achieve their fullest potential.',

    vision: 'Our vision is to be the leading educational institution recognized for transforming lives through excellence in teaching, character development, and innovation. We aspire to create a learning community where every student is inspired to pursue their dreams with confidence and purpose. By embracing cutting-edge educational practices and maintaining our commitment to holistic development, we aim to prepare students who will become the leaders, innovators, and changemakers of tomorrow. We envision a future where our graduates make lasting positive impacts in their communities and the world at large.',

    coreValues: [
        {
            id: 'excellence',
            title: 'Academic Excellence',
            description:
                'We maintain the highest standards in teaching and learning, challenging students to reach beyond their perceived limitations and achieve academic success.',
            icon: 'EmojiEvents',
        },
        {
            id: 'integrity',
            title: 'Integrity',
            description:
                'We foster honesty, ethical behavior, and strong moral character in all aspects of school life, preparing students to make principled decisions.',
            icon: 'Verified',
        },
        {
            id: 'innovation',
            title: 'Innovation',
            description:
                'We embrace creative thinking and encourage students to explore new ideas, technologies, and approaches to problem-solving.',
            icon: 'Lightbulb',
        },
        {
            id: 'community',
            title: 'Community',
            description:
                'We build strong relationships among students, families, and staff, creating a supportive environment where everyone feels valued and connected.',
            icon: 'People',
        },
        {
            id: 'diversity',
            title: 'Diversity & Inclusion',
            description:
                'We celebrate diverse backgrounds, perspectives, and experiences, ensuring every student feels welcomed and empowered to contribute.',
            icon: 'PublicOutlined',
        },
        {
            id: 'growth',
            title: 'Continuous Growth',
            description:
                'We promote lifelong learning and personal development, encouraging students and staff to continuously improve and adapt.',
            icon: 'TrendingUp',
        },
        {
            id: 'responsibility',
            title: 'Social Responsibility',
            description:
                'We inspire students to become active, engaged citizens who contribute positively to their communities and the global society.',
            icon: 'VolunteerActivism',
        },
        {
            id: 'wellness',
            title: 'Holistic Wellness',
            description:
                'We prioritize the physical, emotional, and mental well-being of our students, providing resources and support for balanced development.',
            icon: 'FavoriteBorder',
        },
    ],

    leadership: [
        {
            id: 'principal',
            name: 'Dr. Margaret Chen',
            role: 'Principal',
            bio: "Dr. Margaret Chen brings over 25 years of educational leadership experience to Kampux Academy. With a doctorate in Educational Administration from Stanford University and a master's in Curriculum Development, she has dedicated her career to transforming traditional education models. Before joining Kampux, Dr. Chen served as Assistant Superintendent for Curriculum and Instruction in a large metropolitan district, where she implemented innovative STEM programs that increased student achievement by 35%. Her vision for student-centered learning and commitment to educational equity have earned her numerous accolades, including the National Distinguished Principal Award.",
            photoUrl: '/images/leadership/margaret-chen.jpg',
            email: 'm.chen@kampux.edu',
            qualifications: [
                'Ed.D. in Educational Administration, Stanford University',
                'M.A. in Curriculum Development, Columbia University',
                'National Distinguished Principal Award',
            ],
        },
        {
            id: 'academic-director',
            name: 'Dr. James Richardson',
            role: 'Academic Director',
            bio: 'Dr. James Richardson oversees all academic programs at Kampux Academy, ensuring rigorous curriculum standards and innovative teaching methodologies. With a Ph.D. in Educational Psychology from Harvard and 20 years of experience in curriculum design, he has pioneered project-based learning initiatives that engage students in real-world problem-solving. Dr. Richardson previously served as Dean of Academics at a prestigious independent school, where he led the development of interdisciplinary programs that integrated technology across all subject areas. His research on student engagement and differentiated instruction has been published in leading educational journals.',
            photoUrl: '/images/leadership/james-richardson.jpg',
            email: 'j.richardson@kampux.edu',
            qualifications: [
                'Ph.D. in Educational Psychology, Harvard University',
                'M.Ed. in Curriculum and Instruction, UCLA',
                'Published researcher in educational innovation',
            ],
        },
        {
            id: 'student-life-director',
            name: 'Maria Santos',
            role: 'Director of Student Life',
            bio: "Maria Santos is passionate about creating a vibrant, inclusive community where every student feels valued and supported. With a master's degree in School Counseling and 15 years of experience in student affairs, she oversees all co-curricular activities, clubs, and student wellness programs. Maria has developed comprehensive support systems that address students' social-emotional needs while fostering leadership development. Her innovative peer mentoring program has been recognized as a model for building strong school communities. Maria's commitment to student voice and agency ensures that our school culture reflects the values and needs of our diverse student body.",
            photoUrl: '/images/leadership/maria-santos.jpg',
            email: 'm.santos@kampux.edu',
            qualifications: [
                'M.A. in School Counseling, Boston University',
                'Licensed Professional Counselor',
                'Certified in Restorative Justice Practices',
            ],
        },
        {
            id: 'operations-director',
            name: 'Robert Kim',
            role: 'Director of Operations',
            bio: "Robert Kim brings strategic vision and operational excellence to Kampux Academy's administrative functions. With an MBA in Organizational Management and 18 years of experience in educational operations, he ensures that our facilities, technology infrastructure, and business operations support our academic mission. Robert previously managed operations for a multi-campus educational organization, implementing sustainable practices that reduced costs by 20% while improving service quality. His expertise in strategic planning and resource management enables Kampux to invest in cutting-edge educational resources while maintaining financial stability.",
            photoUrl: '/images/leadership/robert-kim.jpg',
            email: 'r.kim@kampux.edu',
            qualifications: [
                'MBA in Organizational Management, Northwestern University',
                'B.S. in Business Administration, UC Berkeley',
                'Certified Educational Facilities Manager',
            ],
        },
        {
            id: 'admissions-director',
            name: 'Dr. Emily Patel',
            role: 'Director of Admissions & Enrollment',
            bio: "Dr. Emily Patel leads our admissions process with a commitment to identifying students who will thrive in Kampux's dynamic learning environment. With a doctorate in Higher Education Administration and 12 years of experience in enrollment management, she has developed holistic admissions practices that look beyond test scores to recognize diverse talents and potential. Dr. Patel's approach emphasizes finding the right fit between student needs and school offerings, resulting in high retention rates and student satisfaction. She works closely with families throughout the admissions journey, ensuring a welcoming and transparent experience.",
            photoUrl: '/images/leadership/emily-patel.jpg',
            email: 'e.patel@kampux.edu',
            qualifications: [
                'Ed.D. in Higher Education Administration, USC',
                'M.A. in Student Affairs, NYU',
                'Member, National Association for College Admission Counseling',
            ],
        },
        {
            id: 'technology-director',
            name: 'David Okonkwo',
            role: 'Director of Educational Technology',
            bio: "David Okonkwo leads Kampux Academy's integration of technology into teaching and learning. With a master's in Educational Technology and 14 years of experience as both a classroom teacher and technology specialist, he bridges the gap between pedagogy and innovation. David has implemented comprehensive digital learning platforms, coding programs, and maker spaces that prepare students for the demands of the 21st century. His professional development programs help teachers leverage technology to enhance student engagement and personalize instruction. David's vision ensures that technology serves as a tool for deeper learning rather than a replacement for meaningful human interaction.",
            photoUrl: '/images/leadership/david-okonkwo.jpg',
            email: 'd.okonkwo@kampux.edu',
            qualifications: [
                'M.Ed. in Educational Technology, MIT',
                'B.S. in Computer Science, Georgia Tech',
                'Google Certified Educator Level 2',
            ],
        },
    ],

    history: [
        {
            year: '1985',
            title: 'Foundation Established',
            description:
                'Kampux Academy was founded by a group of visionary educators who believed in creating a school where academic rigor and character development go hand in hand. Starting with just 75 students in grades K-5, the school quickly gained recognition for its innovative teaching approaches.',
        },
        {
            year: '1992',
            title: 'Middle School Expansion',
            description:
                'In response to parent demand and student success, Kampux expanded to include middle school grades 6-8. The new wing featured state-of-the-art science laboratories and a performing arts center, reflecting our commitment to comprehensive education.',
        },
        {
            year: '2001',
            title: 'High School Opening',
            description:
                'The opening of our high school program marked a significant milestone, allowing students to continue their Kampux journey through grade 12. The inaugural graduating class of 2005 achieved a 100% college acceptance rate, setting a standard of excellence that continues today.',
        },
        {
            year: '2010',
            title: 'STEM Center of Excellence',
            description:
                'With generous support from alumni and community partners, we opened the Dr. Sarah Williams STEM Center, featuring robotics labs, a planetarium, and collaborative research spaces. This facility positioned Kampux as a leader in science and technology education.',
        },
        {
            year: '2015',
            title: 'Global Partnerships Initiative',
            description: `Kampux established exchange programs with schools in six countries, providing students with opportunities for international collaboration and cultural immersion. These partnerships enriched our curriculum and broadened our students' global perspectives.`,
        },
        {
            year: '2020',
            title: 'Innovation in Digital Learning',
            description:
                'When the global pandemic challenged traditional education models, Kampux seamlessly transitioned to a hybrid learning environment. Our investment in technology infrastructure and teacher training ensured continuity of education and demonstrated our adaptability and resilience.',
        },
        {
            year: '2024',
            title: 'Sustainability Campus Initiative',
            description:
                'Kampux completed a major campus renovation incorporating solar panels, rainwater harvesting systems, and LEED-certified buildings. Our sustainability curriculum now includes hands-on environmental projects, preparing students to address climate challenges facing their generation.',
        },
    ],

    achievements: [
        {
            id: 'college-acceptance',
            label: 'College Acceptance',
            value: '100%',
            description:
                '4-year college acceptance rate for 15 consecutive years',
            icon: 'School',
        },
        {
            id: 'national-merit',
            label: 'National Merit Scholars',
            value: '47',
            description: 'National Merit Scholars in the past five years',
            icon: 'EmojiEvents',
        },
        {
            id: 'student-teacher',
            label: 'Student-Teacher Ratio',
            value: '8:1',
            description: 'Ensuring personalized attention for every student',
            icon: 'Groups',
        },
        {
            id: 'ap-scores',
            label: 'AP Excellence',
            value: '4.2',
            description: 'Average AP exam score (national average: 2.9)',
            icon: 'Star',
        },
        {
            id: 'community-service',
            label: 'Service Hours',
            value: '15,000+',
            description: 'Community service hours contributed annually',
            icon: 'VolunteerActivism',
        },
        {
            id: 'satisfaction',
            label: 'Parent Satisfaction',
            value: '98%',
            description:
                'Parents rate their experience as excellent or outstanding',
            icon: 'ThumbUp',
        },
    ],
};
