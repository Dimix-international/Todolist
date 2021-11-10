import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type EditableItemType = {
    title: string
    callback: (title: string) => void
}
export const EditableItem: React.FC<EditableItemType> = React.memo(({
                                                                        title,
                                                                        callback
                                                                    }) => {
    let [titleInput, setTitleInput] = useState('')
    let [edit, setEdit] = useState(false);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            callback(titleInput.trim())
            e.currentTarget.blur();
        }
    }
    const activateEditMode = () => {
        setEdit(true);
        setTitleInput(title);
    }
    const activateViewMode = () => {
        setEdit(false);
        callback(titleInput.trim())
    }
    return (
        edit
            ? <input
                value={titleInput}
                onBlur={activateViewMode}
                autoFocus={true}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            : <span onDoubleClick={activateEditMode}>{title}</span>
    )
})