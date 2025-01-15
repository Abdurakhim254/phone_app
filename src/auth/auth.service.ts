import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { loginAuthdto } from './dto/login-dto';

@Injectable()
export class AuthService {
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  loginservice(loginauthdto:loginAuthdto){
    return loginauthdto
  }

  u
}
