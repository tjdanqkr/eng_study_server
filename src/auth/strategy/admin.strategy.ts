import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      // secretOrKey: 'a',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { id } = payload;
    const user: User = await this.userModel.findOne({ id });
    if (!user) {
      throw new UnauthorizedException();
    } else if (!user.isAdmin) {
      throw new UnauthorizedException('Not Admin!!');
    }
    return user;
  }
}
