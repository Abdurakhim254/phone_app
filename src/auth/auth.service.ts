import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { loginAuthdto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly PrismaService: PrismaService,
    private jwtservice: JwtService,
  ) {}
  async create(createauthDto: Prisma.UserCreateInput) {
    const { email } = createauthDto;
    const result = await this.PrismaService.user.findUnique({
      where: { email },
    });
    if (!result) {
      await this.PrismaService.user.create({ data: createauthDto });
      return "Ro'yxatdan muvaffaqiyatli o'tdingiz";
    }
    return "Foydalanuvchi allaqachon ro'yxatdan o'tgan";
  }

  async loginservice(loginauthdto: loginAuthdto) {
    const { email, password } = loginauthdto;
    const result = await this.PrismaService.user.findUnique({
      where: {
        email,
        password,
      },
    });

    if (!result) {
      return "Ro'yxatdan o'tishingiz kerak";
    }
    const { role } = result;
    const payload = { email, role };
    await this.PrismaService.user.update({
      where: { email },
      data: {
        isactive: true,
      },
    });
    const assessToken = await this.jwtservice.signAsync(payload);
    return { assessToken };
  }

  async refreshtokenservice(token: string) {
    const data = await this.jwtservice.verify(token);
    const { email, role } = data;
    const payload = { email, role };
    const accessToken = await this.jwtservice.signAsync(payload);
    return { accessToken, refreshtoken: token };
  }
}
