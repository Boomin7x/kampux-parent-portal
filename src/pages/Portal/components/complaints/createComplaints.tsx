import {
    CheckCircle,
    Error as ErrorIcon,
    Send,
    Warning as WarningIcon,
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useStudentStore } from '../../../../stores/studentStore';
import { useGetCodificationItems } from '../../_hooks/useParent';
import { useCreateComplaintForSelectedStudent } from '../../_hooks/useParentWithStore';
import type { CreateComplaintRequest } from '../../_service/parentService';

interface CreateComplaintsProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

// Form data type matching the API payload
type ComplaintFormData = {
    complaintCategoryCode: string;
    summary: string;
    description: string;
};

// Validation schema
const validationSchema = yup.object().shape({
    complaintCategoryCode: yup
        .string()
        .required('La catégorie de plainte est requise'),
    summary: yup
        .string()
        .required('Le résumé est requis')
        .min(5, 'Le résumé doit contenir au moins 5 caractères')
        .max(100, 'Le résumé ne doit pas dépasser 100 caractères'),
    description: yup
        .string()
        .required('La description est requise')
        .min(20, 'La description doit contenir au moins 20 caractères')
        .max(500, 'La description ne doit pas dépasser 500 caractères'),
});

const CreateComplaints: React.FC<CreateComplaintsProps> = ({
    onSuccess,
    onCancel,
}) => {
    const { selectedStudentId } = useStudentStore();
    const createComplaint = useCreateComplaintForSelectedStudent();

    // Fetch complaint categories from API
    const {
        data: categories,
        isLoading: categoriesLoading,
        error: categoriesError,
    } = useGetCodificationItems('Complaint_Category', !!selectedStudentId);

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isValid, isDirty },
    } = useForm<ComplaintFormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            complaintCategoryCode: '',
            summary: '',
            description: '',
        },
        mode: 'onChange',
    });

    const watchedValues = watch();

    const onSubmit = async (data: ComplaintFormData) => {
        if (!selectedStudentId) return;

        const payload: CreateComplaintRequest = {
            id: parseInt(selectedStudentId), // registration id
            complaintCategoryCode: data.complaintCategoryCode,
            summary: data.summary,
            description: data.description,
            complaintDate: new Date().toISOString(),
        };

        try {
            await createComplaint.mutateAsync(payload);
            reset();
            onSuccess?.();
        } catch (error) {
            console.error('Failed to submit complaint:', error);
        }
    };

    if (!selectedStudentId) {
        return (
            <Box
                sx={{
                    p: 2,
                    borderRadius: 1,
                    backgroundColor: 'warning.50',
                    border: '1px solid',
                    borderColor: 'warning.200',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <WarningIcon sx={{ color: 'warning.main', fontSize: 18 }} />
                    <Typography
                        variant="body2"
                        sx={{ color: 'warning.dark', fontSize: '0.8125rem' }}
                    >
                        Veuillez sélectionner un étudiant pour soumettre une
                        plainte.
                    </Typography>
                </Box>
            </Box>
        );
    }

    if (categoriesError) {
        return (
            <Alert severity="error" sx={{ borderRadius: 1 }}>
                <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
                    Erreur lors du chargement des catégories de plaintes.
                </Typography>
            </Alert>
        );
    }

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            {/* Header */}
            <Box sx={{ mb: 2 }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        fontSize: '0.875rem',
                        mb: 0.25,
                    }}
                >
                    Nouvelle Plainte
                </Typography>
                <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
                >
                    Étudiant ID: {selectedStudentId}
                </Typography>
            </Box>

            {/* Success/Error Alerts */}
            {createComplaint.isSuccess && (
                <Alert
                    severity="success"
                    icon={<CheckCircle sx={{ fontSize: 16 }} />}
                    sx={{
                        mb: 2,
                        borderRadius: 1,
                        py: 0.75,
                        '& .MuiAlert-message': { fontSize: '0.8125rem' },
                    }}
                >
                    Plainte soumise avec succès. Vous recevrez une confirmation.
                </Alert>
            )}

            {createComplaint.isError && (
                <Alert
                    severity="error"
                    icon={<ErrorIcon sx={{ fontSize: 16 }} />}
                    sx={{
                        mb: 2,
                        borderRadius: 1,
                        py: 0.75,
                        '& .MuiAlert-message': { fontSize: '0.8125rem' },
                    }}
                >
                    Erreur lors de la soumission. Veuillez réessayer.
                </Alert>
            )}

            {/* Form */}
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    p: 2,
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                }}
            >
                <Grid container spacing={1.5}>
                    {/* Category Selection */}
                    <Grid size={{ xs: 12 }}>
                        <Controller
                            name="complaintCategoryCode"
                            control={control}
                            render={({ field }) => (
                                <FormControl
                                    size="small"
                                    fullWidth
                                    error={!!errors.complaintCategoryCode}
                                >
                                    <InputLabel sx={{ fontSize: '0.8125rem' }}>
                                        Catégorie de Plainte *
                                    </InputLabel>
                                    <Select
                                        {...field}
                                        label="Catégorie de Plainte *"
                                        disabled={categoriesLoading}
                                        sx={{ fontSize: '0.8125rem' }}
                                    >
                                        {categories?.map(category => (
                                            <MenuItem
                                                key={category.code}
                                                value={category.code}
                                                sx={{ fontSize: '0.8125rem' }}
                                            >
                                                <Box>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontSize: '0.8125rem',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {category.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color: 'text.secondary',
                                                            fontSize: '0.6875rem',
                                                            display: 'block',
                                                        }}
                                                    >
                                                        {category.description}
                                                    </Typography>
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.complaintCategoryCode && (
                                        <FormHelperText
                                            sx={{ fontSize: '0.75rem' }}
                                        >
                                            {errors.complaintCategoryCode.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />
                    </Grid>

                    {/* Summary */}
                    <Grid size={{ xs: 12 }}>
                        <Controller
                            name="summary"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Résumé de la plainte *"
                                    placeholder="Résumé concis en quelques mots..."
                                    size="small"
                                    fullWidth
                                    error={!!errors.summary}
                                    helperText={
                                        errors.summary?.message ||
                                        `${field.value.length}/100 caractères`
                                    }
                                    InputLabelProps={{
                                        sx: { fontSize: '0.8125rem' },
                                    }}
                                    inputProps={{
                                        sx: { fontSize: '0.8125rem' },
                                        maxLength: 100,
                                    }}
                                    FormHelperTextProps={{
                                        sx: { fontSize: '0.75rem' },
                                    }}
                                />
                            )}
                        />
                    </Grid>

                    {/* Description */}
                    <Grid size={{ xs: 12 }}>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Description détaillée *"
                                    placeholder="Décrivez votre plainte de manière détaillée..."
                                    multiline
                                    rows={3}
                                    fullWidth
                                    error={!!errors.description}
                                    helperText={
                                        errors.description?.message ||
                                        `${field.value.length}/500 caractères`
                                    }
                                    InputLabelProps={{
                                        sx: { fontSize: '0.8125rem' },
                                    }}
                                    inputProps={{
                                        sx: { fontSize: '0.8125rem' },
                                        maxLength: 500,
                                    }}
                                    FormHelperTextProps={{
                                        sx: { fontSize: '0.75rem' },
                                    }}
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    {onCancel && (
                        <Button
                            onClick={onCancel}
                            variant="outlined"
                            size="small"
                            sx={{
                                fontSize: '0.8125rem',
                                textTransform: 'none',
                                flex: 1,
                            }}
                        >
                            Annuler
                        </Button>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        disabled={
                            !isValid || !isDirty || createComplaint.isPending
                        }
                        startIcon={<Send sx={{ fontSize: 16 }} />}
                        sx={{
                            fontSize: '0.8125rem',
                            textTransform: 'none',
                            flex: 2,
                        }}
                    >
                        {createComplaint.isPending
                            ? 'Envoi en cours...'
                            : 'Soumettre la Plainte'}
                    </Button>
                </Box>
            </Box>

            {/* Form Preview - Content Dense */}
            {isDirty && (
                <Box
                    sx={{
                        mt: 1.5,
                        p: 1.5,
                        backgroundColor: 'primary.50',
                        border: '1px solid',
                        borderColor: 'primary.100',
                        borderRadius: 1,
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{
                            fontWeight: 600,
                            fontSize: '0.6875rem',
                            color: 'primary.dark',
                            display: 'block',
                            mb: 0.5,
                        }}
                    >
                        APERÇU DE LA PLAINTE
                    </Typography>
                    <Box
                        sx={{
                            display: 'grid',
                            gap: 0.75,
                            fontSize: '0.75rem',
                        }}
                    >
                        {watchedValues.complaintCategoryCode && (
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 500,
                                        color: 'text.secondary',
                                        minWidth: '70px',
                                        fontSize: '0.6875rem',
                                    }}
                                >
                                    Catégorie:
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'text.primary',
                                        fontSize: '0.6875rem',
                                    }}
                                >
                                    {
                                        categories?.find(
                                            c =>
                                                c.code ===
                                                watchedValues.complaintCategoryCode
                                        )?.name
                                    }
                                </Typography>
                            </Box>
                        )}
                        {watchedValues.summary && (
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 500,
                                        color: 'text.secondary',
                                        minWidth: '70px',
                                        fontSize: '0.6875rem',
                                    }}
                                >
                                    Résumé:
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'text.primary',
                                        fontSize: '0.6875rem',
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {watchedValues.summary}
                                </Typography>
                            </Box>
                        )}
                        {watchedValues.description && (
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 500,
                                        color: 'text.secondary',
                                        minWidth: '70px',
                                        fontSize: '0.6875rem',
                                        alignSelf: 'flex-start',
                                    }}
                                >
                                    Description:
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'text.primary',
                                        fontSize: '0.6875rem',
                                        lineHeight: 1.3,
                                        flex: 1,
                                    }}
                                >
                                    {watchedValues.description.length > 100
                                        ? `${watchedValues.description.substring(0, 100)}...`
                                        : watchedValues.description}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default CreateComplaints;