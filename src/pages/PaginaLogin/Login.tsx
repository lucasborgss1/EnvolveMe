import React from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import { StyledBackground } from "../../components/Background/styles";
import * as S from "./styles";
import { Link } from "react-router-dom";
import { StyledFontH1, StyledFontH2, StyledInput } from "../../components/utils/utils";
import { Checkbox } from "@mui/material";
import { HeaderCadastro } from "../../components/Header/HeaderCadastro";
import { Button } from "../../components/Button/Button";

interface UserState {
    nome: string;
    email: string;
    senha: string;
    desejos: string[];
    frases: string[];
    areas: string[];
    tempo: string[];
    motivacao: string[];
    fisicoHabito: string[];
    mentalHabito: string[];
    espiritualHabito: string[];
    perfil: string;
}

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const [mostrarSenha, setMostrarSenha] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [senha, setSenha] = React.useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const emailKey = email.trim().toLowerCase();
        const usuarioSalvoRaw = localStorage.getItem(`${emailKey}_formData`);

        if (!usuarioSalvoRaw) {
            alert("Usuário não encontrado.");
            return;
        }

        try {
            const dadosUsuario: UserState = JSON.parse(usuarioSalvoRaw);

            if (typeof dadosUsuario.senha !== "string" || typeof dadosUsuario.email !== "string" || typeof dadosUsuario.nome !== "string") {
                alert("Dados do usuário corrompidos. Por favor, cadastre-se novamente.");
                return;
            }

            if (dadosUsuario.senha === senha) {
                localStorage.setItem("usuario_atual", emailKey);
                navigate("/paginaInicial");
            } else {
                alert("Senha incorreta.");
            }
        } catch (error) {
            alert("Erro ao ler os dados do usuário. Por favor, tente novamente.");
            console.error("Erro ao fazer parse do usuário:", error);
        }
    };

    return (
        <>
            <StyledBackground />
            <HeaderCadastro />
            <main>
                <S.StyledFormSection>
                    <StyledFontH2>Login</StyledFontH2>
                    <S.StyledForm onSubmit={handleSubmit}>
                        <div className="login">
                            <label htmlFor="email" style={{ fontSize: "1.1rem" }}>
                                E-mail:
                            </label>
                            <StyledInput
                                style={{ width: "240px" }}
                                required
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="login">
                            <label htmlFor="senha" style={{ fontSize: "1.1rem" }}>
                                Senha:
                            </label>
                            <StyledInput
                                style={{ width: "240px" }}
                                required
                                type={mostrarSenha ? "text" : "password"}
                                name="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>
                        <div style={{ 
                            display: "flex", 
                            alignItems: "center", 
                            marginLeft: "auto", 
                            maxHeight: "30px" 
                        }}>
                            <>Mostrar senha </>
                            <Checkbox
                                id="mostrarSenha"
                                name="mostrarSenha"
                                checked={mostrarSenha}
                                onChange={() => setMostrarSenha(!mostrarSenha)}
                                style={{ color: "white" }}
                            />
                        </div>
                        <Button 
                            variant="primary" 
                            size="medium" 
                            type="submit"
                            isFullWidth
                        >
                            Entrar
                        </Button>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            maxHeight: "70px",
                            justifyContent: "space-between",
                            width: "100%",
                        }}>
                            <StyledFontH1 style={{
                                marginTop: "1rem",
                                fontSize: "1rem",
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                            }}>
                                Novo usuário?
                                <Link to="/cadastro" style={{ color: "rgb(201, 144, 255)" }}>
                                    cadastre-se
                                </Link>
                            </StyledFontH1>
                        </div>
                    </S.StyledForm>
                </S.StyledFormSection>
            </main>
            <Footer />
        </>
    );
};
