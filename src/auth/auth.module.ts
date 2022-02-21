import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { AdminStrategy } from './strategy/admin.strategy';

@Module({
  imports: [
    //왠지 모르겟지만 env가 안 읽힘 그래서 다 해줘야하는듯
    ConfigModule.forRoot({
      envFilePath: [`${path.resolve()}/env/.${process.env.NODE_ENV}.env`],
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '10h',
      },
    }),
    MongooseModule.forFeature([{ schema: UserSchema, name: User.name }]),
  ],

  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, AdminStrategy],
  exports: [AuthService, AdminStrategy, PassportModule],
})
export class AuthModule {}
