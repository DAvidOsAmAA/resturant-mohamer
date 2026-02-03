import dotenv from 'dotenv';
import express from 'express';
dotenv.config({ path: './.env' , quiet:true}); // Added quiet:true to remove the message with the server starts
const app = express();
import bootstrap from './src/bootstrap.js';
const port = process.env.PORT || 3000;

bootstrap(app, express);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.get('/', (req, res) => res.send('Hello World!'));
