import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './core/users/users.module';
import { User } from 'src/core/users/users.model';
import { CurrenciesModule } from 'src/core/currencies/currencies.module';
import { Currency } from 'src/core/currencies/currencies.model';
import { Account } from 'src/core/accounts/accounts.model';
import { AccountsModule } from 'src/core/accounts/accounts.module';
import { AuthModule } from 'src/core/auth/auth.module';
import { RecordsModule } from 'src/core/records/records.module';
import { Record } from 'src/core/records/records.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    UsersModule,
    CurrenciesModule,
    AccountsModule,
    AuthModule,
    RecordsModule,

    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Currency, Account, Record],
      autoLoadModels: true,
    }),
  ],
})
export class AppModule {}
