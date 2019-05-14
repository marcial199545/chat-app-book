const socket = window.io();
socket.on("connect", function() {
    console.log("connected to server");
});
socket.on("disconnect", function() {
    console.log("Disconnected from server");
});
socket.on("newMessage", function(message) {
    console.log(`TLC: newMessage ===> `, message);
});
socket.emit("createMessage", { from: "Andrew", text: "Yup, that works for me." });
