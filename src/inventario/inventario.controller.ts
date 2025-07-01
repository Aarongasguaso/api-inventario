import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InventarioItem } from './interfaces/inventario-item.interface';

@ApiTags('inventario')
@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

@Post()
@ApiOperation({ summary: 'Crear un nuevo ítem de inventario' })
@ApiResponse({ status: 201, description: 'Ítem creado exitosamente.' })
create(@Body() dto: CreateInventarioDto): InventarioItem {
  return this.inventarioService.create(dto);
}

@Get()
@ApiOperation({ summary: 'Listar todo el inventario' })
@ApiResponse({ status: 200, description: 'Listado completo del inventario.' })
findAll(): InventarioItem[] {
  return this.inventarioService.findAll();
}

@Get(':id')
@ApiOperation({ summary: 'Obtener un ítem por ID' })
@ApiResponse({ status: 200, description: 'Ítem encontrado.' })
findOne(@Param('id', ParseIntPipe) id: number): InventarioItem {
  return this.inventarioService.findOne(id);
}

@Put(':id')
@ApiOperation({ summary: 'Actualizar un ítem por ID' })
@ApiResponse({ status: 200, description: 'Ítem actualizado correctamente.' })
update(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: Partial<CreateInventarioDto>,
): InventarioItem {
  return this.inventarioService.update(id, dto);
}

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un ítem por ID' })
  @ApiResponse({ status: 200, description: 'Ítem eliminado correctamente.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.inventarioService.remove(id);
  }
}
