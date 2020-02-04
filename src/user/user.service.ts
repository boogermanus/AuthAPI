import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ISignUp } from '../interfaces/signup.interface';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/User';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    public async signUp(dto: ISignUp) {

        const existingUser = await this.getByUsername(dto.username);

        if (existingUser !== null) {
            throw new HttpException(`Username: ${dto.username} already exists`, HttpStatus.CONFLICT);
        }
        const newUser = new User();
        newUser.username = dto.username;
        newUser.password = await bcrypt.hash(dto.password, 8);
        newUser.isAdmin = dto.isAdmin === undefined ? false : dto.isAdmin;

        return await this.userRepository.save(newUser);
    }

    public async getAll() {
        return await this.userRepository.find();
    }

    public async getByUsername(username: string) {
        const users = await this.userRepository.find({ where: { username } });

        if (users.length > 0) {
            return new Promise<User>(resolve => resolve(users[0]));
        } else {
            return new Promise<User>(reject => reject(null));
        }
    }

    public async getById(id: number) {
        return await this.userRepository.findOne(id);
    }

    public async deleteById(id: number) {
        return await this.userRepository.delete(id);
    }

    public async update(id: number, user: IUser) {
        return await this.userRepository.update(id,
            {
                firstname: user.firstname,
                lastname: user.lastname,
                age: user.age,
                isAdmin: user.isAdmin,
                profileImageUrl: user.profileImageUrl,
            });
    }
}
