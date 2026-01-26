const { dbConnection } = require('../DB/models/db.connection');
const express = require('express');
const userRoutes = require('../src/modules/user module/user.routes');

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // database connection
  dbConnection();
    app.use('api/auth/',userRoutes)
  // test route
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
};
