import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { CreateUserDto } from 'src/core/users/users.dto';

@Table({
  tableName: 'users',
  defaultScope: {
    attributes: {
      exclude: ['password'],
    },
  },
})
export class User extends Model<User, CreateUserDto> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
