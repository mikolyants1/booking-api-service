import { IsDate, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookingDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: string;

  @IsString()
  @IsNotEmpty()
  restaurant: string;

  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  guests: number;
}
