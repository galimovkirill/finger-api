import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Currency } from 'src/core/currencies/currencies.model';

@Module({
  providers: [CurrenciesService],
  controllers: [CurrenciesController],
  imports: [SequelizeModule.forFeature([Currency])],
})
export class CurrenciesModule {}
