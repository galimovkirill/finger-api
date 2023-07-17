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
}
