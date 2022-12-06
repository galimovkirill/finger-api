import { Schema, model } from 'mongoose';

const User = new Schema({
    name: { type: String, required: true },
    username: { type: String }
});

export default model('User', User);
