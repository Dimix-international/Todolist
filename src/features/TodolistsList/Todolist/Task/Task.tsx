import React, {ChangeEvent, useCallback} from "react";
import {EditableItem} from "../../../../components/EditableSpan/EditableItem";
import {TaskStatuses, TaskType} from "../../../../api/todolists-api";
import {RequestStatusType} from "../../../../app/app-reducer";


export type TaskPropsType = {
    task: TaskType
    removeTask: (id: string) => void
    onChangeHandler: (id: string, status: TaskStatuses) => void
    changeTitleInInput: (title: string, id: string) => void
    entityStatus: RequestStatusType
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => props.removeTask(props.task.id), [props])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.onChangeHandler(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
    }, [props])

    const changeTitleInInput = useCallback((title: string) => {
        props.changeTitleInInput(title, props.task.id)
    }, [props])

    return (
        <li key={props.task.id}
            className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <input type="checkbox" onChange={onChangeHandler}
                   checked={props.task.status === TaskStatuses.Completed}/>
            <EditableItem
                title={props.task.title}
                callback={changeTitleInInput}
            />
            <button disabled={props.entityStatus === 'loading'}
                    onClick={onClickHandler}>x
            </button>
        </li>
    )
})