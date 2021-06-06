const express = require('express');
const connect = require('./config/db');

const app = express();

// Connect to database
connect();

// Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API up and running!'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/lessons', require('./routes/api/lessons'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
