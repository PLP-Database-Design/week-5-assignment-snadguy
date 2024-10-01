const express = require('express')
const app = express()
const mysql = require('mysql2');
const dotenv = require('dotenv');


dotenv.config();
	
//creating a connection object
const db = mysql.createConnection
	({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME
	})

	
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//Question 1
app.get(`/patients`, (req, res) => {
const sql = `SELECT patient_id, first_name, last_name, date_of_birth FROM patients;`
db.query(sql, (err, results) => {
	if (err){
		console.log('Error retrieving data', err.stack)
		return res.send(500).send('Error retrieving data')
		}

	res.render('patients', {results, results})
})
})


//Question 2
app.get(`/providers`, (req, res) => {
	const sql = `SELECT first_name, last_name, provider_specialty FROM providers;`
	db.query(sql, (err, results) => {
		if (err){
			console.log('Error retrieving data', err.stack)
			return res.send(500).send('Error retrieving data')
			}
	
		res.render('provider', {results, results})
	})
	})

	//Question 3
	app.get(`/firstname`, (req, res) => {
		const sql = `SELECT * FROM Patients ORDER BY first_name;;`
		db.query(sql, (err, results) => {
			if (err){
				console.log('Error retrieving data', err.stack)
				return res.send(500).send('Error retrieving data')
				}
		
			res.render('fname', {results, results})
		})
		})


	//Question 4
	app.get(`/ProviderSpecialty`, (req, res) => {
		const sql = `SELECT * FROM providers ORDER BY provider_specialty;`
		db.query(sql, (err, results) => {
			if (err){
				console.log('Error retrieving data', err.stack)
				return res.send(500).send('Error retrieving data')
				}
		
			res.render('pro_spec', {results, results})
		})
		})
	
//testing the connection
db.connect((err) => {
	//if the connection is not successful
	if(err) 
		return console.log("Error connectiong to the database: ", err)
			
	//connection is sussessfulu
	console.log("Successfully connected to SQL database: ", db.threadId)
})

//sending message to the browser
app.get(``,(req, res) => {
		res.send('Hello World!!')
})

//starting the server
const PORT = 3300
app.listen(PORT, () => {
  console.log(`Server is runnng successfully on http://localhost: ${PORT}` )
})

