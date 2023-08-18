import { IsEnum } from 'class-validator';
import { LolServer } from '../../../lol_api/utils/enums/server';

export class SummonerDetailsRequest {
  @IsEnum(LolServer)
  server: LolServer;

  summonerName: string;
}
