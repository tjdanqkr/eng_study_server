import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { TokenDto } from './dto/token.dto';
import { AdminAuthGuard } from './gaurds/admin-auth.gaurd';

import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.create(createUserDto);
  }

  @Post('/signin')
  // @UseGuards(LocalAuthGuard)
  signin(@Body() signinAuthDto: SigninAuthDto): Promise<TokenDto> {
    return this.authService.signin(signinAuthDto);
  }

  // @Post('/tests')
  // @UseGuards(JwtAuthGuard)
  // test(@Req() req) {
  //   console.log(req);
  // }

  // @Post('/admintests')
  // @UseGuards(AdminAuthGuard)
  // admintest(@Req() req) {
  //   console.log(req);
  // }

  @Get()
  // @UseGuards(AdminAuthGuard)
  findAll(): Promise<User[]> {
    return this.authService.findAll();
  }

  @Get(':id')
  @UseGuards(AdminAuthGuard)
  findOne(@Param('id') id: string): Promise<User> {
    return this.authService.findOne(id);
  }
}
