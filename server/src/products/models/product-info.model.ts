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
import { Product } from './product.model';

interface ProductInfoCreationAttrs {
  title: string;
  description: string;
  productId: number;
}

@Table({ tableName: 'product_info' })
export class ProductInfo extends Model<ProductInfo, ProductInfoCreationAttrs> {
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
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

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
// import { UserRoles } from 'src/roles/user-roles.model';
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
