import React from 'react'
import aboutImg from '../assets/aboutImg.jpg'
import Footer from './Footer.js'

const About = () => {
  return (
    <>
    <div className='About container-fluid mt-3 pt-5 row justify-content-around'>
        <div className="about-img col-md-6 p-3">
            <img src={aboutImg} alt="" />
        </div>
        <div className="about-text col-md-6 p-3">
            <span>About us</span>
            <h1>Welcome to E-LEARNING</h1>
            <p>Welcome to eLEARNING, your trusted online education platform. We are dedicated to providing a rich and engaging learning experience for students of all levels. Our mission is to make education accessible from anywhere, anytime.</p>
            <p>Whether you are a student looking to enhance your skills or a professional seeking continuous learning, eLEARNING is your partner on the journey to success.</p>
            <ol>
                <li>Skilled Instructors</li>
                <li>International Certificate</li>
                <li>Online Classes</li>
            </ol>
            <div className="btn">Read More</div>
        </div>
    </div>
    <Footer></Footer>
    </>
  )
}

export default About