import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAccountDto } from 'src/core/accounts/accounts.dto';
import { Account } from 'src/core/accounts/accounts.model';
import { CurrenciesService } from 'src/core/currencies/currencies.service';
import { User } from 'src/core/users/users.model';

@Injectable({ scope: Scope.REQUEST })
export class AccountsService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectModel(Account) private accountRepository: typeof Account,
    private currenciesService: CurrenciesService,
  ) {}

  async createAccount(accountDto: CreateAccountDto, user: User) {
    const currency = await this.currenciesService.getCurrencyByCode(
      accountDto.currencyCode,
    );

    if (!currency) {
      throw new BadRequestException('Selected currency code does not exist');
    }

    const account = await this.accountRepository.create({
      ...accountDto,
      userId: user.id,
    });
    return account;
  }
}
