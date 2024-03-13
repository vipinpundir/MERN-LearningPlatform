import React, { useEffect, useState } from 'react'
import Course from './Course';
import "./Courses.css"

const Courses = () => {
    const [data, setdata] = useState([])

    async function fetchCourses() {
        const URL = 'http://localhost:3000/courses';
        const Res = fetch(URL);
        const response = await Res;
        const json= await response.json();
        setdata(json)
    }
    useEffect(() => {
        //Runs only on the first render
        fetchCourses()
      }, []);
    

    return (
        <div className="container mt-5">
            <h1>Available Courses</h1>
        <div className='Courses'>
            {data.map((element) => {
            return <div key={element.id} >
                <Course img={element.img} title = {element.title} desc={element.desc} url={element.videourl} author={element.author} cate={element.categories} price={element.price} />
            </div>
          })}
        </div>
        </div>
    )
}

export default Courses;