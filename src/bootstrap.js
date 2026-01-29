import express from 'express';
import dotenv from 'dotenv';
import { dbConnection } from '../DB/models/db.connection.js';
import mealRoutes from './modules/mealsmodules/meal.route.js';

dotenv.config({ path: './.env' });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/meals', mealRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Internal Server Error'
    });
});

app.use((req, res) => {  
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

export default app;
