const socket = window.io();
const form = jQuery("#message-form");
const geoButton = jQuery("#send-location");

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
socket.on("newLocationMessage", function(message) {
    let li = jQuery("<li></li>");
    let a = jQuery(`<a target="_blank">Go to location</a>`);
    li.text(`${message.from}: `);
    a.attr("href", message.url);
    li.append(a);
    jQuery("#messages").append(li);
});

form.on("submit", function(e) {
    e.preventDefault();
    socket.emit("createMessage", { from: "User", text: jQuery("[name=message]").val() }, function(data) {
        console.log("ACKOWNLEDGE ==> Got it", data);
    });
    form.trigger("reset");
});
geoButton.on("click", function(e) {
    if (!navigator.geolocation) {
        return alert("browser dont support geolocation");
    } else {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                socket.emit("createLocationMessage", {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            function() {
                alert("Unable to fetch location");
            }
        );
    }
});
