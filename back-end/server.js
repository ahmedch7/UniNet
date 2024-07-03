import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import universityRouter from "./routes/university.route.js";
import authRoutes from "./routes/auth.route.js";
import niveauRouter from "./routes/niveauEtude.route.js";
import coursRouter from "./routes/cours.route.js";
import classeRouter from "./routes/classe.route.js";
import foyerRoutes from "./routes/foyerRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import paymentRoutes from "./routes/payment.route.js";
import eventRoute from "./routes/event.route.js";
import userRoute from "./routes/user.route.js";
import commentaireRoutes from "./routes/commentaire.route.js";
import forumRoutes from "./routes/forum.route.js";
import postRoutes from "./routes/post.route.js";
import salleRoutes from "./routes/salle.route.js";
import examenRoutes from "./routes/examen.route.js";
import reservationRestaurantRoutes from "./routes/reservationRestaurantRoutes.js";
import { init as initSocketService } from "./Socket/socketService.js";
import http from "http";
import { errorHandler, notFoundError } from "./middlewares/error-handler.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = initSocketService(server);

mongoose
  .connect('mongodb://127.0.0.1:27017/PI')
  .then(() => {
    console.log("database connected");

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(morgan("dev"));
    app.use(express.static("public"));

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/user", userRouter);
    app.use("/university", universityRouter);
    app.use("/api/payment", paymentRoutes);
    app.use("/api/foyers", foyerRoutes);
    app.use("/api/menus", menuRoutes);
    app.use("/api/reservations", reservationRoutes);
    app.use("/api/comments", commentRoutes);
    app.use("/api/restaurants", restaurantRoutes);
    app.use("/api/rooms", roomRoutes);
    app.use("/api/restaurant-reservation", reservationRestaurantRoutes);
    app.use("/niveauEtude", niveauRouter);
    app.use("/cours", coursRouter);
    app.use("/classe", classeRouter);
    app.use("/api/events", eventRoute(io));
    app.use("/api/user", userRoute);
    app.use("/commentaire", commentaireRoutes);
    app.use("/post", postRoutes);
    app.use("/forum", forumRoutes);
    app.use("/salles", salleRoutes);
    app.use("/examens", examenRoutes);

    app.use(notFoundError);
    app.use(errorHandler);

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((e) => {
    console.error("MongoDB connection error:", e);
  });
