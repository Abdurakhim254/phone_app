import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly PrismaService: PrismaService) {}
  async create(createUserDto: Prisma.UserCreateInput): Promise<User | String> {
    const { email } = createUserDto;
    const result = await this.PrismaService.user.findUnique({
      where: { email },
    });
    if (result) {
      return "Foydalanuvchi allaqachon ro'yxatdan o'tgan";
    }
    return await this.PrismaService.user.create({ data: createUserDto });
  }

  async findAll(): Promise<User[]> {
    const result = await this.PrismaService.user.findMany();
    return result;
  }

  async findOne(id: number): Promise<User | String> {
    const result = await this.PrismaService.user.findUnique({ where: { id } });
    if (result) return result;
    return `Foydalanuvchi topilmadi`;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | String> {
    const result = await this.PrismaService.user.findUnique({ where: { id } });
    if (result) {
      return await this.PrismaService.user.update({
        where: { id },
        data: updateUserDto,
      });
    }
    return 'Yangilanadigan Foydalanuvchi topilmadi';
  }

  async remove(id: number) {
    const result = await this.PrismaService.user.findUnique({ where: { id } });
    if (result) {
      await this.PrismaService.user.delete({ where: { id } });
      return "Foydalanuvchi o'chirildi";
    }
    return `O'chiriladigan foydalanuvchi topilmadi`;
  }
}
