import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { AccountsModule } from 'src/core/accounts/accounts.module';
import { Record } from 'src/core/records/records.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [RecordsService],
  controllers: [RecordsController],
  imports: [SequelizeModule.forFeature([Record]), AccountsModule],
})
export class RecordsModule {}
