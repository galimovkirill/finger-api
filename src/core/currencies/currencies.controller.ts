import { Body, Controller, Post } from '@nestjs/common';
import { Currency } from 'src/core/currencies/currencies.model';
import { CurrenciesService } from 'src/core/currencies/currencies.service';

@Controller('currencies')
export class CurrenciesController {
  constructor(private currencyService: CurrenciesService) {}

  @Post('/create')
  createCurrency(@Body() currency: Currency) {
    return this.currencyService.createCurrency(currency);
  }

  @Post('/create/all')
  createCurrenciesFromList(@Body() list: [string, string, string][]) {
    return this.currencyService.createCurrenciesFromList(list);
  }
}
