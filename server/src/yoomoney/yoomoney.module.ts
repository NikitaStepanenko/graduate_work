import { Module } from '@nestjs/common';
import { YoomoneyController } from './yoomoney.controller';
import { YoomoneyService } from './yoomoney.service';

@Module({
  controllers: [YoomoneyController],
  providers: [YoomoneyService]
})
export class YoomoneyModule { }
