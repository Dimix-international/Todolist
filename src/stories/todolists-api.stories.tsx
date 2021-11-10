import React, {ChangeEvent, useEffect, useState} from 'react'
import {todolistsApi, UpdateModelTaskType} from "../api/todolists-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    const [count, setCount] = useState(0)
    const showTodolists = () => {
        todolistsApi.getTodolists()
            .then(response => {
                setState(response.data)
                setCount(response.data.length)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <button
                onClick={showTodolists}
            >show todolists
            </button>
            <span>count: {count}</span>
        </div>
    </div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setState(e.currentTarget.value)
    }
    const makeTodolist = () => {
        todolistsApi.createTodolist(state)
            .then(response => {
                if (response.data.resultCode === 0) {
                    setState(response.data)
                }
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={'write title'}
                type="text"
                value={state}
                onChange={onChangeHandler}
            />
            <button
                onClick={makeTodolist}
            >create todolist
            </button>
        </div>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setState(e.currentTarget.value)
    }
    const deleteTodolist = () => {
        todolistsApi.deleteTodolist(state)
            .then(response => {
                setState(response.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={'write id'}
                type="text"
                value={state}
                onChange={onChangeHandler}
            />
            <button
                onClick={deleteTodolist}
            >delete todolist
            </button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {

    const [state, setState] = useState<any>(null);
    const [title, newTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setState(e.currentTarget.value)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        newTitle(e.currentTarget.value)
    }
    const updateTodolist = () => {
        todolistsApi.updateTodolist(state, title)
            .then(response => {
                setState(response.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={'write id'}
                type="text"
                value={state}
                onChange={onChangeHandler}
            />
            <input
                placeholder={'write new title'}
                type="text"
                value={title}
                onChange={onChangeTitle}
            />
            <button
                onClick={updateTodolist}
            >update todolist
            </button>
        </div>
    </div>
}

//-------------tasks---------------------//

export const GetTasksOfTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState('')
    const [count, setCount] = useState(0)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const showTodolists = () => {
        todolistsApi.getTasksInTodolist(todolistId)
            .then(response => {
                console.log(response)
                setState(response.data.items)
                setCount(response.data.items.length)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={'write todolist id'}
                type="text"
                value={todolistId}
                onChange={onChangeHandler}
            />
            <button
                onClick={showTodolists}
            >show tasks
            </button>
            <span>count tasks: {count}</span>
        </div>
    </div>
}


export const CreateTaskOfTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState('')
    const [title, setTitle] = useState('')

    const writeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const makeTask = () => {
        todolistsApi.createTaskInTodolist(todolistId, title)
            .then(response => {
                setState(response.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={'write todolist id'}
                type="text"
                value={todolistId}
                onChange={writeTodolistId}
            />
            <input
                placeholder={'write title'}
                type="text"
                value={title}
                onChange={changeTitle}
            />
            <button
                onClick={makeTask}
            >create task
            </button>
        </div>
    </div>
}

export const DeleteTaskOfTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')

    const writeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    const deleteTask = () => {
        todolistsApi.deleteTaskInTodolist(todolistId, taskId)
            .then(response => {
                setState(response.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={'write todolist id'}
                type="text"
                value={todolistId}
                onChange={writeTodolistId}
            />
            <input
                placeholder={'write task id'}
                type="text"
                value={taskId}
                onChange={changeTitle}
            />
            <button
                onClick={deleteTask}
            >delete task
            </button>
        </div>
    </div>
}

//const todolistID = '33270751-e758-47aa-9208-cd768f05c74c';


export const UpdateTaskOfTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')

    const [task, setTask] = useState<UpdateModelTaskType>({
        title: '',
        description: '',
        status: 0,
        priority: 0,
        startDate: new Date().toLocaleString(),
        deadline: new Date().toLocaleString()
    })

    const writeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    const onChangeModelTask = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.dataset.name) {

            const trigger = e.currentTarget.dataset.name as keyof UpdateModelTaskType;

            // const obj: UpdateModelTaskType = {...task}
            //
            //
            // obj[trigger] =
            //     (trigger === 'status' || trigger === 'priority')
            //         ? Number(e.currentTarget.value)
            //         : e.currentTarget.value;
            //
            // setTask({...obj});

            switch (trigger) {
                case 'title' :
                     return setTask({...task, title: e.currentTarget.value});
                case 'description' :
                    return setTask({...task, description: e.currentTarget.value});
                case 'status' :
                    return setTask({...task, status: Number(e.currentTarget.value)});
                case 'priority' :
                    return setTask({...task, priority: Number(e.currentTarget.value)});
                default: return setTask({...task})
            }
        }
    }
    const updateTask = () => {
        todolistsApi.updateTaskInTodolist(todolistId, taskId, task)
            .then(response => {
                setState(response.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <div style={{marginBottom: '5px'}}>
                <input
                    placeholder={'write todolist id'}
                    type="text"
                    value={todolistId}
                    onChange={writeTodolistId}
                />
                <input
                    placeholder={'write task id'}
                    type="text"
                    value={taskId}
                    onChange={changeTitle}
                /></div>
            <div style={{marginBottom: '5px'}}>

                <form style={{
                    display: 'grid',
                    gridTemplate: 'repeat(6, 1fr)/ 1fr',
                    rowGap: '5px',
                    width: '400px'
                }}>
                    <input
                        placeholder={'write title'}
                        type="text"
                        value={task.title}
                        data-name={'title'}
                        onChange={onChangeModelTask}
                    />
                    <input
                        placeholder={'description'}
                        type="text"
                        value={task.description}
                        data-name={'description'}
                        onChange={onChangeModelTask}
                    />
                    <input
                        type={'number'}
                        value={task.status}
                        data-name={'status'}
                        onChange={onChangeModelTask}
                    />
                    <input
                        placeholder={'priority'}
                        type="number"
                        value={task.priority}
                        data-name={'priority'}
                        onChange={onChangeModelTask}
                    />
                    <input
                        placeholder={'startDate'}
                        type={`${Date}`}
                        value={`${new Date().toLocaleString()}`}
                    />
                    <input
                        placeholder={'deadline'}
                        type={`${Date}`}
                        value={`${new Date().toLocaleString()}`}
                    />
                </form>
            </div>
            <button
                onClick={updateTask}
            >update task
            </button>
        </div>
    </div>
}