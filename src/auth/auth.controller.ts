import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Logger,
  Req,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { JwtAuthGuard } from './gaurds/jwt-auth.gaurd';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('/signin')
  // @UseGuards(LocalAuthGuard)
  async signin(@Body() signinAuthDto: SigninAuthDto) {
    return await this.authService.signin(signinAuthDto);
  }

  @Post('/tests')
  @UseGuards(JwtAuthGuard)
  test(@Req() req) {
    console.log(req);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
