import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
})
export class UserModule {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

}
