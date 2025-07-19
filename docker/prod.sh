#!/bin/bash

# Chinese Radical Analyzer - Production Docker Script
# This script helps manage the production environment with Docker

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info >/dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Function to check if docker-compose is available
check_docker_compose() {
    if ! command -v docker-compose >/dev/null 2>&1; then
        print_error "docker-compose is not installed. Please install docker-compose and try again."
        exit 1
    fi
}

# Function to deploy production environment
deploy() {
    print_status "Deploying Chinese Radical Analyzer to production..."
    
    # Check prerequisites
    check_docker
    check_docker_compose
    
    # Check if .env file exists
    if [ ! -f ".env" ]; then
        print_warning ".env file not found. Creating from .env.example..."
        if [ -f ".env.example" ]; then
            cp .env.example .env
            print_status "Please edit .env file with your production settings."
        else
            print_error ".env.example file not found. Please create a .env file manually."
            exit 1
        fi
    fi
    
    # Build and start services
    print_status "Building and starting production services..."
    docker-compose -f docker-compose.prod.yml up --build -d
    
    print_success "Production environment deployed!"
    print_status "Services:"
    print_status "  • Frontend: http://localhost:3000"
    print_status "  • API: http://localhost:8000"
    print_status "  • Nginx (if enabled): http://localhost:80"
    print_status "  • API Docs: http://localhost:8000/docs"
}

# Function to stop production environment
stop() {
    print_status "Stopping production environment..."
    docker-compose -f docker-compose.prod.yml down
    print_success "Production environment stopped!"
}

# Function to update production environment
update() {
    print_status "Updating production environment..."
    
    # Pull latest images
    print_status "Pulling latest code..."
    git pull origin main
    
    # Rebuild and restart services
    print_status "Rebuilding services..."
    docker-compose -f docker-compose.prod.yml build --no-cache
    
    print_status "Restarting services with zero downtime..."
    docker-compose -f docker-compose.prod.yml up -d
    
    print_success "Production environment updated!"
}

# Function to show logs
logs() {
    local service=${1:-""}
    if [ -n "$service" ]; then
        print_status "Showing production logs for $service..."
        docker-compose -f docker-compose.prod.yml logs -f "$service"
    else
        print_status "Showing production logs for all services..."
        docker-compose -f docker-compose.prod.yml logs -f
    fi
}

# Function to show status
status() {
    print_status "Production environment status:"
    docker-compose -f docker-compose.prod.yml ps
    
    print_status "\nContainer health status:"
    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep chinese-radicals || echo "No Chinese Radical Analyzer containers running"
}

# Function to backup data
backup() {
    local backup_dir="./backups/$(date +%Y%m%d_%H%M%S)"
    print_status "Creating backup in $backup_dir..."
    
    mkdir -p "$backup_dir"
    
    # Backup API data
    docker cp chinese-radicals-api-prod:/app/data "$backup_dir/api_data"
    
    # Backup logs
    docker-compose -f docker-compose.prod.yml logs > "$backup_dir/logs.txt"
    
    print_success "Backup created in $backup_dir"
}

# Function to restore from backup
restore() {
    local backup_dir=$1
    
    if [ -z "$backup_dir" ]; then
        print_error "Please specify backup directory to restore from"
        print_status "Usage: $0 restore <backup_directory>"
        exit 1
    fi
    
    if [ ! -d "$backup_dir" ]; then
        print_error "Backup directory $backup_dir does not exist"
        exit 1
    fi
    
    print_status "Restoring from backup $backup_dir..."
    
    # Stop services
    docker-compose -f docker-compose.prod.yml down
    
    # Restore API data
    if [ -d "$backup_dir/api_data" ]; then
        print_status "Restoring API data..."
        docker cp "$backup_dir/api_data" chinese-radicals-api-prod:/app/data
    fi
    
    # Start services
    docker-compose -f docker-compose.prod.yml up -d
    
    print_success "Restore completed!"
}

# Function to scale services
scale() {
    local service=$1
    local count=$2
    
    if [ -z "$service" ] || [ -z "$count" ]; then
        print_error "Please specify service and count"
        print_status "Usage: $0 scale <service> <count>"
        print_status "Example: $0 scale api 3"
        exit 1
    fi
    
    print_status "Scaling $service to $count instances..."
    docker-compose -f docker-compose.prod.yml up -d --scale "$service=$count"
    print_success "Service $service scaled to $count instances!"
}

# Function to show help
show_help() {
    echo "Chinese Radical Analyzer - Production Docker Script"
    echo ""
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  deploy    Deploy the production environment"
    echo "  stop      Stop the production environment"
    echo "  update    Update the production environment (git pull + rebuild)"
    echo "  logs      Show logs for all services or a specific service"
    echo "  status    Show status of production services"
    echo "  backup    Create a backup of production data"
    echo "  restore   Restore from a backup directory"
    echo "  scale     Scale a service to specified number of instances"
    echo "  help      Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 deploy                           # Deploy production environment"
    echo "  $0 logs api                         # Show logs for API service only"
    echo "  $0 backup                           # Create backup"
    echo "  $0 restore ./backups/20240101_1200  # Restore from specific backup"
    echo "  $0 scale api 3                      # Scale API service to 3 instances"
    echo "  $0 update                           # Update production deployment"
    echo ""
}

# Main script logic
case "${1:-help}" in
    "deploy")
        deploy
        ;;
    "stop")
        stop
        ;;
    "update")
        update
        ;;
    "logs")
        logs "$2"
        ;;
    "status")
        status
        ;;
    "backup")
        backup
        ;;
    "restore")
        restore "$2"
        ;;
    "scale")
        scale "$2" "$3"
        ;;
    "help"|*)
        show_help
        ;;
esac