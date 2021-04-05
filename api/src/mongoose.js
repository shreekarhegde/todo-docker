const mongoose = require('mongoose');
const logger = require('./logger');
require('dotenv').config();

module.exports = function (app) {
  mongoose.connect(
    process.env.MONGO_URL,
    { useCreateIndex: true, useNewUrlParser: true }
  ).catch(err => {
    logger.error(err);
    process.exit(1);
  });

  app.set('mongooseClient', mongoose);
};
