import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

// Clave personalizada que usará el RolesGuard para acceder a los metadatos
export const ROLES_KEY = 'roles';

/**
 * Decorador personalizado que asigna roles a una ruta.
 * Ejemplo de uso: @Roles('ADMIN', 'TECNICO')
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
