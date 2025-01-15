import {IsString,IsEmail,IsStrongPassword,MinLength, IsNumber, Min, IsBoolean} from "class-validator"

export class CreateAuthDto {
    @IsString()
    @MinLength(50)
    name:String
    @IsString()
    @MinLength(50)
    familya:string
    @IsString()
    @IsEmail()
    @MinLength(50)
    email:string
    @IsString()
    @IsStrongPassword()
    @MinLength(50)
    password:string
    @IsNumber()
    @Min(10)
    phone_number:number
    @IsString()
    role:string
    @IsBoolean()
    isactive:boolean
}
