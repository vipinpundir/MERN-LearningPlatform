import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


const Course = (props) => {

    const handleClick = () => {
        const details={
            id: props.id,
            name: props.title,
            author: props.author,
            price: props.price,
            description: props.description,
            img: props.img,
            category: props.category
        }
        // Storing data in sessionStorage
        sessionStorage.setItem('coursePreviewDetails', JSON.stringify(details));
    }

    return (
        <>
            <div className="Course">
                <Card style={{ width: '20rem' }}>
                    <Card.Img variant="top" src={props.img} />
                    <Card.Body>
                        <Card.Title>{props.title}</Card.Title>
                        <Card.Text className='my-1'>{props.author}</Card.Text>
                        <Card.Text className='my-1'>{props.category}</Card.Text>
                        <Card.Text>₹{props.price}</Card.Text>
                        <Link to="/coursepreview" ><Button onClick={handleClick} >More details</Button> </Link>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default Course