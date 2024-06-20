import { FaSearch } from "react-icons/fa";
import React,{ useState,useEffect } from "react";
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import { setHotels } from "../../store/actions";
import axios from "axios";
const SearchBar=()=>{
    const [searchTerm,setSearchTerm]=useState('')
    const dispatch = useDispatch();

    useEffect(()=>{
        if(searchTerm){
        axios(`http://localhost:8000/hoteldetails/?suggest=${searchTerm}`)
        .then((res) =>{ 
          dispatch(setHotels(res.data))})
        .catch((error)=>{ 
            console.log(error)
            dispatch(setHotels({}));
        })}
        else{
            dispatch(setHotels({}));
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