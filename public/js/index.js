const socket = window.io();
socket.on("connect", function() {
    console.log("connected to server");
});
socket.on("disconnect", function() {
    console.log("Disconnected from server");
});
socket.on("newEmail", function(email) {
    console.log("new Email", email);
});
