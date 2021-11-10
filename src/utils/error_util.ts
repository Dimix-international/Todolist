import {
    setAppErrorAC,
    SetAppErrorType,
    setAppStatusAC, SetAppStatusType
} from "../app/app-reducer";
import {TodolistResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";


export const handleServerAppError = <T>(data: TodolistResponseType<T> | string,
                                        dispatch: Dispatch<SetAppErrorType
                                            | SetAppStatusType>) => {
    if(typeof data === 'string') {
        dispatch(setAppErrorAC(data));
        dispatch(setAppStatusAC('failed'));
    } else{
        if (data.messages.length ) {
            dispatch(setAppErrorAC(data.messages[0]));
            dispatch(setAppStatusAC('failed'));
        } else {
            dispatch(setAppErrorAC('some error occurred'));
            dispatch(setAppStatusAC('failed'));
        }
    }
}
export const handleServerNetworkError = (error: { message: string },
                                         dispatch: Dispatch<SetAppErrorType
                                             | SetAppStatusType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'some error occurred'));
    dispatch(setAppStatusAC('failed'));
}