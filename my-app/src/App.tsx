import React, { useEffect, useState, KeyboardEvent } from "react";

import TaskForm from "./components/TaskForm";
import Task from "./components/Task";
import TodoItem from "./TodoItemInterface";

import "./App.css";

function App() {
    const [tasks, setTasks] = useState<TodoItem[]>([]);
    const [description, setDescription] = useState("");

    const handleEnter = (e: KeyboardEvent<HTMLInputElement>, todo_id: number) => {
        if (e.key === "Enter") {
            renameTask(description, todo_id);
        }
    };

    //Read

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todo");
            const jsonData = await response.json();
            setTasks(jsonData);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    //Create
    async function addTask(todo_item: string) {
        try {
            const body = { todo_item };
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
    }

    //Delete
    async function deleteTodo(id: number) {
        try {
            const response = await fetch(`http://localhost:5000/todo/${id}`, {
                method: "DELETE",
            });

            if (response.status === 200) {
                window.location.href = "/";
            }
        } catch (err) {
            console.log(err);
        }
    }

    // Checking off tasks
    function updateTaskDone(index: number, newDone: boolean) {
        setTasks((prev) => {
            const newTasks = [...prev];
            newTasks[index].done = newDone;
            return newTasks;
        });
    }
    // Tasks Completion List
    const numberComplete = tasks.filter((t) => t.done).length;
    const numberTotal = tasks.length;

    // Edit
    async function renameTask(newName: string, id: number) {
        const body = { newName };
        console.log(newName);
        try {
            const response = await fetch(`http://localhost:5000/todo/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            console.log(body, id);
            if (response.status === 200) {
                window.location.href = "/";
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <main>
            <h1>My To Do List !</h1>
            <h2>
                {numberComplete}/{numberTotal} Complete
            </h2>

            <TaskForm onAdd={addTask} />
            {tasks.map((task, index) => (
                <Task
                    setDescription={setDescription}
                    // setTasks={setTasks}
                    {...task}
                    // onRename={(newName) => renameTask(newName,task.todo_id)}
                    onTrash={() => deleteTodo(task.todo_id)}
                    onToggle={(done) => updateTaskDone(index, done)}
                    onEnter={(e) => handleEnter(e, task.todo_id)}
                />
            ))}

            {/* <CustomForm />
      <Display /> */}
        </main>
        //custom form component - <CustomForm /> - was taken out right above the closing tag of main- seems second custom form wasnt doing anything so i i removed the component from here, commented out the immport in taskForm and commented out all of navbar//
    );
}

export default App;
