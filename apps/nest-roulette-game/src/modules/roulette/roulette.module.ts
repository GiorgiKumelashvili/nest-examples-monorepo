import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RouletteController } from './roulette.controller';
import { RouletteRepository } from './roulette.repository';
import { RouletteService } from './roulette.service';
import { JwtHelper } from '../../commons/jwt-helper';

@Module({
  imports: [JwtModule],
  providers: [JwtHelper, RouletteService, RouletteRepository],
  controllers: [RouletteController],
})
export class RouletteModule {}
