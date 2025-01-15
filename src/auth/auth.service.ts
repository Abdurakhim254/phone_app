import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { loginAuthdto } from './dto/login-dto';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private User: Repository<User>) {}
  async create(createauthDto: CreateAuthDto) {
    const { email } = createauthDto;
    const result = await this.User.findOne({ where: { email } });
    if (!result) {
      const user = await this.User.create(createauthDto);
      await this.User.save(user);
      return "Ro'yxatdan muvaffaqiyatli o'tdingiz";
    }
    return "Foydalanuvchi allaqachon ro'yxatdan o'tgan";
  }

  async loginservice(loginauthdto: loginAuthdto) {
    const { email, password } = loginauthdto;
    const result = await this.User.findOne({
      where: {
        email,
        password,
      },
    });

    if (!result) {
      return "Ro'yxatdan o'tishingiz kerak";
    }

    return 'Login Muvaffaqiyatli ravishda yakunlandi';
  }
}
