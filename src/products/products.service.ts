import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly PrismaService: PrismaService) {}

  async create(
    createProductDto: Prisma.ProductCreateInput,
  ): Promise<Product | string> {
    return await this.PrismaService.product.create({ data: createProductDto });
  }

  async findAll(): Promise<Product[] | string> {
    const result = await this.PrismaService.product.findMany();
    if (result.length) return result;
    return `Productlar topilmadi`;
  }

  async findOne(id: number) {
    const result = await this.PrismaService.product.findUnique({
      where: {
        id,
      },
    });
    if (result) return result;
    return `Product topilmadi`;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const result = await this.PrismaService.product.findUnique({
      where: { id },
    });
    if (result) {
      await this.PrismaService.product.update({
        where: { id },
        data: updateProductDto,
      });
      return 'Product yangilandi';
    }
    return 'Yangilanadigan Product topilmadi';
  }

  async remove(id: number) {
    const result = await this.PrismaService.product.findUnique({
      where: { id },
    });
    if (result) {
      await this.PrismaService.product.delete({ where: { id } });
      return "Product o'chirildi";
    }
    return `O'chiriladigan product topilmadi`;
  }
}
