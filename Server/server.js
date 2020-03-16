// Call in requirements
const express = require("express");
const connectDB = require("./config/db");

// Initialize Express
const app = express();

// Connect DataBase
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API's running nicely boss"));

// Defined Routes
app.use("/api/user", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/post", require("./routes/api/posts"));

// API Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
