# Imagen base
FROM node:20-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias y archivos
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Compilar el proyecto
RUN npm run build

# Exponer puerto
EXPOSE 3000

# Comando de arranque
CMD ["node", "dist/main"]
