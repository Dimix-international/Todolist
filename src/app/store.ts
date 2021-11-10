import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import {
    TasksActionTypes,
    tasksReducer
} from "../features/TodolistsList/tasks_reducer";
import {
    todoListReducer,
    TodolistsActionType
} from "../features/TodolistsList/todoList_reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {
    WeatherActionType,
    weatherReducer
} from "../features/Weather/weather-reducer";
import {AppActionReducerType, appReducer} from "./app-reducer";
import {AuthActionTypes, authReducer} from "../features/Login/auth_reducer";

const rootReducer = combineReducers({
    todolists: todoListReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
    weather: weatherReducer,
});


export type AppRootStateType = ReturnType<typeof rootReducer>
export const store: Store<AppRootStateType, AppActionsType> = createStore(rootReducer, applyMiddleware(thunk));
export type AppDispatchType = typeof store.dispatch;

//типизация для всех action app
export type AppActionsType =
    | TodolistsActionType
    | TasksActionTypes
    | WeatherActionType
    | AuthActionTypes
    | AppActionReducerType;

//универсальная thunk
export type AppThunk<ReturnType = void> = ThunkAction<//ReturnType = void - параметр по умолчанию возвращ значения
    ReturnType,
    AppRootStateType,
    unknown,
    AppActionsType>
// @ts-ignore
window.store = store