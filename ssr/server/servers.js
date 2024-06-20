import path from 'path';
import fs from 'fs';
import axios from 'axios';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import createStore from '../src/store/store';
import App from '../src/App';

const PORT = 8000;
const app = express();
const data = {  hotels:[{
  title: "FabHotel The Pearl",
  address: "Gurugram, India",
  hotelID: "ht456a001",
  description: "Being in a major corporate hub of the NCR, FabHotel The Pearl is one of the preferred budget hotels in Gurgaon among business travelers."
},
{
  title: "FabHotel Tavishk",
  address: "Gurugram, India",
  hotelID: "ht456a002",
  description: "FabHotel Tavishk is among the most preferred budget hotels on Golf Course Road, Gurgaon."
},
{
  title: "FabHotel The Residency",
  address: "Gurugram, India",
  hotelID: "ht456a003",
  description: "Situated in the safe and peaceful locality of Sushant Lok I, FabHotel The Residency DLF Galleria provides a convenient budget accommodation to several business travelers in Gurgaon."
},
{
  title: "FabHotel Hill View Suites",
  address: "Gurugram, India",
  hotelID: "ht456a004",
  description: "Situated in the posh locality of DLF Phase 2, FabHotel Hill View Suites DLF Phase 2 offers a convenient and comfortable accommodation for business travelers."
},
{
  title: "FabHotel Fables",
  address: "New Delhi, India",
  hotelID: "ht456a005",
  description: "Strategically located in Safdarjung Enclave, FabHotel Fables Safdarjung offers spacious and airy rooms at reasonable rates."
},
{
  title: "FabHotel Cabana",
  address: "New Delhi, India",
  hotelID: "ht456a006",
  description: "Situated in the affluent locality of Greater Kailash, FabHotel Cabana is a great choice of accommodation for business travelers."
},
{
  title: "FabHotel New Sunstar",
  address: "New Delhi, India",
  hotelID: "ht456a007",
  description: "A convenient accommodation in Karol Bagh for leisure and business travelers alike, FabHotel Sunstar offers 3-star stay experience at affordable pricing."
},
{
  title: "FabHotel Exotica I",
  address: "New Delhi, India",
  hotelID: "ht456a008",
  description: "Situated in the safe and secure locality of South Delhi, FabHotel Exotica Green Park offers budget accommodation at competitive price."
},
{
  title: "FabHotel New Joe Grande",
  address: "Chennai, India",
  hotelID: "ht456a009",
  description: "FabHotel Joe Grande Thoraipakkam is an affordable hotel located in an important commercial center in Chennai."
},
{
  title: "FabHotel Colors Apart",
  address: "Chennai, India",
  hotelID: "ht456a010",
  description: "Easy accessibility, traditional hospitality and modern amenities make FabHotel Colors Apart Santhome a preferred hotel in Chennai."
},
{
  title: "FabHotel Chakra Inn",
  address: "Chennai, India",
  hotelID: "ht456a011",
  description: "FabHotel Sri Chakra Inn offers ultimate comfort to visitors by rendering all essential amenities at low prices."
},
{
  title: "FabHotel Exotica II",
  address: "Noida, India",
  hotelID: "ht456a012",
  description: "Situated in Sector 105 on Noida Expressway, FabHotel Exotica Noida is ideally suited for business travelers having their offices nearby."
},
{
  title: "FabHotel White Castle SEZ",
  address: "Noida, India",
  hotelID: "ht456a013",
  description: "Strategic location, tastefully decorated rooms and a homely atmosphere is what defines FabHotel White Castle."
},
{
  title: "FabHotel Kamran Palace",
  address: "Ahmedabad, India",
  hotelID: "ht456a014",
  description: "Located in the heart of the city, Kamran Palace Hotel is within walking distance of the business centre and the market."
},
{
  title: "FabHotel LA 365 Residency",
  address: "Ahmedabad, India",
  hotelID: "ht456a015",
  description: "A budget hotel comprising all rooms, it is strategically located in the heart of the city."
},
{
  title: "FabHotel Rock Regency",
  address: "Ahmedabad, India",
  hotelID: "ht456a016",
  description: "Boasting a palace-like façade, central location and economical prices, FabHotel Rock Regency is among the most well-known budget hotels in Navrangpura, Ahmedabad."
},
{
  title: "FabHotel Oriental",
  address: "Ahmedabad, India",
  hotelID: "ht456a017",
  description: "Located in the heart of Ahmedabad’s business hub, FabHotel Oriental Ellisbridge is one of the most value-for-money hotels in the city."
},
{
  title: "FabHotel Atithi",
  address: "Pune, India",
  hotelID: "ht456a018",
  description: "Spick and span rooms, warm hospitality and prime location make FabHotel Atithi Baner one of the preferred hotels in Pune."
},
{
  title: "FabHotel Gharonda Residency",
  address: "Pune, India",
  hotelID: "ht456a019",
  description: "One of the preferred budget hotels in Pune, FabHotel Gharonda Residency is situated in the northern part of the city."
},
{
  title: "FabHotel Blue Diamond",
  address: "Pune, India",
  hotelID: "ht456a020",
  description: "Closeness to major corporate hubs, modern amenities and amiable staff make FabHotel Blue Diamond one of the best budget hotels in Navi Mumbai."
},
{
  title: "FabHotel Udipi Home",
  address: "Chennai, India",
  hotelID: "ht456a021",
  description: "FabHotel Udipi Home Egmore is a 3-star hotel located in a commercially important area in Chennai."
},
{
  title: "FabHotel Stay Eeasy",
  address: "Chennai, India",
  hotelID: "ht456a022",
  description: "FabHotel Stay Eeasy Thiruvanmiyur is a 15-room service apartment located in Chennai, offering modern amenities to its guests."
}]};

const router = express.Router();
app.use('/build', express.static('build'));

const serverRenderer = (req, res, next) => {
  const context = {};
  const store = createStore();

  // Preload your Redux store with data if needed
  store.dispatch({ type: 'INIT_DATA', payload: data });

  const app = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  const preloadedState = store.getState();

  fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send('An error occurred');
    }
    return res.send(
      data
        .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
        .replace(
          '</body>',
          `<script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script></body>`
        )
    );
  });
};

app.get(`/hoteldetails`,async (req, res) => {
  const input = req.query.suggest;
  const apiKey = 'AIzaSyDu39wTmb1waUxrNdBA51EAPPhuauOn5SQ';

  if (!input) {
      return res.status(400).json({ error: 'Input query parameter is required' });
  }
  function findHotelsByTitle(searchTitle, hotelList) {
    searchTitle = searchTitle.toLowerCase();
    return hotelList.filter(hotel => hotel.title.toLowerCase().includes(searchTitle));
  }
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json`, {
        params: {
            input: input,
            key: apiKey
        }
    });
    let reponseDataCombined={place:response.data}
    reponseDataCombined['hotels']={predictions:[]}
    let suggestedHotels=await findHotelsByTitle(input,data.hotels)
    
    
    if(suggestedHotels.length){
      reponseDataCombined['hotels']={predictions:suggestedHotels}
    }
    res.status(200).json(reponseDataCombined);
} catch (error) {
    res.status(500).json({ error: 'Google server error' });
}
})

app.get(`/detail`,async(req,res)=>{
  const Id = req.query.Id;
  const type = req.query.type;
  const apiKey = 'AIzaSyDu39wTmb1waUxrNdBA51EAPPhuauOn5SQ';
  function findHoteldbyId(searchTitle, hotelList) {
    searchTitle = searchTitle.toLowerCase();
    return hotelList.filter(hotel => hotel.hotelID.toLowerCase().includes(searchTitle));
  }
  try {
    let responseTobeSent={}
    if(type=='hotel'){
      let filteredHotel=findHoteldbyId(Id,data.hotels)
      responseTobeSent['hotel']=filteredHotel[0]
    }else if(type=="place"){
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
        params: {
          place_id: Id,
            key: apiKey
        }
    });
      let formattedPlace={
      title:response.data?.result?.name,
      address:response.data?.result?.formatted_address,
      location:response.data?.result?.url
      }
    responseTobeSent['place']=formattedPlace
    }


    res.status(200).json(responseTobeSent);
} catch (error) {
    res.status(500).json({ error: 'Some error happened' });
}
})

app.use((req, res, next) => {
  if (/\.js|\.css|\.png/.test(req.path)) {
    res.redirect('/build' + req.path);
  } else {
    next();
  }
});

app.get('*', serverRenderer);

router.use(
  express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' })
);
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
