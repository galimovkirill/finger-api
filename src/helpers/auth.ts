import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';

import dotenv from 'dotenv';
dotenv.config();

export const generateAccessToken = (data = '') => {
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
