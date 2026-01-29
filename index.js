import dotenv from 'dotenv';
import express from 'express';
// <<<<<<< HEAD
// const app = express();
// import bootstrap from './src/bootstrap.js';
// dotenv.config({ path: './.env' });
// const port = process.env.PORT || 3000;
// bootstrap(app, express);

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
// =======
import userRoutes from './src/modules/user module/user.routes.js';
import dbConnection from './DB/models/db.connection.js';

dotenv.config(); // make sure env is loaded

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/auth', userRoutes);

// test route
app.get('/', (req, res) => res.send('Hello World!'));

const startServer = async () => {
  try {
    await dbConnection(); // wait for DB to connect first
    console.log("MongoDB connected successfully");

    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
// >>>>>>> ahmed
