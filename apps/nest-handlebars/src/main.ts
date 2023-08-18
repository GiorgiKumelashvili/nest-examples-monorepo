import * as path from 'path';
import * as hbs from 'hbs';
import * as hbsUtilsFunc from 'hbs-utils';
import * as handlebarsLayouts from 'handlebars-layouts';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { setupHandlebarHelpers } from './handlebar';

NestFactory.create<NestExpressApplication>(AppModule).then(async (app: NestExpressApplication) => {
  const hbsUtils = hbsUtilsFunc.default(hbs);
  const logger = new Logger('Main logger');
  const partialsDir = path.join(__dirname, './views/partials');

  app.useStaticAssets(path.join(__dirname, './assets'), { prefix: '/src/assets' });
  app.setBaseViewsDir(path.join(__dirname, './views'));
  app.setViewEngine('hbs');

  // setup
  hbsUtils.registerWatchedPartials(partialsDir);
  handlebarsLayouts.register(hbs.handlebars);
  setupHandlebarHelpers(hbs.handlebars);

  await app.listen(3000);

  // log misc stuff
  const apiUrl: string = await app.getUrl();
  logger.verbose(`Application listening on --- ${apiUrl}`);
  logger.verbose(`Application docs on --- ${apiUrl}/docs`);
});
