import dotenv from 'dotenv';
import express from 'express';
const app = express();
import bootstrap from './src/bootstrap.js';
dotenv.config({ path: './.env' });
const port = process.env.PORT || 3000;
bootstrap(app, express);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.get('/', (req, res) => res.send('Hello World!'));
