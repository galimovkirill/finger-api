import { Request, Response } from 'express';
import fetch from 'node-fetch';
import { ICurrency } from '../types/base.js';

class BaseController {
    constructor() {
        this.getBase = this.getBase.bind(this);
    }

    async getCurrencies() {
        try {
            const response = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json');
            const currencies = (await response.json()) as { [key: string]: string };

            const result: ICurrency[] = [];
            Object.keys(currencies).forEach((code) => {
                result.push({ code, name: currencies[code] });
            });

            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getBase(req: Request, res: Response<{ currencies: ICurrency[] }>) {
        try {
            const currencies = await this.getCurrencies();

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
