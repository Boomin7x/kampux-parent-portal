import {
    AccountBox,
    Business,
    CalendarToday,
    Language,
    Person,
    School,
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Grid,
    Typography,
} from '@mui/material';
import React from 'react';
import { useUserProfile } from '../../../Auth/_hooks/useAuth';

const UserProfile: React.FC = () => {
    const userProfile = useUserProfile();

    if (!userProfile) {
        return null;
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Header */}
            <Box sx={{ mb: 1.5 }}>
                <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, color: 'text.primary' }}
                >
                    Profil Utilisateur
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Informations de votre compte et établissement
                </Typography>
            </Box>

            {/* User Info Card */}
            <Card
                sx={{
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <CardContent sx={{ p: 2 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            mb: 2,
                        }}
                    >
                        <Avatar
                            src={userProfile.imageUrl || undefined}
                            sx={{
                                width: 48,
                                height: 48,
                                backgroundColor: 'primary.main',
                                color: 'white',
                            }}
                        >
                            {userProfile.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 600 }}
                            >
                                {userProfile.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: 'text.secondary' }}
                            >
                                {userProfile.email}
                            </Typography>
                        </Box>
                        <Box sx={{ ml: 'auto' }}>
                            <Chip
                                label={userProfile.description}
                                color="primary"
                                size="small"
                                icon={<Person fontSize="small" />}
                                sx={{ fontSize: '0.6875rem' }}
                            />
                        </Box>
                    </Box>

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    mb: 1,
                                }}
                            >
                                <AccountBox
                                    fontSize="small"
                                    sx={{ color: 'text.secondary' }}
                                />
                                <Typography
                                    variant="caption"
                                    sx={{ fontWeight: 600 }}
                                >
                                    ID Utilisateur
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{ ml: 3, color: 'text.secondary' }}
                            >
                                #{userProfile.id}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    mb: 1,
                                }}
                            >
                                <Language
                                    fontSize="small"
                                    sx={{ color: 'text.secondary' }}
                                />
                                <Typography
                                    variant="caption"
                                    sx={{ fontWeight: 600 }}
                                >
                                    Langue
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{ ml: 3, color: 'text.secondary' }}
                            >
                                {userProfile.language === 'fr-FR'
                                    ? 'Français'
                                    : 'English'}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* School Info Card */}
            <Card
                sx={{
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <CardContent sx={{ p: 2 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 2,
                        }}
                    >
                        <Business
                            fontSize="small"
                            sx={{ color: 'primary.main' }}
                        />
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, color: 'primary.main' }}
                        >
                            Établissement
                        </Typography>
                    </Box>

                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                        {userProfile.applicationSetup.companyName}
                    </Typography>

                    {userProfile.applicationSetup.description && (
                        <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary', mb: 2 }}
                        >
                            {userProfile.applicationSetup.description}
                        </Typography>
                    )}

                    <Grid container spacing={2}>
                        {userProfile.applicationSetup.address && (
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography
                                    variant="caption"
                                    sx={{ fontWeight: 600 }}
                                >
                                    Adresse
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary' }}
                                >
                                    {userProfile.applicationSetup.address}
                                    {userProfile.applicationSetup.city &&
                                        `, ${userProfile.applicationSetup.city}`}
                                </Typography>
                            </Grid>
                        )}

                        {userProfile.applicationSetup.email1 && (
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography
                                    variant="caption"
                                    sx={{ fontWeight: 600 }}
                                >
                                    Email
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary' }}
                                >
                                    {userProfile.applicationSetup.email1}
                                </Typography>
                            </Grid>
                        )}

                        {userProfile.applicationSetup.portable1 && (
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography
                                    variant="caption"
                                    sx={{ fontWeight: 600 }}
                                >
                                    Téléphone
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary' }}
                                >
                                    {userProfile.applicationSetup.portable1}
                                </Typography>
                            </Grid>
                        )}

                        {userProfile.applicationSetup.websiteUrl && (
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography
                                    variant="caption"
                                    sx={{ fontWeight: 600 }}
                                >
                                    Site Web
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary' }}
                                >
                                    {userProfile.applicationSetup.websiteUrl}
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </CardContent>
            </Card>

            {/* Current School Year Card */}
            {userProfile.currentSchoolYear && (
                <Card
                    sx={{
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <CardContent sx={{ p: 2 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                mb: 2,
                            }}
                        >
                            <School
                                fontSize="small"
                                sx={{ color: 'warning.main' }}
                            />
                            <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 600, color: 'warning.main' }}
                            >
                                Année Scolaire Actuelle
                            </Typography>
                            <Chip
                                label="Active"
                                color="success"
                                size="small"
                                sx={{ fontSize: '0.6875rem', ml: 'auto' }}
                            />
                        </Box>

                        <Typography
                            variant="body1"
                            sx={{ fontWeight: 600, mb: 1 }}
                        >
                            {userProfile.currentSchoolYear.name}
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        mb: 1,
                                    }}
                                >
                                    <CalendarToday
                                        fontSize="small"
                                        sx={{ color: 'text.secondary' }}
                                    />
                                    <Typography
                                        variant="caption"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        Date de Début
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="body2"
                                    sx={{ ml: 3, color: 'text.secondary' }}
                                >
                                    {formatDate(
                                        userProfile.currentSchoolYear.startDate
                                    )}
                                </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        mb: 1,
                                    }}
                                >
                                    <CalendarToday
                                        fontSize="small"
                                        sx={{ color: 'text.secondary' }}
                                    />
                                    <Typography
                                        variant="caption"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        Date de Fin
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="body2"
                                    sx={{ ml: 3, color: 'text.secondary' }}
                                >
                                    {formatDate(
                                        userProfile.currentSchoolYear.endDate
                                    )}
                                </Typography>
                            </Grid>
                        </Grid>

                        {userProfile.currentSchoolYear.category && (
                            <Box sx={{ mt: 1 }}>
                                <Typography
                                    variant="caption"
                                    sx={{ fontWeight: 600 }}
                                >
                                    Catégorie
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary' }}
                                >
                                    {userProfile.currentSchoolYear.category}
                                </Typography>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* School Years Summary */}
            {userProfile.schoolYears.length > 1 && (
                <Box
                    sx={{
                        p: 2,
                        backgroundColor: 'primary.50',
                        border: '1px solid',
                        borderColor: 'primary.100',
                        borderRadius: 1,
                    }}
                >
                    <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}
                    >
                        Années Scolaires Disponibles
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {userProfile.schoolYears.map(schoolYear => (
                            <Chip
                                key={schoolYear.id}
                                label={`${schoolYear.year}-${schoolYear.year + 1}`}
                                color={
                                    schoolYear.isActive ? 'primary' : 'default'
                                }
                                size="small"
                                sx={{ fontSize: '0.6875rem' }}
                            />
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default UserProfile;
