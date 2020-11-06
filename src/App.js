import React, {useState} from "react";
import logo from './logo.svg';
import axios from "axios";
import Loader from "react-loader-spinner";
import './App.css'; 

//

/*const DayArray = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];*/

 const App = () => {
  const [cityName,setCityName] = useState("");
  const [dayArray,setDayArray] = useState([]); 
  const [current,setCurrent] = useState({});
  const [location,setLocation] = useState({});
  const [loading,setLoading] = useState(false); 
  const [curr, setCurr] = useState(false);
 /* const [forecast, setForecast] = useState({});*/

  /*const date = new Date();
  const day = date.getDay();
 const DayArray = [
    { day: "Sun" , temp: 27},
    { day: "Mon" , temp: 30},
    { day: "Tue" , temp: 32},
    { day: "Wed" , temp: 24},
    { day: "Thu" , temp: 30},
    { day: "Fri" , temp: 24},
    { day: "Sat" , temp: 36},
    
    
  ]; */

   const daysName = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

 /* const conditionBackground = {
     /*Sunny:"sun.jpg"
     "Partly cloudy":"pc.jpg"
     /*Light,rain,shower:"rain.gif"
     Mist:"mist.gif"
     Snow:"snow.gif"
  };*/

  const getWeatherForecast = () => {
    if(!cityName) {
       return;
    }
    
    setLocation(false);
    setDayArray([]);
    setCurr(false);
    const url = "http://api.weatherapi.com/v1/forecast.json?key=36497fdfe8694866925141606202810&days=6&q=" + cityName;
    axios.get(url).then((result) => {
      setLoading(false);
      setCurr(false);
      if(result.data){ 
        
       /* setForecast(result.data.forecast);*/ 

        const _forecast = result.data.forecast;
        setCurrent(result.data.current);
        setLocation(result.data.location);
        console.log("result", result.data);
        //const _location = result.data.location;
       /* const locArr=[];
        locArr.location.forEach((ele) => {
          console.log("ele",ele);
            const object = {};
            
            object.localtime =ele.localtime;
            object.country =ele.country;
            object.name=ele.name;
            object.region=ele.region;
            locArr.push(object);
        });*/

        const newArr = [];
        _forecast.forecastday.forEach((elem) => {
          
          const obj = {};
          const day = new Date(elem.date).getDay();
    
          obj.day = daysName[day];
          obj.date = elem.date;
          obj.max = elem.day.maxtemp_c;
          obj.min = elem.day.mintemp_c;
          obj.avg = elem.day.avgtemp_c;
          obj.maxwind = elem.day.maxwind_kph;
          obj.avghumidity = elem.day.avghumidity;
          obj.conditionIcon = "https:" + elem.day.condition.icon;
          obj.conditionText = elem.day.condition.text;
          obj.sunrise = elem.astro.sunrise;
          obj.sunset = elem.astro.sunset;
          obj.moonrise = elem.astro.moonrise;
          obj.moonset = elem.astro.moonset;
          obj.moonphase = elem.astro.moon_phase;
      
        // obj.localtime =elem.location.localtime;
          //obj.country =elem.location.country;
        // obj.name=elem.location.name;
         // obj.region=elem.location.region;
          

          newArr.push(obj);
        });
         
        setDayArray(newArr);
        setCurr(true);

      }
    })
    .catch((error) => {
      setLoading(false);
      setCurrent(false);
      setCurr(false);
      alert(error.message);
    });
  };

  return(
    <div className = "App" style={{backgroundImage:"url(star.gif)" }}>
    
    { /* HEADER */ }
      <div className = "Header">
          
          <div className="MainHeaderText">Weather App</div>
          <div className="MainHeaderText SideText">by Nisha Choudhary</div>
      </div>
        { /* SEARCH  CONTAINER */ }
        <div className="SearchContainer">
          
            <input 
              type="text" 
              placeholder="Search City" 
              onChange={(e) => {
                setCityName(e.target.value);
              }}
              style={{ height:"30px", width:"200px" , marginRight:"30px" }}
            />
          
            
            <input 
                type="button"
                 value="Get Weather"
                 onClick = {() => { 
                   getWeatherForecast();
                 }}
                  style={{ height:"30px",width:"100px",borderRadius:"10px",color:"Background" }}
            />
        </div>
        {loading ? (
          <div className="Loader">
     <Loader type="ThreeDots" color="#0000FF" height={80} width={80} />
          </div>
        ) :  null}

        { curr ? (<div className="LocationData">
        
          <div className="LocationText">Current Temp :    {current.temp_c} &#8451;</div>
          
          <h1>
            <img src={"https:"+current.condition.icon} width="80px"  height="90px"   paddingLeft="400px"/></h1>
          <h2>{current.condition.text}</h2>
          <h3>Local Time : {location.localtime}</h3>
          <h3>Name : {location.name} </h3>      
          <h3>Region : {location.region} </h3>       
           <h3>Country : {location.country}</h3> 
                   
        
      </div>) : null}

       
         
          
        
         
      
          

        {dayArray.map((e) => {
          return(
           
          
          
          
            // CARD  CONTAINER 1 
           
            <div className="Card">

              <div className="CardHeader">

            <div className="DayText">{e.day}</div>
            <div className="DateText">{e.date}</div>
            <img src={e.conditionIcon} />
            <div className="DateText">{e.conditionText}</div>
            </div>
            {/* Temperature */}
            <div>
              <div className="TempText">
                <div className="HeaderText">Min </div>
                <div> {e.min} &#8451;</div>
                
                
              </div>
              <div className="TempText">
                <div className="HeaderText">Avg </div>
                <div> {e.avg} &#8451; </div>
                
                
              </div>
              <div className="TempText">
                <div className="HeaderText">Max </div>
                <div>  { e.max} &#8451; </div>
                
               
                
              </div>
            </div>
            {/* Wind Speed & Humidity */}
            <div>
              <div className="PropertyText">
                <div className="HeaderText">Max Wind Speed</div>
                <div>{e.maxwind} Km/h</div>
              </div>
              <div className="PropertyText">
                <div className="HeaderText">Avg Humidity</div>
                <div>{e.avghumidity} Km/h</div>
              </div>
            </div>
            {/* Sunrise & Sunset */}
            <div>
              <div className="PropertyText">
                <div className="HeaderText">Sunrise</div>
                <div>{e.sunrise}</div>
              </div>
              <div className="PropertyText">
                <div className="HeaderText">Sunset</div>
                <div>{e.sunset}</div>
              </div>
            </div>
            {/* Moonrise, Moonset & Moon Phase */}
            <div>
              <div className="TempmText">
                <div className="HeaderText">Moonrise</div>
                <div> {e.moonrise}</div>
              </div>
              
              <div className="TempmText">
                <div className="HeaderText">Moonset</div>
                <div>{e.moonset}</div>
              </div>
              </div>

              <div className="TemppText">
              <div className="TempmText">
                <div className="HeaderText">Moon Phase</div>
                <div>{e.moonphase}</div>
              </div>
              </div>
            
          </div>
          
          
          );
        })}
    </div>
  );
};


export default App; 

