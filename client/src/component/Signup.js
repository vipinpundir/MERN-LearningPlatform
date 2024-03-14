import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import "../component/Login.css"
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';


const Signup = () => {
    const apiUrl = process.env.REACT_APP_API_URL
    const [showLoading, setShowLoading] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData((previousData) => {
            return {
                ...previousData,
                [e.target.name]: e.target.value
            }
        });
    }

    const userSignup = async () => {
        try {
            setShowLoading(true)
            const resData = await fetch(`${apiUrl}/api/auth/signup`, {
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
            toast.success("User created successfully")
        } catch (error) {
            console.log(error, 'Error')
            toast.error(error)
        }finally{
            setShowLoading(false)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.fullName.length === 0 && formData.email.length === 0 && formData.password.length === 0) {
            toast.warning("Details are required")
        } else {
            userSignup();
        }

    };

    return (
        <div className="Signup">
            <form>
                <h2 className='mb-5'>Signup</h2>
                <div className="mb-3 ">
                    <input className="form-control" name='fullName' onChange={handleChange} value={formData.fullName} type="text" placeholder="Enter your name" />
                </div>
                <div className="mb-3 ">
                    <input className="form-control" name='email' onChange={handleChange} value={formData.email} type="email" placeholder="Enter your email" />
                </div>
                <div className="mb-3 ">
                    <input className="form-control" name='password' onChange={handleChange} value={formData.password} type="current-password" placeholder="Enter your password" />
                </div>
                <Button onClick={handleSubmit} type='submit'> {showLoading?<Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>: "Signup"} </Button>
                <p className='mt-3'>Already have an account?</p><Link className='btn' to="/login" >Login</Link>

            </form>
        </div>
    );
};

export default Signup;