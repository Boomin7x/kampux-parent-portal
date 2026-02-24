/**
 * SEO Utilities
 * Manage page metadata, titles, and meta descriptions
 */

export interface PageMetadata {
    title: string;
    description: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
}

/**
 * Page metadata configuration for all routes
 */
export const pageMetadata: Record<string, PageMetadata> = {
    home: {
        title: 'Kampux Academy - Excellence in Education',
        description:
            'Kampux Academy provides world-class K-12 education with rigorous academics, innovative programs, and a supportive community. Discover where academic excellence meets character development.',
        keywords: [
            'private school',
            'K-12 education',
            'academic excellence',
            'college preparatory',
            'STEM education',
        ],
        ogTitle: 'Kampux Academy - Where Excellence Meets Innovation',
        ogDescription:
            'Join a community dedicated to academic excellence, character development, and preparing students for success in college and beyond.',
    },
    about: {
        title: 'About Us - Kampux Academy Mission & Values',
        description:
            'Learn about Kampux Academy\'s mission, vision, core values, and dedicated leadership team. Discover our rich history and commitment to transforming lives through education.',
        keywords: [
            'school mission',
            'educational values',
            'school leadership',
            'school history',
            'core values',
        ],
        ogTitle: 'About Kampux Academy - Our Mission & Leadership',
        ogDescription:
            'For over 35 years, Kampux Academy has been nurturing curious, confident learners. Meet our leadership team and discover what makes us different.',
    },
    academics: {
        title: 'Academic Programs - Kampux Academy Curriculum',
        description:
            'Explore Kampux Academy\'s comprehensive academic programs including 28 AP courses, STEM excellence, arts programs, and college-preparatory curriculum for grades K-12.',
        keywords: [
            'academic programs',
            'AP courses',
            'STEM education',
            'curriculum',
            'college prep',
        ],
        ogTitle: 'Academic Excellence - Kampux Academy Programs',
        ogDescription:
            'Rigorous college-preparatory curriculum with 28 AP courses, STEM programs, and personalized learning. 100% college acceptance rate for 15 years.',
    },
    faculty: {
        title: 'Faculty & Staff - Kampux Academy Educators',
        description:
            'Meet Kampux Academy\'s exceptional faculty members - experienced educators with advanced degrees dedicated to inspiring students and fostering academic excellence.',
        keywords: [
            'teachers',
            'faculty',
            'educators',
            'teaching staff',
            'academic departments',
        ],
        ogTitle: 'Meet Our Faculty - Passionate Educators at Kampux',
        ogDescription:
            'Our 82-member faculty brings an average of 14 years experience and advanced degrees. Meet the dedicated educators inspiring the next generation.',
    },
    studentLife: {
        title: 'Student Life - Kampux Academy Activities & Events',
        description:
            'Discover vibrant student life at Kampux Academy with 25+ clubs, competitive athletics, award-winning arts programs, and community service opportunities.',
        keywords: [
            'student activities',
            'school clubs',
            'athletics',
            'student life',
            'extracurriculars',
        ],
        ogTitle: 'Student Life at Kampux - Where Passions Come Alive',
        ogDescription:
            'From robotics to theater, athletics to community service - discover 25+ activities where students explore passions and develop leadership skills.',
    },
    facilities: {
        title: 'Campus & Facilities - Kampux Academy',
        description:
            'Tour Kampux Academy\'s state-of-the-art facilities including STEM labs, performing arts center, athletic complex, and sustainable campus features.',
        keywords: [
            'school facilities',
            'campus tour',
            'school buildings',
            'STEM labs',
            'athletics facilities',
        ],
        ogTitle: 'Campus Facilities - Modern Learning Spaces at Kampux',
        ogDescription:
            'Explore our 50-acre campus featuring advanced STEM labs, Olympic pool, performing arts center, and LEED-certified sustainable buildings.',
    },
    gallery: {
        title: 'Photo Gallery - Life at Kampux Academy',
        description:
            'View photos of student life, campus facilities, events, and activities at Kampux Academy. See our vibrant community in action.',
        keywords: ['photo gallery', 'campus photos', 'student activities', 'school events'],
        ogTitle: 'Gallery - See Kampux Academy in Action',
        ogDescription:
            'Browse photos of our vibrant campus community, from classroom innovation to athletic achievements and artistic performances.',
    },
    contact: {
        title: 'Contact Us - Kampux Academy Admissions',
        description:
            'Contact Kampux Academy for admissions information, campus tours, or general inquiries. Visit us or schedule a personalized tour today.',
        keywords: [
            'contact school',
            'admissions',
            'campus tour',
            'school visit',
            'enrollment',
        ],
        ogTitle: 'Contact Kampux Academy - Schedule Your Visit',
        ogDescription:
            'Ready to learn more? Contact our admissions team to schedule a campus tour and discover if Kampux Academy is the right fit for your family.',
    },
};

/**
 * Set document title with proper formatting
 */
export const setPageTitle = (title: string): void => {
    document.title = title;
};

/**
 * Set meta description tag
 */
export const setMetaDescription = (description: string): void => {
    let metaDescription = document.querySelector('meta[name="description"]');

    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute('content', description);
};

/**
 * Set meta keywords tag
 */
export const setMetaKeywords = (keywords: string[]): void => {
    let metaKeywords = document.querySelector('meta[name="keywords"]');

    if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
    }

    metaKeywords.setAttribute('content', keywords.join(', '));
};

/**
 * Set Open Graph meta tags for social media sharing
 */
export const setOpenGraphTags = (
    title: string,
    description: string,
    image?: string
): void => {
    const ogTags = [
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'website' },
    ];

    if (image) {
        ogTags.push({ property: 'og:image', content: image });
    }

    ogTags.forEach(({ property, content }) => {
        let tag = document.querySelector(`meta[property="${property}"]`);

        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('property', property);
            document.head.appendChild(tag);
        }

        tag.setAttribute('content', content);
    });
};

/**
 * Apply all page metadata at once
 */
export const applyPageMetadata = (pageName: string): void => {
    const metadata = pageMetadata[pageName];

    if (!metadata) {
        console.warn(`No metadata found for page: ${pageName}`);
        return;
    }

    setPageTitle(metadata.title);
    setMetaDescription(metadata.description);

    if (metadata.keywords) {
        setMetaKeywords(metadata.keywords);
    }

    setOpenGraphTags(
        metadata.ogTitle || metadata.title,
        metadata.ogDescription || metadata.description,
        metadata.ogImage
    );
};

/**
 * Hook for applying page metadata in React components
 */
export const usePageMetadata = (pageName: string): void => {
    // Apply metadata on component mount
    if (typeof window !== 'undefined') {
        applyPageMetadata(pageName);
    }
};
