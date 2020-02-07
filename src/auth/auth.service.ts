import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ISignUp } from '../interfaces/signup.interface';
import { User } from '../entity/User';
import * as bcrypt from 'bcrypt';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
                private readonly userService: UserService) {}

    public async login(dto: ISignUp) {
        const user = await this.userService.getByUsername(dto.username);

        if ( await this.validatePassword(user, dto)) {
            const token = await this.jwtService.signAsync({
                username: user.username,
            });

            return {
                token,
                user,
            };
        } else {
            throw new UnauthorizedException(`Username: ${dto.username} not found`);
        }
    }

    public async verify(token: string) {
        try {
            return await this.jwtService.verifyAsync(token);
        } catch (e) {
            if (e instanceof JsonWebTokenError) {
                return [];
            }
        }
    }

    public async expired(token: string) {

        if (token === undefined || token === null) {
            return true;
        }

        try {
            this.jwtService.verify(token);
        } catch (e) {
            if (e instanceof JsonWebTokenError) {
                return true;
            }
        }

        return false;
    }

    private async validatePassword(user: User, dto: ISignUp) {
        const value = await bcrypt.compare(dto.password, user.password);
        return value;
    }
}
