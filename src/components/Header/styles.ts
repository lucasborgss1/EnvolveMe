import styled from "styled-components";

export const StyledHeader = styled.header`
    width: 100%;
    margin-top: 1rem;
    display: flex;
    position: relative;
    top: 0;
    justify-content: center;
    z-index: 1;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 1400px;
        padding: 1rem;
        height: 4rem;

        a {
            text-decoration: none;
        }
    }
`;

export const StyledLogo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
        border-radius: 50%;
        width: 40px;
        height: 40px;
    }
`;

export const StyledNav = styled.nav`
    ul {
        display: flex;
        list-style: none;
        gap: 2rem;
        li {
            a {
                text-decoration: none;
                color: white;
            }
        }
    }
`;

export const CardPerfil = styled.div`
    padding: 0.4rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;

export const InfoPerfil = styled.p`
    color: white;
    font-size: 1.1rem;
    display: flex;
    flex-direction: column;
    text-align: center;
    span {
        font-size: 1rem;
    }
`;

export const InfoNivel = styled.div`
    color: rgb(255, 255, 255);
    border-radius: 100px;
    background-color: rgb(93, 55, 154);
    padding: 1rem;
`;

export const StyledProgress = styled.progress`
    margin-top: 0.4rem;
    width: 100%;
    height: 10px;
    appearance: none;
    -webkit-appearance: none;

    &::-webkit-progress-bar {
        background-color: rgb(93, 55, 154);
        border-radius: 18px;
    }

    &::-webkit-progress-value {
        background-color: rgb(255, 255, 255);
        border-radius: 12px;
        transition: width 0.4s ease;
    }

    &::-moz-progress-bar {
        background-color: rgb(93, 55, 154);
        border-radius: 12px;
        transition: width 0.4s ease;
    }
`;
