interface LevelInfo {
    level: number;
    name: string;
    xpNeeded: number;
    xpCurrent: number;
    progress: number;
}

const levelSystem = [
    { level: 1, name: "Iniciante", xpNeeded: 0, description: "Começando sua jornada de evolução" },
    { level: 2, name: "Aprendiz", xpNeeded: 200, description: "Aprendendo os fundamentos do desenvolvimento pessoal" },
    { level: 3, name: "Novato", xpNeeded: 500, description: "Estabelecendo bases sólidas para o crescimento" },
    { level: 4, name: "Intermediário", xpNeeded: 1000, description: "Equilibrando corpo, mente e espírito" },
    { level: 5, name: "Avançado", xpNeeded: 2000, description: "Dominando técnicas avançadas de autodesenvolvimento" },
    { level: 6, name: "Especialista", xpNeeded: 4000, description: "Aprofundando conhecimentos em todas as áreas" },
    { level: 7, name: "Profissional", xpNeeded: 8000, description: "Alcançando excelência em suas práticas" },
    { level: 8, name: "Expert", xpNeeded: 16000, description: "Referência em desenvolvimento pessoal" },
    { level: 9, name: "Lendário", xpNeeded: 32000, description: "Inspirando outros com sua jornada" },
    { level: 10, name: "Mestre", xpNeeded: 64000, description: "Atingiu o mais alto nível de maestria" }
];

export function getLevelInfo(xp: number): LevelInfo {
    let level = 1;
    let name = "Iniciante";
    let xpNeeded = 200; // XP para o próximo nível
    let previousXP = 0;

    for (const levelData of levelSystem) {
        if (xp >= levelData.xpNeeded) {
            level = levelData.level;
            name = levelData.name;
            xpNeeded = levelSystem[level]?.xpNeeded || levelData.xpNeeded;
            previousXP = levelData.xpNeeded;
        } else {
            break;
        }
    }

    // Se ultrapassou o último nível
    if (level >= levelSystem.length) {
        level = levelSystem.length;
        name = levelSystem[level - 1].name;
        xpNeeded = levelSystem[level - 1].xpNeeded;
    }

    const progress = ((xp - previousXP) / (xpNeeded - previousXP)) * 100;

    return {
        level,
        name,
        xpNeeded,
        xpCurrent: xp,
        progress: Math.min(Math.max(progress, 0), 100)
    };
}
