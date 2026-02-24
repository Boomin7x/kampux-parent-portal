import React from 'react';
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

interface ProgramCardProps {
    programName: string;
    gradeLevel: string;
    description: string;
    features: string[];
    expanded?: boolean;
    onChange?: (isExpanded: boolean) => void;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
    programName,
    gradeLevel,
    description,
    features,
    expanded = false,
    onChange,
}) => {
    return (
        <Accordion
            expanded={expanded}
            onChange={(_, isExpanded) => onChange?.(isExpanded)}
            sx={{
                backgroundColor: '#ffffff',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '4px !important',
                '&:before': {
                    display: 'none',
                },
                '&.Mui-expanded': {
                    borderColor: 'primary.main',
                },
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                    p: 2,
                    '& .MuiAccordionSummary-content': {
                        my: 0,
                        alignItems: 'center',
                        gap: 2,
                    },
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            flexWrap: 'wrap',
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontSize: '1rem',
                                fontWeight: 600,
                                color: 'text.primary',
                            }}
                        >
                            {programName}
                        </Typography>
                        <Chip
                            label={gradeLevel}
                            size="small"
                            sx={{
                                height: 20,
                                fontSize: '0.75rem',
                                backgroundColor: 'primary.main',
                                color: '#ffffff',
                                fontWeight: 600,
                            }}
                        />
                    </Box>
                </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2, pt: 0 }}>
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: '0.8125rem',
                        color: 'text.secondary',
                        mb: 2,
                    }}
                >
                    {description}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {features.map((feature, index) => (
                        <Box
                            key={index}
                            sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}
                        >
                            <CheckCircleIcon
                                sx={{
                                    fontSize: 18,
                                    color: 'primary.main',
                                    mt: 0.25,
                                }}
                            />
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: '0.8125rem',
                                    color: 'text.primary',
                                }}
                            >
                                {feature}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};
