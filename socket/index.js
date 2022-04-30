import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getSpecificUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  socket.on("newUser", (username) => addNewUser(username, socket.id));

  // send alert
  socket.on("sendAlerts", ({ senderName, receiverName, type }) => {
    const receiver = getSpecificUser(receiverName);
    receiver &&
      io.to(receiver.socketId).emit("getAlerts", {
        senderName,
        type,
      });
  });

  socket.on("disconnect", () => removeUser(socket.id));
});

io.listen(4000);
