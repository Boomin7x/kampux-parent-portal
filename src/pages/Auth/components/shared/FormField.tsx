import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import {
    IconButton,
    InputAdornment,
    TextField,
    type TextFieldProps,
} from '@mui/material';
import React, { useState } from 'react';
import { type Control, Controller, type FieldError } from 'react-hook-form';
import { authStyles } from './authStyles';

interface FormFieldProps {
    name: string;
    control: Control<any>;
    label: string;
    placeholder?: string;
    type?: string;
    showPasswordToggle?: boolean;
    error?: FieldError;
    sx?: TextFieldProps['sx'];
    multiline?: boolean;
    rows?: number;
    fullWidth?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
    name,
    control,
    label,
    placeholder,
    type = 'text',
    showPasswordToggle = false,
    error,
    sx,
    multiline = false,
    rows,
    fullWidth = true,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const fieldType = showPasswordToggle
        ? showPassword
            ? 'text'
            : 'password'
        : type;

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <TextField
                    {...field}
                    label={label}
                    placeholder={placeholder}
                    type={fieldType}
                    fullWidth={fullWidth}
                    multiline={multiline}
                    rows={rows}
                    error={!!error}
                    helperText={error?.message}
                    sx={{ ...authStyles.textField, ...sx } as any}
                    InputProps={
                        showPasswordToggle
                            ? {
                                  endAdornment: (
                                      <InputAdornment position="end">
                                          <IconButton
                                              onClick={togglePasswordVisibility}
                                              edge="end"
                                              size="small"
                                              aria-label={
                                                  showPassword
                                                      ? 'Hide password'
                                                      : 'Show password'
                                              }
                                          >
                                              {showPassword ? (
                                                  <VisibilityOffIcon fontSize="small" />
                                              ) : (
                                                  <VisibilityIcon fontSize="small" />
                                              )}
                                          </IconButton>
                                      </InputAdornment>
                                  ),
                              }
                            : undefined
                    }
                />
            )}
        />
    );
};
