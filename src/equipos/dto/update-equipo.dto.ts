import { IsOptional, IsString } from 'class-validator';

export class UpdateEquipoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsString()
  estado?: string;
}
