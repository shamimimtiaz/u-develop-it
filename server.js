//connect to the SQLite database. it sets the execution mode to verbose to produce messages in the terminal regarding the state of the runtime.
const sqlite3 = require('sqlite3').verbose();
//Open the server.js file and import express
const express = require('express');
const inputCheck = require('./utils/inputCheck');
//Add the PORT designation and the app expression
const PORT = process.env.PORT || 3001;
const app = express();

//Add the Express.js middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//this code will connect the application to the SQLite database.
const db = new sqlite3.Database('./db/election.db', err => {
    if (err) {
      return console.error(err.message);
    }
  
    console.log('Connected to the election database.');
  });


// app.get('/', (req, res) => {
//     res.json({
//       message: 'Hello World'
//     });
//   });

// Get all candidates so that it's wrapped in an Express.js route
app.get('/api/candidates', (req, res) => {
    const sql =  `SELECT * FROM candidates`;
    const params = [];
//this method executes the SQL command, the callback function captures the responses from the query in two variables: the err, which is the error response, and rows, which is the database query response.
db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Rap this with express.js for get a single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates 
                 WHERE id = ?`;
    const params = [req.params.id];
//Here returning a single candidate from the candidates table based on their id.
db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: 'success',
      data: row
    });
  });
});

// Delete a candidate and rap it with express.js
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];
//Create query for delete a candidate
db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    }
    res.json({
      message: 'successfully deleted',
      changes: this.changes
    });
  });
});

// Create a candidate
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
//Create a candidate : create query for create operation
const sql =  `INSERT INTO candidates (first_name, last_name, industry_connected) 
                VALUES (?,?,?)`;
  const params = [body.first_name, body.last_name, body.industry_connected];
  // ES5 function, not arrow function, to use this
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: 'success',
      data: body,
      id: this.lastID
    });
  });
});

//Default response for any other requests(Not Found) Catch all
app.use((req, res) => {
    res.status(404).end();
  }); 

//To ensure that the Express.js server doesn't start before the connection to the database has been established, let's wrap the Express.js server connection located at the bottom of the server.js file in an event handler
db.on('open', () => {
//add the function that will start the Express.js server on port 3001.
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
