import { Icon } from '@iconify/react';
import { Box } from '@mui/material';
import { type FC } from 'react';
import { SectionPreview } from './SectionPreview';

interface IPartnersPreview {
    className?: string;
}
const partners = [
    { name: 'Google', logo: 'logos:google' },
    { name: 'Microsoft', logo: 'logos:microsoft-icon' },
    { name: 'AWS', logo: 'logos:aws' },
    { name: 'Meta', logo: 'logos:meta-icon' },
    { name: 'Apple', logo: 'logos:apple' },
    { name: 'IBM', logo: 'logos:ibm' },
];
const PartnersPreview: FC<IPartnersPreview> = ({ className }) => {
    return (
        <SectionPreview
            id="partners-preview"
            title="Our Strategic Partners"
            subtitle="Collaborating with industry leaders to provide world-class education."
            overline="PARTNERSHIPS"
            backgroundColor="#fefefe"
            className={className}
            containerMaxWidth="xl"
            showCTA={false}
        >
            <Box
                sx={{
                    overflow: 'hidden',
                    py: 4,
                    position: 'relative',
                    // Create a "fade" effect on the edges
                    '&::before, &::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        width: '100px',
                        height: '100%',
                        zIndex: 2,
                    },
                    '&::before': {
                        left: 0,
                        background:
                            'linear-gradient(to right, #f8fafc, transparent)',
                    },
                    '&::after': {
                        right: 0,
                        background:
                            'linear-gradient(to left, #f8fafc, transparent)',
                    },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        width: 'max-content',
                        gap: 8,
                        animation: 'scroll 30s linear infinite',
                        '&:hover': { animationPlayState: 'paused' }, // Pause on hover
                        '@keyframes scroll': {
                            '0%': { transform: 'translateX(0)' },
                            '100%': { transform: 'translateX(-50%)' },
                        },
                    }}
                >
                    {/* Map twice to create the infinite loop effect */}
                    {[...partners, ...partners].map((partner, idx) => (
                        <Box
                            key={`${partner.name}-${idx}`}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                filter: 'grayscale(100%)',
                                opacity: 0.6,
                                transition:
                                    'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    filter: 'grayscale(0%)',
                                    opacity: 1,
                                    transform: 'scale(1.1)',
                                },
                            }}
                        >
                            <Icon
                                icon={partner.logo}
                                style={{
                                    fontSize: '3.5rem',
                                    minWidth: '120px',
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
        </SectionPreview>
    );
};

export default PartnersPreview;
