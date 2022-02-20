import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { SecretKey } from '../secretKey';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      // secretOrKey: 'a',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    console.log();
  }

  async validate(payload) {
    Logger.log('start');
    const { id } = payload;
    const user: User = await this.userModel.findOne({ id });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
