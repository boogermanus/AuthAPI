import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/User';
import { AuthStrategy } from './auth.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'key',
      signOptions: {expiresIn: '1d'},
    }),
    UserModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthService,
    UserService,
    AuthStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
