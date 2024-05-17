import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRoutes } from './routes/userRoutes.js';  
import { foyerRoutes } from './routes/foyerRoutes.js';
import { menuRoutes } from './routes/menuRoutes.js';
import { reservationRoutes } from './routes/reservationRoutes.js';

const app = express();
const port = process.env.PORT || 9090;
const databaseName = "uninet";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("public"));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/foyers', foyerRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/reservations', reservationRoutes);

// Connect to MongoDB
mongoose.connect(`mongodb://localhost:27017/${databaseName}`, { family: 4 })
    .then(() => {
        console.log("database connected");
    })
    .catch((e) => {
        console.log(e);
    });

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://127.0.0.1:${port}`);
});
