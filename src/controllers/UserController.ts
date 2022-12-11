import { Request, Response } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../helpers/auth.js';
import { UserDto } from '../models/User.dto.js';
import { IGeneratedAccessToken, IUser } from '../types/user.js';

class UserController {
    async signUp(req: Request<unknown, unknown, Pick<IUser, 'email' | 'name' | 'password'>>, res: Response<{ data: UserDto }>) {
        try {
            const { email, name, password } = req.body;

            const isExist = await User.findOne({ email });
            if (isExist) {
                return res.sendStatus(409);
            }

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const user = new User({ email, name, password: hash });
            await user.save();

            const newUser = new UserDto(user);

            return res.json({ data: newUser });
        } catch (error) {
            console.log(error);
        }
    }

    async signIn(
        req: Request<unknown, unknown, Pick<IUser, 'email' | 'password'>>,
        res: Response<IGeneratedAccessToken & { user: UserDto }>
    ) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).select('+password');

            if (!user) {
                return res.sendStatus(404);
            }

            const isValidPassword = bcrypt.compareSync(password, user.password);
            if (!isValidPassword) {
                return res.sendStatus(401);
            }

            const newUser = new UserDto(user);

            const { accessToken, accessTokenExpiredAt } = generateAccessToken(user.email);
            return res.json({ accessToken, accessTokenExpiredAt, user: newUser });
        } catch (error) {
            console.log(error);
        }
    }

    async getUserData(req: Request, res: Response<{ user: IUser }>) {
        try {
            if (!req.user) {
                return res.sendStatus(403);
            }

            const { data } = req.user;
            const user = await User.findOne({ email: data });

            if (!user) {
                return res.status(404);
            }

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
