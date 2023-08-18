import { Module } from '@nestjs/common';
import { LolApiModule } from '../lol_api/lol_api.module';
import { ApiController } from './api.controller';
import { ApiService } from './services/main.service';
import { NetworkModule } from '../network/network.module';

@Module({
  imports: [NetworkModule, LolApiModule],
  controllers: [ApiController],
  providers: [ApiService],
  exports: [],
})
export class ApiModule {}
