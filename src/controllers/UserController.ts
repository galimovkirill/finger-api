import { Request, Response } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../helpers/auth.js';
import { UserDto } from '../models/User.dto.js';

class UserController {
    async signUp(req: Request, res: Response) {
        try {
            const { email, name, password } = req.body;

            const isExist = await User.findOne({ email });
            if (isExist) {
                return res.status(400).json({ message: 'User already exist' });
            }

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const user = new User({ email, name, password: hash });
            await user.save();

            const newUser = new UserDto(user);

            return res.json({
                message: 'User has been successfully created',
                data: newUser
            });
        } catch (error) {
            console.log(error);
        }
    }

    async signIn(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).select('+password');

            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            const isValidPassword = bcrypt.compareSync(password, user.password);
            if (!isValidPassword) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            const newUser = new UserDto(user);

            const { accessToken, accessTokenExpiredAt } = generateAccessToken(user.email);
            return res.json({ accessToken, accessTokenExpiredAt, user: newUser });
        } catch (error) {
            console.log(error);
        }
    }

    async getUserData(req: Request, res: Response) {
        try {
            if (!req.user) {
                return res.sendStatus(403);
            }

            const { data } = req.user;
            const user = await User.findOne({ email: data });

            res.json({ user });
        } catch (error) {
            console.log(error);
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            const users = await User.find({});
            return res.json({ users });
        } catch (error) {
            console.log(error);
        }
    }
}

export default new UserController();
