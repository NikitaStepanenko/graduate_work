import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
  HasMany,
  HasOne,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Basket } from 'src/basket/models/basket.model';
import { Point } from 'src/points/models/point.model';
import { UserPoint } from 'src/points/models/user-point.model';
import { Rating } from 'src/products/models/rating.model';
import { Role } from 'src/roles/roles.model';

interface UserCreationAttrs {
  email: string;
  password: string;
  login: string;
  roleId: number;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
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
    unique: true,
    allowNull: false,
  })
  login: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;

  @HasOne(() => Basket)
  basket: Basket;

  @HasMany(() => Rating)
  ratings: Rating[];

  @BelongsToMany(() => Point, () => UserPoint)
  points: Point[];
}
