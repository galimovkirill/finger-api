import { RecordTypes } from 'src/types/records';

export class CreateRecordDto {
  readonly accountId: number;
  readonly recordType: RecordTypes;
  readonly sum: number;
}
