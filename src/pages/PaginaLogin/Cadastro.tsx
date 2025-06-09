/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import { StyledBackground } from "../../components/Background/styles";
import * as S from "./styles";
import { StyledFontH2, StyledInput } from "../../components/utils/utils";
import { Checkbox } from "@mui/material";
import { HeaderCadastro } from "../../components/Header/HeaderCadastro";
import { CheckBoxInput } from "../../components/CheckBox/ExempleCheckBox";
import { Button } from "../../components/Button/Button";

interface FormData {
    nome: string;
    email: string;
    senha: string;
    desejos: string[];
    areas: string[];
    tempo: string[];
    motivacao: string[];
    fisicoHabito: string[];
    mentalHabito: string[];
    espiritualHabito: string[];
    perfil: string;
}

export const Cadastro: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        nome: "",
        email: "",
        senha: "",
        desejos: [],
        areas: [],
        tempo: [],
        motivacao: [],
        fisicoHabito: [],
        mentalHabito: [],
        espiritualHabito: [],
        perfil: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => {
            const currentArray = prev[field] as string[];
            return {
                ...prev,
                [field]: currentArray.includes(value)
                    ? currentArray.filter((item: string) => item !== value)
                    : [...currentArray, value],
            };
        });
    };

    const handleSubmit = () => {
        const emailKey = formData.email.trim().toLowerCase();
        const usuarioExistente = localStorage.getItem(`${emailKey}_formData`);

        if (usuarioExistente) {
            alert("Este e-mail já está cadastrado.");
            return;
        }

        localStorage.setItem(`${emailKey}_formData`, JSON.stringify(formData));
        localStorage.setItem("usuario_atual", emailKey);
        navigate("/paginaInicial");
    };

    return (
        <>
            <HeaderCadastro />
            <StyledBackground />
            <main>
                {step === 1 && (
                    <S.StyledFormSection>
                        <StyledFontH2>
                            Cadastro
                        </StyledFontH2>

                        <S.StyledForm>
                            <div className="login">
                                <label htmlFor="nome" style={{ fontSize: "1.3rem" }}>
                                    Nome:
                                </label>
                                <StyledInput
                                    style={{ width: "240px" }}
                                    required
                                    placeholder="Nome e Sobrenome"
                                    type="text"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="login">
                                <label htmlFor="email" style={{ fontSize: "1.3rem" }}>
                                    E-mail:
                                </label>
                                <StyledInput
                                    style={{ width: "240px" }}
                                    required
                                    placeholder=""
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="login">
                                <label htmlFor="senha" style={{ fontSize: "1.3rem" }}>
                                    Senha:
                                </label>
                                <StyledInput
                                    style={{ width: "240px" }}
                                    required
                                    placeholder="(minimo 5 dígitos)"
                                    type={mostrarSenha ? "text" : "password"}
                                    name="senha"
                                    value={formData.senha}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
                                <>Mostrar senha </>
                                <Checkbox
                                    id="mostrarSenha"
                                    name="mostrarSenha"
                                    checked={mostrarSenha}
                                    onChange={() => setMostrarSenha(!mostrarSenha)}
                                    style={{ color: "white" }}
                                />
                            </div>

                            <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", justifyContent: "space-between", width: "100%" }}>
                                <Button
                                    variant="secondary"
                                    size="medium"
                                    onClick={() => navigate("/login")}
                                    isOutlined
                                >
                                    Voltar para Login
                                </Button>
                                <Button
                                    variant="primary"
                                    size="medium"
                                    onClick={() => {
                                        if (formData.nome.length == 0 || formData.senha.length == 0 || formData.email.length == 0) {
                                            alert("Informe os dados corretamente.");
                                            setStep(1);
                                        } else {
                                            setStep(2);
                                        }
                                    }}
                                >
                                    Próximo
                                </Button>
                            </div>
                        </S.StyledForm>
                    </S.StyledFormSection>
                )}

                {step === 2 && (
                    <S.StyledFormSection>
                        <S.StyledH2>O que você deseja alcançar?</S.StyledH2>
                        <S.StyledForm>
                            {["Mais disposição física", "Melhor concentração", "Paz interior", "Hábitos saudáveis"].map((desc) => (
                                <CheckBoxInput
                                    key={desc}
                                    checked={formData.desejos.includes(desc)}
                                    description={desc}
                                    onChange={() => handleCheckboxChange("desejos", desc)}
                                    color="rgb(87, 98, 253)"
                                    backgroundColor="white"
                                />
                            ))}
                            <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", justifyContent: "space-between", width: "100%" }}>
                                <Button
                                    variant="secondary"
                                    size="medium"
                                    onClick={() => setStep(1)}
                                    isOutlined
                                >
                                    Voltar
                                </Button>
                                <Button
                                    variant="primary"
                                    size="medium"
                                    onClick={() => setStep(3)}
                                >
                                    Próximo
                                </Button>
                            </div>
                        </S.StyledForm>
                    </S.StyledFormSection>
                )}

                {step === 3 && (
                    <S.StyledFormSection>
                        <S.StyledH2>Quais áreas você quer focar?</S.StyledH2>
                        <S.StyledForm>
                            {["Físico", "Mental", "Espiritual"].map((area) => (
                                <CheckBoxInput
                                    key={area}
                                    checked={formData.areas.includes(area)}
                                    description={area}
                                    onChange={() => handleCheckboxChange("areas", area)}
                                    color="rgb(87, 98, 253)"
                                    backgroundColor="white"
                                />
                            ))}
                            <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", justifyContent: "space-between", width: "100%" }}>
                                <Button
                                    variant="secondary"
                                    size="medium"
                                    onClick={() => setStep(2)}
                                    isOutlined
                                >
                                    Voltar
                                </Button>
                                <Button
                                    variant="primary"
                                    size="medium"
                                    onClick={() => setStep(4)}
                                >
                                    Próximo
                                </Button>
                            </div>
                        </S.StyledForm>
                    </S.StyledFormSection>
                )}

                {step === 4 && (
                    <S.StyledFormSection>
                        <S.StyledH2>Quanto tempo você tem disponível?</S.StyledH2>
                        <S.StyledForm>
                            {["5 minutos", "15 minutos", "30 minutos", "1 hora"].map((tempo) => (
                                <CheckBoxInput
                                    key={tempo}
                                    checked={formData.tempo.includes(tempo)}
                                    description={tempo}
                                    onChange={() => handleCheckboxChange("tempo", tempo)}
                                    color="rgb(87, 98, 253)"
                                    backgroundColor="white"
                                />
                            ))}
                            <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", justifyContent: "space-between", width: "100%" }}>
                                <Button
                                    variant="secondary"
                                    size="medium"
                                    onClick={() => setStep(3)}
                                    isOutlined
                                >
                                    Voltar
                                </Button>
                                <Button
                                    variant="primary"
                                    size="medium"
                                    onClick={() => setStep(5)}
                                >
                                    Próximo
                                </Button>
                            </div>
                        </S.StyledForm>
                    </S.StyledFormSection>
                )}

                {step === 5 && (
                    <S.StyledFormSection>
                        <S.StyledH2>O que te motiva?</S.StyledH2>
                        <S.StyledForm>
                            {["Competição", "Recompensas", "Progresso visível", "Metas claras"].map((motivacao) => (
                                <CheckBoxInput
                                    key={motivacao}
                                    checked={formData.motivacao.includes(motivacao)}
                                    description={motivacao}
                                    onChange={() => handleCheckboxChange("motivacao", motivacao)}
                                    color="rgb(87, 98, 253)"
                                    backgroundColor="white"
                                />
                            ))}
                            <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", justifyContent: "space-between", width: "100%" }}>
                                <Button
                                    variant="secondary"
                                    size="medium"
                                    onClick={() => setStep(4)}
                                    isOutlined
                                >
                                    Voltar
                                </Button>
                                <Button
                                    variant="primary"
                                    size="medium"
                                    onClick={handleSubmit}
                                >
                                    Finalizar
                                </Button>
                            </div>
                        </S.StyledForm>
                    </S.StyledFormSection>
                )}
            </main>
            <Footer />
        </>
    );
};
