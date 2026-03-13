import { Button, type ButtonProps } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// CTA Button variant types
type CTAVariant = 'primary' | 'secondary' | 'outline';

// CTA Button props
interface CTAButtonProps extends Omit<ButtonProps, 'variant'> {
    to?: string;
    variant?: CTAVariant;
    external?: boolean;
    children: React.ReactNode;
}

/**
 * CTAButton Component
 *
 * Call-to-action button component with:
 * - Primary and secondary variants per DESIGN_PATTERN.md
 * - Route navigation integration
 * - Hover states and animations
 * - Compact sizing (p: 2, fontSize: 0.875rem)
 * - Border radius: 4px
 */
export const CTAButton: React.FC<CTAButtonProps> = ({
    to,
    variant = 'primary',
    external = false,
    children,
    onClick,
    sx,
    ...props
}) => {
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(event);
        }

        if (to) {
            if (external) {
                window.open(to, '_blank', 'noopener,noreferrer');
            } else {
                navigate(to);
            }
        }
    };

    // Variant styles per DESIGN_PATTERN.md
    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return {
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    color: '#ffffff',
                    border: 'none',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                    },
                    '&:active': {
                        transform: 'translateY(0)',
                    },
                };
            case 'secondary':
                return {
                    backgroundColor: 'primary.100',
                    color: 'primary.main',
                    border: '1px solid',
                    borderColor: 'primary.200',
                    '&:hover': {
                        backgroundColor: 'primary.200',
                        borderColor: 'primary.main',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.15)',
                    },
                    '&:active': {
                        transform: 'translateY(0)',
                    },
                };
            case 'outline':
                return {
                    backgroundColor: 'transparent',
                    color: 'primary.main',
                    border: '1px solid',
                    borderColor: 'primary.main',
                    '&:hover': {
                        backgroundColor: 'primary.50',
                        borderColor: 'primary.main',
                        transform: 'translateY(-2px)',
                    },
                    '&:active': {
                        transform: 'translateY(0)',
                    },
                };
            default:
                return {};
        }
    };

    return (
        <Button
            onClick={handleClick}
            sx={{
                px: 3,
                py: 1.5,
                fontSize: '0.875rem',
                fontWeight: 500,
                borderRadius: 1,
                textTransform: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                ...getVariantStyles(),
                ...sx,
            }}
            {...props}
        >
            {children}
        </Button>
    );
};
