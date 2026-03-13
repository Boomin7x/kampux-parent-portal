import type { StudentLifeContent } from '../../pages/Landing/_models/StudentLifeContent.types';

/**
 * Comprehensive content for the Student Life page
 * Includes philosophy, activities, events, daily schedule, and testimonials
 */

export const studentLifeContent: StudentLifeContent = {
    philosophy:
        'At Kampux Academy, we believe that education extends far beyond the classroom. Student life is where young people discover their passions, develop leadership skills, build lasting friendships, and learn what it means to be part of a vibrant community. Through diverse activities, clubs, athletics, and events, students explore new interests, challenge themselves, and grow as individuals. We are committed to creating an inclusive environment where every student finds their place and develops the confidence to pursue their dreams. Our student life programs emphasize character development, teamwork, creativity, and service to others. By balancing academic rigor with rich co-curricular opportunities, we nurture well-rounded individuals prepared to thrive in college and beyond.',

    activities: [
        {
            id: 'robotics',
            name: 'Robotics Club',
            category: 'academic',
            description:
                'Design, build, and program competitive robots. Our team competes in FIRST Robotics competitions at regional and national levels.',
            schedule: 'Tuesdays & Thursdays 3:30-5:30 PM',
            memberCount: 32,
            icon: 'PrecisionManufacturing',
            advisorName: 'Mr. Kevin Park',
        },
        {
            id: 'debate',
            name: 'Debate Team',
            category: 'academic',
            description:
                'Develop argumentation, research, and public speaking skills through competitive debate tournaments across the region.',
            schedule: 'Mondays & Wednesdays 3:30-5:00 PM',
            memberCount: 24,
            icon: 'RecordVoiceOver',
            advisorName: 'Mr. Robert Thompson',
        },
        {
            id: 'model-un',
            name: 'Model United Nations',
            category: 'academic',
            description:
                'Engage in diplomatic simulations, debate global issues, and attend conferences representing different countries.',
            schedule: 'Wednesdays 3:30-5:00 PM',
            memberCount: 28,
            icon: 'PublicOutlined',
            advisorName: 'Mr. James Wilson',
        },
        {
            id: 'science-olympiad',
            name: 'Science Olympiad',
            category: 'academic',
            description:
                'Compete in hands-on science events covering biology, chemistry, physics, engineering, and earth science.',
            schedule: 'Tuesdays & Thursdays 3:30-5:00 PM',
            memberCount: 30,
            icon: 'Science',
            advisorName: 'Dr. Jennifer Martinez',
        },
        {
            id: 'math-team',
            name: 'Math Olympiad',
            category: 'academic',
            description:
                'Challenge your problem-solving abilities and compete in regional and state mathematics competitions.',
            schedule: 'Mondays 3:30-5:00 PM',
            memberCount: 22,
            icon: 'Calculate',
            advisorName: 'Dr. Michael Zhang',
        },
        {
            id: 'coding-club',
            name: 'Coding Club',
            category: 'academic',
            description:
                'Learn programming languages, develop apps and websites, and participate in hackathons and coding competitions.',
            schedule: 'Fridays 3:30-5:00 PM',
            memberCount: 35,
            icon: 'Code',
            advisorName: 'Mr. Kevin Park',
        },
        {
            id: 'varsity-basketball',
            name: 'Varsity Basketball',
            category: 'sports',
            description:
                'Compete at the highest level in our conference. Both boys and girls teams with strong records and championship titles.',
            schedule: 'Daily practices 3:30-5:30 PM, Games on weekends',
            memberCount: 28,
            icon: 'SportsBasketball',
            advisorName: 'Coach Williams',
        },
        {
            id: 'varsity-soccer',
            name: 'Varsity Soccer',
            category: 'sports',
            description:
                'Competitive soccer program with experienced coaching staff. Fall and spring seasons for boys and girls.',
            schedule: 'Daily practices 3:30-5:30 PM',
            memberCount: 30,
            icon: 'SportsSoccer',
            advisorName: 'Coach Martinez',
        },
        {
            id: 'swimming',
            name: 'Swimming & Diving',
            category: 'sports',
            description:
                'Train in our Olympic-size pool. Compete in individual and relay events at regional championships.',
            schedule: 'Daily practices 6:00-7:30 AM',
            memberCount: 26,
            icon: 'Pool',
            advisorName: 'Coach Anderson',
        },
        {
            id: 'track-field',
            name: 'Track & Field',
            category: 'sports',
            description:
                'Comprehensive track and field program including sprints, distance, jumps, throws, and hurdles.',
            schedule: 'Daily practices 3:30-5:30 PM',
            memberCount: 42,
            icon: 'DirectionsRun',
            advisorName: 'Coach Thompson',
        },
        {
            id: 'tennis',
            name: 'Tennis Team',
            category: 'sports',
            description:
                'Varsity and JV tennis with professional coaching. Singles and doubles competition in conference tournaments.',
            schedule: 'Mondays, Wednesdays, Fridays 3:30-5:30 PM',
            memberCount: 18,
            icon: 'SportsTennis',
            advisorName: 'Coach Davis',
        },
        {
            id: 'cross-country',
            name: 'Cross Country',
            category: 'sports',
            description:
                'Distance running program emphasizing endurance, strategy, and team spirit. Compete in invitational meets.',
            schedule: 'Daily practices 3:30-5:00 PM',
            memberCount: 24,
            icon: 'DirectionsRun',
            advisorName: 'Coach Johnson',
        },
        {
            id: 'concert-band',
            name: 'Concert Band',
            category: 'arts',
            description:
                'Advanced instrumental ensemble performing classical and contemporary repertoire at concerts and festivals.',
            schedule: 'Daily during school, Evening rehearsals as needed',
            memberCount: 45,
            icon: 'MusicNote',
            advisorName: 'Mr. Thomas Anderson',
        },
        {
            id: 'jazz-ensemble',
            name: 'Jazz Ensemble',
            category: 'arts',
            description:
                'Perform jazz standards and contemporary compositions. Opportunities for improvisation and small group work.',
            schedule: 'Tuesdays & Thursdays 7:00-8:00 AM',
            memberCount: 16,
            icon: 'Piano',
            advisorName: 'Mr. Thomas Anderson',
        },
        {
            id: 'chorus',
            name: 'Chorus',
            category: 'arts',
            description:
                'Vocal ensemble performing diverse choral repertoire from classical to contemporary. Regular concerts and competitions.',
            schedule: 'Daily during school',
            memberCount: 38,
            icon: 'MusicNote',
            advisorName: 'Ms. Patricia White',
        },
        {
            id: 'theater',
            name: 'Theater Production',
            category: 'arts',
            description:
                'Participate in fall play and spring musical productions. Acting, tech crew, and stage management opportunities.',
            schedule: 'Varies by production season',
            memberCount: 52,
            icon: 'TheaterComedy',
            advisorName: 'Mr. Christopher Lee',
        },
        {
            id: 'art-club',
            name: 'Art Club',
            category: 'arts',
            description:
                'Explore various artistic mediums, collaborate on projects, and prepare work for exhibitions and competitions.',
            schedule: 'Wednesdays 3:30-5:00 PM',
            memberCount: 28,
            icon: 'Palette',
            advisorName: 'Ms. Rachel Cohen',
        },
        {
            id: 'photography',
            name: 'Photography Club',
            category: 'arts',
            description:
                'Learn photography techniques, digital editing, and visual storytelling. Field trips and photo exhibitions.',
            schedule: 'Thursdays 3:30-5:00 PM',
            memberCount: 20,
            icon: 'PhotoCamera',
            advisorName: 'Ms. Rachel Cohen',
        },
        {
            id: 'literary-magazine',
            name: 'Literary Magazine',
            category: 'arts',
            description:
                'Publish student poetry, fiction, essays, and artwork in our annual literary magazine. Editorial experience available.',
            schedule: 'Fridays 3:30-4:30 PM',
            memberCount: 18,
            icon: 'MenuBook',
            advisorName: 'Ms. Lisa Brown',
        },
        {
            id: 'community-service',
            name: 'Community Service Club',
            category: 'service',
            description:
                'Organize volunteer projects with local nonprofits, food banks, and community organizations. Make a difference.',
            schedule: 'Flexible schedule based on projects',
            memberCount: 48,
            icon: 'VolunteerActivism',
            advisorName: 'Ms. Maria Santos',
        },
        {
            id: 'environmental-club',
            name: 'Environmental Club',
            category: 'service',
            description:
                'Lead sustainability initiatives, organize clean-up events, and promote environmental awareness on campus.',
            schedule: 'Tuesdays 3:30-4:30 PM',
            memberCount: 32,
            icon: 'Park',
            advisorName: 'Dr. Emily Nguyen',
        },
        {
            id: 'habitat-humanity',
            name: 'Habitat for Humanity Chapter',
            category: 'service',
            description:
                'Partner with Habitat for Humanity to build affordable housing in our community. Weekend build days.',
            schedule: 'Monthly weekend builds',
            memberCount: 25,
            icon: 'Home',
            advisorName: 'Mr. David Okonkwo',
        },
        {
            id: 'peer-tutoring',
            name: 'Peer Tutoring Program',
            category: 'service',
            description:
                'Provide academic support to fellow students across all subjects. Develop leadership and teaching skills.',
            schedule: 'Flexible after-school hours',
            memberCount: 40,
            icon: 'School',
            advisorName: 'Ms. Maria Santos',
        },
        {
            id: 'student-government',
            name: 'Student Government',
            category: 'service',
            description:
                'Represent the student body, plan school events, and serve as liaisons between students and administration.',
            schedule: 'Weekly meetings during lunch',
            memberCount: 15,
            icon: 'HowToVote',
            advisorName: 'Ms. Maria Santos',
        },
    ],

    upcomingEvents: [
        {
            id: 'homecoming',
            title: 'Homecoming Week',
            date: '2026-10-05',
            time: 'All Week',
            location: 'Campus-wide',
            description:
                'Spirit week activities, pep rally, football game, and homecoming dance. Celebrate school pride with themed dress-up days and community events.',
            category: 'School Tradition',
        },
        {
            id: 'fall-play',
            title: 'Fall Drama Production: "The Crucible"',
            date: '2026-11-12',
            time: '7:00 PM',
            location: 'Performing Arts Center',
            description:
                "Our theater department presents Arthur Miller's classic drama. Three performances: November 12, 13, and 14. Tickets available at the door.",
            category: 'Arts & Culture',
        },
        {
            id: 'science-fair',
            title: 'Annual Science & Innovation Fair',
            date: '2026-12-08',
            time: '6:00-8:00 PM',
            location: 'STEM Center',
            description:
                'Students showcase independent research projects, engineering designs, and scientific investigations. Judges from local universities and industry.',
            category: 'Academic',
        },
        {
            id: 'winter-concert',
            title: 'Winter Music Concert',
            date: '2026-12-15',
            time: '7:00 PM',
            location: 'Performing Arts Center',
            description:
                'Concert band, jazz ensemble, and chorus perform seasonal favorites and classical repertoire. Free admission, donations accepted.',
            category: 'Arts & Culture',
        },
        {
            id: 'mlk-day',
            title: 'MLK Day of Service',
            date: '2027-01-18',
            time: '9:00 AM-3:00 PM',
            location: 'Various Community Sites',
            description:
                "Honor Dr. King's legacy through community service. Student volunteers serve at local nonprofits, food banks, and community centers.",
            category: 'Community Service',
        },
        {
            id: 'international-week',
            title: 'International Week Celebration',
            date: '2027-02-22',
            time: 'All Week',
            location: 'Campus-wide',
            description:
                'Celebrate global cultures through performances, food festivals, language showcases, and cultural presentations from our diverse community.',
            category: 'Cultural',
        },
        {
            id: 'spring-musical',
            title: 'Spring Musical: "Hamilton"',
            date: '2027-03-26',
            time: '7:00 PM',
            location: 'Performing Arts Center',
            description:
                'Our biggest production of the year! Four performances: March 26, 27, 28, and 29. Advance tickets recommended.',
            category: 'Arts & Culture',
        },
        {
            id: 'earth-day',
            title: 'Earth Day Campus Beautification',
            date: '2027-04-22',
            time: '2:00-5:00 PM',
            location: 'School Grounds',
            description:
                'Environmental Club leads campus-wide sustainability projects including tree planting, garden maintenance, and recycling initiatives.',
            category: 'Community Service',
        },
        {
            id: 'spring-arts-festival',
            title: 'Spring Arts Festival',
            date: '2027-05-01',
            time: '5:00-8:00 PM',
            location: 'Campus Green',
            description:
                'Outdoor festival featuring student art exhibitions, live music performances, poetry readings, and theatrical showcases. Food trucks and family activities.',
            category: 'Arts & Culture',
        },
        {
            id: 'senior-recognition',
            title: 'Senior Recognition Night',
            date: '2027-05-20',
            time: '7:00 PM',
            location: 'Main Auditorium',
            description:
                'Celebrate the achievements of our graduating seniors. Awards, scholarships, and special recognitions for outstanding students.',
            category: 'School Tradition',
        },
    ],

    dailySchedule: [
        {
            period: 'Advisory',
            time: '8:00-8:20 AM',
            activity: 'Homeroom and morning announcements',
        },
        {
            period: 'Period 1',
            time: '8:25-9:15 AM',
            activity: 'First class',
        },
        {
            period: 'Period 2',
            time: '9:20-10:10 AM',
            activity: 'Second class',
        },
        {
            period: 'Break',
            time: '10:10-10:25 AM',
            activity: 'Morning break',
        },
        {
            period: 'Period 3',
            time: '10:30-11:20 AM',
            activity: 'Third class',
        },
        {
            period: 'Period 4',
            time: '11:25 AM-12:15 PM',
            activity: 'Fourth class',
        },
        {
            period: 'Lunch',
            time: '12:15-12:55 PM',
            activity: 'Lunch period',
        },
        {
            period: 'Period 5',
            time: '1:00-1:50 PM',
            activity: 'Fifth class',
        },
        {
            period: 'Period 6',
            time: '1:55-2:45 PM',
            activity: 'Sixth class',
        },
        {
            period: 'Period 7',
            time: '2:50-3:40 PM',
            activity: 'Seventh class',
        },
        {
            period: 'Activities',
            time: '3:40-5:30 PM',
            activity: 'Clubs, sports, tutoring, and activities',
        },
    ],

    testimonials: [
        {
            id: 'testimonial-1',
            studentName: 'Sarah Chen',
            grade: '12th Grade',
            quote: "Kampux has given me opportunities I never imagined. Through robotics club, I discovered my passion for engineering and received mentorship that helped me earn admission to MIT. The teachers here don't just teach subjects—they inspire you to pursue your dreams with confidence.",
            photoUrl: '/images/testimonials/sarah-chen.jpg',
            activity: 'Robotics Club Captain',
        },
        {
            id: 'testimonial-2',
            studentName: 'Marcus Johnson',
            grade: '11th Grade',
            quote: "Being part of the theater program has transformed my life. I used to be shy and afraid of public speaking, but Mr. Lee and my fellow cast members helped me find my voice. Now I'm performing lead roles and considering a career in the arts. Kampux taught me that you can become whoever you want to be.",
            photoUrl: '/images/testimonials/marcus-johnson.jpg',
            activity: 'Theater Production',
        },
        {
            id: 'testimonial-3',
            studentName: 'Emma Rodriguez',
            grade: '10th Grade',
            quote: "The community service opportunities at Kampux opened my eyes to the impact one person can make. Through our Habitat for Humanity chapter, I've helped build homes for families in need and discovered my passion for social justice. This school encourages us to be changemakers in our community.",
            photoUrl: '/images/testimonials/emma-rodriguez.jpg',
            activity: 'Community Service Club',
        },
        {
            id: 'testimonial-4',
            studentName: 'David Kim',
            grade: '9th Grade',
            quote: "As a freshman, I was nervous about fitting in at a new school. But the peer mentoring program and welcoming community made the transition easy. I've already joined Model UN and made friends from every grade level. Kampux feels like a family where everyone belongs.",
            photoUrl: '/images/testimonials/david-kim.jpg',
            activity: 'Model UN',
        },
        {
            id: 'testimonial-5',
            studentName: 'Aisha Patel',
            grade: '12th Grade',
            quote: "The academic rigor at Kampux prepared me for college-level work, but what really stands out is how much the teachers care about each student's success. My AP Chemistry teacher, Dr. Johnson, spent countless hours helping me prepare for the exam and supporting my research project. I scored a 5 and won a regional science competition thanks to her mentorship.",
            photoUrl: '/images/testimonials/aisha-patel.jpg',
            activity: 'Science Olympiad',
        },
    ],
};
