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
    name VARCHAR(255) NOT NULL UNIQUE,
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
INSERT INTO food (name, category, calories, protein, carbohydrate, fat)
VALUES ('Chicken Breast', 'Meat', 165.5, 31.0, 0.6, 3.6);

INSERT INTO food (name, category, calories, protein, carbohydrate, fat)
VALUES ('Salmon', 'Fish', 206.0, 22.0, 0.0, 13.5);

INSERT INTO food (name, category, calories, protein, carbohydrate, fat)
VALUES ('Broccoli', 'Vegetable', 55.0, 2.8, 11.2, 0.6);

INSERT INTO food (name, category, calories, protein, carbohydrate, fat)
VALUES ('Brown Rice', 'Grain', 111.0, 2.1, 23.0, 0.9);

