import React, {useCallback, useEffect,} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    fetchWeatherTC,
    RequestWeather,
    searchWeatherTC,
    WeatherInitialStateType
} from "./weather-reducer";
import s from './WeatherCardContainer.module.css';
import {CircularProgress} from "@material-ui/core";
import {WeatherCard} from "./WeatherCard";

type WeatherCardContainerType = {
    demo?: boolean
}

export const WeatherCardContainer: React.FC<WeatherCardContainerType> = React.memo(({demo = false}) => {

        const weather = useSelector<AppRootStateType, WeatherInitialStateType>(state => state.weather);
        const dispatch = useDispatch();

        const showWeather = useCallback((cityName: string) => {
            if (cityName.length === 0) return;
            dispatch(searchWeatherTC(cityName));
        },[dispatch])

        useEffect(() => {
            if (demo) {
                return;
            }
            dispatch(fetchWeatherTC())
        }, [dispatch, demo]);

        useEffect(() => {
            if (demo) {
                return;
            }
            let intervalId: number = window.setInterval(() => {
                dispatch(fetchWeatherTC());
            }, 3600000);

            return () => {
                clearInterval(intervalId)
            }
        }, [dispatch, demo]);

        return (
            <div className={s.body}>
                <div className={s.container}>
                    {
                        weather.status === RequestWeather.LOADING
                            ? <div className={s.container__loader}>
                                <CircularProgress
                                    className={s.loader}
                                    color="inherit"
                                />
                            </div>
                            : <WeatherCard
                                weather={weather}
                                showWeather={showWeather}
                                dispatch={dispatch}
                                error={weather.problemError}
                            />
                    }
                </div>

            </div>
        )
    }
)