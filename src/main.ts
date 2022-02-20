import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.JWT_SECRET);
  app.use(helmet());
  await app.listen(3001);
}
bootstrap();
