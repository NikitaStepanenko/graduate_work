import { Body, Controller, Get, Post } from '@nestjs/common';
import { YoomoneyService } from './yoomoney.service';

@Controller('yoomoney')
export class YoomoneyController {
    constructor(private yoomoneyService: YoomoneyService) { }

    @Post()
    checkout(@Body() dto: string) {
        return this.yoomoneyService.checkout(dto)
    }
}
