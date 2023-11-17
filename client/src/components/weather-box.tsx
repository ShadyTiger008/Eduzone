import axios from 'axios';
import { useEffect, useState } from 'react';
const WEATHER_API = "27cd15e0a62940828e170400233108";

const WeatherBox = ({ user }) => {
  const location = user?.location?.split(', ')[1];
  // console.log(location);
  const [weather, setWeather] = useState(null);
  
  useEffect(() => {
    const getWeather = async () => {
      const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_API}&q=${location}&aqi=no`);
      // console.log("Weather: ", response.data.current);
      setWeather(response.data.current);
    }
    
    getWeather();
    
  }, []);
  return (
    <main className="bg-cover bg-center flex items-center justify-center p-8 text-white rounded-xl" style={{ backgroundImage: `url("/bg.jpg")` }}>
      <div className='flex flex-col items-center gap-2 justify-center'>
        <h2 className="text-lg">Weather in {location}</h2>
        <h2 className="text-4xl font-bold">{weather?.temp_c}&deg;C</h2>
        <h2 className="text-lg">Feels like: {weather?.feelslike_c}&deg;C</h2>
        <div className='flex items-center gap-2 text-lg'>
          <img src={`https:${weather?.condition?.icon}`} alt="Weather Icon" className='w-10 h-10' />
          <span className='text-2xl font-semibold'>{weather?.condition?.text}</span>
        </div>
        <div className="text-sm flex flex-col gap-2 justify-center items-center">
          <div className='flex flex-row gap-5'>
            <div>Humidity:&nbsp;{weather?.humidity}%</div>
            <div>Visibility:&nbsp;{weather?.vis_km}</div>
          </div>
          <div className='flex flex-col gap-2'>
            <div>Wind Speed: {weather?.wind_kph}kmph</div>
            <div>Wind Degree: {weather?.wind_degree}kmph</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default WeatherBox;
