import { FaSearch } from "react-icons/fa";
import React,{ useState,useEffect } from "react";
import './index.css'
const SearchBar=()=>{
    const [searchTerm,setSearchTerm]=useState('')

    useEffect(()=>{
        fetch(`http://localhost:8000/hoteldetails/?suggest=${searchTerm}`)
        .then((res) => res.json())
        .then((json) => {
          console.log(json)
        }).catch((error)=>console.log(error))
      },[searchTerm])

    const onInputchange=(input)=>{ 
        setSearchTerm(input)
    }

    return (
        <div className="searchWrapper">
            <FaSearch className="searchIcon"/>
            <input value={searchTerm} 
            onChange={(e)=>onInputchange(e.target.value)} 
            className="inputBox"
            placeholder="Search here"/>
        </div>
    )
}
export {SearchBar}