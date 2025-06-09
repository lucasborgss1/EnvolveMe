import React from "react";
import Checkbox from "@mui/material/Checkbox";
import * as S from "./styles";

interface CheckBoxProps {
    task?: boolean;
    checked: boolean;
    description: string;
    color?: string;
    backgroundColor?: string;
    onChange: (checked: boolean) => void; // adiciona controle externo
}

export const CheckBoxInput: React.FC<CheckBoxProps> = ({ task, checked, description, color, backgroundColor, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    };

    return (
        <S.CheckBoxModel color={color} background={backgroundColor}>
            <Checkbox checked={checked} onChange={handleChange} style={{ color: `${color}` }} />
            <label>
                <p style={{ textDecoration: task && checked ? "line-through" : "none" }}>{description}</p>
            </label>
        </S.CheckBoxModel>
    );
};
