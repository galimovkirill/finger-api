import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';

import dotenv from 'dotenv';
import { Request } from 'express';
import { IGeneratedAccessToken } from '../types/user.js';
dotenv.config();

export const generateAccessToken = (data = ''): IGeneratedAccessToken => {
    const secret = process.env.JWT_SECRET_KEY || '';
    const expireDate = generateAccessTokenExpireDate();
    const token = jwt.sign({ data, exp: expireDate }, secret);

    return {
        accessToken: token,
        accessTokenExpiredAt: expireDate
    };
};

export const generateAccessTokenExpireDate = () => {
    return dayjs().add(1, 'month').valueOf();
};

export const getAccessTokenFromRequest = (req: Request) => {
    const authHeader = req.headers.authorization;
    return authHeader ? authHeader : null;
};
