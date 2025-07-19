import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // 👈 importar ConfigModule
import { PrismaModule } from './prisma/prisma.module';
import { EquiposModule } from './equipos/equipos.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 👈 habilitar variables de entorno globalmente
    PrismaModule,
    EquiposModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
