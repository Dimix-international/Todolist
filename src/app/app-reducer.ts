import {AppThunk} from "./store";
import {
    handleServerNetworkError
} from "../utils/error_util";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth_reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
//idle - запроса не было, loading - ждём ответа, succeeded - успешный ответ, failed -ответ с плохим результатом
type ErrorType = string | null;

const initialState = {
    //происходит ли сейчас взаимодействие с сервером
    status: 'loading' as RequestStatusType,
    //если ошибка какая-то произойдет - мы запишем текст ошибки сюда
    error: null as ErrorType,
    //состояние инициализации - когда все запросы выполнены то показываем страницу (проверили пользователя,
    //получили настройки и т.д.)
    isInitialized: false
}

export type InitialStateType = typeof initialState
export type AppActionReducerType =
    | SetAppStatusType
    | SetAppErrorType
    | SetAppIsInitializedType;

export const appReducer = (state: InitialStateType = initialState, action: AppActionReducerType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-APP-IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}
export type SetAppIsInitializedType = ReturnType<typeof setAppIsInitializedAC>
export const setAppIsInitializedAC = (isInitialized: boolean) => {
    return {
        type: 'APP/SET-APP-IS-INITIALIZED',
        isInitialized
    } as const
}

export const initializeAppTC = (): AppThunk => async dispatch => {
    try {
        const response = await authAPI.me();
        if (response.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        }
        //dispatch(setIsLoggedInAC(true));

        dispatch(setAppIsInitializedAC(true));
    } catch (e) {
        handleServerNetworkError(e.message, dispatch)
    }
}

export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}
