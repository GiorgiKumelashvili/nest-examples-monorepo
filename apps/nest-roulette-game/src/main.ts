import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { Logger } from '@nestjs/common';

NestFactory.create<NestExpressApplication>(AppModule).then(async (app: NestExpressApplication) => {
  const logger = new Logger('app');

  app.enableCors();

  await app.listen(3000);

  // log misc stuff
  const apiUrl: string = await app.getUrl();
  logger.verbose(`Application listening on --- ${apiUrl}`);
  logger.verbose(`Application docs on --- ${apiUrl}/docs`);
});
