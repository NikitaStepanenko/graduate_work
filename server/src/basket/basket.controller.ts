import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { BasketService } from './basket.service';
import { AddToCartDto } from './dto/add-to-cart.dto';


@Controller('basket')
export class BasketController {
  constructor(private basketService: BasketService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post('/removeAll')
  removeAll(@Request() req) {
    return this.basketService.removeAll(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post("/add")
  addToCart(@Body() dto: AddToCartDto, @Request() req) {
    return this.basketService.addToCart(dto, req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/remove')
  removeFromCart(@Body() dto: AddToCartDto, @Request() req) {
    return this.basketService.removeFromCart(dto, req);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getCart(@Request() req) {
    return this.basketService.getCart(req);
  }


}
