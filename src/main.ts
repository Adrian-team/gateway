import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { rpcCustomExceptionFilter } from './common';

async function bootstrap() {
  const logger = new Logger('Main-GateWay');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new rpcCustomExceptionFilter());
  await app.listen(envs.port);

  logger.log(`Gateway runnig on port ${envs.port}`);
}
bootstrap();
