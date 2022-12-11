import { Types } from 'mongoose';

export interface IUser {
    _id: Types.ObjectId;
    email: string;
    name: string;
    password: string;
}

export interface IGeneratedAccessToken {
    accessToken: string;
    accessTokenExpiredAt: number;
}