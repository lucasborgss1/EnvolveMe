import type { Desafio } from "../../types/Desafio";

export const DAILY_CHALLENGE_LIMIT = 3;

export const checkDailyChallengeLimit = (desafios: Desafio[], area: string): boolean => {
    const hoje = new Date().toISOString().split("T")[0];

    const desafiosHoje = desafios.filter((d) => d.data === hoje && d.area.toLowerCase() === area.toLowerCase());

    return desafiosHoje.length < DAILY_CHALLENGE_LIMIT;
};

export const checkAllAreasLimit = (desafios: Desafio[]): boolean => {
    const areas = ["fisico", "mental", "espiritual"];
    return areas.every((area) => !checkDailyChallengeLimit(desafios, area));
};
