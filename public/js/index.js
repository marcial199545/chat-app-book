const socket = window.io();
const form = jQuery("#message-form");
socket.on("connect", function() {
    console.log("connected to server");
});
socket.on("disconnect", function() {
    console.log("Disconnected from server");
});
socket.on("newMessage", function(message) {
    let li = jQuery("<li></li>");
    li.addClass("incoming-message");
    li.text(`${message.from}: ${message.text}`);
    jQuery("#messages").append(li);
});

form.on("submit", function(e) {
    e.preventDefault();
    socket.emit("createMessage", { from: "User", text: jQuery("[name=message]").val() }, function(data) {
        console.log("ACKOWNLEDGE ==> Got it", data);
    });
    form.trigger("reset");
});

// socket.emit("createMessage", messageUtils.generateMessage("somenone", "blah"));
