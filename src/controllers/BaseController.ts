import { Request, Response } from 'express';
import fetch from 'node-fetch';
import { ICurrencies } from '../types/base.js';

class BaseController {
    constructor() {
        this.getBase = this.getBase.bind(this);
    }

    async getCurrencies() {
        try {
            const response = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json');
            const currencies = (await response.json()) as ICurrencies;
            return currencies;
        } catch (error) {
            console.log(error);
        }
    }

    async getBase(req: Request, res: Response) {
        try {
            const currencies = await this.getCurrencies();

            return res.json({ currencies });
        } catch (error) {
            console.log(error);
        }
    }
}

export default new BaseController();
