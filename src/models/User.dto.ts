import { User } from '../types/User.js';

export class UserDto {
    _id;
    email;
    name;

    constructor(data: User) {
        this._id = data._id;
        this.email = data.email;
        this.name = data.name;
    }
}
