import React, { useState, useEffect } from 'react';

function TodoList() {  
  const [tasks, setTasks] = useState([
    { id: 1, title: '1', done: true, deadline: '2026-09-23T13:00' },
    { id: 2, title: '2', done: false, deadline: '2026-09-23T23:59' },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [deadlineValue, setDeadlineValue] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTask = {
      id: Date.now(),
      title: inputValue.trim(),
      done: false,
      deadline: deadlineValue, 
    };

    setTasks([...tasks, newTask]);
    setInputValue(''); 
    setDeadlineValue(''); 
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const formatDeadline = (deadlineStr, isDone, now) => {
    if (!deadlineStr) return null;
    
    const deadlineDate = new Date(deadlineStr);
    const isOverdue = !isDone && deadlineDate < now;
    
    const msInHour = 60 * 60 * 1000;
    const hoursLeft = (deadlineDate - now) / msInHour;
    
    const isSoon = !isDone && !isOverdue && hoursLeft > 0 && hoursLeft <= 24;
    
    const formattedDate = deadlineDate.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return {
      text: `(до: ${formattedDate})`,
      isOverdue,
      isSoon
    };
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h2>Список задач</h2>

      <form onSubmit={handleAddTask} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Что нужно сделать?"
            style={{ flexGrow: 1, padding: '8px' }}
          />
          <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Добавить
          </button>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '14px', color: '#555' }}>Дедлайн:</label>
          <input
            type="datetime-local"
            value={deadlineValue}
            onChange={(e) => setDeadlineValue(e.target.value)}
            style={{ padding: '6px', cursor: 'pointer' }}
          />
        </div>
      </form>

      {tasks.length === 0 ? (
        <p style={{ color: 'gray', fontStyle: 'italic' }}>Список пуст</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map((task) => {
            const deadlineInfo = formatDeadline(task.deadline, task.done, currentTime);
            
            let deadlineColor = 'gray';
            if (deadlineInfo?.isOverdue) deadlineColor = 'red';
            if (deadlineInfo?.isSoon) deadlineColor = 'orange';

            return (
              <li
                key={task.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: '1px solid #eee',
                }}
              >
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', flexGrow: 1 }}>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => handleToggleTask(task.id)}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ color: task.done ? 'green' : 'black' }}>
                      {task.title}
                    </span>

                    {deadlineInfo && (
                      <span style={{ 
                        fontSize: '12px', 
                        color: deadlineColor,
                        fontWeight: deadlineInfo.isOverdue || deadlineInfo.isSoon ? 'bold' : 'normal'
                      }}>
                        {deadlineInfo.text} 
                        {deadlineInfo.isOverdue && ''}
                        {deadlineInfo.isSoon && ' '}
                      </span>
                    )}
                  </div>
                </label>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'red',
                    cursor: 'pointer',
                    fontSize: '16px',
                    padding: '0 8px'
                  }}
                >
                  Удалить
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
