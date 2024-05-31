import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import universityRouter from "./routes/university.route.js";
import authRoutes from "./routes/auth.route.js"
import 'dotenv/config'
import niveauRouter from "./routes/niveauEtude.route.js";
import coursRouter from "./routes/cours.route.js";
import classeRouter from "./routes/classe.route.js";
import studentRouter from "./routes/student.route.js"
import userRoutes from './routes/userRoutes.js';
import foyerRoutes from './routes/foyerRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import commentRoutes from './routes/commentRoutes.js'; 
import restaurantRoutes from './routes/restaurantRoutes.js';  
import roomRoutes from './routes/roomRoutes.js';  
import { errorHandler, notFoundError } from "./middlewares/error-handler.js";



const app = express();
const port = process.env.PORT || 9090;
const databaseName = "uninet";

mongoose.connect(`mongodb://localhost:27017/${databaseName}`, { family: 4 })
    .then(() => {
        console.log("database connected");
    })
    .catch((e) => {
        console.log(e);
    });
//test

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
app.use('/api/restaurants', restaurantRoutes);  
app.use('/api/rooms', roomRoutes);
 

app.use('/api/auth', authRoutes)
app.use("/user", userRouter)
app.use("/university", universityRouter)

app.use("/niveauEtude", niveauRouter );
app.use("/cours", coursRouter );
app.use("/classe", classeRouter );
app.use("/student", studentRouter );


app.use(notFoundError)
app.use(errorHandler)
app.listen(PORT, hostname, () => {
    console.log(`server running on http://${hostname}:${PORT}`);
})
