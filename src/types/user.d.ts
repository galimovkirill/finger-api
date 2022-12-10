import { Types } from 'mongoose';

export interface User {
    _id: Types.ObjectId;
    email: string;
    name: string;
    password: string;
}
