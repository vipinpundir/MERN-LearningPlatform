const mongoose = require('mongoose');

const enrolledCourseSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        ref: 'User' // Reference to the 'User' model
    },
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course' // Reference to the 'Course' model
    }
});

// Index to ensure the uniqueness of userEmail and courseID combination
enrolledCourseSchema.index({ userEmail: 1, courseID: 1 }, { unique: true });

const EnrolledCourse = mongoose.model('EnrolledCourse', enrolledCourseSchema);

module.exports = EnrolledCourse;
