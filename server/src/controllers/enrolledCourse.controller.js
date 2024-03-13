const EnrolledCourse = require('../models/enrolledCourse.model');

// Controller function to enroll a user in a course
const enrollUserInCourse = async (req, res) => {
    const { userEmail, courseID } = req.body;

    try {
        const enrolledCourse = new EnrolledCourse({ userEmail, courseID });
        await enrolledCourse.save();

        res.status(201).json({ message: 'User enrolled in the course successfully' });

    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.userEmail) {
            // Duplicate key error, indicating a duplicate enrollment
            return res.status(400).json({ error: 'User is already enrolled in this course' });
        }
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Controller function to find enrolled courses for a user
const findEnrolledCoursesForUser = async (req, res) => {
    const { userEmail } = req.params;

    try {
        const enrolledCourses = await EnrolledCourse.find({ userEmail })

        res.status(200).json(enrolledCourses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    enrollUserInCourse,
    findEnrolledCoursesForUser
};
