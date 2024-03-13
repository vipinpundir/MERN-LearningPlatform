import React, { useEffect, useState } from 'react'
import Course from './Course.js';
import "./FetchCourses.css"
import { useDispatch } from 'react-redux';
import { getCourses } from '../redux/slices/CoursesSlice.js';


const FetchCourses = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState(null)
    console.log(data)

    useEffect(() => {

        const fetchData = async () => {
            try {
                const resData = await fetch('http://localhost:8080/api/course/', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!resData.ok){
                    throw new Error(resData.statusText)
                }
                const result = await resData.json();
                setData(result)
                dispatch(getCourses(result))

            } catch (error) {
                console.log(error, 'Error')
            }
        };
    console.log("UseEffect")
        fetchData();
        
    }, [dispatch]);


    return (
        <>
            <div className="container mt-5">
                <h1 className='text-center' style={{ color: "#181d38" }}>Popular Courses</h1>
                <div className='FetchCourses'>
                    {data? <> {data.map((course,index) => {
                        return <div key={index} >
                            <Course img={course.img_url}
                                id={course._id}
                                title={course.title}
                                description={course.description}
                                author={course.author}
                                category={course.category}
                                price={course.price} />
                        </div>
                    })} </> : <h1>courses are not available..</h1>}
                </div>
            </div>
            
        </>
    )
}

export default FetchCourses;