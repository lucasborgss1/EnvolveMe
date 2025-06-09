import styled, { keyframes } from "styled-components";
import "@fontsource-variable/anybody";

const textShadowDropRight = keyframes`
  0% {
    text-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    text-shadow: 0px 5px 30px rgba(255, 255, 255, 0.73);
  }
`;

const trackingInExpand = keyframes`
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
`;

const shine = keyframes`
 0% {
    left: -100px;
  }

  60% {
    left: 100%;
  }

  to {
    left: 100%;
  }
`;

export const StyledFontH1 = styled.h1`
    font-family: "Anybody Variable", system-ui;
    animation: ${textShadowDropRight} 0.6s both;
    -webkit-animation: ${textShadowDropRight} 0.6s both;
    color: white;

    font-weight: 500;
    font-size: 1.2rem;
`;

export const StyledFontH2 = styled.h2`
    font-family: "Anybody Variable", system-ui;
    animation: ${textShadowDropRight} 0.6s both;
    -webkit-animation: ${textShadowDropRight} 0.6s both;
    color: white;
`;

export const StyledFontLink = styled.a`
    animation: ${textShadowDropRight} 0.6s both;
    -webkit-animation: ${textShadowDropRight} 0.6s both;
    color: white;

    font-weight: 500;
    cursor: pointer;

    transition: transform 0.2s;
`;

export const StyledCardAnimation = styled.div`
    animation: ${trackingInExpand} 1s cubic-bezier(0.215, 0.61, 0.355, 1) both;
    h1 {
        font-family: "Anybody Variable", system-ui;
        font-size: 2rem;
        font-weight: 700;
    }

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: white;

    text-align: center;

    padding: 2rem;
`;

export const StyledButton = styled.button`
    font-family: "Anybody Variable", system-ui;
    position: relative;
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
    padding-block: 0.5rem;
    padding-inline: 1.25rem;
    background-color: rgb(93, 55, 154);
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #ffff;
    gap: 10px;
    font-weight: bold;
    border: 3px solid #ffffff4d;
    outline: none;
    overflow: hidden;
    font-size: 15px;

    &:hover {
        transform: scale(1.05);
        border-color: #fff9;
    }

    &:hover::before {
        animation: ${shine} 1.5s ease-out infinite;
    }

    &::before {
        content: "";
        position: absolute;
        width: 100px;
        height: 100%;
        background-image: linear-gradient(120deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0) 70%);
        top: 0;
        left: -100px;
        opacity: 0.6;
    }
`;

export const StyledInput = styled.input`
    background: rgba(151, 97, 245, 0.4);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 8px;
    font-family: "Anybody Variable", system-ui;

    padding: 1rem;
    outline: none;
    border: none;

    color: white;
    font-size: 1rem;

    transition: all 0.5s;

    &::placeholder {
        color: rgba(219, 219, 219, 0.88);
        opacity: 1;
    }
`;
