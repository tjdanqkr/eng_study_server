import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { QuestionModule } from './question/question.module';
import { CategoryModule } from './category/category.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${path.resolve()}/env/.${process.env.NODE_ENV}.env`],
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),

    AuthModule,

    QuestionModule,

    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
