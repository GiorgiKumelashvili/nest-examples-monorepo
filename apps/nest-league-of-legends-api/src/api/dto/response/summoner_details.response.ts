import { LolLeague } from '../../../lol_api/utils/enums/league';

export class SummonerDetailsResponse {
  name: string;
  profileIconId: number;
  league: LolLeague;
  leagueNumber: number;
  leaguePoints: number;
  summonerLevel: number;
  winRatio: number;
  win: number;
  lose: number;
}
