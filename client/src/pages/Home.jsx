import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import CarouselImg from '../assets/header_img.jpg';
import CarouselImg2 from '../assets/header_img2.jpg';
import Courses from '../component/FetchCourses'
import About from '../component/About';

const Home = () => {
    return (
        <div className='Home'>

            <Carousel fade className='HomeCarousel'>
                <Carousel.Item>
                    <div className="overlay--container">
                        <img className="" src={CarouselImg} alt="Carouse First slide" />
                        <div className="overlay"></div>
                    </div>
                    <div className='CarouselCaption' >
                        <span>Best Online Courses</span>
                        <h5>The Best Online Learning Platform</h5>
                        <p>Welcome to our e-learning platform where you can access quality education from the comfort of your home.</p>
                    </div>
                </Carousel.Item>

                <Carousel.Item>
                    <div className="overlay--container">
                        <img className="" src={CarouselImg2} alt="Carouse First slide" />
                        <div className="overlay"></div>
                    </div>                    
                    <div className='CarouselCaption' >
                        <span>Best Online Courses</span>
                        <h5>Get Educated Online From Your Home</h5>
                        <p>Whether you are a student looking to enhance your skills or a professional seeking continuous learning.</p>
                    </div>
                </Carousel.Item>

            </Carousel>
            
            <Courses></Courses>
            <About></About>


        </div>
    )
}

export default Home