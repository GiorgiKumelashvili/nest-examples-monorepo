import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

NestFactory.create<NestExpressApplication>(AppModule).then(async (app: NestExpressApplication) => {
  const logger = new Logger('Main logger');

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);

  logger.verbose(`Application listening on --- ${await app.getUrl()}`);
});
