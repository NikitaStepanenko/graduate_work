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
import { Product } from 'src/products/models/product.model';
import { Basket } from './basket.model';

interface BascketProductsAttrs {
  count: number;
  productId: number;
  basketId: number
}

@Table({ tableName: 'basket_products' })
export class BasketProduct extends Model<BasketProduct, BascketProductsAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  count: number;

  @ForeignKey(() => Basket)
  @Column({ type: DataType.INTEGER })
  basketId: number;

  @BelongsTo(() => Basket)
  basket: Basket[];

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  // @HasMany(() => Post)
  // posts: Post[];
}
