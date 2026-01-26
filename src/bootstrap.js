require('dotenv').config();
const express = require('express');
const connectDB = require('../DB/models/db.connection');
const userRoutes = require('./modules/user module/user.routes');

const app = express();

connectDB();

app.use(express.json());

app.use('/api/auth', userRoutes);

module.exports = app;
