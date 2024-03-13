import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { loginCheck } from '../redux/slices/LoginSlice';
import { adminStatus } from '../redux/slices/AdminSlice';

import { toast } from 'react-toastify';


const CustomNav = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.login);
  const isAdmin = useSelector(state => state.adminStatus);


  const logoutHandle =()=>{
    toast.success("Logout successfully");
    dispatch(loginCheck(false));
    dispatch(adminStatus(false));
    localStorage.removeItem('loginDetails');
  }

  return (
    <div className="Nav shadow">
      <Navbar expand="lg" className='navbar-dark shadow-5-strong'>

      <Container fluid>
          <Navbar.Brand ><Link style={{fontSize:"1.8rem", fontWeight: "800", textDecoration: 'none',color: "#06BBCC"}} to="/">LearnHub360</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className='Nav-links'>

            <Nav className="me-auto my-2 my-lg-0" navbarScroll>  
            </Nav>
            
            <Link to="/about">About Us</Link>
                {isLoggedIn
                  ?
                  <>
                  {isAdmin ? <Link to="/admin/dashboard">Admin Panel</Link> :< Link to="/enrolled/courses"> My Courses</Link>}
                    
                    <Link  onClick={() =>{logoutHandle()} } >Logout</Link>
                  </>
                  : <>
                    <Link to="/login"> Login</Link>
                    <Link to="/signup"> Signup</Link>
                  </>
                }

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>

  )
}

export default CustomNav