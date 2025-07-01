import { Module } from '@nestjs/common';
import { InventarioModule } from './inventario/inventario.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [InventarioModule, AuthModule, UsersModule],
})
export class AppModule {}
