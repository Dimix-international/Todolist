import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    addTodolistTC,
    changeFilterOfTodolistAC,
    changeTitleOfTodolistTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "./todoList_reducer";
import React, {useCallback, useEffect} from "react";
import {Input} from "../../components/Input/Input";
import {Todolist} from "./Todolist/Todolist";
import {Redirect} from "react-router-dom";

type TodolistsListType = {
    demo?: boolean
}
export const TodolistsList: React.FC<TodolistsListType> = ({demo = false}) => {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
        state => state.todolists);

    //достаем состояние залогиности
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        dispatch(fetchTodolistsTC()) //вызываем ТС
    }, [dispatch, demo, isLoggedIn])

    const addNewTodoList = useCallback((value: string) => {
        dispatch(addTodolistTC(value))
    }, [dispatch]);

    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistTC(id))
    }, [dispatch]);

    const changeTodolistTitle = useCallback((title: string, todoListID: string) => {
        dispatch(changeTitleOfTodolistTC(todoListID, title))
    }, [dispatch]);

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeFilterOfTodolistAC(todolistId, value))
    }, [dispatch]);

    //если мы не залогированы то redirect на страницу логинизации - выполняем после всех хуков
    if(!isLoggedIn) {
        return <Redirect to={'/login'} />
    }

    return (
        <>
            <Input callbackAddItem={addNewTodoList}/>
            {
                todolists.map(tl => {
                    return <Todolist
                        key={tl.id}
                        todolist={tl}
                        changeFilter={changeFilter}
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                        demo={demo}
                    />
                })
            }
        </>
    )
}