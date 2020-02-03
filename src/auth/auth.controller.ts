import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ISignUp } from '../interfaces/signup.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    public async login(@Body() dto: ISignUp) {
        return await this.authService.login(dto);
    }

    @UseGuards(AuthGuard())
    @Get('verify')
    public async verify(@Query('token') token: string) {
        return await this.authService.verify(token);
    }

}
