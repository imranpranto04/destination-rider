import React, { useEffect, useState } from 'react';
import './Home.css'
import riderData from '../../data/data.json';
import RideShow from '../RideShow/RideShow';

const Home = () => {

    const [rider, setRider] = useState([]);


    useEffect(() =>{
        setRider(riderData);
        // console.log(riderData);
    },[])

    return (
        <div className="container banner">
            
          <div className="row d-flex justify-content-center  ">
          {
               rider.map(ride=> <RideShow ride={ride}></RideShow>)
           }
          </div>

          <div className="items">
          <h1 className="mt-5 text-center ">Ride Share item: {rider.length}</h1>
          </div>

        </div>
    );
};

export default Home;