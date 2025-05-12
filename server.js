const express = require("express");
const app = express();

const PORT = 3000; // Port to run on (e.g., 3000)
const HOST = "192.168.1.1"; // Host to bind to all IP addresses

// Serve static files or setup routes
app.get("/", (req, res) => {
    res.send("Hello World! This project is running on an IP address.");
});

// Start the server
app.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
});