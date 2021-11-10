import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type InputTypeProps = {
    disabled?: boolean
    callbackAddItem: (value: string) => void
}
export const Input: React.FC<InputTypeProps> = React.memo((
    {
        disabled = false,
        callbackAddItem
    }
) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addTask();
        }
    }
    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            callbackAddItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    return (
        <div>
            <input
                disabled={disabled}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
            />
            <button disabled={disabled} onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
})