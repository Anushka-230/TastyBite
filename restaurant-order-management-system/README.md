# Restaurant Order Management System

This project is a comprehensive Restaurant Order Management System consisting of a React/Vite frontend dashboard and a PHP-based backend API.

## Project Structure

- `frontend/`: React components and layouts.
  - `tastybite-dashboard/`: The main functional dashboard application.
- `backend/`: PHP backend logic, including controllers, models, and routes.

## How to Run

### 1. Frontend (TastyBite Dashboard)

The dashboard is built with React, Vite, and Tailwind CSS.

- **Navigate to the directory:**
  ```bash
  cd restaurant-order-management-system/frontend/tastybite-dashboard
  ```
- **Install dependencies:**
  ```bash
  npm install
  ```
- **Run in development mode:**
  ```bash
  npm run dev
  ```
  The dashboard will typically be available at `http://localhost:5173`.

### 2. Backend (PHP API)

The backend uses a standard PHP structure.

- **Navigate to the directory:**
  ```bash
  cd restaurant-order-management-system/backend
  ```
- **Initialize (if needed):**
  If the folder structure isn't ready, run:
  ```bash
  ./setup-backend.sh
  ```
- **Start the PHP server:**
  ```bash
  php -S localhost:8000
  ```
  The API will be accessible at `http://localhost:8000`.

> [!NOTE]
> The backend currently contains skeleton files. Business logic needs to be implemented in the respective controllers and models.