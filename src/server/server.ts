import App from "./app";
import socketIO from "socket.io";
import http from "http";
import { Socket } from "dgram";
const app = new App();

let server = http.createServer(app.app);

let io = socketIO(server);

io.on("connect", socket => {
    console.log("new user connected");
    socket.emit("newMessage", { from: "John", text: "See you then", createdAt: 123123 });

    socket.on("createMessage", message => {
        console.log(`TLC: createMessage ===> `, message);
    });
    socket.on("disconnect", () => {
        console.log(`User disconnected`);
    });
});
server.listen(app.app.get("PORT"), () => {
    console.log(`listening to port §§§ ${app.app.get("PORT")} §§§`);
});
