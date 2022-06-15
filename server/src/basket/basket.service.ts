import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from 'src/products/models/brand.model';
import { Category } from 'src/products/models/category.model';
import { ProductInfo } from 'src/products/models/product-info.model';
import { Product } from 'src/products/models/product.model';
import { Rating } from 'src/products/models/rating.model';
import { SubCategory } from 'src/products/models/subcategory.model';
import { User } from 'src/users/user.model';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { BasketProduct } from './models/basket-product.model';
import { Basket } from './models/basket.model';

@Injectable()
export class BasketService {
    constructor(
        @InjectModel(Product) private productRepository: typeof Product,
        @InjectModel(Basket) private basketRepository: typeof Basket,
        @InjectModel(BasketProduct) private basketProductRepository: typeof BasketProduct
    ) { }

    async addToCart(dto: AddToCartDto, req) {
        try {
            const { productId, count } = dto
            const { id: userId } = req.user

            let existingBasket = await this.basketRepository.findOne({ where: { userId } })
            if (!existingBasket) {
                existingBasket = await this.basketRepository.create({ userId })
            }

            let existingBasketProduct = await this.basketProductRepository.findOne({
                where: {
                    productId,
                    basketId: existingBasket.id
                }
            })

            if (!existingBasketProduct) {
                existingBasketProduct = await this.basketProductRepository.create({
                    count,
                    productId,
                    basketId: existingBasket.id
                })
            } else {
                existingBasketProduct.set({
                    count: existingBasketProduct.count + count
                })
                await existingBasketProduct.save()
            }

            return existingBasketProduct
        }
        catch (e) {

        }
    }

    async removeFromCart(dto: AddToCartDto, req) {
        try {
            const { productId, count } = dto
            const { id: userId } = req.user

            let existingBasket = await this.basketRepository.findOne({ where: { userId } })
            if (!existingBasket) {
                existingBasket = await this.basketRepository.create({ userId })
            }

            let existingBasketProduct = await this.basketProductRepository.findOne({
                where: {
                    productId,
                    basketId: existingBasket.id
                }
            })

            if (!existingBasketProduct) {
                throw new HttpException('Товар не найден', HttpStatus.NOT_FOUND);
            }

            if (existingBasketProduct.count === 1) {
                return await existingBasketProduct.destroy()
            }
            existingBasketProduct.set({
                count: existingBasketProduct.count - count
            })
            await existingBasketProduct.save()

            return existingBasketProduct
        }
        catch (e) {

        }
    }

    async removeAll(req) {
        const { id: userId } = req.user
        await this.basketRepository.destroy({ where: { userId } })
    }

    async getCart(req) {
        try {
            const { id: userId } = req.user

            let existingBasket = await this.basketRepository.findOne({ where: { userId } })
            if (!existingBasket) {
                existingBasket = await this.basketRepository.create({ userId })
            }

            existingBasket = await this.basketRepository.findOne({
                where: { userId },
                include: [{
                    model: BasketProduct,
                    include: [{
                        model: Product,
                        as: "product",
                        include: [
                            { model: Rating },
                            {
                                model: SubCategory,
                                include: [{ model: Category }]
                            },
                            { model: Brand }],
                    }]
                }]
            })
            return existingBasket
        }
        catch (e) {

        }
    }
}
