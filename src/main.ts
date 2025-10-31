import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.setGlobalPrefix('api');
  const client_url = config.get<string>('CLIENT_URL');
  app.enableCors({
    origin: [client_url],
  });
  const PORT = config.get<number>('PORT') ?? 3000;
  await app.listen(PORT, () => {
    Logger.log(`server runs on ${PORT}`);
  });
}
bootstrap();
