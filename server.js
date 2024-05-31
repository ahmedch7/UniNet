import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import universityRouter from "./routes/university.route.js";
import authRoutes from "./routes/auth.route.js"
import 'dotenv/config'
import { errorHandler, notFoundError } from "./middlewares/error-handler.js";
import niveauRouter from "./routes/niveauEtude.route.js";
import coursRouter from "./routes/cours.route.js";
import classeRouter from "./routes/classe.route.js";
import studentRouter from "./routes/student.route.js"


const app = express();
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


const PORT = process.env.PORT || 9090;
const hostname = "127.0.0.1";

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