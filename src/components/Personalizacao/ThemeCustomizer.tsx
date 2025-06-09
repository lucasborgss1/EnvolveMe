import React from 'react';
import styled from 'styled-components';
import { StyledButton } from '../utils/utils';

interface ThemeCustomizerProps {
    onThemeChange: (theme: string) => void;
    currentTheme: string;
}

const themes = {
    default: {
        primary: '#4caf50',
        secondary: '#ff9800',
        tertiary: '#ed88ff',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        text: '#ffffff'
    },
    ocean: {
        primary: '#2196f3',
        secondary: '#00bcd4',
        tertiary: '#4fc3f7',
        background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
        text: '#ffffff'
    },
    sunset: {
        primary: '#ff5722',
        secondary: '#ff9800',
        tertiary: '#ffeb3b',
        background: 'linear-gradient(135deg, #b71c1c 0%, #e65100 100%)',
        text: '#ffffff'
    },
    forest: {
        primary: '#2e7d32',
        secondary: '#558b2f',
        tertiary: '#8bc34a',
        background: 'linear-gradient(135deg, #1b5e20 0%, #33691e 100%)',
        text: '#ffffff'
    }
};

const Container = styled.div`
    padding: 2rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    max-width: 800px;
    margin: 0 auto;
`;

const ThemeGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
`;

const ThemeCard = styled.div<{ isSelected: boolean; theme: typeof themes.default }>`
    padding: 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid ${props => props.isSelected ? props.theme.primary : 'transparent'};
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

const ColorPreview = styled.div<{ color: string }>`
    width: 100%;
    height: 60px;
    border-radius: 4px;
    background: ${props => props.color};
    margin-bottom: 0.5rem;
`;

const ThemeName = styled.h3`
    margin: 0.5rem 0;
    text-align: center;
`;

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ onThemeChange, currentTheme }) => {
    return (
        <Container>
            <h2>Personalizar Tema</h2>
            <p>Escolha um tema que combine com seu estilo e personalidade.</p>
            
            <ThemeGrid>
                {Object.entries(themes).map(([name, theme]) => (
                    <ThemeCard
                        key={name}
                        isSelected={currentTheme === name}
                        theme={theme}
                        onClick={() => onThemeChange(name)}
                    >
                        <ColorPreview color={theme.primary} />
                        <ColorPreview color={theme.secondary} />
                        <ColorPreview color={theme.tertiary} />
                        <ThemeName>{name.charAt(0).toUpperCase() + name.slice(1)}</ThemeName>
                    </ThemeCard>
                ))}
            </ThemeGrid>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <StyledButton onClick={() => onThemeChange('default')}>
                    Restaurar Tema Padrão
                </StyledButton>
            </div>
        </Container>
    );
}; 