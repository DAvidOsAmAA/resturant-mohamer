import { connect } from 'mongoose';


const dbConnection = async () => {
    connect(process.env.DB_URL)
        .then(() => console.log('Database connected'))
        .catch((err) => {
            console.error('Database connection error:', err);
            process.exit(1);
        });
    
}
export default dbConnection;