import axios from "axios";

const instance = axios.create({
    baseURL:'http://api.openweathermap.org/data/2.5/'
})
const key = '7f92818d3aa6e43ddb3ac72563a85392';

type WeatherType = {
    id: number,
    main: string,
    description: string,
    icon: string
}

type ResponseGetWeatherType={
    coord: {lon:number, lat:number},
    weather: Array<WeatherType>,
    base:string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number,
        gust: number
    },
    clouds: {
        all: number
    },
    dt: number,
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone: number,
    id: number,
    name: string,
    cod: number

}

export const weatherApi = {
    getWeather(city:string) {
        return instance.get<ResponseGetWeatherType>(`weather?q=${city}&appid=${key}`)
    }
}
