import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { FaLocationArrow } from "react-icons/fa";
import toast,{Toaster} from 'react-hot-toast';
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
        fetch(`http://localhost:8000/detail/?Id=${Id}&type=${type}`)
            .then((res) => res.json())
            .then((json) => {
                setLocationDetails(json)
                setLoading(false)
            }).catch((error) => {
                toast.error(error)
                setLocationDetails({})
                setLoading(false)
            })
    }, [])
    return (
        <div className="detailsContainer">
                  <Toaster
      position="top-center"
      />
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