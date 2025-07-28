import React, { useEffect, useRef, useState } from 'react';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import clouds_icon from '../assets/clouds.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import mist_icon from '../assets/mist.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {

  const [city , setCity] = useState("");
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": clouds_icon,
    "02n": clouds_icon,
    "03d": clouds_icon,
    "03n": clouds_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "010d": mist_icon,
    "010n": mist_icon,
    "013d": snow_icon,
    "013n": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);

      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });

    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching data");
    }
  };

  useEffect(() => {
    search("Lahore");
  }, []);

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Weather App</h1>

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg space-y-6">
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
          <input
            type="text"
            value={city}
            placeholder="Enter city..."
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 outline-none text-gray-700"
          />
          <img
            src={search_icon}
            alt="Search"
            className="w-6 h-6 cursor-pointer"
            onClick={() => search(city)}
          />
        </div>

        {weatherData ? 
          <>
            <div className="flex flex-col items-center gap-y-2 text-center">
              <img src={weatherData.icon} alt="Weather Icon" className="w-24 h-24" />
              <p className="text-4xl font-semibold text-gray-800">{weatherData.temperature}°C</p>
              <p className="text-2xl text-gray-700">{weatherData.location}</p>
            </div>

            <div className="flex justify-center space-x-12 mt-4">
              <div className="flex items-center gap-2">
                <img src={humidity_icon} alt="Humidity" className="w-8 h-8" />
                <div>
                  <p className="text-lg font-medium text-gray-800">{weatherData.humidity}%</p>
                  <span className="text-sm text-gray-600">Humidity</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <img src={wind_icon} alt="Wind" className="w-8 h-8" />
                <div>
                  <p className="text-lg font-medium text-gray-800">{weatherData.windSpeed} km/h</p>
                  <span className="text-sm text-gray-600">Wind Speed</span>
                </div>
              </div>
            </div>
          </> : null}
        
      </div>
    </div>
  );
};

export default Weather;


