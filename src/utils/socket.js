const socket = require("socket.io");
const Chat = require("../models/chat");
const crypto = require("crypto");

const getSecretRoomId = (userId, toTargetUser) => {
  return crypto
    .createHash("sha256")
    .update([userId, toTargetUser].sort().join("$"))
    .digest("hex");
};
const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName, userId, toTargetUser }) => {
      const roomId = getSecretRoomId(userId, toTargetUser);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName: firstName, userId, toTargetUser, text }) => {
        // save the messages in the database
        try {
          const room = getSecretRoomId(userId, toTargetUser);
          let chat = await Chat.findOne({
            participants: { $all: [userId, toTargetUser] },
          });
          if (!chat) {
            chat = new Chat({
              participants: [userId, toTargetUser],
              messages: [],
            });
          }
          chat.messages.push({ senderId: userId, text });
          io.to(room).emit("receivedMessage", { firstName, text });
          await chat.save();
        } catch (err) {
          console.log(err);
        }
      }
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
