import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

/**
 * In short:
 * findOneAndDelete() returns the deleted document after having deleted it (in case you need its contents after the delete operation);
 * deleteOne() is used to delete a single document
 * remove() is a deprecated function and has been replaced by deleteOne() (to delete a single document) and deleteMany() (to delete multiple documents)
 */

NestFactory.create<NestExpressApplication>(AppModule).then(async (app: NestExpressApplication) => {
  const logger = new Logger('app');

  await app.listen(3000);

  // log misc stuff
  const apiUrl: string = await app.getUrl();
  logger.verbose(`Application listening on --- ${apiUrl}`);
  logger.verbose(`Application docs on --- ${apiUrl}/docs`);
});
