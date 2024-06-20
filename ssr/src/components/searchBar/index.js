import { FaSearch } from "react-icons/fa";
import React,{ useState,useEffect } from "react";
import './index.css'
const SearchBar=({getHoteldata})=>{
    const [searchTerm,setSearchTerm]=useState('')

    useEffect(()=>{
        if(searchTerm){
        fetch(`http://localhost:8000/hoteldetails/?suggest=${searchTerm}`)
        .then((res) => res.json())
        .then((json) => {
          getHoteldata(json)
        }).catch((error)=>{ 
            console.log(error)
            getHoteldata({})
        })}
        else{
            getHoteldata({})
        }
      },[searchTerm])

    const onInputchange=(input)=>{ 
        setSearchTerm(input)
    }

    return (
        <div className="searchContainer">
            <div className="searchWrapper">
            <FaSearch className="searchIcon" data-testid="searchIcon"/>
            <input value={searchTerm} 
            onChange={(e)=>onInputchange(e.target.value)} 
            className="inputBox"
            placeholder="Search here"/>
            </div>
        </div>
    )
}
export {SearchBar}