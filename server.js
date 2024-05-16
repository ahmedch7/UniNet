import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";


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






app.listen(PORT, hostname, () => {
    console.log(`server running on http://${hostname}:${PORT}`);
})