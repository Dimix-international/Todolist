import React, {useCallback, useEffect,} from 'react';
import {Input} from "../../../components/Input/Input";
import {EditableItem} from "../../../components/EditableSpan/EditableItem";
import {FilterButton} from "../../../components/FilterButton/FilterButton";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import {
    addTaskTC,
    fetchTasksTC,
    removeTaskTC,
    updateTaskTC,
} from "../tasks_reducer";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {FilterValuesType, TodolistDomainType,} from "../todoList_reducer";


type PropsType = {
    todolist: TodolistDomainType
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (title: string, todolistId: string,) => void
    demo?: boolean, //чтобы тудулист в сторибук не делал запрос на сервер и не подгружал tasks
}

export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {

    //if(typeof props.demo === 'undefined') props.demo = false;

    const dispatch = useDispatch();
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(
        state => state.tasks[props.todolist.id]);

    const removeTodolist = () => props.removeTodolist(props.todolist.id);

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.todolist.id)) //вызываем ТС
    }, [dispatch, props.todolist.id, demo])

    const onClickButtonChangeFilter = useCallback((filter: FilterValuesType) => {
        props.changeFilter(filter, props.todolist.id)
    }, [props]);

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(title, props.todolist.id);
    }, [props]);

    const addTask = useCallback((title: string) => {

        dispatch(addTaskTC(title, props.todolist.id));

    }, [dispatch, props.todolist.id])

    const removeTask = useCallback((taskId: string) => {

        dispatch(removeTaskTC(props.todolist.id, taskId)); //вызываем ТС

    }, [dispatch, props.todolist.id])

    const onChangeHandler = useCallback((taskId: string, status: TaskStatuses) => {

        // dispatch(changeStatusTC(taskId, status, props.todolistID))
        dispatch(updateTaskTC({status}, props.todolist.id, taskId,))

    }, [dispatch, props.todolist.id])

    const changeTitleInInput = useCallback((title: string, taskId: string) => {

        //dispatch(changeTitleOfTaskTC(title, props.todolistID, taskId))
        dispatch(updateTaskTC({title}, props.todolist.id, taskId))

    }, [dispatch, props.todolist.id])


    let tasksForTodolist = tasks;

    if (props.todolist.filter === "active") {
        // tasksForTodolist = tasks.filter(t => !t.isDone)
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);
    }
    return <div>
        <h3>
            <EditableItem title={props.todolist.title}
                          callback={changeTodolistTitle}/>
            <button disabled={props.todolist.entityStatus === 'loading'}
                    onClick={removeTodolist}>X
            </button>
        </h3>
        <div>
            <Input disabled={props.todolist.entityStatus === 'loading'}
                   callbackAddItem={addTask}/>
        </div>
        <ul>
            {
                tasksForTodolist.map(t =>
                    <Task
                        key={t.id}
                        task={t}
                        removeTask={removeTask}
                        onChangeHandler={onChangeHandler}
                        changeTitleInInput={changeTitleInInput}
                        entityStatus={props.todolist.entityStatus}
                    />
                )
            }
        </ul>
        <div>
            <FilterButton name={props.todolist.filter} title={'all'}
                          callback={() => onClickButtonChangeFilter('all')}/>
            <FilterButton name={props.todolist.filter} title={'active'}
                          callback={() => onClickButtonChangeFilter('active')}/>
            <FilterButton name={props.todolist.filter} title={'completed'}
                          callback={() => onClickButtonChangeFilter('completed')}/>
        </div>
    </div>
})


