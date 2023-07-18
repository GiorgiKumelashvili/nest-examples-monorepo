import { Pool } from 'pg';
import { PostgresDialect } from 'kysely';
import { ENV_SERVICE_TOKEN, EnvModule, EnvService } from '@nest-examples/shared';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    EnvModule.forRoot(),
    DatabaseModule.forRootAsync({
      inject: [ENV_SERVICE_TOKEN],
      useFactory: async (envService: EnvService) => ({
        dialect: new PostgresDialect({
          pool: new Pool({
            database: envService.get('DATABASE_NAME'),
            host: envService.get('DATABASE_HOST'),
            user: envService.get('DATABASE_USER'),
            password: envService.get('DATABASE_PASS'),
            port: envService.get('DATABASE_PORT'),
            max: envService.get('DATABASE_MAX_POOL'),
          }),
        }),
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
