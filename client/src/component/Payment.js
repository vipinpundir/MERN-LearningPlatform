import React,{useState} from 'react'
import "./Payment.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchApiData } from '../services/apiService';
import Spinner from 'react-bootstrap/Spinner';

const Payment = () => {
  const { id, name, author, price } = useParams();
  const loginDetails = JSON.parse(localStorage.getItem('loginDetails'));
  const [showLoading, setShowLoading] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (loginDetails != null) {
      const userData = { userEmail: loginDetails.email, courseID: id }

      try {
        setShowLoading(true);
        const data = await fetchApiData(`/api/enrolled/course/`, 'POST', userData);
        toast.success(data.message);
      } catch (error) {
        console.error("error", error);
      }finally{
        setShowLoading(false);
      }

    } else {
      toast.warning("Login is required")
    }

  }

  return (

    <div className="Payment-from">
      <div className="Payment shadow pt-5">
        <Form onSubmit={handleSubmit}>
          <h1>Course Payment</h1>
          <p><strong>Purchasing</strong> "{name}"</p>
          <p><strong>Instructor</strong> "{author}"</p>

          <Form.Group className="mb-3" >
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" required />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>UPI ID</Form.Label>
            <Form.Control type="text" placeholder="Enter your UPI ID" required />
          </Form.Group>

          <Form.Group className="mb-3 d-flex justify-content-between" >
            <Form.Label><strong>Total Amount:  {price}Rs </strong></Form.Label>
          </Form.Group>
          <Button variant="primary" type="submit"> {showLoading?<Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>: "Pay Now"} </Button>

        </Form>
      </div>
    </div>
  );
}
export default Payment
