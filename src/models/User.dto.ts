import { IUser } from '../types/user.js';

export class UserDto {
    _id;
    email;
    name;

    constructor(data: IUser) {
        this._id = data._id;
        this.email = data.email;
        this.name = data.name;
    }
}
