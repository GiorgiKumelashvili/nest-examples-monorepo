import { LolApiModule } from './lol_api/lol_api.module';
import { ConvenirModule } from './convenir/convenir.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), LolApiModule, ConvenirModule, ApiModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
