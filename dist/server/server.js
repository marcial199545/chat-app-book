"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const message_1 = __importDefault(require("../utils/message"));
const app = new app_1.default();
let server = http_1.default.createServer(app.app);
let io = socket_io_1.default(server);
io.on("connect", socket => {
    console.log("new user connected");
    socket.emit("newMessage", message_1.default.generateMessage("Admin", "welcome to chat app"));
    socket.broadcast.emit("newMessage", message_1.default.generateMessage("Admin", "New user connected"));
    socket.on("createMessage", (message, callback) => {
        console.log(`TCL: createMessage ===> `, message);
        // NOTE to emit an event to all users connected including the user that emits the event
        io.emit("newMessage", message_1.default.generateMessage(message.from, message.text));
        callback(message);
        // NOTE to emit an event to all users connected but not the user that emits the event
        // socket.broadcast.emit("newMessage", { form: message.from, text: message.text, createdAt: new Date().getTime() });
    });
    socket.on("createLocationMessage", coords => {
        io.emit("newLocationMessage", message_1.default.generateLocationMessage("Admin", coords.latitude, coords.longitude));
    });
    socket.on("disconnect", () => {
        console.log(`User disconnected`);
    });
});
server.listen(app.app.get("PORT"), () => {
    console.log(`listening to port §§§ ${app.app.get("PORT")} §§§`);
});
