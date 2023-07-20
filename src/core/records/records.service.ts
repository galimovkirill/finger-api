import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AccountsService } from 'src/core/accounts/accounts.service';
import { CreateRecordDto } from 'src/core/records/records.dto';
import { Record } from 'src/core/records/records.model';
import { User } from 'src/core/users/users.model';

@Injectable()
export class RecordsService {
  constructor(
    @InjectModel(Record) private recordsRepository: typeof Record,
    private accountsService: AccountsService,
  ) {}

  async createRecord(recordDto: CreateRecordDto, user: User) {
    const account = await this.accountsService.getAccountById(
      recordDto.accountId,
    );

    if (!account) {
      throw new BadRequestException('Account with selected ID is not defined');
    }

    if (account.userId !== user.id) {
      throw new ForbiddenException('User has no rights for this account');
    }

    const record = await this.recordsRepository.create(recordDto);
    return record;
  }
}
