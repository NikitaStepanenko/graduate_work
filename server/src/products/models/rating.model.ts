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
import { Product } from './product.model';

interface RatingCreationAttrs {
  rate: number;
  comment: string;
  productId: number;
  userId: number
}

@Table({ tableName: 'ratings' })
export class Rating extends Model<Rating, RatingCreationAttrs> {
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
  comment: string;

  @Column({
    type: DataType.INTEGER,

    allowNull: false,
  })
  rate: number;

  @BelongsTo(() => User)
  auther: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  // @BelongsTo(() => Product)
  // product: Product;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  productId: number;
}
