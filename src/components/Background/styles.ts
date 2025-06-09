import { styled } from "styled-components";

export const StyledBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-image: url("/src/assets/aesthetic-landscape-reflection-background-hd-wallpaper-sr10012410.jpg");
    background-size: cover;
    background-position: center;
    z-index: -1;

    /* Efeito de desfoque */
    &::after {
        content: "";
        position: absolute;
        inset: 0;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        background: rgba(0, 0, 0, 0.5); /* camada semitransparente */
    }
`;

export const StyledBackground2 = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-image: url("/src/assets/aesthetic-landscape-reflection-background-hd-wallpaper-sr10012410.jpg");
    background-size: cover;
    background-position: center;
    z-index: -1;
`;
