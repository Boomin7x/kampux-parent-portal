// Events & Announcements Section Content
export const eventsAnnouncementsSectionContent = {
    // Section Header
    overline: 'Événements et annonces',

    // Main Headlines
    title: {
        primary: 'Restez ',
        secondary: 'Informé', // This gets gradient styling
    },

    // Subtitle
    subtitle:
        'Des annonces importantes, des calendriers d’examens et des informations scolaires communiqués avec clarté et en temps opportun..',

    // Events & Announcements Data
    events: [
        {
            id: 'finals-exams',
            type: 'exam',
            title: 'Examens de fin de trimestre',
            description:
                'Les examens de fin d’année pour toutes les classes débuteront le lundi 19 mai et se termineront le vendredi 30 mai. Les élèves doivent se munir de leurs cartes d’identité scolaire ainsi que du matériel requis.',
            date: '19 Mai – 30 Mai',
            image: '/pexels-yaroslav-shuraev-6281132.jpg',
            color: '#f59e0b',
            urgent: false,
        },
        {
            id: 'pta-meeting',
            type: 'announcement',
            title: 'Réunion de l’Association des Parents d’Élèves',
            description:
                'Notre prochaine réunion de l’APA est programmée pour le jeudi 5 juin à 18h00. La présence est fortement recommandée pour tous les parents et tuteurs.',
            date: '5 Juin, 18h00',
            image: '/pexels-kampus-8629106.jpg',
            color: '#10b981',
            urgent: false,
        },
        {
            id: 'exam-venue-update',
            type: 'announcement',
            title: 'Changement de Lieu d’Examen',
            description:
                'En raison des travaux de rénovation en cours, les examens de la 10e et 11e année se dérouleront désormais dans la salle B201. Veuillez ajuster vos plans d’arrivée en conséquence.',
            date: 'En vigueur immédiatement',
            image: '/pexels-rdne-8500421.jpg',
            color: '#ef4444',
            urgent: true,
        },
        {
            id: 'midterm-results',
            type: 'announcement',
            title: 'Résultats des Examens Intermédiaires',
            description:
                'Les résultats des examens intermédiaires sont maintenant disponibles sur le portail étudiant et parent. Pour tout renseignement, contactez le bureau académique.',
            date: '10 Mai',
            image: '/pexels-cottonbro-6208926.jpg',
            color: '#f59e0b',
            urgent: false,
        },
        {
            id: 'graduation-ceremony',
            type: 'event',
            title: 'Cérémonie de Graduation',
            description:
                'Célébrons notre classe de finissants ! La cérémonie aura lieu dans la salle principale, le samedi 15 juin à 16h00. Tout le monde est le bienvenu.',
            date: '15 Juin, 16h00',
            image: '/pexels-kampus-8629106.jpg',
            color: '#f59e0b',
            urgent: false,
        },
    ],

    // Visual Configuration
    styling: {
        backgroundColor: '#fefefe',
        titleGradient:
            'linear-gradient(135deg, #f59e0b 0%, #ec4899 50%, #10b981 100%)',
        gridColumns: {
            mobile: 1,
            tablet: 2,
            desktop: 3,
        },
        aspectRatio: '4/3',
    },
};

export type EventsAnnouncementsSectionContent =
    typeof eventsAnnouncementsSectionContent;
