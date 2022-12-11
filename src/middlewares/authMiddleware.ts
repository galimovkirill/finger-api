import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { getAccessTokenFromRequest } from '../helpers/auth.js';

import dotenv from 'dotenv';
dotenv.config();

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = getAccessTokenFromRequest(req);

        if (!token) {
            return res.sendStatus(403);
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY || '', (err: any, user: any) => {
            if (err) {
                console.log(err);
                return res.sendStatus(403);
            }

            req.user = user;

            next();
        });
    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: 'User is not authorized' });
    }
};
