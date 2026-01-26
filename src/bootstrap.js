const { dbConnection } = require("../DB/models/db.connection");
const app = require('express').Router();
const mealRoutes=require( './modules/meals modules/meal.route')
require('dotenv').config({path :'./.env'})

const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


dbConnection();

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/meals',mealRoutes)
module.exports = app;