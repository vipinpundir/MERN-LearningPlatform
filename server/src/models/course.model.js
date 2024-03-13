const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    video_url: {
        type: String,
        required: true
    },
    img_url: {
        type: String,
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
