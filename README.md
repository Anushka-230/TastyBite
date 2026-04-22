TastyBite - Restaurant Management Dashboard
TastyBite is a comprehensive, full-stack restaurant management dashboard designed to streamline daily operations, manage inventory, handle orders efficiently, and provide real-time business insights.

Features
Role-Based Access Control: Secure user authentication powered by Clerk, supporting multiple organizational roles (Admin, Chef, Waiter).
Real-time Dashboard: Interactive charts and visualizations built with Recharts to monitor sales trends and business metrics.
Inventory Management: Track ingredient stock levels, categorize supplies, and automatically monitor low or critical inventory statuses.
Menu Management: Dynamic menu configuration including pricing, preparation time, dietary categories (Veg/Non-Veg), and availability toggles.
Table Management: Monitor live table statuses (Free, Occupied, Reserved) and seating capacity across the restaurant floor.
Order Processing: End-to-end order tracking from preparation to completion, linking specific menu items to tables and staff members.
Tech Stack
Frontend Framework: React.js, Vite
Language: TypeScript
Styling: Tailwind CSS
Authentication: Clerk
Data Visualization: Recharts
Database: MySQL (Relational Database Architecture)
Getting Started
Prerequisites
Node.js (v18 or higher)
MySQL Server
Installation & Setup
Clone the repository:

git clone https://github.com/your-username/TastyBite.git
cd TastyBite
Frontend Setup: Navigate to the frontend directory and install the necessary dependencies:

cd frontend
npm install
Environment Variables: Create a .env file in the frontend directory and add your Clerk publishable key for authentication:

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
Database Setup: Import the database schema and initial mock data using the provided SQL file:

# Import the SQL script into your MySQL environment
mysql -u your_username -p < backend/database.sql
Run the Development Server: Start the frontend application:

# Inside the frontend directory
npm run dev
The application will be available at http://localhost:5173.

Project Structure
TastyBite/
├── frontend/          # React.js frontend application
│   ├── src/           # UI Components, pages, and utilities
│   ├── public/        # Static assets
│   └── package.json   # Frontend dependencies and scripts
└── backend/           # Backend configurations and database scripts
    └── database.sql   # Database schema and initial seed data
