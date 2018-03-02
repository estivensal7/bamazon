const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	user: 'root',
	password: 'root',

	database: 'bamazon_db'
});

function Product(id, product_name, price, stock_quantity) {
	this.id = id;
	this.product_name = product_name;
	this.price = price;
	this.stock_quantity = stock_quantity;
}

const enterStore = (query) => {
	let choicesArray = [];
	let tabledProductsArr = [];
	console.log('-------------------------Welcome to BAmazon!-------------------------');
	
	for(let i = 0; i < query.length; i++) {
		let tabledProducts = new Product(`${query[i].id}`,`${query[i].product_name}`, `${query[i].price}`, `${query[i].stock_quantity}`);
		tabledProductsArr.push(tabledProducts);
		choicesArray.push(JSON.stringify(query[i].id));
	};
	
	console.table(tabledProductsArr);

	inquirer.prompt([
		{
			type: "list",
			message: "Which item would you like to buy? (Select by Product ID)",
			choices: choicesArray,
			name: "userSelection"
		},

		{
			type: "input",
			message: "How many would you like to buy?",
			name: "quantityRequested"
		}
	]).then(response => {
		let quantity = parseInt(response.quantityRequested);
		let item = parseInt(response.userSelection);

		connection.query(
			"SELECT stock_quantity FROM products WHERE id = ?", 
			[item], 
			function(error, result) {
				const inventory = parseInt(result[0].stock_quantity) - quantity;
				if (error) {
					throw error;
					return;
				}

				if (inventory >= 0) {
					confirmTransaction(item, quantity);
				} else {
					console.log("\n\nSorry, we do not have enough inventory to fullfill your order at this moment...\n\n");
					continueShopping();
				}
			}
		);
	}); 
}

const readDatabase = () => {
	connection.query(
		"SELECT * FROM products",
		function(error, query) {
			enterStore(query);
		}
	);
}

const confirmTransaction = (item, quantity) => {
	connection.query(
		"UPDATE products SET stock_quantity = (stock_quantity - ?) WHERE id = ?", 
		[quantity, item],
		function(error, result) {
			if (error) {
				throw error;
			}
		}
		
	)
	continueShopping();
}

const continueShopping = () => {
	inquirer.prompt([
		
		{
			type: "confirm",
			message: "Would you like to continue shopping?",
			name: "continue"
		}		

	]).then(response => {
		if (response.continue) {
			readDatabase();
		} else {
			console.log("\nPlease visit us again!");
			connection.end();
		}
	})
}


readDatabase();