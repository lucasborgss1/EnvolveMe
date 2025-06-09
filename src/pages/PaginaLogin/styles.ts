import styled from "styled-components";

export const StyledFormSection = styled.section`
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

export const StyledForm = styled.form`
    display: flex;
    padding: 1rem;
    margin: 0 auto;
    color: white;
    flex-direction: column;
    gap: 0.5rem;

    .login {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
    }

    label {
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }
`;

export const StyledH2 = styled.h2`
    color: white;
    font-weight: 500;
    margin-bottom: 1rem;
`;
