import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';
import { BasketProduct } from './basket-product.model';

@Table({ tableName: 'baskets' })
export class Basket extends Model<Basket> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @HasMany(() => BasketProduct)
  products: BasketProduct[];

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
