import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RideShow = (props) => {
    const { name, image, id } = props.ride;
    return (
        <div>
            {/* <h1>Name:{name}</h1>
            <img className="w-25" src={image} alt=""/>
             */}
            <div>
            <Card className="m-2 p-3 mt-5" style={{ width: '18rem' }}>
                <Link to={`/destination/${id}`}><Card.Img variant="top" src={image} /></Link>
                <Card.Body>
                    <Card.Title className="text-center">{name}</Card.Title>
                    
                </Card.Body>
            </Card>
            </div>
          
        </div>

        
    );
};

export default RideShow;