import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ISignUp } from '../interfaces/signup.interface';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/User';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    public async signUp(dto: ISignUp) {
      const newUser = new User();
      newUser.username = dto.username;
      newUser.password =  await bcrypt.hash(dto.password, 8);
      newUser.isAdmin = dto.isAdmin ?? false;

      return await this.userRepository.save(newUser);
    }

    public async getAll() {
        return await this.userRepository.find();
    }

    public async get(id: string) {
        const users = await this.userRepository.find({where: {username: id}});

        if (users.length > 0) {
            return new Promise<User>(resolve => resolve(users[0]));
        } else {
            return new Promise<User>(reject => reject(null));
        }
    }

}
