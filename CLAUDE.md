# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SvelteKit application that functions as a Chinese radical-based translation engine. The app analyzes Chinese characters and displays their radical components with meanings, pronunciations, and decomposition information. It features both an interactive analyzer and a comprehensive reference table of the 214 Kangxi radicals.

## Development Commands

### Frontend Development
```bash
# Start development server
yarn dev
# or 
npm run dev

# Build for production
yarn build
# or
npm run build

# Preview production build
yarn preview
# or 
npm run preview

# Type checking
yarn check
# or
npm run check

# Watch mode type checking
yarn check:watch
# or
npm run check:watch

# Code formatting
yarn format  # Format code
yarn lint    # Check formatting
```

### API Backend Development
```bash
# Start the Python API server (from api/ directory)
cd api && ./start.sh

# Or manually:
cd api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### Full Development Setup

#### Option 1: Docker (Recommended)
```bash
# Quick start with Docker
./docker/dev.sh start

# Services will be available at:
# - Frontend: http://localhost:3000
# - API: http://localhost:8000
# - API Docs: http://localhost:8000/docs
```

#### Option 2: Manual Setup
1. Start the API server: `cd api && ./start.sh`
2. In another terminal, start the frontend: `yarn dev`
3. Frontend will be available at `http://localhost:5173`
4. API will be available at `http://localhost:8000`
5. API documentation at `http://localhost:8000/docs`

## Architecture

### Modular Design (Following UNIX Philosophy)

The application is designed with clear separation of concerns:

**Frontend (SvelteKit + TypeScript)**
- **Framework**: SvelteKit with TypeScript and Tailwind CSS v4
- **Deployment**: Configured for Vercel with `@sveltejs/adapter-vercel`
- **Styling**: Combines Tailwind CSS with custom CSS for traditional Chinese aesthetic
- **Fonts**: Uses Noto Serif and Noto Serif SC for proper Chinese character rendering

**Backend (Python FastAPI)**
- **API Server**: FastAPI for radical analysis and character decomposition
- **Data Processing**: Heavy computational work for radical identification
- **Modular**: Can be deployed independently or replaced with other implementations

### Key Files

**Frontend:**
- `src/routes/+page.svelte`: Main application with analyzer and reference modes
- `src/lib/components/RadicalInput.svelte`: Input component with validation and animations
- `src/lib/components/RadicalDisplay.svelte`: Results display with animated transitions
- `src/lib/services/radicalService.ts`: API service layer with fallback support
- `src/routes/+layout.svelte`: App layout with header/footer and traditional styling

**Backend:**
- `api/main.py`: FastAPI server with radical analysis endpoints
- `api/data/radicals.json`: Complete database of 214 Kangxi radicals
- `api/data/character_radicals.json`: Character decomposition mappings
- `api/start.sh`: Development server startup script
- `api/requirements.txt`: Python dependencies

**Configuration:**
- `.env.example`: Environment variables template
- `svelte.config.js`: SvelteKit configuration with Vercel adapter
- `vite.config.ts`: Vite configuration with Tailwind CSS and SvelteKit plugins

### API Endpoints

- `POST /analyze`: Analyzes Chinese text and returns radical decomposition
- `GET /radicals`: Returns all available radicals with their information
- `GET /health`: Health check endpoint
- `GET /`: API information and version
- `GET /docs`: Interactive API documentation (Swagger UI)

### Data Flow

1. User enters Chinese characters in the input component
2. Frontend validates input and calls the API service
3. API server processes characters and identifies radical components
4. Results are returned with radical meanings, pronunciations, and positions
5. Frontend displays animated results with detailed component breakdown
6. Fallback mode available when API server is not accessible

## Design Philosophy

The application emphasizes both functionality and traditional aesthetics:

**Visual Design:**
- Traditional Chinese paper texture background
- Noto Serif fonts for proper character rendering
- Responsive design that adapts to mobile devices
- Clean, academic presentation suitable for educational use
- Smooth animations for enhanced user experience

**Technical Design:**
- Modular architecture following UNIX philosophy
- Clear separation between frontend and backend
- Graceful degradation when API is unavailable
- Type-safe interfaces throughout the application
- Responsive and accessible user interface

## Future Enhancements

The architecture supports planned features:
- Historical radical evolution visualization
- Extended character decomposition database
- Multi-language support
- Enhanced educational content
- Performance optimizations for large character sets

## Environment Variables

Copy `.env.example` to `.env` and configure:
```bash
VITE_API_URL=http://localhost:8000  # API server URL
```

## Docker Deployment

The entire application is containerized for easy deployment:

### Development with Docker
```bash
# Start development environment
./docker/dev.sh start

# View logs
./docker/dev.sh logs

# Stop environment
./docker/dev.sh stop

# Rebuild services
./docker/dev.sh rebuild
```

### Production Deployment
```bash
# Deploy to production
./docker/prod.sh deploy

# Update production
./docker/prod.sh update

# Scale API service
./docker/prod.sh scale api 3

# Create backup
./docker/prod.sh backup
```

### Docker Architecture
- **Multi-container setup**: Separate containers for frontend, API, and Nginx
- **Development**: Hot reloading with volume mounts
- **Production**: Optimized builds with health checks and logging
- **Networking**: Internal Docker network for service communication
- **Security**: Non-root users and resource limits

See `DOCKER.md` for comprehensive Docker documentation.

## Deployment Notes

**Docker (Recommended)**: Complete containerized deployment with scripts
**Frontend**: Configured for Vercel deployment with SvelteKit adapter  
**Backend**: FastAPI server can be deployed to various platforms (Heroku, Railway, etc.)
**Database**: JSON files included; can be migrated to proper database for production