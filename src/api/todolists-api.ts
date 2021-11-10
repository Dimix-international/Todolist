import axios, {AxiosResponse} from "axios";

const keyAPI = '64d44fa4-b3e5-49bf-91e2-eff700cb2dbc';
const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": keyAPI,
    }
};
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    ...settings,
});


export const todolistsApi = {

    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<{ title: string }, AxiosResponse<TodolistResponseType<CreateTodolistDataType>>>('todo-lists', {
            title,
        })
    },
    deleteTodolist(id: string) {
        return instance.delete<TodolistResponseType>(`todo-lists/${id}`, settings)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<{ title: string }, AxiosResponse<TodolistResponseType>>(`todo-lists/${id}`, {
            title,
        })
    },

    getTasksInTodolist(todolistID: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistID}/tasks`)
    },
    createTaskInTodolist(todolistID: string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<TodolistResponseType<{ item: TaskType }>>>(`todo-lists/${todolistID}/tasks`, {
            title,
        })
    },
    deleteTaskInTodolist(todolistID: string, id: string) {
        return instance.delete<TodolistResponseType>(`todo-lists/${todolistID}/tasks/${id}`)
    },
    updateTaskInTodolist(todolistID: string, id: string, task: UpdateModelTaskType) {
        return instance.put<UpdateModelTaskType, AxiosResponse<TodolistResponseType<{ item: TaskType }>>>(`todo-lists/${todolistID}/tasks/${id}`,
            task)
    },
}


export type LoadingParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}
export const authAPI = {
    login(data: LoadingParamsType) {
        return instance.post<{ data: LoadingParamsType },
            AxiosResponse<TodolistResponseType<{ userId?: number }>>>('/auth/login', data)
    },
    logout() {
        return instance.delete<TodolistResponseType>('/auth/login')
    },
    me() {
        return instance.get<TodolistResponseType<{ id: number; login: string; email: string }>>('/auth/me')
    }
}


export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
};
export type TodolistResponseType<T = {}> = {
    data: T,
    messages: Array<string>,
    fieldsErrors: Array<string>,
    resultCode: number
};
type CreateTodolistDataType = {
    item: TodolistType
};
export type GetTasksResponse = {
    error: string | null
    items: Array<TaskType>
    totalCount: number
};

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft,
};

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Urgently = 3,
    Later = 4,
};

export type TaskType = {
    addedDate: string
    deadline: string
    description: string
    id: string
    order: number
    //priority: number
    priority: TaskPriorities
    startDate: string
    // status: number
    status: TaskStatuses
    title: string
    todoListId: string
};
export type UpdateModelTaskType = {
    title: string
    description: string
    status: number,
    priority: number
    startDate: string
    deadline: string
};


