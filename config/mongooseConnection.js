const mongoose = require('mongoose');
require('dotenv').config()
const debug = require('debug')("development:mongoose")


mongoose
  .connect(`${process.env.MONGODB_URI}${process.env.DB_NAME}`)
  .then(() => {
    debug('Connected to MongoDB.');
  })
  .catch((err) => {
    debug('Error connecting to MongoDB:', err);
  });

module.exports = mongoose.connection;