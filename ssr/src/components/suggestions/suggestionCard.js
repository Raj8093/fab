import './index.css'
import React from 'react';
const SuggestionCard=(props)=>{
    const {hotel,type}=props
    function handleSwitchCase(value) {
        switch(value) {
            case 'hotels':
                return {title:hotel.title,address:hotel.address}
                break;
            case 'place':
                return {title:hotel.structured_formatting.main_text,address:hotel.structured_formatting.secondary_text || hotel.structured_formatting.main_text }
                break;
            default:
                return{title:'',hotel:''}
        }
    }
    let data=handleSwitchCase(type)
     return(
        <div className='suggestItem'>
                <div className="primarySuggest">{data.title}</div>
                <div className="secondarySuggest">{data.address}</div>
            </div>
     )
}
export {SuggestionCard}