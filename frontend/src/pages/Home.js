import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/tasks`).then((res) => setTasks(res.data));
  }, []);

  const addTask = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/tasks`, { title, description }).then((res) => {
      setTasks([...tasks, res.data]);
      setTitle('');
      setDescription('');
    });
  };

  const deleteTask = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`).then((res) => {
      setTasks(tasks.filter((task) => task._id !== id));
    });
    console.log(id);
  };

  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Task Manager</h1> */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2">Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="border p-2 mb-2">
            <h2 className="font-bold">{task.title}</h2>
            <p>{task.description}</p>
            <button onClick={() => deleteTask(task._id) }>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
