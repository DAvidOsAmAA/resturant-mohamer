import  dbConnection  from "../DB/models/db.connection.js";
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';


const bootstrap =async (app, express) => {
    app.use(express.json());
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, 
        message: 'Too many requests from this IP, please try again later.'
      });
    app.use(limiter);
    
    app.use(helmet());

    app.use((err,req,res,next)=>{
        err.statusCode=err.statusCode || 501;
        res.status(err.statusCode).json({
            status: err.statusCode ,
            message: err.message,
            stack: err.stack
        })
    });


    await dbConnection();
}

export default bootstrap;