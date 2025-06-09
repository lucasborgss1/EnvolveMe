import React from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'success';
    size?: 'small' | 'medium' | 'large';
    isFullWidth?: boolean;
    isOutlined?: boolean;
}

const getVariantStyles = (variant: ButtonProps['variant'] = 'primary', isOutlined: boolean) => {
    const variants = {
        primary: {
            background: 'linear-gradient(45deg, #6d28d9, #7c3aed)',
            hoverBackground: 'linear-gradient(45deg, #7c3aed, #8b5cf6)',
            outlinedColor: '#7c3aed'
        },
        secondary: {
            background: 'linear-gradient(45deg, #4b5563, #6b7280)',
            hoverBackground: 'linear-gradient(45deg, #6b7280, #9ca3af)',
            outlinedColor: '#6b7280'
        },
        danger: {
            background: 'linear-gradient(45deg, #dc2626, #ef4444)',
            hoverBackground: 'linear-gradient(45deg, #ef4444, #f87171)',
            outlinedColor: '#ef4444'
        },
        success: {
            background: 'linear-gradient(45deg, #059669, #10b981)',
            hoverBackground: 'linear-gradient(45deg, #10b981, #34d399)',
            outlinedColor: '#10b981'
        }
    };

    const style = variants[variant];

    if (isOutlined) {
        return `
            background: transparent;
            border: 2px solid ${style.outlinedColor};
            color: ${style.outlinedColor};

            &:hover:not(:disabled) {
                background: ${style.outlinedColor};
                color: white;
            }
        `;
    }

    return `
        background: ${style.background};
        border: none;
        color: white;

        &:hover:not(:disabled) {
            background: ${style.hoverBackground};
        }
    `;
};

const getSizeStyles = (size: ButtonProps['size'] = 'medium') => {
    const sizes = {
        small: {
            padding: '0.5rem 1rem',
            fontSize: '0.875rem'
        },
        medium: {
            padding: '0.75rem 1.5rem',
            fontSize: '1rem'
        },
        large: {
            padding: '1rem 2rem',
            fontSize: '1.125rem'
        }
    };

    return sizes[size];
};

const StyledButton = styled.button<ButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-family: "Anybody Variable", system-ui;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    width: ${props => props.isFullWidth ? '100%' : 'auto'};
    ${props => getVariantStyles(props.variant, props.isOutlined || false)}
    ${props => {
        const size = getSizeStyles(props.size);
        return `
            padding: ${size.padding};
            font-size: ${size.fontSize};
        `;
    }}

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }

    svg {
        width: 1.25em;
        height: 1.25em;
    }
`;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <StyledButton {...props}>
            {children}
        </StyledButton>
    );
}; 