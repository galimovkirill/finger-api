import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { CurrenciesModule } from 'src/core/currencies/currencies.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from 'src/core/accounts/accounts.model';
import { Currency } from 'src/core/currencies/currencies.model';

@Module({
  providers: [AccountsService],
  controllers: [AccountsController],
  imports: [SequelizeModule.forFeature([Account, Currency]), CurrenciesModule],
  exports: [AccountsService],
})
export class AccountsModule {}
