import React, { useState, useMemo } from 'react';
import {
    Box,
    Tabs,
    Tab,
    TextField,
    InputAdornment,
    Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Search as SearchIcon } from '@mui/icons-material';
import { ClubCard } from './ClubCard';

export interface Activity {
    id: string;
    name: string;
    category: 'Sports' | 'Arts' | 'Academic' | 'Service';
    description: string;
    icon: React.ReactNode;
    meetingSchedule: string;
    memberCount: number;
}

interface ActivityCatalogProps {
    activities: Activity[];
}

const categories = ['All', 'Sports', 'Arts', 'Academic', 'Service'] as const;

export const ActivityCatalog: React.FC<ActivityCatalogProps> = ({
    activities,
}) => {
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredActivities = useMemo(() => {
        const selectedCategoryName = categories[selectedCategory];
        const lowercaseQuery = searchQuery.toLowerCase();

        return activities.filter(activity => {
            const matchesCategory =
                selectedCategory === 0 ||
                activity.category === selectedCategoryName;
            const matchesSearch =
                searchQuery === '' ||
                activity.name.toLowerCase().includes(lowercaseQuery) ||
                activity.description.toLowerCase().includes(lowercaseQuery);
            return matchesCategory && matchesSearch;
        });
    }, [activities, selectedCategory, searchQuery, categories]);

    const categoryCount = (category: string) => {
        if (category === 'All') return activities.length;
        return activities.filter(a => a.category === category).length;
    };

    return (
        <Box>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    mb: 3,
                }}
            >
                <Tabs
                    value={selectedCategory}
                    onChange={(_, newValue) => setSelectedCategory(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        '& .MuiTab-root': {
                            fontSize: '0.875rem',
                            textTransform: 'none',
                            minHeight: 48,
                        },
                    }}
                >
                    {categories.map(category => (
                        <Tab
                            key={category}
                            label={
                                <Box>
                                    {category}
                                    <Typography
                                        component="span"
                                        sx={{
                                            ml: 1,
                                            fontSize: '0.75rem',
                                            color: 'text.secondary',
                                        }}
                                    >
                                        ({categoryCount(category)})
                                    </Typography>
                                </Box>
                            }
                        />
                    ))}
                </Tabs>
            </Box>

            <TextField
                fullWidth
                placeholder="Search activities..."
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
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                        fontSize: '0.875rem',
                    },
                }}
            />

            {filteredActivities.length === 0 ? (
                <Box sx={{ py: 8, textAlign: 'center' }}>
                    <Typography
                        variant="body1"
                        sx={{ fontSize: '0.875rem', color: 'text.secondary' }}
                    >
                        No activities found matching your criteria.
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={2}>
                    {filteredActivities.map((activity, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={activity.id}>
                            <ClubCard activity={activity} index={index} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};
