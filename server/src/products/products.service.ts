import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { Product } from './models/product.model';
import { CreateSubCategoryDto } from './dto/create-subcategory-dto';
import { SubCategory } from './models/subcategory.model';
import { Brand } from './models/brand.model';
import { CreateBrandDto } from './dto/create-brand-dto';
import { Rating } from './models/rating.model';
import { ProductInfo } from './models/product-info.model';
import { GetProductsQuery } from './dto/get-products-query';
import { Category } from './models/category.model';
import { CreateRatingDto } from './dto/create-rating-dto';
import { User } from 'src/users/user.model';
import { BasketProduct } from 'src/basket/models/basket-product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
    @InjectModel(SubCategory) private subCategoryRepository: typeof SubCategory,
    @InjectModel(Category) private CategoryRepository: typeof Category,
    @InjectModel(Brand) private brandRepository: typeof Brand,
    @InjectModel(ProductInfo) private productInfoRepository: typeof ProductInfo,
    @InjectModel(Rating) private ratingRepository: typeof Rating,
    private fileService: FilesService,
  ) { }

  async createProduct(dto: CreateProductDto, image: any) {
    try {
      const fileName = await this.fileService.createFile(image);
      let { name, price, brandId, typeId, info, description } = dto;
      const product = await this.productRepository.create({
        name,
        price,
        typeId,
        brandId,
        description,
        image: fileName,
      });


      if (info) {
        const infoArr: ProductInfo[] = JSON.parse(info)
        infoArr.forEach(async (i) => {
          try {
            await this.productInfoRepository.create({
              title: i.title,
              description: i.description,
              productId: product.id,
            })
          } catch (err) {
            console.log(err.message);
          }
        }
        );
      }
      return product;
    }
    catch (err) {
      console.log('/////////////////////////', err);
    }
  }

  async getAllProducts(query: GetProductsQuery) {
    let { typeId, limit, page } = query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let products;

    if (!typeId) {
      products = await this.productRepository.findAndCountAll({
        distinct: true,
        include: { all: true },
        limit,
        offset,
      });
    }

    if (typeId) {
      products = await this.productRepository.findAndCountAll({
        where: { typeId },
        include: { all: true },
        limit,
        offset,
      });
    }

    return products;
  }

  async getOneProduct(id: number) {
    const device = await this.productRepository.findOne({
      where: { id },
      order: [[{ model: Rating, as: "ratings" }, 'createdAt', 'desc'],],
      include: [{ model: ProductInfo, as: 'info' },
      { model: Rating, include: [{ model: User, attributes: { exclude: ['password'] } }] },
      { model: SubCategory, include: [{ model: Category }] },
      { model: Brand }],
    });
    return device;
  }

  async createSubCategory(dto: CreateSubCategoryDto) {
    const type = await this.subCategoryRepository.create(dto);
    return type;
  }

  async getAllCategories() {
    const types = await this.CategoryRepository.findAll({ include: { model: SubCategory } });
    return types;
  }

  async createBrand(dto: CreateBrandDto) {
    const type = await this.brandRepository.create(dto);
    return type;
  }

  async getAllBrands() {
    const brands = await this.brandRepository.findAll();
    return brands;
  }

  async postRating(dto: CreateRatingDto, req) {
    try {
      const { productId, rate, comment } = dto
      const { id: userId } = req.user
      const existingRating = await this.ratingRepository.findOne({ where: { productId, userId } })
      if (existingRating) {
        throw new HttpException('Доступ запрещен', HttpStatus.FORBIDDEN);
      }

      const newRating = await this.ratingRepository.create({
        productId,
        rate,
        comment,
        userId
      })

      return newRating
    } catch (err) {

    }
  }
}
