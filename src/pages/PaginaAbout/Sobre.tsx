import * as S from "./styles";

import { Footer } from "../../components/Footer/Footer";
import * as SU from "../../components/utils/utils";
import { StyledBackground } from "../../components/Background/styles";
import { ExampleChart } from "../../components/Grafico/ExempleChart";
import { CheckBoxInput } from "../../components/CheckBox/ExempleCheckBox";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";

import { useState } from "react";
import { HeaderCadastro } from "../../components/Header/HeaderCadastro";

export const Sobre: React.FC = () => {
    const navigate = useNavigate();
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);

    const handleButtonComecar = () => {
        navigate("/login");
    };

    return (
        <>
            <StyledBackground />
            <HeaderCadastro />
            <main>
                <S.StyledContent>
                    <SU.StyledCardAnimation style={{ width: "100%", height: "100vh" }}>
                        <SU.StyledFontH1>Bem-vindo ao EvolveMe</SU.StyledFontH1>
                        <p>Desenvolva corpo, mente e espírito em uma jornada gamificada de autodesenvolvimento.</p>
                        <Button 
                            variant="primary" 
                            size="large" 
                            onClick={handleButtonComecar}
                            style={{ marginTop: "1rem" }}
                        >
                            Começar
                        </Button>
                    </SU.StyledCardAnimation>
                    <S.StyledSection id="sobre">
                        <h3>
                            O EvolveMe é mais que um aplicativo — é o seu parceiro diário na evolução pessoal. Através de desafios personalizados, você
                            transforma hábitos, fortalece o corpo, estimula a mente e alimenta sua espiritualidade, tudo em um só lugar.
                        </h3>
                    </S.StyledSection>
                    <hr style={{ width: "50%" }} />
                    <S.StyledSectionsLeft>
                        <div>
                            <SU.StyledFontH2>Como Funciona?</SU.StyledFontH2>
                            <p>
                                Todos os dias, o <strong>EvolveMe</strong> propõe <strong>9 missões personalizadas</strong>, divididas em três áreas essenciais:
                            </p>

                            <ul>
                                <li>
                                    <strong>Físico:</strong> exercícios, saúde, bem-estar.
                                </li>
                                <li>
                                    <strong>Mental:</strong> leitura, memorização, aprendizado.
                                </li>
                                <li>
                                    <strong>Espiritual:</strong> meditação, gratidão, autoconhecimento.
                                </li>
                            </ul>
                            <p>Nosso algoritmo adapta as tarefas com base nos seus objetivos e progresso.</p>
                        </div>
                        <div>
                            <CheckBoxInput task checked={checked1} description="Passear com o Cachorro" onChange={setChecked1} color="red" />
                            <CheckBoxInput checked={checked2} description="Meditação" onChange={setChecked2} color="#6495ED" />
                            <CheckBoxInput checked={checked3} description="Palavras Cruzadas" onChange={setChecked3} color="yellow" />
                        </div>
                    </S.StyledSectionsLeft>
                    <hr style={{ width: "50%" }} />
                    <S.StyledSectionsRight>
                        <div>
                            <SU.StyledFontH2>Gamificação que Motiva</SU.StyledFontH2>
                            <p>
                                Ganhe pontos de experiência (XP), suba de nível e desbloqueie conquistas. Transforme sua evolução em uma aventura emocionante!
                            </p>
                        </div>
                    </S.StyledSectionsRight>
                    <hr style={{ width: "50%" }} />
                    <S.StyledSectionsLeft>
                        <div>
                            <SU.StyledFontH2>Acompanhe Seu Progresso</SU.StyledFontH2>
                            <p>
                                Visualize seu desenvolvimento com gráficos, relatórios e comparativos. Exporte seus dados e tenha total controle da sua jornada
                                de crescimento.
                            </p>
                        </div>
                        <ExampleChart />
                    </S.StyledSectionsLeft>
                    <hr style={{ width: "50%" }} />
                    <S.StyledSectionsRight>
                        <div>
                            <SU.StyledFontH2>Para Quem é o EvolveMe?</SU.StyledFontH2>
                            <p>
                                Ideal para quem busca equilíbrio interior, produtividade e uma vida com propósito. Perfeito para todos os perfis que valorizam
                                evolução contínua.
                            </p>
                        </div>
                    </S.StyledSectionsRight>
                </S.StyledContent>
            </main>

            <Footer />
        </>
    );
};
