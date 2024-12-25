/** @format */

import { useState } from "react";

export default function App() {
  const [taskList, setTaskList] = useState([]);
  console.log(taskList);

  const [sorted, setSorted] = useState(null);

  function handleAddTask() {
    const text = prompt("Enter your Task");
    const id = Date.now();
    const completed = false;

    const customDate = new Date("12/24/2024 23:11:00");

    // Extract individual components
    const hours = customDate.getHours().toString().padStart(2, "0"); // Add leading zero if necessary
    const minutes = customDate.getMinutes().toString().padStart(2, "0"); // Add leading zero if necessary
    const month = (customDate.getMonth() + 1).toString().padStart(2, "0"); // Month starts from 0
    const day = customDate.getDate().toString().padStart(2, "0"); // Add leading zero if necessary
    const year = customDate.getFullYear();

    // Format the date and time string
    const date = `${hours}:${minutes} ${month}/${day}/${year}`;

    const task = {
      id,
      text,
      completed,
      date,
    };
    setTaskList((taskList) => [...taskList, task]);
  }

  function handleDeleteTask(id) {
    setTaskList((task) => task.filter((t) => t.id !== id));
  }

  function handleEditTask(id) {
    const renameTask = prompt();
    renameTask &&
      setTaskList((task) =>
        task.map((t) => (t.id === id ? { ...t, text: renameTask } : t))
      );
  }

  function handleSortTask(value) {
    if (value === "all") {
      const sortedTask = [...taskList].sort((a, b) => a.id - b.id);
      setTaskList(sortedTask);
      setSorted(value);
    } else if (value === "sortByName") {
      setTaskList((task) => task.sort((a, b) => a.text.localeCompare(b.text)));
      setSorted(value);
    } else if (value === "sortByTime") {
      setSorted(value);
      setTaskList((task) =>
        task.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
      );
    }
  }
  return (
    <div className="to_do_list">
      <div className="heading font-black">TODO LIST</div>
      <div className="menu">
        <button
          className=" bg-sky-500 text-white h-12 w-28 rounded-md"
          onClick={handleAddTask}
        >
          Add Task
        </button>
        <select
          className=" h-12 w-28 bg-slate-300 rounded-md"
          value={sorted}
          onChange={(e) => handleSortTask(e.target.value)}
        >
          <option value="all">All</option>
          <option value="sortByName">Sort by Name</option>
          <option value="sortByTime">Sort by Time</option>
        </select>
      </div>

      {taskList.length !== 0 ? (
        <div className="tasks bg-slate-200 mt-4">
          <TaskList
            tasks={taskList}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function TaskList({ tasks, onDeleteTask, onEditTask }) {
  return (
    <ul className="bg-slate-200">
      {tasks.map((task) => (
        <Task task={task} onDeleteTask={onDeleteTask} onEditTask={onEditTask} />
      ))}
    </ul>
  );
}

function Task({ task, onDeleteTask, onEditTask }) {
  const [completed, setCompleted] = useState(false);

  function handleComplete() {
    setCompleted((comp) => !comp);
  }
  return (
    <li className="rounded-md my-1 bg-white">
      <div className="task_descripton">
        <input
          type="checkbox"
          className="h-8 w-8 mr-3"
          onClick={handleComplete}
        ></input>
        <div className="task_data">
          <h1
            className={`font-bold text-stone-600 ${
              completed ? "complete" : ""
            }`}
          >
            {task.text}
          </h1>
          <p className="text-stone-600 ">{task.date}</p>
        </div>
      </div>
      <div className="edit_btn">
        <button
          className="bg-slate-200 h-8 w-8 rounded-md"
          onClick={() => onDeleteTask(task.id)}
        >
          🗑️
        </button>
        <button
          className="bg-slate-200 h-8 w-8 rounded-md"
          onClick={() => onEditTask(task.id)}
        >
          ✏️
        </button>
      </div>
    </li>
  );
}
