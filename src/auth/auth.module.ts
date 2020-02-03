import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secretOrPrivateKey: 'key',
      signOptions: {expiresIn: '1d'},
    }),
    UserModule,
  ],
  providers: [
    AuthService,
    UserService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
