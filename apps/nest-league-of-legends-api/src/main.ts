import * as ffy from '@nestjs/platform-fastify';
import compression from 'fastify-compress';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { GenHelper } from './shared/general.helpers';
import { AllExceptionsFilter } from './shared/exception/all_exception.filter';

// Main route: http://localhost:4001/api/proxy/summoner/details/NA/Yassuo

//TODO solve axiosfit problem
(async function () {
  const adapter = new ffy.FastifyAdapter();
  const app = await NestFactory.create<ffy.NestFastifyApplication>(AppModule, adapter);
  const httpAdapterHost = app.get(HttpAdapterHost);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useStaticAssets({ root: join(__dirname, '../..', 'static'), prefix: '/static' });
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  await app.register(compression, { encodings: ['gzip', 'deflate'] });
  await app.listen(process.env.PORT || 3000, '0.0.0.0');

  console.log({
    platform: 'nestjs',
    library: 'fastify',
    enviroment: GenHelper.NODE_ENV,
    port: GenHelper.PORT,
  });
})();
