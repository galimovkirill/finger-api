import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Currency } from 'src/core/currencies/currencies.model';

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectModel(Currency) private currencyRepository: typeof Currency,
  ) {}

  async createCurrency(currencyToCreate: Currency) {
    const currency = await this.currencyRepository.create(currencyToCreate);
    return currency;
  }

  async getCurrencyByCode(code: string) {
    const currency = await this.currencyRepository.findOne({ where: { code } });
    return currency;
  }

  async getAllCurrencies() {
    const currencies = await this.currencyRepository.findAll();
    return currencies;
  }

  // async createCurrenciesFromList(list: [string, string, string][]) {
  //   const res: Currency[] = [];

  //   await Promise.all(
  //     list.map(async (item) => {
  //       const [name, code, symbol] = item;

  //       const newCurrency = Currency.build({ code, name, symbol });
  //       await newCurrency.save();

  //       res.push(newCurrency);
  //     }),
  //   );

  //   return res;
  // }
}
