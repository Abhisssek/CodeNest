// server.js
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app"); // <-- No circular import now

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // later restrict
    methods: ["GET", "POST"],
  },
});

// File locking map
const fileLocks = {};

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-project", (projectId) => {
    socket.join(projectId);
    console.log(`Socket ${socket.id} joined project room ${projectId}`);
  });

  socket.on("code-change", ({ projectId, filename, content }) => {
    socket.to(projectId).emit("code-update", { filename, content });
  });

  socket.on("lock-file", ({ projectId, filename }) => {
    const key = `${projectId}-${filename}`;
    if (!fileLocks[key]) {
      fileLocks[key] = socket.id;
      io.to(projectId).emit("file-locked", { filename, by: socket.id });
    } else {
      socket.emit("lock-denied", { filename });
    }
  });

  socket.on("unlock-file", ({ projectId, filename }) => {
    const key = `${projectId}-${filename}`;
    if (fileLocks[key] === socket.id) {
      delete fileLocks[key];
      io.to(projectId).emit("file-unlocked", { filename });
    }
  });

  socket.on("disconnect", () => {
    for (let key in fileLocks) {
      if (fileLocks[key] === socket.id) {
        delete fileLocks[key];
        const [projectId, filename] = key.split("-");
        io.to(projectId).emit("file-unlocked", { filename });
      }
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
