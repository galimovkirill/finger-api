import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'currencies' })
export class Currency extends Model<Currency> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false,
  })
  code: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  symbol: string;
}
