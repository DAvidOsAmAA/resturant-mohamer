<<<<<<< HEAD
require('dotenv').config();
const express = require('express');
const connectDB = require('../DB/models/db.connection');
const userRoutes = require('./modules/user module/user.routes');

const app = express();

connectDB();

app.use(express.json());

app.use('/api/auth', userRoutes);

module.exports = app;
=======
const { dbConnection } = require("../DB/models/db.connection");
const app = require('express').Router();
require('dotenv').config({path :'./.env'})

const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


dbConnection();
app.get('/', (req, res) => res.send('Hello World!'));

module.exports = app;
>>>>>>> origin/dev
