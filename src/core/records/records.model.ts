import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsIn,
  Model,
  Table,
} from 'sequelize-typescript';
import { Account } from 'src/core/accounts/accounts.model';
import { RecordTypes } from 'src/types/records';

@Table({ tableName: 'records' })
export class Record extends Model<Record> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @BelongsTo(() => Account)
  account: Account;

  @ForeignKey(() => Account)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  accountId: number;

  @IsIn([Object.values(RecordTypes)])
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  recordType: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  sum: number;
}
