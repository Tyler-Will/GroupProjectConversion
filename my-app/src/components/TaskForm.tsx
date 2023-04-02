import React, { useState, FormEventHandler } from "react";

interface TaskFormProps {
    onAdd: (taskName: string) => void;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
    const [description, setDescription] = useState("");

    /*
        NOTES:
        Here, I am explicitly setting the type of the handleFormSubmit variable to be 
        `FormEventHandler<HTMLFormElement>`.
        I did not memorize the type for a React Form Submit event handler.
        Instead, I learned the value by hovering over the `onSubmit` prop of the form element.
        Then I assumed it must be imported from the React library because it is a JSX attribute.
    */
    const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch("http://localhost:5000/todo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (response.status === 200) {
                window.location.href = "/";
            }
        } catch (err) {
            console.log(err);
        }
    };

    // const [taskName,setTaskName] = useState('');
    // function handleSubmit(ev) {
    //   ev.preventDefault();
    //   onAdd(taskName);
    //   setTaskName('');

    return (
        <form onSubmit={handleFormSubmit}>
            <button>+</button>
            <input
                type="text"
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
                required
                autoFocus
                maxLength={250}
                minLength={1}
                placeholder="Add List..."
            />
            <button className="btn" aria-label="Add Task" type="submit">
                Add Task
            </button>
        </form>
    );
}
