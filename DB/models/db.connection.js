const mongoose = require('mongoose');

<<<<<<< HEAD
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Connection Failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;



=======
module.exports.dbConnection=()=>{
    mongoose.connect(process.env.DB_URL)
        .then(() => console.log('Database connected'))
        .catch((err) => {
            console.error('Database connection error:', err);
            process.exit(1);
        });
}
>>>>>>> origin/dev
