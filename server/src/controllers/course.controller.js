const Course = require("../models/course.model")

// Controller function to get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller function to get a specific course by ID
const getCourseById = async (req, res) => {
    const courseId = req.params.id;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller function to create a new course
const createCourse = async (req, res) => {
    const { title, author, category, price, description, video_url, img_url } = req.body;

    try {
        const newCourse = new Course({
            title,
            author,
            category,
            price,
            description,
            video_url,
            img_url
        });

        await newCourse.save();
        res.status(201).json({ message: "Course added successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller function to update a course by ID
const updateCourseById = async (req, res) => {
    const courseId = req.params.id;
    const updateData = req.body;
    
    try {
        if (Object.keys(updateData).length === 0) {
            return res.status(404).json({ error: 'Enter details' });
        }
        const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData, { new: true });

        if (!updatedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json({ message: "Update successful",updateData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller function to delete a course by ID
const deleteCourseById = async (req, res) => {
    const courseId = req.params.id;

    try {
        const deletedCourse = await Course.findByIdAndDelete(courseId);

        if (!deletedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourseById,
    deleteCourseById
};
