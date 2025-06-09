import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area
} from 'recharts';
import type { RelatorioSemanal as RelatorioType } from '../../types/Desafio';
import * as S from './styles';

interface RelatorioSemanalProps {
    relatorio: RelatorioType;
}

export const RelatorioSemanal: React.FC<RelatorioSemanalProps> = ({ relatorio }) => {
    // Prepara dados para o gráfico de barras
    const dadosPorArea = Object.entries(relatorio.porArea).map(([area, info]) => ({
        area,
        concluidos: info.concluidos,
        total: info.total
    }));

    // Prepara dados para o gráfico de linha (streak)
    const dadosStreak = Object.entries(relatorio.streakAtual)
        .sort(([dataA], [dataB]) => new Date(dataA).getTime() - new Date(dataB).getTime())
        .map(([data, quantidade]) => ({
            data: data.split('-').reverse().slice(0, 2).join('/'),
            quantidade
        }));

    // Prepara dados para o gráfico de área (evolução mensal)
    const dadosEvolucao = relatorio.evolucaoMensal.map(mes => ({
        mes: mes.mes,
        concluidos: mes.concluidos,
        total: mes.total
    }));

    return (
        <S.Section>
            <h2>Relatório Semanal</h2>
            <p>Período: últimos 7 dias</p>

            <S.StatsGrid>
                <S.StatCard>
                    <h3>Total de Desafios</h3>
                    <p>{relatorio.totalDesafiosSemana}</p>
                </S.StatCard>
                <S.StatCard>
                    <h3>Desafios Concluídos</h3>
                    <p>{relatorio.concluidos}</p>
                </S.StatCard>
                <S.StatCard>
                    <h3>Taxa de Conclusão</h3>
                    <p>{((relatorio.concluidos / relatorio.total) * 100).toFixed(1)}%</p>
                </S.StatCard>
                <S.StatCard>
                    <h3>Dias Ativos</h3>
                    <p>{relatorio.diasAtivos}</p>
                </S.StatCard>
            </S.StatsGrid>

            <S.ChartsGrid>
                <S.ChartContainer>
                    <h3>Progresso por Área</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dadosPorArea}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="area" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="concluidos" name="Concluídos" fill="#4caf50" />
                            <Bar dataKey="total" name="Total" fill="#2196f3" />
                        </BarChart>
                    </ResponsiveContainer>
                </S.ChartContainer>

                <S.ChartContainer>
                    <h3>Streak Diário</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dadosStreak}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="data" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="quantidade"
                                name="Desafios Concluídos"
                                stroke="#ff9800"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </S.ChartContainer>

                <S.ChartContainer>
                    <h3>Evolução Mensal</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={dadosEvolucao}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="mes" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="concluidos"
                                name="Desafios Concluídos"
                                stroke="#8884d8"
                                fill="#8884d8"
                                fillOpacity={0.3}
                            />
                            <Area
                                type="monotone"
                                dataKey="total"
                                name="Total de Desafios"
                                stroke="#82ca9d"
                                fill="#82ca9d"
                                fillOpacity={0.3}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </S.ChartContainer>
            </S.ChartsGrid>
        </S.Section>
    );
}; 