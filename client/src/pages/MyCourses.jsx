import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { fetchApiData } from '../services/apiService';

const MyCourses = () => {
  const enrolled = []
  const [enrolledCoursesDetails, setEnrolledCoursesDetails] = useState([])
  const [enrolledCourses, setEnrolledCourses] = useState(enrolled)

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

    for(const course of enrolledCoursesDetails){

      const findEnrolledCoursesById = async () => {
        try {
          const data = await fetchApiData(`/api/course/id/${course.courseID}`);
          enrolled.push(data)
          setEnrolledCourses(enrolled)
        } catch (error) {
          console.error("error", error);
        }
      }
      findEnrolledCoursesById()
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
            : <><h5>You haven't enrolled in any course.</h5></>}


        </Row>
      </Container>
    </div>
  )
}

export default MyCourses