import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Product } from 'src/products/models/product.model';
import { User } from 'src/users/user.model';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { BasketProduct } from './models/basket-product.model';
import { Basket } from './models/basket.model';

@Module({
  providers: [BasketService],
  controllers: [BasketController],
  imports: [AuthModule, SequelizeModule.forFeature([Basket, BasketProduct, User, Product])],
})
export class BasketModule { }
