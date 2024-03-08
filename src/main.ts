import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { load } from 'js-yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  config();
  const PORT = process.env.PORT || 4000;

  const doc = await readFile(resolve(__dirname, '../doc/api.yaml'), 'utf8');
  const docObject = load(doc);
  SwaggerModule.setup('doc', app, docObject as OpenAPIObject);

  await app.listen(PORT);
}
bootstrap();
