//чтобы не дублировать код, оборачивая все компоненты, где мы
// обращаемся к store, используя методы useSelector и Dispatch
// создаем функцию декоратор

import {Provider} from "react-redux";
import {
    todolistId1,
    todolistId2
} from "../features/TodolistsList/todoList_reducer";
import {v1} from "uuid";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../features/TodolistsList/tasks_reducer";
import {todoListReducer} from "../features/TodolistsList/todoList_reducer";
import {AppRootStateType} from "../app/store";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {appReducer} from "../app/app-reducer";
import {
    RequestWeather,
    weatherReducer
} from "../features/Weather/weather-reducer";
import thunk from "redux-thunk";
import {authReducer} from "../features/Login/auth_reducer";

//создаем тестовый набор данных (т.к. первоначально state пустой а мы хотим в демонстрации что-то показывать)
const rootReducer = combineReducers({
    todolists: todoListReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
    weather: weatherReducer,
})
const initialState: AppRootStateType = {
    todolists: [
        {
            id: todolistId1,
            title: "What to learn!",
            filter: "all",
            addedDate: '',
            order: 0,
            entityStatus: 'idle',
        },
        {
            id: todolistId2,
            title: "What to buy!",
            filter: "all",
            addedDate: '',
            order: 0,
            entityStatus: 'loading',
        }
    ],
    tasks: {
        [todolistId1]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: todolistId1,
                order: 0,
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: todolistId1,
                order: 0,
            },
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: "Bear",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: todolistId2,
                order: 0,
            },
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: todolistId2,
                order: 0,
            },
        ]
    },
    weather: {
        name: 'Gomel',
        temp: 282.14,
        humidity: 49,
        timezone: 10800,
        country: 'BY',
        icon: '01d',
        problemError:  null,
        status: RequestWeather.IDLE,
        statusRequest:RequestWeather.IDLE,
    },
    app: {
        error: null,
        status: "idle",
        isInitialized:false
    },
    auth:{
        isLoggedIn: false,
    }
}

export const storyBookStore = createStore(rootReducer, initialState as AppRootStateType, applyMiddleware(thunk));
//, initialState as AppRootStateType - state  - как инициализационноый ( с него начнется отрисовка)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}