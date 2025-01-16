import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private Product: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const product = await this.Product.create(createProductDto);
    await this.Product.save(product);
    return 'Product yaratildi';
  }

  async findAll() {
    const result = await this.Product.find();
    if (result.length) return result;
    return `Productlar topilmadi`;
  }

  async findOne(id: number) {
    const result = await this.Product.findOne({
      where: {
        id,
      },
    });
    if (result) return result;
    return `Product topilmadi`;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const result = await this.Product.findOne({ where: { id } });
    if (result) {
      await this.Product.update({ id }, updateProductDto);
      return 'Product yangilandi';
    }
    return 'Yangilanadigan Product topilmadi';
  }

  async remove(id: number) {
    const result = await this.Product.findOne({ where: { id } });
    if (result) {
      await this.Product.delete({ id });
      return "Product o'chirildi";
    }
    return `O'chiriladigan product topilmadi`;
  }
}
