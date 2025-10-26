import "./List.css";
import Navbar from "./components/Navbar";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

function List() {
    const inputRef = useRef(null);
    const inputDate = useRef(null);
    const inputDesc = useRef(null);
    const inputDur = useRef(null);
    const checkRef = useRef(null);
    const addBtn = useRef(null);

    const inputEdit = useRef(null);
    const inputDateEdit = useRef(null);
    const inputDescEdit = useRef(null);
    const inputDurEdit = useRef(null);

    const [tasks, setTasks] = useState(
        sessionStorage.getItem("tasks")
            ? JSON.parse(sessionStorage.getItem("tasks"))
            : []
    );
    const [isVisible, setVisibility] = useState(false);
    const [required, setRequired] = useState("")
    const [editRequired, setEditRequired] = useState("")

    function handleAddTask(e) {
        e.preventDefault();
        const newTask = {
            text: inputRef.current.value.trim(),
            dueDate: inputDate.current.value.trim(),
            description: inputDesc.current.value.trim(),
            duration: inputDur.current.value.trim(),
            complete: false,
        };
        if (!newTask.text || !newTask.dueDate || !newTask.description) {
            console.log("All fields are required")
            setRequired("All fields are required")
        } else {
            setRequired("")
            setTasks([...tasks, newTask]);
            sessionStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
            console.log(sessionStorage.getItem("tasks"));
            inputRef.current.value = "";
            inputDate.current.value = "";
            inputDesc.current.value = "";
        }

    }


    function handleRemoveTask(index) {
        const updatedTasks = tasks.filter((task) => tasks.indexOf(task) !== index);
        setTasks(updatedTasks);
        sessionStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    function handleEditTask(index) {
        const editedTask = {
            text: inputEdit.current.value,
            dueDate: inputDateEdit.current.value,
            description: inputDescEdit.current.value,
            duration: inputDurEdit.current.value,
            complete: false,
        };

        const updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                return editedTask;
            }
            return task
        });
        setTasks(updatedTasks);
        sessionStorage.setItem("tasks", JSON.stringify(updatedTasks));




    }

    const toggleVisibility = () => {
        setVisibility(!isVisible); // Toggle the boolean state
    };

    return (
        <>
            <Navbar />
            <div className="list-header">
                <h2>Here you can view all your tasks.</h2>
            </div>
            <div className="task-input">
                <form>
                    <label htmlFor="taskAdd">+ New Task</label>
                    <input ref={inputRef} type="text" id="taskAdd" name="taskAdd" />
                    <label htmlFor="descAdd">Description</label>
                    <input ref={inputDesc} type="text" id="descAdd" name="descAdd" />
                    <label htmlFor="durAdd">Duration</label>
                    <select ref={inputDur} type="select" id="durAdd" name="durAdd">
                        <option value="Short">Short</option>
                        <option value="Medium">Medium</option>
                        <option value="Long">Long</option>
                    </select>
                    <label htmlFor="dateAdd">Due Date:</label>
                    <input ref={inputDate} type="date" id="dateAdd" name="dateAdd" />
                    <button className="addBtn" ref={addBtn} type="submit" onClick={handleAddTask}>
                        Add Task
                    </button>
                    <p className="required">{required}</p>
                </form>
            </div>

            <div className="task-list">
                <ul>
                    {tasks.map((task, index) => (
                        <div key={index}>
                            <div className="task">
                                <input
                                    className="task-label check"
                                    checked={task.complete}
                                    onChange={(e) => {
                                        const updatedTasks = tasks.map((task, i) =>
                                            i === index
                                                ? { ...task, complete: e.target.checked }
                                                : task
                                        );
                                        setTasks(updatedTasks);
                                        sessionStorage.setItem(
                                            "tasks",
                                            JSON.stringify(updatedTasks)
                                        );
                                    }}
                                    ref={checkRef}
                                    type="checkbox"
                                />

                                <Link className="task-label" to={`/Detail/${index}`}>
                                    <li>
                                        <span>{task.text}</span> -{" "}
                                        <span>Due: {task.dueDate}</span>
                                    </li>
                                </Link>
                                <button onClick={toggleVisibility}>Edit</button>
                                <button onClick={() => handleRemoveTask(index)}>Delete</button>
                            </div>

                            <div className="edit-block" style={{ display: isVisible ? 'block' : 'none' }}>
                                <label htmlFor="taskEdit">New Name:</label>
                                <input
                                    ref={inputEdit}
                                    type="text"
                                    id="taskEdit"
                                    name="taskEdit"
                                />

                                <label htmlFor="descEdit">New Description:</label>
                                <input
                                    ref={inputDescEdit}
                                    type="text"
                                    id="descEdit"
                                    name="descEdit"
                                />

                                <label htmlFor="dateEdit">New Due Date:</label>
                                <input
                                    ref={inputDateEdit}
                                    type="date"
                                    id="dateEdit"
                                    name="dateEdit"

                                />
                                <label htmlFor="durEdit">New Duration:</label>
                                <select ref={inputDurEdit} type="select" id="durEdit" name="durEdit">
                                    <option value="short">Short</option>
                                    <option value="medium">Medium</option>
                                    <option value="long">Long</option>
                                </select>

                                <button onClick={() => { handleEditTask(index), toggleVisibility() }}>Save</button>
                                <p>{editRequired}</p>
                            </div>

                        </div>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default List;