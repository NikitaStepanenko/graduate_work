import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';
import { UserPoint } from './user-point.model';

interface PointCreationAttrs {
  address: string;
  coords: string;
  date: Date;
  city: string;
}

@Table({ tableName: 'point' })
export class Point extends Model<Point, PointCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  coords: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  })
  status: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @BelongsToMany(() => User, () => UserPoint)
  users: User[];
}
