import { Server } from "socket.io";
import Message from "../models/message.model.js";

export const initSocket = (server) => {
    const io = new Server(server, {
        cors: { origin: "*" }
    });

    io.on("connection", (socket) => {

        socket.on("join_group", (groupId) => {
            socket.join(groupId);
        });

        socket.on("send_message", async (data) => {

            const message = await Message.create({
                group: data.groupId,
                sender: data.senderId,
                text: data.text
            });

            io.to(data.groupId).emit("receive_message", message);

            io.to(data.groupId).emit("notification", {
                text: "New message received"
            });

        });

    });
};