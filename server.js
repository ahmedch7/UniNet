import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import foyerRoutes from './routes/foyerRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import commentRoutes from './routes/commentRoutes.js'; 
import restaurantRoutes from './routes/restaurantRoutes.js';  
import roomRoutes from './routes/roomRoutes.js';  



const app = express();
const port = process.env.PORT || 9090;
const databaseName = "uninet";

 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("public"));

 
app.use('/api/users', userRoutes);
app.use('/api/foyers', foyerRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/comments', commentRoutes);  
app.use('/api/restaurant', restaurantRoutes);  
app.use('/api/rooms', roomRoutes);
 




 
mongoose.connect(`mongodb://localhost:27017/${databaseName}`, { family: 4 })
    .then(() => {
        console.log("Database connected");
    })
    .catch((e) => {
        console.log("Database connection error: ", e);
    });
 
app.listen(port, () => {
    console.log(`Server running on http://127.0.0.1:${port}`);
});
