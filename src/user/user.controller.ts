import { Controller, Body, Post, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ISignUp } from '../interfaces/signup.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() dto: ISignUp ) {
    return await this.userService.signUp(dto);
  }

  @UseGuards(AuthGuard())
  @Get()
  async getAll() {
      return await this.userService.getAll();
  }
}
