# Usa la imagen oficial de node
FROM node:18.16.0

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias
RUN npm install --production

# Copiamos todo el código fuente al contenedor
COPY . .

# Exponer el puerto de la API
EXPOSE 3000

# Ejecutar la aplicación
CMD [ "node", "index.js" ]
