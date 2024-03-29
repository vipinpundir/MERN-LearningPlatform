const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config(); // Load environment variables from .env file
const db = require('./src/db/connectToMongoDB'); // Assuming this connects to MongoDB
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser'); // Pars cookies
app.use(cookieParser()); // Load cookie


const port = process.env.PORT; // Get the port from environment variables

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use cors middleware
app.use(cors({
    origin: 'https://learnhub360.netlify.app', // Allow requests from port 3000 (React frontend)
    credentials: true // Allow cookies to be sent and received across domains
}));


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
