import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ISignUp } from '../interfaces/signup.interface';

@Controller('api/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Get()
    public get() {
        return 'auth';
    }
    @Post('login')
    public async login(@Body() dto: ISignUp) {
        return await this.authService.login(dto);
    }

}
