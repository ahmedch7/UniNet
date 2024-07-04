import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import errorHandlers from "./middlewares/error-handler.js";
const { errorHandler, notFoundError } = errorHandlers; // Destructure the required exports
import { Server } from "socket.io";
import commentaireRoutes from "./routes/commentaire.route.js";
import forumRoutes from "./routes/forum.route.js";
import postRoutes from "./routes/post.route.js";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const databaseName = "uninet";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
mongoose
  .connect(`mongodb://localhost:27017/${databaseName}`, { family: 4 })
  .then(() => {
    console.log("database connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("public"));

const PORT = process.env.PORT || 9090;
const hostname = "127.0.0.1";

app.use("/commentaire", commentaireRoutes);
app.use("/post", postRoutes);
app.use("/forum", forumRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(notFoundError);
app.use(errorHandler);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200/", // Replace with your Angular app URL
    methods: ["GET", "POST"],
  },
});

// Handle socket connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Example event
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.listen(PORT, hostname, () => {
  console.log(`server running on http://${hostname}:${PORT}`);
});
