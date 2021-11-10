import {AppThunk} from "../../app/store";
import {weatherApi} from "../../api/weather-api";
import {loadState, saveState} from "../../utils/localStorage_util";


export enum RequestWeather {
    IDLE = 'IDLE_REQUEST',
    LOADING = 'LOADING_REQUEST',
    SUCCEEDED = 'SUCCEEDED_REQUEST',
    FAILED = 'FAILED_REQUEST',
}

type ErrorType = string | null;
const initialState = {
    name: 'Gomel',
    temp: 282.14,
    humidity: 49,
    timezone: 10800,
    country: 'BY',
    icon: '',
    problemError: null as ErrorType,
    status: RequestWeather.IDLE,
    statusRequest:RequestWeather.IDLE,

}

export type WeatherActionType =
    | FetchWeatherType
    | ReturnType<typeof setWeatherStatusAC>
    | ReturnType<typeof setWeatherStatusRequestAC>
    | ReturnType<typeof setWeatherErrorAC>;

export type WeatherInitialStateType = typeof initialState;
export const weatherReducer = (state: WeatherInitialStateType = initialState, action: WeatherActionType): WeatherInitialStateType => {
    switch (action.type) {
        case "GET-WEATHER":
            return {...state, ...action.payload}
        case "SET_WEATHER_STATUS":
            return {...state, status: action.status}
        case "SET_WEATHER_REQUEST_STATUS":
            return {...state, statusRequest: action.statusRequest}
        case "SET_ERROR_WEATHER":
            return {...state, problemError: action.problemError}
        default:
            return state
    }
}

type FetchWeatherType = {
    type: 'GET-WEATHER',
    payload: {
        name: string,
        temp: number,
        humidity: number,
        timezone: number,
        icon: string
    }
}
const searchWeatherAC = (name: string, temp: number, humidity: number, timezone: number, icon: string): FetchWeatherType => {
    return {
        type: 'GET-WEATHER',
        payload: {
            name, temp, humidity, timezone, icon
        }
    }
}

export const searchWeatherTC = (city: string): AppThunk => async dispatch => {

    dispatch(setWeatherStatusRequestAC(RequestWeather.LOADING));

    try {
        const response = await weatherApi.getWeather(city);
        saveState(city)
        const {temp, humidity} = response.data.main;
        const {name, timezone} = response.data;
        const icon = response.data.weather[0].icon;


        dispatch(searchWeatherAC(name, temp, humidity, timezone, icon));
        dispatch(setWeatherStatusRequestAC(RequestWeather.SUCCEEDED));
    } catch (e) {
        dispatch(setWeatherErrorAC(e.response.data.message));
        dispatch(setWeatherStatusRequestAC(RequestWeather.FAILED))
    }
}

export const fetchWeatherTC = (): AppThunk => async dispatch => {

    dispatch(setWeatherStatusAC(RequestWeather.LOADING));

    try {
        const cityAsString = loadState();
        let response = await weatherApi.getWeather(cityAsString);
        const {temp, humidity} = response.data.main;
        const {name, timezone} = response.data;
        const icon = response.data.weather[0].icon;

        dispatch(searchWeatherAC(name, temp, humidity, timezone, icon));
        dispatch(setWeatherStatusAC(RequestWeather.SUCCEEDED));


    } catch (error) {
        dispatch(setWeatherErrorAC(error.response.data.message))
        dispatch(setWeatherStatusAC(RequestWeather.FAILED));
    }
}

export const setWeatherStatusAC = (status: RequestWeather) => ({
    type: 'SET_WEATHER_STATUS',
    status
} as const);


export const setWeatherStatusRequestAC = (statusRequest: RequestWeather) => ({
    type: 'SET_WEATHER_REQUEST_STATUS',
    statusRequest,
} as const);

export const setWeatherErrorAC = (problemError: string | null) => ({
    type: 'SET_ERROR_WEATHER',
    problemError
} as const);
