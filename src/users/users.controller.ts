import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) // Aplica los guards a todo el controlador
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ✅ Solo ADMIN puede ver todos los usuarios
  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  // ✅ ADMIN y USER pueden buscar por username
  @Get(':username')
  @Roles(Role.ADMIN, Role.USER)
  findOne(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  // ✅ Solo ADMIN puede crear usuarios
  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // ✅ Solo ADMIN puede eliminar usuarios
  @Delete(':id')
  @Roles(Role.ADMIN)
  delete(@Param('id') id: string) {
    return this.usersService.delete(Number(id));
  }
}
