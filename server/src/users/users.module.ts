import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { Product } from 'src/products/models/product.model';
import { Basket } from 'src/basket/models/basket.model';
import { Rating } from 'src/products/models/rating.model';
import { Point } from 'src/points/models/point.model';
import { UserPoint } from 'src/points/models/user-point.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([
      User,
      Role,
      Product,
      Basket,
      Rating,
      Point,
      UserPoint
    ]),
    RolesModule,
  ],
  exports: [UsersService],
})
export class UsersModule { }
