import { Body, Controller, Post } from '@nestjs/common';
import { CreateRecordDto } from 'src/core/records/records.dto';
import { RecordsService } from 'src/core/records/records.service';
import { User } from 'src/core/users/users.decorator';
import { User as UserModel } from 'src/core/users/users.model';

@Controller('records')
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  @Post('/create')
  createRecord(@Body() recordDto: CreateRecordDto, @User() user: UserModel) {
    return this.recordsService.createRecord(recordDto, user);
  }
}
