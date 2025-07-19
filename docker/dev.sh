#!/bin/bash

# Chinese Radical Analyzer - Development Docker Script
# This script helps manage the development environment with Docker

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

# Function to build and start development environment
start_dev() {
    print_status "Starting Chinese Radical Analyzer development environment..."
    
    # Check prerequisites
    check_docker
    check_docker_compose
    
    # Build and start services
    print_status "Building and starting services..."
    docker-compose up --build -d
    
    print_success "Development environment started!"
    print_status "Services:"
    print_status "  • Frontend: http://localhost:3000"
    print_status "  • API: http://localhost:8000"
    print_status "  • API Docs: http://localhost:8000/docs"
    
    # Show logs
    print_status "Showing logs (Ctrl+C to stop watching)..."
    docker-compose logs -f
}

# Function to stop development environment
stop_dev() {
    print_status "Stopping development environment..."
    docker-compose down
    print_success "Development environment stopped!"
}

# Function to restart development environment
restart_dev() {
    print_status "Restarting development environment..."
    docker-compose restart
    print_success "Development environment restarted!"
}

# Function to show logs
show_logs() {
    local service=${1:-""}
    if [ -n "$service" ]; then
        print_status "Showing logs for $service..."
        docker-compose logs -f "$service"
    else
        print_status "Showing logs for all services..."
        docker-compose logs -f
    fi
}

# Function to clean up Docker resources
cleanup() {
    print_status "Cleaning up Docker resources..."
    
    # Stop and remove containers
    docker-compose down
    
    # Remove unused images
    docker image prune -f
    
    # Remove unused volumes
    docker volume prune -f
    
    print_success "Cleanup completed!"
}

# Function to rebuild services
rebuild() {
    local service=${1:-""}
    print_status "Rebuilding services..."
    
    if [ -n "$service" ]; then
        print_status "Rebuilding $service..."
        docker-compose build --no-cache "$service"
        docker-compose up -d "$service"
    else
        print_status "Rebuilding all services..."
        docker-compose build --no-cache
        docker-compose up -d
    fi
    
    print_success "Rebuild completed!"
}

# Function to show help
show_help() {
    echo "Chinese Radical Analyzer - Development Docker Script"
    echo ""
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  start     Start the development environment"
    echo "  stop      Stop the development environment"
    echo "  restart   Restart the development environment"
    echo "  logs      Show logs for all services or a specific service"
    echo "  cleanup   Clean up Docker resources (containers, images, volumes)"
    echo "  rebuild   Rebuild services (optionally specify a service name)"
    echo "  help      Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start              # Start development environment"
    echo "  $0 logs api           # Show logs for API service only"
    echo "  $0 rebuild frontend   # Rebuild only the frontend service"
    echo "  $0 cleanup            # Clean up all Docker resources"
    echo ""
}

# Main script logic
case "${1:-help}" in
    "start")
        start_dev
        ;;
    "stop")
        stop_dev
        ;;
    "restart")
        restart_dev
        ;;
    "logs")
        show_logs "$2"
        ;;
    "cleanup")
        cleanup
        ;;
    "rebuild")
        rebuild "$2"
        ;;
    "help"|*)
        show_help
        ;;
esac