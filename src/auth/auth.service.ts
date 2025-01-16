import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { loginAuthdto } from './dto/login-dto';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private User: Repository<User>,
    private jwtservice: JwtService,
  ) {}
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
    const { role } = result;
    const payload = { email, role };
    await this.User.update({ email }, { isactive: true });
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
