/* eslint-disable @typescript-eslint/no-unused-vars */
import { HTTP, GET, Path, Interceptors } from '@yggdrasilts/axiosfit';
import { LolInterceptor } from '../interceptor/lol.interceptor';
import { LatestMatchesResponse } from '../../lol_api/dto/response/latest_matches.response';
import { LeagueResponse } from '../../lol_api/dto/response/league.response';
import { MatchDetailsResponse } from '../../lol_api/dto/response/match_details/match_details.response';
import { SummonerResponse } from '../../lol_api/dto/response/summoner.response';
import { GenHelper } from '../../shared/general.helpers';

@HTTP({ usePromises: true, enableAxiosLogger: GenHelper.logLolAxios })
@Interceptors(LolInterceptor)
export class LolRemoteService {
  @GET(':server/lol/summoner/v4/summoners/by-name/:summonerName')
  public summonerDetailsBySummonerName(
    @Path('server') _server: string,
    @Path('summonerName') _summonerName: string,
  ): Promise<SummonerResponse> {
    return null;
  }

  @GET(':server/lol/league/v4/entries/by-summoner/:summonerId')
  public summonerLeagueBySummonerId(
    @Path('server') _server: string,
    @Path('summonerId') _summonerId: string,
  ): Promise<LeagueResponse[]> {
    return null;
  }

  @GET(':region/lol/match/v5/matches/by-puuid/:puuid/ids')
  public latestMatchesByPuuid(
    @Path('region') _region: string,
    @Path('puuid') _puuid: string,
  ): Promise<LatestMatchesResponse[]> {
    return null;
  }

  @GET(':region/lol/match/v5/matches/:matchId')
  public matchDetailsByMatchId(
    @Path('region') _region: string,
    @Path('matchId') _matchId: string,
  ): Promise<MatchDetailsResponse> {
    return null;
  }
}
