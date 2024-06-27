export const setHotels = (hotels) => ({
    type: 'SET_HOTELS',
    payload: hotels
  });
  
  export const setSelectedHotel = (hotel) => ({
    type: 'SET_SELECTED_HOTEL',
    payload: hotel
  });