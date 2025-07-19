import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role } from '@prisma/client';
import { CreateUserDto } from '../users/dto/create-user.dto'; // Asegúrate de tener este DTO

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return this.authService.login(user);
  }

  @Post('simulate-login')
  simulateLogin(@Body() body: { username: string; role: Role }) {
    const fakeUser = {
      id: 999, // ID ficticio para pruebas
      username: body.username,
      role: body.role,
    };

    return this.authService.login(fakeUser);
  }

  // ✅ NUEVO ENDPOINT: /auth/register
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
