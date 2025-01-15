import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import {ConfigModule} from "@nestjs/config"
import {TypeOrmModule} from "@nestjs/typeorm"
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule,ConfigModule.forRoot({
    envFilePath:'.env',
    isGlobal:true
  }),
  TypeOrmModule.forRoot({
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'root',
    database:'postgres',
    entities:[],
    autoLoadEntities:true
,
    synchronize:true  
  }),
  AuthModule  
],
 
})
export class AppModule {}
