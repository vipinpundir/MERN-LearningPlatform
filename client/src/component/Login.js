import React, { useState } from 'react';
import "../component/Login.css"
import Button from 'react-bootstrap/esm/Button'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginCheck } from '../redux/slices/LoginSlice';
import { adminStatus } from '../redux/slices/AdminSlice';
import { toast } from 'react-toastify';

const Login = () => {
    const dispatch = useDispatch();
    const redirect = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData((previousFormData) => {
            return {
                ...previousFormData,
                [e.target.name]: e.target.value
            }
        });
    };

    const userLogin = async () => {
        try {
            const resData = await fetch('http://localhost:8080/api/auth/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const result = await resData.json();
            if (!resData.ok) {
                toast.error(result.error);
                throw new Error(resData.error);
            }
            toast.success(result.message);
            localStorage.setItem('loginDetails', JSON.stringify(result.user));
            dispatch(loginCheck(true))

            // Check is Admin or not 
            if (result.user.role === 'admin') {
                dispatch(adminStatus(true));
                redirect("/admin/dashboard");
            } else {
                setTimeout(() => {
                    redirect("/");
                }, 1000);
            }

        } catch (error) {
            console.log(error, 'Error')
            toast.error(error)
        }

    };

    const handleLogin = (e) => {
        e.preventDefault()
        if (formData.email.length === 0 && formData.password.length === 0) {
            toast.warning("Email and password is required")
        } else {
            userLogin()
        }

    };

    return (
        <>
            <div className="Login">
                <form onSubmit={handleLogin}>
                    <h2 className='mb-5'>Login</h2>
                    <div className="mb-3 ">
                        <input className="form-control" name='email' onChange={handleChange} value={formData.email} type="text" placeholder="Enter your email" required />
                    </div>
                    <div className="mb-3 ">
                        <input className="form-control" name='password' onChange={handleChange} value={formData.password} type="current-password" placeholder="Enter your password" required />
                    </div>
                    <Button type='submit' >Login</Button>
                    <p className='mt-3'>Have not account yet?</p><Link className='btn' to="/signup" >Signup</Link>
                </form>
            </div>

        </>
    )
}

export default Login