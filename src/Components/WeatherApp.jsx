import search from "../assets/search.png";
import clear from "../assets/clear.png"
import humidity from "../assets/humidity.png"
import wind from "../assets/wind.png"
export default function WeatherApp(){
    return(
        <section className="flex h-screen items-center justify-center font-sans">
            <div className="h-100 w-70 bg-blue-700 rounded-2xl px-2 py-4">
                <div className="flex items-center justify-center gap-4">
                    <input type="text" placeholder="Enter a city name" className="bg-white border border-white rounded-full p-2  focus:none outline-none text-black focus:ring-2 focus:ring-black transition-all duration-600" />
                <img src={search} alt="" className="border border-white rounded-full p-2 bg-white cursor-pointer" />
                </div>

                <div className="flex flex-col items-center ">
                    <img src={clear} alt="weather image" className="size-40" />
                    <p className="text-white text-5xl font-semibold">21°C</p>
                    <p className="text-white text-4xl ">London</p>
                </div>

                <div className="flex justify-between mt-5">
                    <div className="flex gap-1 ">
                        <img src={humidity} alt="Humidity" className="size-8" />
                        <div className="flex flex-col ">
                            <p className="text-2xl text-white ">64%</p>
                            <p className="text-md text-white">Humidity</p>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <img src={wind} alt="wind" className="size-8" />
                        <div className="flex flex-col ">
                            <p className="text-2xl text-white ">19km/h</p>
                            <p className="text-md text-white">Whind Speed</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}