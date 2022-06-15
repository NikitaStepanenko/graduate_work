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
import { CreateBrandDto } from './dto/create-brand-dto';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateRatingDto } from './dto/create-rating-dto';
import { CreateSubCategoryDto } from './dto/create-subcategory-dto';
import { GetProductsQuery } from './dto/get-products-query';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createProduct(@Body() dto: CreateProductDto, @UploadedFile() image) {
    return this.productsService.createProduct(dto, image);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/rating')
  postRating(@Body() dto: CreateRatingDto, @Request() req) {
    return this.productsService.postRating(dto, req);
  }

  @Get('/categories')
  getAllCategories() {
    return this.productsService.getAllCategories();
  }

  @Get('/brands')
  getAllBrands() {
    return this.productsService.getAllBrands();
  }


  @Get()
  getAllProducts(@Query() query: GetProductsQuery) {
    return this.productsService.getAllProducts(query);
  }

  @Get('/:id')
  getOneProduct(@Param('id') id: number) {
    return this.productsService.getOneProduct(id);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/subcategory')
  createSubCategory(@Body() dto: CreateSubCategoryDto) {
    return this.productsService.createSubCategory(dto);
  }


  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/brand')
  createBrand(@Body() dto: CreateBrandDto) {
    return this.productsService.createBrand(dto);
  }


}
