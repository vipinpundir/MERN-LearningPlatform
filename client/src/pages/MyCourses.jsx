import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { fetchApiData } from '../services/apiService';
import Spinner from 'react-bootstrap/Spinner';

const MyCourses = () => {
  const [enrolledCoursesDetails, setEnrolledCoursesDetails] = useState([])
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    const userEmail = (JSON.parse(localStorage.getItem('loginDetails'))).email

    const findEnrolledCoursesDetails = async () => {
      try {
        const data = await fetchApiData(`/api/enrolled/course/${userEmail}`);
        setEnrolledCoursesDetails(data);
      } catch (error) {
        console.error("error", error);
      }
    }
    findEnrolledCoursesDetails()

  }, [])

  useEffect(() => {

    if (enrolledCoursesDetails) {
      for (const course of enrolledCoursesDetails) {

        const findEnrolledCoursesById = async () => {
          try {
            const data = await fetchApiData(`/api/course/id/${course.courseID}`);
            setEnrolledCourses((pre) => {
              return [...pre, data];
            })
          } catch (error) {
            console.error("error", error);
          }
        }
        findEnrolledCoursesById()
      }
      setShowLoading(false)
    }

  }, [enrolledCoursesDetails])


  return (
    <div className='MyCourses'>
      <Container>
        <Row >
          <h1>My Courses</h1>
          <p>Access your enrolled courses below. Click on a course to start learning.</p>
          {enrolledCourses.length > 0
            ? <>
              {enrolledCourses.map((course) => {
                return (
                  <Row key={course._id} >
                    <Col className='p-4' md={8}>
                      <h1>{course.title}</h1>
                      <p>{course.description}</p>
                      <Row>
                        <Col><p><strong>Instructor:</strong> {course.author}</p></Col>
                        <Col><p><strong>Category:</strong> {course.category}</p></Col>
                        <Col><p><strong>Duration:</strong> 10 hourse</p></Col>
                      </Row>
                    </Col>
                    <Col className='p-4' md={4}>
                      <iframe
                        width="100%"
                        height="100%"
                        src={course.video_url + '?controls=1'}
                        title="YouTube Video Player"
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </Col>
                  </Row>
                )
              })}
            </>
            : <><h5>{showLoading?<Spinner as="span"  size="sm" role="status" aria-hidden="true"/>: "You haven't enrolled in any course."}</h5></>}


        </Row>
      </Container>
    </div>
  )
}

export default MyCourses