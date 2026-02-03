import {
    ExpandMore,
    Logout,
    Person,
    School,
    Settings,
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Chip,
    Divider,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import React from 'react';
import { useLogout, useUserProfile } from '../../../Auth/_hooks/useAuth';

interface UserDisplayProps {
    onClick?: () => void;
}

const UserDisplay: React.FC<UserDisplayProps> = ({ onClick }) => {
    const userProfile = useUserProfile();
    const logout = useLogout();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        onClick?.();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        logout.mutate();
    };

    if (!userProfile) {
        return null;
    }

    return (
        <>
            <Box
                onClick={handleClick}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    p: 0.5,
                    backgroundColor: 'primary.50',
                    border: '1px solid',
                    borderColor: 'primary.100',
                    borderRadius: 1,
                    cursor: 'pointer',
                    minWidth: 0,
                    '&:hover': {
                        backgroundColor: 'primary.100',
                    },
                }}
            >
                <Avatar
                    src={userProfile.imageUrl || undefined}
                    sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: 'primary.main',
                        color: 'white',
                        fontSize: '0.625rem',
                    }}
                >
                    {userProfile?.name?.charAt(0).toUpperCase()}
                </Avatar>

                <Box sx={{ display: { xs: 'none', sm: 'block' }, minWidth: 0 }}>
                    <Typography
                        variant="caption"
                        sx={{
                            fontWeight: 600,
                            color: 'text.primary',
                            lineHeight: 1,
                            display: 'block',
                            fontSize: '0.75rem',
                        }}
                    >
                        {userProfile.name}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '0.625rem',
                            lineHeight: 1,
                        }}
                    >
                        {userProfile.description}
                    </Typography>
                </Box>

                <ExpandMore
                    sx={{
                        fontSize: 14,
                        color: 'text.secondary',
                        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease-in-out',
                    }}
                />
            </Box>

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
                            mt: 0.5,
                            borderRadius: 1,
                            minWidth: 200,
                            border: '1px solid',
                            borderColor: 'divider',
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
                                width: 28,
                                height: 28,
                                backgroundColor: 'primary.main',
                                color: 'white',
                                fontSize: '0.75rem',
                            }}
                        >
                            {userProfile?.name?.charAt(0).toUpperCase()}
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
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: '0.75rem',
                                }}
                            >
                                {userProfile.email}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ mt: 1 }}>
                        <Chip
                            label={userProfile.description}
                            size="small"
                            icon={<Person fontSize="small" />}
                            sx={{ fontSize: '0.6875rem', height: 20 }}
                        />
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
                            {userProfile?.applicationSetup?.companyName}
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
                <MenuItem onClick={handleClose} sx={{ py: 0.75 }}>
                    <Settings
                        fontSize="small"
                        sx={{ mr: 0.75, color: 'text.secondary' }}
                    />
                    <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
                        Paramètres
                    </Typography>
                </MenuItem>

                <MenuItem
                    onClick={handleLogout}
                    sx={{ py: 0.75, color: 'error.main' }}
                >
                    <Logout fontSize="small" sx={{ mr: 0.75 }} />
                    <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
                        Se déconnecter
                    </Typography>
                </MenuItem>
            </Menu>
        </>
    );
};

export default UserDisplay;
