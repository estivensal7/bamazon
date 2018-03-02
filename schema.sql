-- creating database structure --

DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(40) NOT NULL,
	price INT default 0,
	stock_quantity INT default 0,
	PRIMARY KEY (id)
);

-- populating database with 10 different products --

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Game of Thrones: Seaons 1-7 DVD Collection", "Movies, Games, & Music", 75, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Call Of Duty: WWII", "Movies, Games, & Music", 46, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gibson Les Paul Studio 2016", "Movies, Games, & Music", 1795, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("60-inch 4K Ultra HD Smart TV", "Electronics", 848, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("24.2 MP Digital Camera", "Electronics", 499, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("GGMM E3 Wireless Bluetooth Speaker", "Electronics", 99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Multi-functional Home Gym Station", "Sports", 410, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dumbbell Set With Racks", "Sports", 750, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Borla Cat-Back Exhaust System", "Automotive", 586, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Airlift Suspension Compressor System", "Automotive", 290, 100);