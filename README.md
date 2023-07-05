## 🐳 Docker

### Build the image

```sh
docker build -t my-store-image .
```

### Run the container

```sh
docker run -d -p 3000:3000 --name my-store my-store-image
```
