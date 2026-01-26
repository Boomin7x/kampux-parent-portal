import { Avatar, Box, Rating, Typography } from '@mui/material';
import React from 'react';
import { BaseSwiper, useSwiper } from './BaseSwiper';
import { testimonialSwiperConfig } from './swiperConfig';

// Testimonial data interface
export interface Testimonial {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    content: string;
    rating: number;
    studentName?: string;
    grade?: string;
}

// Testimonial Swiper props
export interface TestimonialSwiperProps {
    testimonials: Testimonial[];
    showRating?: boolean;
    autoplay?: boolean;
    className?: string;
}

// Individual testimonial card component
const TestimonialCard: React.FC<{
    testimonial: Testimonial;
    showRating: boolean;
}> = ({ testimonial, showRating }) => {
    const initials = testimonial.name
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase();

    return (
        <Box className="testimonial-card">
            {showRating && (
                <Box sx={{ mb: 2, textAlign: 'center' }}>
                    <Rating
                        value={testimonial.rating}
                        readOnly
                        size="small"
                        sx={{
                            color: '#fbbf24',
                            '& .MuiRating-iconEmpty': {
                                color: '#e5e5e5',
                            },
                        }}
                    />
                </Box>
            )}

            <Typography
                variant="body1"
                sx={{
                    mb: 3,
                    fontStyle: 'italic',
                    lineHeight: 1.7,
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    textAlign: 'center',
                    flexGrow: 1,
                }}
            >
                "{testimonial.content}"
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Avatar
                    src={testimonial.avatar}
                    sx={{
                        width: 56,
                        height: 56,
                        bgcolor: 'primary.main',
                        fontSize: '1.125rem',
                        fontWeight: 600,
                    }}
                >
                    {testimonial.avatar ? null : initials}
                </Avatar>

                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 600,
                            color: 'text.primary',
                            mb: 0.5,
                        }}
                    >
                        {testimonial.name}
                    </Typography>

                    <Typography
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '0.75rem',
                            display: 'block',
                        }}
                    >
                        {testimonial.role}
                    </Typography>

                    {testimonial.studentName && testimonial.grade && (
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'primary.main',
                                fontSize: '0.75rem',
                                display: 'block',
                                mt: 0.5,
                                fontWeight: 500,
                            }}
                        >
                            Parent of {testimonial.studentName} (Grade{' '}
                            {testimonial.grade})
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

// Main Testimonial Swiper component
export const TestimonialSwiper: React.FC<TestimonialSwiperProps> = ({
    testimonials,
    showRating = true,
    autoplay = true,
    className = '',
}) => {
    const { handleSwiper, handleSlideChange } = useSwiper();

    const config = {
        ...testimonialSwiperConfig,
        autoplay: autoplay ? testimonialSwiperConfig.autoplay : false,
    };

    return (
        <BaseSwiper
            {...config}
            className={`testimonial-swiper ${className}`}
            onSwiper={handleSwiper}
            onSlideChange={handleSlideChange}
        >
            {testimonials.map(testimonial => (
                <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    showRating={showRating}
                />
            ))}
        </BaseSwiper>
    );
};

// Default testimonials for demo/placeholder
export const defaultTestimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Sarah Johnson',
        role: 'Parent',
        content:
            "The parent portal has made it so easy to stay connected with my child's education. I love being able to track assignments and communicate with teachers seamlessly.",
        rating: 5,
        studentName: 'Emily Johnson',
        grade: '7',
    },
    {
        id: '2',
        name: 'Michael Chen',
        role: 'Parent',
        content:
            'Exceptional school with dedicated teachers. The academic programs are outstanding and my son has shown tremendous growth in both academics and character.',
        rating: 5,
        studentName: 'David Chen',
        grade: '10',
    },
    {
        id: '3',
        name: 'Lisa Rodriguez',
        role: 'Parent',
        content:
            "The school's commitment to individual attention and personalized learning has helped my daughter discover her passion for science. Highly recommend!",
        rating: 5,
        studentName: 'Maria Rodriguez',
        grade: '9',
    },
    {
        id: '4',
        name: 'James Williams',
        role: 'Parent',
        content:
            "Great facilities, excellent teachers, and a wonderful community. The parent portal keeps us informed and engaged in our children's educational journey.",
        rating: 5,
        studentName: 'Alex Williams',
        grade: '11',
    },
    {
        id: '5',
        name: 'Amanda Thompson',
        role: 'Parent',
        content:
            'This school has created a nurturing environment where children can thrive. The staff is incredibly supportive and the academic standards are excellent.',
        rating: 5,
        studentName: 'Sophie Thompson',
        grade: '8',
    },
];
