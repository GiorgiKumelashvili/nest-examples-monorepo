import { Module } from '@nestjs/common';
import { LolApiModule } from '../lol_api/lol_api.module';
import { ConvenirService } from './services/convenir.service';
import { ConvenirController } from './controllers/convenir.controller';

@Module({
  imports: [LolApiModule],
  controllers: [ConvenirController],
  providers: [ConvenirService],
})
export class ConvenirModule {}
