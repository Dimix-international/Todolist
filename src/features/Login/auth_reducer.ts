import {authAPI, LoadingParamsType} from "../../api/todolists-api";
import {setAppStatusAC} from "../../app/app-reducer";
import {
    handleServerAppError,
    handleServerNetworkError
} from "../../utils/error_util";
import {AppThunk} from "../../app/store";


const initialLoginState = {
    isLoggedIn: false,
};

export type LoginStateType = typeof initialLoginState;

export type AuthActionTypes = SetIsLoggedInType;


export const authReducer = (state: LoginStateType = initialLoginState, action: AuthActionTypes): LoginStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}

export type SetIsLoggedInType = ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return {
        type: 'login/SET-IS-LOGGED-IN',
        isLoggedIn
    } as const
}
//логинимся
export const loginTC = (data: LoadingParamsType): AppThunk => async dispatch => {

    dispatch(setAppStatusAC('loading'));
    try {
        const response = await authAPI.login(data);
        console.log(response)
        if (response.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setAppStatusAC('succeeded'));
        } else {
            handleServerAppError(response.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch);
    }
}
//вылогинимся
export const logOutTC = (): AppThunk => async dispatch => {

    dispatch(setAppStatusAC('loading'));
    try {
        const response = await authAPI.logout();
        if (response.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false));
            dispatch(setAppStatusAC('succeeded'));
        } else {
            handleServerAppError(response.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch);
    }
}

