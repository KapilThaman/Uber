const { Server } = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");
let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Replace with your frontend URL
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      if (userType === "user") {
        const user = await userModel.findById(userId);
        if (user) {
          user.socketId = socket.id;
          await user.save();
        }
      } else if (userType === "captain") {
        const captain = await captainModel.findById(userId);
        if (captain) {
          captain.socketId = socket.id;
          await captain.save();
        }
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

const sendMessageToSocketId = (socketId, event, message) => {
  if (io) {
    io.to(socketId).emit(event, message);
  } else {
    console.error("Socket.io not initialized.");
  }
};

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};