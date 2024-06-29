import React, { useState } from 'react';
import './ToDoItem.scss';

function ToDoItem({ task, index, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskName, setNewTaskName] = useState(task.name);
  const [newTaskDescription, setNewTaskDescription] = useState(task.description);
  const [showMenu, setShowMenu] = useState(false);

  const handleEdit = () => {
    if (isEditing) {
      updateTask(index, newTaskName, newTaskDescription);
    }
    setIsEditing(!isEditing);
    setShowMenu(false);
  };

  const handleComplete = () => {
    updateTask(index, null, null, !task.completed);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-details">
        <input type="checkbox" checked={task.completed} onChange={handleComplete} />
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
            <input
              type="text"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
            />
            <button onClick={handleEdit}>Save</button>
          </div>
        ) : (
          <>
            <span className="task-name">{task.name}</span>
            <span className="task-description">{task.description}</span>
          </>
        )}
      </div>
      <button onClick={toggleMenu}>⋮</button>
      {showMenu && (
        <div className="dropdown-menu">
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTask(index)}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default ToDoItem;
