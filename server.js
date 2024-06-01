import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import errorHandlers from "./middlewares/error-handler.js";
const { errorHandler, notFoundError } = errorHandlers; // Destructure the required exports
import { Server } from 'socket.io';
import commentaireRoutes from "./routes/commentaire.route.js";
import forumRoutes from "./routes/forum.route.js";
import postRoutes from "./routes/post.route.js";

const app = express();
const databaseName = "uninet";

mongoose
  .connect(`mongodb://localhost:27017/${databaseName}`, { family: 4 })
  .then(() => {
    console.log("database connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("public"));

const PORT = process.env.PORT || 9090;
const hostname = "127.0.0.1";

app.use("/commentaire", commentaireRoutes);
app.use("/post", postRoutes);
app.use("/forum", forumRoutes);

app.use(notFoundError);
app.use(errorHandler);

app.listen(PORT, hostname, () => {
  console.log(`server running on http://${hostname}:${PORT}`);
});
