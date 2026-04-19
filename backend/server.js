require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db.js");

const authRoutes = require('./routes/auth.routes.js');
const userRoutes = require("./routes/user.routes.js");
const taskRoutes = require('./routes/task.routes.js');
const reportRoutes = require("./routes/report.routes.js");

const app = express();

//* middleware to handle CORS
app.use(cors({
    origin: [
        // process.env.CLIENT_URL,
        "https://collaspace.netlify.app",
        "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))

//* connect to database
connectDB();

//* middleware to parse JSON bodies
app.use(express.json());


//* routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportRoutes);

//* serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
    res.send("API is running...");
});

//* start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})