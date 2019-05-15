import App from "./app";
import socketIO from "socket.io";
import http from "http";
import messageUtils from "../utils/message";
const app = new App();

let server = http.createServer(app.app);

let io = socketIO(server);

io.on("connect", socket => {
    socket.emit("newMessage", messageUtils.generateMessage("Admin", "welcome to chat app"));
    socket.broadcast.emit("newMessage", messageUtils.generateMessage("Admin", "New user connected"));
    console.log("new user connected");
    socket.on("createMessage", (message, callback) => {
        console.log(`TCL: createMessage ===> `, message);

        // NOTE to emit an event to all users connected including the user that emits the event
        io.emit("newMessage", messageUtils.generateMessage(message.from, message.text));
        callback(message);
        // NOTE to emit an event to all users connected but not the user that emits the event
        // socket.broadcast.emit("newMessage", { form: message.from, text: message.text, createdAt: new Date().getTime() });
    });
    socket.on("disconnect", () => {
        console.log(`User disconnected`);
    });
});

server.listen(app.app.get("PORT"), () => {
    console.log(`listening to port §§§ ${app.app.get("PORT")} §§§`);
});
