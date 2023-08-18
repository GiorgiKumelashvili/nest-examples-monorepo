import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GenHelper } from '../shared/general.helpers';
import { NetworkModule } from '../network/network.module';
import { LolApiService } from './services/lol_api.service';

@Module({
  imports: [
    NetworkModule,
    HttpModule.register({
      timeout: 10000,
      headers: { [GenHelper.LOL_HEADER]: GenHelper.LOL_KEY },
    }),
  ],
  controllers: [],
  providers: [LolApiService],
  exports: [HttpModule, LolApiService],
})
export class LolApiModule {}
