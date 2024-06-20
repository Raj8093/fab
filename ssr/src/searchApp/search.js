import { SearchBar } from "../components/searchBar";
import { Suggestions } from '../components/suggestions';
import React,{useState} from "react";
import "./index.css"
const Search=()=>{

return(
    <div className="container">
        <div className="wrapper">
        <SearchBar/>
        <Suggestions/>
        </div>
    </div>
)
}
export{Search}