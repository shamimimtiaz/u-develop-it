//Open the server.js file and import express
const express = require('express');

//Add the PORT designation and the app expression
const PORT = process.env.PORT || 3001;
const app = express();

const db = require('./db/database');
const apiRoutes = require('./routes/apiRoutes');

//Add the Express.js middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//By adding the /api prefix here, we can remove it from the individual route expressions after we move them to their new home.
app.use('/api', apiRoutes);



// //*************************************
// // ******** Candidate routes **********
// //*************************************
// // Get all candidates and their party affiliation
// app.get('/api/candidates', (req, res) => {
//   const sql =  `SELECT candidates.*, parties.name 
//                 AS party_name 
//                 FROM candidates 
//                 LEFT JOIN parties 
//                 ON candidates.party_id = parties.id`;
//   const params = [];
//   db.all(sql, params, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }

//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// // Get single candidate with party affliliation
// app.get('/api/candidate/:id', (req, res) => {
//   const sql = `SELECT candidates.*, parties.name 
//                AS party_name 
//                FROM candidates 
//                LEFT JOIN parties 
//                ON candidates.party_id = parties.id 
//                WHERE candidates.id = ?`;
//   const params = [req.params.id];
//   db.get(sql, params, (err, rows) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }

//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// // Create a candidate
// app.post('/api/candidate', ({ body }, res) => {
//   // Candidate is allowed not to be affiliated with a party
//   const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
//   if (errors) {
//     res.status(400).json({ error: errors });
//     return;
//   }

//   const sql =  `INSERT INTO candidates (first_name, last_name, industry_connected, party_id) 
//                 VALUES (?,?,?,?)`;
//   const params = [body.first_name, body.last_name, body.industry_connected, body.party_id];
//   // function,not arrow, to use this
//   db.run(sql, params, function(err, result) {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }

//     res.json({
//       message: 'success',
//       data: body,
//       id: this.lastID
//     });
//   });
// });

// // Update a candidate's party
// app.put('/api/candidate/:id', (req, res) => {
// // Candidate is allowed to not have party affiliation
//   const errors = inputCheck(req.body, 'party_id');
//   if (errors) {
//     res.status(400).json({ error: errors });
//     return;
//   }

//   const sql = `UPDATE candidates SET party_id = ? 
//                WHERE id = ?`;
//   const params = [req.body.party_id, req.params.id];
//   // function,not arrow, to use this
//   db.run(sql, params, function(err, result) {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }

//     res.json({
//       message: 'success',
//       data: req.body,
//       changes: this.changes
//     });
//   });
// });

// // Delete a candidate
// app.delete('/api/candidate/:id', (req, res) => {
//   const sql = `DELETE FROM candidates WHERE id = ?`;
//   const params = [req.params.id];
//   db.run(sql, params, function(err, result) {
//     if (err) {
//       res.status(400).json({ error: res.message });
//       return;
//     }

//     res.json({ message: 'successfully deleted', changes: this.changes });
//   });
// });

// //*************************************
// // *********** Party routes ***********
// //*************************************
// // Get all parties
// app.get('/api/parties', (req, res) => {
//   const sql = `SELECT * FROM parties`;
//   const params = [];
//   db.all(sql, params, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }

//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// // Get single party
// app.get('/api/party/:id', (req, res) => {
//   const sql = `SELECT * FROM parties WHERE id = ?`;
//   const params = [req.params.id];
//   db.get(sql, params, (err, rows) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }

//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// // Delete a party
// app.delete('/api/party/:id', (req, res) => {
//   const sql = `DELETE FROM parties WHERE id = ?`;
//   const params = [req.params.id]
//   db.run(sql, params, function(err, result) {
//     if (err) {
//       res.status(400).json({ error: res.message });
//       return;
//     }

//     res.json({ message: 'successfully deleted', changes: this.changes });
//   });
// });

// Default response for any other request(Not Found) Catch all other
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
//To ensure that the Express.js server doesn't start before the connection to the database has been established, let's wrap the Express.js server connection located at the bottom of the server.js file in an event handler
db.on('open', () => {
//add the function that will start the Express.js server on port 3001.
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});




//Assuming that you want to join an items table with a categories table, which SQL statement is correct?
//SELECT * FROM items
//LEFT JOIN categories ON items.category_id = categories.id;