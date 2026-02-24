// Gallery Preview Content - Condensed version for landing page preview
export const galleryPreviewContent = {
    // Section Header
    overline: 'Gallery',
    title: 'Moments of Excellence',
    subtitle:
        'Capturing the vibrant spirit of our school community through unforgettable moments and achievements.',

    // Preview Images (Top 6 featured)
    previewImages: [
        {
            id: 'championship-victory',
            title: 'State Championship Victory',
            category: 'sports',
            image: '/pexels-cics-uma-ipn-238541486-12238968.jpg',
            date: 'March 2024',
        },
        {
            id: 'science-fair',
            title: 'Annual Science Fair Excellence',
            category: 'academics',
            image: '/pexels-cottonbro-6208926.jpg',
            date: 'February 2024',
        },
        {
            id: 'theater-production',
            title: 'Spring Musical Production',
            category: 'arts',
            image: '/raymond-yeung-uwhDZbX-sz8-unsplash.jpg',
            date: 'April 2024',
        },
        {
            id: 'graduation-ceremony',
            title: 'Graduation Celebration',
            category: 'events',
            image: '/pexels-kampus-8629106.jpg',
            date: 'June 2024',
        },
        {
            id: 'library-study',
            title: 'Modern Learning Spaces',
            category: 'campus',
            image: '/pexels-yaroslav-shuraev-6281132.jpg',
            date: 'January 2024',
        },
        {
            id: 'tech-innovation',
            title: 'Technology Lab Innovation',
            category: 'academics',
            image: '/pexels-dothanhyb-5530484.jpg',
            date: 'March 2024',
        },
    ],

    // Gallery Stats
    stats: [
        { number: '500+', label: 'Memorable\nMoments' },
        { number: '12', label: 'Monthly\nEvents' },
        { number: '100%', label: 'Student\nEngagement' },
        { number: '50+', label: 'Awards &\nRecognitions' },
    ],

    // CTA Configuration
    cta: {
        text: 'View Full Gallery',
        route: '/gallery',
    },
};

export type GalleryPreviewContent = typeof galleryPreviewContent;
