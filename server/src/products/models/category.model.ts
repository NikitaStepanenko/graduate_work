import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Product } from './product.model';
import { SubCategory } from './subcategory.model';

interface CategoryCreationAttrs {
  name: string;
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreationAttrs> {
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

  @HasMany(() => SubCategory)
  subCategories: SubCategory[];
}
