import { SearchBar } from "../components/searchBar";
import { Suggestions } from '../components/suggestions';
import React from "react";
const Search=()=>{
return(
    <React.Fragment>
        <SearchBar/>
        <Suggestions/>
    </React.Fragment>
)
}
export{Search}