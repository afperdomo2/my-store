## 💻Project Setup

```sh
# Install dependencies
npm install

# Run Development
npm run dev

# Run Production
npm run start

# Run linter
npm run lint
```

## 🐳 Docker

```sh
# Build the image
docker build -t my-store-image .

# Run the container
docker run -d -p 3000:3000 --name my-store my-store-image
```

## 🐳 Docker Compose

```sh
# Ejecutar todos los contenedores
docker-compose up -d

# Ejecutarlos de forma individual
docker-compose up -d postgres
docker-compose up -d pgadmin
```
