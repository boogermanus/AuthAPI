import { Controller, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ISignUp } from '../interfaces/signup.interface';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() dto: ISignUp ) {
    return await this.userService.signUp(dto);
  }
}
