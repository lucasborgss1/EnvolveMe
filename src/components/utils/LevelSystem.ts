interface LevelInfo {
    level: number;
    name: string;
    xpNeeded: number;
    xpCurrent: number;
    progress: number;
}

export const levelSystem = [
    { level: 1, name: "Iniciante", xpNeeded: 0, description: "Começando sua jornada de evolução" },
    { level: 2, name: "Aprendiz", xpNeeded: 150, description: "Aprendendo os fundamentos do desenvolvimento pessoal" },
    { level: 3, name: "Novato", xpNeeded: 400, description: "Estabelecendo bases sólidas para o crescimento" },
    { level: 4, name: "Intermediário", xpNeeded: 800, description: "Equilibrando corpo, mente e espírito" },
    { level: 5, name: "Avançado", xpNeeded: 1500, description: "Dominando técnicas avançadas de autodesenvolvimento" },
    { level: 6, name: "Especialista", xpNeeded: 2500, description: "Aprofundando conhecimentos em todas as áreas" },
    { level: 7, name: "Profissional", xpNeeded: 4000, description: "Alcançando excelência em suas práticas" },
    { level: 8, name: "Expert", xpNeeded: 6000, description: "Referência em desenvolvimento pessoal" },
    { level: 9, name: "Lendário", xpNeeded: 8500, description: "Inspirando outros com sua jornada" },
    { level: 10, name: "Mestre", xpNeeded: 12000, description: "Atingiu o mais alto nível de maestria" },
];

export function getLevelInfo(xp: number): LevelInfo {
    let level = 1;
    let name = "Iniciante";
    let xpNeeded = levelSystem[1].xpNeeded;
    let previousXP = 0;

    // Encontra o nível atual do usuário
    for (let i = 0; i < levelSystem.length - 1; i++) {
        const currentLevel = levelSystem[i];
        const nextLevel = levelSystem[i + 1];

        if (xp >= currentLevel.xpNeeded && xp < nextLevel.xpNeeded) {
            level = currentLevel.level;
            name = currentLevel.name;
            xpNeeded = nextLevel.xpNeeded;
            previousXP = currentLevel.xpNeeded;
            break;
        }
    }    // Verifica se está no último nível
    if (xp >= levelSystem[levelSystem.length - 1].xpNeeded) {
        const lastLevel = levelSystem[levelSystem.length - 1];
        level = lastLevel.level;
        name = lastLevel.name;
        xpNeeded = lastLevel.xpNeeded;
        previousXP = levelSystem[levelSystem.length - 2].xpNeeded;
    }

    const isMaxLevel = level === 10;
    const progress = isMaxLevel
        ? Math.min(100, ((xp - previousXP) / (xpNeeded - previousXP)) * 100)
        : ((xp - previousXP) / (xpNeeded - previousXP)) * 100;    return {
        level,
        name,
        xpNeeded: level === 10 ? xp : xpNeeded,
        xpCurrent: xp,
        progress: Math.min(Math.max(progress, 0), 100),
    };
}
