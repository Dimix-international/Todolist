import React, {useEffect, useState} from "react";
import s from './Clock.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import {WeatherInitialStateType} from "../weather-reducer";

type ClockType = {}
export const Clock: React.FC<ClockType> = (props) => {


    const weather = useSelector<AppRootStateType, WeatherInitialStateType>(state => state.weather);

    let hours = Math.abs(new Date().getUTCHours() + (weather.timezone / 3600));

    if (hours >= 24) {
        hours -= 24;
    }

    let [secondsClock, setSecondsClock] = useState(new Date().getSeconds());
    let [minutesClock, setMinutesClock] = useState(new Date().getMinutes());


    const digitTime = (value: number) => value < 10 ? `0${value}` : value;


    useEffect(() => {
        let intervalId: number = window.setInterval(() => {

            setSecondsClock(new Date().getSeconds());
            setMinutesClock(new Date().getMinutes());

            if (minutesClock > 58) {
                hours++;
            }
            if (hours > 23) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                hours = 0;
            }
        }, 1000);

        return () => {
            clearInterval(intervalId)
        }

    }, [secondsClock, hours, minutesClock]);

    return (
        <div className={s.clock}>
            <span className={s.value}>{digitTime(hours)}</span>
            <span className={s.value}>:</span>
            <span className={s.value}>{digitTime(minutesClock)}</span>
            <span className={s.value}>:</span>
            <span className={s.value}>{digitTime(secondsClock)}</span>
        </div>
    )
}