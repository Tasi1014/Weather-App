import search_icon from "../assets/search.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import clear_icon from "../assets/clear.png";
import wind_icom from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png"
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
export default function WeatherApp(){
    const inputRef = useRef()

    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d" : clear_icon,
        "01n" : clear_icon,
        "02d" : cloud_icon,
        "02n" : cloud_icon,
        "03d" : cloud_icon,
        "03n" : cloud_icon,
        "04d" : drizzle_icon,
        "09n" : rain_icon,
        "10d" : rain_icon,
        "10n" : rain_icon,
        "13d" : snow_icon,
        "13n" : snow_icon
    }
    const searchWeather = async (city)=>{
        try{
            const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon 
            })
        }catch(error){

        }

    }
    useEffect(()=>{
        searchWeather("");
    },[])
    return(
        <section className="flex h-screen items-center justify-center font-sans">
            <div className="h-100 w-70 bg-blue-700 rounded-2xl px-2 py-4">
                <div className="flex items-center justify-center gap-4">
                    <input ref={inputRef} type="text" placeholder="Enter a city name" className="bg-white border border-white rounded-full p-2  focus:none outline-none text-black focus:ring-2 focus:ring-black transition-all duration-600" />
                <img src={search_icon} alt="" className="border border-white rounded-full p-2 bg-white cursor-pointer" onClick={()=>{searchWeather(inputRef.current.value)}} />
                </div>

                <div className="flex flex-col items-center ">
                    <img src={weatherData.icon} alt="weather image" className="size-40" />
                    <p className="text-white text-5xl font-semibold">{weatherData.temperature}°C</p>
                    <p className="text-white text-4xl ">{weatherData.location}</p>
                </div>

                <div className="flex justify-between mt-5">
                    <div className="flex gap-1 ">
                        <img src={humidity_icon} alt="Humidity" className="size-8" />
                        <div className="flex flex-col ">
                            <p className="text-2xl text-white ">{weatherData.humidity}%</p>
                            <p className="text-md text-white">Humidity</p>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <img src={wind_icom} alt="wind" className="size-8" />
                        <div className="flex flex-col ">
                            <p className="text-2xl text-white ">{weatherData.windSpeed}Km/h</p>
                            <p className="text-md text-white">Wind Speed</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}