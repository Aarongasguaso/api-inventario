import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInventarioDto {
  @ApiProperty({ example: 'Laptop Dell' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Equipo de informática' })
  @IsString()
  descripcion: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  cantidad: number;
}
