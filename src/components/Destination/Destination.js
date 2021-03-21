import React, { useState } from 'react';
import { Button, Form, Dropdown } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import riderData from '../../data/data.json';

import './Destination.css';

const Destination = () => {

    let { riderId } = useParams();
    console.log(riderId);
    const riderDetails = riderData.find(data => data.id == riderId);
    console.log(riderDetails);
    const {name, rent, image } = riderDetails;

    const [search, setSearch] = useState({
        from: '',
        to: '',
    });
    console.log("search");
    const [click, setClick] = useState(false);

    const handleChange = (e) => {
        let isPickLocation=(true);
        if (e.target.name === "from") {
            const result = /^[a-zA-Z ]+$/;
            isPickLocation = result.test(e.target.value);
            console.log(isPickLocation);
        }
        if (e.target.name === "to") {
            const result = /^[a-zA-Z ]+$/;
            const isPickLocationTo = result.test(e.target.value);
            isPickLocation = isPickLocationTo;
        }

        if (isPickLocation) {
            const newPickLocation = {...search};
            newPickLocation[e.target.name] = e.target.value;
            setSearch(newPickLocation);
            console.log(isPickLocation);
        }
    }

    console.log("From 26", search.to);

    const handleClick = () =>{
        setClick(!click)
    }


    return (
        <div className="container destination">
            <div className="row">

                {/* for search destination */}

                <div className="col-md-4 mt-5 show-option ">
                    {
                        !click && <Form className="bg-light p-4 rounded">
                        <Form.Group controlId="formBasicText">
                            <Form.Label >Pick From</Form.Label>
                            <Form.Control type="text" onBlur={handleChange} placeholder="Mirpur-1" name="from" />

                        </Form.Group>

                        <Form.Group controlId="formBasicText">
                            <Form.Label>Pick To</Form.Label>
                            <Form.Control type="text" onBlur={handleChange} placeholder="Dhanmondi" name="to" />
                        </Form.Group>

                        <Button onClick={handleClick} className="bg-danger w-100 search-button " variant="primary" > Search </Button>
                    </Form>
                    }

                { click && <div className="mt-5">
                    <div className="bg-success text-center p-2 text-white">
                        <h4>{search.from}</h4>
                        <p>to</p>
                        <h4>{search.to}</h4>
                    </div>

                    <div className="d-flex p-4">
                    <img className="w-25 img-fluid mr-3" src={image} alt=""/>
                    <h5 className="mr-3">{name}</h5>
                    <h5>Charge: ${rent}</h5>
                    </div>

                    <div className="d-flex p-4">
                    <img className="w-25 img-fluid mr-3" src={image} alt=""/>
                    <h5 className="mr-3">{name}</h5>
                    <h5>Charge: ${rent}</h5>
                    </div>

                    <div className="d-flex p-4">
                    <img className="w-25 img-fluid mr-3" src={image} alt=""/>
                    <h5 className="mr-3">{name}</h5>
                    <h5>Charge: ${rent}</h5>
                    </div>
                    
                </div>}

                </div>

                   {/* for show vehicle */}

                {/* google map */}

                <div className="col-md-8">
                    <img className="img-fluid m-5" src={'https://snazzy-maps-cdn.azureedge.net/assets/287720-modest.png?v=20191016033259'} alt="" />
                </div>


            </div>
        </div>
    );
};

export default Destination;