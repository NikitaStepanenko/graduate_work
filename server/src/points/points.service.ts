import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AddPointDto } from './dto/create-point-dto';
import { Point } from './models/point.model';
import { UserPoint } from './models/user-point.model';
import { User } from './../users/user.model';
import { Op } from 'sequelize';

@Injectable()
export class PointsService {
    private readonly logger = new Logger(PointsService.name);
    constructor(
        @InjectModel(Point) private pointRepository: typeof Point,
        @InjectModel(UserPoint) private userPointRepository: typeof UserPoint,
    ) { }

    async addPoint(dto: AddPointDto, req) {
        try {
            const { address, coords, date, city } = dto
            const { id: userId } = req.user

            const existingPoint = await this.pointRepository.findOne({
                include: [{
                    model: User, where: {
                        id: userId
                    },
                }]
            })

            if (existingPoint) {
                throw new HttpException('Вы уже записались', HttpStatus.NOT_ACCEPTABLE);
            }
            const point = await this.pointRepository.create({ address, coords, date, city })
            await this.userPointRepository.create({ userId, pointId: point.id })
            return point
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getPoints(city, req) {
        try {
            const points = await this.pointRepository.findAll({
                where: {
                    [Op.and]: [{ status: true }, { city: city }],
                },
                include: [{ model: User }]
            })
            return points
        } catch (err) {
            console.log(err)
        }
    }

    async getUserPoint(req) {
        const { id: userId } = req.user
        const point = await this.pointRepository.findOne({
            where: {
                status: true
            },
            include: [{
                model: User,
                where: { id: userId },
            }]
        })

        return point
    }

    async acceptMeeting(pointId, req) {
        try {

            const { id: userId } = req.user

            const existingPoint = await this.pointRepository.findOne({
                where: { status: true }, include: [{
                    model: User,
                    where: { id: userId }
                }]
            })

            if (existingPoint) {
                throw new HttpException('Вы уже записались', HttpStatus.BAD_REQUEST);
            }

            await this.userPointRepository.create({ userId, pointId })

            const point = await this.pointRepository.findOne({
                where: {
                    status: true
                },
                include: [{
                    model: User,
                    where: { id: userId },
                }]
            })

            return point
        }
        catch (error) {
            console.log(error)
        }
    }

    async declineMeeting(pointId, req) {
        try {

            const { id: userId } = req.user

            const existingPoint = await this.pointRepository.findOne({
                where: { status: true }, include: [{
                    model: User,
                    where: { id: userId }
                }]
            })

            if (!existingPoint) {
                throw new HttpException('Вы не записаны', HttpStatus.NOT_ACCEPTABLE);
            }

            await this.userPointRepository.destroy({ where: { userId, pointId: existingPoint.id } })

            return "Запись удалена"
        }
        catch (error) {
            console.log(error)
        }
    }

    async updateStatus() {
        try {
            await this.pointRepository.update({
                status: false
            }, {
                where: {
                    date: {
                        [Op.lte]: new Date()
                    }
                }
            })
            return this.logger.log('Points updated successfully');
        } catch (e) {
            this.logger.error('Something went wrong while updating the points');
        }
    }
}