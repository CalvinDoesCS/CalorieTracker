CREATE DATABASE IF NOT EXISTS diet_directory;

use diet_directory;

DROP TABLE IF EXISTS food_log;
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
    password CHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
	registration_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_detail_id INT UNIQUE,
	enabled TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY(user_id),
    CONSTRAINT `user_ibfk_1` FOREIGN KEY (`user_detail_id`) REFERENCES `user_detail` (`user_detail_id`)
);

  -- Insert sample data into user_detail table
INSERT INTO user_detail (first_name, last_name, gender, phone_number, weight, activity_level)
VALUES
    ('John', 'Doe', 'Male', '123-456-7890', 180.5, 'Moderate'),
    ('Jane', 'Smith', 'Female', '987-654-3210', 150.0, 'Active'),
    ('Chris', 'Johnson', 'Other', '555-555-5555', 200.2, 'Sedentary');

-- Insert sample data into user table using UUID_TO_BIN()
INSERT INTO user (user_id, password, email, user_detail_id)
VALUES
    (UUID_TO_BIN(UUID(), TRUE), 'hashed_password_1', 'john@example.com', 1),
    (UUID_TO_BIN(UUID(), TRUE), 'hashed_password_2', 'jane@example.com', 2),
    (UUID_TO_BIN(UUID(), TRUE), 'hashed_password_3', 'chris@example.com', 3);
    
CREATE TABLE food (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    calories INT,
    protein DECIMAL(10, 2),
    carbohydrates DECIMAL(10, 2),
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

