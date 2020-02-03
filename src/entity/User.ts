import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { IUser } from '../interfaces/user.interface';

@Entity()
export class User implements IUser {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    firstname: string;

    @Column({nullable: true})
    lastname: string;

    @Column({nullable: true})
    age: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({default: false})
    isAdmin: boolean;

    @Column({nullable: true})
    profileImageUrl: string;

}
