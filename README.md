# Real World NestJS Project with Redis

A comprehensive NestJS application demonstrating real-world patterns with PostgreSQL database, Redis caching, and Docker containerization.

## 🚀 Features

- **NestJS Framework** - Modern Node.js framework for building scalable server-side applications
- **PostgreSQL Database** - Robust relational database with TypeORM integration
- **Redis Caching** - High-performance in-memory data structure store
- **Docker Support** - Complete containerization with development and production configurations
- **TypeScript** - Full TypeScript support with strict type checking
- **Testing** - Jest testing framework with unit and e2e tests
- **Code Quality** - ESLint and Prettier for code formatting and linting

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (v10.12.1 or higher) - Package manager
- **Docker** and **Docker Compose** - For containerized services
- **PostgreSQL** - Database (provided via Docker)
- **Redis** - Cache store (provided via Docker)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd real-world-nestjs-redis
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

### Application Configuration

```env
# Application
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nestjs_db
DB_USERNAME=postgres
DB_PASSWORD=postgres123

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=12345

# Production Environment Variables (optional)
POSTGRES_PASSWORD=your_secure_password
REDIS_PASSWORD=your_secure_redis_password
PGADMIN_EMAIL=admin@yourdomain.com
PGADMIN_PASSWORD=your_secure_pgadmin_password
```

### Environment Variable Descriptions

| Variable         | Description                   | Default                 | Required |
| ---------------- | ----------------------------- | ----------------------- | -------- |
| `NODE_ENV`       | Application environment       | `development`           | No       |
| `PORT`           | Application port              | `3000`                  | No       |
| `API_URL`        | Base API URL for HTTP service | `http://localhost:3000` | No       |
| `DB_HOST`        | PostgreSQL host               | `localhost`             | Yes      |
| `DB_PORT`        | PostgreSQL port               | `5432`                  | Yes      |
| `DB_NAME`        | PostgreSQL database name      | `nestjs_db`             | Yes      |
| `DB_USERNAME`    | PostgreSQL username           | `postgres`              | Yes      |
| `DB_PASSWORD`    | PostgreSQL password           | `postgres123`           | Yes      |
| `REDIS_HOST`     | Redis host                    | `localhost`             | Yes      |
| `REDIS_PORT`     | Redis port                    | `6379`                  | Yes      |
| `REDIS_PASSWORD` | Redis password                | `12345`                 | Yes      |

## 🐳 Docker Setup

This project includes multiple Docker Compose configurations for different environments.

### Quick Start with Docker

```bash
# Start all services (default)
pnpm docker:up

# Start development environment
pnpm docker:dev:up

# Start production environment
pnpm docker:prod:up
```

### Available Docker Scripts

| Command                  | Description                        |
| ------------------------ | ---------------------------------- |
| `pnpm docker:up`         | Start all services (default)       |
| `pnpm docker:down`       | Stop all services                  |
| `pnpm docker:logs`       | View logs for all services         |
| `pnpm docker:clean`      | Stop services and clean up volumes |
| `pnpm docker:dev:up`     | Start development services         |
| `pnpm docker:dev:down`   | Stop development services          |
| `pnpm docker:dev:logs`   | View development logs              |
| `pnpm docker:clean:dev`  | Clean up development environment   |
| `pnpm docker:prod:up`    | Start production services          |
| `pnpm docker:prod:down`  | Stop production services           |
| `pnpm docker:prod:logs`  | View production logs               |
| `pnpm docker:clean:prod` | Clean up production environment    |

### Services Overview

#### Default Environment

- **PostgreSQL**: `localhost:5432`
- **Redis**: `localhost:6379`
- **RedisInsight**: `http://localhost:5540`

#### Development Environment

- **PostgreSQL**: `localhost:5432` (database: `nestjs_db_dev`)
- **Redis**: `localhost:6379`
- **RedisInsight**: `http://localhost:5540`
- **pgAdmin**: `http://localhost:5050`

#### Production Environment

- **PostgreSQL**: `localhost:5432` (database: `nestjs_db_prod`)
- **Redis**: `localhost:6379`
- **pgAdmin**: `http://localhost:5050`

### Database Access

#### PostgreSQL

- **Host**: `localhost`
- **Port**: `5432`
- **Database**: `nestjs_db` (dev: `nestjs_db_dev`, prod: `nestjs_db_prod`)
- **Username**: `postgres`
- **Password**: `postgres123`

#### Redis

- **Host**: `localhost`
- **Port**: `6379`
- **Password**: `12345`

#### Management Tools

- **RedisInsight**: `http://localhost:5540` - Redis GUI management
- **pgAdmin**: `http://localhost:5050` - PostgreSQL administration
  - Email: `admin@admin.com`
  - Password: `admin`

## 🚀 Running the Application

### Development Mode

```bash
# Start database services
pnpm docker:dev:up

# Start the application in development mode
pnpm start:dev
```

### Production Mode

```bash
# Build the application
pnpm build

# Start database services
pnpm docker:prod:up

# Start the application in production mode
pnpm start:prod
```

### Available Scripts

| Command            | Description                               |
| ------------------ | ----------------------------------------- |
| `pnpm start`       | Start the application                     |
| `pnpm start:dev`   | Start in development mode with hot reload |
| `pnpm start:debug` | Start in debug mode                       |
| `pnpm start:prod`  | Start in production mode                  |
| `pnpm build`       | Build the application                     |
| `pnpm test`        | Run unit tests                            |
| `pnpm test:watch`  | Run tests in watch mode                   |
| `pnpm test:cov`    | Run tests with coverage                   |
| `pnpm test:e2e`    | Run end-to-end tests                      |
| `pnpm lint`        | Run ESLint                                |
| `pnpm format`      | Format code with Prettier                 |

## 📁 Project Structure

```
src/
├── app.controller.ts          # Main application controller
├── app.module.ts             # Root application module
├── app.service.ts            # Main application service
├── main.ts                   # Application entry point
├── models/                   # Data models and interfaces
│   └── post/
│       └── post.interface.ts
├── post/                     # Post module
│   ├── post.controller.ts    # Post controller
│   ├── post.module.ts        # Post module
│   ├── post.service.ts       # Post service
│   └── post.controller.spec.ts
└── shared/                   # Shared modules and services
    ├── http-api/
    │   └── http-api.service.ts
    └── shared.module.ts
```

## 🧪 Testing

```bash
# Run unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:cov

# Run end-to-end tests
pnpm test:e2e
```

## 🔍 API Endpoints

The application exposes the following endpoints:

- `GET /` - Health check endpoint
- Additional endpoints defined in the Post module

## 🛡️ Security Considerations

### Production Deployment

1. **Change default passwords** in production environment
2. **Use environment variables** for all sensitive configuration
3. **Enable SSL/TLS** for database connections
4. **Implement proper authentication** and authorization
5. **Use Docker secrets** for sensitive data in production
6. **Disable database synchronization** in production (`synchronize: false`)

### Environment-Specific Configurations

- **Development**: Includes additional tools like pgAdmin and RedisInsight
- **Production**: Includes health checks and optimized configurations
- **Default**: Basic setup for quick development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the UNLICENSED license.

## 🆘 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000, 5432, 6379, 5540, and 5050 are available
2. **Database connection**: Verify PostgreSQL is running and credentials are correct
3. **Redis connection**: Check if Redis is running and password is correct
4. **Docker issues**: Ensure Docker and Docker Compose are properly installed

### Getting Help

- Check the logs: `pnpm docker:logs`
- Verify environment variables are set correctly
- Ensure all prerequisites are installed
- Check Docker container status: `docker ps`

## 🔄 Updates and Maintenance

- Keep dependencies updated: `pnpm update`
- Monitor Docker images for security updates
- Regularly backup database data
- Review and update environment variables as needed
