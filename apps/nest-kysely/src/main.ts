import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ENV_SERVICE_TOKEN } from '@nest-examples/shared';
import { AppModule } from './app.module';

NestFactory.create<NestExpressApplication>(AppModule).then(async (app: NestExpressApplication) => {
  const logger = new Logger('Main logger');
  const envService = app!.get(ENV_SERVICE_TOKEN);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true, transform: true, whitelist: true }));

  await app.listen(envService.get('PORT'));
  logger.verbose(`nest kyesely api listening on --- ${await app.getUrl()}`);
});
