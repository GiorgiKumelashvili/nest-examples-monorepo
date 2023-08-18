import { Injectable } from '@nestjs/common';
import { LolServer } from '../utils/enums/server';
import { LolHelper } from '../utils/lol.helper';
import { NetworkProvider } from '../../network/network.provider';

@Injectable()
export class LolApiService {
  constructor(private readonly networkProvider: NetworkProvider) {}

  public async summonerDetailsBySummonerName(summonerName: string, server: LolServer) {
    return this.networkProvider.lolRemoteService.summonerDetailsBySummonerName(
      LolHelper.urlGetter(server),
      summonerName,
    );
  }

  public async summonerLeagueBySummonerId(summonerId: string, server: LolServer) {
    return this.networkProvider.lolRemoteService.summonerLeagueBySummonerId(LolHelper.urlGetter(server), summonerId);
  }

  public async latestMatchesByPuuid(puuid: string, server: LolServer) {
    return this.networkProvider.lolRemoteService.latestMatchesByPuuid(LolHelper.urlGetterRegional(server), puuid);
  }

  public async matchDetailsByMatchId(matchId: string, server: LolServer) {
    return this.networkProvider.lolRemoteService.matchDetailsByMatchId(LolHelper.urlGetterRegional(server), matchId);
  }
}
