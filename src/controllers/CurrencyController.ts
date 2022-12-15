import { Request, Response } from 'express';
import Currency from '../models/Currency.js';
import { ICurrency, ICurrencyCandidate } from '../types/currency.js';
import { getAllCurrencies } from './utils/common.js';

class CurrencyController {
    async createCurrency(req: Request<unknown, unknown, ICurrencyCandidate>, res: Response<{ currency: ICurrency }>) {
        try {
            const { code, name } = req.body;

            const isExist = await Currency.findOne({ code });
            if (isExist) {
                return res.sendStatus(409);
            }

            const currency = new Currency({ code, name });
            await currency.save();

            return res.json({ currency });
        } catch (error) {
            console.log(error);
        }
    }

    async getCurrencies(req: Request, res: Response) {
        try {
            const currencies = await getAllCurrencies();

            if (!currencies) {
                return res.sendStatus(403);
            }

            return res.json({ currencies });
        } catch (error) {
            console.log(error);
        }
    }
}

export default new CurrencyController();
