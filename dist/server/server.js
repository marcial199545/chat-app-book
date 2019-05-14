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
    socket.emit("newEmail", { from: "mike@example.com", text: "Hey. What is going on.", createdAt: 123 });
    socket.on("disconnect", () => {
        console.log(`User disconnected`);
    });
});
server.listen(app.app.get("PORT"), () => {
    console.log(`listening to port §§§ ${app.app.get("PORT")} §§§`);
});
