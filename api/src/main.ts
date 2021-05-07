import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '@/app.module';
import * as cookieParser from 'cookie-parser';

try {
  const fs = require('fs');
  const localEnvFile = fs.readFileSync(`.env.local`);
  if (localEnvFile) {
    const dotenv = require('dotenv');
    const envConfig = dotenv.parse(localEnvFile);
    for (const key in envConfig) {
      process.env[key] = envConfig[key];
    }
  }
} catch (e) {
  console.info('No local .env.local file used.');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: function (origin: string, callback: Function) {
      // todo (do not allow all sources)
      return callback(null, true)
    },
    credentials: true,
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
      .setTitle('~Magic Music Library~ API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  await app.listen(process.env.PORT || 3001);
}

bootstrap();
