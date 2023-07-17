import { Body, Controller, Post } from '@nestjs/common';
import { CreateAccountDto } from 'src/core/accounts/accounts.dto';
import { AccountsService } from 'src/core/accounts/accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Post('/create')
  createAccount(@Body() accountDto: CreateAccountDto) {
    return this.accountsService.createAccount(accountDto);
  }
}
