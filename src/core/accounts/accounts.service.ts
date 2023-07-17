import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAccountDto } from 'src/core/accounts/accounts.dto';
import { Account } from 'src/core/accounts/accounts.model';
import { CurrenciesService } from 'src/core/currencies/currencies.service';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account) private accountRepository: typeof Account,
    private currenciesService: CurrenciesService,
  ) {}

  async createAccount(@Body() accountDto: CreateAccountDto) {
    const currency = await this.currenciesService.getCurrencyByCode(
      accountDto.currencyCode,
    );

    if (!currency) {
      throw new BadRequestException('Selected currency code does not exist');
    }

    const account = await this.accountRepository.create(accountDto);
    return account;
  }
}
