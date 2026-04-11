import React, { useState } from 'react';
import { Box, Typography, Collapse, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import {
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { FacultyProfileCard } from './FacultyProfileCard';
import type { FacultyMember } from './FacultyDirectory';

interface DepartmentSectionProps {
    departmentName: string;
    description: string;
    icon: React.ReactNode;
    faculty: FacultyMember[];
    defaultExpanded?: boolean;
}

export const DepartmentSection: React.FC<DepartmentSectionProps> = ({
    departmentName,
    description,
    icon,
    faculty,
    defaultExpanded = false,
}) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    return (
        <Box
            sx={{
                mb: 4,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                backgroundColor: '#ffffff',
            }}
        >
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: '#f8fafc',
                    },
                }}
                onClick={() => setExpanded(!expanded)}
            >
                <Box
                    sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 1,
                        background: 'linear-gradient(135deg, #f59e0b, #16a34a)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        flexShrink: 0,
                    }}
                >
                    {icon}
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 0.5,
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: '1.125rem',
                                fontWeight: 600,
                                color: 'text.primary',
                            }}
                        >
                            {departmentName}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.75rem',
                                color: 'text.secondary',
                                backgroundColor: '#f8fafc',
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                            }}
                        >
                            {faculty.length} faculty
                        </Typography>
                    </Box>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: '0.8125rem',
                            color: 'text.secondary',
                        }}
                    >
                        {description}
                    </Typography>
                </Box>
                <IconButton size="small">
                    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </Box>

            <Collapse in={expanded}>
                <Box sx={{ p: 2, pt: 0 }}>
                    <Grid container spacing={2}>
                        {faculty.map((member, index) => (
                            <Grid
                                size={{ xs: 12, sm: 6, md: 4 }}
                                key={member.id}
                            >
                                <FacultyProfileCard
                                    member={member}
                                    index={index}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Collapse>
        </Box>
    );
};
