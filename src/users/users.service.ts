import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear un nuevo usuario
  async create(data: CreateUserDto) {
    return this.prisma.user.create({
      data,
    });
  }

  // Obtener todos los usuarios
  async findAll() {
    return this.prisma.user.findMany();
  }

  // Buscar un usuario por su username
  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  // Buscar un usuario por su email
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Eliminar un usuario por ID
  async delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
