export class ChampionMasteryResponse {
    championId: number;
    championLevel: number;
    championPoints: number;
    lastPlayTime: number;
    championPointsSinceLastLevel: number;
    championPointsUntilNextLevel: number;
    tokensEarned: number;

    chestGranted: boolean;

    summonerId: string;
}
