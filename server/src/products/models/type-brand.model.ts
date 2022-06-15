import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript';
import { Brand } from './brand.model';
import { SubCategory } from './subcategory.model';

@Table({ tableName: 'type_brand', createdAt: false, updatedAt: false })
export class TypeBrand extends Model<TypeBrand> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => SubCategory)
  @Column({ type: DataType.INTEGER })
  typeId: number;

  @ForeignKey(() => Brand)
  @Column({ type: DataType.INTEGER })
  brandId: number;
}
