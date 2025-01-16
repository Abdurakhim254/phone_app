import { IsString, IsNumber, MinLength, Min } from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  memory: number;
  @IsString()
  @MinLength(5)
  model: string;
  @IsNumber()
  @Min(4)
  ram: number;
  @IsString()
  @MinLength(4)
  year: string;
  @IsNumber()
  price: number;
}
