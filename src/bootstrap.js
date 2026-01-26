const { dbConnection } = require("../DB/models/db.connection");
const app = require('express').Router();
require('dotenv').config({path :'./.env'})

const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


dbConnection();
app.get('/', (req, res) => res.send('Hello World!'));

module.exports = app;