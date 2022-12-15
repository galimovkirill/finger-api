import { Request, Response } from 'express';
import Account from '../models/Account.js';
import { IAccount, IAccountCandidate } from '../types/account.js';

class AccountController {
    async createAccount(req: Request<unknown, unknown, IAccountCandidate>, res: Response<{ account: IAccount }>) {
        try {
            const { name, currencyCode, initialBalance } = req.body;

            const isExist = await Account.findOne({ name });
            if (isExist) {
                return res.sendStatus(409);
            }

            const account = new Account({ name, currencyCode, initialBalance, balance: initialBalance });
            await account.save();

            return res.json({ account });
        } catch (error) {
            console.log(error);
        }
    }
}

export default new AccountController();
