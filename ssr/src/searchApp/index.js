import { Routes, Route } from 'react-router-dom';
import { Search } from "./search";
import { Details } from "./details";
import React from "react";
const SearchApp=()=>{
    return(
        <Routes>
            <Route path={"/"} Component={Search}/>
            <Route path={'/details'} Component={Details}/>
        </Routes>
    )
}
export {SearchApp}