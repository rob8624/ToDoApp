import React from "react";





export default function Todo({ todos, deleteTodo }) {
    return (
    <div className='todo-flex'>
      todos ? { todos.map((item) => (
        <div key={item.id}
        className="todo" style={{ 
          backgroundColor: item.priority === 'high' ? '#EF7DC1' : 
                           item.priority === 'medium' ? '#10BE3F' :
                           item.priority === 'low' ? '#12AFBB' : 
                           '#f1f8e9'
        }} >
          <div className='todo-title'>{item.title}</div>
          <div className='todo-description'>
                {item.description}
          </div>
            <button onClick={() => deleteTodo(item.id)}>Delete</button>
        </div>
      ) )} : message
    </div>)
}