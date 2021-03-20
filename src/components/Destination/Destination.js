import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './Destination.css';

const Destination = () => {
    return (
        <div className="container destination">
            <div className="row">

                <div className="col-md-4 mt-5 show-option">
                    <Form className="bg-light p-4 rounded">
                        <Form.Group controlId="formBasicText">
                            <Form.Label>Pick From</Form.Label>
                            <Form.Control type="text" placeholder="Mirpur-1" />
                           
                        </Form.Group>

                        <Form.Group controlId="formBasicText">
                            <Form.Label>Pick To</Form.Label>
                            <Form.Control type="password" placeholder="Dhanmondi" />
                        </Form.Group>
                        
                        <Button className="bg-danger w-100 search-button " variant="primary" > Search </Button>
                    </Form>
                </div>

                <div className="col-md-8">
                    <img className="img-fluid m-5" src={'https://snazzy-maps-cdn.azureedge.net/assets/287720-modest.png?v=20191016033259'} alt="" />
                </div>


            </div>
        </div>
    );
};

export default Destination;