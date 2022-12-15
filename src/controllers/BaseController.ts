import { Request, Response } from 'express';
import { ICurrency } from '../types/currency.js';
import { getAllCurrencies } from './utils/common.js';

class BaseController {
    constructor() {
        this.getBase = this.getBase.bind(this);
    }

    async getBase(req: Request, res: Response<{ currencies: ICurrency[] }>) {
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

export default new BaseController();
