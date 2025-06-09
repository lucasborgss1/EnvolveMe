import styled from "styled-components";
import "@fontsource-variable/anybody";

export const StyledContent = styled.main`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    z-index: 1;
    color: white;
    gap: 3rem;
`;

export const StyledSection = styled.section`
    display: flex;
    width: 70%;

    text-align: center;
`;

export const StyledSectionsLeft = styled.section`
    display: flex;
    width: 70%;
    align-items: center;
    justify-content: space-between;

    div {
        max-width: 700px;
        text-align: justify;
        margin: 0 0.4rem;
        margin-bottom: 1rem;
        h2 {
            font-family: "Anybody Variable", system-ui;
            margin-bottom: 1rem;
        }

        ul {
            margin-top: 1rem;
            list-style: none;
            margin-bottom: 1rem;
        }
    }
`;

export const StyledSectionsRight = styled.section`
    display: flex;
    width: 70%;
    margin-bottom: 3rem;
    justify-content: space-between;
    div {
        margin-left: auto;
        max-width: 700px;
        text-align: justify;
        h2 {
            text-align: right;
            font-family: "Anybody Variable", system-ui;
            margin-bottom: 1rem;
        }

        ul {
            margin-top: 1rem;
            list-style: none;
        }
    }
`;
