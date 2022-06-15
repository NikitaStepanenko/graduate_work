import { Module } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { UserPoint } from './models/user-point.model';
import { AuthModule } from 'src/auth/auth.module';
import { Point } from './models/point.model';

@Module({
  providers: [PointsService],
  controllers: [PointsController],
  imports: [AuthModule, SequelizeModule.forFeature([
    User,
    Point,
    UserPoint,
  ]),]
})
export class PointsModule { }
