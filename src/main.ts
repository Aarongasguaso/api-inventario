import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { PrismaClient } from '@prisma/client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración Swagger
  const config = new DocumentBuilder()
    .setTitle('API Inventario')
    .setDescription('API REST para gestión de equipos')
    .setVersion('1.0')
    .addBearerAuth() // Para autenticación JWT en Swagger UI
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

// Prisma client (esto usualmente va en otro archivo, pero lo dejo aquí comentado)
const prisma = new PrismaClient();

// console.log(Object.keys(prisma)); // Puedes activar si necesitas probar Prisma
