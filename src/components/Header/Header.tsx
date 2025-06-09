import React, { useState, useEffect } from "react";
import * as S from "./styles";
import * as SU from "../utils/utils";
import { getLevelInfo } from "../utils/LevelSystem";

const getUsuarioAtual = () => {
    const email = localStorage.getItem("usuario_atual");
    if (!email) return null;

    const formData = JSON.parse(localStorage.getItem(`${email}_formData`) || "{}");
    const nome = formData?.nome || "Usuário";
    const xp = parseInt(formData?.xp ?? "0");
    return { nome, xp };
};

export const Header: React.FC = () => {
    const [usuario, setUsuario] = useState(getUsuarioAtual());

    useEffect(() => {
        const onUsuarioAtualizado = () => {
            setUsuario(getUsuarioAtual());
        };

        window.addEventListener("usuarioAtualizado", onUsuarioAtualizado);

        return () => {
            window.removeEventListener("usuarioAtualizado", onUsuarioAtualizado);
        };
    }, []);

    if (!usuario) return null;

    const { nome, xp } = usuario;
    const { level, name, progress, xpCurrent, xpNeeded } = getLevelInfo(xp);

    return (
        <S.StyledHeader>
            <div className="header">
                <a href="">
                    <S.StyledLogo>
                        <img src="/src/assets/aesthetic-landscape-reflection-background-hd-wallpaper-sr10012410.jpg" alt="logo" />
                        <SU.StyledFontH1>EnvolveMe</SU.StyledFontH1>
                    </S.StyledLogo>
                </a>

                <S.StyledNav>
                    <ul>
                        <li>
                            <S.CardPerfil>
                                <S.InfoPerfil>
                                    {nome}
                                    <span>
                                        Nível {level} - {name}
                                    </span>
                                    <S.StyledProgress value={progress} max={100} />
                                    <small>
                                        {xpCurrent} / {xpNeeded} XP
                                    </small>
                                </S.InfoPerfil>
                                <S.InfoNivel>{level}</S.InfoNivel>
                            </S.CardPerfil>
                        </li>
                    </ul>
                </S.StyledNav>
            </div>
        </S.StyledHeader>
    );
};
