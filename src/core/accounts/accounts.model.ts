import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { CreateAccountDto } from 'src/core/accounts/accounts.dto';
import { Currency } from 'src/core/currencies/currencies.model';
import { User } from 'src/core/users/users.model';

@Table({ tableName: 'accounts' })
export class Account extends Model<Account, CreateAccountDto> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  // @BelongsTo(() => User, 'id')
  // userId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  balance: number;

  @ForeignKey(() => Currency)
  @Column
  currencyCode: string;
}
