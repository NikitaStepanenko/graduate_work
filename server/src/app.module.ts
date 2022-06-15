import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { BasketModule } from './basket/basket.module';
import * as path from 'path';
import { Product } from './products/models/product.model';
import { Brand } from './products/models/brand.model';
import { ProductInfo } from './products/models/product-info.model';
import { Rating } from './products/models/rating.model';
import { SubCategory } from './products/models/subcategory.model';
import { Basket } from './basket/models/basket.model';
import { BasketProduct } from './basket/models/basket-product.model';
import { ProductModule } from './products/products.module';
import { Category } from './products/models/category.model';
import { PointsModule } from './points/points.module';
import { Point } from './points/models/point.model';
import { UserPoint } from './points/models/user-point.model';
import { YoomoneyModule } from './yoomoney/yoomoney.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    ConfigModule.forRoot({ envFilePath: '.env' }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Category,
        Role,
        Product,
        Brand,
        ProductInfo,
        Rating,
        SubCategory,
        Basket,
        UserPoint,
        Point,
        BasketProduct,
      ],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    ProductModule,
    FilesModule,
    BasketModule,
    PointsModule,
    YoomoneyModule,
  ],
})
export class AppModule { }

// host: "localhost",
// port: 5432,
// username: "postgres",
// password: "root",
// database: 'zoo',