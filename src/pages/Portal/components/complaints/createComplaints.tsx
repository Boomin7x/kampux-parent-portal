import {
    AttachFile,
    CheckCircle,
    Error as ErrorIcon,
    Send,
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useStudentStore } from '../../../../stores/studentStore';
import { useCreateComplaintForSelectedStudent } from '../../_hooks/useParentWithStore';
import type { CreateComplaintRequest } from '../../_service/parentService';

interface CreateComplaintsProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

const COMPLAINT_CATEGORIES = [
    { value: 'academic', label: 'Académique', color: '#2563eb' },
    { value: 'administrative', label: 'Administratif', color: '#7c3aed' },
    { value: 'facility', label: 'Installations', color: '#059669' },
    { value: 'behavioral', label: 'Comportemental', color: '#dc2626' },
    { value: 'other', label: 'Autre', color: '#6b7280' },
] as const;

const PRIORITY_LEVELS = [
    { value: 'low', label: 'Faible', color: '#10b981' },
    { value: 'medium', label: 'Moyenne', color: '#f59e0b' },
    { value: 'high', label: 'Élevée', color: '#ef4444' },
    { value: 'urgent', label: 'Urgente', color: '#dc2626' },
] as const;

const CreateComplaints: React.FC<CreateComplaintsProps> = ({
    onSuccess,
    onCancel,
}) => {
    const { selectedStudentId } = useStudentStore();
    const createComplaint = useCreateComplaintForSelectedStudent();

    const [formData, setFormData] = useState<
        Omit<CreateComplaintRequest, 'studentId' | 'attachments'>
    >({
        subject: '',
        description: '',
        category: 'other',
        priority: 'medium',
    });

    const [attachments, setAttachments] = useState<File[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange =
        (field: keyof typeof formData) =>
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormData(prev => ({ ...prev, [field]: event.target.value }));
            if (errors[field]) {
                setErrors(prev => ({ ...prev, [field]: '' }));
            }
        };

    const handleSelectChange =
        (field: 'category' | 'priority') => (event: any) => {
            setFormData(prev => ({ ...prev, [field]: event.target.value }));
        };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        setAttachments(prev => [...prev, ...files]);
    };

    const removeAttachment = (index: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.subject.trim()) {
            newErrors.subject = 'Le sujet est requis';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'La description est requise';
        }

        if (formData.description.length < 10) {
            newErrors.description =
                'La description doit contenir au moins 10 caractères';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validateForm() || !selectedStudentId) return;

        try {
            await createComplaint.mutateAsync({
                ...formData,
                attachments: attachments.length > 0 ? attachments : undefined,
            });

            // Reset form
            setFormData({
                subject: '',
                description: '',
                category: 'other',
                priority: 'medium',
            });
            setAttachments([]);
            setErrors({});

            onSuccess?.();
        } catch (error) {
            console.error('Failed to submit complaint:', error);
        }
    };

    const getCategoryInfo = (category: string) =>
        COMPLAINT_CATEGORIES.find(c => c.value === category);

    const getPriorityInfo = (priority: string) =>
        PRIORITY_LEVELS.find(p => p.value === priority);

    if (!selectedStudentId) {
        return (
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Alert severity="warning" sx={{ borderRadius: 1 }}>
                    Veuillez sélectionner un étudiant pour soumettre une
                    plainte.
                </Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
            {/* Header */}
            <Box sx={{ mb: 3 }}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 0.5,
                    }}
                >
                    Soumettre une Plainte
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}
                >
                    Concernant l'étudiant sélectionné (ID: {selectedStudentId})
                </Typography>
            </Box>

            {/* Success/Error Alert */}
            {createComplaint.isSuccess && (
                <Alert
                    severity="success"
                    icon={<CheckCircle fontSize="small" />}
                    sx={{
                        mb: 2,
                        borderRadius: 1,
                        '& .MuiAlert-message': { fontSize: '0.8125rem' },
                    }}
                >
                    Plainte soumise avec succès. Vous recevrez une réponse sous
                    48 heures.
                </Alert>
            )}

            {createComplaint.isError && (
                <Alert
                    severity="error"
                    icon={<ErrorIcon fontSize="small" />}
                    sx={{
                        mb: 2,
                        borderRadius: 1,
                        '& .MuiAlert-message': { fontSize: '0.8125rem' },
                    }}
                >
                    Erreur lors de la soumission. Veuillez réessayer.
                </Alert>
            )}

            {/* Form */}
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 2,
                }}
            >
                {/* Category and Priority */}
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <FormControl size="small" sx={{ minWidth: 140, flex: 1 }}>
                        <InputLabel sx={{ fontSize: '0.8125rem' }}>
                            Catégorie
                        </InputLabel>
                        <Select
                            value={formData.category}
                            onChange={handleSelectChange('category')}
                            label="Catégorie"
                            sx={{ fontSize: '0.8125rem' }}
                        >
                            {COMPLAINT_CATEGORIES.map(category => (
                                <MenuItem
                                    key={category.value}
                                    value={category.value}
                                    sx={{ fontSize: '0.8125rem' }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                backgroundColor: category.color,
                                            }}
                                        />
                                        {category.label}
                                    </Box>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 120, flex: 1 }}>
                        <InputLabel sx={{ fontSize: '0.8125rem' }}>
                            Priorité
                        </InputLabel>
                        <Select
                            value={formData.priority}
                            onChange={handleSelectChange('priority')}
                            label="Priorité"
                            sx={{ fontSize: '0.8125rem' }}
                        >
                            {PRIORITY_LEVELS.map(priority => (
                                <MenuItem
                                    key={priority.value}
                                    value={priority.value}
                                    sx={{ fontSize: '0.8125rem' }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                backgroundColor: priority.color,
                                            }}
                                        />
                                        {priority.label}
                                    </Box>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {/* Subject */}
                <TextField
                    label="Sujet"
                    value={formData.subject}
                    onChange={handleInputChange('subject')}
                    error={!!errors.subject}
                    helperText={errors.subject}
                    size="small"
                    fullWidth
                    InputLabelProps={{ sx: { fontSize: '0.8125rem' } }}
                    inputProps={{ sx: { fontSize: '0.8125rem' } }}
                    FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
                />

                {/* Description */}
                <TextField
                    label="Description détaillée"
                    value={formData.description}
                    onChange={handleInputChange('description')}
                    error={!!errors.description}
                    helperText={
                        errors.description ||
                        `${formData.description.length} caractères`
                    }
                    multiline
                    rows={4}
                    fullWidth
                    InputLabelProps={{ sx: { fontSize: '0.8125rem' } }}
                    inputProps={{ sx: { fontSize: '0.8125rem' } }}
                    FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
                />

                {/* File Upload */}
                <Box>
                    <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                        id="file-upload"
                    />
                    <label htmlFor="file-upload">
                        <Button
                            component="span"
                            startIcon={<AttachFile fontSize="small" />}
                            size="small"
                            sx={{
                                fontSize: '0.75rem',
                                textTransform: 'none',
                                color: 'text.secondary',
                                borderColor: 'divider',
                            }}
                            variant="outlined"
                        >
                            Joindre des fichiers
                        </Button>
                    </label>

                    {attachments.length > 0 && (
                        <Box
                            sx={{
                                mt: 1,
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 0.5,
                            }}
                        >
                            {attachments.map((file, index) => (
                                <Chip
                                    key={index}
                                    label={file.name}
                                    onDelete={() => removeAttachment(index)}
                                    size="small"
                                    sx={{ fontSize: '0.6875rem', height: 24 }}
                                />
                            ))}
                        </Box>
                    )}
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
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
                            createComplaint.isPending ||
                            !formData.subject ||
                            !formData.description
                        }
                        startIcon={<Send fontSize="small" />}
                        sx={{
                            fontSize: '0.8125rem',
                            textTransform: 'none',
                            flex: 2,
                        }}
                    >
                        {createComplaint.isPending
                            ? 'Envoi...'
                            : 'Soumettre la Plainte'}
                    </Button>
                </Box>
            </Box>

            {/* Current Selection Display */}
            <Box
                sx={{
                    mt: 2,
                    p: 1.5,
                    backgroundColor: 'primary.50',
                    border: '1px solid',
                    borderColor: 'primary.100',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box>
                    <Typography
                        variant="caption"
                        sx={{
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            display: 'block',
                        }}
                    >
                        Plainte sélectionnée
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                        <Chip
                            label={getCategoryInfo(formData.category)?.label}
                            size="small"
                            sx={{
                                fontSize: '0.6875rem',
                                height: 20,
                                backgroundColor:
                                    getCategoryInfo(formData.category)?.color +
                                    '20',
                                color: getCategoryInfo(formData.category)
                                    ?.color,
                                border: 'none',
                            }}
                        />
                        <Chip
                            label={getPriorityInfo(formData.priority)?.label}
                            size="small"
                            sx={{
                                fontSize: '0.6875rem',
                                height: 20,
                                backgroundColor:
                                    getPriorityInfo(formData.priority)?.color +
                                    '20',
                                color: getPriorityInfo(formData.priority)
                                    ?.color,
                                border: 'none',
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CreateComplaints;
