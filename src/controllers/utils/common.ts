import { Request } from 'express';
import Currency from '../../models/Currency.js';
import User from '../../models/User.js';

export const getAllCurrencies = async () => {
    try {
        const currencies = await Currency.find({});
        return currencies;
    } catch (error) {
        console.log(error);
    }
};

export const getCurrentUser = async (req: Request<unknown, unknown, unknown>) => {
    try {
        const userData = req.user?.data;

        if (!userData) {
            return null;
        }

        const user = await User.findOne({ email: userData });

        return user;
    } catch (error) {
        console.log(error);
    }
};
