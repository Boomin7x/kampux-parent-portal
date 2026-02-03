import {
    Dashboard,
    ExpandMore,
    Logout,
    Person,
    School,
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Divider,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout, useUserProfile } from '../../pages/Auth/_hooks/useAuth';

interface AuthenticatedUserDisplayProps {
    transparent?: boolean;
    scrolled?: boolean;
}

const AuthenticatedUserDisplay: React.FC<AuthenticatedUserDisplayProps> = ({
    transparent = false,
    scrolled = false,
}) => {
    const userProfile = useUserProfile();
    const logout = useLogout();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlePortalAccess = () => {
        navigate('/portal');
        handleClose();
    };

    const handleLogout = () => {
        logout.mutate();
        handleClose();
    };

    if (!userProfile) {
        return null;
    }

    return (
        <>
            <Button
                onClick={handleClick}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                    gap: 1,
                    px: 2,
                    py: 1,
                    background:
                        transparent && !scrolled
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(99, 102, 241, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border:
                        transparent && !scrolled
                            ? '1px solid rgba(255, 255, 255, 0.2)'
                            : '1px solid rgba(99, 102, 241, 0.2)',
                    borderRadius: 1,
                    textTransform: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        background:
                            transparent && !scrolled
                                ? 'rgba(255, 255, 255, 0.2)'
                                : 'rgba(99, 102, 241, 0.2)',
                        transform: 'translateY(-1px)',
                    },
                }}
            >
                <Avatar
                    src={userProfile.imageUrl || undefined}
                    sx={{
                        width: 28,
                        height: 28,
                        backgroundColor: '#6366f1',
                        color: 'white',
                        fontSize: '0.75rem',
                    }}
                >
                    {userProfile.name.charAt(0).toUpperCase()}
                </Avatar>

                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        minWidth: 0,
                        flexDirection: 'column',
                        alignItems: 'start',
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{
                            fontWeight: 600,
                            color:
                                transparent && !scrolled
                                    ? 'rgba(255, 255, 255, 0.9)'
                                    : 'text.primary',
                            lineHeight: 1.1,
                            display: 'block',
                            fontSize: '0.8125rem',
                        }}
                    >
                        {userProfile.name}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            color:
                                transparent && !scrolled
                                    ? 'rgba(255, 255, 255, 0.7)'
                                    : 'text.secondary',
                            fontSize: '0.6875rem',
                            lineHeight: 1.1,
                        }}
                    >
                        {userProfile.email}
                    </Typography>
                </Box>

                <ExpandMore
                    sx={{
                        fontSize: 16,
                        color:
                            transparent && !scrolled
                                ? 'rgba(255, 255, 255, 0.7)'
                                : 'text.secondary',
                        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease-in-out',
                    }}
                />
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                slotProps={{
                    paper: {
                        sx: {
                            mt: 1,
                            borderRadius: 1,
                            minWidth: 220,
                            border: '1px solid',
                            borderColor: 'divider',
                            backgroundColor: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(20px)',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        },
                    },
                }}
            >
                {/* User Info Header */}
                <Box sx={{ p: 1.5, backgroundColor: 'primary.50' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar
                            src={userProfile.imageUrl || undefined}
                            sx={{
                                width: 32,
                                height: 32,
                                backgroundColor: '#6366f1',
                                color: 'white',
                            }}
                        >
                            {userProfile.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: 600, lineHeight: 1.1 }}
                            >
                                {userProfile.name}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ color: 'text.secondary' }}
                            >
                                {userProfile.description}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Divider
                    sx={{
                        my: 0,
                    }}
                />

                {/* School Info */}
                <Box sx={{ p: 1.5 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            mb: 0.5,
                        }}
                    >
                        <School
                            fontSize="small"
                            sx={{ color: 'primary.main' }}
                        />
                        <Typography
                            variant="caption"
                            sx={{ fontWeight: 600, fontSize: '0.75rem' }}
                        >
                            {userProfile.applicationSetup.companyName}
                        </Typography>
                    </Box>
                    {userProfile.currentSchoolYear && (
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'text.secondary',
                                fontSize: '0.6875rem',
                            }}
                        >
                            {userProfile.currentSchoolYear.name}
                        </Typography>
                    )}
                </Box>

                <Divider
                    sx={{
                        my: 0,
                    }}
                />

                {/* Actions */}
                <MenuItem onClick={handlePortalAccess} sx={{ py: 1 }}>
                    <Dashboard
                        fontSize="small"
                        sx={{ mr: 1, color: 'primary.main' }}
                    />
                    <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
                        Accéder au Portail Parent
                    </Typography>
                </MenuItem>

                <MenuItem onClick={handleClose} sx={{ py: 1 }}>
                    <Person
                        fontSize="small"
                        sx={{ mr: 1, color: 'text.secondary' }}
                    />
                    <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
                        Mon Profil
                    </Typography>
                </MenuItem>

                <Divider
                    sx={{
                        my: 0,
                    }}
                />

                <MenuItem
                    onClick={handleLogout}
                    sx={{ py: 1, color: 'error.main' }}
                >
                    <Logout fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
                        Se Déconnecter
                    </Typography>
                </MenuItem>
            </Menu>
        </>
    );
};

export default AuthenticatedUserDisplay;
