import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { loginAuthdto } from './dto/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('signIn')
  register(@Body() loginauthdto: loginAuthdto) {
    return this.authService.loginservice(loginauthdto);
  }
  @Post('refreshtoken')
  refreshtokencon(@Body() accessToken) {
    const token = accessToken.assessToken;
    return this.authService.refreshtokenservice(token);
  }
}
