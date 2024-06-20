const initialState = {
    hotels: {},
    selectedHotel: {},
  };
  
  

const hotelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_HOTELS':
      return {...state,hotels:action.payload}
    case 'SET_SELECTED_HOTEL':
      return {...state,selectedHotel:action.payload}
    default:
      return state;
  }
};

export  {hotelsReducer,initialState};