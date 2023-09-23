CREATE DATABASE IF NOT EXISTS diet_directory;

use diet_directory;

DROP TABLE IF EXISTS user_detail;
DROP TABLE IF EXISTS user;

CREATE TABLE user_detail (
	user_detail_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
	gender ENUM('Male', 'Female', 'Other'),
    phone_number VARCHAR(20),
    weight DECIMAL(5, 2),
    activity_level VARCHAR(255),
    dietary_preferences VARCHAR(255),
	PRIMARY KEY (`user_detail_id`)
);

CREATE TABLE user (
    user_id BINARY(16),
    username VARCHAR(50) NOT NULL UNIQUE,
    password CHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
	registration_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_detail_id INT NOT NULL UNIQUE,
	enabled TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY(user_id),
    CONSTRAINT `user_ibfk_1` FOREIGN KEY (`user_detail_id`) REFERENCES `user_detail` (`user_detail_id`)
);

   




