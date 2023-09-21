CREATE DATABASE IF NOT EXISTS diet_directory;

use diet_directory;

DROP TABLE IF EXISTS user_details;
DROP TABLE IF EXISTS users;


CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password CHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    enabled TINYINT NOT NULL DEFAULT 1, -- Indicates whether the account is enabled
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY (Username)
);

CREATE TABLE user_details (
	user_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
	gender ENUM('Male', 'Female', 'Other'),
    phone_number VARCHAR(20),
    weight DECIMAL(5, 2),
    activityLevel VARCHAR(255),
    dietaryPreferences VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);



