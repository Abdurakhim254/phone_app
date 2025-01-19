import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly PrismaService: PrismaService) {}
  async create(createOrderDto: Prisma.OrderCreateInput) {
    return await this.PrismaService.order.create({ data: createOrderDto });
  }

  async findAll() {
    const result = await this.PrismaService.order.findMany();
    if (result.length) return result;
    return `Orderlar topilmadi`;
  }

  async findOne(id: number) {
    const result = await this.PrismaService.order.findUnique({
      where: {
        id,
      },
    });
    if (result) return result;
    return `Order topilmadi`;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const result = await this.PrismaService.order.findUnique({ where: { id } });
    if (result) {
      await this.PrismaService.order.update({
        where: { id },
        data: updateOrderDto,
      });
    }
    return `Yangilanadigan Order topilmadi`;
  }

  async remove(id: number) {
    const result = await this.PrismaService.order.findUnique({ where: { id } });
    if (result) {
      await this.PrismaService.order.delete({ where: { id } });
      return "Order o'chirildi";
    }
    return `O'chiriladigan Order topilmadi`;
  }
}
