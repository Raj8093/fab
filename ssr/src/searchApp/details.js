import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { FaLocationArrow } from "react-icons/fa";
import axios from "axios";
import './index.css'
const Details = () => {
    const [locationDetails, setLocationDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const Id = params.get('Id');
    const type = params.get('type');

    useEffect(() => {
        setLoading(true)
        axios(`http://localhost:8000/detail/?Id=${Id}&type=${type}`)
            .then((res) => {
                setLocationDetails(res.data)
                setLoading(false)
            }).catch((error) => {
                console.log(error)
                setLocationDetails({})
                setLoading(false)
            })
    }, [])
    return (
        <div className="detailsContainer">
            {loading ? <div>Loading</div> : Object.keys(locationDetails).length ? <React.Fragment><div className="nameContainer">
                <div>
                    {locationDetails?.[type]?.title}
                </div>
            </div>
                <div className='otherDetails'>
                    <div><FaLocationArrow />  {locationDetails?.[type]?.address}</div>
                    {type == 'hotel' ? <div>{locationDetails?.[type]?.description}</div> : null}
                    {type == 'place' ? <div><a href={locationDetails?.[type]?.location} target="_blank">click here for location</a></div> : null}
                </div></React.Fragment> : null}
        </div>
    )
}
export { Details }