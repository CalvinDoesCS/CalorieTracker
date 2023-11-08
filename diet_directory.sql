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
    meal_type ENUM('Breakfast', 'Lunch', 'Dinner'),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (food_id) REFERENCES food(id)
);

-- Inserting sample data into the 'food' table
INSERT INTO food (name, category, calories, protein, carbohydrate, fat)
VALUES
    ('Chicken Breast', 'Protein', 165.00, 31.0, 0.0, 3.6),
    ('Salmon', 'Protein', 206.00, 22.0, 0.0, 13.0),
    ('Broccoli', 'Vegetables', 55.00, 3.7, 11.2, 0.6),
    ('White Rice', 'Grains', 200.00, 4.0, 45.0, 0.5),
    ('Spinach', 'Vegetables', 23.00, 2.9, 3.6, 0.4),
    ('Avocado', 'Fruits', 160.00, 2.0, 9.0, 15.0),
    ('Quinoa', 'Grains', 120.00, 4.1, 21.3, 1.9),
    ('Sweet Potatoes', 'Vegetables', 90.00, 2.0, 21.0, 0.2),
    ('Oatmeal', 'Grains', 150.00, 6.0, 27.0, 2.5),
    ('Eggs', 'Protein', 68.00, 5.5, 0.6, 4.8);
-- Create dishes by combining food items
INSERT INTO food (name, category, calories, protein, carbohydrate, fat)
VALUES
    ('Chicken and Broccoli Stir-Fry', 'Dishes', 300.00, 33.0, 10.0, 8.0),
    ('Salmon Salad', 'Dishes', 250.00, 24.0, 5.0, 15.0),
    ('Avocado Quinoa Bowl', 'Dishes', 350.00, 6.0, 45.0, 16.0),
    ('Oatmeal Breakfast', 'Dishes', 220.00, 8.0, 40.0, 3.5),
    ('Egg Fried Rice', 'Dishes', 350.00, 12.0, 45.0, 12.0),
    ('Spinach and Salmon Wrap', 'Dishes', 280.00, 26.0, 15.0, 14.0);
	
