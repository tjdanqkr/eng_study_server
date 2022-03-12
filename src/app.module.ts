import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { QuestionModule } from './question/question.module';
import { CategoryModule } from './category/category.module';

import * as path from 'path';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${path.resolve()}/env/.${process.env.NODE_ENV}.env`],
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL_FULL, { retryDelay: 100 }),

    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),

    AuthModule,

    QuestionModule,

    CategoryModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: 'silly',
          // process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
