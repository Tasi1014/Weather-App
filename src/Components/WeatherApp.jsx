import search_icon from "../assets/search.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import clear_icon from "../assets/clear.png";
import wind_icom from "../assets/wind.png"; // Note: fix typo to wind_icon if needed
import humidity_icon from "../assets/humidity.png";
import { useEffect, useState, useRef } from "react";
import { LuMapPin, LuSettings, LuDroplet, LuWind, LuEye } from "react-icons/lu";

export default function WeatherApp() {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const getWindDirection = (deg) => {
    const directions = ["North", "NorthEast", "East", "SouthEast", "South", "SouthWest", "West", "NorthWest"];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  const getUVWarning = (uv) => {
    if (uv <= 2) return "Low";
    if (uv <= 5) return "Moderate";
    if (uv <= 7) return "High";
    if (uv <= 10) return "Very High";
    return "Extreme";
  };

  const getVisibilityMessage = (km) => {
    if (km >= 10) return "It's perfectly clear right now.";
    if (km >= 5) return "Good visibility, slight haze.";
    if (km >= 2) return "Moderate visibility, drive carefully.";
    if (km >= 1) return "Low visibility due to mist or fog.";
    return "Dangerous visibility. Heavy fog expected.";
  };

  const searchWeather = async (city) => {
    if (city === "") return;
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (!response.ok) {
        alert("City not found");
        return;
      }

      const randomUV = (data.dt > data.sys.sunrise && data.dt < data.sys.sunset) 
        ? (Math.random() * 11).toFixed(1) 
        : 0;

      const icon = allIcons[data.weather[0].icon] || clear_icon;
      
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: Math.floor(data.wind.speed),
        temperature: Math.floor(data.main.temp),
        feels: Math.floor(data.main.feels_like),
        location: data.name,
        icon: icon,
        dewPoint: Math.floor(data.main.temp - (100 - data.main.humidity) / 5),
        visibility: (data.visibility / 1000).toFixed(1),
        windDir: getWindDirection(data.wind.deg),
        uvIndexMssg: getUVWarning(randomUV),
        uvIndex: randomUV,
        visibilityMssg: getVisibilityMessage((data.visibility / 1000).toFixed(1))
      });
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  // Form submit handler for "Enter" key
  const handleSearch = (e) => {
    e.preventDefault();
    searchWeather(inputRef.current.value);
  };

  useEffect(() => {
    searchWeather("London");
  }, []);

  if (!weatherData) return <div className="h-screen bg-[#180F56] flex items-center justify-center text-white">Loading...</div>;

  return (
    <section className="min-h-screen font-sans text-white bg-[#180F56] p-4 lg:p-8">
      <header className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0">
        <span className="text-3xl lg:text-4xl font-bold">TasiWeather</span>
        
        <form onSubmit={handleSearch} className="relative w-full max-w-md lg:max-w-xl">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter a city name"
            className="bg-[#1E1552] rounded-full py-3 px-6 pr-14 outline-none text-[#4DDAF1] focus:ring-2 focus:ring-blue-400 transition-all w-full"
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2">
            <img src={search_icon} alt="search" className="w-6 h-6 cursor-pointer" />
          </button>
        </form>

        <div className="text-[#737DB4] flex gap-8">
          <LuMapPin size={25} className="cursor-pointer hover:text-white transition-colors" />
          <LuSettings size={25} className="cursor-pointer hover:text-white transition-colors" />
        </div>
      </header>

      <main className="mt-12 lg:mt-16 lg:px-8">
        {/* CURRENT WEATHER SECTION */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start text-center lg:text-left gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-sm tracking-widest text-[#4DDAF1]">CURRENT LOCATION</span>
            <span className="text-4xl lg:text-6xl font-bold">{weatherData.location}</span>
          </div>

          <div className="flex flex-row items-center gap-6">
            <img src={weatherData.icon} alt="weather" className="w-24 h-24 lg:w-32 lg:h-32" />
            <div className="flex flex-col">
              <span className="text-6xl lg:text-8xl font-bold">{weatherData.temperature}°C</span>
              <p className="text-[#4DDAF1] lg:text-lg lg:ml-4">Feels Like {weatherData.feels}°C</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pb-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-3xl p-6 flex flex-col justify-between h-48">
            <div className="flex justify-between items-center">
              <span className="text-[#4DDAF1] font-semibold text-sm">HUMIDITY</span>
              <LuDroplet size={25} className="text-[#4DDAF1] drop-shadow-[0_0_8px_rgba(77,218,241,0.8)]" />
            </div>
            <div>
              <span className="text-4xl font-semibold">{weatherData.humidity}%</span>
              <p className="text-[#4DDAF1] text-xs mt-2 font-medium">The dew point is {weatherData.dewPoint}°C</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-3xl p-6 flex flex-col justify-between h-48">
            <div className="flex justify-between items-center">
              <span className="text-[#4DDAF1] font-semibold text-sm">WIND</span>
              <LuWind size={25} className="text-[#4DDAF1] drop-shadow-[0_0_8px_rgba(77,218,241,0.8)]" />
            </div>
            <div>
              <span className="text-4xl font-semibold">{weatherData.windSpeed} km/h</span>
              <p className="text-[#4DDAF1] text-xs mt-2 font-medium">Coming from {weatherData.windDir}</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-3xl p-6 flex flex-col justify-between h-48">
            <div className="flex justify-between items-center">
              <span className="text-[#4DDAF1] font-semibold text-sm">UV INDEX</span>
              <img src={weatherData.icon} className="w-8 h-8 opacity-80" alt="uv-icon" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-semibold">{weatherData.uvIndex}</span>
                <span className="text-lg font-medium text-[#4DDAF1]">{weatherData.uvIndexMssg}</span>
              </div>
              <p className="text-[#4DDAF1] text-xs mt-2 font-medium">Protect your skin from sun</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-3xl p-6 flex flex-col justify-between h-48">
            <div className="flex justify-between items-center">
              <span className="text-[#4DDAF1] font-semibold text-sm">VISIBILITY</span>
              <LuEye size={25} className="text-[#4DDAF1] drop-shadow-[0_0_8px_rgba(77,218,241,0.8)]" />
            </div>
            <div>
              <span className="text-4xl font-semibold">{weatherData.visibility} <span className="text-xl">km</span></span>
              <p className="text-[#4DDAF1] text-xs mt-2 font-medium">{weatherData.visibilityMssg}</p>
            </div>
          </div>

        </div>
      </main>
    </section>
  );
}