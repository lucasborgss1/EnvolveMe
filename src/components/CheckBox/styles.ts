import styled from "styled-components";

interface CheckBoxColor {
    color?: string;
    background?: string;
}
export const CheckBoxModel = styled.div<CheckBoxColor>`
    display: flex;
    align-items: center;
    width: 100%;
    color: ${(props) => props.color};
    background: ${(props) => props.background};
    box-shadow: 0 8px 32px 0 color;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 10px;
    border: 1px solid ${(props) => props.color};

    label {
        padding-right: 1rem;
    }

    transition: all 0.5s;

    &:hover {
        transform: scale(1.06);
    }
`;
