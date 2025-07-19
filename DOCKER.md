# Docker Deployment Guide

This guide covers how to run the Chinese Radical Analyzer using Docker for both development and production environments.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (version 20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0+)
- Git (for production deployments)

## Quick Start (Development)

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd chinese-radicals
   ```

2. **Start the development environment**:
   ```bash
   ./docker/dev.sh start
   ```

3. **Access the application**:
   - Frontend: http://localhost:3000
   - API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Architecture

The application consists of three main services:

- **Frontend**: SvelteKit application (Node.js)
- **API**: FastAPI application (Python)
- **Nginx**: Reverse proxy (production only)

## Development Environment

### Using the Dev Script (Recommended)

The `./docker/dev.sh` script provides convenient commands for managing the development environment:

```bash
# Start development environment
./docker/dev.sh start

# Stop development environment
./docker/dev.sh stop

# Restart services
./docker/dev.sh restart

# View logs (all services)
./docker/dev.sh logs

# View logs (specific service)
./docker/dev.sh logs api
./docker/dev.sh logs frontend

# Rebuild services
./docker/dev.sh rebuild

# Rebuild specific service
./docker/dev.sh rebuild api

# Clean up Docker resources
./docker/dev.sh cleanup
```

### Using Docker Compose Directly

If you prefer to use Docker Compose directly:

```bash
# Start development environment
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop environment
docker-compose down

# Rebuild a specific service
docker-compose build --no-cache api
docker-compose up -d api
```

### Development Features

- **Hot Reloading**: Both frontend and backend support hot reloading
- **Volume Mounts**: Source code is mounted for real-time development
- **Health Checks**: Automatic service health monitoring
- **Service Dependencies**: Frontend waits for API to be healthy before starting

## Production Environment

### Using the Prod Script (Recommended)

The `./docker/prod.sh` script provides production deployment and management:

```bash
# Deploy to production
./docker/prod.sh deploy

# Update production environment
./docker/prod.sh update

# Stop production environment
./docker/prod.sh stop

# View logs
./docker/prod.sh logs

# Check status
./docker/prod.sh status

# Create backup
./docker/prod.sh backup

# Restore from backup
./docker/prod.sh restore ./backups/20240101_1200

# Scale services
./docker/prod.sh scale api 3
```

### Manual Production Deployment

```bash
# Deploy with production compose file
docker-compose -f docker-compose.prod.yml up --build -d

# View status
docker-compose -f docker-compose.prod.yml ps

# Scale API service
docker-compose -f docker-compose.prod.yml up -d --scale api=3
```

### Production Features

- **Multi-worker API**: Uses multiple Uvicorn workers for better performance
- **Resource Limits**: CPU and memory limits configured
- **Logging**: Structured logging with rotation
- **Health Checks**: Production-ready health monitoring
- **Nginx Reverse Proxy**: Optional load balancing and SSL termination

## Environment Configuration

### Development Environment Variables

Create a `.env` file (copy from `.env.example`):

```bash
# API Configuration
VITE_API_URL=http://localhost:8000

# Development specific
NODE_ENV=development
FASTAPI_ENV=development
```

### Production Environment Variables

```bash
# API Configuration
VITE_API_URL=https://your-domain.com/api

# Production specific
NODE_ENV=production
FASTAPI_ENV=production

# Optional: Database connection (for future database integration)
# DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

## Service Configuration

### Frontend Service

- **Port**: 3000
- **Framework**: SvelteKit with Node.js
- **Build**: Multi-stage Docker build for optimization
- **Features**: Static file serving, SPA routing

### API Service

- **Port**: 8000
- **Framework**: FastAPI with Python 3.11
- **Workers**: 1 (development) / 4 (production)
- **Features**: Automatic API documentation, health checks

### Nginx Service (Production Only)

- **Ports**: 80 (HTTP), 443 (HTTPS)
- **Features**: Reverse proxy, load balancing, SSL termination
- **Configuration**: `nginx/nginx.conf`

## Networking

All services communicate through a custom Docker network:

- **Network Name**: `chinese-radicals-network`
- **Type**: Bridge network
- **Internal Communication**: Services can communicate using service names
- **External Access**: Only specified ports are exposed to the host

## Volumes and Data Persistence

### Development Volumes

- Source code mounted for hot reloading
- Node modules and Python virtual environments excluded

### Production Volumes

- Named volumes for data persistence
- Backup-friendly volume structure

## Monitoring and Logging

### Health Checks

All services include health checks:

- **API**: HTTP health endpoint (`/health`)
- **Frontend**: HTTP status check
- **Intervals**: 30s checks with 10s timeout

### Logging

- **Development**: Console output with colors
- **Production**: JSON formatted logs with rotation
- **Log Limits**: 10MB per file, 3 files maximum

## Troubleshooting

### Common Issues

1. **Port Already in Use**:
   ```bash
   # Find process using port
   lsof -i :3000
   lsof -i :8000
   
   # Stop existing containers
   docker-compose down
   ```

2. **Permission Denied**:
   ```bash
   # Make scripts executable
   chmod +x docker/dev.sh docker/prod.sh
   ```

3. **Out of Disk Space**:
   ```bash
   # Clean up Docker resources
   ./docker/dev.sh cleanup
   
   # Or manually
   docker system prune -a
   ```

4. **Service Won't Start**:
   ```bash
   # Check logs
   ./docker/dev.sh logs <service-name>
   
   # Rebuild service
   ./docker/dev.sh rebuild <service-name>
   ```

### Debug Mode

To run services in debug mode:

```bash
# Run with debug logging
DEBUG=1 ./docker/dev.sh start

# Or set in docker-compose.yml
environment:
  - DEBUG=1
  - LOG_LEVEL=debug
```

## Performance Optimization

### Production Optimizations

- Multi-stage builds reduce image size
- Nginx caching for static assets
- Gzip compression enabled
- Connection pooling for API
- Resource limits prevent resource exhaustion

### Scaling Guidelines

```bash
# Scale API for high load
./docker/prod.sh scale api 4

# Monitor resource usage
docker stats
```

## Security Considerations

### Development

- Services run as non-root users
- Internal network isolation
- No sensitive data in images

### Production

- SSL/TLS termination at Nginx
- Security headers configured
- Rate limiting enabled
- Regular security updates recommended

## Backup and Recovery

### Automated Backups

```bash
# Create backup
./docker/prod.sh backup

# Backups stored in ./backups/ with timestamp
```

### Manual Backup

```bash
# Backup API data
docker cp chinese-radicals-api-prod:/app/data ./backup-data

# Backup database (when applicable)
docker exec chinese-radicals-db pg_dump -U user dbname > backup.sql
```

### Recovery

```bash
# Restore from backup
./docker/prod.sh restore ./backups/20240101_1200

# Or manually
docker cp ./backup-data chinese-radicals-api-prod:/app/data
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: ./docker/prod.sh update
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [SvelteKit Docker Guide](https://kit.svelte.dev/docs/adapters)
- [FastAPI Docker Guide](https://fastapi.tiangolo.com/deployment/docker/)

## Support

For issues related to Docker deployment:

1. Check the logs: `./docker/dev.sh logs`
2. Verify Docker is running: `docker info`
3. Clean up and retry: `./docker/dev.sh cleanup && ./docker/dev.sh start`
4. Review this documentation for troubleshooting steps