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
    origin: process.env.CLIENT_URL || "*",
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

//* start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})