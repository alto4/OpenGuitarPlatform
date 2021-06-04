const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connect = async () => {
  try {
    await mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true });

    console.log('Successfully connected to MongoDB database.');
  } catch (err) {
    console.error(err.message);

    // Exit process upon failure
    process.exit(1);
  }
};

module.exports = connect;
