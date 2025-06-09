import styled from "styled-components";

export const StyledNav = styled.nav`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.6rem;
    margin-bottom: 2rem;

    ul {
        border-bottom: 3px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        padding: 0.8rem;
        display: flex;
        gap: 6rem;
        list-style: none;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);

        li {
            button {
                background-color: transparent;
                border: none;
                color: white;
                font-size: 1.2rem;
                transition: all 0.3s;
                cursor: pointer;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                font-family: "Anybody Variable", system-ui;
                font-weight: 500;

                &:hover {
                    background: rgba(109, 40, 217, 0.2);
                    color: #7c3aed;
                }

                &.active {
                    background: linear-gradient(45deg, #6d28d9, #7c3aed);
                    color: white;
                }
            }
        }
    }
`;

export const StyledAside = styled.aside`
    color: white;
    margin-left: 1rem;
    width: 100%;
    max-width: 300px;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);

    h4 {
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-size: 1.2rem;
        color: rgba(255, 255, 255, 0.9);
    }

    ul {
        li {
            list-style: none;
            margin-bottom: 0.8rem;
            padding: 0.5rem;
            border-radius: 8px;
            transition: all 0.3s;

            &:hover {
                background: rgba(255, 255, 255, 0.05);
            }
        }
    }
`;

export const StyledMainSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    color: white;
    padding: 0 2rem;
`;

export const TituloPagina = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 1rem;
    text-align: center;

    h3 {
        font-size: 2rem;
        margin-bottom: 1rem;
        background: linear-gradient(45deg, #fff, #a78bfa);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;

export const StyledUl = styled.ul`
    margin-top: 1rem;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
`;

export const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1200px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 2rem;
    margin: 1rem;
    transition: all 0.3s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }
`;

export const StyledDivStats = styled.div`
    padding: 1.5rem;
    margin: 1rem auto;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    width: 100%;
`;

export const ProgressBar = styled.div<{ progress: number; color: string }>`
    width: 100%;
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    margin: 0.5rem 0;
    overflow: hidden;

    &::after {
        content: "";
        display: block;
        width: ${(props) => props.progress}%;
        height: 100%;
        background: ${(props) => props.color};
        transition: width 0.3s ease;
    }
`;

export const AreasGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    width: 100%;
    margin: 1rem 0;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const AreaCard = styled.div`
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s;
    height: 100%;

    &:hover {
        background: rgba(255, 255, 255, 0.08);
        transform: translateY(-2px);
    }

    h5 {
        font-size: 1.2rem;
        margin-bottom: 1rem;
    }
`;

export const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    width: 100%;
    margin: 1rem 0;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const XPProgress = styled.div`
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1rem 0;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.08);
        transform: translateY(-2px);
    }

    h4 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #a78bfa;
    }
`;

export const StyledButton = styled.button`
    background: linear-gradient(45deg, #6d28d9, #7c3aed);
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
    margin: 0.5rem;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
    }
`;

export const HistoricoModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const HistoricoContent = styled.div`
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 16px;
    width: 90%;
    max-width: 600px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    max-height: 80vh;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
    }
`;

export const HistoricoItem = styled.div<{ concluido: boolean }>`
    background: rgba(255, 255, 255, 0.05);
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: ${(props) => (props.concluido ? 1 : 0.7)};

    &:hover {
        background: rgba(255, 255, 255, 0.08);
    }
`;

export const HistoricoStatus = styled.span<{ concluido: boolean }>`
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.875rem;
    background: ${(props) => (props.concluido ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)")};
    color: ${(props) => (props.concluido ? "#10b981" : "#ef4444")};
`;

export const DesafioCard = styled.div`
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    padding: 1.5rem;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    min-height: 200px;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        border-color: rgba(255, 255, 255, 0.2);
    }
`;

export const FeedbackTextArea = styled.textarea`
    width: 100%;
    padding: 0.8rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: white;
    min-height: 100px;
    resize: vertical;
    font-size: 1rem;
    outline: none;

    &::placeholder {
        color: rgba(255, 255, 255, 0.7);
    }
`;

export const StyledTextArea = styled.textarea`
    width: 100%;
    min-height: 100px;
    padding: 1rem;
    margin-top: 0.5rem;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: #fff;
    font-size: 1rem;
    resize: vertical;

    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
        outline: none;
        border-color: #8b5cf6;
    }
`;

export const LevelModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const LevelContent = styled.div`
    background: rgba(26, 26, 26, 0.95);
    border-radius: 16px;
    padding: 2rem;
    width: 90%;
    max-width: 800px;
    max-height: 85vh;
    overflow-y: auto;
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    position: relative;

    h3 {
        font-size: 1.8rem;
        color: #fff;
        font-weight: 600;
        background-clip: text;
        -webkit-background-clip: text;
    }

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
    }
`;

export const LevelCard = styled.div<{ isActive?: boolean; isCompleted?: boolean }>`
    background: ${(props) => (props.isActive ? "rgba(167, 139, 250, 0.15)" : "rgba(255, 255, 255, 0.07)")};
    border: 1px solid ${(props) => (props.isActive ? "#a78bfa" : props.isCompleted ? "#10b981" : "rgba(255, 255, 255, 0.1)")};
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1rem 0;
    position: relative;
    opacity: ${(props) => (props.isCompleted ? 1 : 0.9)};
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        background: ${(props) => (props.isActive ? "rgba(167, 139, 250, 0.2)" : "rgba(255, 255, 255, 0.1)")};
    }

    h5 {
        color: ${(props) => (props.isActive ? "#a78bfa" : props.isCompleted ? "#10b981" : "#fff")};
        font-size: 1.3rem;
        margin-bottom: 0.8rem;
        font-weight: 600;
    }

    p {
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.9);
        line-height: 1.5;
        margin-bottom: 0.5rem;
    }

    .level-info {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.7);
        margin-top: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
`;
