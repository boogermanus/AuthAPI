import { Controller, Body, Post, Get, Param, UseGuards, Query, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ISignUp } from '../interfaces/signup.interface';
import { AuthGuard } from '@nestjs/passport';
import { IUser } from '../interfaces/user.interface';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() dto: ISignUp ) {
    return await this.userService.signUp(dto);
  }

  @UseGuards(AuthGuard())
  @Get()
  async getUsers(@Query('username') username: string) {

      if (username !== undefined) {
        return await this.userService.getByUsername(username);
      }
      return await this.userService.getAll();
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  async getUser(@Param('id') id: number) {
    return await this.userService.getById(id);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return await this.userService.deleteById(id);
  }

  @UseGuards(AuthGuard())
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() user: IUser) {
    return await this.userService.update(id, user);
  }

}
