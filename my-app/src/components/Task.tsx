/*
    NOTES:
    Even though React is not used directly in this file, it is still imported.
    This is a requrirement to make TypeScript happy with JSX (e.g. <div></div>).
*/
import React, { useState, useEffect, KeyboardEvent } from "react";
import Checkbox from "./Checkbox";

interface ITaskProps {
    todo_item: string;
    description: string;
    setDescription: (e: string) => void;
    done: boolean;
    onToggle: (done: boolean) => void;
    onTrash: () => void;
    onEnter: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export default function Task({
    todo_item,
    done,
    description,
    setDescription,
    onToggle,
    onTrash,
    onEnter,
}: ITaskProps) {
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (editMode) {
            /*
                NOTES:
                Here, I am explicitly setting the type of the input variable to be HTMLInputElement | null.
                Because I know the querySelector will return an HTMLInputElement or null.
                The `?.` syntax is called optional chaining. It is a new feature in TypeScript 3.7.
                It means that if the value before the ?. is null or undefined, the statement after will not execute.

            */
            const input: HTMLInputElement | null = document.querySelector(".task input");
            input?.focus();
            input?.setSelectionRange(input.value.length, input.value.length);
        }
    }, [editMode]);

    const handleBlur = () => setEditMode(false);

    return (
        <div className={"task " + (done ? "done" : "")}>
            <Checkbox checked={done} onClick={() => onToggle(!done)} />
            {!editMode && (
                <div className="task-name" onClick={() => setEditMode((prev) => !prev)}>
                    <span>{todo_item}</span>
                </div>
            )}
            {editMode && (
                <form
                    onSubmit={(ev) => {
                        ev.preventDefault();
                        setEditMode(false);
                    }}
                >
                    <input
                        type="text"
                        defaultValue={todo_item}
                        onBlur={handleBlur}
                        onClick={console.log}
                        onChange={(e) => setDescription(e.target.value)}
                        onKeyUp={(e) => onEnter(e)}
                    />
                </form>
            )}
            <button className="trash" onClick={onTrash}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
            </button>
        </div>
    );
}
