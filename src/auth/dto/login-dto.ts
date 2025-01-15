import {IsString,IsEmail,IsStrongPassword} from "class-validator"

export class loginAuthdto{
    @IsString()
    @IsEmail()
    email:string
    @IsString()
    @IsStrongPassword()
    password:string
}