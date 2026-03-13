import React, { useState, useMemo } from 'react';
import {
    Box,
    TextField,
    Chip,
    Typography,
    InputAdornment,
    Button,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Search as SearchIcon } from '@mui/icons-material';
import { FacultyProfileCard } from './FacultyProfileCard';

export interface FacultyMember {
    id: string;
    name: string;
    title: string;
    department: string;
    bio: string;
    qualifications: string[];
    yearsOfExperience: number;
    email: string;
    avatar?: string;
}

interface FacultyDirectoryProps {
    faculty: FacultyMember[];
    departments: string[];
}

export const FacultyDirectory: React.FC<FacultyDirectoryProps> = ({
    faculty,
    departments,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
        null
    );
    const [displayCount, setDisplayCount] = useState(9);

    const filteredFaculty = useMemo(() => {
        return faculty.filter(member => {
            const matchesSearch =
                searchQuery === '' ||
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.title.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesDepartment =
                !selectedDepartment || member.department === selectedDepartment;

            return matchesSearch && matchesDepartment;
        });
    }, [faculty, searchQuery, selectedDepartment]);

    const displayedFaculty = filteredFaculty.slice(0, displayCount);
    const hasMore = displayCount < filteredFaculty.length;

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="Search faculty by name or title..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ fontSize: 20 }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                            fontSize: '0.875rem',
                        },
                    }}
                />
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                        label="All Departments"
                        onClick={() => setSelectedDepartment(null)}
                        sx={{
                            backgroundColor:
                                selectedDepartment === null
                                    ? 'primary.main'
                                    : 'transparent',
                            color:
                                selectedDepartment === null
                                    ? '#ffffff'
                                    : 'text.primary',
                            border: '1px solid',
                            borderColor:
                                selectedDepartment === null
                                    ? 'primary.main'
                                    : 'divider',
                            fontSize: '0.75rem',
                            '&:hover': {
                                backgroundColor:
                                    selectedDepartment === null
                                        ? 'primary.dark'
                                        : 'action.hover',
                            },
                        }}
                    />
                    {departments.map(dept => (
                        <Chip
                            key={dept}
                            label={dept}
                            onClick={() => setSelectedDepartment(dept)}
                            sx={{
                                backgroundColor:
                                    selectedDepartment === dept
                                        ? 'primary.main'
                                        : 'transparent',
                                color:
                                    selectedDepartment === dept
                                        ? '#ffffff'
                                        : 'text.primary',
                                border: '1px solid',
                                borderColor:
                                    selectedDepartment === dept
                                        ? 'primary.main'
                                        : 'divider',
                                fontSize: '0.75rem',
                                '&:hover': {
                                    backgroundColor:
                                        selectedDepartment === dept
                                            ? 'primary.dark'
                                            : 'action.hover',
                                },
                            }}
                        />
                    ))}
                </Box>
            </Box>

            {displayedFaculty.length === 0 ? (
                <Box
                    sx={{
                        py: 8,
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{ fontSize: '0.875rem', color: 'text.secondary' }}
                    >
                        No faculty members found matching your criteria.
                    </Typography>
                </Box>
            ) : (
                <>
                    <Grid container spacing={2}>
                        {displayedFaculty.map((member, index) => (
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

                    {hasMore && (
                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <Button
                                variant="outlined"
                                onClick={() =>
                                    setDisplayCount(prev => prev + 9)
                                }
                                sx={{
                                    fontSize: '0.875rem',
                                    textTransform: 'none',
                                }}
                            >
                                Load More Faculty
                            </Button>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};
