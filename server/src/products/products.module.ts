import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { Role } from 'src/roles/roles.model';
import { FilesModule } from 'src/files/files.module';
import { Product } from './models/product.model';
import { Brand } from './models/brand.model';
import { ProductInfo } from './models/product-info.model';
import { Rating } from './models/rating.model';
import { SubCategory } from './models/subcategory.model';
import { AuthModule } from 'src/auth/auth.module';
import { Category } from './models/category.model';
import { BasketProduct } from 'src/basket/models/basket-product.model';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [
    AuthModule,
    SequelizeModule.forFeature([
      User,
      Product,
      Brand,
      ProductInfo,
      Rating,
      SubCategory,
      BasketProduct,
      Category
    ]),
    FilesModule,
  ],
})
export class ProductModule { }
