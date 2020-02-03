import { Injectable } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'key',
        });
    }

    public async validate(payload: IJwtPayload) {
        return true;
    }
}
