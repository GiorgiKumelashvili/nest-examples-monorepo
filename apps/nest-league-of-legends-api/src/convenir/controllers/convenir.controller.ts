import { Controller, Get, Param } from '@nestjs/common';
import { ConvenirService } from '../services/convenir.service';
import { SummonerDetailsRequest } from '../dto/request/summoner_details.request';

@Controller('summoner/details')
export class ConvenirController {
  constructor(private readonly convenirService: ConvenirService) {}

  @Get(':server/:summonerName')
  getSummonerDetails(@Param() params: SummonerDetailsRequest) {
    const { summonerName, server } = params;

    return this.convenirService.getUserDetails(summonerName, server);
  }
}
