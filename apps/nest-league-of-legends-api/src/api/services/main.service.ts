import { HttpStatus, Injectable } from '@nestjs/common';
import { LolServer } from '../../lol_api/utils/enums/server';
import { SummonerDetailsResponse } from '../dto/response/summoner_details.response';
import { SummonerOnlyResponse } from '../dto/response/summoner_only.response';
import { ExceptionMessageCode } from '../utils/exception_message_code.enum';
import { GenericException } from '../utils/generic.exception';
import { LolLeague } from '../../lol_api/utils/enums/league';
import { QueueType } from '../../lol_api/utils/enums/queue';
import { LolHelper } from '../../lol_api/utils/lol.helper';
import { NetworkProvider } from '../../network/network.provider';

@Injectable()
export class ApiService {
  constructor(private readonly networkProvider: NetworkProvider) {}

  async getSummonerDetailsAndLeague(server: LolServer, summonerName: string): Promise<SummonerDetailsResponse> {
    const queueType = QueueType.RANKED_SOLO_5x5;

    const summoner = await this.networkProvider.lolRemoteService.summonerDetailsBySummonerName(
      LolHelper.urlGetter(server),
      summonerName,
    );

    if (!summoner) {
      throw new GenericException(HttpStatus.NOT_FOUND, ExceptionMessageCode.SUMMONER_NAME_NOT_FOUND);
    }

    const leagues = await this.networkProvider.lolRemoteService.summonerLeagueBySummonerId(
      LolHelper.urlGetter(server),
      summoner.id,
    );

    if (leagues && leagues.length === 0) {
      throw new GenericException(
        HttpStatus.NOT_FOUND,
        ExceptionMessageCode.SUMMONER_DIVISION_ERROR,
        'user doesnt have league at all',
      );
    }

    const rankedLeague = leagues.find(el => el.queueType === queueType);

    if (!rankedLeague) {
      throw new GenericException(
        HttpStatus.NOT_FOUND,
        ExceptionMessageCode.SUMMONER_DIVISION_ERROR,
        'user doesnt have ranked league',
      );
    }

    const summonerDetailsResponse = new SummonerDetailsResponse();

    summonerDetailsResponse.name = summoner.name;
    summonerDetailsResponse.profileIconId = summoner.profileIconId;
    summonerDetailsResponse.league = rankedLeague.tier.toLowerCase() as LolLeague;
    summonerDetailsResponse.leagueNumber = LolHelper.lolRankToLeagueNumberConverter(rankedLeague.rank);
    summonerDetailsResponse.leaguePoints = rankedLeague.leaguePoints;
    summonerDetailsResponse.summonerLevel = summoner.summonerLevel;
    summonerDetailsResponse.winRatio = LolHelper.winRationCalculator(rankedLeague.wins, rankedLeague.losses);

    summonerDetailsResponse.win = rankedLeague.wins;
    summonerDetailsResponse.lose = rankedLeague.losses;

    return summonerDetailsResponse;
  }

  async getSummonerDetails(server: LolServer, summonerName: string): Promise<SummonerOnlyResponse> {
    const summoner = await this.networkProvider.lolRemoteService.summonerDetailsBySummonerName(
      LolHelper.urlGetter(server),
      summonerName,
    );

    if (!summoner) {
      throw new GenericException(HttpStatus.NOT_FOUND, ExceptionMessageCode.SUMMONER_NAME_NOT_FOUND);
    }

    const summonerOnlyResponse = new SummonerOnlyResponse();

    summonerOnlyResponse.name = summoner.name;
    summonerOnlyResponse.profileIconId = summoner.profileIconId;
    summonerOnlyResponse.summonerLevel = summoner.summonerLevel;

    return summonerOnlyResponse;
  }
}
