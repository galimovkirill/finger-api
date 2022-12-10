import { Schema, model } from 'mongoose';
import { User } from '../types/User.js';

const User = new Schema<User>(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true, select: false }
    },
    {
        versionKey: false
    }
);

export default model('User', User);
