const express = require('express');
const connect = require('./config/db');

const app = express();

// Connect to database
connect();

app.get('/', (req, res) => res.send('API up and running!'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
