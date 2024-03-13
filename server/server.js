const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config(); // Load environment variables from .env file
const db = require('./src/db/connectToMongoDB'); // Assuming this connects to MongoDB
const bodyParser = require('body-parser');

const port = process.env.PORT; // Get the port from environment variables

// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Use cors middleware
app.use(cors());

// Import routes
const authRoutes = require("./src/routes/auth.routes");
const courseRoutes = require("./src/routes/course.routes");
const enrolledCourseRoutes = require("./src/routes/enrolledCourse.routes");

app.use("/api/auth", authRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/enrolled/course", enrolledCourseRoutes);

// Start the server on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
