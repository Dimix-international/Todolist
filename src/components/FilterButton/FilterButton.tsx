import React from 'react';
import s from './FilterButton.module.css'

export type SuperButtonPropsType = {
    name: string
    title: string
    callback:() => void
}
export const FilterButton:React.FC<SuperButtonPropsType> = React.memo(({name,callback, title}) => {
    const onClickHandler =() => {
        callback();
    }
    console.log('filter')
    let finallyClassName = [s.btn];
    switch (name) {
        case title:
            finallyClassName.push(s.btn_active)
            break;
        case ('addTodolist') : {
            finallyClassName.push(s.btn_addTodolist);
            break
        }
    }
    return (
        <button
            className={finallyClassName.join(' ')}
            onClick = {onClickHandler}>{title}</button>
    )
})