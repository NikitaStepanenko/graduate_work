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
import { Category } from './category.model';
import { Product } from './product.model';

interface SubCategoryCreationAttrs {
  name: string;
}

@Table({ tableName: 'subcategories' })
export class SubCategory extends Model<SubCategory, SubCategoryCreationAttrs> {
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
  name: string;

  @HasMany(() => Product)
  products: Product[];

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  categoryId: number;


  @BelongsTo(() => Category)
  category: Category;
}
