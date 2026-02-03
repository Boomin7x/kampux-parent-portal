import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
import {
    Alert,
    Box,
    Chip,
    CircularProgress,
    Collapse,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useStudentStore } from '../../../../stores/studentStore';
import { useGetTellerOperations } from '../../_hooks/useParentWithStore';
import type { TellerOperation } from '../../_service/parentService';

interface PaymentTableRowProps {
    payment: TellerOperation;
    formatAmount: (amount: number) => string;
    formatDate: (dateString: string) => string;
    getPaymentTypeBreakdown: (payment: TellerOperation) => string;
}

const PaymentTableRow: React.FC<PaymentTableRowProps> = ({
    payment,
    formatAmount,
    formatDate,
    getPaymentTypeBreakdown,
}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow
                sx={{
                    backgroundColor: payment.isCancelled
                        ? 'error.50'
                        : 'inherit',
                    opacity: payment.isCancelled ? 0.7 : 1,
                    '&:nth-of-type(odd)': {
                        backgroundColor: payment.isCancelled
                            ? 'error.100'
                            : 'action.hover',
                    },
                }}
            >
                <TableCell sx={{ py: 1 }}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                        sx={{ p: 0.5 }}
                    >
                        {open ? (
                            <KeyboardArrowDown fontSize="small" />
                        ) : (
                            <KeyboardArrowRight fontSize="small" />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell sx={{ py: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {formatDate(payment.operationDate)}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                            fontFamily: 'monospace',
                        }}
                    >
                        {payment.reference}
                    </Typography>
                    {payment.receiptNumber && (
                        <Typography
                            variant="caption"
                            sx={{ color: 'text.secondary', display: 'block' }}
                        >
                            Reçu: {payment.receiptNumber}
                        </Typography>
                    )}
                </TableCell>
                <TableCell align="right" sx={{ py: 1 }}>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 600,
                            color: payment.isCancelled
                                ? 'error.main'
                                : 'success.main',
                            fontFamily: 'monospace',
                        }}
                    >
                        {formatAmount(payment.amount)}
                    </Typography>
                    {payment.netAmount &&
                        payment.netAmount !== payment.amount && (
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'text.secondary',
                                    display: 'block',
                                }}
                            >
                                Net: {formatAmount(payment.netAmount)}
                            </Typography>
                        )}
                </TableCell>
                <TableCell sx={{ py: 1 }}>
                    <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary' }}
                    >
                        {getPaymentTypeBreakdown(payment)}
                    </Typography>
                </TableCell>
                <TableCell sx={{ py: 1 }}>
                    <Chip
                        label={payment.isCancelled ? 'Annulé' : 'Validé'}
                        color={payment.isCancelled ? 'error' : 'success'}
                        size="small"
                        sx={{ fontSize: '0.6875rem' }}
                    />
                </TableCell>
                <TableCell sx={{ py: 1 }}>
                    <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary' }}
                    >
                        {payment.tellerName || '-'}
                    </Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 600,
                                    mb: 1,
                                    color: 'primary.main',
                                }}
                            >
                                Détails du Paiement
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 0.5,
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            sx={{ fontWeight: 600 }}
                                        >
                                            Informations Générales
                                        </Typography>

                                        {payment.billingsDetailFR && (
                                            <Typography
                                                variant="caption"
                                                sx={{ color: 'text.secondary' }}
                                            >
                                                <strong>Facture:</strong>{' '}
                                                {payment.billingsDetailFR}
                                            </Typography>
                                        )}

                                        {payment.tellerOperationModesDetailFR && (
                                            <Typography
                                                variant="caption"
                                                sx={{ color: 'text.secondary' }}
                                            >
                                                <strong>
                                                    Mode de paiement:
                                                </strong>{' '}
                                                {
                                                    payment.tellerOperationModesDetailFR
                                                }
                                            </Typography>
                                        )}

                                        {payment.bearer && (
                                            <Typography
                                                variant="caption"
                                                sx={{ color: 'text.secondary' }}
                                            >
                                                <strong>Porteur:</strong>{' '}
                                                {payment.bearer}
                                            </Typography>
                                        )}

                                        {payment.issueDate !==
                                            payment.operationDate && (
                                            <Typography
                                                variant="caption"
                                                sx={{ color: 'text.secondary' }}
                                            >
                                                <strong>
                                                    Date d'émission:
                                                </strong>{' '}
                                                {formatDate(payment.issueDate)}
                                            </Typography>
                                        )}
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 0.5,
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            sx={{ fontWeight: 600 }}
                                        >
                                            Montants Détaillés
                                        </Typography>

                                        {payment.amountRegistration &&
                                            payment.amountRegistration > 0 && (
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: 'text.secondary',
                                                    }}
                                                >
                                                    <strong>
                                                        Inscription:
                                                    </strong>{' '}
                                                    {formatAmount(
                                                        payment.amountRegistration
                                                    )}
                                                </Typography>
                                            )}

                                        {payment.amountSchoolFees &&
                                            payment.amountSchoolFees > 0 && (
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: 'text.secondary',
                                                    }}
                                                >
                                                    <strong>Scolarité:</strong>{' '}
                                                    {formatAmount(
                                                        payment.amountSchoolFees
                                                    )}
                                                </Typography>
                                            )}

                                        {payment.amountOther &&
                                            payment.amountOther > 0 && (
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: 'text.secondary',
                                                    }}
                                                >
                                                    <strong>
                                                        Autres frais:
                                                    </strong>{' '}
                                                    {formatAmount(
                                                        payment.amountOther
                                                    )}
                                                </Typography>
                                            )}

                                        {payment.amountInLetterFR && (
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: 'text.secondary',
                                                    fontStyle: 'italic',
                                                    mt: 1,
                                                }}
                                            >
                                                {payment.amountInLetterFR}
                                            </Typography>
                                        )}
                                    </Box>
                                </Grid>

                                {payment.isCancelled && (
                                    <Grid size={{ xs: 12 }}>
                                        <Box
                                            sx={{
                                                p: 1,
                                                backgroundColor: 'error.100',
                                                borderRadius: 1,
                                                border: '1px solid',
                                                borderColor: 'error.200',
                                            }}
                                        >
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: 'error.main',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                PAIEMENT ANNULÉ
                                            </Typography>
                                            {payment.cancellationPurpose && (
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: 'error.main',
                                                        display: 'block',
                                                    }}
                                                >
                                                    <strong>Motif:</strong>{' '}
                                                    {
                                                        payment.cancellationPurpose
                                                    }
                                                </Typography>
                                            )}
                                            {payment.cancellationDate && (
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: 'error.main',
                                                        display: 'block',
                                                    }}
                                                >
                                                    <strong>
                                                        Date d'annulation:
                                                    </strong>{' '}
                                                    {formatDate(
                                                        payment.cancellationDate
                                                    )}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

const PaymentHistory: React.FC = () => {
    const { selectedStudentId } = useStudentStore();

    const { data: payments, isLoading } = useGetTellerOperations(
        selectedStudentId as string,
        !!selectedStudentId
    );

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF',
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const paymentSummary = useMemo(() => {
        if (!payments || payments.length === 0) {
            return {
                totalAmount: 0,
                validPayments: 0,
                cancelledPayments: 0,
                totalRegistration: 0,
                totalSchoolFees: 0,
                totalOther: 0,
            };
        }

        const validPayments = payments.filter(p => !p.isCancelled);

        return {
            totalAmount: validPayments.reduce((sum, p) => sum + p.amount, 0),
            validPayments: validPayments.length,
            cancelledPayments: payments.filter(p => p.isCancelled).length,
            totalRegistration: validPayments.reduce(
                (sum, p) => sum + (p.amountRegistration || 0),
                0
            ),
            totalSchoolFees: validPayments.reduce(
                (sum, p) => sum + (p.amountSchoolFees || 0),
                0
            ),
            totalOther: validPayments.reduce(
                (sum, p) => sum + (p.amountOther || 0),
                0
            ),
        };
    }, [payments]);

    const getPaymentTypeBreakdown = (payment: TellerOperation) => {
        const breakdown = [];
        if (payment.amountRegistration && payment.amountRegistration > 0) {
            breakdown.push(
                `Inscription: ${formatAmount(payment.amountRegistration)}`
            );
        }
        if (payment.amountSchoolFees && payment.amountSchoolFees > 0) {
            breakdown.push(
                `Scolarité: ${formatAmount(payment.amountSchoolFees)}`
            );
        }
        if (payment.amountOther && payment.amountOther > 0) {
            breakdown.push(`Autres: ${formatAmount(payment.amountOther)}`);
        }
        return breakdown.length > 0 ? breakdown.join(' • ') : 'Non spécifié';
    };

    if (!selectedStudentId) {
        return (
            <Alert severity="info" sx={{ borderRadius: 1 }}>
                Veuillez sélectionner un étudiant pour voir l'historique des
                paiements.
            </Alert>
        );
    }

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress size={32} />
            </Box>
        );
    }

    if (!payments || payments.length === 0) {
        return (
            <Alert severity="info" sx={{ borderRadius: 1 }}>
                Aucun paiement trouvé pour cet étudiant.
            </Alert>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Header */}
            <Box sx={{ mb: 1.5 }}>
                <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, color: 'text.primary' }}
                >
                    Historique des Paiements ({payments.length})
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Détail des opérations de paiement effectuées
                </Typography>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid size={{ xs: 6, sm: 3 }}>
                    <Box
                        sx={{
                            p: 1.5,
                            backgroundColor: 'success.50',
                            border: '1px solid',
                            borderColor: 'success.100',
                            borderRadius: 1,
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{ color: 'text.secondary' }}
                        >
                            Total Payé
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, color: 'success.main' }}
                        >
                            {formatAmount(paymentSummary.totalAmount)}
                        </Typography>
                    </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                    <Box
                        sx={{
                            p: 1.5,
                            backgroundColor: 'primary.50',
                            border: '1px solid',
                            borderColor: 'primary.100',
                            borderRadius: 1,
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{ color: 'text.secondary' }}
                        >
                            Paiements Validés
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, color: 'primary.main' }}
                        >
                            {paymentSummary.validPayments}
                        </Typography>
                    </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                    <Box
                        sx={{
                            p: 1.5,
                            backgroundColor: 'warning.50',
                            border: '1px solid',
                            borderColor: 'warning.100',
                            borderRadius: 1,
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{ color: 'text.secondary' }}
                        >
                            Scolarité
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, color: 'warning.main' }}
                        >
                            {formatAmount(paymentSummary.totalSchoolFees)}
                        </Typography>
                    </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                    <Box
                        sx={{
                            p: 1.5,
                            backgroundColor: 'info.50',
                            border: '1px solid',
                            borderColor: 'info.100',
                            borderRadius: 1,
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{ color: 'text.secondary' }}
                        >
                            Inscription
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, color: 'info.main' }}
                        >
                            {formatAmount(paymentSummary.totalRegistration)}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            {/* Payment Table */}
            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden',
                }}
            >
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'primary.50' }}>
                            <TableCell sx={{ width: 40 }}></TableCell>
                            <TableCell>
                                <Typography
                                    variant="caption"
                                    sx={{ fontWeight: 600 }}
                                >
                                    Date / Référence
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography
                                    variant="caption"
                                    sx={{ fontWeight: 600 }}
                                >
                                    Montant
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="caption"
                                    sx={{ fontWeight: 600 }}
                                >
                                    Répartition
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="caption"
                                    sx={{ fontWeight: 600 }}
                                >
                                    Statut
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="caption"
                                    sx={{ fontWeight: 600 }}
                                >
                                    Caissier
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payments.map(payment => (
                            <PaymentTableRow
                                key={payment.id}
                                payment={payment}
                                formatAmount={formatAmount}
                                formatDate={formatDate}
                                getPaymentTypeBreakdown={
                                    getPaymentTypeBreakdown
                                }
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default PaymentHistory;
