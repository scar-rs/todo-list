import React, { useState } from 'react';
import ToDoItem from './ToDoItem';
import './ToDoList.scss';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const addTask = () => {
    if (taskName.trim() && taskDescription.trim()) {
      setTasks([...tasks, { name: taskName, description: taskDescription, completed: false }]);
      setTaskName('');
      setTaskDescription('');
    }
  };

  const updateTask = (index, newName, newDescription, newCompleted) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          name: newName !== null ? newName : task.name,
          description: newDescription !== null ? newDescription : task.description,
          completed: newCompleted !== undefined ? newCompleted : task.completed,
        };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="todo-list">
      <div className="input-container">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
        />
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Task Description"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <div className="task-table">
        {tasks.map((task, index) => (
          <ToDoItem
            key={index}
            index={index}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default ToDoList;
