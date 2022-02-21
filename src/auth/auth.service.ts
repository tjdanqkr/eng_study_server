import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TokenDto } from './dto/token.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninAuthDto } from './dto/signin-auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtServise: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.encryptionPassword(createUserDto);
    const createUser = new this.userModel(user);
    return await createUser.save();
  }

  async encryptionPassword(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return { ...createUserDto, password: hashedPassword };
  }

  async signin(signinAuthDto: SigninAuthDto): Promise<TokenDto> {
    const { password, id } = signinAuthDto;
    const user = await this.userModel.findOne({ id });
    if (user && (await bcrypt.compare(password, user.password))) {
      // 토큰 생성

      const payload = { id, isAdmin: user.isAdmin };

      const accessToken = await this.jwtServise.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Login fail');
    }
  }

  async test(token: TokenDto): Promise<TokenDto> {
    return;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: string) {
    const user: User = await this.userModel.findOne({ id });
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
