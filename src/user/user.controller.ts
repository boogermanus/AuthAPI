import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ISignUp } from '../interfaces/signup.interface';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() dto: ISignUp ) {
    return await this.userService.signUp(dto);
  }

  @Get()
  async getAll() {
      return await this.userService.getAll();
  }

  @Get(':id')
  async get(@Param() id: number) {
      return await this.userService.get(id);
  }
}
