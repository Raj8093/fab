import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import './index.css'
const SearchBar=()=>{
    const [searchTerm,setSearchTerm]=useState('')
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