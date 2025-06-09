import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TimerContainer = styled.div`
    text-align: center;
    padding: 2rem;
    border-radius: 16px;
    width: 100%;
    max-width: 400px;
`;

const TimerDisplay = styled.div`
    font-size: 4rem;
    font-family: 'DM Mono', monospace;
    color: #a78bfa;
    margin: 1.5rem 0;
    text-shadow: 0 0 10px rgba(167, 139, 250, 0.3);
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
`;

const TimerButton = styled.button<{ variant?: 'start' | 'stop' | 'reset' }>`
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    color: white;
    background: ${props => 
        props.variant === 'start' ? 'linear-gradient(45deg, #10b981, #059669)' :
        props.variant === 'stop' ? 'linear-gradient(45deg, #ef4444, #dc2626)' :
        'linear-gradient(45deg, #6b7280, #4b5563)'};

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: translateY(0);
    }
`;

const ProgressBar = styled.div<{ progress: number }>`
    width: 100%;
    height: 4px;
    background: rgba(167, 139, 250, 0.2);
    border-radius: 2px;
    margin: 1rem 0;
    position: relative;
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: ${props => props.progress}%;
        background: #a78bfa;
        transition: width 1s linear;
    }
`;

export const PomodoroTimer: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [cycles, setCycles] = useState(0);
    const initialTime = 25 * 60;

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        setCycles(prev => prev + 1);
                        return initialTime;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    const progress = ((initialTime - timeLeft) / initialTime) * 100;

    return (
        <TimerContainer>
            <h3>Timer Pomodoro</h3>
            <p style={{ opacity: 0.7, marginTop: "0.5rem" }}>
                {cycles} {cycles === 1 ? 'ciclo' : 'ciclos'} completados
            </p>
            
            <TimerDisplay>
                {formatTime(timeLeft)}
            </TimerDisplay>

            <ProgressBar progress={progress} />

            <ButtonContainer>
                <TimerButton
                    variant={isRunning ? 'stop' : 'start'}
                    onClick={() => setIsRunning(!isRunning)}
                >
                    {isRunning ? "Pausar" : "Iniciar"}
                </TimerButton>
                <TimerButton
                    variant="reset"
                    onClick={() => {
                        setTimeLeft(initialTime);
                        setIsRunning(false);
                    }}
                >
                    Resetar
                </TimerButton>
            </ButtonContainer>
        </TimerContainer>
    );
}; 