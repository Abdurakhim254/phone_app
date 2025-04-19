import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtservice: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const [type, token] = req.headers.authorization.split(' ');
    const roles: string[] = ['ADMIN', 'superAdmin'];
    if (type === 'Bearer' && token) {
      const data = await this.jwtservice.decode(token);
      return roles.includes(data.role)
  }
}
