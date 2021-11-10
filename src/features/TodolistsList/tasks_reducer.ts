import {
    AddTodoListType,
    RemoveTodoListType,
    SetTodolistsType,
} from "./todoList_reducer";
import {
    TaskType,
    todolistsApi,
    UpdateModelTaskType
} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType, AppThunk} from "../../app/store";
import {
    SetAppErrorType,
    setAppStatusAC,
    SetAppStatusType
} from "../../app/app-reducer";
import {
    handleServerAppError,
    handleServerNetworkError
} from "../../utils/error_util";

export type TasksStateType = {
    [key: string]: Array<TaskType>
};

const initialState: TasksStateType = {};

export type TasksActionTypes =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | AddTodoListType
    | RemoveTodoListType
    | SetTodolistsType
    | SetAppErrorType //ошибка из app-reducer
    | SetAppStatusType

//AddTodoListType, SetTodolistsType и RemoveTodoListType типы из Todolist_reducer
export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionTypes): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)
            }
        }

        case "ADD-TASK":
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case "UPDATE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId
                    ? {...t, ...action.domainModel}
                    : t
                )
            }
        }
        //перекликаются reducers, т.к. при добавлении или удалении todolist мы добавляем пустой массив /удаляем массив tasks
        //при получении todolists создаем и массив пустых tasks
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id];
            return stateCopy
        }
        case "SET-TODOLISTS": {// из action.todolists массива todolist делаем ассоциативный массив stateCopy
            const stateCopy = {...state};
            action.todolists.forEach(ts => {
                stateCopy[ts.id] = []
            })

            return stateCopy
        }
        case "SET-TASKS": {
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        }
        default:
            return state
    }
}
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        id,
        todolistId
    } as const
}
export const removeTaskTC = (todolistId: string, taskId: string) => {

    return (dispatch: Dispatch<AppActionsType>) => { //thunk

        dispatch(setAppStatusAC('loading'));

        todolistsApi.deleteTaskInTodolist(todolistId, taskId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(removeTaskAC(taskId, todolistId));
                    dispatch(setAppStatusAC('succeeded'));
                } else {
                    handleServerAppError(response.data, dispatch);
                    dispatch(setAppStatusAC('failed'));
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
    }
}

//сделаем для updateTask универсальную TC ( для changeStatusTC и changeTitleOfTaskTC)
type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number,
    priority?: number
    startDate?: string
    deadline?: string
}
export const updateTaskAC = (domainModel: UpdateDomainTaskModelType, todolistId: string, taskId: string) => {
    return {
        type: "UPDATE-TASK",
        domainModel,
        todolistId,
        taskId
    } as const
}
export const updateTaskTC = (domainModel: UpdateDomainTaskModelType, todolistId: string, taskId: string) => {
    return (dispatch: Dispatch<TasksActionTypes>, getState: () => AppRootStateType) => {

        dispatch(setAppStatusAC('loading'));

        const task = getState().tasks[todolistId].find(t => t.id === taskId);
        if (!task) {
            console.warn('task did not find');
            return
        }
        const apiModel: UpdateModelTaskType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,

            ...domainModel
        };
        todolistsApi.updateTaskInTodolist(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(domainModel, todolistId, taskId));
                    dispatch(setAppStatusAC('succeeded'));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
    }
}

export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        task,
    } as const
}
export const addTaskTC = (title: string, todolistId: string) => {

    return (dispatch: Dispatch<TasksActionTypes>) => {

        dispatch(setAppStatusAC('loading'));

        todolistsApi.createTaskInTodolist(todolistId, title)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(addTaskAC(response.data.data.item));
                    dispatch(setAppStatusAC('succeeded'));
                } else {
                    handleServerAppError(response.data, dispatch);
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
    }
}

export type SetTasksType = ReturnType<typeof setTasksAC>
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {
        type: 'SET-TASKS',
        tasks,
        todolistId,
    } as const
}
/*export const fetchTasksTC = (todolistId: string) => {

    return (dispatch: Dispatch<TasksActionTypes>) => {
        dispatch(setAppStatusAC('loading'));

        todolistsApi.getTasksInTodolist(todolistId)
            .then(response => {
                dispatch(setTasksAC(response.data.items, todolistId));
                dispatch(setAppStatusAC('succeeded'));
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
    }
}*/
export const fetchTasksTC = (todolistId: string) => async (dispatch: Dispatch<TasksActionTypes>) => {

    dispatch(setAppStatusAC('loading'));
    try {
        const response = await todolistsApi.getTasksInTodolist(todolistId);
        dispatch(setTasksAC(response.data.items, todolistId));
        dispatch(setAppStatusAC('succeeded'));
    } catch (error) {
        handleServerNetworkError(error, dispatch);
    }
}
