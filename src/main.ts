import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger';
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app)
  await app.listen(process.env.PORT || 5050);

}
bootstrap();
