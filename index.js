const express = require('express');
const app = express();
const mongoose = require('mongoose');
const http = require('http');
const socketService = require('./Socket/socketService');
const cors = require('cors');
const eventRoute = require("./routes/event.route.js");
const userRoute = require("./routes/user.route.js");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection setup
mongoose.connect("mongodb://127.0.0.1:27017/PI")
  .then(() => {
    console.log("MongoDB Connection Successful");

    // Create HTTP server and initialize socket.io
    const server = http.createServer(app);
    const io = socketService.init(server);

    // Pass the io instance to the event routes
    app.use("/api/events", eventRoute(io));
    app.use("/api/user", userRoute);

    // Start the server
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
  });
