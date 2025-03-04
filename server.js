const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (CSS, JS, images, videos)
app.use(express.static(path.join(__dirname, "public")));

// Routes for navigation
app.get("/", (req, res) => {
    res.render("ipad-start"); // First screen (Start button)
});

app.get("/ipad-controls", (req, res) => {
    res.render("ipad-controls"); // Screen with 5 video buttons
});

app.get("/tv", (req, res) => {
    res.render("tv-screen"); // TV screen that plays videos
});

// WebSocket logic
io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("playVideo", (video) => {
        console.log(`Playing Video: ${video}`);
        io.emit("playVideo", video); // Broadcast to all clients (TV screen)
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// Start the server
server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
