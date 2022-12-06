import { Request, Response } from 'express';
import User from '../models/User.js';

class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const { user } = req.body;
            const newUser = new User({ name: user.name, username: user.username });

            await newUser.save();
            return res.json({ message: 'User created' });
        } catch (error) {
            console.log(error);
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            console.log('getUsers');
            const users = await User.find();
            return res.json({ users });
        } catch (error) {
            console.log(error);
        }
    }
}

export default new UserController();
