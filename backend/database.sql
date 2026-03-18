-- phpMyAdmin SQL Dump
-- Host: 127.0.0.1
-- Database: `tastybite`

CREATE DATABASE IF NOT EXISTS `tastybite`;
USE `tastybite`;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_items`
--
CREATE TABLE `inventory_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit` varchar(50) NOT NULL,
  `min_qty` int(11) NOT NULL,
  `status` enum('Good','Low','Critical') NOT NULL DEFAULT 'Good',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory_items`
--
INSERT INTO `inventory_items` (`id`, `name`, `category`, `quantity`, `unit`, `min_qty`, `status`) VALUES
(1, 'Tomatoes', 'Vegetables', 25, 'kg', 10, 'Good'),
(2, 'Chicken Breast', 'Meat', 8, 'kg', 15, 'Low'),
(3, 'Mozzarella Cheese', 'Dairy', 12, 'kg', 8, 'Good'),
(4, 'Salmon Fillet', 'Seafood', 5, 'kg', 8, 'Low'),
(5, 'Pasta', 'Grains', 30, 'kg', 10, 'Good'),
(6, 'Olive Oil', 'Oils', 15, 'L', 5, 'Good'),
(7, 'Lettuce', 'Vegetables', 6, 'kg', 8, 'Low'),
(8, 'Beef Patty', 'Meat', 3, 'kg', 10, 'Critical');

-- --------------------------------------------------------

--
-- Table structure for table `menu_items`
--
CREATE TABLE `menu_items` (
  `id` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `prep_time` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `dietary` enum('Veg','Non-Veg') NOT NULL DEFAULT 'Non-Veg',
  `available` tinyint(1) NOT NULL DEFAULT 1,
  `image` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu_items`
--
INSERT INTO `menu_items` (`id`, `name`, `category`, `price`, `prep_time`, `description`, `dietary`, `available`, `image`) VALUES
('m1', 'Classic Margherita Pizza', 'Pizza', 14.99, '15-20 min', 'Fresh tomatoes, mozzarella, basil and olive oil on a thin crust.', 'Veg', 1, 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=2000'),
('m2', 'Grilled Salmon', 'Main Course', 24.50, '20-25 min', 'Fresh Atlantic salmon with asparagus and hollandaise sauce.', 'Non-Veg', 1, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=2000'),
('m3', 'Caesar Salad', 'Salads', 12.99, '10-15 min', 'Crisp romaine, parmesan, croutons with creamy Caesar dressing.', 'Veg', 1, 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=2000'),
('m4', 'Beef Burger', 'Burgers', 16.99, '15-20 min', 'Angus beef patty, cheddar, lettuce, tomato, special sauce, fries.', 'Non-Veg', 1, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=2000'),
('m5', 'Mushroom Risotto', 'Main Course', 18.50, '25-30 min', 'Creamy Arborio rice with wild mushrooms and truffle oil.', 'Veg', 0, 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=2000'),
('m6', 'Tiramisu', 'Desserts', 8.99, 'Ready', 'Classic Italian dessert with espresso-soaked ladyfingers and mascarpone.', 'Veg', 1, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=2000'),
('m7', 'Spicy Arrabiata Pasta', 'Pasta', 15.99, '15-20 min', 'Penne pasta in a spicy tomato garlic sauce with fresh parsley.', 'Veg', 1, 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=2000'),
('m8', 'Lemonade', 'Beverages', 4.99, '5 min', 'Freshly squeezed lemons with mint and a hint of ginger.', 'Veg', 1, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=2000');

-- --------------------------------------------------------

--
-- Table structure for table `restaurant_tables`
--
CREATE TABLE `restaurant_tables` (
  `id` varchar(50) NOT NULL,
  `table_number` int(11) NOT NULL,
  `seats` int(11) NOT NULL,
  `status` enum('Free','Occupied','Reserved') NOT NULL DEFAULT 'Free',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `restaurant_tables`
--
INSERT INTO `restaurant_tables` (`id`, `table_number`, `seats`, `status`) VALUES
('t1', 1, 2, 'Free'),
('t10', 10, 8, 'Free'),
('t11', 11, 4, 'Occupied'),
('t12', 12, 6, 'Reserved'),
('t2', 2, 2, 'Occupied'),
('t3', 3, 4, 'Free'),
('t4', 4, 4, 'Reserved'),
('t5', 5, 4, 'Occupied'),
('t6', 6, 6, 'Free'),
('t7', 7, 2, 'Free'),
('t8', 8, 4, 'Occupied'),
('t9', 9, 2, 'Reserved');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--
CREATE TABLE `orders` (
  `id` varchar(50) NOT NULL,
  `table_id` varchar(50) NOT NULL,
  `waiter` varchar(100) NOT NULL,
  `status` enum('Preparing','Ready','Completed','Cancelled') NOT NULL DEFAULT 'Preparing',
  `subtotal` decimal(10,2) NOT NULL,
  `tax` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `table_id` (`table_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`table_id`) REFERENCES `restaurant_tables` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--
INSERT INTO `orders` (`id`, `table_id`, `waiter`, `status`, `subtotal`, `tax`, `total`, `created_at`) VALUES
('ORD-001', 't1', 'John Smith', 'Preparing', 32.69, 3.27, 35.96, '2026-03-17 13:06:29'),
('ORD-002', 't4', 'Sarah Johnson', 'Preparing', 54.51, 5.45, 59.96, '2026-03-17 12:56:29'),
('ORD-003', 't7', 'Mike Davis', 'Ready', 99.95, 9.99, 109.94, '2026-03-17 12:51:29'),
('ORD-004', 't11', 'Emily Chen', 'Completed', 41.36, 4.14, 45.50, '2026-03-15 14:50:42');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--
CREATE TABLE `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(50) NOT NULL,
  `menu_item_id` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `menu_item_id` (`menu_item_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--
INSERT INTO `order_items` (`id`, `order_id`, `menu_item_id`, `quantity`, `note`) VALUES
(1, 'ORD-001', 'm2', 1, 'No salt'),
(2, 'ORD-001', 'm8', 1, NULL),
(3, 'ORD-002', 'm1', 2, 'Extra cheese'),
(4, 'ORD-002', 'm4', 1, NULL),
(5, 'ORD-003', 'm2', 2, NULL),
(6, 'ORD-003', 'm3', 1, 'Dressing on the side'),
(7, 'ORD-004', 'm5', 1, NULL),
(8, 'ORD-004', 'm6', 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `role` enum('Admin','Waiter','Chef') NOT NULL DEFAULT 'Waiter',
  `age` int(11) DEFAULT NULL,
  `date_of_joining` date DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `age`, `date_of_joining`, `salary`, `created_at`) VALUES
(1, 'Admin User', 'admin@tastybite.com', '$2y$10$hashedpassword1', 'Admin', 35, '2020-01-15', 50000.00, '2026-03-18 10:00:00'),
(2, 'John Smith', 'john@tastybite.com', '$2y$10$hashedpassword2', 'Waiter', 28, '2022-05-10', 25000.00, '2026-03-18 10:00:00'),
(3, 'Sarah Johnson', 'sarah@tastybite.com', '$2y$10$hashedpassword3', 'Waiter', 26, '2023-02-20', 24000.00, '2026-03-18 10:00:00'),
(4, 'Mike Davis', 'mike@tastybite.com', '$2y$10$hashedpassword4', 'Chef', 42, '2019-08-05', 45000.00, '2026-03-18 10:00:00'),
(5, 'Emily Chen', 'emily@tastybite.com', '$2y$10$hashedpassword5', 'Chef', 30, '2021-11-12', 35000.00, '2026-03-18 10:00:00');
