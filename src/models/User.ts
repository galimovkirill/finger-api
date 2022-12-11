import { Schema, model } from 'mongoose';
import { IUser } from '../types/user.js';

const UserSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true, select: false }
    },
    {
        versionKey: false
    }
);

export default model('User', UserSchema);
