# Docker Setup for NestJS Project

This project includes Docker Compose configurations for PostgreSQL, Redis, and RedisInsight.

## Services

- **PostgreSQL**: Database server running on port 5432
- **Redis**: Cache server running on port 6379 with password protection
- **RedisInsight**: Redis GUI management tool running on port 5540

## Quick Start

### Local Development

```bash
# Start all services
pnpm docker:up

# Or for development environment
pnpm docker:dev:up

# View logs
pnpm docker:logs

# Stop services
pnpm docker:down
```

### Production

```bash
# Start production services
pnpm docker:prod:up

# View production logs
pnpm docker:prod:logs

# Stop production services
pnpm docker:prod:down
```

## Available Scripts

### Docker Commands

- `pnpm docker:up` - Start all services (default)
- `pnpm docker:down` - Stop all services
- `pnpm docker:logs` - View logs for all services
- `pnpm docker:clean` - Stop services and clean up volumes

### Development Environment

- `pnpm docker:dev:up` - Start development services
- `pnpm docker:dev:down` - Stop development services
- `pnpm docker:dev:logs` - View development logs
- `pnpm docker:clean:dev` - Clean up development environment

### Production Environment

- `pnpm docker:prod:up` - Start production services
- `pnpm docker:prod:down` - Stop production services
- `pnpm docker:prod:logs` - View production logs
- `pnpm docker:clean:prod` - Clean up production environment

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=nestjs_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=12345

# Application Configuration
NODE_ENV=development
PORT=3000
```

## Access Points

- **PostgreSQL**: `localhost:5432`

  - Database: `nestjs_db` (dev: `nestjs_db_dev`, prod: `nestjs_db_prod`)
  - Username: `postgres`
  - Password: `postgres123`

- **Redis**: `localhost:6379`

  - Password: `12345`

- **RedisInsight**: `http://localhost:5540`
  - Use this web interface to manage Redis

## Manual Docker Commands

If you prefer to use Docker commands directly:

```bash
# Start Redis with password
docker run -d -p 6379:6379 --name redis_db -v redis_data:/data redis redis-server --appendonly yes --requirepass 12345

# Create Redis volume
docker volume create redis_data

# Start RedisInsight
docker run -d --name redisinsight -p 5540:5540 redis/redisinsight:latest
```

## Data Persistence

All data is persisted using Docker volumes:

- `postgres_data` - PostgreSQL data
- `redis_data` - Redis data
- `redisinsight_data` - RedisInsight configuration

## Health Checks

Production configuration includes health checks for both PostgreSQL and Redis services.

## Security Notes

- Change default passwords in production
- Use environment variables for sensitive data
- Consider using Docker secrets for production deployments
