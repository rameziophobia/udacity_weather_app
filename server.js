// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Cors for cross origin allowance
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, () => {
    console.log(`server running on localhost: ${port}`);
});

app.get('/data', (req, res) => {
    res.send(projectData);
});

app.post('/data', (req, res) => {
    console.log(req.body);
    projectData = req.body;
    console.log(projectData);
    res.status(204).send();
});