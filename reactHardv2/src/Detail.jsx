import "./Detail.css";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import React, { useState } from "react";



function Detail() {
    const [tasks, setTasks] = useState((sessionStorage.getItem("tasks")) ? JSON.parse(sessionStorage.getItem("tasks")) : []);
    const { id } = useParams()
    const currentTask = tasks[id];
    console.log(currentTask)
    return (
        <div className="detail-container">
            <h3>Details</h3>
            <h2>{currentTask.text}</h2>
            <p><strong>Description:</strong> {currentTask.description}</p>
            <p><strong>Duration:</strong> {currentTask.duration}</p>
            <p><strong>Due Date:</strong> {currentTask.dueDate}</p>
            <p><strong>Status:</strong> {currentTask.complete ? "Complete" : "Incomplete"}</p>
            <Link to="/List">Back to My List</Link>
        </div>


    )
}

export default Detail;