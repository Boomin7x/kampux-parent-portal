import { yupResolver } from '@hookform/resolvers/yup';
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
import React, { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useStudentStore } from '../../../../stores/studentStore';
import { useGetCodificationItems } from '../../_hooks/useParent';
import { useCreateComplaintForSelectedStudent } from '../../_hooks/useParentWithStore';
import type { CreateComplaintRequest } from '../../_service/parentService';

interface CreateComplaintsProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

type ComplaintFormData = {
    complaintCategoryCode: string;
    summary: string;
    description: string;
};

const getValidationSchema = (t: (key: string) => string) =>
    yup.object().shape({
        complaintCategoryCode: yup
            .string()
            .required(t('validation.category.required')),
        summary: yup
            .string()
            .required(t('validation.summary.required'))
            .min(5, t('validation.summary.min'))
            .max(100, t('validation.summary.max')),
        description: yup
            .string()
            .required(t('validation.description.required'))
            .min(20, t('validation.description.min'))
            .max(500, t('validation.description.max')),
    });

const CreateComplaints: React.FC<CreateComplaintsProps> = ({
    onSuccess,
    onCancel,
}) => {
    const { t } = useTranslation('complaints');
    const validationSchema = useMemo(() => getValidationSchema(t), [t]);

    const { selectedStudentId } = useStudentStore();
    const createComplaint = useCreateComplaintForSelectedStudent();

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
            id: parseInt(selectedStudentId),
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
                        {t('noStudentSelected')}
                    </Typography>
                </Box>
            </Box>
        );
    }

    if (categoriesError) {
        return (
            <Alert severity="error" sx={{ borderRadius: 1 }}>
                <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
                    {t('loadingCategoriesError')}
                </Typography>
            </Alert>
        );
    }

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
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
                    {t('title')}
                </Typography>
                <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
                >
                    {t('studentId', { id: selectedStudentId })}
                </Typography>
            </Box>

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
                    {t('alerts.submitSuccess')}
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
                    {t('alerts.submitError')}
                </Alert>
            )}

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
                                        {t('form.category.label')}
                                    </InputLabel>
                                    <Select
                                        {...field}
                                        label={t('form.category.label')}
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
                                                            fontSize:
                                                                '0.8125rem',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {category.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color: 'text.secondary',
                                                            fontSize:
                                                                '0.6875rem',
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
                                            {
                                                errors.complaintCategoryCode
                                                    .message
                                            }
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Controller
                            name="summary"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={t('form.summary.label')}
                                    placeholder={t('form.summary.placeholder')}
                                    size="small"
                                    fullWidth
                                    error={!!errors.summary}
                                    helperText={
                                        errors.summary?.message ||
                                        t('form.summary.helperText', {
                                            count: field.value.length,
                                        })
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

                    <Grid size={{ xs: 12 }}>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={t('form.description.label')}
                                    placeholder={t(
                                        'form.description.placeholder'
                                    )}
                                    multiline
                                    rows={3}
                                    fullWidth
                                    error={!!errors.description}
                                    helperText={
                                        errors.description?.message ||
                                        t('form.description.helperText', {
                                            count: field.value.length,
                                        })
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
                            {t('form.cancelButton')}
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
                            ? t('form.submitButton.pending')
                            : t('form.submitButton.default')}
                    </Button>
                </Box>
            </Box>

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
                        {t('preview.title')}
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
                                    {t('preview.category')}
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
                                    {t('preview.summary')}
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
                                    {t('preview.description')}
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
                                        ? `${watchedValues.description.substring(
                                              0,
                                              100
                                          )}...`
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
