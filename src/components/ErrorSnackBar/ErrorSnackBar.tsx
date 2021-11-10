import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {Dispatch} from "redux";
import {setAppErrorAC} from "../../app/app-reducer";
import {setWeatherErrorAC} from "../../features/Weather/weather-reducer";
import {AppActionsType} from "../../app/store";


export enum SNACKBARS_TRIGGER {
    APP_TODOLIST = 'APP_TODOLIST',
    WEATHER_CARD = 'WEATHER_CARD'
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export type CustomizedSnackbarsType = {
    error: null | string,
    dispatch: Dispatch<AppActionsType>,
    triggerName: SNACKBARS_TRIGGER
}
export const CustomizedSnackbars: React.FC<CustomizedSnackbarsType> = (props) => {
    const {error, dispatch, triggerName} = props;


    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(triggerName === SNACKBARS_TRIGGER.APP_TODOLIST
            ? setAppErrorAC(null)
            : setWeatherErrorAC(null));//ошибку увидели, через 6 сек ошибка исчезни
    };


    const isOpened = error !== null;

    return (
        <>
            <Snackbar open={isOpened} autoHideDuration={6000}
                      onClose={handleClose}>
                <Alert onClose={handleClose} severity="error"
                       sx={{width: '100%'}}>
                    {error}
                </Alert>
            </Snackbar>
        </>
    );
}