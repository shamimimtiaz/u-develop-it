//Open the server.js file and import express
const express = require("express");
//Add the PORT designation and the app expression
const PORT = process.env.PORT || 3001;
const app = express();
//Add the Express.js middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Default response for any other requests(Not Found) Catch all
app.use((req, res) => {
    res.status(404).end();
  });

app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
  });















//add the function that will start the Express.js server on port 3001.
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });