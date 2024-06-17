import { SearchBar } from "../components/searchBar";
import { Suggestions } from '../components/suggestions';
import React,{useState} from "react";
import "./index.css"
const Search=()=>{
    const [hotelData,setHotelData]=useState({})
    const getHoteldata=(data)=>{
        setHotelData(data)
    }
return(
    <div className="container">
        <div className="wrapper">
        <SearchBar getHoteldata={getHoteldata}/>
        <Suggestions hotelData={hotelData}/>
        </div>
    </div>
)
}
export{Search}