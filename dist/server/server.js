"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const app = new app_1.default();
let server = http_1.default.createServer(app.app);
let io = socket_io_1.default(server);
io.on("connect", socket => {
    socket.emit("newMessage", { form: "Admin", text: "welcome to the chat app", createdAt: new Date().getTime() });
    socket.broadcast.emit("newMessage", { form: "Admin", text: "New user has joined", createdAt: new Date().getTime() });
    console.log("new user connected");
    socket.on("createMessage", message => {
        console.log(`TLC: createMessage ===> `, message);
        // NOTE to emit an event to all users connected including the user that emits the event
        io.emit("newMessage", { form: message.from, text: message.text, createdAt: new Date().getTime() });
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
