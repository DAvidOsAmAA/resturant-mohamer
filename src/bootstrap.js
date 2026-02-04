import  dbConnection  from "../DB/models/db.connection.js";
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import userRoutes from './modules/user module/user.routes.js';
import categoryRoutes from './modules/category module/category.routes.js';
import chatRoutes from './modules/chat module/chatbot.router.js'
import subMealsRoutes from './modules/subMeals module/subMeals.routes.js'
import mealrouter from  './modules/mealsmodules/meal.route.js'
import cartroutes from './modules/cartmodule/cart.rout.js'

const bootstrap =async (app, express) => {
    app.use(express.json());
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, 
        message: 'Too many requests from this IP, please try again later.'
      });
    app.use(limiter);
    app.use(helmet());
    
    // routes
    app.use('/api/auth', userRoutes);
    app.use('/api/categories', categoryRoutes);
    app.use('/api/chat',chatRoutes )
    app.use('/api/subMeals',subMealsRoutes );
app.use('/meals',mealrouter)
app.use('/cart',cartroutes)
    // global error handler
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
