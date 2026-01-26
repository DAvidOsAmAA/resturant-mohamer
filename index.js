const express = require('express');
const bootstrap = require('./src/bootstrap');

const app = express(); // ✅ هنا express app حقيقي

// يضبط middlewares وroutes
bootstrap(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
