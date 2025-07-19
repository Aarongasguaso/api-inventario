import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';

@Injectable()
export class EquiposService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateEquipoDto) {
    return this.prisma.equipo.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.equipo.findMany();
  }

  async findOne(id: number) {
    const equipo = await this.prisma.equipo.findUnique({
      where: { id },
    });
    if (!equipo) throw new NotFoundException(`Equipo con ID ${id} no encontrado`);
    return equipo;
  }

  async update(id: number, data: Partial<CreateEquipoDto>) {
    const equipo = await this.findOne(id); // Verifica que exista
    return this.prisma.equipo.update({
      where: { id: equipo.id },
      data,
    });
  }

  async delete(id: number) {
    const equipo = await this.findOne(id); // Verifica que exista
    return this.prisma.equipo.delete({
      where: { id: equipo.id },
    });
  }
}

