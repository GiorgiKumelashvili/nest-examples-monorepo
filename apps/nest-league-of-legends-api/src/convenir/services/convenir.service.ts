import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { QueueType } from '../../lol_api/utils/enums/queue';
import { LeagueResponse } from '../../lol_api/dto/response/league.response';
import { MatchDetailsResponse } from '../../lol_api/dto/response/match_details/match_details.response';
import { SummonerResponse } from '../../lol_api/dto/response/summoner.response';
import { LolApiService } from '../../lol_api/services/lol_api.service';
import { LolServer } from '../../lol_api/utils/enums/server';
import { LolHelper } from '../../lol_api/utils/lol.helper';
import { LolOuterResponseDto } from '../dto/response/summoner_details.response';
import { GeneralHelper } from '../utils/general.helper';

@Injectable()
export class ConvenirService {
  constructor(private readonly lolApiService: LolApiService) {}

  public async getUserDetails(summonerName: string, server: LolServer) {
    const queueType = QueueType.RANKED_SOLO_5x5;
    const summoner = await this.lolApiService.summonerDetailsBySummonerName(summonerName, server);

    if (!summoner) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    const leagues = await this.lolApiService.summonerLeagueBySummonerId(summoner.id, server);

    if (leagues && leagues.length === 0) {
      throw new HttpException('user doesnt have league', HttpStatus.NOT_FOUND);
    }

    const league = leagues.find(el => el.queueType === queueType);
    const matches = await this.lolApiService.latestMatchesByPuuid(summoner.puuid, server);

    const matchIds = matches.slice(0, Math.min(10, matches.length));
    const matchDetailsArray = await Promise.all(
      matchIds.map(id => this.lolApiService.matchDetailsByMatchId(id, server)),
    );

    return this.process(summoner, league, matchDetailsArray);
  }

  private process(
    summoner: SummonerResponse,
    league: LeagueResponse,
    matchDetails: Array<MatchDetailsResponse>,
  ): LolOuterResponseDto {
    const summonerId = summoner.id;
    const lolOuterResponseDto = new LolOuterResponseDto();
    const { wins, losses } = league;
    const winratio = LolHelper.winRationCalculator(wins, losses);

    lolOuterResponseDto.summoner = {
      name: summoner.name,
      level: summoner.summonerLevel,
      profileIconId: summoner.profileIconId,

      tier: league.tier,
      tierIconUrl: GeneralHelper.staticLolAssets('tierEmblem', league.tier),
      rank: league.rank,
      leaguePoints: league.leaguePoints,

      wins,
      losses,
      winratio, // (mine)
      profileIconUrl: GeneralHelper.staticLolAssets('profileIcon', summoner.profileIconId.toString()), // (mine)
    };
    lolOuterResponseDto.matches = matchDetails.map(el => {
      const summonerObj = el.info.participants.find(el => el.summonerId === summonerId);

      const summonerTeamId = summonerObj.teamId;

      let totalTeamKill = 0;

      const summoners = el.info.participants.map(el => {
        totalTeamKill += el.teamId === summonerTeamId ? el.kills : 0;

        return {
          summonerName: el.summonerName,
          championId: el.championId,
          championIconUrl: GeneralHelper.staticLolAssets('championIcon', el.championName),
        };
      });

      const killParticipation = Math.round(((summonerObj.kills + summonerObj.assists) / totalTeamKill) * 100);

      const cs = summonerObj.totalMinionsKilled + summonerObj.neutralMinionsKilled;

      let killTrophy = '';
      if (summonerObj.pentaKills) {
        killTrophy = 'pentaKills';
      } else if (summonerObj.quadraKills) {
        killTrophy = 'quadraKills';
      } else if (summonerObj.tripleKills) {
        killTrophy = 'tripleKills';
      } else if (summonerObj.doubleKills) {
        killTrophy = 'doubleKills';
      }

      // el.metadata.participants.map
      return {
        win: summonerObj.win,
        // champion
        champLevel: summonerObj.champLevel,
        championId: summonerObj.championId,
        championName: summonerObj.championName,
        championIconUrl: GeneralHelper.staticLolAssets('championIcon', summonerObj.championName),

        // statistics
        kills: summonerObj.kills,
        deaths: summonerObj.deaths,
        assists: summonerObj.assists,

        cs,
        killParticipation,
        killTrophy, // (doubleKills, tripleKills, quadraKills, pentaKills)
        summoners, // { summonerName, championId }
      };
    });

    return lolOuterResponseDto;
  }
}
