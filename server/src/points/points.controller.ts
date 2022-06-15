import { Body, Controller, Get, Logger, Param, Post, Request, UseGuards } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddPointDto } from './dto/create-point-dto';
import { PointsService } from './points.service';

@Controller('points')
export class PointsController {
    constructor(private pointsService: PointsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('/user')
    getUserPoint(@Request() req) {
        return this.pointsService.getUserPoint(req)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/add')
    addPoint(@Body() dto: AddPointDto, @Request() req) {
        return this.pointsService.addPoint(dto, req)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:city')
    getPoints(@Request() req, @Param('city') city: number) {
        return this.pointsService.getPoints(city, req)
    }

    @Cron('*/10 * * * *')
    handleCron() {
        this.pointsService.updateStatus()
    }

    @UseGuards(JwtAuthGuard)
    @Post('accept/:pointId')
    acceptMeeting(@Param('pointId') pointId: number, @Request() req) {
        return this.pointsService.acceptMeeting(pointId, req)
    }

    @UseGuards(JwtAuthGuard)
    @Post('decline/:pointId')
    declineMeeting(@Param('pointId') pointId: number, @Request() req) {
        return this.pointsService.declineMeeting(pointId, req)
    }
}
