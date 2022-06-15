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
import { BasketProduct } from 'src/basket/models/basket-product.model';
// import { Post } from 'src/products/products.model';
import { Role } from 'src/roles/roles.model';
import { Brand } from './brand.model';
import { ProductInfo } from './product-info.model';
import { Rating } from './rating.model';
import { SubCategory } from './subcategory.model';

interface ProductCreationAttrs {
  name: string;
  price: number;
  image: string;
  typeId: number;
  description: string;
  brandId: number;
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreationAttrs> {
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


  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: string;

  @Column({ type: DataType.STRING })
  image: string;

  @BelongsTo(() => SubCategory)
  subCategory: SubCategory;

  @ForeignKey(() => SubCategory)
  @Column({ type: DataType.INTEGER })
  typeId: number;

  @BelongsTo(() => Brand)
  brand: Brand;

  @ForeignKey(() => Brand)
  @Column({ type: DataType.INTEGER })
  brandId: number;

  @HasMany(() => Rating)
  ratings: Rating[];

  @HasMany(() => BasketProduct)
  basketProducts: BasketProduct[];

  @HasMany(() => ProductInfo)
  info: ProductInfo[];

  // @Column({
  //   type: DataType.BOOLEAN,
  //   defaultValue: false,
  // })
  // banned: boolean;

  // @Column({
  //   type: DataType.STRING,
  //   allowNull: true,
  // })
  // banReason: string;

  // @BelongsToMany(() => Role, () => UserRoles)
  // roles: Role[];

  // @HasMany(() => Post)
  // posts: Post[];
}

// import {
//   Model,
//   Table,
//   Column,
//   DataType,
//   BelongsToMany,
//   BelongsTo,
//   ForeignKey,
// } from 'sequelize-typescript';
// import { Role } from 'src/roles/roles.model';
// import { User } from 'src/users/user.model';

// interface PostCreationAttrs {
//   title: string;
//   content: string;
//   userId: number;
//   image: string;
// }

// @Table({ tableName: 'posts' })
// export class Post extends Model<Post, PostCreationAttrs> {
//   @Column({
//     type: DataType.INTEGER,
//     unique: true,
//     autoIncrement: true,
//     primaryKey: true,
//   })
//   id: number;

//   @Column({
//     type: DataType.STRING,
//     unique: true,
//     allowNull: false,
//   })
//   title: string;

//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   content: string;

//   @Column({ type: DataType.STRING })
//   image: string;

//   @ForeignKey(() => User)
//   @Column({ type: DataType.INTEGER })
//   userId: number;

//   @BelongsTo(() => User)
//   author: User;
// }
