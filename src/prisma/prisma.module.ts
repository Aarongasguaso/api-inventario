import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Hace que PrismaService esté disponible en toda la app sin tener que importarlo módulo por módulo
@Module({
  providers: [PrismaService], // Registra el servicio
  exports: [PrismaService],   // Lo exporta para que otros módulos puedan usarlo
})
export class PrismaModule {}
