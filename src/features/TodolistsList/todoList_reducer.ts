import {v1} from "uuid";
import {todolistsApi, TodolistType} from "../../api/todolists-api";
import {AppThunk} from "../../app/store";
import {
    RequestStatusType, setAppErrorAC,
    setAppStatusAC,
    SetAppStatusType
} from "../../app/app-reducer";
import {
    handleServerAppError,
    handleServerNetworkError
} from "../../utils/error_util";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    //чтобы нельзя было много раз нажать на кнопку при удалении тудулиста, удаление - для действий с тудулистом
    entityStatus: RequestStatusType
}

export let todolistId1 = v1();
export let todolistId2 = v1();
const initialState: Array<TodolistDomainType> = [];

export type TodolistsActionType =
    | ReturnType<typeof changeTitleOfTodolistAC>
    | ReturnType<typeof changeFilterOfTodolistAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | RemoveTodoListType
    | AddTodoListType
    | SetTodolistsType
    | SetAppStatusType

export const todoListReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionType): Array<TodolistDomainType> => {

    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id);
        case 'ADD-TODOLIST' :
            return [{
                ...action.todolist,
                filter: 'all',
                entityStatus: 'idle'
            }, ...state]
        case 'CHANGE-TITLE-TODOLIST' :
            return state.map(t => t.id === action.id ? {
                ...t,
                title: action.title
            } : t)
        case 'CHANGE-FILTER-TODOLIST' :
            return state.map(t => t.id === action.id ? {
                ...t,
                filter: action.filter
            } : t)
        case "SET-TODOLISTS":
            return action.todolists.map(t => ({
                ...t,
                filter: 'all',
                entityStatus: 'idle'
            }));

        case "CHANGE_TODOLIST_ENTITY_STATUS": {
            return state.map(t => t.id === action.id ? {
                ...t,
                entityStatus: action.status
            } : t)

        }
        default:
            return state
    }
}
export type RemoveTodoListType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId
    } as const
}
export const removeTodolistTC = (id: string): AppThunk => {
    return (dispatch) => {

        dispatch(setAppStatusAC('loading'));
        dispatch(changeTodolistEntityStatusAC(id, 'loading'));

        todolistsApi.deleteTodolist(id)
            .then(response => {
                if(response.data.resultCode === 0) {
                    dispatch(removeTodolistAC(id));
                    dispatch(setAppStatusAC('succeeded'));
                } else{
                    handleServerAppError(response.data, dispatch);
                }
            })
            .catch(error => {
                handleServerNetworkError(error.message, dispatch);
            })
    }
}

export type AddTodoListType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        todolist
    } as const;
}
export const addTodolistTC = (title: string): AppThunk => {
    return (dispatch) => {

        dispatch(setAppStatusAC('loading'));

        todolistsApi.createTodolist(title)
            .then(response => {
                if(response.data.resultCode === 0) {
                    dispatch(fetchTodolistsTC());
                    dispatch(setAppStatusAC('succeeded'));
                } else{
                    handleServerAppError(response.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error.message, dispatch)
            })
    }
}

export const changeTitleOfTodolistAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TITLE-TODOLIST',
        id,
        title,
    } as const
}
export const changeTitleOfTodolistTC = (id: string, title: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'));
        todolistsApi.updateTodolist(id, title)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(changeTitleOfTodolistAC(id, title));
                    dispatch(setAppStatusAC('succeeded'));
                } else {
                    handleServerAppError(response.data, dispatch);
                }
            })
            .catch(error => {
                handleServerNetworkError(error.message, dispatch)
            })
    }
}

export const changeFilterOfTodolistAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER-TODOLIST',
        id,
        filter,
    } as const
}


export type SetTodolistsType = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {
        type: 'SET-TODOLISTS',
        todolists
    } as const;
}

//создаем thunk, которая будет получать todolists с сервера
//принцип thunk TC (thunk creator) -функция которая взвращает другую функцию
// т.е. TC возвращает нам thunk
//оборачиваем в TC т.к. мы можем передать сюда параметры которые будут
//использоваться - (произойдет замыкание)

/*export const fetchTodolistsTC = ():AppThunk => {
    return (dispatch) => {
        todolistsApi.getTodolists()
            .then(response => {
                dispatch(setTodolistsAC(response.data))
            })
    }
}*/

//используем async/await

export const fetchTodolistsTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'));
    try {
        const response = await todolistsApi.getTodolists();
        dispatch(setTodolistsAC(response.data));
        dispatch(setAppStatusAC('succeeded'));
    } catch (e) {
        handleServerAppError(e.message, dispatch);
    }
}


export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => {
    return {
        type: 'CHANGE_TODOLIST_ENTITY_STATUS',
        id,
        status
    } as const;
}


