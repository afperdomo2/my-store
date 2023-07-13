## 💻Project Setup

```sh
npm install
```

### Run Development

```sh
npm run dev
```

### Run Production

```sh
npm run start
```

### Run linter

```sh
npm run lint
```

## 🐳 Docker

### Build the image

```sh
docker build -t my-store-image .
```

### Run the container

```sh
docker run -d -p 3000:3000 --name my-store my-store-image
```

## 🐳 Docker Compose

### PostgreSQL

```sh
docker-compose up -d postgres
```
