import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Product } from './product.model';

interface BrandCreationAttrs {
  name: string;
}

@Table({ tableName: 'brand' })
export class Brand extends Model<Brand, BrandCreationAttrs> {
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
  name: string;

  @HasMany(() => Product)
  products: Product[];
}
