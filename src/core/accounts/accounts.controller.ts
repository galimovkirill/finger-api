import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAccountDto } from 'src/core/accounts/accounts.dto';
import { AccountsService } from 'src/core/accounts/accounts.service';
import { User } from 'src/core/users/users.decorator';
import { User as UserModel } from 'src/core/users/users.model';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Post('/create')
  createAccount(@Body() accountDto: CreateAccountDto, @User() user: UserModel) {
    return this.accountsService.createAccount(accountDto, user);
  }

  @Get('/all')
  getAllAccounts(@User() user: UserModel) {
    return this.accountsService.getAllAccounts(user.id);
  }
}
