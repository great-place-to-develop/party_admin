# Docker Deployment Guide

This guide explains how to build, run, and deploy the Party Admin application using Docker.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Development with Docker](#development-with-docker)
- [Production Build](#production-build)
- [Docker Compose](#docker-compose)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Docker 20.10 or higher
- Docker Compose 2.0 or higher (optional, for docker-compose usage)

**Install Docker:**

- **macOS/Windows**: [Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Linux**: [Docker Engine](https://docs.docker.com/engine/install/)

Verify installation:

```bash
docker --version
docker-compose --version
```

---

## Quick Start

### Using Docker Compose (Recommended)

**Development:**

```bash
docker-compose up app-dev
```

Access at `http://localhost:5173`

**Production:**

```bash
docker-compose --profile production up app-prod
```

Access at `http://localhost:8080`

### Using Docker Commands

**Build production image:**

```bash
docker build -t party-admin:latest .
```

**Run production container:**

```bash
docker run -p 8080:80 party-admin:latest
```

Access at `http://localhost:8080`

---

## Development with Docker

### Option 1: Docker Compose (Recommended)

```bash
# Start development server
docker-compose up app-dev

# Run in background
docker-compose up -d app-dev

# View logs
docker-compose logs -f app-dev

# Stop
docker-compose down
```

### Option 2: Docker Commands

**Build development image:**

```bash
docker build -f Dockerfile.dev -t party-admin:dev .
```

**Run development container:**

```bash
docker run -p 5173:5173 \
  -v $(pwd):/app \
  -v /app/node_modules \
  --env-file .env \
  party-admin:dev
```

### Features

- ✅ Hot module replacement (HMR)
- ✅ Volume mounting for live code updates
- ✅ Environment variables from `.env` file
- ✅ Node modules cached in volume

---

## Production Build

### Multi-Stage Build

The production Dockerfile uses a multi-stage build:

1. **Build stage**: Compiles the React app
2. **Production stage**: Serves with Nginx

### Build Production Image

```bash
docker build -t party-admin:latest .
```

**With build arguments:**

```bash
docker build \
  --build-arg NODE_ENV=production \
  -t party-admin:latest .
```

### Run Production Container

**Basic:**

```bash
docker run -p 8080:80 party-admin:latest
```

**With environment variables:**

```bash
docker run -p 8080:80 \
  -e VITE_API_BASE_URL=https://api.example.com \
  party-admin:latest
```

**Detached mode:**

```bash
docker run -d \
  -p 8080:80 \
  --name party-admin \
  --restart unless-stopped \
  party-admin:latest
```

### Image Size Optimization

The production image is optimized:

- Uses `node:18-alpine` for building (small base image)
- Uses `nginx:alpine` for serving (minimal runtime)
- Multi-stage build discards build dependencies
- Typical image size: ~40-50MB

---

## Docker Compose

### Development Configuration

```yaml
services:
  app-dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - '5173:5173'
    volumes:
      - .:/app
      - /app/node_modules
    env_file:
      - .env
```

**Commands:**

```bash
# Start
docker-compose up app-dev

# Rebuild
docker-compose up --build app-dev

# Stop
docker-compose down
```

### Production Configuration

```yaml
services:
  app-prod:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '8080:80'
    restart: unless-stopped
    profiles:
      - production
```

**Commands:**

```bash
# Start
docker-compose --profile production up app-prod

# Rebuild
docker-compose --profile production up --build app-prod

# Stop
docker-compose --profile production down
```

---

## Environment Variables

### Build-Time Variables

Environment variables prefixed with `VITE_` are embedded during build:

```dockerfile
# In Dockerfile, before build
ENV VITE_API_BASE_URL=https://api.example.com
RUN npm run build
```

**Or use build args:**

```bash
docker build \
  --build-arg VITE_API_BASE_URL=https://api.example.com \
  -t party-admin:latest .
```

### Runtime Variables

For production, environment variables must be set at **build time** (not runtime) because Vite embeds them during the build process.

**Recommended approach:**

1. Create different images for different environments:

```bash
# Development
docker build --build-arg VITE_API_BASE_URL=http://localhost:3001 -t party-admin:dev .

# Staging
docker build --build-arg VITE_API_BASE_URL=https://api-staging.example.com -t party-admin:staging .

# Production
docker build --build-arg VITE_API_BASE_URL=https://api.example.com -t party-admin:prod .
```

2. Or use environment-specific `.env` files:

```bash
# Build with production env
docker build -t party-admin:prod .
```

---

## Deployment

### Deploy to Cloud Platforms

#### Docker Hub

```bash
# Tag image
docker tag party-admin:latest username/party-admin:latest

# Push to Docker Hub
docker push username/party-admin:latest

# Pull and run on server
docker pull username/party-admin:latest
docker run -d -p 80:80 username/party-admin:latest
```

#### AWS ECR

```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Tag image
docker tag party-admin:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/party-admin:latest

# Push to ECR
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/party-admin:latest
```

#### Google Container Registry

```bash
# Configure Docker for GCR
gcloud auth configure-docker

# Tag image
docker tag party-admin:latest gcr.io/<project-id>/party-admin:latest

# Push to GCR
docker push gcr.io/<project-id>/party-admin:latest
```

### Deploy to Container Platforms

#### AWS ECS

1. Push image to ECR (see above)
2. Create ECS task definition
3. Create ECS service
4. Configure load balancer

#### Google Cloud Run

```bash
# Build and deploy in one command
gcloud run deploy party-admin \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

#### Azure Container Instances

```bash
# Create container instance
az container create \
  --resource-group myResourceGroup \
  --name party-admin \
  --image party-admin:latest \
  --dns-name-label party-admin \
  --ports 80
```

#### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: party-admin
spec:
  replicas: 3
  selector:
    matchLabels:
      app: party-admin
  template:
    metadata:
      labels:
        app: party-admin
    spec:
      containers:
        - name: party-admin
          image: party-admin:latest
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: party-admin
spec:
  type: LoadBalancer
  ports:
    - port: 80
      targetPort: 80
  selector:
    app: party-admin
```

Apply:

```bash
kubectl apply -f kubernetes.yaml
```

---

## Nginx Configuration

The production image uses Nginx with the following features:

- **Gzip compression** for better performance
- **Security headers** (X-Frame-Options, CSP, etc.)
- **Static asset caching** (1 year for JS/CSS/images)
- **React Router support** (all routes serve index.html)
- **Health check endpoint** at `/health`

### Custom Nginx Config

To customize, edit `nginx.conf` and rebuild:

```bash
docker build -t party-admin:latest .
```

---

## Health Checks

The Docker image includes a health check:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/health || exit 1
```

**Check health status:**

```bash
docker ps
# Look for health status in STATUS column
```

**Manual health check:**

```bash
curl http://localhost:8080/health
# Should return: healthy
```

---

## Troubleshooting

### Container won't start

**Check logs:**

```bash
docker logs <container-id>
```

**Inspect container:**

```bash
docker inspect <container-id>
```

### Port already in use

```bash
# Find process using port
lsof -i :8080

# Or use different port
docker run -p 9090:80 party-admin:latest
```

### Build fails

**Clear Docker cache:**

```bash
docker build --no-cache -t party-admin:latest .
```

**Check disk space:**

```bash
docker system df
docker system prune -a
```

### Environment variables not working

Remember: Vite embeds env vars at **build time**, not runtime.

**Rebuild with correct variables:**

```bash
docker build \
  --build-arg VITE_API_BASE_URL=https://api.example.com \
  -t party-admin:latest .
```

### Volume mounting issues (development)

**On Windows, use WSL2 path:**

```bash
docker run -v /mnt/c/Users/username/project:/app ...
```

**On macOS, ensure Docker Desktop has file sharing enabled**

### Nginx 404 errors

This usually means React Router isn't configured properly.

**Verify nginx.conf includes:**

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Performance issues

**Enable BuildKit for faster builds:**

```bash
export DOCKER_BUILDKIT=1
docker build -t party-admin:latest .
```

**Use layer caching:**

```dockerfile
# Copy package files first (cached if unchanged)
COPY package*.json ./
RUN npm ci

# Then copy source (changes more often)
COPY . .
```

---

## Best Practices

### Security

1. **Don't include secrets in image**
   - Use environment variables
   - Use Docker secrets for sensitive data

2. **Use specific base image versions**

   ```dockerfile
   FROM node:18.17.0-alpine
   ```

3. **Run as non-root user** (if needed):

   ```dockerfile
   RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
   USER nodejs
   ```

### Performance

1. **Multi-stage builds** - Already implemented
2. **Alpine images** - Smaller, faster
3. **Layer caching** - Copy package.json before source code
4. **.dockerignore** - Exclude unnecessary files

### Production

1. **Use specific tags** instead of `latest`
2. **Implement health checks** - Already included
3. **Set resource limits**:
   ```bash
   docker run --memory="512m" --cpus="1" party-admin:latest
   ```
4. **Use restart policies**:
   ```bash
   docker run --restart unless-stopped party-admin:latest
   ```

---

## Common Commands Cheat Sheet

```bash
# Build
docker build -t party-admin:latest .
docker build -f Dockerfile.dev -t party-admin:dev .

# Run
docker run -p 8080:80 party-admin:latest
docker run -d -p 8080:80 --name party-admin party-admin:latest

# Logs
docker logs party-admin
docker logs -f party-admin

# Shell access
docker exec -it party-admin sh

# Stop/Start
docker stop party-admin
docker start party-admin
docker restart party-admin

# Remove
docker rm party-admin
docker rmi party-admin:latest

# Clean up
docker system prune -a
docker volume prune

# Docker Compose
docker-compose up
docker-compose up -d
docker-compose down
docker-compose logs -f
docker-compose ps
```

---

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

For questions or issues, please refer to the main [README.md](./README.md) or create an issue on GitHub.
