import * as redisStore from 'cache-manager-redis-store';
import { RouletteModule } from './roulette/roulette.module';
import { CacheManagerOptions, CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { Module, ValidationPipe } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtHelper } from '../commons/jwt-helper';
import { JwtAuthGuard } from '../guards/auth.guard';

@Module({
  imports: [
    JwtModule,
    RouletteModule,
    CacheModule.register({
      store: redisStore as unknown as CacheManagerOptions['store'],
      host: 'localhost',
      port: 6379,
      isGlobal: true,
      ttl: 0,
    }),
  ],
  controllers: [],
  providers: [
    JwtHelper,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
