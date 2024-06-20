import './index.css';
import { SuggestionCard } from './suggestionCard';
import React, { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Suggestions = () => {
  const [suggestionHead, setSuggestionHead] = useState([])
  const hotelData = useSelector((state) => state.hotels);
  const navigate = useNavigate ();
  const formatHotel = () => {
    let heads = Object.keys(hotelData) || []
    if (heads.length) {
      setSuggestionHead(heads)
    } else {
      setSuggestionHead([])
    }
  }
  useEffect(() => {
    formatHotel()
  }, [hotelData])

  const getSelected=(hotel,type)=>{

    const detailData={}
    if(type=='place'){
      detailData['Id']=hotel.place_id
      detailData['type']='place'
    }else if(type=='hotels'){
      detailData['Id']=hotel.hotelID
      detailData['type']='hotel'
    }
    const params = new URLSearchParams(detailData).toString();
    navigate(`/details?${params}`);
  }
  return (
    <div>
      {suggestionHead.map((item, idx) => {
        if (hotelData[item]?.predictions?.length) {
          return (
            <React.Fragment>
              <div className='suggestItemHeader' key={idx}>
                {item}
              </div>
              {hotelData[item]?.predictions?.map((prediction, index) => {
                return (<div key={index} onClick={()=>getSelected(prediction,item)}>
                  <SuggestionCard hotel={prediction} type={item}/>
                </div>)
              })}
            </React.Fragment>
          )
        }
      })}
    </div>
  )
}
export { Suggestions };