import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './core/users/users.module';
import { User } from 'src/core/users/users.model';
import { CurrenciesModule } from 'src/core/currencies/currencies.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    UsersModule,
    CurrenciesModule,

    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User],
      autoLoadModels: true,
    }),
  ],
})
export class AppModule {}
