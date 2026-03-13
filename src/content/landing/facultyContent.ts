import type { FacultyContent } from '../../pages/Landing/_models/FacultyContent.types';

/**
 * Comprehensive content for the Faculty page
 * Includes faculty overview, departments, profiles, and professional development
 */

export const facultyContent: FacultyContent = {
    overview:
        'At Kampux Academy, our exceptional faculty members are the heart of our educational mission. Comprising passionate educators, dedicated mentors, and accomplished scholars, our teaching staff brings diverse expertise and unwavering commitment to student success. Each faculty member is carefully selected not only for their academic credentials and subject matter expertise, but also for their ability to inspire curiosity, foster critical thinking, and build meaningful relationships with students. With an average of 14 years of teaching experience and over 75% holding advanced degrees in their fields, our faculty represents the pinnacle of educational excellence. They continuously engage in professional development, collaborate across disciplines, and innovate their teaching practices to ensure every student receives a world-class education.',

    stats: {
        totalFaculty: 82,
        averageExperience: 14,
        advancedDegrees: '78%',
        departments: 7,
    },

    departments: [
        {
            id: 'humanities',
            name: 'Humanities & English',
            description:
                'Our humanities department cultivates critical reading, analytical writing, and effective communication skills through the study of literature, language, and rhetoric.',
            facultyCount: 14,
            icon: 'MenuBook',
            headOfDepartment: 'Dr. Sarah Williams',
        },
        {
            id: 'mathematics',
            name: 'Mathematics',
            description:
                'The mathematics department develops quantitative reasoning and problem-solving abilities through rigorous coursework from foundational concepts to advanced calculus.',
            facultyCount: 12,
            icon: 'Calculate',
            headOfDepartment: 'Dr. Michael Zhang',
        },
        {
            id: 'science',
            name: 'Science',
            description:
                'Our science department fosters scientific inquiry and hands-on investigation across biology, chemistry, physics, and environmental science.',
            facultyCount: 15,
            icon: 'Science',
            headOfDepartment: 'Dr. Jennifer Martinez',
        },
        {
            id: 'social-studies',
            name: 'Social Studies',
            description:
                'The social studies department examines history, culture, and civic systems to develop informed and engaged global citizens.',
            facultyCount: 10,
            icon: 'PublicOutlined',
            headOfDepartment: 'Mr. Robert Thompson',
        },
        {
            id: 'world-languages',
            name: 'World Languages',
            description:
                'Our language department develops linguistic proficiency and cultural competency through immersive instruction in Spanish, Mandarin, and French.',
            facultyCount: 9,
            icon: 'Language',
            headOfDepartment: 'Ms. Carmen Rodriguez',
        },
        {
            id: 'arts',
            name: 'Visual & Performing Arts',
            description:
                'The arts department nurtures creative expression and artistic development through visual arts, music, theater, and dance.',
            facultyCount: 11,
            icon: 'Palette',
            headOfDepartment: 'Ms. Rachel Cohen',
        },
        {
            id: 'technology',
            name: 'Technology & Engineering',
            description:
                'Our technology department equips students with computational thinking, programming, and engineering skills for the digital age.',
            facultyCount: 11,
            icon: 'Computer',
            headOfDepartment: 'Mr. Kevin Park',
        },
    ],

    faculty: [
        {
            id: 'sarah-williams',
            name: 'Dr. Sarah Williams',
            title: 'Chair, Humanities Department',
            department: 'Humanities & English',
            bio: 'Dr. Sarah Williams has been inspiring students to love literature for over 20 years. With a Ph.D. in English Literature from Yale University, she specializes in American literature and creative writing. Dr. Williams has published two books of poetry and numerous scholarly articles on 20th-century American authors. She believes that studying literature helps students understand themselves and the world around them. Her AP English Literature students consistently achieve scores of 4 or 5, and many have gone on to pursue degrees in English and journalism at prestigious universities.',
            photoUrl: '/images/faculty/sarah-williams.jpg',
            email: 's.williams@kampux.edu',
            qualifications: [
                'Ph.D. in English Literature, Yale University',
                'M.A. in Creative Writing, Iowa Writers Workshop',
                'Published author and poet',
            ],
            yearsOfExperience: 20,
            specializations: [
                'American Literature',
                'Creative Writing',
                'AP English Literature',
            ],
        },
        {
            id: 'michael-zhang',
            name: 'Dr. Michael Zhang',
            title: 'Chair, Mathematics Department',
            department: 'Mathematics',
            bio: 'Dr. Michael Zhang brings enthusiasm and clarity to complex mathematical concepts. After earning his Ph.D. in Mathematics from MIT, he worked as a research mathematician before discovering his passion for teaching. Dr. Zhang has developed innovative approaches to teaching calculus and statistics, making abstract concepts accessible through real-world applications. He coaches the Math Olympiad team, which has won multiple state championships under his guidance. His students appreciate his patience, humor, and ability to explain difficult concepts in multiple ways until understanding clicks.',
            photoUrl: '/images/faculty/michael-zhang.jpg',
            email: 'm.zhang@kampux.edu',
            qualifications: [
                'Ph.D. in Mathematics, MIT',
                'M.S. in Applied Mathematics, Stanford University',
                'Published researcher in mathematical modeling',
            ],
            yearsOfExperience: 16,
            specializations: [
                'Calculus',
                'Statistics',
                'Mathematical Competition Coaching',
            ],
        },
        {
            id: 'jennifer-martinez',
            name: 'Dr. Jennifer Martinez',
            title: 'Chair, Science Department',
            department: 'Science',
            bio: 'Dr. Jennifer Martinez is a passionate advocate for hands-on science education. With a doctorate in Biology from UC Berkeley and years of field research experience, she brings authentic scientific inquiry into her classroom. Dr. Martinez has led student research projects that have been presented at national science conferences, and several of her students have won prestigious science competition awards. She believes that every student can be a scientist and works tirelessly to make science accessible, engaging, and relevant. Her ecology elective includes field trips to local ecosystems where students conduct original research.',
            photoUrl: '/images/faculty/jennifer-martinez.jpg',
            email: 'j.martinez@kampux.edu',
            qualifications: [
                'Ph.D. in Biology, UC Berkeley',
                'M.S. in Environmental Science, Duke University',
                'Published researcher in ecology and conservation',
            ],
            yearsOfExperience: 18,
            specializations: [
                'AP Biology',
                'Ecology',
                'Student Research Mentorship',
            ],
        },
        {
            id: 'robert-thompson',
            name: 'Mr. Robert Thompson',
            title: 'Chair, Social Studies Department',
            department: 'Social Studies',
            bio: "Robert Thompson makes history come alive through engaging storytelling and primary source analysis. With a master's degree in History from Georgetown University and 22 years of teaching experience, he has perfected the art of helping students think like historians. Mr. Thompson's classes feature lively debates, mock trials, and historical simulations that immerse students in different time periods and perspectives. He sponsors Model United Nations and has led student delegations to international conferences. His passion for civic engagement extends beyond the classroom through community service initiatives and voter education programs.",
            photoUrl: '/images/faculty/robert-thompson.jpg',
            email: 'r.thompson@kampux.edu',
            qualifications: [
                'M.A. in History, Georgetown University',
                'B.A. in Political Science, UNC Chapel Hill',
                'Gilder Lehrman Institute Master Teacher',
            ],
            yearsOfExperience: 22,
            specializations: [
                'US History',
                'Civics Education',
                'Model UN Coaching',
            ],
        },
        {
            id: 'carmen-rodriguez',
            name: 'Ms. Carmen Rodriguez',
            title: 'Chair, World Languages Department',
            department: 'World Languages',
            bio: "Carmen Rodriguez is a native Spanish speaker who grew up in Barcelona before moving to the United States for graduate school. With a master's in Spanish Linguistics and 15 years of teaching experience, she creates immersive language environments where students gain confidence in speaking, reading, and writing Spanish. Ms. Rodriguez organizes annual service learning trips to Spanish-speaking countries, providing students with authentic cultural immersion experiences. Her students consistently perform at high levels on AP Spanish exams, with many achieving native-level proficiency. She also coordinates our school's International Week celebration, bringing global cultures into our community.",
            photoUrl: '/images/faculty/carmen-rodriguez.jpg',
            email: 'c.rodriguez@kampux.edu',
            qualifications: [
                'M.A. in Spanish Linguistics, University of Barcelona',
                'B.A. in Modern Languages, Universidad Autónoma de Madrid',
                'ACTFL Certified Language Tester',
            ],
            yearsOfExperience: 15,
            specializations: [
                'AP Spanish Language',
                'Spanish Literature',
                'Cultural Studies',
            ],
        },
        {
            id: 'rachel-cohen',
            name: 'Ms. Rachel Cohen',
            title: 'Chair, Visual & Performing Arts Department',
            department: 'Visual & Performing Arts',
            bio: 'Rachel Cohen is an accomplished artist and arts educator who believes in the transformative power of creative expression. After receiving her MFA in Studio Art from RISD, she exhibited her work in galleries across the country before dedicating herself to teaching. Ms. Cohen has built our arts program into one of the most respected in the region, with student artwork regularly selected for regional and national exhibitions. She teaches everything from foundational drawing to advanced portfolio development for college-bound art students. Under her leadership, our annual art show has become a major community event celebrating student creativity.',
            photoUrl: '/images/faculty/rachel-cohen.jpg',
            email: 'r.cohen@kampux.edu',
            qualifications: [
                'M.F.A. in Studio Art, Rhode Island School of Design',
                'B.F.A. in Visual Arts, School of the Art Institute of Chicago',
                'Exhibiting artist with national recognition',
            ],
            yearsOfExperience: 13,
            specializations: [
                'Drawing & Painting',
                'AP Studio Art',
                'Portfolio Development',
            ],
        },
        {
            id: 'kevin-park',
            name: 'Mr. Kevin Park',
            title: 'Chair, Technology & Engineering Department',
            department: 'Technology & Engineering',
            bio: 'Kevin Park bridges the worlds of industry and education, bringing real-world technology experience into the classroom. After working as a software engineer at major tech companies, he transitioned to teaching to share his passion for computer science with the next generation. Mr. Park teaches everything from introductory programming to advanced data structures, and his students have created impressive apps, websites, and coding projects. He coaches our award-winning robotics team and has established partnerships with local tech companies that provide internship opportunities for students. His teaching emphasizes not just coding skills, but also computational thinking and ethical technology use.',
            photoUrl: '/images/faculty/kevin-park.jpg',
            email: 'k.park@kampux.edu',
            qualifications: [
                'M.S. in Computer Science, Carnegie Mellon University',
                'B.S. in Electrical Engineering, MIT',
                'Former software engineer at Google and Microsoft',
            ],
            yearsOfExperience: 11,
            specializations: [
                'AP Computer Science',
                'Robotics',
                'Software Development',
            ],
        },
        {
            id: 'amanda-johnson',
            name: 'Dr. Amanda Johnson',
            title: 'AP Chemistry & Physics Teacher',
            department: 'Science',
            bio: "Dr. Amanda Johnson makes chemistry and physics accessible and exciting through hands-on experiments and real-world applications. With a Ph.D. in Physical Chemistry from Caltech and industry experience in pharmaceutical research, she brings cutting-edge scientific knowledge to her teaching. Dr. Johnson's lab-based approach helps students develop strong experimental design and analysis skills. Many of her students have pursued STEM careers and credit her with inspiring their passion for science. She serves as faculty advisor for the Science Olympiad team and mentors students conducting independent research projects.",
            photoUrl: '/images/faculty/amanda-johnson.jpg',
            email: 'a.johnson@kampux.edu',
            qualifications: [
                'Ph.D. in Physical Chemistry, Caltech',
                'M.S. in Chemistry, UC San Diego',
                'Former research scientist at pharmaceutical company',
            ],
            yearsOfExperience: 12,
            specializations: ['AP Chemistry', 'AP Physics', 'Research Methods'],
        },
        {
            id: 'david-kim',
            name: 'Mr. David Kim',
            title: 'Algebra & Geometry Teacher',
            department: 'Mathematics',
            bio: "David Kim has a gift for helping students overcome math anxiety and discover their mathematical abilities. With 18 years of teaching experience and a master's degree in Mathematics Education, he has developed instructional strategies that build confidence and competence. Mr. Kim believes that every student can succeed in mathematics with the right support and mindset. He runs after-school math help sessions and summer bridge programs that have helped countless students strengthen their skills. His patient, encouraging approach and willingness to explain concepts in multiple ways make him one of the most sought-after math teachers at Kampux.",
            photoUrl: '/images/faculty/david-kim.jpg',
            email: 'd.kim@kampux.edu',
            qualifications: [
                'M.Ed. in Mathematics Education, Boston University',
                'B.S. in Mathematics, UCLA',
                'National Board Certified Teacher',
            ],
            yearsOfExperience: 18,
            specializations: ['Algebra', 'Geometry', 'Math Intervention'],
        },
        {
            id: 'lisa-brown',
            name: 'Ms. Lisa Brown',
            title: 'English & Creative Writing Teacher',
            department: 'Humanities & English',
            bio: "Lisa Brown inspires students to find their voice through writing. With an MFA in Creative Writing and 14 years of teaching experience, she has helped hundreds of students develop their writing skills and confidence. Ms. Brown's creative writing workshops are among the most popular electives, and she advises the school literary magazine, which publishes student poetry, fiction, and essays. Several of her students have won national writing competitions and earned prestigious writing scholarships. She believes that writing is thinking, and that strong writing skills empower students to succeed in all areas of life.",
            photoUrl: '/images/faculty/lisa-brown.jpg',
            email: 'l.brown@kampux.edu',
            qualifications: [
                'M.F.A. in Creative Writing, NYU',
                'B.A. in English, Vassar College',
                'Published author of short fiction',
            ],
            yearsOfExperience: 14,
            specializations: [
                'Creative Writing',
                'Composition',
                'Literary Magazine Advising',
            ],
        },
        {
            id: 'james-wilson',
            name: 'Mr. James Wilson',
            title: 'World History & AP Government Teacher',
            department: 'Social Studies',
            bio: "James Wilson brings global perspectives and political expertise to his social studies classes. With a master's degree in International Relations and experience working with NGOs in developing countries, he helps students understand complex global issues and their role as citizens. Mr. Wilson's classes feature current events discussions, policy debates, and simulations that develop critical thinking and civic engagement. He organizes our annual Democracy Day where students participate in mock elections and debates. His passion for social justice and human rights inspires students to become active, informed participants in democratic society.",
            photoUrl: '/images/faculty/james-wilson.jpg',
            email: 'j.wilson@kampux.edu',
            qualifications: [
                'M.A. in International Relations, Johns Hopkins SAIS',
                'B.A. in Political Science, Georgetown University',
                'Former policy analyst for international NGO',
            ],
            yearsOfExperience: 10,
            specializations: [
                'World History',
                'AP Government',
                'Current Events',
            ],
        },
        {
            id: 'maria-garcia',
            name: 'Ms. Maria Garcia',
            title: 'Mandarin Chinese Teacher',
            department: 'World Languages',
            bio: "Maria Garcia grew up bilingual in Mandarin and English and has dedicated her career to sharing Chinese language and culture with students. With a master's degree in Chinese Language Education and extensive experience living in Beijing and Shanghai, she creates dynamic, communicative classrooms where students rapidly develop proficiency. Ms. Garcia organizes our student exchange program with schools in China and leads summer language immersion trips. Her students consistently perform exceptionally well on AP Chinese exams, and many continue studying Chinese in college. She also coordinates Chinese New Year celebrations that bring cultural traditions to life for our entire school community.",
            photoUrl: '/images/faculty/maria-garcia.jpg',
            email: 'm.garcia@kampux.edu',
            qualifications: [
                'M.A. in Chinese Language Education, Columbia University',
                'B.A. in Asian Studies, UC Berkeley',
                'HSK Level 6 Certification (Native Proficiency)',
            ],
            yearsOfExperience: 12,
            specializations: [
                'AP Mandarin',
                'Chinese Culture',
                'Study Abroad Programs',
            ],
        },
        {
            id: 'thomas-anderson',
            name: 'Mr. Thomas Anderson',
            title: 'Band Director & Music Theory Teacher',
            department: 'Visual & Performing Arts',
            bio: "Thomas Anderson is an accomplished musician and dedicated music educator who has built Kampux's band program into an award-winning ensemble. With a master's degree in Music Education and professional performance experience, he teaches instrumental music, music theory, and directs our concert band and jazz ensemble. Under his direction, the band has received superior ratings at state festivals and performed at prestigious venues. Mr. Anderson believes music education develops discipline, creativity, and collaboration skills that benefit students throughout their lives. He also teaches AP Music Theory and helps students prepare college audition portfolios.",
            photoUrl: '/images/faculty/thomas-anderson.jpg',
            email: 't.anderson@kampux.edu',
            qualifications: [
                'M.M. in Music Education, Northwestern University',
                'B.M. in Music Performance, Berklee College of Music',
                'Professional saxophonist with orchestral experience',
            ],
            yearsOfExperience: 15,
            specializations: [
                'Band Direction',
                'AP Music Theory',
                'Jazz Studies',
            ],
        },
        {
            id: 'emily-nguyen',
            name: 'Dr. Emily Nguyen',
            title: 'Biology & Environmental Science Teacher',
            department: 'Science',
            bio: 'Dr. Emily Nguyen combines rigorous science education with environmental advocacy. After earning her Ph.D. in Environmental Biology, she worked in conservation before transitioning to teaching to inspire the next generation of environmental stewards. Dr. Nguyen takes students on field expeditions to study local ecosystems and leads service projects focused on sustainability and conservation. Her AP Biology students achieve exceptional exam results, and her environmental science elective addresses pressing ecological challenges through hands-on projects. She advises the Environmental Club and has helped Kampux achieve recognition as a Green School.',
            photoUrl: '/images/faculty/emily-nguyen.jpg',
            email: 'e.nguyen@kampux.edu',
            qualifications: [
                'Ph.D. in Environmental Biology, University of Washington',
                'M.S. in Ecology, Cornell University',
                'Certified Project Wild Educator',
            ],
            yearsOfExperience: 9,
            specializations: [
                'AP Biology',
                'Environmental Science',
                'Field Research',
            ],
        },
        {
            id: 'christopher-lee',
            name: 'Mr. Christopher Lee',
            title: 'Drama & Theater Arts Teacher',
            department: 'Visual & Performing Arts',
            bio: "Christopher Lee brings professional theater experience to Kampux's drama program. After performing in regional theaters and earning his MFA in Theater, he discovered his passion for teaching young performers. Mr. Lee directs our fall play and spring musical productions, which have become highlights of the school year. His theater classes teach not just acting skills but confidence, empathy, and collaboration. Many of his students have gone on to study theater at top conservatory programs. Beyond performance, he teaches students about all aspects of theater production including set design, lighting, and stage management.",
            photoUrl: '/images/faculty/christopher-lee.jpg',
            email: 'c.lee@kampux.edu',
            qualifications: [
                'M.F.A. in Theater, Yale School of Drama',
                'B.A. in Theater Arts, NYU Tisch',
                'Professional actor with regional theater credits',
            ],
            yearsOfExperience: 11,
            specializations: ['Theater Arts', 'Acting', 'Theater Production'],
        },
    ],

    professionalDevelopment: [
        {
            title: 'Summer Institute on Teaching & Learning',
            description:
                'Week-long intensive program featuring workshops on differentiated instruction, educational technology, and assessment strategies.',
            frequency: 'Annual',
        },
        {
            title: 'Peer Observation & Collaboration',
            description:
                'Structured opportunities for teachers to observe colleagues, share best practices, and collaborate on curriculum development.',
            frequency: 'Monthly',
        },
        {
            title: 'Conference Attendance Support',
            description:
                'Financial support and time for faculty to attend subject-specific conferences and workshops to stay current in their fields.',
            frequency: 'Ongoing',
        },
        {
            title: 'Graduate Course Tuition Assistance',
            description:
                'Partial tuition reimbursement for faculty pursuing advanced degrees or certifications related to their teaching.',
            frequency: 'Ongoing',
        },
    ],

    recruitmentInfo: `Kampux Academy seeks passionate, innovative educators who are committed to excellence and student success. We offer competitive salaries, comprehensive benefits, and a supportive professional environment. Faculty positions typically require a minimum of a bachelor's degree in the subject area (master's or doctorate preferred), teaching credentials, and demonstrated commitment to progressive education. Interested candidates should submit their CV, cover letter, and teaching philosophy to careers@kampux.edu.`,
};
