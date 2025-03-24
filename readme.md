# FundSight - Mutual Fund Portfolio Tracker

FundSight is a modern web application for tracking and analyzing mutual fund investments. This platform provides portfolio visualization, performance metrics, and sector allocation insights to help users make informed investment decisions.

## Project Structure

The project consists of three main components:

- **Frontend**: React application with TypeScript, Redux, and Material-UI
- **Backend**: Django REST API with PostgreSQL database
- **Database**: PostgreSQL for data persistence

## Prerequisites

- Docker and Docker Compose
- Git

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/fundsight.git
cd fundsight
```

### 2. Configure Environment Variables

Copy the example environment file and adjust as needed:

```bash
cp .env.example .env
```

Default environment variables:

```
# Database credentials
POSTGRES_USER=fundsight_user
POSTGRES_PASSWORD=securepassword
POSTGRES_DB=fundsight_db
DB_HOST=db
DB_PORT=5432

# Django settings
DEBUG=1
SECRET_KEY=django-insecure-djne4(zfr7p%o3%7c)r-!c)b$(rk+r=jza3!zfo7+lvz8!3&dn
```

### 3. Build and Start the Application

```bash
docker-compose up -d --build
```

This will start three services:
- PostgreSQL database
- Django backend (accessible at http://localhost:8000)
- React frontend (accessible at http://localhost:80)

## First, run the database migrations:

```bash
docker-compose exec backend python manage.py makemigrations
docker-compose exec backend python manage.py migrate
```
## Loading Sample Data

FundSight includes management commands to populate the database with sample data.

### Creating Demo Users

```bash
docker-compose exec backend python manage.py create_demo_users
```

This command creates:
- Regular user: `demo@fundsight.com` with password `SecurePass123!`
- Admin user: `admin@fundsight.com` with password `AdminSecurePass123!`

### Populating Investment Data

```bash
docker-compose exec backend python manage.py populate_data
```

This command adds:
- Sample investment portfolios for multiple users
- Performance history over 6 months
- Sector allocations
- Fund and stock data for overlap analysis

## Development Workflow

### Accessing the Django Admin

1. Create a superuser (if not using the demo admin):
   ```bash
   docker-compose exec backend python manage.py createsuperuser
   ```

2. Access the admin interface at http://localhost:8000/admin/

### Running Migrations

```bash
docker-compose exec backend python manage.py makemigrations
docker-compose exec backend python manage.py migrate
```

### Viewing Logs

```bash
docker-compose logs -f
```

To view logs for a specific service:

```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

## API Endpoints

The backend provides the following main API endpoints:

- `POST /api/auth/login/` - Authenticate and obtain token
- `POST /api/auth/logout/` - Logout and invalidate token
- `GET /api/auth/user/` - Get current user information
- `GET /api/investments/` - List all investments
- `GET /api/funds/` - List all funds with holdings

## Accessing the Frontend

Once the application is running, you can access the frontend at:

http://localhost

Use the demo credentials to log in:
- Email: `demo@fundsight.com`
- Password: `SecurePass123!`

## Stopping the Application

```bash
docker-compose down
```

To remove all volumes (database data):

```bash
docker-compose down -v
```

## Troubleshooting

### Database Connection Issues

If the backend can't connect to the database, ensure the database service is running:

```bash
docker-compose ps
```

If needed, restart the services:

```bash
docker-compose restart db
docker-compose restart backend
```

### Frontend Not Loading Properly

If the frontend shows API errors:

1. Check that the backend API is running:
   ```bash
   curl http://localhost:8000/api/auth/csrf/
   ```

2. Check CORS settings in backend/fundsight/settings.py if cross-origin issues occur

### Token Authentication

If you experience authentication issues:

1. Ensure you're using the correct credentials
2. Try obtaining a new token by logging out and back in
3. Check browser console for API errors