import { ProductInfo } from '../models/product-info.model';

export class CreateProductDto {
  name: string;
  price: number;
  image: string;
  description: string;
  typeId: number;
  brandId: number;
  info: string;
}
