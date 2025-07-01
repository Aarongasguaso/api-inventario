import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { InventarioItem } from './interfaces/inventario-item.interface';

@Injectable()
export class InventarioService {
  private inventario: InventarioItem[] = [];
  private idCounter = 1;

  create(data: CreateInventarioDto): InventarioItem {
    const nuevoItem: InventarioItem = { id: this.idCounter++, ...data };
    this.inventario.push(nuevoItem);
    return nuevoItem;
  }

  findAll(): InventarioItem[] {
    return this.inventario;
  }

  findOne(id: number): InventarioItem {
    const item = this.inventario.find(i => i.id === id);
    if (!item) throw new NotFoundException('Item no encontrado');
    return item;
  }

  update(id: number, data: Partial<CreateInventarioDto>): InventarioItem {
    const item = this.findOne(id);
    Object.assign(item, data);
    return item;
  }

  remove(id: number) {
    const index = this.inventario.findIndex(i => i.id === id);
    if (index === -1) throw new NotFoundException('Item no encontrado');
    this.inventario.splice(index, 1);
    return { message: 'Eliminado' };
  }
}
