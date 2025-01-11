const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./socket"); // Import initializeSocket
const port = process.env.PORT || 3030;

const server = http.createServer(app);

initializeSocket(server); // Initialize Socket.IO

server.listen(port, () => {
  console.log("listening on the Port " + port);
});