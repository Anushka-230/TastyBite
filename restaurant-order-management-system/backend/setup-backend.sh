#!/bin/bash

echo "Creating Restaurant PHP Backend Structure..."


# Main Folders
mkdir -p config
mkdir -p controllers
mkdir -p models
mkdir -p middleware
mkdir -p utils
mkdir -p uploads

# API Routes Structure
mkdir -p routes/auth
mkdir -p routes/orders
mkdir -p routes/menu
mkdir -p routes/tables
mkdir -p routes/inventory
mkdir -p routes/reports

echo "Creating starter PHP files..."

# Config
touch config/db.php

# Controllers
touch controllers/AuthController.php
touch controllers/MenuController.php
touch controllers/OrderController.php
touch controllers/TableController.php
touch controllers/InventoryController.php
touch controllers/ReportController.php

# Models
touch models/User.php
touch models/Menu.php
touch models/Order.php
touch models/Table.php
touch models/Inventory.php

# Middleware
touch middleware/authMiddleware.php

# Utils
touch utils/response.php
touch utils/helpers.php

# Routes
touch routes/auth/login.php
touch routes/auth/register.php
touch routes/auth/logout.php

touch routes/orders/create.php
touch routes/orders/list.php
touch routes/orders/updateStatus.php

touch routes/menu/getMenu.php
touch routes/menu/addItem.php
touch routes/menu/updateItem.php
touch routes/menu/deleteItem.php

touch routes/tables/getTables.php
touch routes/tables/updateStatus.php

touch routes/inventory/getInventory.php
touch routes/inventory/updateStock.php

touch routes/reports/dailyReport.php

# Root Entry
touch index.php

# Environment File
touch .env

echo "Backend folder structure created successfully!"