import React from 'react'
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import editIcone from "../assets/edit-svgrepo-com.svg"
import deleteIcone from "../assets/delete-svgrepo-com.svg"
import { toast } from 'react-toastify';
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { fetchApiData } from '../services/apiService';


const AdminDashboard = () => {
    const courseData = useSelector((state) => state.getCourse)

    const [editCourseStatus, setEditCourseStatus] = useState(false)
    const [addCourseStatus, setAddCourseStatus] = useState(false)


    const [addFormData, setAddFormData] = useState({
        title: '',
        author: '',
        category: '',
        price: '',
        description: '',
        video_url: '',
        img_url: ''
    })
    const [editFormData, setEditFormData] = useState({
        title: '',
        author: '',
        category: '',
        price: '',
        description: '',
        video_url: '',
        img_url: ''
    })


    const handleAddChange = (e) => {
        let name = e.target.name
        let value = e.target.value
      
        setAddFormData({
            ...addFormData,
            [name]: value
        })
    }
    const handleEditChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setEditFormData({
            ...editFormData,
            [name]: value
        })
    }


    // Handle New Course Adding operation
    const handleAddCourseSubmit = async(e) => {
        e.preventDefault()
        try {
            const data = await fetchApiData(`/api/course/add`, 'POST', addFormData);
            toast.success(data.message)
           setAddCourseStatus(false)
        } catch (error) {
            console.error('Error:', error);
            toast.error("internal server error");
        }
    }

    // Handle Course Deleting operation
    const handleCourseDeletion = async(id) => {
        try {
            const data = await fetchApiData(`/api/course/delete/${id}`, 'DELETE',);
            toast.success(data.message)
            setEditCourseStatus(false)
        } catch (error) {
            console.error("error", error);
            toast.error("internal server error");
        }
    }

    // Handle Course Edit operation
    const handleEditCourseSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await fetchApiData(`/api/course/update/${editFormData._id}`, 'PATCH', editFormData);
            toast.success(data.message)
            setEditCourseStatus(false)
        } catch (error) {
            console.error('Error fetching data in admin:', error);
            toast.error("internal server error");
        }
    }

    return (
        <div className='AdminDashboard container pt-5'>
            <div className="pt-4 mb-2 d-flex justify-content-between ">
                <h1>Admin Dashboard</h1>
                <button onClick={() =>setAddCourseStatus(true)} title='Add New Course' >+</button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>S.no </th>
                        <th>Course Name</th>
                        <th>Instructor Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courseData ?
                        courseData.map((course, index) => {
                            return <tr key={course._id}>
                                <td>{index + 1}</td>
                                <td>{course.title}</td>
                                <td>{course.author}</td>
                                <td> <button onClick={() => {
                                    setEditCourseStatus(true)
                                    setEditFormData(course)
                                }} className="btn bg-primary m-1"><img src={editIcone} alt="" /></button> <button onClick={() => handleCourseDeletion(course._id)} className="btn bg-danger m-1"><img src={deleteIcone} alt="" /></button> </td>
                            </tr>
                        })
                        : <><h1>No course available</h1></>}

                </tbody>
            </Table>
            {addCourseStatus ? <> <div className='AddCourse'>
                <form onSubmit={handleAddCourseSubmit}>
                    <div onClick={() =>setAddCourseStatus(false)} className='btn-wrong' >✖</div>
                    <h2 className='mb-5'>Add New Course</h2>
                    <input className="form-control" name='title' onChange={handleAddChange} value={addFormData.title} type="text" placeholder="Enter course title" required />
                    <input className="form-control" name='author' onChange={handleAddChange} value={addFormData.author} type="text" placeholder="Enter instructor name" required />
                    <input className="form-control" name='category' onChange={handleAddChange} value={addFormData.category} type="text" placeholder="Enter course category" required />
                    <input className="form-control" name='video_url' onChange={handleAddChange} value={addFormData.video_url} type="url" placeholder="Enter video_url" required />
                    <input className="form-control" name='img_url' onChange={handleAddChange} value={addFormData.img_url} type="url" placeholder="Enter thumbnail_url" required />
                    <input className="form-control" name='price' onChange={handleAddChange} value={addFormData.price} type="text" placeholder="Enter course price" required />
                    <input className="form-control" name='description' onChange={handleAddChange} value={addFormData.description} type="text" placeholder="Enter course description" required />

                    <Button type='submit' >Submit</Button>
                </form>
            </div></> : <></>}

            {editCourseStatus ? <> <div className='EditCourse'>
                <form onSubmit={handleEditCourseSubmit}>
                    <div onClick={() => setEditCourseStatus(false)} className='btn-wrong' >✖</div>
                    <h2 className='mb-5'>Edit Course Details</h2>
                    <input className="form-control" name='title' onChange={handleEditChange} value={editFormData.title} type="text" placeholder="Enter course title" required />
                    <input className="form-control" name='author' onChange={handleEditChange} value={editFormData.author} type="text" placeholder="Enter instructor name" required />
                    <input className="form-control" name='category' onChange={handleEditChange} value={editFormData.category} type="text" placeholder="Enter course category" required />
                    <input className="form-control" name='video_url' onChange={handleEditChange} value={editFormData.video_url} type="url" placeholder="Enter video_url" required />
                    <input className="form-control" name='img_url' onChange={handleEditChange} value={editFormData.img_url} type="url" placeholder="Enter thumbnail_url" required />
                    <input className="form-control" name='price' onChange={handleEditChange} value={editFormData.price} type="text" placeholder="Enter course price" required />
                    <textarea className="form-control" name='description' onChange={handleEditChange} value={editFormData.description} type="text" placeholder="Enter course description" required />

                    <Button type='submit' className='mt-3'>Edit Done</Button>
                </form>
            </div></> : <></>}
        </div>
    )
}

export default AdminDashboard