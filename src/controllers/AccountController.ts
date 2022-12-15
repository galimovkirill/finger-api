import { Request, Response } from 'express';
import Account from '../models/Account.js';
import Currency from '../models/Currency.js';
import { IAccount, IAccountCandidate } from '../types/account.js';
import { getCurrentUser } from './utils/common.js';

class AccountController {
    async createAccount(req: Request<unknown, unknown, IAccountCandidate>, res: Response<{ account: IAccount }>) {
        try {
            const { name, currencyCode, initialBalance } = req.body;

            const isExist = await Account.findOne({ name });
            if (isExist) {
                return res.sendStatus(409);
            }

            const currency = await Currency.findOne({ code: currencyCode });
            if (!currency) {
                return res.sendStatus(400);
            }

            const user = await getCurrentUser(req);
            if (!user) {
                return res.sendStatus(400);
            }

            const account = new Account({ name, currencyCode: currency.code, initialBalance, balance: initialBalance, userRef: user._id });
            await account.save();

            return res.json({ account });
        } catch (error) {
            console.log(error);
        }
    }

    async getAccounts(req: Request, res: Response) {
        try {
            const user = await getCurrentUser(req);

            if (!user) {
                return res.status(400);
            }

            const accounts = await Account.find({ userRef: user._id });

            return res.json({ accounts });
        } catch (error) {
            console.log(error);
        }
    }
}

export default new AccountController();
