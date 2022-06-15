import { Column, DataType, HasMany, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";
import { Point } from './point.model';


@Table({ tableName: 'user_point', createdAt: false, updatedAt: false })
export class UserPoint extends Model<UserPoint> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Point)
    @Column({ type: DataType.INTEGER })
    pointId: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;
}