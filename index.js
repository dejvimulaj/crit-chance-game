const playerData = {
    damage: 50,
    critMultiplier: 2,
    critStack: 0,
};

const enemyData = {
    health: 3000,
    totalDamageTaken: 0,
};

const getCritChancePRD = (baseCritChance, critStack) => {
    if (baseCritChance === 0) return 0; 

    let stackFactor = 0.001 * (Math.log1p(critStack) / Math.log(1.3));

    return 1 - Math.pow(1 - baseCritChance, 1 + stackFactor);
};

const runTest = (baseCritChance, numAttacks) => {
    playerData.critStack = 0;
    let totalAttacks = 0;
    let critCount = 0;
    let totalDamage = 0;

    for (let i = 0; i < 100; i++) {
        totalAttacks++;
        let adjustedCritChance = getCritChancePRD(baseCritChance, playerData.critStack);
        let isCrit = Math.random() < adjustedCritChance;
        let damageDealt = playerData.damage;

        if (isCrit) {
            damageDealt *= playerData.critMultiplier;
            playerData.critStack = 0;
            critCount++;
        } else {
            playerData.critStack++;
        }

        totalDamage += damageDealt;
    }

    let actualCritRate = (critCount / totalAttacks) * 100;

    console.log(`Base Crit Chance: ${(baseCritChance * 100).toFixed(2)}%`);
    console.log(`Actual Crit Rate: ${actualCritRate.toFixed(2)}%`);
    console.log(`Total Attacks: ${totalAttacks}`);
    console.log(`Total Crits: ${critCount}`);
    console.log(`Total Damage Dealt: ${totalDamage}`);
    console.log("------------------------------------------------");
};


const runMultipleTests = () => {
    const testCases = [
        0.01, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 
        0.35, 0.40, 0.45, 0.50, 0.55, 0.60, 0.65, 
        0.70, 0.75, 0.80, 0.85, 0.90, 0.95
    ];

    const numAttacks = 100000;

    console.log("Running Adjusted Crit Rate Tests...");
    testCases.forEach((base) => runTest(base, numAttacks));
};

const attackButton = document.getElementById("attackBtn");
attackButton.addEventListener("click", runMultipleTests);
