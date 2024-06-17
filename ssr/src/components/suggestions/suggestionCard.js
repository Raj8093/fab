import './index.css'
const SuggestionCard=(props)=>{
    const {hotel}=props
     return(
        <div className='suggestItem'>

                <div className="primarySuggest">{hotel.title}</div>
                <div className="secondarySuggest">{hotel.address}</div>
            </div>
     )
}
export {SuggestionCard}