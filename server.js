const express = require('express');
const connect = require('./config/db');
const path = require('path');

const app = express();

// Connect to database
connect();

// Middleware
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/lessons', require('./routes/api/lessons'));

// Serve static assets in production environment
if (process.env.NODE_ENV === 'production') {
  // Specify statis folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
