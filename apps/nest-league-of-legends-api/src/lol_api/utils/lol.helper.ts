import { LolServer } from './enums/server';
import { GenHelper } from '../../shared/general.helpers';
import { Regions } from './enums/region';

export class LolHelper {
    private static RiotUrls = {
        [LolServer.NORTH_AMERICA]: `https://na1.${GenHelper.LOL_URL}`,
        [LolServer.BRAZIL]: `https://br1.${GenHelper.LOL_URL}`,
        [LolServer.OCEANIA]: `https://oc1.${GenHelper.LOL_URL}`,
        [LolServer.RUSSIA]: `https://ru.${GenHelper.LOL_URL}`,
        [LolServer.TURKEY]: `https://tr1.${GenHelper.LOL_URL}`,
        [LolServer.JAPAN]: `https://jp1.${GenHelper.LOL_URL}`,
        [LolServer.LATIN_AMERICA_NORTH]: `https://la1.${GenHelper.LOL_URL}`,
        [LolServer.LATIN_AMERICA_SOUTH]: `https://la2.${GenHelper.LOL_URL}`,
        [LolServer.EU_NORDIC_WEST]: `https://euw1.${GenHelper.LOL_URL}`,
        [LolServer.EU_NORDIC_EAST]: `https://eun1.${GenHelper.LOL_URL}`,
        [LolServer.REPUBLIC_OF_KOREA]: `https://kr.${GenHelper.LOL_URL}`,
    };
    private static RiotRegionalUrls = {
        [Regions.AMERICA]: `https://americas.${GenHelper.LOL_URL}`,
        [Regions.ASIA]: `https://asia.${GenHelper.LOL_URL}`,
        [Regions.EUROPE]: `https://europe.${GenHelper.LOL_URL}`,
    };

    public static winRationCalculator(wins: number, losses: number) {
        return Math.round((wins / (wins + losses)) * 100);
    }

    public static lolRankToLeagueNumberConverter(rank: string) {
        switch (rank) {
            case 'I':
                return 1;
            case 'II':
                return 2;
            case 'III':
                return 3;
            case 'IV':
                return 4;
            case 'V':
                return 5;
            default:
                return 0;
        }
    }

    public static urlGetter(server: LolServer): string | null {
        if (server in this.RiotUrls) {
            return this.RiotUrls[server];
        }

        return null;
    }

    public static urlGetterRegional(server: LolServer): string | null {
        if (server in this.RiotUrls) {
            switch (server) {
                case LolServer.NORTH_AMERICA:
                    return this.RiotRegionalUrls[Regions.AMERICA];
                case LolServer.BRAZIL:
                    return this.RiotRegionalUrls[Regions.AMERICA];
                case LolServer.OCEANIA:
                    return this.RiotRegionalUrls[Regions.AMERICA];
                case LolServer.RUSSIA:
                    return this.RiotRegionalUrls[Regions.EUROPE];
                case LolServer.TURKEY:
                    return this.RiotRegionalUrls[Regions.EUROPE];
                case LolServer.JAPAN:
                    return this.RiotRegionalUrls[Regions.ASIA];
                case LolServer.LATIN_AMERICA_NORTH:
                    return this.RiotRegionalUrls[Regions.AMERICA];
                case LolServer.LATIN_AMERICA_SOUTH:
                    return this.RiotRegionalUrls[Regions.AMERICA];
                case LolServer.EU_NORDIC_WEST:
                    return this.RiotRegionalUrls[Regions.EUROPE];
                case LolServer.EU_NORDIC_EAST:
                    return this.RiotRegionalUrls[Regions.EUROPE];
                case LolServer.REPUBLIC_OF_KOREA:
                    return this.RiotRegionalUrls[Regions.ASIA];
                default:
                    return null;
            }
        }

        return null;
    }
}
