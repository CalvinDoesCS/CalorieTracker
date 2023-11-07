CREATE DATABASE IF NOT EXISTS diet_directory;

use diet_directory;

DROP TABLE IF EXISTS user_role;
DROP TABLE IF EXISTS food_log;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS refresh_token;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS user_detail;
DROP TABLE IF EXISTS food;

CREATE TABLE user_detail (
	user_detail_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) DEFAULT "",
    last_name VARCHAR(50) DEFAULT "",
	gender ENUM('Male', 'Female', 'Other',''),
    phone_number VARCHAR(20),
    weight DECIMAL(5, 2),
    activity_level VARCHAR(255),
	PRIMARY KEY (`user_detail_id`)
);

CREATE TABLE user (
    user_id BINARY(16) NOT NULL,
    password CHAR(68) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
	registration_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_detail_id INT UNIQUE,
	enabled TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY(user_id),
    CONSTRAINT `user_ibfk_1` FOREIGN KEY (`user_detail_id`) REFERENCES `user_detail` (`user_detail_id`)
);

create table role (
	role_id INT AUTO_INCREMENT NOT NULL,
	role VARCHAR(50) NOT NULL,
    PRIMARY KEY(role_id)
);
create unique index ix_auth_email on role (email,role);

CREATE TABLE user_role (
    user_id BINARY(16) NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY(user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (role_id) REFERENCES role(role_id)
);
CREATE TABLE refresh_token (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BINARY(16) NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expiry_date TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);
CREATE TABLE food (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    calories DECIMAL(10, 2),
    protein DECIMAL(10, 2),
    carbohydrate DECIMAL(10, 2),
    fat DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE food_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id BINARY(16), 
    food_id INT,
    log_date DATE,
    quantity DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (food_id) REFERENCES food(id)
);

-- Inserting sample data into the 'food' table
INSERT INTO food (name, category, calories, protein, carbohydrate, fat) VALUES
('Chicken Breast', 'Meat', 165.50, 31.20, 0.60, 3.60),
('Salmon', 'Seafood', 206.80, 22.50, 0.00, 13.40),
('Broccoli', 'Vegetable', 55.00, 3.70, 11.20, 0.60),
('Brown Rice', 'Grain', 216.40, 4.30, 44.80, 1.80),
('Banana', 'Fruit', 105.00, 1.30, 27.00, 0.40),
('Eggs', 'Dairy', 68.00, 5.50, 0.60, 4.80),
('Lentils', 'Legumes', 230.00, 17.90, 39.90, 0.80),
('Spinach', 'Vegetable', 23.00, 2.90, 3.60, 0.40),
('Pasta', 'Grain', 200.00, 7.00, 42.00, 1.00),
('Avocado', 'Fruit', 160.00, 2.00, 9.00, 14.00),
('Beef Steak', 'Meat', 250.00, 26.00, 0.00, 17.00),
('Cauliflower', 'Vegetable', 25.00, 1.90, 5.30, 0.30),
('Quinoa', 'Grain', 222.00, 8.10, 39.40, 4.00),
('Orange', 'Fruit', 62.00, 1.20, 15.40, 0.20),
('Milk', 'Dairy', 42.00, 3.40, 4.70, 1.00),
('Chickpeas', 'Legumes', 164.00, 8.90, 27.40, 2.60),
('Kale', 'Vegetable', 33.00, 2.90, 6.70, 0.50),
('Rice Noodles', 'Grain', 192.00, 4.00, 42.80, 0.60),
('Grapes', 'Fruit', 69.00, 0.60, 18.00, 0.20),
('Cheese', 'Dairy', 402.00, 25.00, 1.30, 33.00),
('Black Beans', 'Legumes', 339.00, 21.60, 62.00, 1.40),
('Zucchini', 'Vegetable', 17.00, 1.20, 3.40, 0.30),
('Couscous', 'Grain', 176.00, 6.00, 36.00, 0.20),
('Apple', 'Fruit', 95.00, 0.50, 25.00, 0.30),
('Yogurt', 'Dairy', 61.00, 3.50, 4.70, 3.30),
('Kidney Beans', 'Legumes', 127.00, 8.70, 22.80, 0.80),
('Carrots', 'Vegetable', 41.00, 0.90, 10.00, 0.20),
('Oats', 'Grain', 389.00, 16.90, 66.30, 7.00),
('Pear', 'Fruit', 57.00, 0.40, 15.00, 0.10),
('Butter', 'Dairy', 717.00, 0.90, 0.10, 81.00),
('Lima Beans', 'Legumes', 105.00, 7.80, 19.50, 0.40),
('Asparagus', 'Vegetable', 20.00, 2.00, 3.70, 0.20),
('Quinoa', 'Grain', 120.00, 4.10, 21.30, 1.90),
('Blueberries', 'Fruit', 84.00, 0.70, 21.40, 0.40),
('Mozzarella', 'Dairy', 300.00, 22.00, 1.00, 22.00),
('Pinto Beans', 'Legumes', 143.00, 9.00, 26.20, 0.90),
('Bell Pepper', 'Vegetable', 31.00, 1.30, 7.60, 0.30),
('Couscous', 'Grain', 176.00, 6.00, 36.00, 0.20),
('Cherry', 'Fruit', 50.00, 1.00, 12.20, 0.30),
('Milk', 'Dairy', 42.00, 3.40, 4.70, 1.00),
('Lentils', 'Legumes', 230.00, 17.90, 39.90, 0.80),
('Spinach', 'Vegetable', 23.00, 2.90, 3.60, 0.40),
('Pasta', 'Grain', 200.00, 7.00, 42.00, 1.00),
('Avocado', 'Fruit', 160.00, 2.00, 9.00, 14.00),
('Beef Steak', 'Meat', 250.00, 26.00, 0.00, 17.00),
('Cauliflower', 'Vegetable', 25.00, 1.90, 5.30, 0.30),
('Cheese', 'Dairy', 402.00, 25.00, 1.30, 33.00),
('Black Beans', 'Legumes', 339.00, 21.60, 62.00, 1.40),
('Zucchini', 'Vegetable', 17.00, 1.20, 3.40, 0.30),
('Chicken Breast', 'Meat', 165.50, 31.20, 0.60, 3.60),
('Salmon', 'Seafood', 206.80, 22.50, 0.00, 13.40),
('Broccoli', 'Vegetable', 55.00, 3.70, 11.20, 0.60),
('Brown Rice', 'Grain', 216.40, 4.30, 44.80, 1.80),
('Banana', 'Fruit', 105.00, 1.30, 27.00, 0.40),
('Eggs', 'Dairy', 68.00, 5.50, 0.60, 4.80),
('Couscous', 'Grain', 176.00, 6.00, 36.00, 0.20),
('Orange', 'Fruit', 62.00, 1.20, 15.40, 0.20),
('Milk', 'Dairy', 42.00, 3.40, 4.70, 1.00),
('Chickpeas', 'Legumes', 164.00, 8.90, 27.40, 2.60),
('Kale', 'Vegetable', 33.00, 2.90, 6.70, 0.50),
('Rice Noodles', 'Grain', 192.00, 4.00, 42.80, 0.60),
('Grapes', 'Fruit', 69.00, 0.60, 18.00, 0.20),
('Cheese', 'Dairy', 402.00, 25.00, 1.30, 33.00),
('Black Beans', 'Legumes', 339.00, 21.60, 62.00, 1.40),
('Zucchini', 'Vegetable', 17.00, 1.20, 3.40, 0.30),
('Cauliflower', 'Vegetable', 25.00, 1.90, 5.30, 0.30),
('Quinoa', 'Grain', 222.00, 8.10, 39.40, 4.00),
('Apple', 'Fruit', 95.00, 0.50, 25.00, 0.30),
('Yogurt', 'Dairy', 61.00, 3.50, 4.70, 3.30),
('Kidney Beans', 'Legumes', 127.00, 8.70, 22.80, 0.80),
('Carrots', 'Vegetable', 41.00, 0.90, 10.00, 0.20),
('Oats', 'Grain', 389.00, 16.90, 66.30, 7.00),
('Pear', 'Fruit', 57.00, 0.40, 15.00, 0.10),
('Butter', 'Dairy', 717.00, 0.90, 0.10, 81.00),
('Lima Beans', 'Legumes', 105.00, 7.80, 19.50, 0.40),
('Asparagus', 'Vegetable', 20.00, 2.00, 3.70, 0.20),
('Quinoa', 'Grain', 120.00, 4.10, 21.30, 1.90),
('Blueberries', 'Fruit', 84.00, 0.70, 21.40, 0.40),
('Mozzarella', 'Dairy', 300.00, 22.00, 1.00, 22.00),
('Pinto Beans', 'Legumes', 143.00, 9.00, 26.20, 0.90),
('Bell Pepper', 'Vegetable', 31.00, 1.30, 7.60, 0.30);

