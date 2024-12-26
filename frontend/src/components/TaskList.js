import React from "react";

function TaskList({ tasks }) {
    console.log(tasks)
    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title} - {task.completed ? "Completed": "Pending"}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
