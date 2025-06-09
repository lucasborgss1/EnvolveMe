export type Desafio = {
    titulo: string;
    area: 'fisico' | 'mental' | 'espiritual';
    data: string;
    concluido: boolean;
    dificuldade?: 'facil' | 'medio' | 'dificil';
    duracao?: number;
    descricao?: string;
    xp?: number;
    tags?: string[];
};

export type DesafioTemplate = {
    titulo: string;
    area: 'fisico' | 'mental' | 'espiritual';
    dificuldade: 'facil' | 'medio' | 'dificil';
    duracao: number;
    descricao: string;
    xp: number;
    tags: string[];
};

export interface ProgressoArea {
    total: number;
    concluidos: number;
}

export interface RelatorioSemanal {
    total: number;
    concluidos: number;
    porcentagemGeral: number;
    porArea: Record<string, ProgressoArea>;
    porcentagemPorArea: Record<string, number>;
    totalDesafiosSemana: number;
    diasAtivos: number;
    streakAtual: Record<string, number>;
    areasMaisAtivas: string[];
    comparativoMensal: {
        mesAtual: {
            total: number;
            concluidos: number;
            porArea: Record<string, ProgressoArea>;
        };
        mesAnterior: {
            total: number;
            concluidos: number;
            porArea: Record<string, ProgressoArea>;
        };
    };
    evolucaoMensal: Array<{
        mes: string;
        total: number;
        concluidos: number;
    }>;
} 