import { IUser } from './user.interface';

export interface IAuthResponse {
    token: string;
    user: IUser;
}
