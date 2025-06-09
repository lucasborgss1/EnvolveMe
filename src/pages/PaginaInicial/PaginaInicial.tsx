import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { getLevelInfo } from "../../components/utils/LevelSystem";
import { levelSystem } from "../../components/utils/LevelSystem";
import { StyledBackground } from "../../components/Background/styles";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import * as S from "./styles";
import { CheckBoxInput } from "../../components/CheckBox/ExempleCheckBox";
import { StyledInput } from "../../components/utils/utils";
import type { Desafio, DesafioTemplate } from "../../types/Desafio";
import { getDesafiosSugeridos, gerarRelatorioSemanal } from "../../components/utils/DesafioSystem";
import { PomodoroTimer } from "../../components/Pomodoro/PomodoroTimer";
import { RelatorioSemanal } from "../../components/Relatorio/RelatorioSemanal";
import { Button } from "../../components/Button/Button";
import { checkDailyChallengeLimit, checkAllAreasLimit, DAILY_CHALLENGE_LIMIT } from "../../components/utils/DesafioLimits";

interface FormData {
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
    xp: number;
    nivel: number;
}

type TabType = "inicio" | "desafios" | "relatorio";

export default function PaginaInicial() {
    const [activeTab, setActiveTab] = useState<TabType>("inicio");
    const [showLevelModal, setShowLevelModal] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        nome: "",
        email: "",
        senha: "",
        desejos: [],
        frases: [],
        areas: [],
        tempo: [],
        motivacao: [],
        fisicoHabito: [],
        mentalHabito: [],
        espiritualHabito: [],
        xp: 0,
        nivel: 1,
    });
    const [desafios, setDesafios] = useState<Desafio[]>([]);
    const [email, setEmail] = useState<string>("");
    const [mensagem, setMensagem] = useState("");
    const [novoDesafioModalAberto, setNovoDesafioModalAberto] = useState(false);
    const [novoDesafio, setNovoDesafio] = useState<{
        titulo: string;
        area: "fisico" | "mental" | "espiritual";
        descricao: string;
        duracao: number;
    }>({
        titulo: "",
        area: "fisico",
        descricao: "",
        duracao: 15,
    });
    const [desafiosSugeridos, setDesafiosSugeridos] = useState<DesafioTemplate[]>([]);
    const [feedback, setFeedback] = useState({
        pontosPositivos: "",
        pontosMelhoria: "",
        sugestoes: "",
    });

    const currentXp = formData?.xp || 0;
    const levelInfo = getLevelInfo(currentXp);

    const areaColors: Record<string, string> = {
        fisico: "#4caf50",
        mental: "#ff9800",
        espiritual: "#ed88ff",
    };

    useEffect(() => {
        const emailAtual = localStorage.getItem("usuario_atual");
        if (!emailAtual) {
            console.warn("Nenhum usuário logado encontrado.");
            return;
        }
        setEmail(emailAtual);

        const desafiosSalvos = localStorage.getItem(`${emailAtual}_desafios`);
        const formDataSalvo = localStorage.getItem(`${emailAtual}_formData`);

        if (formDataSalvo) setFormData(JSON.parse(formDataSalvo));

        if (desafiosSalvos) {
            try {
                const parsedDesafios = JSON.parse(desafiosSalvos);
                if (Array.isArray(parsedDesafios)) {
                    setDesafios(parsedDesafios);
                } else {
                    console.error("Desafios salvos não são um array:", parsedDesafios);
                    setDesafios([]);
                }
            } catch (e) {
                console.error("Erro ao parsear desafios:", e);
                setDesafios([]);
            }
        }
    }, []);

    useEffect(() => {
        if (desafios && formData) {
            // Calcula a taxa de conclusão dos últimos 7 dias            // Obtém novos desafios sugeridos se não houver nenhum
            if (desafiosSugeridos.length === 0) {
                const sugestoes = getDesafiosSugeridos();
                if (sugestoes !== null) {
                    setDesafiosSugeridos(sugestoes);
                } else {
                    setDesafiosSugeridos([]);
                }
            }
        }
    }, [formData, desafios, desafiosSugeridos.length]);

    const [historicoArea, setHistoricoArea] = useState<string | null>(null);

    const handleToggleConcluido = (desafio: Desafio) => {
        if (!desafios || !email) return;

        const index = desafios.findIndex((d) => d.titulo === desafio.titulo && d.area === desafio.area && d.data === desafio.data);

        if (index === -1) return;

        const novosDesafios = [...desafios];
        const estavaConcluido = novosDesafios[index].concluido;

        novosDesafios[index] = {
            ...novosDesafios[index],
            concluido: !estavaConcluido,
        };

        setDesafios(novosDesafios);
        localStorage.setItem(`${email}_desafios`, JSON.stringify(novosDesafios)); // Atualiza XP apenas quando conclui o desafio (não remove XP ao desmarcar)
        if (!estavaConcluido) {
            const formDataAtual = JSON.parse(localStorage.getItem(`${email}_formData`) || "{}");
            let xpGanho = 15; // XP fixo por completar um desafio

            // Verifica quantidade de desafios completos hoje para bônus
            const hoje = new Date().toISOString().split("T")[0];
            const desafiosCompletosHoje = novosDesafios.filter((d) => d.concluido && d.data === hoje).length;

            // Bônus por quantidade de desafios completos
            if (desafiosCompletosHoje === 6) {
                xpGanho += 15; // Bônus por 6 desafios
                setMensagem(`Parabéns! Você completou 6 desafios hoje e ganhou +15 XP de bônus!`);
                setTimeout(() => {
                    setMensagem(`Você ganhou ${xpGanho} XP! (15 do desafio + 15 do bônus)`);
                    setTimeout(() => setMensagem(""), 3000);
                }, 3000);
            } else if (desafiosCompletosHoje === 9) {
                xpGanho += 25; // Bônus por 9 desafios
                setMensagem(`Parabéns! Você completou 9 desafios hoje e ganhou +25 XP de bônus!`);
                setTimeout(() => {
                    setMensagem(`Você ganhou ${xpGanho} XP! (15 do desafio + 25 do bônus)`);
                    setTimeout(() => setMensagem(""), 3000);
                }, 3000);
            } else {
                setMensagem(`Parabéns! Você ganhou ${xpGanho} XP!`);
                setTimeout(() => setMensagem(""), 3000);
            }

            const novoXP = (formDataAtual.xp || 0) + xpGanho;
            const novoFormData = { ...formDataAtual, xp: novoXP };
            localStorage.setItem(`${email}_formData`, JSON.stringify(novoFormData));
            setFormData(novoFormData);
            window.dispatchEvent(new Event("usuarioAtualizado"));
        }
    };

    const handleEnviarFeedback = () => {
        setMensagem("Feedback enviado com sucesso! Obrigado por contribuir!");
        setTimeout(() => setMensagem(""), 3000);

        // Limpa o formulário
        setFeedback({
            pontosPositivos: "",
            pontosMelhoria: "",
            sugestoes: "",
        });
    };

    const handleAdicionarDesafio = (desafio: DesafioTemplate) => {
        if (!desafios || !email) return;

        if (!checkDailyChallengeLimit(desafios, desafio.area)) {
            setMensagem(`Limite de ${DAILY_CHALLENGE_LIMIT} desafios por área por dia atingido!`);
            setTimeout(() => setMensagem(""), 3000);
            return;
        }

        const novoDesafio: Desafio = {
            titulo: desafio.titulo,
            area: desafio.area,
            data: new Date().toISOString().split("T")[0],
            concluido: false,
            duracao: desafio.duracao,
            descricao: desafio.descricao,
            xp: desafio.xp,
        };

        const novosDesafios = [...desafios, novoDesafio];
        setDesafios(novosDesafios);
        localStorage.setItem(`${email}_desafios`, JSON.stringify(novosDesafios));

        // Atualiza XP por adicionar novo desafio
        const formDataAtual = JSON.parse(localStorage.getItem(`${email}_formData`) || "{}");
        const novoXP = (formDataAtual.xp || 0) + 5;
        const novoFormData = { ...formDataAtual, xp: novoXP };
        localStorage.setItem(`${email}_formData`, JSON.stringify(novoFormData));
        setFormData(novoFormData);
        window.dispatchEvent(new Event("usuarioAtualizado"));

        setMensagem("Desafio adicionado com sucesso!");
        setTimeout(() => setMensagem(""), 3000);

        // Verifica se todos os desafios sugeridos foram adicionados
        const hoje = new Date().toISOString().split("T")[0];
        const todosAdicionados = desafiosSugeridos.every((d) => novosDesafios.some((nd) => nd.titulo === d.titulo && nd.data === hoje));

        console.log("Todos os desafios sugeridos foram adicionados?", todosAdicionados);
        console.log("Desafios sugeridos:", desafiosSugeridos);
        console.log("Desafios salvos:", novosDesafios);

        // Se todos foram adicionados, tenta gerar novas sugestões
        if (todosAdicionados) {
            const novasSugestoes = getDesafiosSugeridos();
            console.log("Novas sugestões:", novasSugestoes);
            if (novasSugestoes !== null) {
                setDesafiosSugeridos(novasSugestoes);
                setMensagem("Novos desafios sugeridos disponíveis!");
            } else {
                setDesafiosSugeridos([]);
            }
            setTimeout(() => setMensagem(""), 3000);
        }
    };

    const renderLevelModal = () => {
        if (!showLevelModal) return null;

        const currentLevel = levelInfo.level;
        const currentXP = formData.xp;

        return (
            <S.LevelModal onClick={() => setShowLevelModal(false)}>
                <S.LevelContent onClick={(e) => e.stopPropagation()}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "2rem",
                            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                            paddingBottom: "1rem",
                        }}
                    >
                        <h3>Sua Progressão de Níveis</h3>
                        <Button variant="secondary" size="small" onClick={() => setShowLevelModal(false)}>
                            Fechar
                        </Button>
                    </div>

                    <div>
                        {levelSystem.map((level, index) => {
                            const nextLevel = levelSystem[index + 1];
                            const isActive = level.level === currentLevel;
                            const xpForThisLevel = level.xpNeeded;
                            const xpForNextLevel = nextLevel ? nextLevel.xpNeeded : level.xpNeeded;
                            const isCompleted = currentXP >= xpForNextLevel || (level.level === 10 && currentXP >= level.xpNeeded);
                            const xpProgress = isCompleted
                                ? 100
                                : isActive
                                ? ((currentXP - xpForThisLevel) / (xpForNextLevel - xpForThisLevel)) * 100
                                : currentXP >= xpForThisLevel
                                ? 100
                                : 0;

                            return (
                                <S.LevelCard key={level.level} isActive={isActive} isCompleted={isCompleted}>
                                    <div style={{ paddingLeft: "1rem" }}>
                                        <h5>
                                            Nível {level.level} - {level.name}
                                        </h5>
                                        <p>{level.description}</p>
                                        <div style={{ marginTop: "1rem" }}>
                                            <S.ProgressBar progress={xpProgress} color={isActive ? "#a78bfa" : isCompleted ? "#10b981" : "#4b5563"} />
                                            <div className="level-info">
                                                {level.level === 10 ? (
                                                    <span style={{ color: isCompleted ? "#10b981" : "inherit" }}>
                                                        {isCompleted ? "✨ " : ""}
                                                        {currentXP} XP totais acumulados
                                                    </span>
                                                ) : isCompleted ? (
                                                    <span style={{ color: "#10b981" }}>✨ Nível Completo!</span>
                                                ) : isActive ? (
                                                    <span>📊 {currentXP} / {xpForNextLevel} XP</span>
                                                ) : (
                                                    <span>🎯 Necessários {xpForNextLevel - xpForThisLevel} XP</span>
                                                )}
                                                {isActive && <span style={{ color: "#a78bfa" }}>Nível Atual</span>}
                                            </div>
                                        </div>
                                    </div>
                                </S.LevelCard>
                            );
                        })}
                    </div>
                </S.LevelContent>
            </S.LevelModal>
        );
    };

    const renderMainContent = () => {
        if (!desafios || !email) return <p>Carregando dados...</p>;

        const hoje = new Date().toISOString().split("T")[0];

        switch (activeTab) {
            case "inicio": {
                const total = desafios.length;
                const concluidos = desafios.filter((d) => d.concluido).length;

                type ProgressoArea = Record<string, { total: number; concluidos: number }>;

                const porArea = desafios.reduce<ProgressoArea>((acc, d) => {
                    acc[d.area] = acc[d.area] || { total: 0, concluidos: 0 };
                    acc[d.area].total += 1;
                    if (d.concluido) acc[d.area].concluidos += 1;
                    return acc;
                }, {});

                const areas = ["fisico", "mental", "espiritual"];

                const formatarData = (data: string) => {
                    const [ano, mes, dia] = data.split("-");
                    return `${dia}/${mes}/${ano}`;
                };

                return (
                    <S.StyledDiv>
                        <S.TituloPagina style={{ alignItems: "flex-start", textAlign: "left" }}>
                            <h3>Sua Jornada</h3>
                            <p style={{ opacity: 0.8, marginBottom: "2rem" }}>{hoje}</p>
                        </S.TituloPagina>

                        <S.XPProgress onClick={() => setShowLevelModal(true)}>
                            <h4>
                                Nível {levelInfo.level} - {levelInfo.name}
                            </h4>
                            <S.ProgressBar progress={levelInfo.progress} color="linear-gradient(45deg, #6d28d9, #7c3aed)" />
                            <p style={{ marginTop: "0.5rem" }}>
                                {levelInfo.xpCurrent} / {levelInfo.xpNeeded} XP
                            </p>
                        </S.XPProgress>

                        <S.StyledDivStats>
                            <h4 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Progresso Geral</h4>
                            <S.ProgressBar progress={(concluidos / total) * 100} color="#10b981" />
                            <p style={{ textAlign: "center", marginTop: "0.5rem" }}>
                                {concluidos} de {total} desafios concluídos
                            </p>
                        </S.StyledDivStats>

                        <div>
                            <h4 style={{ textAlign: "center", margin: "2rem 0 1rem" }}>Áreas de Desenvolvimento</h4>
                            <S.AreasGrid>
                                {areas.map((area) => {
                                    const info = porArea[area] || { total: 0, concluidos: 0 };
                                    return (
                                        <S.AreaCard key={area} onClick={() => setHistoricoArea(area)} style={{ cursor: "pointer" }}>
                                            <h5
                                                style={{
                                                    color: areaColors[area.toLowerCase()] || "#fff",
                                                    textTransform: "capitalize",
                                                    textAlign: "center",
                                                }}
                                            >
                                                {area}
                                            </h5>
                                            <div style={{ textAlign: "center", margin: "1rem 0" }}>
                                                <span style={{ fontSize: "2rem", color: areaColors[area.toLowerCase()] }}>{info.concluidos}</span>
                                                <span style={{ opacity: 0.7 }}> / {info.total}</span>
                                            </div>
                                            <S.ProgressBar
                                                progress={(info.concluidos / (info.total || 1)) * 100}
                                                color={areaColors[area.toLowerCase()] || "#fff"}
                                            />
                                            <p
                                                style={{
                                                    textAlign: "center",
                                                    marginTop: "1rem",
                                                    opacity: 0.8,
                                                }}
                                            >
                                                {((info.concluidos / (info.total || 1)) * 100).toFixed(1)}% concluído
                                            </p>
                                        </S.AreaCard>
                                    );
                                })}
                            </S.AreasGrid>
                        </div>

                        {historicoArea && (
                            <S.HistoricoModal onClick={() => setHistoricoArea(null)}>
                                <S.HistoricoContent onClick={(e) => e.stopPropagation()}>
                                    <h4
                                        style={{
                                            textAlign: "center",
                                            marginBottom: "2rem",
                                            color: areaColors[historicoArea.toLowerCase()],
                                            fontSize: "1.5rem",
                                        }}
                                    >
                                        Histórico de Desafios - {historicoArea}
                                    </h4>

                                    {desafios
                                        .filter((d) => d.area.toLowerCase() === historicoArea.toLowerCase())
                                        .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
                                        .map((desafio, index) => (
                                            <S.HistoricoItem key={index} concluido={desafio.concluido}>
                                                <div>
                                                    <h5 style={{ marginBottom: "0.5rem" }}>{desafio.titulo}</h5>
                                                    <small style={{ opacity: 0.7 }}>{formatarData(desafio.data)}</small>
                                                </div>
                                                <S.HistoricoStatus concluido={desafio.concluido}>
                                                    {desafio.concluido ? "Concluído" : "Pendente"}
                                                </S.HistoricoStatus>
                                            </S.HistoricoItem>
                                        ))}

                                    <div style={{ textAlign: "center", marginTop: "2rem" }}>
                                        <S.StyledButton
                                            onClick={() => setHistoricoArea(null)}
                                            style={{ background: "linear-gradient(45deg, #4b5563, #6b7280)" }}
                                        >
                                            Fechar
                                        </S.StyledButton>
                                    </div>
                                </S.HistoricoContent>
                            </S.HistoricoModal>
                        )}
                    </S.StyledDiv>
                );
            }

            case "desafios": {
                const hoje = new Date().toISOString().split("T")[0];
                const desafiosAtivos = desafios?.filter((d) => !d.concluido) || [];
                const handleCriarDesafio = () => {
                    if (!desafios || !email) return;

                    if (!checkDailyChallengeLimit(desafios, novoDesafio.area)) {
                        setMensagem(`Você já criou ${DAILY_CHALLENGE_LIMIT} desafios nesta área hoje! Tente outra área ou volte amanhã.`);
                        setTimeout(() => setMensagem(""), 5000);
                        setNovoDesafioModalAberto(false);
                        return;
                    }

                    const desafioCriado: Desafio = {
                        ...novoDesafio,
                        data: hoje,
                        concluido: false,
                        xp: 15,
                    };

                    const novosDesafios = [...desafios, desafioCriado];
                    setDesafios(novosDesafios);
                    localStorage.setItem(`${email}_desafios`, JSON.stringify(novosDesafios));

                    // Atualiza XP por criar novo desafio
                    const formDataAtual = JSON.parse(localStorage.getItem(`${email}_formData`) || "{}");
                    const novoXP = (formDataAtual.xp || 0) + 5;
                    const novoFormData = { ...formDataAtual, xp: novoXP };
                    localStorage.setItem(`${email}_formData`, JSON.stringify(novoFormData));
                    setFormData(novoFormData);
                    window.dispatchEvent(new Event("usuarioAtualizado"));

                    setMensagem("Desafio criado com sucesso!");
                    setTimeout(() => setMensagem(""), 3000);
                    setNovoDesafioModalAberto(false);
                    setNovoDesafio({
                        titulo: "",
                        area: "fisico",
                        descricao: "",
                        duracao: 15,
                    });
                };

                return (
                    <S.StyledDiv>
                        {/* Seção de Desafios Ativos */}
                        <S.TituloPagina>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "2rem",
                                }}
                            >
                                <div>
                                    <h3>Desafios Ativos</h3>
                                    <p style={{ opacity: 0.8 }}>Seus desafios em andamento</p>
                                </div>{" "}
                                <Button
                                    variant="primary"
                                    onClick={() => setNovoDesafioModalAberto(true)}
                                    disabled={checkAllAreasLimit(desafios)}
                                    title={checkAllAreasLimit(desafios) ? "Você já alcançou o limite de 3 desafios em cada área hoje" : "Criar novo desafio"}
                                >
                                    <span>+</span> Novo Desafio
                                </Button>
                            </div>
                        </S.TituloPagina>

                        <S.AreasGrid>
                            {["fisico", "mental", "espiritual"].map((area) => (
                                <S.AreaCard key={area}>
                                    <h4
                                        style={{
                                            color: areaColors[area],
                                            marginBottom: "1.5rem",
                                            textAlign: "center",
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {area}
                                    </h4>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                        {desafiosAtivos
                                            .filter((d) => d.area.toLowerCase() === area)
                                            .map((desafio, idx) => (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        background: "rgba(255, 255, 255, 0.05)",
                                                        padding: "1rem",
                                                        borderRadius: "8px",
                                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                                    }}
                                                >
                                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                                        <CheckBoxInput
                                                            checked={desafio.concluido}
                                                            onChange={() => handleToggleConcluido(desafio)}
                                                            description={desafio.titulo}
                                                            task={true}
                                                            color={areaColors[area]}
                                                            backgroundColor="rgba(255, 255, 255, 0.02)"
                                                        />
                                                    </div>
                                                    {desafio.descricao && (
                                                        <p
                                                            style={{
                                                                marginTop: "0.5rem",
                                                                opacity: 0.7,
                                                                fontSize: "0.9rem",
                                                                paddingLeft: "2rem",
                                                            }}
                                                        >
                                                            {desafio.descricao}
                                                        </p>
                                                    )}
                                                    {(desafio.duracao || desafio.xp) && (
                                                        <div
                                                            style={{
                                                                marginTop: "0.5rem",
                                                                opacity: 0.6,
                                                                fontSize: "0.8rem",
                                                                paddingLeft: "2rem",
                                                                display: "flex",
                                                                gap: "1rem",
                                                            }}
                                                        >
                                                            {desafio.duracao && <span>{desafio.duracao} min</span>}
                                                            {desafio.xp && <span>{desafio.xp} XP</span>}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        {desafiosAtivos.filter((d) => d.area.toLowerCase() === area).length === 0 && (
                                            <p style={{ textAlign: "center", opacity: 0.7 }}>Nenhum desafio ativo nesta área</p>
                                        )}
                                    </div>
                                </S.AreaCard>
                            ))}
                        </S.AreasGrid>

                        {/* Seção do Pomodoro Timer */}
                        <S.TituloPagina style={{ marginTop: "3rem" }}>
                            <h3>Timer Pomodoro</h3>
                            <p style={{ opacity: 0.8, marginBottom: "2rem" }}>Use o timer para manter o foco nos seus desafios</p>
                        </S.TituloPagina>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginBottom: "3rem",
                                background: "rgba(255, 255, 255, 0.05)",
                                backdropFilter: "blur(10px)",
                                borderRadius: "16px",
                                padding: "2rem",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                            }}
                        >
                            <PomodoroTimer />
                        </div>

                        {/* Seção de Desafios Sugeridos */}
                        <S.TituloPagina>
                            <div>
                                <h3>Desafios Sugeridos</h3>
                                <p style={{ opacity: 0.8, marginBottom: "2rem" }}>Baseado no seu perfil e progresso</p>
                            </div>
                        </S.TituloPagina>

                        {desafiosSugeridos.length > 0 ? (
                            <S.AreasGrid>
                                {["fisico", "mental", "espiritual"].map((area) => (
                                    <S.AreaCard key={area}>
                                        <h4
                                            style={{
                                                color: areaColors[area],
                                                textTransform: "capitalize",
                                                marginBottom: "1rem",
                                                textAlign: "center",
                                            }}
                                        >
                                            {area}
                                        </h4>

                                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                            {desafiosSugeridos
                                                .filter((d) => d.area.toLowerCase() === area)
                                                .map((desafio, index) => (
                                                    <div
                                                        key={`${desafio.titulo}-${index}`}
                                                        data-desafio-id={desafio.titulo}
                                                        style={{
                                                            background: "rgba(255, 255, 255, 0.05)",
                                                            padding: "1rem",
                                                            borderRadius: "8px",
                                                            border: "1px solid rgba(255, 255, 255, 0.1)",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                alignItems: "flex-start",
                                                                gap: "1rem",
                                                            }}
                                                        >
                                                            <div>
                                                                <h5 style={{ marginBottom: "0.5rem" }}>{desafio.titulo}</h5>
                                                                <p
                                                                    style={{
                                                                        opacity: 0.7,
                                                                        fontSize: "0.9rem",
                                                                        marginBottom: "0.5rem",
                                                                    }}
                                                                >
                                                                    {desafio.descricao}
                                                                </p>
                                                                <div
                                                                    style={{
                                                                        display: "flex",
                                                                        gap: "1rem",
                                                                        opacity: 0.6,
                                                                        fontSize: "0.8rem",
                                                                    }}
                                                                >
                                                                    {desafio.duracao && <span>{desafio.duracao} min</span>}
                                                                    {desafio.xp && <span>{desafio.xp} XP</span>}
                                                                </div>
                                                            </div>
                                                            <Button
                                                                variant="success"
                                                                size="small"
                                                                onClick={() => handleAdicionarDesafio(desafio)}
                                                                disabled={desafios.some(
                                                                    (d) => d.titulo === desafio.titulo && d.data === new Date().toISOString().split("T")[0]
                                                                )}
                                                            >
                                                                {desafios.some(
                                                                    (d) => d.titulo === desafio.titulo && d.data === new Date().toISOString().split("T")[0]
                                                                )
                                                                    ? "Adicionado"
                                                                    : "Adicionar"}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            {desafiosSugeridos.filter((d) => d.area.toLowerCase() === area).length === 0 && (
                                                <p style={{ textAlign: "center", opacity: 0.7 }}>Nenhum desafio sugerido nesta área</p>
                                            )}
                                        </div>
                                    </S.AreaCard>
                                ))}
                            </S.AreasGrid>
                        ) : (
                            <div
                                style={{
                                    background: "rgba(255, 255, 255, 0.05)",
                                    padding: "2rem",
                                    borderRadius: "16px",
                                    textAlign: "center",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    marginBottom: "2rem",
                                }}
                            >
                                <h4 style={{ marginBottom: "1rem", color: "#a78bfa" }}>Parabéns! Você já completou todas as recomendações do dia! 🎉</h4>
                                <p style={{ opacity: 0.8 }}>
                                    Que tal criar seus próprios desafios personalizados?
                                    <br />
                                    Continue sua jornada de evolução criando desafios que se adequem às suas necessidades!
                                </p>{" "}
                                <Button
                                    variant="primary"
                                    size="medium"
                                    onClick={() => setNovoDesafioModalAberto(true)}
                                    style={{ marginTop: "1.5rem" }}
                                    disabled={checkAllAreasLimit(desafios)}
                                    title={checkAllAreasLimit(desafios) ? "Limite diário de desafios atingido em todas as áreas" : "Criar novo desafio"}
                                >
                                    Criar Novo Desafio
                                </Button>
                            </div>
                        )}

                        {mensagem && (
                            <div
                                style={{
                                    position: "fixed",
                                    bottom: "2rem",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    background: "rgba(16, 185, 129, 0.2)",
                                    color: "#10b981",
                                    padding: "1rem 2rem",
                                    borderRadius: "8px",
                                    backdropFilter: "blur(10px)",
                                }}
                            >
                                {mensagem}
                            </div>
                        )}

                        {/* Modal de Novo Desafio */}
                        {novoDesafioModalAberto && (
                            <div
                                style={{
                                    position: "fixed",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: "rgba(0, 0, 0, 0.8)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "flex-start",
                                    paddingTop: "5vh",
                                    zIndex: 1000,
                                }}
                            >
                                <div
                                    style={{
                                        background: "rgba(255, 255, 255, 0.1)",
                                        backdropFilter: "blur(10px)",
                                        padding: "2rem",
                                        borderRadius: "16px",
                                        width: "90%",
                                        maxWidth: "500px",
                                        border: "1px solid rgba(255, 255, 255, 0.2)",
                                        maxHeight: "90vh",
                                        overflowY: "auto",
                                        scrollbarWidth: "thin",
                                        scrollbarColor: "rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1)",
                                    }}
                                >
                                    <h4 style={{ marginBottom: "1.5rem", textAlign: "center" }}>Criar Novo Desafio</h4>

                                    <div style={{ marginBottom: "1rem" }}>
                                        <label style={{ display: "block", marginBottom: "0.5rem" }}>Título:</label>
                                        <StyledInput
                                            type="text"
                                            value={novoDesafio.titulo}
                                            onChange={(e) => setNovoDesafio((prev) => ({ ...prev, titulo: e.target.value }))}
                                            style={{ width: "100%" }}
                                            placeholder="Digite o título do desafio"
                                        />
                                    </div>

                                    <div style={{ marginBottom: "1rem" }}>
                                        <label style={{ display: "block", marginBottom: "0.5rem" }}>Área:</label>
                                        <select
                                            value={novoDesafio.area}
                                            onChange={(e) =>
                                                setNovoDesafio((prev) => ({
                                                    ...prev,
                                                    area: e.target.value as "fisico" | "mental" | "espiritual",
                                                }))
                                            }
                                            style={{
                                                width: "100%",
                                                padding: "0.8rem",
                                                background: "rgba(255, 255, 255, 0.1)",
                                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                                borderRadius: "8px",
                                                color: "white",
                                                fontSize: "1rem",
                                                cursor: "pointer",
                                                outline: "none",
                                                appearance: "none",
                                                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "right 1rem center",
                                                backgroundSize: "1em",
                                            }}
                                        >
                                            <option
                                                value="fisico"
                                                style={{
                                                    background: "#1a1a1a",
                                                    color: "white",
                                                    padding: "0.8rem",
                                                    fontSize: "1rem",
                                                }}
                                            >
                                                Físico
                                            </option>
                                            <option
                                                value="mental"
                                                style={{
                                                    background: "#1a1a1a",
                                                    color: "white",
                                                    padding: "0.8rem",
                                                    fontSize: "1rem",
                                                }}
                                            >
                                                Mental
                                            </option>
                                            <option
                                                value="espiritual"
                                                style={{
                                                    background: "#1a1a1a",
                                                    color: "white",
                                                    padding: "0.8rem",
                                                    fontSize: "1rem",
                                                }}
                                            >
                                                Espiritual
                                            </option>
                                        </select>
                                    </div>

                                    <div style={{ marginBottom: "1rem" }}>
                                        <label style={{ display: "block", marginBottom: "0.5rem" }}>Descrição:</label>
                                        <textarea
                                            value={novoDesafio.descricao}
                                            onChange={(e) => setNovoDesafio((prev) => ({ ...prev, descricao: e.target.value }))}
                                            style={{
                                                width: "100%",
                                                padding: "0.8rem",
                                                background: "rgba(255, 255, 255, 0.1)",
                                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                                borderRadius: "8px",
                                                color: "white",
                                                minHeight: "100px",
                                                resize: "vertical",
                                                fontSize: "1rem",
                                                outline: "none",
                                            }}
                                            placeholder="Descreva o desafio"
                                        />
                                    </div>

                                    <div style={{ marginBottom: "1rem" }}>
                                        <label style={{ display: "block", marginBottom: "0.5rem" }}>Duração (minutos):</label>
                                        <StyledInput
                                            type="number"
                                            value={novoDesafio.duracao}
                                            onChange={(e) =>
                                                setNovoDesafio((prev) => ({
                                                    ...prev,
                                                    duracao: Math.max(1, parseInt(e.target.value) || 1),
                                                }))
                                            }
                                            style={{
                                                width: "100%",
                                                padding: "0.8rem",
                                                fontSize: "1rem",
                                            }}
                                            min="1"
                                        />
                                    </div>

                                    <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                                        <Button variant="secondary" onClick={() => setNovoDesafioModalAberto(false)}>
                                            Cancelar
                                        </Button>
                                        <Button variant="primary" onClick={handleCriarDesafio} disabled={!novoDesafio.titulo.trim()}>
                                            Criar Desafio
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </S.StyledDiv>
                );
            }

            case "relatorio": {
                if (!desafios || !email) return <p>Carregando dados...</p>;

                const relatorioSemanal = gerarRelatorioSemanal(desafios);

                return (
                    <S.StyledDiv>
                        <S.TituloPagina style={{ alignItems: "flex-start", textAlign: "left" }}>
                            <h3>Relatório de Progresso</h3>
                            <p style={{ opacity: 0.8, marginBottom: "2rem" }}>{hoje}</p>
                        </S.TituloPagina>

                        <RelatorioSemanal relatorio={relatorioSemanal} />

                        <S.StyledDivStats>
                            <h4 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Feedback</h4>
                            <div
                                style={{
                                    background: "rgba(255, 255, 255, 0.05)",
                                    padding: "2rem",
                                    borderRadius: "12px",
                                }}
                            >
                                <div style={{ marginBottom: "1.5rem" }}>
                                    <label htmlFor="pontos-positivos">Pontos Positivos:</label>
                                    <S.StyledTextArea
                                        id="pontos-positivos"
                                        value={feedback.pontosPositivos}
                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFeedback({ ...feedback, pontosPositivos: e.target.value })}
                                        placeholder="O que você mais gostou nos desafios?"
                                    />
                                </div>

                                <div style={{ marginBottom: "1.5rem" }}>
                                    <label htmlFor="pontos-melhoria">Pontos de Melhoria:</label>
                                    <S.StyledTextArea
                                        id="pontos-melhoria"
                                        value={feedback.pontosMelhoria}
                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFeedback({ ...feedback, pontosMelhoria: e.target.value })}
                                        placeholder="O que poderia ser melhor?"
                                    />
                                </div>

                                <div style={{ marginBottom: "1.5rem" }}>
                                    <label htmlFor="sugestoes">Sugestões:</label>
                                    <S.StyledTextArea
                                        id="sugestoes"
                                        value={feedback.sugestoes}
                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFeedback({ ...feedback, sugestoes: e.target.value })}
                                        placeholder="Que outras funcionalidades você gostaria de ver?"
                                    />
                                </div>

                                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
                                    <Button variant="primary" onClick={handleEnviarFeedback} disabled={!Object.values(feedback).some((v) => v.trim())}>
                                        Enviar Feedback
                                    </Button>
                                </div>
                            </div>
                        </S.StyledDivStats>

                        {mensagem && (
                            <div
                                style={{
                                    position: "fixed",
                                    bottom: "2rem",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    background: "rgba(16, 185, 129, 0.2)",
                                    color: "#10b981",
                                    padding: "1rem 2rem",
                                    borderRadius: "8px",
                                    backdropFilter: "blur(10px)",
                                }}
                            >
                                {mensagem}
                            </div>
                        )}
                    </S.StyledDiv>
                );
            }

            default:
                return null;
        }
    };

    const renderAsideContent = () => {
        switch (activeTab) {
            case "inicio":
                return (
                    <div>
                        <h4>Guia da Página</h4>
                        <ul
                            style={{
                                listStyle: "none",
                                marginTop: "0.5rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                            }}
                        >
                            <li>
                                • <strong>Nível e XP:</strong> Clique na barra de progresso para ver todos os níveis
                            </li>
                            <li>
                                • <strong>Progresso Geral:</strong> Mostra o total de desafios completados
                            </li>
                            <li>
                                • <strong>Áreas:</strong> Acompanhe seu progresso em cada categoria
                            </li>
                            <li>
                                • <strong>Histórico:</strong> Acompanhe suas atividades antigas ao clicar em cada área.
                            </li>
                        </ul>

                        <h4 style={{ marginTop: "1.5rem" }}>Dicas para Evolução</h4>
                        <ul
                            style={{
                                listStyle: "none",
                                marginTop: "0.5rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                            }}
                        >
                            <li>• Mantenha uma rotina consistente</li> <li>• Alterne entre áreas diferentes (limite de 3 desafios por área)</li>
                            <li>• Use o timer para manter o foco</li>
                            <li>• Celebre seu progresso diário</li>
                        </ul>

                        <h4 style={{ marginTop: "1.5rem" }}>Próximo Nível</h4>
                        <p>
                            Faltam {levelInfo.xpNeeded - levelInfo.xpCurrent} XP para o nível {levelInfo.level + 1}. Continue completando desafios!
                        </p>
                    </div>
                );

            case "desafios":
                return (
                    <div>
                        <h4>Guia da Página</h4>
                        <ul
                            style={{
                                listStyle: "none",
                                marginTop: "0.5rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                            }}
                        >
                            <li>
                                • <strong>Criar Desafio:</strong> Use o botão "+" no topo
                            </li>
                            <li>
                                • <strong>Filtrar:</strong> Use as abas para ver por área
                            </li>
                            <li>
                                • <strong>Concluir:</strong> Marque o checkbox ao completar
                            </li>
                        </ul>{" "}
                        <h4 style={{ marginTop: "1.5rem" }}>Sistema de XP</h4>
                        <ul
                            style={{
                                listStyle: "none",
                                marginTop: "0.5rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                            }}
                        >
                            {" "}
                            <li>• Cada desafio concluído: 15 XP</li>
                            <li>• Bônus por 6 desafios/dia: +15 XP</li>
                            <li>• Bônus por 9 desafios/dia: +25 XP</li>
                            <li>• Bônus por criar um desafio: +5 XP</li>
                        </ul>
                        <h4 style={{ marginTop: "1.5rem" }}>Timer Pomodoro</h4>
                        <p>Ciclos de 25 minutos de foco, seguidos por 5 minutos de pausa. A cada 4 ciclos, faça uma pausa maior de 15 minutos.</p>
                    </div>
                );

            case "relatorio":
                return (
                    <div>
                        <h4>Guia da Página</h4>
                        <ul
                            style={{
                                listStyle: "none",
                                marginTop: "0.5rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                            }}
                        >
                            <li>
                                • <strong>Gráfico de Áreas:</strong> Compare seu progresso em cada categoria
                            </li>
                            <li>
                                • <strong>Streak Diário:</strong> Acompanhe sua consistência
                            </li>
                            <li>
                                • <strong>Feedback:</strong> Compartilhe sua experiência
                            </li>
                            <li>
                                • <strong>Exportar:</strong> Salve seus dados de progresso
                            </li>
                        </ul>

                        <h4 style={{ marginTop: "1.5rem" }}>Dicas para Análise</h4>
                        <ul
                            style={{
                                listStyle: "none",
                                marginTop: "0.5rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                            }}
                        >
                            <li>• Identifique áreas mais fortes</li>
                            <li>• Equilibre seu desenvolvimento</li>
                            <li>• Mantenha seu streak diário</li>
                            <li>• Ajuste metas se necessário</li>
                        </ul>

                        <h4 style={{ marginTop: "1.5rem" }}>Sua Evolução</h4>
                        <p>Analise seus dados semanalmente para ajustar suas metas e estratégias de desenvolvimento.</p>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <>
            <StyledBackground />
            <Header />
            {renderLevelModal()}
            <S.StyledNav>
                <ul>
                    <li>
                        <button onClick={() => setActiveTab("inicio")} className={activeTab === "inicio" ? "active" : ""}>
                            Jornada
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveTab("desafios")} className={activeTab === "desafios" ? "active" : ""}>
                            Desafios
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveTab("relatorio")} className={activeTab === "relatorio" ? "active" : ""}>
                            Relatório Semanal
                        </button>
                    </li>
                </ul>
            </S.StyledNav>
            <main style={{ display: "flex" }}>
                <S.StyledAside>{renderAsideContent()}</S.StyledAside>
                <S.StyledMainSection>{renderMainContent()}</S.StyledMainSection>
            </main>

            <Footer />
        </>
    );
}
