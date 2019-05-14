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
    console.log("new user connected");
    // socket.emit("newMessage", { from: "John", text: "See you then", createdAt: 123123 });
    socket.on("createMessage", message => {
        console.log(`TLC: createMessage ===> `, message);
        io.emit("newMessage", { form: message.from, text: message.text, createdAt: new Date().getTime() });
    });
    socket.on("disconnect", () => {
        console.log(`User disconnected`);
    });
});
server.listen(app.app.get("PORT"), () => {
    console.log(`listening to port §§§ ${app.app.get("PORT")} §§§`);
});
