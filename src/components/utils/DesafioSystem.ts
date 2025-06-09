import type { Desafio, DesafioTemplate } from '../../types/Desafio';

export const desafiosTemplates: DesafioTemplate[] = [
    // Físico
    {
        titulo: "Alongamento Matinal",
        area: "fisico",
        dificuldade: "facil",
        duracao: 10,
        descricao: "Realize uma sequência de alongamentos para começar o dia com energia",
        xp: 10,
        tags: ["manhã", "energia", "flexibilidade"]
    },
    {
        titulo: "Treino HIIT",
        area: "fisico",
        dificuldade: "dificil",
        duracao: 30,
        descricao: "Treino intervalado de alta intensidade para maximizar resultados",
        xp: 30,
        tags: ["força", "resistência", "cardio"]
    },
    {
        titulo: "Caminhada ao Ar Livre",
        area: "fisico",
        dificuldade: "facil",
        duracao: 20,
        descricao: "Faça uma caminhada leve ao ar livre",
        xp: 15,
        tags: ["cardio", "natureza", "bem-estar"]
    },
    {
        titulo: "Yoga Básico",
        area: "fisico",
        dificuldade: "medio",
        duracao: 25,
        descricao: "Pratique posturas básicas de yoga",
        xp: 20,
        tags: ["flexibilidade", "equilíbrio", "força"]
    },
    // Mental
    {
        titulo: "Leitura Profunda",
        area: "mental",
        dificuldade: "medio",
        duracao: 20,
        descricao: "Leia um capítulo de um livro com foco total",
        xp: 20,
        tags: ["concentração", "aprendizado", "foco"]
    },
    {
        titulo: "Resolução de Problemas",
        area: "mental",
        dificuldade: "dificil",
        duracao: 45,
        descricao: "Resolva um problema complexo ou aprenda um novo conceito",
        xp: 25,
        tags: ["lógica", "criatividade", "aprendizado"]
    },
    {
        titulo: "Exercício de Memória",
        area: "mental",
        dificuldade: "facil",
        duracao: 15,
        descricao: "Pratique exercícios de memorização",
        xp: 15,
        tags: ["memória", "concentração", "agilidade mental"]
    },
    {
        titulo: "Aprendizado de Idioma",
        area: "mental",
        dificuldade: "medio",
        duracao: 30,
        descricao: "Estude um novo idioma por 30 minutos",
        xp: 25,
        tags: ["idiomas", "aprendizado", "comunicação"]
    },
    // Espiritual
    {
        titulo: "Meditação Guiada",
        area: "espiritual",
        dificuldade: "facil",
        duracao: 15,
        descricao: "Pratique meditação com foco na respiração",
        xp: 15,
        tags: ["paz", "mindfulness", "respiração"]
    },
    {
        titulo: "Jornal de Gratidão",
        area: "espiritual",
        dificuldade: "medio",
        duracao: 20,
        descricao: "Escreva sobre as coisas pelas quais você é grato hoje",
        xp: 20,
        tags: ["gratidão", "reflexão", "escrita"]
    },
    {
        titulo: "Prática de Mindfulness",
        area: "espiritual",
        dificuldade: "facil",
        duracao: 10,
        descricao: "Pratique atenção plena em uma atividade cotidiana",
        xp: 15,
        tags: ["mindfulness", "presença", "consciência"]
    },
    {
        titulo: "Visualização Positiva",
        area: "espiritual",
        dificuldade: "medio",
        duracao: 15,
        descricao: "Pratique visualização de objetivos e sonhos",
        xp: 20,
        tags: ["visualização", "objetivos", "positividade"]
    }
];

export const getDesafiosSugeridos = (
    nivel: number,
    areasPreferidas: string[],
    ultimosDesafios: Desafio[],
    taxaConclusao: number = 0
): DesafioTemplate[] | null => {
    // Determina a dificuldade com base no nível e taxa de conclusão
    const determinarDificuldade = () => {
        if (nivel < 5) return 'facil';
        if (nivel < 10) {
            return taxaConclusao > 70 ? 'medio' : 'facil';
        }
        return taxaConclusao > 70 ? 'dificil' : 'medio';
    };

    const dificuldadeRecomendada = determinarDificuldade();
    
    // Cria um conjunto de títulos únicos de desafios já realizados
    const titulosUnicos = new Set(desafiosTemplates.map(d => d.titulo));
    const desafiosJaRealizados = new Set(ultimosDesafios.map(d => d.titulo));
    
    // Se todos os desafios já foram realizados, retorna null
    if (desafiosJaRealizados.size >= titulosUnicos.size) {
        console.log('Todos os desafios já foram realizados');
        return null;
    }

    // Filtra desafios baseado em múltiplos critérios
    const desafiosFiltrados = desafiosTemplates.filter(template => {
        // Verifica se o desafio nunca foi feito
        const nuncaRealizado = !desafiosJaRealizados.has(template.titulo);
        
        // Verifica se é da área preferida
        const areaPreferida = areasPreferidas.length === 0 || 
            areasPreferidas.includes(template.area);
        
        // Verifica se a dificuldade é apropriada
        const dificuldadeApropriada = template.dificuldade === dificuldadeRecomendada;
        
        return nuncaRealizado && areaPreferida && dificuldadeApropriada;
    });

    // Se não houver desafios suficientes com a dificuldade recomendada,
    // inclui desafios de outras dificuldades que nunca foram feitos
    if (desafiosFiltrados.length < 3) {
        const desafiosRestantes = desafiosTemplates
            .filter(d => !desafiosJaRealizados.has(d.titulo));
            
        if (desafiosRestantes.length === 0) {
            console.log('Não há mais desafios disponíveis');
            return null;
        }
        
        return desafiosRestantes
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
    }

    // Retorna 3 desafios aleatórios dos filtrados
    return desafiosFiltrados
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
};

export const calcularProgresso = (desafios: Desafio[]) => {
    const total = desafios.length;
    const concluidos = desafios.filter(d => d.concluido).length;
    
    const porArea = desafios.reduce((acc, d) => {
        acc[d.area] = acc[d.area] || { total: 0, concluidos: 0 };
        acc[d.area].total += 1;
        if (d.concluido) acc[d.area].concluidos += 1;
        return acc;
    }, {} as Record<string, { total: number; concluidos: number }>);

    const porcentagemPorArea = Object.entries(porArea).reduce((acc, [area, { total, concluidos }]) => {
        acc[area] = (concluidos / total) * 100;
        return acc;
    }, {} as Record<string, number>);

    return {
        total,
        concluidos,
        porcentagemGeral: (concluidos / total) * 100,
        porArea,
        porcentagemPorArea
    };
};

export const calcularTaxaConclusao = (desafios: Desafio[], dias: number = 7): number => {
    const hoje = new Date();
    const dataLimite = new Date();
    dataLimite.setDate(hoje.getDate() - dias);

    const desafiosRecentes = desafios.filter(d => {
        const dataDesafio = new Date(d.data);
        return dataDesafio >= dataLimite && dataDesafio <= hoje;
    });

    if (desafiosRecentes.length === 0) return 0;

    const concluidos = desafiosRecentes.filter(d => d.concluido).length;
    return (concluidos / desafiosRecentes.length) * 100;
};

export const gerarRelatorioSemanal = (desafios: Desafio[]) => {
    const hoje = new Date();
    const inicioSemana = new Date(hoje);
    inicioSemana.setDate(hoje.getDate() - 7);

    const desafiosSemana = desafios.filter(d => {
        const dataDesafio = new Date(d.data);
        return dataDesafio >= inicioSemana && dataDesafio <= hoje;
    });

    const progresso = calcularProgresso(desafiosSemana);
    
    const streakAtual = desafiosSemana
        .filter(d => d.concluido)
        .reduce((acc, d) => {
            const data = new Date(d.data).toISOString().split('T')[0];
            acc[data] = (acc[data] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

    // Dados mensais
    const inicioMesAtual = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const inicioMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth() - 1, 1);
    const fimMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0);

    const desafiosMesAtual = desafios.filter(d => {
        const dataDesafio = new Date(d.data);
        return dataDesafio >= inicioMesAtual && dataDesafio <= hoje;
    });

    const desafiosMesAnterior = desafios.filter(d => {
        const dataDesafio = new Date(d.data);
        return dataDesafio >= inicioMesAnterior && dataDesafio <= fimMesAnterior;
    });

    const progressoMesAtual = calcularProgresso(desafiosMesAtual);
    const progressoMesAnterior = calcularProgresso(desafiosMesAnterior);

    // Evolução mensal (últimos 6 meses)
    const evolucaoMensal = [];
    for (let i = 5; i >= 0; i--) {
        const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
        const fimMes = new Date(hoje.getFullYear(), hoje.getMonth() - i + 1, 0);
        
        const desafiosMes = desafios.filter(d => {
            const dataDesafio = new Date(d.data);
            return dataDesafio >= inicioMes && dataDesafio <= fimMes;
        });

        const nomeMes = inicioMes.toLocaleDateString('pt-BR', { month: 'short' });
        evolucaoMensal.push({
            mes: nomeMes,
            total: desafiosMes.length,
            concluidos: desafiosMes.filter(d => d.concluido).length
        });
    }

    return {
        ...progresso,
        totalDesafiosSemana: desafiosSemana.length,
        diasAtivos: Object.keys(streakAtual).length,
        streakAtual,
        areasMaisAtivas: Object.entries(progresso.porArea)
            .sort(([, a], [, b]) => b.concluidos - a.concluidos)
            .map(([area]) => area),
        comparativoMensal: {
            mesAtual: {
                total: progressoMesAtual.total,
                concluidos: progressoMesAtual.concluidos,
                porArea: progressoMesAtual.porArea
            },
            mesAnterior: {
                total: progressoMesAnterior.total,
                concluidos: progressoMesAnterior.concluidos,
                porArea: progressoMesAnterior.porArea
            }
        },
        evolucaoMensal
    };
}; 