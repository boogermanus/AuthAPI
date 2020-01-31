import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    age: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    isAdmin: boolean;

    @Column()
    profileImageUrl: string;

}
