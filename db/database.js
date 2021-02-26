//connect to the SQLite database. it sets the execution mode to verbose to produce messages in the terminal regarding the state of the runtime.
const sqlite3 = require('sqlite3').verbose();

//this code will connect the application to the SQLite database.
// Connect to database 
const db = new sqlite3.Database('./db/election.db', err => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the election database.');
  });
  
  
  module.exports = db;