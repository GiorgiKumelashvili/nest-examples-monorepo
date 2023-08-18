//TODO token check needed !!!!

import { Controller, Get, Param, ParseEnumPipe } from '@nestjs/common';
import { LolServer } from '../lol_api/utils/enums/server';
import { ApiService } from './services/main.service';

@Controller('proxy')
export class ApiController {
    constructor(private readonly apiService: ApiService) {}

    @Get('summoner/details-and-league/:server/:summonerName')
    getSummonerDetailsAndLeague(
        @Param('server', new ParseEnumPipe(LolServer)) server: LolServer,
        @Param('summonerName') summonerName: string,
    ) {
        return this.apiService.getSummonerDetailsAndLeague(server, summonerName);
    }

    @Get('summoner/details/:server/:summonerName')
    getSummonerDetails(
        @Param('server', new ParseEnumPipe(LolServer)) server: LolServer,
        @Param('summonerName') summonerName: string,
    ) {
        return this.apiService.getSummonerDetails(server, summonerName);
    }

    // test routes basically same

    @Get('test/summoner/details/:server/:summonerName')
    test(
        @Param('server', new ParseEnumPipe(LolServer)) server: LolServer,
        @Param('summonerName') summonerName: string,
    ) {
        return this.apiService.getSummonerDetails(server, summonerName);
    }

    @Get('test/summoner/details-and-league/:server/:summonerName')
    test2(
        @Param('server', new ParseEnumPipe(LolServer)) server: LolServer,
        @Param('summonerName') summonerName: string,
    ) {
        return this.apiService.getSummonerDetailsAndLeague(server, summonerName);
    }
}
