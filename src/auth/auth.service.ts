import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ISignUp } from '../interfaces/signup.interface';
import { User } from '../entity/User';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
                private readonly userService: UserService) {}

    public async login(dto: ISignUp) {
        const user = await this.userService.get(dto.username);

        if ( await this.validatePassword(user, dto)) {
            const token = await this.jwtService.signAsync({
                username: user.username,
            });

            return {token};
        } else {
            throw new UnauthorizedException(`Username: ${dto.username} not found`);
        }
    }

    private async validatePassword(user: User, dto: ISignUp) {
        const value = await bcrypt.compare(dto.password, user.password);
        return value;
    }
}
