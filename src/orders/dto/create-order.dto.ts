import { IsString, IsNumber, MinLength, Min } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @MinLength(25)
  productname: string;
  @IsNumber()
  @Min(100)
  productprice: number;
}
