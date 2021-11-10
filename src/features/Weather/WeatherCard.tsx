import s from "./WeatherCard.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUmbrella} from "@fortawesome/free-solid-svg-icons";
import {Clock} from "./Clock/Clock";
import React, {ChangeEvent, useState} from "react";
import {RequestWeather, WeatherInitialStateType} from "./weather-reducer";
import {Dispatch} from "redux";
import {
    CustomizedSnackbars,
    SNACKBARS_TRIGGER
} from "../../components/ErrorSnackBar/ErrorSnackBar";
import {CircularProgress} from "@material-ui/core";


type WeatherCardType = {
    weather: WeatherInitialStateType
    showWeather: (nameCity: string) => void
    dispatch: Dispatch,
    error: null | string
}
export const WeatherCard: React.FC<WeatherCardType> = React.memo((
    {
        weather,
        showWeather,
        dispatch,
        error
    }) => {

        const [cityName, setCityName] = useState('');

        const cellsium = (weather.temp - 273.15).toFixed(0);

        const onChangeCityName = (e: ChangeEvent<HTMLInputElement>) => {
            setCityName(e.currentTarget.value)
        }

        const onClickSearchHandle = () => {
            showWeather(cityName);
            if(!!error) {
                setCityName('');
            }
        }

        return (
            <>
                <>
                    <div className={s.wrapper}>
                        {
                            weather.statusRequest === RequestWeather.LOADING
                                ? ''
                                : <img
                                    src={"https://openweathermap.org/img/w/" + weather.icon + ".png"}
                                    alt=""/>
                        }
                    </div>
                    {
                        weather.statusRequest === RequestWeather.LOADING
                            ? <div className={s.img__loader}><CircularProgress
                                className={s.loader}
                                color="inherit"
                            /></div>
                            : <div className={s.content}>
                                <div className={s.title}>Погода</div>
                                <div>{weather.name}</div>
                                <div className={s.humidity}>
                                <span><FontAwesomeIcon
                                    icon={faUmbrella}/></span>
                                    <span>{weather.humidity}%</span>
                                </div>
                                <div>{cellsium} &deg;C</div>
                                <Clock/>
                            </div>
                    }
                </>
                <div className={s.search}>
                    <input
                        value={cityName}
                        type="text"
                        onChange={onChangeCityName}
                    />
                    <button
                        disabled={weather.statusRequest === RequestWeather.LOADING}
                        onClick={onClickSearchHandle}
                    >show
                    </button>
                </div>
                <div className={s.error__body}>
                    <CustomizedSnackbars
                        error={weather.problemError}
                        dispatch={dispatch}
                        triggerName={SNACKBARS_TRIGGER.WEATHER_CARD}
                    /></div>
            </>
        )
    }
)