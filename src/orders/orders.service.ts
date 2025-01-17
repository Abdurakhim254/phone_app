import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Or, Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private Order: Repository<Order>) {}
  async create(createOrderDto: CreateOrderDto) {
    const prod = await this.Order.create(createOrderDto);
    await this.Order.save(prod);
    return `Order qo'shildi`;
  }

  async findAll() {
    const result = await this.Order.find();
    if (result.length) return result;
    return `Orderlar topilmadi`;
  }

  async findOne(id: number) {
    const result = await this.Order.findOne({
      where: {
        id,
      },
    });
    if (result) return result;
    return `Order topilmadi`;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const result = await this.Order.findOne({ where: { id } });
    if (result) {
      await this.Order.update({ id }, updateOrderDto);
    }
    return `Yangilanadigan Order topilmadi`;
  }

  async remove(id: number) {
    const result = await this.Order.findOne({ where: { id } });
    if (result) {
      await this.Order.delete({ id });
      return "Order o'chirildi";
    }
    return `O'chiriladigan Order topilmadi`;
  }
}
