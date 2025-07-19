import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { Role } from '@prisma/client'; // Asegúrate de tener el enum o cámbialo por tu definición
import { CreateUserDto } from '../users/dto/create-user.dto'; // Importa el DTO de creación de usuario

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Validación real de usuario y contraseña
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const { password: _, ...result } = user;
    return result;
  }

  // Generación de token JWT con el rol incluido
  async login(user: { id: number; username: string; role: Role }) {
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Método para registrar un usuario nuevo
  async register(createUserDto: CreateUserDto) {
    // Verificar si el usuario ya existe
    const existingUser = await this.usersService.findByUsername(createUserDto.username);
    if (existingUser) {
      throw new ConflictException('El usuario ya existe');
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Crear el usuario
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
      role: createUserDto.role || Role.USER, // Role por defecto USER si no viene
    });

    // Generar token automáticamente al registrar
    return this.login({
      id: newUser.id,
      username: newUser.username,
      role: newUser.role,
    });
  }
}
