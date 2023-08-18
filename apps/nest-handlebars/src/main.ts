import * as path from 'path';
import * as hbs from 'hbs';
import * as hbsUtilsFunc from 'hbs-utils';
import * as express from 'express';
import handlebarsLayouts from 'handlebars-layouts';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

NestFactory.create<NestExpressApplication>(AppModule).then(async (app: NestExpressApplication) => {
  const hbsUtils = hbsUtilsFunc.default(hbs);
  const logger = new Logger('Main logger');
  const partialsDir = path.join(__dirname, './views/partials');

  app.useStaticAssets(path.join(__dirname, './assets'), { prefix: '/src/assets' });
  app.setBaseViewsDir(path.join(__dirname, './views'));
  app.setViewEngine('hbs');

  hbsUtils.registerWatchedPartials(partialsDir);

  hbs.handlebars.registerHelper(handlebarsLayouts(hbs.handlebars));
  hbs.handlebars.registerHelper('helper_name', () => 'helper value');
  hbs.handlebars.registerHelper('loud', aString => aString.toUpperCase());

  //! Must be like this (arrow functions do not work !!!)
  hbs.handlebars.registerHelper('print_person', function () {
    return this.firstname + ' ' + this.lastname;
  });

  await app.listen(3000);

  // log misc stuff
  const apiUrl: string = await app.getUrl();
  logger.verbose(`Application listening on --- ${apiUrl}`);
  logger.verbose(`Application docs on --- ${apiUrl}/docs`);
});
