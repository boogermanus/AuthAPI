import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/User';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {
}
